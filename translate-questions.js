// ═══════════════════════════════════════════════════════════
// Question pool translator using Gemini
// Usage: node translate-questions.js
// Set env: GEMINI_API_KEY=your_key
// ═══════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const https = require('https');

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;

const LANGS = ['de','ja','fr','es','pt','it','id'];
const LANG_NAMES = {de:'German',ja:'Japanese',fr:'French',es:'Spanish',pt:'Portuguese',it:'Italian',id:'Indonesian'};

// Hardcoded prompt translations (avoid extra API call for 4 simple sentences)
const PROMPTS = {
  de: {qSeqPrompt:'Finde die fehlende Zahl in der Folge:',qMatPrompt:'Finde die Regel in der 3×3-Matrix und wähle das fehlende Element (?):',qAnaPrompt:'Vervollständige die Analogie:',qLogPrompt:'Löse das Logikproblem.'},
  ja: {qSeqPrompt:'数列の空欄に入る数を見つけてください：',qMatPrompt:'3×3行列のルールを見つけ、欠けている項目（?）を選んでください：',qAnaPrompt:'類推を完成させてください：',qLogPrompt:'次の論理問題を解いてください。'},
  fr: {qSeqPrompt:'Trouvez le nombre manquant dans la suite :',qMatPrompt:'Trouvez la règle dans cette matrice 3×3 et sélectionnez l\'élément manquant (?) :',qAnaPrompt:'Complétez l\'analogie :',qLogPrompt:'Résolvez ce problème logique.'},
  es: {qSeqPrompt:'Encuentra el número que falta en la secuencia:',qMatPrompt:'Encuentra la regla en esta matriz 3×3 y selecciona el elemento faltante (?):',qAnaPrompt:'Completa la analogía:',qLogPrompt:'Resuelve el problema lógico.'},
  pt: {qSeqPrompt:'Encontre o número que falta na sequência:',qMatPrompt:'Encontre a regra nesta matriz 3×3 e selecione o item ausente (?):',qAnaPrompt:'Complete a analogia:',qLogPrompt:'Resolva o problema lógico.'},
  it: {qSeqPrompt:'Trova il numero mancante nella sequenza:',qMatPrompt:'Trova la regola in questa matrice 3×3 e seleziona l\'elemento mancante (?):',qAnaPrompt:'Completa l\'analogia:',qLogPrompt:'Risolvi il problema logico.'},
  id: {qSeqPrompt:'Temukan angka yang hilang dalam urutan:',qMatPrompt:'Temukan aturan dalam matriks 3×3 ini dan pilih item yang hilang (?):',qAnaPrompt:'Lengkapi analogi:',qLogPrompt:'Selesaikan masalah logika.'},
};

// Load English question data (q-en.js uses window.IQ_Q = {...})
let IQ_Q_EN;
try {
  const enContent = fs.readFileSync(path.join(__dirname, 'lang', 'q-en.js'), 'utf8');
  const fakeWindow = {};
  new Function('window', enContent)(fakeWindow);
  IQ_Q_EN = fakeWindow.IQ_Q;
  if (!IQ_Q_EN) throw new Error('IQ_Q is null after evaluation');
  console.log(`✅ Loaded q-en.js: ${IQ_Q_EN.anaPool.length} analogies, ${IQ_Q_EN.logPool.length} logic, ${IQ_Q_EN.spatPool.length} spatial\n`);
} catch(e) {
  console.error('Failed to load q-en.js:', e.message);
  process.exit(1);
}

