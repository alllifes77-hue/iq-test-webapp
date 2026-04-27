// ═══════════════════════════════════════════════════════════
// Auto-translator using Gemini Flash 2.5
// Usage: node translate-auto.js
// Set env: GEMINI_API_KEY=your_key
// ═══════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const https = require('https');

const GEMINI_KEY = process.env.GEMINI_API_KEY;

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;

// ── Korean base strings to translate ──
const KO_BASE = {
  heroEyebrow: '과학적으로 검증된 인지 능력 평가 플랫폼',
  heroH1: '당신의 <span>IQ</span>를<br>정확하게 측정하세요',
  heroP: '레이븐 행렬 · CHC 이론 · 정규분포 IQ 산출<br>100% 무료 · 즉시 결과 · 6개 영역 심층 분석',
  shortCardTitle: '단기 IQ 테스트',
  shortCardDesc: '15문항 핵심 문제로 빠르게 IQ를 측정합니다. 수열·행렬·논리 포함.',
  shortBadge1: '15문항', shortBadge2: '약 12분',
  longCardTitle: '정밀 IQ 테스트',
  longCardDesc: '4개 영역 40문항으로 가장 정확한 IQ 산출 및 강점/약점 분석.',
  longBadge1: '40문항', longBadge2: '약 28분', longBadge3: '영역별 분석', longRec: '추천',
  inst1Title: '조용한 환경', inst1Desc: '방해 없이 집중할 수 있는 환경을 준비하세요',
  inst2Title: '시간 제한',
  inst3Title: '직관적 판단', inst3Desc: '모르는 문항은 가장 합리적인 답을 선택하세요',
  inst4Title: '수정 불가', inst4Desc: '다음 문항으로 넘어간 후에는 수정할 수 없습니다',
  instBack: '← 뒤로', instStart: '검사 시작 →',
  instTitle_short: '단기 IQ 테스트 안내', instTitle_long: '정밀 IQ 테스트 안내',
  instSub_short: '15문항 · 약 12분 · 수열·행렬·논리·유추 영역',
  instSub_long: '40문항 · 약 28분 · 4개 영역 심층 분석',
  instTime_short: '난이도에 따라 45~95초 제한이 적용됩니다',
  instTime_long: '문항 난이도별 45~95초 제한이 적용됩니다',
  qProg: '문항 {n} / {tot}', qNum: '문항 {n}',
  qAutoNext: '선택 후 자동으로 다음 문항으로 넘어갑니다', qSkip: '건너뛰기 →',
  calcTitle: '결과 분석 중…', calcSub: '귀하의 응답을 과학적으로 분석하고 있습니다',
  resTestLabel_short: '단기 IQ 테스트 결과', resTestLabel_long: '정밀 IQ 테스트 결과',
  resHeroTitle: '지능 지수 측정 완료', iqLabel: '지능 지수 (IQ)',
  statCorrect: '정답 수', statAcc: '정확도', statTime: '소요 시간', statTop: '상위 %',
  pctBarBottom: '하위', pctBarTop: '상위',
  topPctStr: '상위 {n}%', timeStr: '{m}분 {s}초',
  bellTitle: '📊 전체 인구 지능 분포에서의 위치',
  radarTitle: '🔍 영역별 능력 프로파일', areaTitle: '영역별 점수',
  extTitle: '🔬 추가 인지 능력 검사',
  extSub: 'IQ 이상의 인지 능력 — EQ·기억력·처리속도·창의성·집중력·유연성. 각 5~12분, 모두 무료.',
  freeBadge: '무료',
  switchToLong: '📝 정밀 검사 받기', switchToShort: '⚡ 단기 검사 받기', retake: '🔁 처음부터 다시',
  shareTitle: '🔗 결과 공유하기', shareDesc: 'IQ 결과를 친구들에게 알리고 함께 테스트해보세요!',
  shareSiteLine: '무료 IQ 테스트 · 과학적으로 검증된 지능 지수 측정', copyBtn: '링크 복사',
  shareTextIQ: '[무료 IQ 테스트] 나의 IQ: {iq}점 ({cat}) | 상위 {top}%\n너는 몇 점이야? 바로 테스트해봐!',
  shareTextExt: '[{title}] 결과: {score}점 ({cat}) | 상위 {top}%\n나도 무료로 테스트해봐!',
  sharedBannerIQ: '👀 친구의 IQ 테스트 결과를 보고 계십니다',
  sharedBannerBtn: '🧠 나도 무료로 IQ 테스트 해보기 →',
  sharedBannerExt: '👀 친구의 인지 능력 테스트 결과를 보고 계십니다',
  contactTitle: '💬 문의 · 건의사항',
  contactDesc: '테스트 문항, 결과 해석, 기능 개선에 대한 의견이 있으시면<br>오픈 커뮤니티에 남겨주세요.',
  contactLink: '💬 카카오톡 오픈채팅 커뮤니티 바로가기',
  extResLabel: '{title} 결과',
  extBellTitle: '📊 {title} 점수 분포에서의 위치',
  extChartTitle: '🔍 {title} 세부 영역 분석',
  extBDTitle: '세부 영역별 결과',
  tipsTitle: '💡 {title} 개선 가이드',
  extTopPctSuffix: '전체 응시자 중',
  extStatScoreLabel: '점수', extStatPctLabel: '상위 %', extStatLevelLabel: '등급',
  sciTitle: '🔬 과학적 근거 및 측정 원리',
  sciSub: '수십 년간 학술적으로 검증된 인지심리학 이론과 측정 방법론에 기반하여 설계되었습니다.',
  featTitle: '포함된 검사 항목', faqTitle: '자주 묻는 질문 (FAQ)',
  seoTitle: 'IQ 테스트에 대해 알아야 할 모든 것',
  interpCurrent: '◀ 현재', interpTopPct: '상위 {n}%',
  rlTitle: '영역별 신뢰도 지수 (Cronbach\'s α)',
  rlSeq: '수열 추론', rlMat: '행렬 패턴', rlSpat: '공간 추론', rlLog: '논리·유추',
};

