// 언어 파일 구조 검증 스크립트 (배포 제외, 로컬 검사용)
// 검사: 풀 길이 일치, opts 길이=4, UI 키 누락, extq 구조
const fs = require('fs');
const vm = require('vm');

function loadInSandbox(files) {
  const sandbox = { window: {}, document: undefined };
  vm.createContext(sandbox);
  for (const f of files) {
    let code = fs.readFileSync(f, 'utf8').replace(/^﻿/, '');
    vm.runInContext(code, sandbox, { filename: f });
  }
  return sandbox;
}

// 1) 한국어 원본 풀 로드 (iq-data.js는 const 선언이라 약간 변형해 추출)
const dataSrc = fs.readFileSync('iq-data.js', 'utf8').replace(/^﻿/, '');
const dataSandbox = { window: {} };
vm.createContext(dataSandbox);
vm.runInContext(dataSrc + '\n;window.__pools={anaPool,logPool,spatPool};', dataSandbox);
const ko = dataSandbox.window.__pools;
console.log(`KO 원본: ana=${ko.anaPool.length} log=${ko.logPool.length} spat=${ko.spatPool.length}`);

const langs = ['en','de','fr','es','pt','it','ja','id'];
const issues = [];

// 2) q-XX.js 구조 검증
for (const l of langs) {
  try {
    const sb = loadInSandbox([`lang/q-${l}.js`]);
    const Q = sb.window.IQ_Q;
    if (!Q) { issues.push(`[${l}] IQ_Q 미정의`); continue; }
    for (const pool of ['anaPool','logPool','spatPool']) {
      if (!Q[pool]) { issues.push(`[${l}] ${pool} 없음`); continue; }
      if (Q[pool].length !== ko[pool].length)
        issues.push(`[${l}] ${pool} 길이 불일치: ${Q[pool].length} vs KO ${ko[pool].length}`);
      Q[pool].forEach((item, i) => {
        if (!item.opts || item.opts.length !== 4)
          issues.push(`[${l}] ${pool}[${i}] opts 길이=${item.opts ? item.opts.length : 'undef'}`);
        const koItem = ko[pool][i];
        if (pool==='logPool' && koItem && !item.premise) issues.push(`[${l}] logPool[${i}] premise 누락`);
        if (pool==='anaPool' && koItem && !item.analogy) issues.push(`[${l}] anaPool[${i}] analogy 누락`);
        if (pool==='spatPool' && koItem && !item.q) issues.push(`[${l}] spatPool[${i}] q 누락`);
      });
    }
    ['qSeqPrompt','qMatPrompt','qAnaPrompt','qLogPrompt'].forEach(k => {
      if (!Q[k]) issues.push(`[${l}] ${k} 누락`);
    });
  } catch (e) { issues.push(`[${l}] q 파일 로드 실패: ${e.message}`); }
}

// 3) UI 키 비교 (en 기준)
const enSb = loadInSandbox(['lang/en.js','lang/extq-en.js']);
const enKeys = Object.keys(enSb.window.IQ_LANG);
for (const l of langs.filter(x => x !== 'en')) {
  try {
    const sb = loadInSandbox([`lang/${l}.js`, `lang/extq-${l}.js`]);
    const keys = new Set(Object.keys(sb.window.IQ_LANG));
    const missing = enKeys.filter(k => !keys.has(k));
    if (missing.length) issues.push(`[${l}] UI 키 누락(${missing.length}): ${missing.slice(0,8).join(',')}${missing.length>8?'...':''}`);
    // extQuestions 구조
    const eq = sb.window.IQ_LANG.extQuestions;
    const enEq = enSb.window.IQ_LANG.extQuestions;
    if (!eq) { issues.push(`[${l}] extQuestions 없음`); }
    else {
      for (const cat of Object.keys(enEq)) {
        if (!eq[cat]) { issues.push(`[${l}] extQuestions.${cat} 없음`); continue; }
        if (Array.isArray(enEq[cat]) && Array.isArray(eq[cat]) && eq[cat].length !== enEq[cat].length)
          issues.push(`[${l}] extQuestions.${cat} 길이: ${eq[cat].length} vs EN ${enEq[cat].length}`);
      }
    }
  } catch (e) { issues.push(`[${l}] UI/extq 로드 실패: ${e.message}`); }
}

console.log(issues.length ? `\n발견된 이슈 ${issues.length}건:\n` + issues.join('\n') : '\n✅ 구조 검증 전체 통과');
