const fs=require('fs'),vm=require('vm');
const NAME={hi:'हिन्दी',ru:'Русский',vi:'Tiếng Việt',tr:'Türkçe'};
const strip=s=>String(s||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const out={};
for(const l of ['hi','ru','vi','tr']){
  const sb={window:{}};vm.createContext(sb);
  vm.runInContext(fs.readFileSync('lang/'+l+'.js','utf8').replace(/^﻿/,''),sb);
  const L=sb.window.IQ_LANG;
  out[l]={
    name:NAME[l],
    locale:L.ogLocale||l,
    title:L.docTitle||'',
    desc:L.metaDesc||'',
    keywords:L.metaKeywords||'',
    h1:strip(L.heroH1),
    h2:strip(L.heroEyebrow),
    body:strip(L.heroP),
    start:L.instStart||'Start',
    features:Array.isArray(L.trustChips)?L.trustChips:[],
    faq:(Array.isArray(L.faqItems)?L.faqItems.slice(0,4):[]).map(f=>({q:f.q,a:f.a})),
    faqH2:L.faqTitle||'FAQ',
    ogResultTitle:'IQ {iq} ({cat}) · Top {top}% 🧠',
    ogResultDesc:L.metaDesc||''
  };
}
const body='// AUTO-GENERATED from lang/*.js — do not edit by hand. Regenerate: node gen-seo-langs.cjs\nexport const SEO_LANGS = '+JSON.stringify(out,null,1)+';\n';
fs.writeFileSync('seo-langs.js',body);
console.log('seo-langs.js written:',Object.keys(out).join(','),'| bytes:',body.length);