function geminiRequest(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      contents: [{parts: [{text: prompt}]}],
      generationConfig: {temperature: 0.1, maxOutputTokens: 16384}
    });
    const req = https.request(GEMINI_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body)}
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(data);
          if (j.error) {
            reject(new Error(`Gemini API error ${j.error.code}: ${j.error.message}`));
            return;
          }
          const text = j.candidates?.[0]?.content?.parts?.[0]?.text || '';
          resolve(text);
        } catch(e) { reject(new Error('Failed to parse Gemini response: ' + data.slice(0, 200))); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function extractJSON(text, type) {
  // Strip markdown code fences if present
  const cleaned = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
  if (type === 'array') {
    const m = cleaned.match(/\[[\s\S]*\]/);
    if (!m) throw new Error('No JSON array found. Response: ' + text.slice(0, 300));
    return JSON.parse(m[0]);
  } else {
    const m = cleaned.match(/\{[\s\S]*\}/);
    if (!m) throw new Error('No JSON object found. Response: ' + text.slice(0, 300));
    return JSON.parse(m[0]);
  }
}

async function translatePool(poolName, items, targetLang) {
  const isAna = poolName === 'anaPool';
  const isLog = poolName === 'logPool';

  let inputLines;
  if (isAna) {
    inputLines = items.map((q, i) => `${i}|${q.analogy}|${q.opts.join('||')}`);
  } else if (isLog) {
    inputLines = items.map((q, i) => `${i}|${q.premise}|${q.opts.join('||')}`);
  } else {
    inputLines = items.map((q, i) => `${i}|${q.q}|${q.opts.join('||')}`);
  }

  const fieldName = isAna ? 'analogy' : isLog ? 'premise' : 'q';

  const prompt = `Translate the following IQ test questions from English to ${LANG_NAMES[targetLang]}.
Each line format: index|${fieldName}|opt0||opt1||opt2||opt3

Rules:
- Preserve the exact logical meaning (this affects correct answers)
- Keep numbers, letters (A B C), symbols, math operators exactly as-is
- Keep arrows (→, ←), degree symbols (°), multiplication signs (×) as-is
- Return a JSON array of objects, one per question, in the same order
- Each object: {"${fieldName}":"...","opts":["...","...","...","..."]}
- No markdown, no extra text, just the JSON array

Input (${items.length} questions):
${inputLines.join('\n')}

JSON array:`;

  const text = await geminiRequest(prompt);
  return extractJSON(text, 'array');
}

function buildQFile(lang, prompts, anaPool, logPool, spatPool) {
  const lines = [
    `// ${LANG_NAMES[lang]} question translations — loaded when ?lang=${lang}`,
    `window.IQ_Q={`,
    `qSeqPrompt:${JSON.stringify(prompts.qSeqPrompt)},`,
    `qMatPrompt:${JSON.stringify(prompts.qMatPrompt)},`,
    `qAnaPrompt:${JSON.stringify(prompts.qAnaPrompt)},`,
    `qLogPrompt:${JSON.stringify(prompts.qLogPrompt)},`,
    `anaPool:[`,
    anaPool.map(q => `  {analogy:${JSON.stringify(q.analogy||'')},opts:${JSON.stringify(q.opts||[])}}`).join(',\n'),
    `],`,
    `logPool:[`,
    logPool.map(q => `  {premise:${JSON.stringify(q.premise||'')},opts:${JSON.stringify(q.opts||[])}}`).join(',\n'),
    `],`,
    `spatPool:[`,
    spatPool.map(q => `  {q:${JSON.stringify(q.q||'')},opts:${JSON.stringify(q.opts||[])}}`).join(',\n'),
    `]`,
    `};`,
    ``
  ];
  return lines.join('\n');
}

async function run() {
  console.log('🌐 IQ Test Question Translator (Gemini)\n');

  for (const lang of LANGS) {
    const filePath = path.join(__dirname, 'lang', `q-${lang}.js`);

    if (fs.existsSync(filePath)) {
      const existing = fs.readFileSync(filePath, 'utf8').trim();
      if (existing.length > 200) {
        console.log(`✅ q-${lang}.js already exists, skipping`);
        continue;
      }
    }

    console.log(`\n📝 Translating questions to ${LANG_NAMES[lang]} (${lang})...`);

    try {
      const prompts = PROMPTS[lang];

      console.log(`  Translating anaPool (${IQ_Q_EN.anaPool.length} items)...`);
      const anaPool = await translatePool('anaPool', IQ_Q_EN.anaPool, lang);
      await new Promise(r => setTimeout(r, 1000));

      console.log(`  Translating logPool (${IQ_Q_EN.logPool.length} items)...`);
      const logPool = await translatePool('logPool', IQ_Q_EN.logPool, lang);
      await new Promise(r => setTimeout(r, 1000));

      console.log(`  Translating spatPool (${IQ_Q_EN.spatPool.length} items)...`);
      const spatPool = await translatePool('spatPool', IQ_Q_EN.spatPool, lang);
      await new Promise(r => setTimeout(r, 1000));

      const content = buildQFile(lang, prompts, anaPool, logPool, spatPool);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  ✅ Wrote lang/q-${lang}.js (${anaPool.length}+${logPool.length}+${spatPool.length} questions)`);

    } catch (err) {
      console.error(`  ❌ Error for ${lang}:`, err.message);
    }
  }

  console.log('\n✅ Question translation complete!\n');
}

run().catch(console.error);
