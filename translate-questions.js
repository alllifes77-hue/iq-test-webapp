// ═══════════════════════════════════════════════════════════
// Question pool translator using Gemini
// Usage: node translate-questions.js
// Set env: GEMINI_API_KEY=your_key
// ═══════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const https = require('https');

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;

const LANGS = ['de','ja','fr','es','pt','it','id'];
const LANG_NAMES = {de:'German',ja:'Japanese',fr:'French',es:'Spanish',pt:'Portuguese',it:'Italian',id:'Indonesian'};

// Load English question data (q-en.js uses window.IQ_Q = {...})
let IQ_Q_EN;
try {
  const enContent = fs.readFileSync(path.join(__dirname, 'lang', 'q-en.js'), 'utf8');
  const fakeWindow = {};
  new Function('window', enContent)(fakeWindow);
  IQ_Q_EN = fakeWindow.IQ_Q;
  if (!IQ_Q_EN) throw new Error('IQ_Q is null after evaluation');
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
          resolve(j.candidates?.[0]?.content?.parts?.[0]?.text || '');
        } catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function translatePool(poolName, items, targetLang) {
  const isAna = poolName === 'anaPool';
  const isLog = poolName === 'logPool';
  const isSpa = poolName === 'spatPool';

  let inputLines;
  if (isAna) {
    inputLines = items.map((q, i) => `${i}: analogy="${q.analogy}" | opts=${JSON.stringify(q.opts)}`);
  } else if (isLog) {
    inputLines = items.map((q, i) => `${i}: premise="${q.premise}" | opts=${JSON.stringify(q.opts)}`);
  } else {
    inputLines = items.map((q, i) => `${i}: q="${q.q}" | opts=${JSON.stringify(q.opts)}`);
  }

  const prompt = `Translate the following IQ test question data from English to ${LANG_NAMES[targetLang]}.
Rules:
- Translate accurately and naturally for an IQ test context
- Keep the logical meaning exactly the same — this is important for correct answers
- Keep symbols, numbers, letters (A, B, C...), math operators, and arrows exactly as-is
- Keep the | separator and JSON array format exactly as-is
- Return ONLY a JSON array of objects, one per line, no markdown, no explanation
- Each object: ${isAna ? '{"analogy":"...","opts":["...","...","...","..."]}' : isLog ? '{"premise":"...","opts":["...","...","...","..."]}' : '{"q":"...","opts":["...","...","...","..."]}'}
- Maintain the exact same index order

Input:
${inputLines.join('\n')}

JSON array output:`;

  const result = await geminiRequest(prompt);
  const jsonMatch = result.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error(`No JSON array in response for ${targetLang} ${poolName}: ${result.slice(0, 200)}`);
  return JSON.parse(jsonMatch[0]);
}

async function translatePrompts(targetLang) {
  const prompt = `Translate these 4 short IQ test prompt strings from English to ${LANG_NAMES[targetLang]}.
Return ONLY a JSON object, no markdown.

{
  "qSeqPrompt": "${IQ_Q_EN.qSeqPrompt}",
  "qMatPrompt": "${IQ_Q_EN.qMatPrompt}",
  "qAnaPrompt": "${IQ_Q_EN.qAnaPrompt}",
  "qLogPrompt": "${IQ_Q_EN.qLogPrompt}"
}

JSON output:`;

  const result = await geminiRequest(prompt);
  const jsonMatch = result.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error(`No JSON in prompts response for ${targetLang}`);
  return JSON.parse(jsonMatch[0]);
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
    anaPool.map(q => `  {analogy:${JSON.stringify(q.analogy)},opts:${JSON.stringify(q.opts)}}`).join(',\n'),
    `],`,
    `logPool:[`,
    logPool.map(q => `  {premise:${JSON.stringify(q.premise)},opts:${JSON.stringify(q.opts)}}`).join(',\n'),
    `],`,
    `spatPool:[`,
    spatPool.map(q => `  {q:${JSON.stringify(q.q)},opts:${JSON.stringify(q.opts)}}`).join(',\n'),
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

    // Skip if file already exists and has content
    if (fs.existsSync(filePath)) {
      const existing = fs.readFileSync(filePath, 'utf8');
      if (existing.trim().length > 100) {
        console.log(`  ✅ q-${lang}.js already exists, skipping`);
        continue;
      }
    }

    console.log(`\n📝 Translating questions to ${LANG_NAMES[lang]} (${lang})...`);

    try {
      console.log(`  Translating prompts...`);
      const prompts = await translatePrompts(lang);
      await new Promise(r => setTimeout(r, 500));

      console.log(`  Translating anaPool (${IQ_Q_EN.anaPool.length} items)...`);
      const anaPool = await translatePool('anaPool', IQ_Q_EN.anaPool, lang);
      await new Promise(r => setTimeout(r, 800));

      console.log(`  Translating logPool (${IQ_Q_EN.logPool.length} items)...`);
      const logPool = await translatePool('logPool', IQ_Q_EN.logPool, lang);
      await new Promise(r => setTimeout(r, 800));

      console.log(`  Translating spatPool (${IQ_Q_EN.spatPool.length} items)...`);
      const spatPool = await translatePool('spatPool', IQ_Q_EN.spatPool, lang);
      await new Promise(r => setTimeout(r, 800));

      const content = buildQFile(lang, prompts, anaPool, logPool, spatPool);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  ✅ Wrote lang/q-${lang}.js`);

    } catch (err) {
      console.error(`  ❌ Error for ${lang}:`, err.message);
    }
  }

  console.log('\n✅ Question translation complete!\n');
}

run().catch(console.error);