// Non-translatable keys (template variables, keep as-is)
const KEEP_AS_IS = new Set(['qProg','qNum','topPctStr','timeStr','shareTextIQ','shareTextExt',
  'extResLabel','extBellTitle','extChartTitle','tipsTitle','interpTopPct']);

// Languages to translate
const LANGS = ['en','de','ja','fr','es','pt','it','id'];
const LANG_NAMES = {en:'English',de:'German',ja:'Japanese',fr:'French',es:'Spanish',pt:'Portuguese',it:'Italian',id:'Indonesian'};

function geminiRequest(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{temperature:0.1,maxOutputTokens:8192}});
    const req = https.request(GEMINI_URL, {method:'POST',headers:{'Content-Type':'application/json','Content-Length':Buffer.byteLength(body)}}, res => {
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

async function translateBatch(texts, targetLang) {
  const entries = Object.entries(texts);
  const keys = entries.map(([k]) => k);
  const values = entries.map(([,v]) => v);

  const prompt = `You are a professional UI translator. Translate the following Korean UI strings to ${LANG_NAMES[targetLang]}.
Rules:
- Keep HTML tags like <span>, <br> exactly as-is
- Keep {placeholder} variables like {n}, {tot}, {iq}, {cat}, {top}, {m}, {s}, {title}, {score} exactly as-is
- Keep emoji exactly as-is
- Keep ← → arrow characters exactly as-is
- Keep · separator character exactly as-is
- Translate naturally for UI context (buttons, labels, descriptions)
- Return ONLY a JSON object mapping index numbers to translated strings, no markdown, no explanation
- Example output: {"0":"translated text","1":"translated text"}

Korean strings to translate (index: text):
${values.map((v,i) => `${i}: ${v}`).join('\n')}

JSON output:`;

  const result = await geminiRequest(prompt);
  // Parse JSON from response
  const jsonMatch = result.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error(`No JSON in response for ${targetLang}: ${result.slice(0,200)}`);
  const translated = JSON.parse(jsonMatch[0]);

  const output = {};
  keys.forEach((k, i) => { output[k] = translated[String(i)] || values[i]; });
  return output;
}

function readExistingLang(lang) {
  const filePath = path.join(__dirname, 'lang', `${lang}.js`);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    // Extract the object content between first { and last }
    const match = content.match(/window\.IQ_LANG\s*=\s*(\{[\s\S]*\});?\s*$/);
    if (!match) return {};
    // Use Function to parse (safe since it's our own file)
    const obj = new Function('return ' + match[1])();
    return obj;
  } catch { return {}; }
}

function buildLangFile(lang, existing, newTranslations) {
  // Start with existing, overlay new translations for missing/updated keys
  const merged = { ...existing };

  // Apply new translations (only for scalar string keys)
  Object.entries(newTranslations).forEach(([k, v]) => {
    if (typeof v === 'string') merged[k] = v;
  });

  // Ensure htmlLang is correct
  merged.htmlLang = lang;

  return merged;
}

async function run() {
  console.log('🌐 IQ Test Auto-Translator (Gemini Flash 2.5)\n');

  // Find keys to translate (scalar strings only, not already translated well)
  const toTranslate = {};
  Object.entries(KO_BASE).forEach(([k, v]) => {
    if (typeof v === 'string' && !KEEP_AS_IS.has(k)) {
      toTranslate[k] = v;
    }
  });

  // Add template strings to keep (preserve placeholders)
  const templateStrings = {};
  KEEP_AS_IS.forEach(k => {
    if (KO_BASE[k]) templateStrings[k] = KO_BASE[k];
  });

  console.log(`Found ${Object.keys(toTranslate).length} strings to translate across ${LANGS.length} languages\n`);

  for (const lang of LANGS) {
    console.log(`\n📝 Translating to ${LANG_NAMES[lang]} (${lang})...`);

    try {
      const existing = readExistingLang(lang);

      // Only translate strings that are still in Korean or missing
      const needsTranslation = {};
      Object.entries(toTranslate).forEach(([k, koVal]) => {
        const existingVal = existing[k];
        // Translate if missing, or if it looks like it's still Korean (contains Korean chars)
        if (!existingVal || /[가-힣]/.test(existingVal)) {
          needsTranslation[k] = koVal;
        }
      });

      if (Object.keys(needsTranslation).length === 0) {
        console.log(`  ✅ Already fully translated, skipping`);
        continue;
      }

      console.log(`  Translating ${Object.keys(needsTranslation).length} strings...`);
      const translated = await translateBatch(needsTranslation, lang);

      // Read current file content and update
      const filePath = path.join(__dirname, 'lang', `${lang}.js`);
      let content = fs.readFileSync(filePath, 'utf8');

      // Replace each translated value in the file
      let updatedCount = 0;
      Object.entries(translated).forEach(([k, newVal]) => {
        if (!newVal) return;
        // Escape for regex
        const oldVal = needsTranslation[k];
        // Find and replace the key in the JS file
        const escapedOld = oldVal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/'/g, "\\'");
        // Try to find the key pattern and replace its value
        const pattern = new RegExp(`(${k}\\s*:\\s*)'[^']*'`, 'g');
        const newContent = content.replace(pattern, `$1'${newVal.replace(/'/g, "\\'")}'`);
        if (newContent !== content) {
          content = newContent;
          updatedCount++;
        }
      });

      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  ✅ Updated ${updatedCount} strings in lang/${lang}.js`);

      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 500));

    } catch (err) {
      console.error(`  ❌ Error for ${lang}:`, err.message);
    }
  }

  console.log('\n✅ Translation complete! Review changes and push to GitHub.\n');
  console.log('Next steps:');
  console.log('  git diff lang/          # Review changes');
  console.log('  git add lang/');
  console.log('  git commit -m "Auto-translate missing strings via Gemini"');
  console.log('  git push origin main');
}

run().catch(console.error);
