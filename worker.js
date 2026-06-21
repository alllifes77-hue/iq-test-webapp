// Cloudflare Worker: path rewriter + AliExpress affiliate API proxy + SEO wrappers
// /iq-test/* → serves static assets from repo root
// /iq-test/api/ali-products?lang=xx → server-side AliExpress affiliate product feed
// /{hi,ru,vi,tr}/iq-test/ → server-rendered localized SEO landing (embeds the app)

import { SEO_LANGS } from './seo-langs.js';
import { COUNTRY_IQ } from './country-iq.js';
import { HUB_I18N } from './hub-i18n.js';
import { SPOKES } from './spokes-i18n.js';
import { SPOKES2 } from './spokes2-i18n.js';
import { TOOLS_I18N } from './tools-i18n.js';
import { TOOL_FAQ } from './tool-faq-i18n.js';
import { ABOUT_I18N } from './about-i18n.js';
import { GLOSSARY_I18N } from './glossary-i18n.js';
import { DATA_I18N } from './data-i18n.js';
import { STORY_I18N } from './story-i18n.js';

const ALI_APP_KEY = '536770';
const ALI_TRACKING_ID = 'iqtestweb';
const WRAP_LANGS = ['hi', 'ru', 'vi', 'tr'];
// 전체 언어 hreflang 클러스터 (래퍼 보유 8개 + ko + 신규 4개)
const HREFLANG_ALL = ['ko','en','de','ja','fr','es','pt','it','id','hi','ru','vi','tr'];

function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function hreflangHref(l){
  if(l==='ko')return 'https://all-lifes.com/iq-test/';
  if(['en','de','ja','fr','es','pt','it','id'].includes(l))return `https://all-lifes.com/${l}/iq-test/`;
  return `https://all-lifes.com/${l}/iq-test/`; // 신규 4개도 경로형 canonical
}

// ── 권위/신뢰(E-E-A-T) 공통: 최종 수정일 + 검토자 표기 + 출처 ──
const LAST_UPDATED = '2026-06-18';
const AUTH_LABELS = {
  ko:{updated:'최종 수정',reviewed:'All-Lifes 편집팀 감수',sources:'출처 및 참고자료',about:'소개 · 방법론'},
  en:{updated:'Last updated',reviewed:'Reviewed by the All-Lifes editorial team',sources:'Sources & references',about:'About · Methodology'},
  de:{updated:'Zuletzt aktualisiert',reviewed:'Geprüft vom All-Lifes-Redaktionsteam',sources:'Quellen & Referenzen',about:'Über uns · Methodik'},
  ja:{updated:'最終更新',reviewed:'All-Lifes編集チームが監修',sources:'出典・参考資料',about:'運営者情報・方法論'},
  fr:{updated:'Dernière mise à jour',reviewed:"Vérifié par l'équipe éditoriale d'All-Lifes",sources:'Sources et références',about:'À propos · Méthodologie'},
  es:{updated:'Última actualización',reviewed:'Revisado por el equipo editorial de All-Lifes',sources:'Fuentes y referencias',about:'Acerca de · Metodología'},
  pt:{updated:'Última atualização',reviewed:'Revisado pela equipe editorial da All-Lifes',sources:'Fontes e referências',about:'Sobre · Metodologia'},
  it:{updated:'Ultimo aggiornamento',reviewed:'Verificato dal team editoriale di All-Lifes',sources:'Fonti e riferimenti',about:'Chi siamo · Metodologia'},
  id:{updated:'Terakhir diperbarui',reviewed:'Ditinjau oleh tim editorial All-Lifes',sources:'Sumber & referensi',about:'Tentang · Metodologi'},
  hi:{updated:'अंतिम अपडेट',reviewed:'All-Lifes संपादकीय टीम द्वारा समीक्षित',sources:'स्रोत और संदर्भ',about:'परिचय · पद्धति'},
  ru:{updated:'Последнее обновление',reviewed:'Проверено редакцией All-Lifes',sources:'Источники и ссылки',about:'О нас · Методология'},
  vi:{updated:'Cập nhật lần cuối',reviewed:'Được đội ngũ biên tập All-Lifes kiểm duyệt',sources:'Nguồn & tài liệu tham khảo',about:'Giới thiệu · Phương pháp'},
  tr:{updated:'Son güncelleme',reviewed:'All-Lifes editör ekibi tarafından incelendi',sources:'Kaynaklar ve referanslar',about:'Hakkında · Metodoloji'},
};
// 권위 있는 외부 출처 (전 페이지 공통 인용 — Article.citation + 가시 섹션)
const SOURCES = [
  { t:'IQ classification — Wikipedia', u:'https://en.wikipedia.org/wiki/IQ_classification' },
  { t:'Mensa International — What is IQ?', u:'https://www.mensa.org/what-is-iq/' },
  { t:'APA Dictionary of Psychology — Intelligence', u:'https://dictionary.apa.org/intelligence' },
  { t:"Raven's Progressive Matrices — Wikipedia", u:'https://en.wikipedia.org/wiki/Raven%27s_Progressive_Matrices' },
  { t:'Cattell–Horn–Carroll theory — Wikipedia', u:'https://en.wikipedia.org/wiki/Cattell%E2%80%93Horn%E2%80%93Carroll_theory' },
  { t:'Flynn effect — Wikipedia', u:'https://en.wikipedia.org/wiki/Flynn_effect' },
];
const SOURCE_URLS = SOURCES.map(s=>s.u);
const ABOUT_LANGS = ['ko','en','de','ja','fr','es','pt','it','id','hi','ru','vi','tr'];
function aboutUrl(lang){ return `https://all-lifes.com/iq-test/about/${ABOUT_LANGS.includes(lang)?lang:'en'}`; }
// 권위 푸터 (최종 수정 + 검토팀 + About 링크 + 접이식 출처). opts.about=true면 About 링크 포함.
function authorityFooter(lang, opts){
  const A = AUTH_LABELS[lang] || AUTH_LABELS.en;
  const srcs = SOURCES.map(s=>`<li><a href="${s.u}" target="_blank" rel="nofollow noopener">${esc(s.t)}</a></li>`).join('');
  const aboutLink = (opts&&opts.about) ? ` · <a href="${aboutUrl(lang)}">${esc(A.about)}</a>` : '';
  return `<style>.auth{margin:22px 0 4px;padding-top:14px;border-top:1px solid #e2e8f0;}
.auth .am{font-size:11.5px;color:#94a3b8;line-height:1.6;}
.auth .am a{color:#6366f1;text-decoration:none;font-weight:600;}
.auth details{margin-top:8px;}
.auth summary{font-size:12px;font-weight:700;color:#64748b;cursor:pointer;}
.auth details ul{list-style:none;padding:8px 0 0;margin:0;}
.auth details li{margin:5px 0;font-size:12px;}
.auth details a{color:#4f46e5;text-decoration:none;}
.auth-share{margin-top:10px;background:#eef2ff;color:#4338ca;border:1px solid #c7d2fe;border-radius:20px;padding:7px 16px;font-size:12.5px;font-weight:700;cursor:pointer;}</style>
<div class="auth"><div class="am">📅 ${esc(A.updated)}: ${LAST_UPDATED} · ✔ ${esc(A.reviewed)}${aboutLink}</div>
<button class="auth-share" onclick="(function(b){var u=location.href;if(navigator.share){navigator.share({title:document.title,url:u}).catch(function(){});}else if(navigator.clipboard){navigator.clipboard.writeText(u);b.textContent='✓ '+b.textContent;}})(this)">🔗 Share</button>
<details class="auth-src"><summary>📚 ${esc(A.sources)}</summary><ul>${srcs}</ul></details></div>`;
}

// ── 콘텐츠 하위 페이지 상단 광고 존 (AdSense + 알리익스프레스 + 쿠팡(ko)) ──
// 홈/랜딩(최상단)에는 넣지 않고 스포크·도구·국가허브에만 상단 배치.
const ADSENSE_HEAD = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1378943893051810" crossorigin="anonymous"></script>`;
const AD_ZONE_STYLE = `<style>
.top-ads{margin:14px 0 6px;}
.top-ads .adb{text-align:center;min-height:90px;margin-bottom:12px;overflow:hidden;}
.aff-sec{display:none;background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:12px 14px;margin-bottom:12px;}
.aff-sec .aff-h{font-size:14px;font-weight:800;color:#1e1b4b;margin-bottom:2px;}
.aff-sec .aff-d{font-size:10.5px;color:#94a3b8;margin-bottom:9px;}
.aff-sec .ali-row{display:flex;gap:10px;overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:4px;}
.aff-sec .ali-it{flex:0 0 118px;text-decoration:none;color:inherit;}
.aff-sec .ali-it img{width:118px;height:118px;object-fit:cover;border-radius:10px;background:#f1f5f9;}
.aff-sec .ali-n{font-size:11px;color:#334155;margin-top:5px;line-height:1.3;height:29px;overflow:hidden;}
.aff-sec .ali-pr{font-size:12.5px;font-weight:800;color:#e11d48;margin-top:3px;}
.aff-sec .cpng-d{font-size:10px;color:#94a3b8;margin-top:6px;}
</style>`;
const AD_ZONE_BODY = `<div class="top-ads">
  <div class="adb"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-1378943893051810" data-ad-slot="8233374508" data-ad-format="auto" data-full-width-responsive="true"></ins></div>
  <div class="aff-sec" id="ali-top"></div>
  <div class="aff-sec" id="cpng-top"></div>
</div>`;
function adZoneScript(lang){
  return `<script src="https://all-lifes.com/iq-test/affiliate-config.js"></script>
<script>(function(){var lang=${JSON.stringify(lang)};
try{(adsbygoogle=window.adsbygoogle||[]).push({});}catch(e){}
var meta=(window.AFFILIATE_META&&(window.AFFILIATE_META[lang]||window.AFFILIATE_META.en))||{};
fetch('https://all-lifes.com/iq-test/api/ali-products?lang='+lang).then(function(r){return r.ok?r.json():null;}).then(function(d){
 if(!d||!d.products||!d.products.length)return;var items=d.products.slice(0,8);var b=document.getElementById('ali-top');if(!b)return;
 b.innerHTML='<div class="aff-h">'+(meta.title||'\\uD83C\\uDF81')+'</div><div class="aff-d">'+(meta.disc||'')+'</div><div class="ali-row">'+items.map(function(p){return '<a class="ali-it" href="'+p.url+'" target="_blank" rel="noopener sponsored"><img src="'+p.image+'" alt="" loading="lazy"><div class="ali-n">'+String(p.title).replace(/[<>]/g,'').slice(0,52)+'</div><div class="ali-pr">'+p.price+' '+p.currency+'</div></a>';}).join('')+'</div>';
 b.style.display='';
}).catch(function(){});
if(lang==='ko'&&window.COUPANG_WIDGET&&window.COUPANG_WIDGET.enabled){var cfg=window.COUPANG_WIDGET;var b=document.getElementById('cpng-top');if(b){var w=Math.max(cfg.minWidth||300,Math.min(cfg.maxWidth||680,(b.clientWidth||640)-8));b.innerHTML='<iframe src="https://ads-partners.coupang.com/widgets.html?id='+cfg.id+'&template='+cfg.template+'&trackingCode='+cfg.trackingCode+'&subId=iqtest_ko_page&width='+w+'&height='+cfg.height+'" width="'+w+'" height="'+cfg.height+'" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" loading="lazy" browsingtopics></iframe><div class="cpng-d">'+(cfg.disclosure||'')+'</div>';b.style.display='';}}
})();</script>`;
}

function renderSeoWrapper(lang, url){
  const L = SEO_LANGS[lang];
  const p = url.searchParams;
  const canonical = `https://all-lifes.com/${lang}/iq-test/`;
  const isResultShare = p.get('r') === 'iq';
  const iq = p.get('iq')||'100', top = p.get('top')||'50', cat = decodeURIComponent(p.get('cat')||''), mode = p.get('mode')||'short';

  let ogTitle, ogDesc, ogImage;
  if(isResultShare){
    ogTitle = L.ogResultTitle.replace('{iq}',iq).replace('{cat}',cat).replace('{top}',top);
    ogDesc = L.ogResultDesc;
    ogImage = `https://all-lifes.com/og-image?iq=${iq}&top=${top}&cat=${encodeURIComponent(cat)}&lang=${lang}`;
  } else {
    ogTitle = L.title; ogDesc = L.desc;
    ogImage = `https://all-lifes.com/iq-test/og-${lang}.jpg`; // 신규 언어 전용 OG 이미지 (현지화)
  }

  const appSrc = `https://all-lifes.com/iq-test/?lang=${lang}` + (isResultShare?`&r=iq&iq=${iq}&cat=${encodeURIComponent(cat)}&top=${top}&mode=${mode}`:'');
  const hreflangs = HREFLANG_ALL.map(l=>`<link rel="alternate" hreflang="${l}" href="${hreflangHref(l)}">`).join('\n    ')
    + `\n    <link rel="alternate" hreflang="x-default" href="https://all-lifes.com/en/iq-test/">`;
  const appSchema = {"@context":"https://schema.org","@type":"WebApplication","name":L.h1,"description":L.desc,"url":canonical,"applicationCategory":"EducationalApplication","inLanguage":lang,"offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"operatingSystem":"Web"};
  const fqs = (SPOKES[lang] && Array.isArray(SPOKES[lang].faq8) && SPOKES[lang].faq8.length) ? SPOKES[lang].faq8 : L.faq;
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":fqs.map(f=>({"@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}}))};
  const learnLinks = SPOKE_SLUGS.map(slug=>{
    return `<li><a href="https://all-lifes.com/iq-test/learn/${lang}/${slug}">${esc(spokeH1(slug,lang))}</a></li>`;
  }).join('')
    + `<li><a href="${toolsHubUrl(lang)}"><strong>${esc(TOOLS_HUB_I18N[lang]?TOOLS_HUB_I18N[lang].title:'IQ Calculators & Tools')}</strong></a></li>`
    + `<li><a href="${lang==='ko'?'https://all-lifes.com/iq-test/average-iq-by-country':'https://all-lifes.com/iq-test/average-iq-by-country?lang='+lang}">${esc(HUB_I18N[lang]?HUB_I18N[lang].h1:'Average IQ by country')}</a></li>`;
  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"All-Lifes","item":"https://all-lifes.com/"},{"@type":"ListItem","position":2,"name":L.h1,"item":canonical}]};
  const orgSchema = {"@context":"https://schema.org","@type":"Organization","name":"All-Lifes","url":"https://all-lifes.com/","logo":"https://all-lifes.com/iq-test/IQ%20TEST.png","description":"Free science-based IQ and cognitive testing in 13 languages.","knowsAbout":["IQ","intelligence quotient","intelligence testing","psychometrics","cognitive ability","fluid intelligence","crystallized intelligence"],"mainEntityOfPage":aboutUrl(lang)};
  const websiteSchema = {"@context":"https://schema.org","@type":"WebSite","name":L.h1,"url":canonical,"inLanguage":lang,"potentialAction":{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":`https://all-lifes.com/iq-test/search/${lang}?q={search_term_string}`},"query-input":"required name=search_term_string"}};
  const featuresHtml = L.features.map(f=>`<span class="chip">${esc(f)}</span>`).join('');
  const faqHtml = fqs.map(f=>`<div class="faq-item"><div class="faq-q">${esc(f.q)}</div><div class="faq-a">${esc(f.a)}</div></div>`).join('');
  const langBar = HREFLANG_ALL.map(l=>{
    const nm = l==='ko'?'한국어':(SEO_LANGS[l]?SEO_LANGS[l].name:l.toUpperCase());
    return `<a href="${hreflangHref(l)}"${l===lang?' class="active"':''}>${nm}</a>`;
  }).join('');

  const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="icon" type="image/png" href="https://all-lifes.com/iq-test/favicon-${lang}.png">
<link rel="apple-touch-icon" href="https://all-lifes.com/iq-test/favicon-${lang}.png">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1378943893051810" crossorigin="anonymous"></script>
<title>${esc(ogTitle)}</title>
<meta name="description" content="${esc(ogDesc)}">
<meta name="keywords" content="${esc(L.keywords)}">
<link rel="canonical" href="${esc(canonical)}">
    ${hreflangs}
<meta property="og:title" content="${esc(ogTitle)}">
<meta property="og:description" content="${esc(ogDesc)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${esc(L.locale)}">
<meta property="og:image" content="${esc(ogImage)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(ogTitle)}">
<meta name="twitter:image" content="${esc(ogImage)}">
<script type="application/ld+json">${JSON.stringify(appSchema)}</script>
<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
<script type="application/ld+json">${JSON.stringify(orgSchema)}</script>
<script type="application/ld+json">${JSON.stringify(websiteSchema)}</script>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f1f5f9;color:#0f172a;}
.hero{background:linear-gradient(135deg,#1e1b4b,#312e81,#1d4ed8);color:#fff;padding:28px 20px 22px;text-align:center;}
.hero h1{font-size:clamp(20px,3.5vw,34px);font-weight:900;margin-bottom:8px;}
.hero p{font-size:13px;color:#c7d2fe;max-width:540px;margin:0 auto 14px;line-height:1.6;}
.chips{display:flex;flex-wrap:wrap;justify-content:center;gap:7px;margin-bottom:18px;}
.chip{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:20px;padding:4px 13px;font-size:12px;color:#e0e7ff;}
.start-btn{display:inline-block;background:#fff;color:#1e1b4b;font-weight:800;font-size:14px;padding:12px 28px;border-radius:50px;text-decoration:none;box-shadow:0 4px 18px rgba(0,0,0,0.3);}
.lang-bar{background:#1e1b4b;padding:7px 20px;text-align:center;font-size:12px;}
.lang-bar a{color:#a5b4fc;text-decoration:none;margin:0 5px;}
.lang-bar a.active{color:#fff;font-weight:700;}
.iframe-wrap{width:100%;background:#f1f5f9;}
iframe{width:100%;border:none;display:block;height:100vh;}
.seo-section{background:#fff;border-top:1px solid #e2e8f0;padding:36px 20px;}
.seo-section .inner{max-width:760px;margin:0 auto;}
.seo-section h2{font-size:17px;font-weight:800;color:#1e1b4b;margin-bottom:20px;}
.faq-item{border-bottom:1px solid #e2e8f0;padding:14px 0;}
.faq-q{font-size:14px;font-weight:700;color:#0f172a;margin-bottom:5px;}
.faq-a{font-size:13px;color:#475569;line-height:1.7;}
</style>
</head>
<body>
<div class="hero">
  <h1>${esc(L.h1)}</h1>
  <p>${esc(L.body)}</p>
  <div class="chips">${featuresHtml}</div>
  <a class="start-btn" href="${esc(appSrc)}">${esc(L.start)}</a>
</div>
<div class="lang-bar">${langBar}</div>
<div class="iframe-wrap"><iframe id="iq-frame" src="${esc(appSrc)}" scrolling="no" title="${esc(L.h1)}"></iframe></div>
<div class="seo-section"><div class="inner"><h2>📚 ${esc(HUB_I18N[lang]?HUB_I18N[lang].h1:'Learn more')}</h2><ul style="list-style:none;padding:0;margin:0 0 28px;">${learnLinks.replace(/<li>/g,'<li style="margin:8px 0;"><span style="color:#6366f1">›</span> ').replace(/<a /g,'<a style="color:#4f46e5;text-decoration:none;font-weight:600;font-size:14px;" ')}</ul><h2>${esc(L.faqH2)}</h2>${faqHtml}</div></div>
<script>window.addEventListener('message',function(e){if(e.data&&e.data.type==='iq-resize'){document.getElementById('iq-frame').style.height=e.data.height+'px';}});</script>
</body>
</html>`;
  return new Response(html, { headers:{ 'Content-Type':'text/html;charset=UTF-8', 'Cache-Control': isResultShare?'public, max-age=300':'public, max-age=3600', 'X-Robots-Tag':'index, follow' }});
}

// 언어 → AliExpress 타겟 설정 (언어/배송국가/통화)
const ALI_LOCALE = {
  ko: { lang: 'KO', ship: 'KR', cur: 'KRW' },
  en: { lang: 'EN', ship: 'US', cur: 'USD' },
  de: { lang: 'DE', ship: 'DE', cur: 'EUR' },
  fr: { lang: 'FR', ship: 'FR', cur: 'EUR' },
  es: { lang: 'ES', ship: 'ES', cur: 'EUR' },
  pt: { lang: 'PT', ship: 'BR', cur: 'BRL' },
  it: { lang: 'IT', ship: 'IT', cur: 'EUR' },
  ja: { lang: 'JA', ship: 'JP', cur: 'JPY' },
  id: { lang: 'ID', ship: 'US', cur: 'USD' },  // ship_to ID는 API 405 → 언어만 현지화
  hi: { lang: 'EN', ship: 'US', cur: 'USD' },  // 인도는 AliExpress 차단 → 해외 힌디 사용자 대상
  ru: { lang: 'RU', ship: 'RU', cur: 'USD' },
  vi: { lang: 'VI', ship: 'VN', cur: 'VND' },
  tr: { lang: 'TR', ship: 'US', cur: 'USD' },  // ship_to TR은 API 405 → 언어만 현지화
};

async function aliSign(params, secret) {
  const sorted = Object.keys(params).sort().map(k => k + params[k]).join('');
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(sorted));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}

// 국가 → 통화: 방문자 현지 통화로 가격 표시 (AliExpress가 지원하는 통화만; 미지정/미지원은 USD)
// 잘못된/미지원 통화로 0건이 나오면 아래 US/USD 폴백이 자동으로 처리하므로 안전.
const COUNTRY_CUR = {
  KR:'KRW', US:'USD', JP:'JPY', CN:'USD',
  // 유로존
  DE:'EUR', FR:'EUR', ES:'EUR', IT:'EUR', PT:'EUR', NL:'EUR', AT:'EUR', BE:'EUR', IE:'EUR',
  FI:'EUR', GR:'EUR', SK:'EUR', SI:'EUR', LT:'EUR', LV:'EUR', EE:'EUR', LU:'EUR', CY:'EUR', MT:'EUR', HR:'EUR',
  // 기타 현지 통화 (AliExpress 지원)
  BR:'BRL', RU:'RUB', VN:'VND', GB:'GBP', CA:'CAD', AU:'AUD', IN:'INR', ID:'IDR',
  TR:'TRY', PH:'PHP', TH:'THB', MX:'MXN', MY:'MYR', SA:'SAR', AE:'AED', PL:'PLN',
  UA:'UAH', IL:'ILS', SE:'SEK', NO:'NOK', CL:'CLP', CO:'COP', EG:'EGP', NG:'NGN', PK:'PKR'
};

async function handleAliProducts(request, env) {
  const url = new URL(request.url);
  const lang = (url.searchParams.get('lang') || 'en').toLowerCase();
  const loc = ALI_LOCALE[lang] || ALI_LOCALE.en;
  // ── 방문자 실제 국가 IP 기준 배송지 (Cloudflare geo) ──
  // 페이지 언어가 아닌 클릭하는 사람의 국가로 필터 → "해당 국가 미배송" 404 방지
  const country = ((request.cf && request.cf.country) || loc.ship || 'US').toUpperCase();
  const cur = COUNTRY_CUR[country] || 'USD';

  // 엣지 캐시: 언어+국가별 12시간
  const cacheKey = new Request('https://cache.iq-test/ali-products?lang=' + lang + '&c=' + country);
  const cache = caches.default;
  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  if (!env.ALI_APP_SECRET) {
    return new Response(JSON.stringify({ error: 'not_configured' }), { status: 503, headers: { 'Content-Type': 'application/json' } });
  }

  async function query(shipTo, curr) {
    const params = {
      method: 'aliexpress.affiliate.product.query',
      app_key: ALI_APP_KEY,
      timestamp: String(Date.now()),
      sign_method: 'sha256',
      keywords: 'brain teaser puzzle',
      target_currency: curr,
      target_language: loc.lang,
      tracking_id: ALI_TRACKING_ID,
      page_size: '12',
      ship_to_country: shipTo,
      sort: 'LAST_VOLUME_DESC',
    };
    params.sign = await aliSign(params, env.ALI_APP_SECRET);
    try {
      const apiRes = await fetch('https://api-sg.aliexpress.com/sync?' + new URLSearchParams(params).toString());
      const json = await apiRes.json();
      return json?.aliexpress_affiliate_product_query_response?.resp_result?.result?.products?.product || [];
    } catch (e) { return []; }
  }

  // 1차: 방문자 국가 배송. 결과 없으면(일부 국가 API 미지원) US 폴백 — 노출은 유지
  let usedCur = cur;
  let list = await query(country, cur);
  if (!list.length && country !== 'US') { list = await query('US', 'USD'); usedCur = 'USD'; }

  const products = list.slice(0, 8).map(p => ({
    title: p.product_title || '',
    image: (p.product_main_image_url || '').replace(/^http:/, 'https:'),
    price: p.target_sale_price || '',
    currency: p.target_sale_price_currency || usedCur,
    url: p.promotion_link || '',
    orders: p.lastest_volume || p.latest_volume || 0,
  })).filter(p => p.url && p.image);

  const res = new Response(JSON.stringify({ lang, country, products }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600, s-maxage=43200',
      'Access-Control-Allow-Origin': '*',
    },
  });
  if (products.length) await cache.put(cacheKey, res.clone());
  return res;
}

async function handleSubscribe(request, env){
  const cors = { 'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*' };
  try{
    const { email, lang } = await request.json();
    if(!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){
      return new Response(JSON.stringify({ ok:false, error:'invalid_email' }), { status:400, headers:cors });
    }
    if(env.SUBSCRIBERS){
      const key = email.toLowerCase().slice(0,200);
      const existing = await env.SUBSCRIBERS.get(key);
      if(!existing){
        await env.SUBSCRIBERS.put(key, JSON.stringify({ lang: (lang||'').slice(0,5), ts: Date.now() }));
      }
    }
    return new Response(JSON.stringify({ ok:true }), { headers:cors });
  }catch(e){
    return new Response(JSON.stringify({ ok:false, error:'bad_request' }), { status:400, headers:cors });
  }
}

// ── 국가별 평균 IQ SEO 허브 (책임 있는 중립 프레이밍) ──
function renderCountryHub(url){
  const langParam = (url.searchParams.get('lang')||'ko').toLowerCase();
  const lang = HUB_I18N[langParam] ? langParam : 'en';
  const L = HUB_I18N[lang];
  const base = 'https://all-lifes.com/iq-test/average-iq-by-country';
  const canonical = lang==='ko' ? base : `${base}?lang=${lang}`;
  const appUrl = lang==='ko' ? 'https://all-lifes.com/iq-test/' : `https://all-lifes.com/iq-test/?lang=${lang}`;

  const sorted = COUNTRY_IQ.slice().sort((a,b)=>b.iq-a.iq);
  const rows = sorted.map((r,i)=>`<tr><td class="rk">${i+1}</td><td>${esc(r.c)}</td><td class="iq">${r.iq}</td></tr>`).join('');
  // 데이터 시각화 막대 차트 (다른 분야: 데이터 저널리즘) — 상위 12개국
  const top = sorted.slice(0,12); const maxIQ = top[0].iq, minScale = 85;
  const barChart = `<svg viewBox="0 0 360 ${top.length*26+8}" width="100%" height="${top.length*26+8}" role="img" aria-label="Top countries by average IQ" style="margin:4px 0 8px;">${top.map((r,i)=>{const w=Math.max(4,(r.iq-minScale)/(maxIQ-minScale)*200);const y=i*26+4;return `<text x="0" y="${y+14}" font-size="11" fill="#475569">${esc(r.c).slice(0,16)}</text><rect x="150" y="${y+3}" width="${w}" height="15" rx="3" fill="#4f46e5"/><text x="${150+w+5}" y="${y+14}" font-size="11" font-weight="700" fill="#1e1b4b">${r.iq}</text>`;}).join('')}</svg>`;

  const hreflangs = HREFLANG_ALL.map(l=>{
    const href = l==='ko' ? base : `${base}?lang=${l}`;
    return `<link rel="alternate" hreflang="${l}" href="${href}">`;
  }).join('\n    ') + `\n    <link rel="alternate" hreflang="x-default" href="${base}?lang=en">`;

  const itemList = { "@context":"https://schema.org","@type":"ItemList","name":L.h1,
    "itemListElement": COUNTRY_IQ.slice().sort((a,b)=>b.iq-a.iq).map((r,i)=>({"@type":"ListItem","position":i+1,"name":r.c})) };

  const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="icon" type="image/png" href="https://all-lifes.com/iq-test/favicon-${lang}.png">
<title>${esc(L.title)}</title>
<meta name="description" content="${esc(L.desc)}">
<meta name="keywords" content="${esc(L.keywords)}">
<link rel="canonical" href="${esc(canonical)}">
    ${hreflangs}
<meta property="og:title" content="${esc(L.title)}">
<meta property="og:description" content="${esc(L.desc)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:type" content="article">
<meta property="og:image" content="${ogImg(lang)}">
${socialMeta(lang)}
<script type="application/ld+json">${JSON.stringify(itemList)}</script>
${ADSENSE_HEAD}
${AD_ZONE_STYLE}
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f1f5f9;color:#0f172a;line-height:1.6;}
.hero{background:linear-gradient(135deg,#1e1b4b,#312e81,#1d4ed8);color:#fff;padding:34px 20px 26px;text-align:center;}
.hero h1{font-size:clamp(20px,3.4vw,30px);font-weight:900;max-width:760px;margin:0 auto 10px;}
.hero p{font-size:14px;color:#c7d2fe;max-width:680px;margin:0 auto;}
.wrap{max-width:760px;margin:0 auto;padding:22px 18px 50px;}
.caveat{background:#fef3c7;border:1px solid #f59e0b;border-radius:12px;padding:14px 16px;font-size:13px;color:#7c4a03;margin:18px 0;}
table{width:100%;border-collapse:collapse;background:#fff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;font-size:14px;}
thead{background:#1e1b4b;color:#fff;}
th,td{padding:11px 14px;text-align:left;}
td.rk{color:#94a3b8;width:42px;font-weight:700;}
td.iq{text-align:right;font-weight:800;color:#4f46e5;}
tbody tr:nth-child(even){background:#f8fafc;}
tbody tr{border-top:1px solid #eef2f7;}
.how{margin-top:26px;background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:18px 20px;}
.how h2{font-size:16px;font-weight:800;margin-bottom:8px;color:#1e1b4b;}
.how p{font-size:13px;color:#475569;}
.cta{display:block;text-align:center;margin:24px auto 0;max-width:420px;background:linear-gradient(135deg,#4f46e5,#6366f1);color:#fff;font-weight:800;font-size:16px;padding:14px;border-radius:12px;text-decoration:none;box-shadow:0 6px 20px rgba(79,70,229,.35);}
.back{display:block;text-align:center;margin-top:14px;color:#64748b;font-size:13px;text-decoration:none;}
#hub-ali{margin-top:26px;}
#hub-ali h2{font-size:16px;font-weight:800;color:#1e1b4b;margin-bottom:4px;}
#hub-ali .disc{font-size:11px;color:#94a3b8;margin-bottom:12px;}
.ali-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;}
.ali-card{display:flex;flex-direction:column;background:#fff;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;text-decoration:none;color:#0f172a;transition:transform .15s;}
.ali-card:hover{transform:translateY(-2px);}
.ali-card img{width:100%;aspect-ratio:1;object-fit:cover;background:#fff;}
.ali-t{font-size:11px;line-height:1.4;color:#475569;padding:7px 9px 2px;height:36px;overflow:hidden;}
.ali-p{font-size:13px;font-weight:800;color:#4f46e5;padding:0 9px 9px;}
</style>
</head>
<body>
<div class="hero"><h1>${esc(L.h1)}</h1><p>${esc(L.intro)}</p></div>
<div class="wrap">
  ${AD_ZONE_BODY}
  <div class="caveat">${esc(L.caveat)}</div>
  <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:14px 16px;margin-bottom:14px;">${barChart}</div>
  <table><thead><tr><th>#</th><th>${esc(L.colCountry)}</th><th style="text-align:right">${esc(L.colIQ)}</th></tr></thead><tbody>${rows}</tbody></table>
  <div class="how"><h2>${esc(L.howTitle)}</h2><p>${esc(L.howBody)}</p></div>
  ${authorityFooter(lang,{about:true})}
  <a class="cta" href="${esc(appUrl)}">${esc(L.cta)}</a>
  <a class="back" href="${esc(appUrl)}">${esc(L.backHome)}</a>
</div>
${adZoneScript(lang)}
</body>
</html>`;
  return new Response(html, { headers:{ 'Content-Type':'text/html;charset=UTF-8', 'Cache-Control':'public, max-age=86400', 'X-Robots-Tag':'index, follow' }});
}

// ── 허브-스포크 설명 페이지 (토픽 권위 + AI 인용) ──
const SPOKE_SLUGS = ['good-iq-score','iq-percentile-chart','online-iq-test-accuracy','improve-iq','genius-iq','average-iq-by-age','child-cognitive-development','mensa-iq-requirements','fluid-vs-crystallized-intelligence','reverse-flynn-effect','ai-cognitive-offloading','can-ai-pass-iq-test','iq-vs-eq','iq-test-types','verbal-vs-nonverbal-iq','nature-vs-nurture-intelligence','multiple-intelligences','does-iq-predict-success','history-of-iq-testing','heritability-of-intelligence','environment-and-intelligence','theories-of-intelligence','intelligence-and-the-brain'];
const SPOKE_TABLE = ['good-iq-score','iq-percentile-chart'];
// 스포크 데이터 병합 조회 (기존 SPOKES + 신규 SPOKES2), 언어 없으면 en 폴백
function spokeRec(slug, lang){
  if(SPOKES[lang] && SPOKES[lang].spokes && SPOKES[lang].spokes[slug]) return { sp: SPOKES[lang].spokes[slug], useLang: lang, S: SPOKES[lang] };
  if(SPOKES2[lang] && SPOKES2[lang][slug]) return { sp: SPOKES2[lang][slug], useLang: lang, S: SPOKES[lang] || SPOKES.en };
  if(SPOKES.en && SPOKES.en.spokes && SPOKES.en.spokes[slug]) return { sp: SPOKES.en.spokes[slug], useLang: 'en', S: SPOKES.en };
  if(SPOKES2.en && SPOKES2.en[slug]) return { sp: SPOKES2.en[slug], useLang: 'en', S: SPOKES.en };
  return null;
}
const spokeH1 = (slug, lang) => { const r = spokeRec(slug, lang); return r ? r.sp.h1 : slug; };
const PAA_I18N = {ko:'함께 많이 찾는 질문',en:'People also ask',de:'Häufig gestellte Fragen',ja:'よく一緒に検索される質問',fr:'Questions fréquentes',es:'La gente también pregunta',pt:'As pessoas também perguntam',it:'Le persone chiedono anche',id:'Orang juga bertanya',hi:'लोग यह भी पूछते हैं',ru:'Похожие вопросы',vi:'Mọi người cũng hỏi',tr:'İnsanlar bunları da soruyor'};
const TLDR_I18N = {ko:'핵심 요약',en:'Key takeaways',de:'Das Wichtigste',ja:'要点',fr:'À retenir',es:'Puntos clave',pt:'Resumo',it:'In sintesi',id:'Ringkasan',hi:'मुख्य बातें',ru:'Кратко',vi:'Tóm tắt',tr:'Özet'};
const PASF_I18N = {ko:'함께 검색한 항목',en:'People also search for',de:'Ebenfalls gesucht',ja:'関連検索',fr:'Recherches associées',es:'También se busca',pt:'Também pesquisam',it:'Ricerche correlate',id:'Pencarian terkait',hi:'संबंधित खोजें',ru:'Также ищут',vi:'Tìm kiếm liên quan',tr:'İlgili aramalar'};
const TAKE_TEST_I18N = {ko:'무료 검사',en:'Free test',de:'Gratis-Test',ja:'無料テスト',fr:'Test gratuit',es:'Test gratis',pt:'Teste grátis',it:'Test gratis',id:'Tes gratis',hi:'मुफ़्त टेस्ट',ru:'Тест',vi:'Test miễn phí',tr:'Ücretsiz test'};
// 스티키 플로팅 CTA (다른 분야: CRO) — 콘텐츠 페이지 하단 고정
function stickyCta(lang, appUrl){
  return `<a class="sticky-cta" href="${appUrl}">🧠 ${esc(TAKE_TEST_I18N[lang]||TAKE_TEST_I18N.en)}</a><style>.sticky-cta{position:fixed;right:14px;bottom:14px;z-index:50;background:linear-gradient(135deg,#4f46e5,#6366f1);color:#fff;font-weight:800;font-size:14px;padding:12px 18px;border-radius:30px;text-decoration:none;box-shadow:0 6px 20px rgba(79,70,229,.45);}@media(min-width:1100px){.sticky-cta{right:calc(50% - 520px);}}</style>`;
}
// 읽기 진행률 바 (다른 분야: 블로그/미디어 — 인게이지먼트)
const PROGRESS_BAR = `<div id="rpb" style="position:fixed;top:0;left:0;height:3px;width:0;background:linear-gradient(90deg,#6366f1,#4f46e5);z-index:60;transition:width .1s;"></div><script>document.addEventListener('scroll',function(){var h=document.documentElement;var p=h.scrollTop/(h.scrollHeight-h.clientHeight)*100;var b=document.getElementById('rpb');if(b)b.style.width=(p||0)+'%';},{passive:true});</script>`;
const SPOKE_ROWS = [
  { r:'130+',    p:'98–99.9', pop:'~2%'  },
  { r:'120–129', p:'91–97',   pop:'~8%'  },
  { r:'110–119', p:'75–90',   pop:'~16%' },
  { r:'90–109',  p:'25–73',   pop:'~50%' },
  { r:'80–89',   p:'9–24',    pop:'~16%' },
  { r:'70–79',   p:'2–8',     pop:'~7%'  },
  { r:'<70',     p:'<2',      pop:'~2%'  },
];
const spokePillarUrl = (lang) => lang==='ko' ? 'https://all-lifes.com/iq-test/' : `https://all-lifes.com/${lang}/iq-test/`;
const spokeUrl = (slug, lang) => `https://all-lifes.com/iq-test/learn/${lang}/${slug}`;
const countryHubUrl = (lang) => lang==='ko' ? 'https://all-lifes.com/iq-test/average-iq-by-country' : `https://all-lifes.com/iq-test/average-iq-by-country?lang=${lang}`;

function renderSpoke(slug, lang){
  if(!SPOKE_SLUGS.includes(slug)) return null;
  const rec = spokeRec(slug, lang);
  if(!rec) return null;
  const sp = rec.sp, useLang = rec.useLang, S = rec.S;
  const H = HUB_I18N[useLang] || HUB_I18N.en;
  const canonical = spokeUrl(slug, useLang);
  const pillar = spokePillarUrl(useLang);
  const appUrl = useLang==='ko' ? 'https://all-lifes.com/iq-test/' : `https://all-lifes.com/iq-test/?lang=${useLang}`;

  const sectionsHtml = sp.sections.map((s,i)=>{
    const a = String(s.a);
    const cut = (() => { const m = a.match(/[.!?。？！]\s/); return m ? m.index + 1 : a.length; })();
    return `<section class="qa" id="q${i}"><h2>${esc(s.q)}</h2><p><strong>${esc(a.slice(0,cut))}</strong>${esc(a.slice(cut))}</p></section>`;
  }).join('');
  // 위키식 목차 (다른 분야: 백과사전 — 체류시간·사이트링크)
  const tocHtml = sp.sections.length>=3 ? `<nav class="toc"><ul>${sp.sections.map((s,i)=>`<li><a href="#q${i}">${esc(s.q)}</a></li>`).join('')}</ul></nav>` : '';
  // PAA 아코디언 (다른 분야: Q&A 플랫폼 — 체류시간·내부링크). 순수 <details>, JS 불필요.
  const paaSlugs = SPOKE_SLUGS.filter(s=>s!==slug).slice(0,5);
  const paaItems = paaSlugs.map(s=>{ const r2 = spokeRec(s, useLang); if(!r2) return ''; return `<details class="pa"><summary>${esc(r2.sp.h1)}</summary><div class="pad"><p>${esc(r2.sp.intro)}</p><a href="${spokeUrl(s,useLang)}">${esc(spokeH1(s,useLang))} →</a></div></details>`; }).join('');
  const paaHtml = paaItems ? `<div class="paa"><h2>❓ ${esc(PAA_I18N[useLang]||PAA_I18N.en)}</h2>${paaItems}</div>` : '';
  // TL;DR 핵심 요약 (다른 분야: AEO/AI Overviews — 첫 문장 추출, 새 텍스트 없음)
  const tldrHtml = `<div class="tldr"><div class="tl-h">📌 ${esc(TLDR_I18N[useLang]||TLDR_I18N.en)}</div><ul>${sp.sections.map(s=>{const a=String(s.a);const m=a.match(/[.!?。？！]\s/);return `<li>${esc(m?a.slice(0,m.index+1):a)}</li>`;}).join('')}</ul></div>`;
  // People also search for (다른 분야: SERP 피처 모방 — 내부링크)
  const pasfHtml = `<div class="pasf"><span class="pf-h">${esc(PASF_I18N[useLang]||PASF_I18N.en)}:</span>${SPOKE_SLUGS.filter(s=>s!==slug).slice(0,6).map(s=>`<a href="${spokeUrl(s,useLang)}">${esc(spokeH1(s,useLang))}</a>`).join('')}</div>`;

  let tableHtml = '';
  if(SPOKE_TABLE.includes(slug) && Array.isArray(S.tableHeaders) && Array.isArray(S.classLabels)){
    const h = S.tableHeaders, cl = S.classLabels;
    const rows = SPOKE_ROWS.map((row,i)=>`<tr><td class="rg">${esc(row.r)}</td><td>${esc(cl[i]||'')}</td><td>${esc(row.p)}</td><td>${esc(row.pop)}</td></tr>`).join('');
    tableHtml = `<table class="cls"><thead><tr><th>${esc(h[0]||'IQ')}</th><th>${esc(h[1]||'Class')}</th><th>${esc(h[2]||'Percentile')}</th><th>${esc(h[3]||'%')}</th></tr></thead><tbody>${rows}</tbody></table>`;
  } else if(sp.table && Array.isArray(sp.table.headers) && Array.isArray(sp.table.rows)){
    // 신규 스포크용 범용 데이터 표 (sp.table = {title, headers[], rows[][]})
    const th = sp.table.headers.map(x=>`<th>${esc(x)}</th>`).join('');
    const tr = sp.table.rows.map(row=>`<tr>${row.map((cell,i)=>`<td${i===0?' class="rg"':''}>${esc(cell)}</td>`).join('')}</tr>`).join('');
    tableHtml = `${sp.table.title?`<h2 class="tbl-cap">${esc(sp.table.title)}</h2>`:''}<table class="cls"><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table>`;
  }

  const related = SPOKE_SLUGS.filter(s=>s!==slug).map(s=>{
    return `<li><a href="${spokeUrl(s,useLang)}">${esc(spokeH1(s,useLang))}</a></li>`;
  }).join('') + `<li><a href="${countryHubUrl(useLang)}">${esc(HUB_I18N[useLang]?HUB_I18N[useLang].h1:'Average IQ by country')}</a></li>`;

  const hreflangs = HREFLANG_ALL.map(l=>`<link rel="alternate" hreflang="${l}" href="${spokeUrl(slug,l)}">`).join('\n    ') + `\n    <link rel="alternate" hreflang="x-default" href="${spokeUrl(slug,'en')}">`;

  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":sp.sections.map(s=>({"@type":"Question","name":s.q,"acceptedAnswer":{"@type":"Answer","text":s.a}}))};
  const breadcrumb = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"All-Lifes","item":"https://all-lifes.com/"},{"@type":"ListItem","position":2,"name":"IQ Test","item":pillar},{"@type":"ListItem","position":3,"name":sp.h1,"item":canonical}]};
  const article = {"@context":"https://schema.org","@type":"Article","headline":sp.h1,"description":sp.desc,"inLanguage":useLang,"datePublished":"2026-05-01","dateModified":LAST_UPDATED,"author":{"@type":"Organization","name":"All-Lifes","url":"https://all-lifes.com/","knowsAbout":["IQ","intelligence testing","psychometrics","cognitive ability"]},"publisher":{"@type":"Organization","name":"All-Lifes","logo":{"@type":"ImageObject","url":"https://all-lifes.com/iq-test/IQ%20TEST.png"}},"citation":SOURCE_URLS,"speakable":{"@type":"SpeakableSpecification","cssSelector":[".qa h2",".qa p"]},"mainEntityOfPage":canonical};

  const html = `<!DOCTYPE html>
<html lang="${useLang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="icon" type="image/png" href="https://all-lifes.com/iq-test/favicon-${useLang}.png">
<title>${esc(sp.title)}</title>
<meta name="description" content="${esc(sp.desc)}">
<meta name="keywords" content="${esc(sp.keywords||'')}">
<link rel="canonical" href="${esc(canonical)}">
    ${hreflangs}
<meta property="og:title" content="${esc(sp.title)}">
<meta property="og:description" content="${esc(sp.desc)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:type" content="article">
<meta property="og:image" content="${ogImg(useLang)}">
${socialMeta(useLang)}
<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>
<script type="application/ld+json">${JSON.stringify(article)}</script>
${ADSENSE_HEAD}
${AD_ZONE_STYLE}
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f1f5f9;color:#0f172a;line-height:1.7;}
.hero{background:linear-gradient(135deg,#1e1b4b,#312e81,#1d4ed8);color:#fff;padding:34px 20px 26px;text-align:center;}
.hero h1{font-size:clamp(20px,3.4vw,30px);font-weight:900;max-width:780px;margin:0 auto 10px;}
.hero p{font-size:14px;color:#c7d2fe;max-width:700px;margin:0 auto;}
.crumb{max-width:760px;margin:0 auto;padding:10px 18px 0;font-size:12px;color:#64748b;}
.crumb a{color:#4f46e5;text-decoration:none;}
.wrap{max-width:760px;margin:0 auto;padding:14px 18px 50px;}
.toc{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:14px 18px;margin-top:4px;}
.toc ul{list-style:none;padding:0;margin:0;}
.toc li{margin:6px 0;font-size:13.5px;}
.toc a{color:#4f46e5;text-decoration:none;font-weight:600;}
.paa{margin-top:28px;}
.paa h2{font-size:17px;font-weight:800;color:#1e1b4b;margin-bottom:10px;}
.paa .pa{background:#fff;border:1px solid #e2e8f0;border-radius:10px;margin-bottom:8px;padding:0 14px;}
.paa summary{cursor:pointer;font-weight:700;font-size:14px;color:#1e1b4b;padding:12px 0;list-style:none;}
.paa summary::-webkit-details-marker{display:none;}
.paa summary::after{content:'+';float:right;color:#6366f1;font-weight:800;}
.paa details[open] summary::after{content:'–';}
.paa .pad{padding:0 0 12px;font-size:13px;color:#475569;}
.paa .pad a{color:#4f46e5;text-decoration:none;font-weight:600;display:inline-block;margin-top:6px;}
.tldr{background:#eef2ff;border:1px solid #c7d2fe;border-radius:12px;padding:14px 18px;margin-top:6px;}
.tldr .tl-h{font-size:13px;font-weight:800;color:#3730a3;margin-bottom:8px;}
.tldr ul{margin:0;padding-left:18px;}
.tldr li{font-size:13px;color:#334155;margin:5px 0;}
.pasf{margin-top:22px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;}
.pasf .pf-h{font-size:12.5px;font-weight:700;color:#64748b;}
.pasf a{font-size:12.5px;background:#fff;border:1px solid #e2e8f0;border-radius:20px;padding:6px 13px;color:#4f46e5;text-decoration:none;font-weight:600;}
.pasf a:hover{border-color:#6366f1;}
.qa{margin-top:22px;scroll-margin-top:12px;}
.qa h2{font-size:18px;font-weight:800;color:#1e1b4b;margin-bottom:6px;}
.qa p{font-size:14px;color:#334155;}
.qa strong{color:#0f172a;}
table.cls{width:100%;border-collapse:collapse;background:#fff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;font-size:13px;margin:18px 0;}
table.cls thead{background:#1e1b4b;color:#fff;}
table.cls th,table.cls td{padding:9px 12px;text-align:left;}
table.cls td.rg{font-weight:800;color:#4f46e5;white-space:nowrap;}
table.cls tbody tr:nth-child(even){background:#f8fafc;}
table.cls tbody tr{border-top:1px solid #eef2f7;}
.cta{display:block;text-align:center;margin:26px auto 0;max-width:420px;background:linear-gradient(135deg,#4f46e5,#6366f1);color:#fff;font-weight:800;font-size:16px;padding:14px;border-radius:12px;text-decoration:none;box-shadow:0 6px 20px rgba(79,70,229,.35);}
.related{margin-top:30px;padding-top:18px;border-top:1px solid #e2e8f0;}
.related h2{font-size:15px;font-weight:800;color:#1e1b4b;margin-bottom:10px;}
.related ul{list-style:none;}
.related li{margin:7px 0;}
.related a{color:#4f46e5;text-decoration:none;font-size:14px;font-weight:600;}
.tbl-cap{font-size:15px;font-weight:800;color:#1e1b4b;margin:18px 0 -6px;}
.back{display:block;text-align:center;margin-top:14px;color:#64748b;font-size:13px;text-decoration:none;}
</style>
</head>
<body>
${PROGRESS_BAR}
${stickyCta(useLang, appUrl)}
<a href="#main" style="position:absolute;left:-999px;top:0;">Skip to content</a>
<div class="hero"><h1>${esc(sp.h1)}</h1><p>${esc(sp.intro)}</p></div>
<div class="crumb"><a href="${pillar}">IQ Test</a> › ${esc(sp.h1)}</div>
<div class="wrap" id="main">
  ${AD_ZONE_BODY}
  ${tldrHtml}
  ${tocHtml}
  ${sectionsHtml}
  ${tableHtml}
  <a class="cta" href="${appUrl}">${esc(H.cta || '🧠 Take the free IQ test →')}</a>
  ${paaHtml}
  <div class="related"><h2>🔗 ${esc(H.h1 || 'Learn more')}</h2><ul>${related}</ul></div>
  ${pasfHtml}
  ${authorityFooter(useLang,{about:true})}
  <a class="back" href="${pillar}">${esc(H.backHome || '← Back to the IQ Test')}</a>
</div>
${adZoneScript(useLang)}
</body>
</html>`;
  return new Response(html, { headers:{ 'Content-Type':'text/html;charset=UTF-8', 'Cache-Control':'public, max-age=86400', 'X-Robots-Tag':'index, follow' }});
}

// ══════════════════════════════════════════════════════════════
// 인터랙티브 계산기 도구 (서비스 기둥) — /iq-test/tools/<lang>/<slug>
// 공통 수학: 정규분포 CDF/역CDF. 모든 백분위·희귀도가 여기서 파생.
// ══════════════════════════════════════════════════════════════
function sErf(x){ const t=1/(1+0.3275911*Math.abs(x)); const y=1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-0.284496736)*t+0.254829592)*t*Math.exp(-x*x); return x>=0?y:-y; }
function sNcdf(z){ return 0.5*(1+sErf(z/Math.SQRT2)); }
function pctOf(iq, sd){ sd=sd||15; return sNcdf((iq-100)/sd)*100; }
function rarityN(pct){ const p=pct/100; const tail = p>=0.5 ? (1-p) : p; if(tail<=0) return 1e9; return Math.round(1/tail); }
function clsIdx(iq){ return iq>=130?0:iq>=120?1:iq>=110?2:iq>=90?3:iq>=80?4:iq>=70?5:6; }
function fmtPct(pct){ const v = pct>=99.9?99.9:(pct<=0.1?0.1:pct); return (v>=10?v.toFixed(1):v.toFixed(1)); }
// 역정규분포 CDF (Acklam) — 백분위 → z
function sInvNcdf(p){ if(p<=0)return -4; if(p>=1)return 4; var a=[-39.6968302866538,220.946098424521,-275.928510446969,138.357751867269,-30.6647980661472,2.50662827745924],b=[-54.4760987982241,161.585836858041,-155.698979859887,66.8013118877197,-13.2806815528857],c=[-0.00778489400243029,-0.322396458041136,-2.40075827716184,-2.54973253934373,4.37466414146497,2.93816398269878],d=[0.00778469570904146,0.32246712907004,2.445134137143,3.75440866190742],pl=0.02425,ph=1-pl,q,r,x; if(p<pl){q=Math.sqrt(-2*Math.log(p));x=(((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5])/((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);}else if(p<=ph){q=p-0.5;r=q*q;x=(((((a[0]*r+a[1])*r+a[2])*r+a[3])*r+a[4])*r+a[5])*q/(((((b[0]*r+b[1])*r+b[2])*r+b[3])*r+b[4])*r+1);}else{q=Math.sqrt(-2*Math.log(1-p));x=-(((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5])/((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);} return x; }
function iqForPercentile(p){ return Math.round(100 + 15*sInvNcdf(p/100)); }
function rarityAtPct(p){ const t = p>=50 ? (100-p) : p; if(t<=0) return 1e9; return Math.round(100/t); }

const TOOL_SLUGS = {
  'iq-percentile-calculator': 'percentile',
  'iq-score-meaning': 'scoreMeaning',
  'parent-child-iq-calculator': 'parentChild',
  'iq-scale-converter': 'scaleConverter',
  'iq-by-country': 'country',
  'average-iq-by-age-calculator': 'byAge',
};
const toolUrl = (slug, lang) => `https://all-lifes.com/iq-test/tools/${lang}/${slug}`;
const toolsHubUrl = (lang) => `https://all-lifes.com/iq-test/tools/${lang}`;
const ogImg = (lang) => ['hi','ru','vi','tr'].includes(lang) ? `https://all-lifes.com/iq-test/og-${lang}.jpg` : `https://all-lifes.com/iq-test/og-${lang}.png`;
const OG_LOCALE = {ko:'ko_KR',en:'en_US',de:'de_DE',ja:'ja_JP',fr:'fr_FR',es:'es_ES',pt:'pt_BR',it:'it_IT',id:'id_ID',hi:'hi_IN',ru:'ru_RU',vi:'vi_VN',tr:'tr_TR'};
// 소셜(Twitter/OG) + PWA 메타 — 전 서버 페이지 공통 (다른 분야: 소셜미디어·앱)
function socialMeta(lang){
  return `<meta property="og:site_name" content="All-Lifes"><meta property="og:locale" content="${OG_LOCALE[lang]||'en_US'}"><meta property="og:updated_time" content="${LAST_UPDATED}T00:00:00Z"><meta property="article:modified_time" content="${LAST_UPDATED}T00:00:00Z"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${ogImg(lang)}"><meta name="theme-color" content="#4f46e5"><link rel="manifest" href="https://all-lifes.com/iq-test/manifest.webmanifest"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="IQ Test"><link rel="alternate" type="application/rss+xml" title="All-Lifes IQ" href="https://all-lifes.com/iq-test/feed/${lang}.xml">`;
}

// 계산기 허브 페이지 다국어 헤더
const TOOLS_HUB_I18N = {
  ko:{title:'IQ 계산기 & 도구',sub:'백분위·희귀도·척도 변환 등 무료 IQ 계산기 모음',calc:'🛠 계산기',learn:'📚 설명 가이드',meta:'무료 IQ 계산기 모음 — 백분위·희귀도·척도 변환·부모자녀 IQ 예측·국가 비교를 한곳에서.'},
  en:{title:'Free IQ Calculators & Tools',sub:'Percentile, rarity, scale conversion and more — instant and free',calc:'🛠 Calculators',learn:'📚 Guides',meta:'Free IQ calculators in one place: percentile, rarity, scale conversion, parent-child IQ and country comparison.'},
  de:{title:'Kostenlose IQ-Rechner & Tools',sub:'Perzentil, Seltenheit, Skalenumrechnung und mehr',calc:'🛠 Rechner',learn:'📚 Ratgeber',meta:'Kostenlose IQ-Rechner an einem Ort: Perzentil, Seltenheit, Skalenumrechnung, Eltern-Kind-IQ und Ländervergleich.'},
  ja:{title:'無料IQ計算ツール',sub:'パーセンタイル・希少度・尺度変換などの無料ツール',calc:'🛠 計算ツール',learn:'📚 解説ガイド',meta:'無料IQ計算ツール集：パーセンタイル・希少度・尺度変換・親子IQ予測・国別比較。'},
  fr:{title:'Calculateurs de QI gratuits',sub:'Centile, rareté, conversion d’échelle et plus',calc:'🛠 Calculateurs',learn:'📚 Guides',meta:'Calculateurs de QI gratuits : centile, rareté, conversion d’échelle, QI parent-enfant et comparaison par pays.'},
  es:{title:'Calculadoras de CI gratis',sub:'Percentil, rareza, conversión de escala y más',calc:'🛠 Calculadoras',learn:'📚 Guías',meta:'Calculadoras de CI gratis: percentil, rareza, conversión de escala, CI padres-hijos y comparación por país.'},
  pt:{title:'Calculadoras de QI grátis',sub:'Percentil, raridade, conversão de escala e mais',calc:'🛠 Calculadoras',learn:'📚 Guias',meta:'Calculadoras de QI grátis: percentil, raridade, conversão de escala, QI pais-filhos e comparação por país.'},
  it:{title:'Calcolatori di QI gratuiti',sub:'Percentile, rarità, conversione di scala e altro',calc:'🛠 Calcolatori',learn:'📚 Guide',meta:'Calcolatori di QI gratuiti: percentile, rarità, conversione di scala, QI genitori-figli e confronto per paese.'},
  id:{title:'Kalkulator IQ Gratis',sub:'Persentil, kelangkaan, konversi skala, dan lainnya',calc:'🛠 Kalkulator',learn:'📚 Panduan',meta:'Kalkulator IQ gratis: persentil, kelangkaan, konversi skala, IQ orang tua-anak, dan perbandingan negara.'},
  hi:{title:'मुफ़्त IQ कैलकुलेटर और टूल',sub:'पर्सेंटाइल, दुर्लभता, स्केल रूपांतरण और अधिक',calc:'🛠 कैलकुलेटर',learn:'📚 गाइड',meta:'मुफ़्त IQ कैलकुलेटर: पर्सेंटाइल, दुर्लभता, स्केल रूपांतरण, माता-पिता-बच्चे का IQ और देश तुलना।'},
  ru:{title:'Бесплатные IQ-калькуляторы',sub:'Процентиль, редкость, конвертация шкал и другое',calc:'🛠 Калькуляторы',learn:'📚 Гайды',meta:'Бесплатные IQ-калькуляторы: процентиль, редкость, конвертация шкал, IQ родителей и детей, сравнение по странам.'},
  vi:{title:'Công cụ tính IQ miễn phí',sub:'Phân vị, độ hiếm, chuyển đổi thang đo và hơn thế',calc:'🛠 Công cụ',learn:'📚 Hướng dẫn',meta:'Công cụ tính IQ miễn phí: phân vị, độ hiếm, chuyển đổi thang đo, IQ cha mẹ-con và so sánh quốc gia.'},
  tr:{title:'Ücretsiz IQ Hesaplayıcılar',sub:'Yüzdelik, nadirlik, ölçek dönüşümü ve daha fazlası',calc:'🛠 Hesaplayıcılar',learn:'📚 Rehberler',meta:'Ücretsiz IQ hesaplayıcılar: yüzdelik, nadirlik, ölçek dönüşümü, ebeveyn-çocuk IQ ve ülke karşılaştırması.'},
};

// 방문자 IP 국가코드(ISO2) → COUNTRY_IQ 이름 (주요국 + 13개 언어권)
const ISO2_NAME = { KR:'South Korea', JP:'Japan', US:'United States', GB:'United Kingdom', DE:'Germany', FR:'France', ES:'Spain', IT:'Italy', PT:'Portugal', BR:'Brazil', ID:'Indonesia', IN:'India', RU:'Russia', VN:'Vietnam', TR:'Turkey', CN:'China', TW:'Taiwan', HK:'Hong Kong', SG:'Singapore', CH:'Switzerland', NL:'Netherlands', FI:'Finland', AT:'Austria', SE:'Sweden', BE:'Belgium', NO:'Norway', DK:'Denmark', CA:'Canada', NZ:'New Zealand', AU:'Australia', PL:'Poland', MX:'Mexico', AR:'Argentina', UA:'Ukraine', GR:'Greece', IE:'Ireland', IL:'Israel', SA:'Saudi Arabia', AE:'United Arab Emirates', EG:'Egypt', TH:'Thailand', PH:'Philippines', MY:'Malaysia' };

function renderTool(slug, lang, cfCountry){
  const pageKey = TOOL_SLUGS[slug];
  if(!pageKey) return null;
  const useLang = (TOOLS_I18N[lang] && TOOLS_I18N[lang].pages && TOOLS_I18N[lang].pages[pageKey]) ? lang : 'en';
  const T = TOOLS_I18N[useLang] || TOOLS_I18N.en;
  const P = T.pages[pageKey];
  const C = T.common;
  const bandLabels = (SPOKES[useLang] && SPOKES[useLang].classLabels) || (SPOKES.en && SPOKES.en.classLabels) || ['Very Superior','Superior','High Average','Average','Low Average','Borderline','Extremely Low'];
  const bandMeanings = T.bandMeanings || TOOLS_I18N.en.bandMeanings;
  const canonical = toolUrl(slug, useLang);
  const pillar = useLang==='ko' ? 'https://all-lifes.com/iq-test/' : `https://all-lifes.com/${useLang}/iq-test/`;
  const appUrl = useLang==='ko' ? 'https://all-lifes.com/iq-test/' : `https://all-lifes.com/iq-test/?lang=${useLang}`;
  const H = HUB_I18N[useLang] || HUB_I18N.en;

  // ── 서버 렌더 참조표 (스니펫 미끼 + 크롤 가능 콘텐츠) ──
  const REF_IQS = [70,80,85,90,100,110,115,120,130,140,145];
  const refRows = REF_IQS.map(iq=>{
    const pct = pctOf(iq,15); const r = rarityN(pct); const ci = clsIdx(iq);
    return `<tr><td class="rg">${iq}</td><td>${esc(bandLabels[ci]||'')}</td><td>${fmtPct(pct)}</td><td>${pct>=50?('1 / '+r):('—')}</td></tr>`;
  }).join('');
  const refTable = `<table class="cls"><thead><tr><th>IQ</th><th>${esc(C.classification)}</th><th>${esc(C.percentile)}</th><th>${esc((C.rarity||'').replace('{n}','N').replace(/^[^0-9A-Za-z]*/,'')||'Rarity')}</th></tr></thead><tbody>${refRows}</tbody></table>`;

  // 나이 표 (byAge 전용)
  const AGE_ROWS = [
    ['5–12','100'], ['13–17','100'], ['18–29','100'], ['30–49','100'], ['50–69','100'], ['70+','100'],
  ];
  const ageTable = `<table class="cls"><thead><tr><th>${esc(P.labels[0]||'Age')}</th><th>${esc(C.classification.replace(C.classification, C.percentile))}</th></tr></thead><tbody>${AGE_ROWS.map(r=>`<tr><td class="rg">${esc(r[0])}</td><td>100 · 50%</td></tr>`).join('')}</tbody></table>`;

  // 척도 비교표 (scaleConverter 전용)
  const SCALE_ROWS = [100,115,130,145].map(z15=>{
    const z=(z15-100)/15; const sb=Math.round(100+16*z); const ca=Math.round(100+24*z); const pct=pctOf(z15,15);
    return `<tr><td class="rg">${z15}</td><td>${sb}</td><td>${ca}</td><td>${fmtPct(pct)}</td></tr>`;
  }).join('');
  const scaleTable = `<table class="cls"><thead><tr><th>Wechsler · SD15</th><th>S-Binet · SD16</th><th>Cattell · SD24</th><th>${esc(C.percentile)}</th></tr></thead><tbody>${SCALE_ROWS}</tbody></table>`;

  // 클라이언트로 넘길 데이터 (백분위 등급명·의미·국가데이터)
  const clientData = {
    bandLabels, bandMeanings,
    rarity: C.rarity, smarterThan: C.smarterThan, classification: C.classification, percentile: C.percentile,
    countries: pageKey==='country' ? COUNTRY_IQ : null,
    defaultCountry: pageKey==='country' ? (ISO2_NAME[(cfCountry||'').toUpperCase()] || '') : '',
    L: P.labels,
  };

  // ── 도구별 위젯 ──
  let widget = '';
  if(pageKey==='percentile'){
    widget = `
      <div class="tool">
        <div class="seg"><button class="sg active" data-mode="fwd">${esc(P.labels[2])}</button><button class="sg" data-mode="rev">${esc(P.labels[3])}</button></div>
        <div id="fwd-box"><label>${esc(P.labels[0])}<input id="iq-in" type="number" value="120" min="40" max="200"></label>
          <label>${esc(P.labels[1])}<select id="sd-in"><option value="15">15 (Wechsler)</option><option value="16">16 (Stanford-Binet)</option><option value="24">24 (Cattell)</option></select></label></div>
        <div id="rev-box" style="display:none"><label>${esc(C.percentile)} (%)<input id="pct-in" type="number" value="98" min="0.1" max="99.9" step="0.1"></label></div>
        <div class="res" id="res"></div>
      </div>`;
  } else if(pageKey==='scoreMeaning'){
    widget = `<div class="tool"><label>${esc(P.labels[1])}<input id="iq-in" type="number" value="120" min="40" max="200"></label><div class="res" id="res"></div></div>`;
  } else if(pageKey==='parentChild'){
    widget = `<div class="tool"><label>${esc(P.labels[0])}<input id="f-in" type="number" value="115" min="40" max="200"></label><label>${esc(P.labels[1])}<input id="m-in" type="number" value="110" min="40" max="200"></label><div class="res" id="res"></div><p class="note">${esc(P.labels[3])}</p></div>`;
  } else if(pageKey==='scaleConverter'){
    widget = `<div class="tool"><label>${esc(C.yourIQ)}<input id="iq-in" type="number" value="130" min="40" max="240"></label>
      <label>${esc(P.labels[0])}<select id="from-sd"><option value="15">Wechsler · SD15</option><option value="16">Stanford-Binet · SD16</option><option value="24">Cattell · SD24</option></select></label>
      <label>${esc(P.labels[1])}<select id="to-sd"><option value="16">Stanford-Binet · SD16</option><option value="15">Wechsler · SD15</option><option value="24">Cattell · SD24</option></select></label>
      <div class="res" id="res"></div><p class="note">${esc(P.labels[3])}</p></div>`;
  } else if(pageKey==='country'){
    widget = `<div class="tool"><label>${esc(P.labels[0])}<input id="iq-in" type="number" value="115" min="40" max="200"></label><label>${esc(P.labels[1])}<select id="cty-in"></select></label><div class="res" id="res"></div></div>`;
  } else if(pageKey==='byAge'){
    widget = `<div class="tool"><label>${esc(P.labels[0])}<input id="age-in" type="number" value="30" min="4" max="100"></label><label>${esc(C.yourIQ)}<input id="iq-in" type="number" value="100" min="40" max="200"></label><div class="res" id="res"></div><p class="note">${esc(P.labels[2])}</p></div>`;
  }

  // ── SSR 보조 콘텐츠 ──
  let extra = '';
  if(pageKey==='percentile' || pageKey==='scoreMeaning') extra = refTable;
  else if(pageKey==='scaleConverter') extra = scaleTable;
  else if(pageKey==='byAge') extra = ageTable;

  // 관련 도구 + 스포크 링크
  const otherTools = Object.keys(TOOL_SLUGS).filter(s=>s!==slug).map(s=>{
    const t = (TOOLS_I18N[useLang]&&TOOLS_I18N[useLang].pages[TOOL_SLUGS[s]]&&TOOLS_I18N[useLang].pages[TOOL_SLUGS[s]].h1) || TOOLS_I18N.en.pages[TOOL_SLUGS[s]].h1;
    return `<li><a href="${toolUrl(s,useLang)}">${esc(t)}</a></li>`;
  }).join('');
  const spokeLinks = SPOKE_SLUGS.map(s=>`<li><a href="${spokeUrl(s,useLang)}">${esc(spokeH1(s,useLang))}</a></li>`).join('');

  // 도구별 FAQ (단답 + FAQPage 스키마, AI 인용 강화)
  const faqArr = (TOOL_FAQ[useLang] && TOOL_FAQ[useLang][pageKey]) || (TOOL_FAQ.en && TOOL_FAQ.en[pageKey]) || [];
  const faqHtml = faqArr.length ? `<div class="faq"><h2>FAQ</h2>${faqArr.map(f=>`<div class="fq"><div class="fqq">${esc(f.q)}</div><div class="fqa">${esc(f.a)}</div></div>`).join('')}</div>` : '';
  const faqSchema = faqArr.length ? {"@context":"https://schema.org","@type":"FAQPage","mainEntity":faqArr.map(f=>({"@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}}))} : null;

  const hreflangs = HREFLANG_ALL.map(l=>`<link rel="alternate" hreflang="${l}" href="${toolUrl(slug,l)}">`).join('\n    ') + `\n    <link rel="alternate" hreflang="x-default" href="${toolUrl(slug,'en')}">`;
  const appSchema = {"@context":"https://schema.org","@type":"WebApplication","name":P.h1,"description":P.desc,"url":canonical,"applicationCategory":"EducationalApplication","inLanguage":useLang,"offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"operatingSystem":"Web","dateModified":LAST_UPDATED,"publisher":{"@type":"Organization","name":"All-Lifes","url":"https://all-lifes.com/","knowsAbout":["IQ","intelligence testing","psychometrics"]}};
  const breadcrumb = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"All-Lifes","item":"https://all-lifes.com/"},{"@type":"ListItem","position":2,"name":"IQ Test","item":pillar},{"@type":"ListItem","position":3,"name":P.h1,"item":canonical}]};

  const html = `<!DOCTYPE html>
<html lang="${useLang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="icon" type="image/png" href="https://all-lifes.com/iq-test/favicon-${useLang}.png">
<title>${esc(P.title)}</title>
<meta name="description" content="${esc(P.desc)}">
<meta name="keywords" content="${esc(P.keywords||'')}">
<link rel="canonical" href="${esc(canonical)}">
    ${hreflangs}
<meta property="og:title" content="${esc(P.title)}">
<meta property="og:description" content="${esc(P.desc)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:type" content="website">
<meta property="og:image" content="${ogImg(useLang)}">
${socialMeta(useLang)}
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1378943893051810" crossorigin="anonymous"></script>
<script type="application/ld+json">${JSON.stringify(appSchema)}</script>
<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>
${faqSchema ? `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>` : ''}
${AD_ZONE_STYLE}
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f1f5f9;color:#0f172a;line-height:1.6;}
.hero{background:linear-gradient(135deg,#1e1b4b,#312e81,#1d4ed8);color:#fff;padding:32px 20px 24px;text-align:center;}
.faq{margin-top:24px;}
.faq h2{font-size:17px;font-weight:800;color:#1e1b4b;margin-bottom:10px;}
.faq .fq{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:13px 16px;margin-bottom:9px;}
.faq .fqq{font-size:14px;font-weight:800;color:#1e1b4b;margin-bottom:4px;}
.faq .fqa{font-size:13px;color:#334155;line-height:1.55;}
.hero h1{font-size:clamp(20px,3.4vw,30px);font-weight:900;max-width:760px;margin:0 auto 10px;}
.hero p{font-size:14px;color:#c7d2fe;max-width:660px;margin:0 auto;}
.crumb{max-width:720px;margin:0 auto;padding:10px 18px 0;font-size:12px;color:#64748b;}
.crumb a{color:#4f46e5;text-decoration:none;}
.wrap{max-width:720px;margin:0 auto;padding:14px 18px 50px;}
.tool{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:20px;box-shadow:0 4px 20px rgba(15,23,42,.06);margin-bottom:18px;}
.tool label{display:block;font-size:13px;font-weight:700;color:#475569;margin:0 0 12px;}
.tool input,.tool select{display:block;width:100%;margin-top:5px;padding:12px 14px;font-size:16px;border:1.5px solid #e2e8f0;border-radius:10px;background:#f8fafc;color:#0f172a;font-weight:700;}
.tool input:focus,.tool select:focus{outline:none;border-color:#6366f1;background:#fff;}
.seg{display:flex;gap:6px;margin-bottom:14px;}
.seg .sg{flex:1;padding:9px;font-size:12.5px;font-weight:700;border:1.5px solid #e2e8f0;background:#f8fafc;color:#64748b;border-radius:10px;cursor:pointer;}
.seg .sg.active{background:#4f46e5;color:#fff;border-color:#4f46e5;}
.res{margin-top:6px;min-height:54px;}
.res .big{font-size:30px;font-weight:900;color:#4f46e5;line-height:1.15;}
.res .lab{font-size:13px;color:#64748b;font-weight:700;margin-top:2px;}
.res .row{display:flex;justify-content:space-between;gap:10px;padding:7px 0;border-top:1px solid #eef2f7;font-size:14px;}
.res .row:first-child{border-top:none;}
.res .row b{color:#1e1b4b;font-weight:800;}
.note{font-size:11.5px;color:#94a3b8;margin-top:12px;line-height:1.5;}
table.cls{width:100%;border-collapse:collapse;background:#fff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;font-size:13px;margin:16px 0;}
table.cls thead{background:#1e1b4b;color:#fff;}
table.cls th,table.cls td{padding:9px 11px;text-align:left;}
table.cls td.rg{font-weight:800;color:#4f46e5;white-space:nowrap;}
table.cls tbody tr:nth-child(even){background:#f8fafc;}
table.cls tbody tr{border-top:1px solid #eef2f7;}
.ad-box{margin:18px 0;text-align:center;min-height:90px;}
.cta{display:block;text-align:center;margin:22px auto 0;max-width:420px;background:linear-gradient(135deg,#4f46e5,#6366f1);color:#fff;font-weight:800;font-size:16px;padding:14px;border-radius:12px;text-decoration:none;box-shadow:0 6px 20px rgba(79,70,229,.35);}
.related{margin-top:28px;padding-top:16px;border-top:1px solid #e2e8f0;}
.related h2{font-size:15px;font-weight:800;color:#1e1b4b;margin-bottom:10px;}
.related ul{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:4px 18px;}
@media(max-width:520px){.related ul{grid-template-columns:1fr;}}
.related li{margin:5px 0;}
.related a{color:#4f46e5;text-decoration:none;font-size:13.5px;font-weight:600;}
.back{display:block;text-align:center;margin-top:14px;color:#64748b;font-size:13px;text-decoration:none;}
.disc{font-size:11px;color:#94a3b8;margin-top:18px;text-align:center;line-height:1.5;}
</style>
</head>
<body>
<div class="hero"><h1>${esc(P.h1)}</h1><p>${esc(P.intro)}</p></div>
<div class="crumb"><a href="${pillar}">IQ Test</a> › ${esc(P.h1)}</div>
<div class="wrap">
  ${AD_ZONE_BODY}
  ${widget}
  ${extra}
  ${faqHtml}
  <a class="cta" href="${appUrl}">${esc(H.cta || '🧠 Take the free IQ test →')}</a>
  <div class="related"><h2>🔗 ${esc(H.h1 || 'Learn more')}</h2><ul>${otherTools}${spokeLinks}</ul></div>
  ${authorityFooter(useLang,{about:true})}
  <a class="back" href="${pillar}">${esc(H.backHome || '← Back to the IQ Test')}</a>
  <p class="disc">${esc(C.disclaimer)}</p>
</div>
<script>
(function(){
  var D=${JSON.stringify(clientData)};
  var KEY=${JSON.stringify(pageKey)};
  function erf(x){var t=1/(1+0.3275911*Math.abs(x));var y=1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-0.284496736)*t+0.254829592)*t*Math.exp(-x*x);return x>=0?y:-y;}
  function ncdf(z){return 0.5*(1+erf(z/Math.SQRT2));}
  function invncdf(p){if(p<=0)return -4;if(p>=1)return 4;var a=[-39.6968302866538,220.946098424521,-275.928510446969,138.357751867269,-30.6647980661472,2.50662827745924];var b=[-54.4760987982241,161.585836858041,-155.698979859887,66.8013118877197,-13.2806815528857];var c=[-0.00778489400243029,-0.322396458041136,-2.40075827716184,-2.54973253934373,4.37466414146497,2.93816398269878];var d=[0.00778469570904146,0.32246712907004,2.445134137143,3.75440866190742];var pl=0.02425,ph=1-pl,q,r,x;if(p<pl){q=Math.sqrt(-2*Math.log(p));x=(((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5])/((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);}else if(p<=ph){q=p-0.5;r=q*q;x=(((((a[0]*r+a[1])*r+a[2])*r+a[3])*r+a[4])*r+a[5])*q/(((((b[0]*r+b[1])*r+b[2])*r+b[3])*r+b[4])*r+1);}else{q=Math.sqrt(-2*Math.log(1-p));x=-(((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5])/((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);}return x;}
  function pct(iq,sd){return ncdf((iq-100)/(sd||15))*100;}
  function fp(v){if(v>99.9)v=99.9;if(v<0.1)v=0.1;return v>=10?v.toFixed(1):v.toFixed(1);}
  function rar(p){var t=p>=50?(1-p/100):(p/100);if(t<=0)return 1e9;return Math.round(1/t);}
  function cidx(iq){return iq>=130?0:iq>=120?1:iq>=110?2:iq>=90?3:iq>=80?4:iq>=70?5:6;}
  function nf(n){return n.toLocaleString();}
  var R=document.getElementById('res');
  function band(iq){var i=cidx(iq);return '<div class="row"><span>'+D.classification+'</span><b>'+D.bandLabels[i]+'</b></div><div class="row" style="border:none"><span></span><span style="font-size:12px;color:#64748b">'+D.bandMeanings[i]+'</span></div>';}
  function pctRow(iq,sd){var p=pct(iq,sd);var smarter=D.smarterThan.replace('{p}',fp(p));var out='<div class="big">'+fp(p)+'<span style="font-size:16px"> %</span></div><div class="lab">'+smarter+'</div>';out+='<div style="margin-top:10px">'+band(iq);if(p>=50){out+='<div class="row"><span>'+D.rarity.replace('{n}','')+'</span><b>1 / '+nf(rar(p))+'</b></div>';}out+='</div>';return out;}
  function num(id){return parseFloat((document.getElementById(id)||{}).value);}
  if(KEY==='percentile'){
    var mode='fwd';
    function calc(){if(mode==='fwd'){var iq=num('iq-in');var sd=parseFloat(document.getElementById('sd-in').value);if(isNaN(iq))return;R.innerHTML=pctRow(iq,sd);}else{var p=num('pct-in');if(isNaN(p))return;var iq=Math.round(100+15*invncdf(p/100));R.innerHTML='<div class="big">'+iq+'</div><div class="lab">'+D.yourIQ+'</div><div style="margin-top:10px">'+band(iq)+'</div>';}}
    document.querySelectorAll('.sg').forEach(function(b){b.addEventListener('click',function(){document.querySelectorAll('.sg').forEach(function(x){x.classList.remove('active');});b.classList.add('active');mode=b.getAttribute('data-mode');document.getElementById('fwd-box').style.display=mode==='fwd'?'':'none';document.getElementById('rev-box').style.display=mode==='rev'?'':'none';calc();});});
    ['iq-in','sd-in','pct-in'].forEach(function(id){var e=document.getElementById(id);if(e)e.addEventListener('input',calc);});calc();
  } else if(KEY==='scoreMeaning'){
    function calc(){var iq=num('iq-in');if(isNaN(iq))return;R.innerHTML=pctRow(iq,15);}
    document.getElementById('iq-in').addEventListener('input',calc);
    var u=new URL(location.href);var q=u.searchParams.get('score');if(q&&!isNaN(parseFloat(q))){document.getElementById('iq-in').value=parseFloat(q);}calc();
  } else if(KEY==='parentChild'){
    function calc(){var f=num('f-in'),m=num('m-in');if(isNaN(f)||isNaN(m))return;var mid=(f+m)/2;var pred=Math.round(100+0.6*(mid-100));var lo=pred-12,hi=pred+12;R.innerHTML='<div class="big">'+pred+'</div><div class="lab">'+D.L[2]+'</div><div class="row" style="margin-top:8px"><span>'+D.L[2]+' (range)</span><b>'+lo+'–'+hi+'</b></div>'+band(pred);}
    ['f-in','m-in'].forEach(function(id){document.getElementById(id).addEventListener('input',calc);});calc();
  } else if(KEY==='scaleConverter'){
    function calc(){var iq=num('iq-in');var fs=parseFloat(document.getElementById('from-sd').value);var ts=parseFloat(document.getElementById('to-sd').value);if(isNaN(iq))return;var z=(iq-100)/fs;var out=Math.round(100+ts*z);var p=ncdf(z)*100;R.innerHTML='<div class="big">'+out+'</div><div class="lab">'+D.L[2]+'</div><div class="row" style="margin-top:8px"><span>'+D.percentile+'</span><b>'+fp(p)+'%</b></div>';}
    ['iq-in','from-sd','to-sd'].forEach(function(id){document.getElementById(id).addEventListener('input',calc);});calc();
  } else if(KEY==='country'){
    var sel=document.getElementById('cty-in');var arr=(D.countries||[]).slice().sort(function(a,b){return a.c<b.c?-1:1;});arr.forEach(function(o){var op=document.createElement('option');op.value=o.c;op.textContent=o.c+' ('+o.iq+')';if(o.c===D.defaultCountry)op.selected=true;sel.appendChild(op);});
    function calc(){var iq=num('iq-in');var c=sel.value;var o=(D.countries||[]).find(function(x){return x.c===c;});if(isNaN(iq)||!o)return;var diff=iq-o.iq;var localPct=ncdf((iq-o.iq)/15)*100;var sign=diff>=0?'+':'';R.innerHTML='<div class="big">'+sign+diff+'</div><div class="lab">'+D.L[2].replace('{country}',c)+' ('+o.iq+')</div><div class="row" style="margin-top:8px"><span>'+D.L[3]+'</span><b>'+fp(localPct)+'%</b></div>'+band(iq);}
    document.getElementById('iq-in').addEventListener('input',calc);sel.addEventListener('change',calc);calc();
  } else if(KEY==='byAge'){
    function calc(){var age=num('age-in');var iq=num('iq-in');if(isNaN(iq))return;var p=pct(iq,15);R.innerHTML='<div class="big">'+iq+'</div><div class="lab">'+D.percentile+' '+fp(p)+'%</div>'+band(iq);}
    ['age-in','iq-in'].forEach(function(id){document.getElementById(id).addEventListener('input',calc);});calc();
  }
})();
</script>
${adZoneScript(useLang)}
</body>
</html>`;
  return new Response(html, { headers:{ 'Content-Type':'text/html;charset=UTF-8', 'Cache-Control':'public, max-age=86400', 'X-Robots-Tag':'index, follow' }});
}

// ── 계산기 & 가이드 허브: /iq-test/tools/<lang> ──
function renderToolsHub(lang){
  const useLang = (TOOLS_HUB_I18N[lang] && TOOLS_I18N[lang]) ? lang : 'en';
  const HB = TOOLS_HUB_I18N[useLang] || TOOLS_HUB_I18N.en;
  const T = TOOLS_I18N[useLang] || TOOLS_I18N.en;
  const H = HUB_I18N[useLang] || HUB_I18N.en;
  const canonical = toolsHubUrl(useLang);
  const pillar = useLang==='ko' ? 'https://all-lifes.com/iq-test/' : `https://all-lifes.com/${useLang}/iq-test/`;
  const appUrl = useLang==='ko' ? 'https://all-lifes.com/iq-test/' : `https://all-lifes.com/iq-test/?lang=${useLang}`;

  const toolCards = Object.keys(TOOL_SLUGS).map(slug=>{
    const P = T.pages[TOOL_SLUGS[slug]];
    return `<a class="card" href="${toolUrl(slug,useLang)}"><div class="ct">${esc(P.h1)}</div><div class="cd">${esc(P.intro)}</div></a>`;
  }).join('');
  let spokeCards = SPOKE_SLUGS.map(slug=>`<a class="card sp" href="${spokeUrl(slug,useLang)}"><div class="ct">${esc(spokeH1(slug,useLang))}</div></a>`).join('');
  // 참고 자료: 용어집 + 통계 데이터 (있을 때만)
  const gl = GLOSSARY_I18N[useLang] || GLOSSARY_I18N.en;
  if(gl && gl.title) spokeCards += `<a class="card sp" href="${glossaryUrl(useLang)}"><div class="ct">📖 ${esc(gl.title)}</div></a>`;
  const dt = DATA_I18N[useLang] || DATA_I18N.en;
  if(dt && dt.h1) spokeCards += `<a class="card sp" href="${dataUrl(useLang)}"><div class="ct">📊 ${esc(dt.h1)}</div></a>`;
  const aboutH1 = (ABOUT_I18N[useLang]||ABOUT_I18N.en||{}).h1;
  if(aboutH1) spokeCards += `<a class="card sp" href="${aboutUrl(useLang)}"><div class="ct">ℹ️ ${esc(aboutH1)}</div></a>`;
  const smH1 = (T.pages.scoreMeaning||{}).h1;
  if(smH1) spokeCards += `<a class="card sp" href="${scoreHubUrl(useLang)}"><div class="ct">🔢 ${esc(smH1)}</div></a>`;
  spokeCards += `<a class="card sp" href="${percentileHubUrl(useLang)}"><div class="ct">📈 IQ ${esc(T.common.percentile)}</div></a>`;
  const story = STORY_I18N[useLang] || STORY_I18N.en;
  if(story && story.storyTitle) spokeCards += `<a class="card sp" href="${storyUrl(useLang)}"><div class="ct">📱 ${esc(story.storyTitle)}</div></a>`;
  spokeCards += `<a class="card sp" href="${popularUrl(useLang)}"><div class="ct">🔥 ${esc(POP_I18N[useLang]||POP_I18N.en)}</div></a>`;
  spokeCards += `<a class="card sp" href="${searchUrl(useLang)}"><div class="ct">🔎 IQ Search</div></a>`;
  const embedSnippet = `&lt;iframe src="${embedUrl(useLang)}" width="360" height="230" style="border:0;max-width:100%" title="IQ percentile"&gt;&lt;/iframe&gt;`;
  const embedBox = `<div class="sec">🔗 Embed</div><div class="embed-box"><code id="emb">${embedSnippet}</code><button onclick="navigator.clipboard&&navigator.clipboard.writeText(document.getElementById('emb').textContent);this.textContent='✓'">Copy</button></div>`;

  const hreflangs = HREFLANG_ALL.map(l=>`<link rel="alternate" hreflang="${l}" href="${toolsHubUrl(l)}">`).join('\n    ') + `\n    <link rel="alternate" hreflang="x-default" href="${toolsHubUrl('en')}">`;
  const itemList = {"@context":"https://schema.org","@type":"ItemList","name":HB.title,"itemListElement":Object.keys(TOOL_SLUGS).map((slug,i)=>({"@type":"ListItem","position":i+1,"name":T.pages[TOOL_SLUGS[slug]].h1,"url":toolUrl(slug,useLang)}))};
  const breadcrumb = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"All-Lifes","item":"https://all-lifes.com/"},{"@type":"ListItem","position":2,"name":"IQ Test","item":pillar},{"@type":"ListItem","position":3,"name":HB.title,"item":canonical}]};

  const html = `<!DOCTYPE html>
<html lang="${useLang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="icon" type="image/png" href="https://all-lifes.com/iq-test/favicon-${useLang}.png">
<title>${esc(HB.title)} | All-Lifes</title>
<meta name="description" content="${esc(HB.meta)}">
<link rel="canonical" href="${esc(canonical)}">
    ${hreflangs}
<meta property="og:title" content="${esc(HB.title)}">
<meta property="og:description" content="${esc(HB.meta)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:type" content="website">
<meta property="og:image" content="${ogImg(useLang)}">
${socialMeta(useLang)}
${ADSENSE_HEAD}
${AD_ZONE_STYLE}
<script type="application/ld+json">${JSON.stringify(itemList)}</script>
<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f1f5f9;color:#0f172a;line-height:1.6;}
.hero{background:linear-gradient(135deg,#1e1b4b,#312e81,#1d4ed8);color:#fff;padding:34px 20px 26px;text-align:center;}
.hero h1{font-size:clamp(20px,3.6vw,32px);font-weight:900;max-width:760px;margin:0 auto 10px;}
.hero p{font-size:14px;color:#c7d2fe;max-width:680px;margin:0 auto;}
.crumb{max-width:780px;margin:0 auto;padding:10px 18px 0;font-size:12px;color:#64748b;}
.crumb a{color:#4f46e5;text-decoration:none;}
.wrap{max-width:780px;margin:0 auto;padding:14px 18px 50px;}
.sec{font-size:16px;font-weight:800;color:#1e1b4b;margin:24px 0 12px;}
.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;}
@media(max-width:560px){.grid{grid-template-columns:1fr;}}
.card{display:flex;flex-direction:column;background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:16px 18px;text-decoration:none;color:#0f172a;transition:all .15s;box-shadow:0 2px 10px rgba(15,23,42,.04);}
.card:hover{transform:translateY(-2px);border-color:#6366f1;box-shadow:0 8px 22px rgba(79,70,229,.18);}
.card .ct{font-size:14.5px;font-weight:800;color:#1e1b4b;}
.card .cd{font-size:12px;color:#64748b;margin-top:5px;line-height:1.45;}
.card.sp{flex-direction:row;align-items:center;}
.card.sp .ct{font-size:13.5px;}
.embed-box{background:#0f172a;border-radius:12px;padding:14px 16px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;}
.embed-box code{flex:1;min-width:200px;color:#a5b4fc;font-size:11.5px;word-break:break-all;font-family:ui-monospace,Menlo,monospace;}
.embed-box button{background:#4f46e5;color:#fff;border:0;border-radius:8px;padding:8px 16px;font-weight:800;font-size:13px;cursor:pointer;}
.cta{display:block;text-align:center;margin:26px auto 0;max-width:420px;background:linear-gradient(135deg,#4f46e5,#6366f1);color:#fff;font-weight:800;font-size:16px;padding:14px;border-radius:12px;text-decoration:none;box-shadow:0 6px 20px rgba(79,70,229,.35);}
.back{display:block;text-align:center;margin-top:14px;color:#64748b;font-size:13px;text-decoration:none;}
</style>
</head>
<body>
<div class="hero"><h1>${esc(HB.title)}</h1><p>${esc(HB.sub)}</p></div>
<div class="crumb"><a href="${pillar}">IQ Test</a> › ${esc(HB.title)}</div>
<div class="wrap">
  ${AD_ZONE_BODY}
  <div class="sec">${esc(HB.calc)}</div>
  <div class="grid">${toolCards}</div>
  <div class="sec">${esc(HB.learn)}</div>
  <div class="grid">${spokeCards}</div>
  ${embedBox}
  ${authorityFooter(useLang,{about:true})}
  <a class="cta" href="${appUrl}">${esc(H.cta || '🧠 Take the free IQ test →')}</a>
  <a class="back" href="${pillar}">${esc(H.backHome || '← Back to the IQ Test')}</a>
</div>
${adZoneScript(useLang)}
</body>
</html>`;
  return new Response(html, { headers:{ 'Content-Type':'text/html;charset=UTF-8', 'Cache-Control':'public, max-age=86400', 'X-Robots-Tag':'index, follow' }});
}

// ── 용어집 / 통계 데이터 URL ──
const glossaryUrl = (lang) => `https://all-lifes.com/iq-test/glossary/${lang}`;
const dataUrl = (lang) => `https://all-lifes.com/iq-test/iq-statistics/${lang}`;

// ── 용어집(Glossary) DefinedTerm 허브: /iq-test/glossary/<lang> ──
function renderGlossary(lang){
  const useLang = (GLOSSARY_I18N[lang] && GLOSSARY_I18N[lang].terms) ? lang : 'en';
  const G = GLOSSARY_I18N[useLang];
  if(!G || !Array.isArray(G.terms) || !G.terms.length) return null;
  const H = HUB_I18N[useLang] || HUB_I18N.en;
  const canonical = glossaryUrl(useLang);
  const pillar = useLang==='ko' ? 'https://all-lifes.com/iq-test/' : `https://all-lifes.com/${useLang}/iq-test/`;
  const appUrl = useLang==='ko' ? 'https://all-lifes.com/iq-test/' : `https://all-lifes.com/iq-test/?lang=${useLang}`;

  const items = G.terms.map(t=>`<div class="gt" id="${esc(t.key)}"><dt><a href="${glossaryTermUrl(useLang,t.key)}" style="color:#1e1b4b;text-decoration:none;">${esc(t.term)}</a></dt><dd>${esc(t.def)}</dd></div>`).join('');
  const hreflangs = HREFLANG_ALL.map(l=>`<link rel="alternate" hreflang="${l}" href="${glossaryUrl(l)}">`).join('\n    ') + `\n    <link rel="alternate" hreflang="x-default" href="${glossaryUrl('en')}">`;
  const dts = {"@context":"https://schema.org","@type":"DefinedTermSet","name":G.title,"url":canonical,"inLanguage":useLang,"hasDefinedTerm":G.terms.map(t=>({"@type":"DefinedTerm","name":t.term,"description":t.def,"url":canonical+"#"+t.key}))};
  const breadcrumb = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"All-Lifes","item":"https://all-lifes.com/"},{"@type":"ListItem","position":2,"name":"IQ Test","item":pillar},{"@type":"ListItem","position":3,"name":G.title,"item":canonical}]};

  const html = `<!DOCTYPE html>
<html lang="${useLang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="icon" type="image/png" href="https://all-lifes.com/iq-test/favicon-${useLang}.png">
<title>${esc(G.title)}</title>
<meta name="description" content="${esc(G.sub)}">
<link rel="canonical" href="${esc(canonical)}">
    ${hreflangs}
<meta property="og:title" content="${esc(G.title)}">
<meta property="og:description" content="${esc(G.sub)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:type" content="website">
<meta property="og:image" content="${ogImg(useLang)}">
${socialMeta(useLang)}
${ADSENSE_HEAD}
${AD_ZONE_STYLE}
<script type="application/ld+json">${JSON.stringify(dts)}</script>
<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f1f5f9;color:#0f172a;line-height:1.65;}
.hero{background:linear-gradient(135deg,#1e1b4b,#312e81,#1d4ed8);color:#fff;padding:34px 20px 26px;text-align:center;}
.hero h1{font-size:clamp(20px,3.4vw,30px);font-weight:900;max-width:780px;margin:0 auto 10px;}
.hero p{font-size:14px;color:#c7d2fe;max-width:700px;margin:0 auto;}
.crumb{max-width:780px;margin:0 auto;padding:10px 18px 0;font-size:12px;color:#64748b;}
.crumb a{color:#4f46e5;text-decoration:none;}
.wrap{max-width:780px;margin:0 auto;padding:14px 18px 50px;}
.gt{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:13px 16px;margin-bottom:10px;scroll-margin-top:14px;}
.gt dt{font-size:15px;font-weight:800;color:#1e1b4b;margin-bottom:4px;}
.gt dd{font-size:13.5px;color:#334155;}
.cta{display:block;text-align:center;margin:26px auto 0;max-width:420px;background:linear-gradient(135deg,#4f46e5,#6366f1);color:#fff;font-weight:800;font-size:16px;padding:14px;border-radius:12px;text-decoration:none;box-shadow:0 6px 20px rgba(79,70,229,.35);}
.back{display:block;text-align:center;margin-top:14px;color:#64748b;font-size:13px;text-decoration:none;}
</style>
</head>
<body>
<div class="hero"><h1>${esc(G.title)}</h1><p>${esc(G.sub)}</p></div>
<div class="crumb"><a href="${pillar}">IQ Test</a> › ${esc(G.title)}</div>
<div class="wrap">
  ${AD_ZONE_BODY}
  <dl>${items}</dl>
  ${authorityFooter(useLang,{about:true})}
  <a class="cta" href="${appUrl}">${esc(H.cta || '🧠 Take the free IQ test →')}</a>
  <a class="back" href="${pillar}">${esc(H.backHome || '← Back to the IQ Test')}</a>
</div>
${adZoneScript(useLang)}
</body>
</html>`;
  return new Response(html, { headers:{ 'Content-Type':'text/html;charset=UTF-8', 'Cache-Control':'public, max-age=86400', 'X-Robots-Tag':'index, follow' }});
}

// ── 통계/분포 Dataset 페이지: /iq-test/iq-statistics/<lang> ──
function renderDataPage(lang){
  const useLang = DATA_I18N[lang] ? lang : 'en';
  const D = DATA_I18N[useLang];
  if(!D) return null;
  const S = SPOKES[useLang] || SPOKES.en;
  const headers = (S && S.tableHeaders) || ['IQ range','Classification','Percentile','% of population'];
  const labels = (S && S.classLabels) || ['Very Superior','Superior','High Average','Average','Low Average','Borderline','Extremely Low'];
  const H = HUB_I18N[useLang] || HUB_I18N.en;
  const canonical = dataUrl(useLang);
  const pillar = useLang==='ko' ? 'https://all-lifes.com/iq-test/' : `https://all-lifes.com/${useLang}/iq-test/`;
  const appUrl = useLang==='ko' ? 'https://all-lifes.com/iq-test/' : `https://all-lifes.com/iq-test/?lang=${useLang}`;

  // 분포표 (밴드별) + 희귀도
  const RAR = ['1 / 50','1 / 11','1 / 5','—','1 / 5','1 / 11','1 / 50'];
  const distRows = SPOKE_ROWS.map((row,i)=>`<tr><td class="rg">${esc(row.r)}</td><td>${esc(labels[i]||'')}</td><td>${esc(row.p)}</td><td>${esc(row.pop)}</td></tr>`).join('');
  const distTable = `<table class="cls"><thead><tr><th>${esc(headers[0]||'IQ')}</th><th>${esc(headers[1]||'Class')}</th><th>${esc(headers[2]||'Percentile')}</th><th>${esc(headers[3]||'%')}</th></tr></thead><tbody>${distRows}</tbody></table>`;
  // 정밀 백분위/희귀도표
  const REF_IQS = [70,80,85,90,100,110,115,120,130,140,145,160];
  const refRows = REF_IQS.map(iq=>{ const pct=pctOf(iq,15); const r=rarityN(pct); return `<tr><td class="rg">${iq}</td><td>${fmtPct(pct)}%</td><td>${pct>=50?('1 / '+r.toLocaleString()):'—'}</td></tr>`; }).join('');
  const refTable = `<table class="cls"><thead><tr><th>IQ</th><th>${esc(headers[2]||'Percentile')}</th><th>${esc(D.rarityLabel||'Rarity (1 in N)')}</th></tr></thead><tbody>${refRows}</tbody></table>`;

  const hreflangs = HREFLANG_ALL.map(l=>`<link rel="alternate" hreflang="${l}" href="${dataUrl(l)}">`).join('\n    ') + `\n    <link rel="alternate" hreflang="x-default" href="${dataUrl('en')}">`;
  const dataset = {"@context":"https://schema.org","@type":"Dataset","name":D.h1,"description":D.desc,"url":canonical,"inLanguage":useLang,"dateModified":LAST_UPDATED,"creator":{"@type":"Organization","name":"All-Lifes","url":"https://all-lifes.com/"},"license":"https://creativecommons.org/licenses/by/4.0/","variableMeasured":["IQ score","percentile","population share","rarity"],"keywords":D.keywords||"IQ distribution, IQ percentile, IQ statistics"};
  const breadcrumb = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"All-Lifes","item":"https://all-lifes.com/"},{"@type":"ListItem","position":2,"name":"IQ Test","item":pillar},{"@type":"ListItem","position":3,"name":D.h1,"item":canonical}]};

  const html = `<!DOCTYPE html>
<html lang="${useLang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="icon" type="image/png" href="https://all-lifes.com/iq-test/favicon-${useLang}.png">
<title>${esc(D.title)}</title>
<meta name="description" content="${esc(D.desc)}">
<meta name="keywords" content="${esc(D.keywords||'')}">
<link rel="canonical" href="${esc(canonical)}">
    ${hreflangs}
<meta property="og:title" content="${esc(D.title)}">
<meta property="og:description" content="${esc(D.desc)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:type" content="website">
<meta property="og:image" content="${ogImg(useLang)}">
${socialMeta(useLang)}
${ADSENSE_HEAD}
${AD_ZONE_STYLE}
<script type="application/ld+json">${JSON.stringify(dataset)}</script>
<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f1f5f9;color:#0f172a;line-height:1.65;}
.hero{background:linear-gradient(135deg,#1e1b4b,#312e81,#1d4ed8);color:#fff;padding:34px 20px 26px;text-align:center;}
.hero h1{font-size:clamp(20px,3.4vw,30px);font-weight:900;max-width:780px;margin:0 auto 10px;}
.hero p{font-size:14px;color:#c7d2fe;max-width:700px;margin:0 auto;}
.crumb{max-width:760px;margin:0 auto;padding:10px 18px 0;font-size:12px;color:#64748b;}
.crumb a{color:#4f46e5;text-decoration:none;}
.wrap{max-width:760px;margin:0 auto;padding:14px 18px 50px;}
.intro{font-size:14px;color:#334155;margin:6px 0 4px;}
.method{font-size:12px;color:#64748b;margin-top:10px;line-height:1.55;}
table.cls{width:100%;border-collapse:collapse;background:#fff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;font-size:13px;margin:16px 0;}
table.cls thead{background:#1e1b4b;color:#fff;}
table.cls th,table.cls td{padding:9px 12px;text-align:left;}
table.cls td.rg{font-weight:800;color:#4f46e5;white-space:nowrap;}
table.cls tbody tr:nth-child(even){background:#f8fafc;}
table.cls tbody tr{border-top:1px solid #eef2f7;}
.cta{display:block;text-align:center;margin:26px auto 0;max-width:420px;background:linear-gradient(135deg,#4f46e5,#6366f1);color:#fff;font-weight:800;font-size:16px;padding:14px;border-radius:12px;text-decoration:none;box-shadow:0 6px 20px rgba(79,70,229,.35);}
.back{display:block;text-align:center;margin-top:14px;color:#64748b;font-size:13px;text-decoration:none;}
</style>
</head>
<body>
<div class="hero"><h1>${esc(D.h1)}</h1><p>${esc(D.intro)}</p></div>
<div class="crumb"><a href="${pillar}">IQ Test</a> › ${esc(D.h1)}</div>
<div class="wrap">
  ${AD_ZONE_BODY}
  ${distTable}
  ${refTable}
  <p class="method">${esc(D.method)}</p>
  ${authorityFooter(useLang,{about:true})}
  <a class="cta" href="${appUrl}">${esc(H.cta || '🧠 Take the free IQ test →')}</a>
  <a class="back" href="${pillar}">${esc(H.backHome || '← Back to the IQ Test')}</a>
</div>
${adZoneScript(useLang)}
</body>
</html>`;
  return new Response(html, { headers:{ 'Content-Type':'text/html;charset=UTF-8', 'Cache-Control':'public, max-age=86400', 'X-Robots-Tag':'index, follow' }});
}

// ── About · 방법론 (E-E-A-T 핵심): /iq-test/about/<lang> ──
function renderAbout(lang){
  const useLang = ABOUT_I18N[lang] ? lang : 'en';
  const A = ABOUT_I18N[useLang] || ABOUT_I18N.en;
  if(!A) return null;
  const L = AUTH_LABELS[useLang] || AUTH_LABELS.en;
  const canonical = aboutUrl(useLang);
  const pillar = useLang==='ko' ? 'https://all-lifes.com/iq-test/' : `https://all-lifes.com/${useLang}/iq-test/`;
  const appUrl = useLang==='ko' ? 'https://all-lifes.com/iq-test/' : `https://all-lifes.com/iq-test/?lang=${useLang}`;
  const H = HUB_I18N[useLang] || HUB_I18N.en;

  const secs = A.sections.map(s=>`<section class="qa"><h2>${esc(s.h)}</h2><p>${esc(s.p)}</p></section>`).join('');
  const hreflangs = HREFLANG_ALL.map(l=>`<link rel="alternate" hreflang="${l}" href="${aboutUrl(l)}">`).join('\n    ') + `\n    <link rel="alternate" hreflang="x-default" href="${aboutUrl('en')}">`;
  const aboutSchema = {"@context":"https://schema.org","@type":"AboutPage","name":A.h1,"description":A.desc,"url":canonical,"inLanguage":useLang,"dateModified":LAST_UPDATED,"mainEntity":{"@type":"Organization","name":"All-Lifes","url":"https://all-lifes.com/","logo":"https://all-lifes.com/iq-test/IQ%20TEST.png","description":A.intro,"knowsAbout":["IQ","intelligence testing","psychometrics","cognitive ability","Cattell–Horn–Carroll theory","Raven's Progressive Matrices"]}};
  const breadcrumb = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"All-Lifes","item":"https://all-lifes.com/"},{"@type":"ListItem","position":2,"name":"IQ Test","item":pillar},{"@type":"ListItem","position":3,"name":A.h1,"item":canonical}]};

  const html = `<!DOCTYPE html>
<html lang="${useLang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="icon" type="image/png" href="https://all-lifes.com/iq-test/favicon-${useLang}.png">
<title>${esc(A.title)}</title>
<meta name="description" content="${esc(A.desc)}">
<meta name="keywords" content="${esc(A.keywords||'')}">
<link rel="canonical" href="${esc(canonical)}">
    ${hreflangs}
<meta property="og:title" content="${esc(A.title)}">
<meta property="og:description" content="${esc(A.desc)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:type" content="website">
<meta property="og:image" content="${ogImg(useLang)}">
${socialMeta(useLang)}
${ADSENSE_HEAD}
${AD_ZONE_STYLE}
<script type="application/ld+json">${JSON.stringify(aboutSchema)}</script>
<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f1f5f9;color:#0f172a;line-height:1.7;}
.hero{background:linear-gradient(135deg,#1e1b4b,#312e81,#1d4ed8);color:#fff;padding:34px 20px 26px;text-align:center;}
.hero h1{font-size:clamp(20px,3.4vw,30px);font-weight:900;max-width:780px;margin:0 auto 10px;}
.hero p{font-size:14px;color:#c7d2fe;max-width:700px;margin:0 auto;}
.crumb{max-width:760px;margin:0 auto;padding:10px 18px 0;font-size:12px;color:#64748b;}
.crumb a{color:#4f46e5;text-decoration:none;}
.wrap{max-width:760px;margin:0 auto;padding:14px 18px 50px;}
.toc{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:14px 18px;margin-top:4px;}
.toc ul{list-style:none;padding:0;margin:0;}
.toc li{margin:6px 0;font-size:13.5px;}
.toc a{color:#4f46e5;text-decoration:none;font-weight:600;}
.paa{margin-top:28px;}
.paa h2{font-size:17px;font-weight:800;color:#1e1b4b;margin-bottom:10px;}
.paa .pa{background:#fff;border:1px solid #e2e8f0;border-radius:10px;margin-bottom:8px;padding:0 14px;}
.paa summary{cursor:pointer;font-weight:700;font-size:14px;color:#1e1b4b;padding:12px 0;list-style:none;}
.paa summary::-webkit-details-marker{display:none;}
.paa summary::after{content:'+';float:right;color:#6366f1;font-weight:800;}
.paa details[open] summary::after{content:'–';}
.paa .pad{padding:0 0 12px;font-size:13px;color:#475569;}
.paa .pad a{color:#4f46e5;text-decoration:none;font-weight:600;display:inline-block;margin-top:6px;}
.tldr{background:#eef2ff;border:1px solid #c7d2fe;border-radius:12px;padding:14px 18px;margin-top:6px;}
.tldr .tl-h{font-size:13px;font-weight:800;color:#3730a3;margin-bottom:8px;}
.tldr ul{margin:0;padding-left:18px;}
.tldr li{font-size:13px;color:#334155;margin:5px 0;}
.pasf{margin-top:22px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;}
.pasf .pf-h{font-size:12.5px;font-weight:700;color:#64748b;}
.pasf a{font-size:12.5px;background:#fff;border:1px solid #e2e8f0;border-radius:20px;padding:6px 13px;color:#4f46e5;text-decoration:none;font-weight:600;}
.pasf a:hover{border-color:#6366f1;}
.qa{margin-top:22px;scroll-margin-top:12px;}
.qa h2{font-size:18px;font-weight:800;color:#1e1b4b;margin-bottom:6px;}
.qa p{font-size:14px;color:#334155;}
.rev{margin-top:20px;background:#eef2ff;border:1px solid #c7d2fe;border-radius:12px;padding:14px 16px;font-size:13px;color:#3730a3;}
.cta{display:block;text-align:center;margin:26px auto 0;max-width:420px;background:linear-gradient(135deg,#4f46e5,#6366f1);color:#fff;font-weight:800;font-size:16px;padding:14px;border-radius:12px;text-decoration:none;box-shadow:0 6px 20px rgba(79,70,229,.35);}
.back{display:block;text-align:center;margin-top:14px;color:#64748b;font-size:13px;text-decoration:none;}
</style>
</head>
<body>
<div class="hero"><h1>${esc(A.h1)}</h1><p>${esc(A.intro)}</p></div>
<div class="crumb"><a href="${pillar}">IQ Test</a> › ${esc(A.h1)}</div>
<div class="wrap">
  ${AD_ZONE_BODY}
  ${secs}
  <div class="rev">✔ ${esc(A.reviewerNote)}</div>
  ${authorityFooter(useLang)}
  <a class="cta" href="${appUrl}">${esc(H.cta || '🧠 Take the free IQ test →')}</a>
  <a class="back" href="${pillar}">${esc(H.backHome || '← Back to the IQ Test')}</a>
</div>
${adZoneScript(useLang)}
</body>
</html>`;
  return new Response(html, { headers:{ 'Content-Type':'text/html;charset=UTF-8', 'Cache-Control':'public, max-age=86400', 'X-Robots-Tag':'index, follow' }});
}

// ══════════════════════════════════════════════════════════════
// 프로그래매틱 점수별 페이지 (롱테일 트래픽 폭발): /iq-test/score/<lang>/<n>
// 모든 값은 계산 + 기존 13언어 자산(TOOLS_I18N/classLabels/TOOL_FAQ) 재사용.
// ══════════════════════════════════════════════════════════════
const YEAR = '2026';
const SCORE_MIN = 65, SCORE_MAX = 150; // 사이트맵 색인 범위 (검색 수요 집중 구간)
const scoreUrl = (lang, n) => `https://all-lifes.com/iq-test/score/${lang}/${n}`;
const scoreHubUrl = (lang) => `https://all-lifes.com/iq-test/score/${lang}`;
const percentileUrl = (lang, p) => `https://all-lifes.com/iq-test/percentile/${lang}/${p}`;
const percentileHubUrl = (lang) => `https://all-lifes.com/iq-test/percentile/${lang}`;
const glossaryTermUrl = (lang, key) => `https://all-lifes.com/iq-test/glossary/${lang}/${key}`;
const PCT_MIN = 1, PCT_MAX = 99;

// 정규분포 미니 차트 (마커 포함) — 인라인 SVG
function bellSVG(n){
  const lo=55, hi=145, W=320, Hh=120;
  let pts='';
  for(let i=0;i<=90;i++){ const x=lo+i*(hi-lo)/90; const y=Math.exp(-0.5*Math.pow((x-100)/15,2)); const px=(x-lo)/(hi-lo)*W; const py=Hh-10-y*(Hh-26); pts+=(i?' ':'')+px.toFixed(1)+','+py.toFixed(1); }
  const cn=Math.max(lo,Math.min(hi,n)); const mx=((cn-lo)/(hi-lo)*W).toFixed(1);
  return `<svg viewBox="0 0 ${W} ${Hh}" width="100%" height="120" role="img" aria-label="IQ ${n} on the bell curve" style="max-width:340px;display:block;margin:6px auto 0;">`
    +`<polyline points="${pts}" fill="none" stroke="#c7d2fe" stroke-width="2"/>`
    +`<line x1="${mx}" y1="6" x2="${mx}" y2="${Hh-10}" stroke="#4f46e5" stroke-width="2.5"/>`
    +`<circle cx="${mx}" cy="6" r="4" fill="#4f46e5"/>`
    +`<text x="${mx}" y="${Hh-1}" text-anchor="middle" font-size="11" font-weight="800" fill="#4f46e5">${n}</text>`
    +`<text x="2" y="${Hh-1}" font-size="9" fill="#94a3b8">55</text>`
    +`<text x="${W-14}" y="${Hh-1}" font-size="9" fill="#94a3b8">145</text></svg>`;
}

function renderScorePage(lang, nRaw){
  const n = parseInt(nRaw, 10);
  if(!Number.isFinite(n) || n < 40 || n > 200) return null;
  const useLang = (TOOLS_I18N[lang] && TOOLS_I18N[lang].pages && TOOLS_I18N[lang].pages.scoreMeaning) ? lang : 'en';
  const T = TOOLS_I18N[useLang] || TOOLS_I18N.en;
  const C = T.common, SM = T.pages.scoreMeaning;
  const bandLabels = (SPOKES[useLang] && SPOKES[useLang].classLabels) || SPOKES.en.classLabels;
  const bandMeanings = T.bandMeanings || TOOLS_I18N.en.bandMeanings;
  const H = HUB_I18N[useLang] || HUB_I18N.en;
  const pct = pctOf(n,15), idx = clsIdx(n), band = bandLabels[idx]||'', meaning = bandMeanings[idx]||'';
  const rarity = rarityN(pct);
  const canonical = scoreUrl(useLang, n);
  const pillar = useLang==='ko' ? 'https://all-lifes.com/iq-test/' : `https://all-lifes.com/${useLang}/iq-test/`;
  const appUrl = useLang==='ko' ? 'https://all-lifes.com/iq-test/' : `https://all-lifes.com/iq-test/?lang=${useLang}`;

  const h1 = (SM.labels && SM.labels[0] ? SM.labels[0] : 'What an IQ of {n} means').replace('{n}', n);
  const smarter = (C.smarterThan||'Smarter than {p}% of people').replace('{p}', fmtPct(pct));
  const rarityTxt = pct>=50 ? (C.rarity||'Rarer than 1 in {n}').replace('{n}', rarity.toLocaleString()) : '';
  const title = `${h1} — ${fmtPct(pct)}% (${YEAR})`;
  const desc = `${h1}: ${smarter}. ${C.classification||'Classification'}: ${band}.${rarityTxt?' '+rarityTxt+'.':''}`;
  const answer = `${h1}. ${smarter}. ${C.classification}: ${band} — ${meaning}.${rarityTxt? ' '+rarityTxt+'.':''}`;

  // 참고 비교 (계산값 + 기존 밴드 라벨, 새 번역 불필요)
  const marks = [[100, bandLabels[3]], [120, bandLabels[1]], [130, bandLabels[0]]];
  const cmpRows = marks.map(m=>`<tr${m[0]===n?' class="me"':''}><td class="rg">${m[0]}</td><td>${esc(m[1]||'')}</td><td>${fmtPct(pctOf(m[0],15))}%</td></tr>`).join('');
  const cmpTable = `<table class="cls"><thead><tr><th>IQ</th><th>${esc(C.classification||'Class')}</th><th>${esc(C.percentile||'Percentile')}</th></tr></thead><tbody>${cmpRows}</tbody></table>`;

  // 이웃 점수 내부 링크
  const prev = n>SCORE_MIN ? `<a class="nb" href="${scoreUrl(useLang,n-1)}">← IQ ${n-1}</a>` : '<span></span>';
  const next = n<SCORE_MAX ? `<a class="nb" href="${scoreUrl(useLang,n+1)}">IQ ${n+1} →</a>` : '<span></span>';

  // 관련 도구/스포크
  const relTools = ['iq-percentile-calculator','iq-score-meaning'].map(s=>`<li><a href="${toolUrl(s,useLang)}">${esc((TOOLS_I18N[useLang]&&TOOLS_I18N[useLang].pages[TOOL_SLUGS[s]].h1)||TOOLS_I18N.en.pages[TOOL_SLUGS[s]].h1)}</a></li>`).join('');
  const relSpokes = ['good-iq-score','iq-percentile-chart','genius-iq','mensa-iq-requirements'].map(s=>`<li><a href="${spokeUrl(s,useLang)}">${esc(spokeH1(s,useLang))}</a></li>`).join('');

  const hreflangs = HREFLANG_ALL.map(l=>`<link rel="alternate" hreflang="${l}" href="${scoreUrl(l,n)}">`).join('\n    ') + `\n    <link rel="alternate" hreflang="x-default" href="${scoreUrl('en',n)}">`;
  const article = {"@context":"https://schema.org","@type":"Article","headline":h1,"description":desc,"inLanguage":useLang,"datePublished":"2026-05-01","dateModified":LAST_UPDATED,"author":{"@type":"Organization","name":"All-Lifes","url":"https://all-lifes.com/"},"publisher":{"@type":"Organization","name":"All-Lifes","logo":{"@type":"ImageObject","url":"https://all-lifes.com/iq-test/IQ%20TEST.png"}},"mainEntityOfPage":canonical,"speakable":{"@type":"SpeakableSpecification","cssSelector":[".ans"]}};
  const breadcrumb = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"All-Lifes","item":"https://all-lifes.com/"},{"@type":"ListItem","position":2,"name":"IQ Test","item":pillar},{"@type":"ListItem","position":3,"name":SM.h1||"IQ scores","item":scoreHubUrl(useLang)},{"@type":"ListItem","position":4,"name":h1,"item":canonical}]};

  const html = `<!DOCTYPE html>
<html lang="${useLang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="icon" type="image/png" href="https://all-lifes.com/iq-test/favicon-${useLang}.png">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${esc(canonical)}">
    ${hreflangs}
<meta property="og:title" content="${esc(h1)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:type" content="article">
<meta property="og:image" content="${ogImg(useLang)}">
${socialMeta(useLang)}
${ADSENSE_HEAD}
${AD_ZONE_STYLE}
<script type="application/ld+json">${JSON.stringify(article)}</script>
<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f1f5f9;color:#0f172a;line-height:1.65;}
.hero{background:linear-gradient(135deg,#1e1b4b,#312e81,#1d4ed8);color:#fff;padding:30px 20px 22px;text-align:center;}
.hero h1{font-size:clamp(19px,3.2vw,28px);font-weight:900;max-width:760px;margin:0 auto;}
.crumb{max-width:720px;margin:0 auto;padding:10px 18px 0;font-size:12px;color:#64748b;}
.crumb a{color:#4f46e5;text-decoration:none;}
.wrap{max-width:720px;margin:0 auto;padding:14px 18px 46px;}
.scard{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:20px;box-shadow:0 4px 20px rgba(15,23,42,.06);text-align:center;}
.scard .big{font-size:40px;font-weight:900;color:#4f46e5;line-height:1;}
.scard .pl{font-size:13px;color:#64748b;font-weight:700;margin-top:4px;}
.scard .bd{display:inline-block;margin-top:12px;background:#eef2ff;color:#3730a3;font-weight:800;font-size:14px;padding:6px 14px;border-radius:20px;}
.scard .mn{font-size:13px;color:#475569;margin-top:8px;}
.ans{font-size:14px;color:#334155;margin:16px 0;}
.ans b{color:#0f172a;}
.nbrow{display:flex;justify-content:space-between;margin:18px 0 4px;}
.nb{color:#4f46e5;text-decoration:none;font-weight:700;font-size:13.5px;}
table.cls{width:100%;border-collapse:collapse;background:#fff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;font-size:13px;margin:14px 0;}
table.cls thead{background:#1e1b4b;color:#fff;}
table.cls th,table.cls td{padding:9px 12px;text-align:left;}
table.cls td.rg{font-weight:800;color:#4f46e5;}
table.cls tr.me{background:#eef2ff;}
table.cls tr.me td{font-weight:800;}
.cta{display:block;text-align:center;margin:22px auto 0;max-width:420px;background:linear-gradient(135deg,#4f46e5,#6366f1);color:#fff;font-weight:800;font-size:16px;padding:14px;border-radius:12px;text-decoration:none;box-shadow:0 6px 20px rgba(79,70,229,.35);}
.related{margin-top:26px;padding-top:16px;border-top:1px solid #e2e8f0;}
.related h2{font-size:15px;font-weight:800;color:#1e1b4b;margin-bottom:10px;}
.related ul{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:4px 18px;}
@media(max-width:520px){.related ul{grid-template-columns:1fr;}}
.related li{margin:5px 0;}.related a{color:#4f46e5;text-decoration:none;font-size:13.5px;font-weight:600;}
.back{display:block;text-align:center;margin-top:14px;color:#64748b;font-size:13px;text-decoration:none;}
</style>
</head>
<body>
<div class="hero"><h1>${esc(h1)}</h1></div>
<div class="crumb"><a href="${pillar}">IQ Test</a> › <a href="${scoreHubUrl(useLang)}">${esc(SM.h1||'IQ scores')}</a> › IQ ${n}</div>
<div class="wrap">
  ${AD_ZONE_BODY}
  <div class="scard">
    <div class="big">${fmtPct(pct)}<span style="font-size:18px"> %</span></div>
    <div class="pl">${esc(smarter)}</div>
    ${bellSVG(n)}
    <div class="bd">${esc(band)}</div>
    <div class="mn">${esc(meaning)}${rarityTxt?` · ${esc(rarityTxt)}`:''}</div>
  </div>
  <p class="ans"><b>${esc(answer)}</b></p>
  ${cmpTable}
  <div class="nbrow">${prev}${next}</div>
  <a class="cta" href="${toolUrl('iq-percentile-calculator',useLang)}">${esc((C.calculate||'Calculate')+' →')}</a>
  <div class="related"><h2>🔗 ${esc(H.h1||'Learn more')}</h2><ul>${relTools}${relSpokes}</ul></div>
  ${authorityFooter(useLang,{about:true})}
  <a class="back" href="${appUrl}">${esc(H.cta||'🧠 Take the free IQ test →')}</a>
</div>
${adZoneScript(useLang)}
</body>
</html>`;
  return new Response(html, { headers:{ 'Content-Type':'text/html;charset=UTF-8', 'Cache-Control':'public, max-age=86400', 'X-Robots-Tag':'index, follow' }});
}

// 점수 인덱스 허브: /iq-test/score/<lang>
function renderScoreHub(lang){
  const useLang = (TOOLS_I18N[lang] && TOOLS_I18N[lang].pages && TOOLS_I18N[lang].pages.scoreMeaning) ? lang : 'en';
  const T = TOOLS_I18N[useLang] || TOOLS_I18N.en;
  const SM = T.pages.scoreMeaning, C = T.common;
  const bandLabels = (SPOKES[useLang] && SPOKES[useLang].classLabels) || SPOKES.en.classLabels;
  const H = HUB_I18N[useLang] || HUB_I18N.en;
  const canonical = scoreHubUrl(useLang);
  const pillar = useLang==='ko' ? 'https://all-lifes.com/iq-test/' : `https://all-lifes.com/${useLang}/iq-test/`;
  const cards = [];
  for(let s=SCORE_MAX; s>=SCORE_MIN; s-=5){ const idx=clsIdx(s); cards.push(`<a class="card" href="${scoreUrl(useLang,s)}"><div class="ct">IQ ${s}</div><div class="cd">${fmtPct(pctOf(s,15))}% · ${esc(bandLabels[idx]||'')}</div></a>`); }
  const grid = cards.join('');
  const hreflangs = HREFLANG_ALL.map(l=>`<link rel="alternate" hreflang="${l}" href="${scoreHubUrl(l)}">`).join('\n    ') + `\n    <link rel="alternate" hreflang="x-default" href="${scoreHubUrl('en')}">`;
  const itemList = {"@context":"https://schema.org","@type":"ItemList","name":SM.h1,"itemListElement":[]};
  for(let s=SCORE_MIN;s<=SCORE_MAX;s++) itemList.itemListElement.push({"@type":"ListItem","position":s-SCORE_MIN+1,"url":scoreUrl(useLang,s)});
  const breadcrumb = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"All-Lifes","item":"https://all-lifes.com/"},{"@type":"ListItem","position":2,"name":"IQ Test","item":pillar},{"@type":"ListItem","position":3,"name":SM.h1,"item":canonical}]};
  const html = `<!DOCTYPE html>
<html lang="${useLang}">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="icon" type="image/png" href="https://all-lifes.com/iq-test/favicon-${useLang}.png">
<title>${esc(SM.h1)} (${YEAR})</title>
<meta name="description" content="${esc(SM.desc)}">
<link rel="canonical" href="${esc(canonical)}">
    ${hreflangs}
<meta property="og:title" content="${esc(SM.h1)}"><meta property="og:description" content="${esc(SM.desc)}"><meta property="og:url" content="${esc(canonical)}"><meta property="og:type" content="website"><meta property="og:image" content="${ogImg(useLang)}">
${socialMeta(useLang)}
${ADSENSE_HEAD}
${AD_ZONE_STYLE}
<script type="application/ld+json">${JSON.stringify(itemList)}</script>
<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f1f5f9;color:#0f172a;line-height:1.6;}
.hero{background:linear-gradient(135deg,#1e1b4b,#312e81,#1d4ed8);color:#fff;padding:32px 20px 24px;text-align:center;}
.hero h1{font-size:clamp(20px,3.4vw,30px);font-weight:900;max-width:760px;margin:0 auto 8px;}
.hero p{font-size:14px;color:#c7d2fe;max-width:680px;margin:0 auto;}
.crumb{max-width:780px;margin:0 auto;padding:10px 18px 0;font-size:12px;color:#64748b;}.crumb a{color:#4f46e5;text-decoration:none;}
.wrap{max-width:780px;margin:0 auto;padding:14px 18px 50px;}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;margin-top:6px;}
.card{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:13px 15px;text-decoration:none;color:#0f172a;transition:all .15s;}
.card:hover{transform:translateY(-2px);border-color:#6366f1;box-shadow:0 6px 16px rgba(79,70,229,.18);}
.card .ct{font-size:15px;font-weight:800;color:#1e1b4b;}
.card .cd{font-size:12px;color:#64748b;margin-top:3px;}
.cta{display:block;text-align:center;margin:24px auto 0;max-width:420px;background:linear-gradient(135deg,#4f46e5,#6366f1);color:#fff;font-weight:800;font-size:16px;padding:14px;border-radius:12px;text-decoration:none;box-shadow:0 6px 20px rgba(79,70,229,.35);}
.back{display:block;text-align:center;margin-top:14px;color:#64748b;font-size:13px;text-decoration:none;}
</style>
</head>
<body>
<div class="hero"><h1>${esc(SM.h1)}</h1><p>${esc(SM.intro)}</p></div>
<div class="crumb"><a href="${pillar}">IQ Test</a> › ${esc(SM.h1)}</div>
<div class="wrap">
  ${AD_ZONE_BODY}
  <div class="grid">${grid}</div>
  ${authorityFooter(useLang,{about:true})}
  <a class="cta" href="${toolUrl('iq-percentile-calculator',useLang)}">${esc((C.calculate||'Calculate')+' →')}</a>
  <a class="back" href="${pillar}">${esc(H.backHome||'← Back to the IQ Test')}</a>
</div>
${adZoneScript(useLang)}
</body>
</html>`;
  return new Response(html, { headers:{ 'Content-Type':'text/html;charset=UTF-8', 'Cache-Control':'public, max-age=86400', 'X-Robots-Tag':'index, follow' }});
}

// ── 백분위 → IQ 프로그래매틱 페이지: /iq-test/percentile/<lang>/<p> ──
function renderPercentilePage(lang, pRaw){
  const p = parseInt(pRaw,10);
  if(!Number.isFinite(p) || p < 1 || p > 99) return null;
  const useLang = (TOOLS_I18N[lang] && TOOLS_I18N[lang].common) ? lang : 'en';
  const T = TOOLS_I18N[useLang] || TOOLS_I18N.en;
  const C = T.common;
  const bandLabels = (SPOKES[useLang] && SPOKES[useLang].classLabels) || SPOKES.en.classLabels;
  const bandMeanings = T.bandMeanings || TOOLS_I18N.en.bandMeanings;
  const SM = T.pages.scoreMeaning, H = HUB_I18N[useLang] || HUB_I18N.en;
  const iq = iqForPercentile(p), idx = clsIdx(iq), band = bandLabels[idx]||'', meaning = bandMeanings[idx]||'';
  const rarity = rarityAtPct(p);
  const canonical = percentileUrl(useLang, p);
  const pillar = useLang==='ko' ? 'https://all-lifes.com/iq-test/' : `https://all-lifes.com/${useLang}/iq-test/`;
  const appUrl = useLang==='ko' ? 'https://all-lifes.com/iq-test/' : `https://all-lifes.com/iq-test/?lang=${useLang}`;
  const h1 = `${C.percentile} ${p} = IQ ${iq}`;
  const smarter = (C.smarterThan||'Smarter than {p}% of people').replace('{p}', p);
  const rarityTxt = (C.rarity||'Rarer than 1 in {n}').replace('{n}', rarity.toLocaleString());
  const title = `${h1} (${YEAR})`;
  const desc = `${h1}. ${smarter}. ${C.classification||'Classification'}: ${band}.`;
  const answer = `${h1}. ${smarter}. ${C.classification}: ${band} — ${meaning}. ${rarityTxt}.`;
  const marks = [[100,bandLabels[3]],[120,bandLabels[1]],[130,bandLabels[0]]];
  const cmpRows = marks.map(m=>`<tr${m[0]===iq?' class="me"':''}><td class="rg">${m[0]}</td><td>${esc(m[1]||'')}</td><td>${fmtPct(pctOf(m[0],15))}%</td></tr>`).join('');
  const cmpTable = `<table class="cls"><thead><tr><th>IQ</th><th>${esc(C.classification||'Class')}</th><th>${esc(C.percentile||'Percentile')}</th></tr></thead><tbody>${cmpRows}</tbody></table>`;
  const prev = p>PCT_MIN ? `<a class="nb" href="${percentileUrl(useLang,p-1)}">← ${esc(C.percentile)} ${p-1}</a>` : '<span></span>';
  const next = p<PCT_MAX ? `<a class="nb" href="${percentileUrl(useLang,p+1)}">${esc(C.percentile)} ${p+1} →</a>` : '<span></span>';
  const relTools = ['iq-percentile-calculator','iq-score-meaning'].map(s=>`<li><a href="${toolUrl(s,useLang)}">${esc((TOOLS_I18N[useLang]&&TOOLS_I18N[useLang].pages[TOOL_SLUGS[s]].h1)||TOOLS_I18N.en.pages[TOOL_SLUGS[s]].h1)}</a></li>`).join('');
  const relSpokes = ['iq-percentile-chart','good-iq-score','mensa-iq-requirements','genius-iq'].map(s=>`<li><a href="${spokeUrl(s,useLang)}">${esc(spokeH1(s,useLang))}</a></li>`).join('');
  const hreflangs = HREFLANG_ALL.map(l=>`<link rel="alternate" hreflang="${l}" href="${percentileUrl(l,p)}">`).join('\n    ') + `\n    <link rel="alternate" hreflang="x-default" href="${percentileUrl('en',p)}">`;
  const article = {"@context":"https://schema.org","@type":"Article","headline":h1,"description":desc,"inLanguage":useLang,"datePublished":"2026-05-01","dateModified":LAST_UPDATED,"author":{"@type":"Organization","name":"All-Lifes","url":"https://all-lifes.com/"},"publisher":{"@type":"Organization","name":"All-Lifes","logo":{"@type":"ImageObject","url":"https://all-lifes.com/iq-test/IQ%20TEST.png"}},"mainEntityOfPage":canonical,"speakable":{"@type":"SpeakableSpecification","cssSelector":[".ans"]}};
  const breadcrumb = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"All-Lifes","item":"https://all-lifes.com/"},{"@type":"ListItem","position":2,"name":"IQ Test","item":pillar},{"@type":"ListItem","position":3,"name":"IQ "+C.percentile,"item":percentileHubUrl(useLang)},{"@type":"ListItem","position":4,"name":h1,"item":canonical}]};
  const html = `<!DOCTYPE html>
<html lang="${useLang}">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="icon" type="image/png" href="https://all-lifes.com/iq-test/favicon-${useLang}.png">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${esc(canonical)}">
    ${hreflangs}
<meta property="og:title" content="${esc(h1)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${esc(canonical)}"><meta property="og:type" content="article"><meta property="og:image" content="${ogImg(useLang)}">
${socialMeta(useLang)}
${ADSENSE_HEAD}
${AD_ZONE_STYLE}
<script type="application/ld+json">${JSON.stringify(article)}</script>
<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f1f5f9;color:#0f172a;line-height:1.65;}
.hero{background:linear-gradient(135deg,#1e1b4b,#312e81,#1d4ed8);color:#fff;padding:30px 20px 22px;text-align:center;}
.hero h1{font-size:clamp(19px,3.2vw,28px);font-weight:900;max-width:760px;margin:0 auto;}
.crumb{max-width:720px;margin:0 auto;padding:10px 18px 0;font-size:12px;color:#64748b;}.crumb a{color:#4f46e5;text-decoration:none;}
.wrap{max-width:720px;margin:0 auto;padding:14px 18px 46px;}
.scard{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:20px;box-shadow:0 4px 20px rgba(15,23,42,.06);text-align:center;}
.scard .big{font-size:40px;font-weight:900;color:#4f46e5;line-height:1;}
.scard .pl{font-size:13px;color:#64748b;font-weight:700;margin-top:4px;}
.scard .bd{display:inline-block;margin-top:12px;background:#eef2ff;color:#3730a3;font-weight:800;font-size:14px;padding:6px 14px;border-radius:20px;}
.scard .mn{font-size:13px;color:#475569;margin-top:8px;}
.ans{font-size:14px;color:#334155;margin:16px 0;}.ans b{color:#0f172a;}
.nbrow{display:flex;justify-content:space-between;margin:18px 0 4px;}.nb{color:#4f46e5;text-decoration:none;font-weight:700;font-size:13.5px;}
table.cls{width:100%;border-collapse:collapse;background:#fff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;font-size:13px;margin:14px 0;}
table.cls thead{background:#1e1b4b;color:#fff;}table.cls th,table.cls td{padding:9px 12px;text-align:left;}
table.cls td.rg{font-weight:800;color:#4f46e5;}table.cls tr.me{background:#eef2ff;}table.cls tr.me td{font-weight:800;}
.cta{display:block;text-align:center;margin:22px auto 0;max-width:420px;background:linear-gradient(135deg,#4f46e5,#6366f1);color:#fff;font-weight:800;font-size:16px;padding:14px;border-radius:12px;text-decoration:none;box-shadow:0 6px 20px rgba(79,70,229,.35);}
.related{margin-top:26px;padding-top:16px;border-top:1px solid #e2e8f0;}.related h2{font-size:15px;font-weight:800;color:#1e1b4b;margin-bottom:10px;}
.related ul{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:4px 18px;}@media(max-width:520px){.related ul{grid-template-columns:1fr;}}
.related li{margin:5px 0;}.related a{color:#4f46e5;text-decoration:none;font-size:13.5px;font-weight:600;}
.back{display:block;text-align:center;margin-top:14px;color:#64748b;font-size:13px;text-decoration:none;}
</style>
</head>
<body>
<div class="hero"><h1>${esc(h1)}</h1></div>
<div class="crumb"><a href="${pillar}">IQ Test</a> › <a href="${percentileHubUrl(useLang)}">IQ ${esc(C.percentile)}</a> › ${p}</div>
<div class="wrap">
  ${AD_ZONE_BODY}
  <div class="scard">
    <div class="big">${iq}</div>
    <div class="pl">${esc(smarter)}</div>
    ${bellSVG(iq)}
    <div class="bd">${esc(band)}</div>
    <div class="mn">${esc(meaning)} · ${esc(rarityTxt)}</div>
  </div>
  <p class="ans"><b>${esc(answer)}</b></p>
  ${cmpTable}
  <div class="nbrow">${prev}${next}</div>
  <a class="cta" href="${toolUrl('iq-percentile-calculator',useLang)}">${esc((C.calculate||'Calculate')+' →')}</a>
  <div class="related"><h2>🔗 ${esc(H.h1||'Learn more')}</h2><ul>${relTools}${relSpokes}</ul></div>
  ${authorityFooter(useLang,{about:true})}
  <a class="back" href="${appUrl}">${esc(H.cta||'🧠 Take the free IQ test →')}</a>
</div>
${adZoneScript(useLang)}
</body>
</html>`;
  return new Response(html, { headers:{ 'Content-Type':'text/html;charset=UTF-8', 'Cache-Control':'public, max-age=86400', 'X-Robots-Tag':'index, follow' }});
}

function renderPercentileHub(lang){
  const useLang = (TOOLS_I18N[lang] && TOOLS_I18N[lang].common) ? lang : 'en';
  const T = TOOLS_I18N[useLang] || TOOLS_I18N.en, C = T.common, SM = T.pages.scoreMeaning;
  const H = HUB_I18N[useLang] || HUB_I18N.en;
  const bandLabels = (SPOKES[useLang] && SPOKES[useLang].classLabels) || SPOKES.en.classLabels;
  const canonical = percentileHubUrl(useLang);
  const pillar = useLang==='ko' ? 'https://all-lifes.com/iq-test/' : `https://all-lifes.com/${useLang}/iq-test/`;
  const hubTitle = `IQ ${C.percentile}`;
  const picks=[1,2,5,10,25,50,75,80,84,90,91,95,97,98,99];
  const cards = picks.map(p=>{const iq=iqForPercentile(p);return `<a class="card" href="${percentileUrl(useLang,p)}"><div class="ct">${esc(C.percentile)} ${p}</div><div class="cd">IQ ${iq} · ${esc(bandLabels[clsIdx(iq)]||'')}</div></a>`;}).join('');
  const hreflangs = HREFLANG_ALL.map(l=>`<link rel="alternate" hreflang="${l}" href="${percentileHubUrl(l)}">`).join('\n    ') + `\n    <link rel="alternate" hreflang="x-default" href="${percentileHubUrl('en')}">`;
  const itemList = {"@context":"https://schema.org","@type":"ItemList","name":hubTitle,"itemListElement":[]};
  for(let p=PCT_MIN;p<=PCT_MAX;p++) itemList.itemListElement.push({"@type":"ListItem","position":p,"url":percentileUrl(useLang,p)});
  const breadcrumb = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"All-Lifes","item":"https://all-lifes.com/"},{"@type":"ListItem","position":2,"name":"IQ Test","item":pillar},{"@type":"ListItem","position":3,"name":hubTitle,"item":canonical}]};
  const html = `<!DOCTYPE html>
<html lang="${useLang}">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="icon" type="image/png" href="https://all-lifes.com/iq-test/favicon-${useLang}.png">
<title>${esc(hubTitle)} (${YEAR})</title>
<meta name="description" content="${esc(SM.desc)}">
<link rel="canonical" href="${esc(canonical)}">
    ${hreflangs}
<meta property="og:title" content="${esc(hubTitle)}"><meta property="og:description" content="${esc(SM.desc)}"><meta property="og:url" content="${esc(canonical)}"><meta property="og:type" content="website"><meta property="og:image" content="${ogImg(useLang)}">
${socialMeta(useLang)}
${ADSENSE_HEAD}
${AD_ZONE_STYLE}
<script type="application/ld+json">${JSON.stringify(itemList)}</script>
<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f1f5f9;color:#0f172a;line-height:1.6;}
.hero{background:linear-gradient(135deg,#1e1b4b,#312e81,#1d4ed8);color:#fff;padding:32px 20px 24px;text-align:center;}
.hero h1{font-size:clamp(20px,3.4vw,30px);font-weight:900;margin:0 auto 8px;}.hero p{font-size:14px;color:#c7d2fe;max-width:680px;margin:0 auto;}
.crumb{max-width:780px;margin:0 auto;padding:10px 18px 0;font-size:12px;color:#64748b;}.crumb a{color:#4f46e5;text-decoration:none;}
.wrap{max-width:780px;margin:0 auto;padding:14px 18px 50px;}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;margin-top:6px;}
.card{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:13px 15px;text-decoration:none;color:#0f172a;transition:all .15s;}
.card:hover{transform:translateY(-2px);border-color:#6366f1;box-shadow:0 6px 16px rgba(79,70,229,.18);}
.card .ct{font-size:15px;font-weight:800;color:#1e1b4b;}.card .cd{font-size:12px;color:#64748b;margin-top:3px;}
.cta{display:block;text-align:center;margin:24px auto 0;max-width:420px;background:linear-gradient(135deg,#4f46e5,#6366f1);color:#fff;font-weight:800;font-size:16px;padding:14px;border-radius:12px;text-decoration:none;box-shadow:0 6px 20px rgba(79,70,229,.35);}
.back{display:block;text-align:center;margin-top:14px;color:#64748b;font-size:13px;text-decoration:none;}
</style>
</head>
<body>
<div class="hero"><h1>${esc(hubTitle)}</h1><p>${esc(SM.intro)}</p></div>
<div class="crumb"><a href="${pillar}">IQ Test</a> › ${esc(hubTitle)}</div>
<div class="wrap">
  ${AD_ZONE_BODY}
  <div class="grid">${cards}</div>
  ${authorityFooter(useLang,{about:true})}
  <a class="cta" href="${toolUrl('iq-percentile-calculator',useLang)}">${esc((C.calculate||'Calculate')+' →')}</a>
  <a class="back" href="${pillar}">${esc(H.backHome||'← Back to the IQ Test')}</a>
</div>
${adZoneScript(useLang)}
</body>
</html>`;
  return new Response(html, { headers:{ 'Content-Type':'text/html;charset=UTF-8', 'Cache-Control':'public, max-age=86400', 'X-Robots-Tag':'index, follow' }});
}

// ── 용어 개별 페이지: /iq-test/glossary/<lang>/<key> (DefinedTerm) ──
function renderGlossaryTerm(lang, key){
  const useLang = (GLOSSARY_I18N[lang] && GLOSSARY_I18N[lang].terms) ? lang : 'en';
  const G = GLOSSARY_I18N[useLang];
  if(!G || !Array.isArray(G.terms)) return null;
  const t = G.terms.find(x=>x.key===key);
  if(!t) return null;
  const H = HUB_I18N[useLang] || HUB_I18N.en;
  const canonical = glossaryTermUrl(useLang, key);
  const pillar = useLang==='ko' ? 'https://all-lifes.com/iq-test/' : `https://all-lifes.com/${useLang}/iq-test/`;
  const related = G.terms.filter(x=>x.key!==key).slice(0,8).map(x=>`<li><a href="${glossaryTermUrl(useLang,x.key)}">${esc(x.term)}</a></li>`).join('');
  const hreflangs = HREFLANG_ALL.map(l=>`<link rel="alternate" hreflang="${l}" href="${glossaryTermUrl(l,key)}">`).join('\n    ') + `\n    <link rel="alternate" hreflang="x-default" href="${glossaryTermUrl('en',key)}">`;
  const dt = {"@context":"https://schema.org","@type":"DefinedTerm","name":t.term,"description":t.def,"url":canonical,"inLanguage":useLang,"inDefinedTermSet":glossaryUrl(useLang)};
  const breadcrumb = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"All-Lifes","item":"https://all-lifes.com/"},{"@type":"ListItem","position":2,"name":"IQ Test","item":pillar},{"@type":"ListItem","position":3,"name":G.title,"item":glossaryUrl(useLang)},{"@type":"ListItem","position":4,"name":t.term,"item":canonical}]};
  const html = `<!DOCTYPE html>
<html lang="${useLang}">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="icon" type="image/png" href="https://all-lifes.com/iq-test/favicon-${useLang}.png">
<title>${esc(t.term)} — ${esc(G.title)}</title>
<meta name="description" content="${esc(t.def)}">
<link rel="canonical" href="${esc(canonical)}">
    ${hreflangs}
<meta property="og:title" content="${esc(t.term)}"><meta property="og:description" content="${esc(t.def)}"><meta property="og:url" content="${esc(canonical)}"><meta property="og:type" content="article"><meta property="og:image" content="${ogImg(useLang)}">
${socialMeta(useLang)}
${ADSENSE_HEAD}
${AD_ZONE_STYLE}
<script type="application/ld+json">${JSON.stringify(dt)}</script>
<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f1f5f9;color:#0f172a;line-height:1.7;}
.hero{background:linear-gradient(135deg,#1e1b4b,#312e81,#1d4ed8);color:#fff;padding:32px 20px 24px;text-align:center;}
.hero h1{font-size:clamp(20px,3.4vw,30px);font-weight:900;margin:0 auto;}
.crumb{max-width:720px;margin:0 auto;padding:10px 18px 0;font-size:12px;color:#64748b;}.crumb a{color:#4f46e5;text-decoration:none;}
.wrap{max-width:720px;margin:0 auto;padding:14px 18px 46px;}
.def{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:18px 20px;font-size:15px;color:#334155;}
.related{margin-top:26px;padding-top:16px;border-top:1px solid #e2e8f0;}.related h2{font-size:15px;font-weight:800;color:#1e1b4b;margin-bottom:10px;}
.related ul{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:4px 18px;}@media(max-width:520px){.related ul{grid-template-columns:1fr;}}
.related li{margin:5px 0;}.related a{color:#4f46e5;text-decoration:none;font-size:13.5px;font-weight:600;}
.cta{display:block;text-align:center;margin:24px auto 0;max-width:420px;background:linear-gradient(135deg,#4f46e5,#6366f1);color:#fff;font-weight:800;font-size:16px;padding:14px;border-radius:12px;text-decoration:none;box-shadow:0 6px 20px rgba(79,70,229,.35);}
.back{display:block;text-align:center;margin-top:14px;color:#64748b;font-size:13px;text-decoration:none;}
</style>
</head>
<body>
<div class="hero"><h1>${esc(t.term)}</h1></div>
<div class="crumb"><a href="${pillar}">IQ Test</a> › <a href="${glossaryUrl(useLang)}">${esc(G.title)}</a> › ${esc(t.term)}</div>
<div class="wrap">
  ${AD_ZONE_BODY}
  <div class="def">${esc(t.def)}</div>
  <div class="related"><h2>${esc(G.title)}</h2><ul>${related}</ul></div>
  ${authorityFooter(useLang,{about:true})}
  <a class="cta" href="${useLang==='ko'?'https://all-lifes.com/iq-test/':'https://all-lifes.com/iq-test/?lang='+useLang}">${esc(H.cta||'🧠 Take the free IQ test →')}</a>
  <a class="back" href="${glossaryUrl(useLang)}">${esc(G.title)}</a>
</div>
${adZoneScript(useLang)}
</body>
</html>`;
  return new Response(html, { headers:{ 'Content-Type':'text/html;charset=UTF-8', 'Cache-Control':'public, max-age=86400', 'X-Robots-Tag':'index, follow' }});
}

// ── llms.txt (다른 분야: AI 크롤러 가이드 — 2025 AEO): /iq-test/llms.txt ──
function renderLlms(){
  const b='https://all-lifes.com/iq-test';
  const txt=`# All-Lifes — IQ & Intelligence Testing

> Free, science-based IQ and cognitive testing in 13 languages (ko, en, de, ja, fr, es, pt, it, id, hi, ru, vi, tr). Scores use the standard model: mean 100, standard deviation 15. Online results are educational estimates, not clinical diagnoses.

## Tools (interactive calculators)
- [IQ Percentile Calculator](${b}/tools/en/iq-percentile-calculator): IQ score to percentile and rarity.
- [What an IQ Score Means](${b}/tools/en/iq-score-meaning): interpretation by score.
- [Parent–Child IQ Calculator](${b}/tools/en/parent-child-iq-calculator): regression to the mean.
- [IQ Scale Converter](${b}/tools/en/iq-scale-converter): SD 15 / 16 / 24.
- [IQ vs Country Average](${b}/tools/en/iq-by-country)
- [Average IQ by Age](${b}/tools/en/average-iq-by-age-calculator)
- All tools: ${b}/tools/en

## Guides
- [What is a good IQ score](${b}/learn/en/good-iq-score)
- [IQ percentile chart](${b}/learn/en/iq-percentile-chart)
- [Are online IQ tests accurate](${b}/learn/en/online-iq-test-accuracy)
- [Genius IQ level](${b}/learn/en/genius-iq)
- [Mensa IQ requirement](${b}/learn/en/mensa-iq-requirements)
- [Fluid vs crystallized intelligence](${b}/learn/en/fluid-vs-crystallized-intelligence)
- [IQ vs EQ](${b}/learn/en/iq-vs-eq)
- [Reverse Flynn effect](${b}/learn/en/reverse-flynn-effect)
- [Can AI pass an IQ test](${b}/learn/en/can-ai-pass-iq-test)

## Reference
- [IQ score distribution & statistics](${b}/iq-statistics/en)
- [IQ glossary (24 terms)](${b}/glossary/en)
- [Average IQ by country](${b}/average-iq-by-country)
- [IQ score pages 65-150](${b}/score/en)
- [About & methodology](${b}/about/en)

## Notes for AI answer engines
- IQ 100 = 50th percentile (average). 115 ≈ 84th. 120 ≈ 91st. 130 = 98th (top 2%, Mensa). 145 ≈ 99.9th.
- Mensa cutoff is the 98th percentile on any accepted test (Wechsler 130 / Stanford-Binet 132 / Cattell 148).
- Content is reviewed against established psychometric sources and dated; last updated ${LAST_UPDATED}.
`;
  return new Response(txt, { headers:{ 'Content-Type':'text/plain;charset=UTF-8', 'Cache-Control':'public, max-age=86400' }});
}

// ── 임베드 위젯 (다른 분야: SaaS·계산기 — 백링크 획득): /iq-test/embed/<lang> ──
const embedUrl = (lang) => `https://all-lifes.com/iq-test/embed/${lang}`;
function renderEmbed(lang){
  const useLang = (TOOLS_I18N[lang] && TOOLS_I18N[lang].common) ? lang : 'en';
  const T = TOOLS_I18N[useLang] || TOOLS_I18N.en, C = T.common;
  const bandLabels = (SPOKES[useLang] && SPOKES[useLang].classLabels) || SPOKES.en.classLabels;
  const bandMeanings = T.bandMeanings || TOOLS_I18N.en.bandMeanings;
  const appUrl = useLang==='ko' ? 'https://all-lifes.com/iq-test/' : `https://all-lifes.com/iq-test/?lang=${useLang}`;
  const D = JSON.stringify({ bands:bandLabels, means:bandMeanings, pct:C.percentile, sm:C.smarterThan, cl:C.classification });
  const html = `<!DOCTYPE html>
<html lang="${useLang}"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>IQ ${esc(C.percentile)}</title>
<meta name="robots" content="noindex,follow">
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:transparent;color:#0f172a;}
.w{max-width:340px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:18px;box-shadow:0 4px 18px rgba(15,23,42,.08);}
label{display:block;font-size:12px;font-weight:700;color:#475569;margin-bottom:6px;}
input{width:100%;padding:11px 13px;font-size:16px;font-weight:700;border:1.5px solid #e2e8f0;border-radius:10px;background:#f8fafc;}
input:focus{outline:none;border-color:#6366f1;background:#fff;}
.r{margin-top:14px;text-align:center;}
.big{font-size:34px;font-weight:900;color:#4f46e5;line-height:1;}
.lab{font-size:12.5px;color:#64748b;font-weight:700;margin-top:3px;}
.bd{display:inline-block;margin-top:10px;background:#eef2ff;color:#3730a3;font-weight:800;font-size:13px;padding:5px 12px;border-radius:16px;}
.pb{display:block;text-align:center;margin-top:12px;font-size:11px;color:#94a3b8;text-decoration:none;}
.pb b{color:#4f46e5;}
</style></head>
<body>
<div class="w">
  <label>${esc(C.yourIQ)}</label>
  <input id="iq" type="number" value="120" min="40" max="200">
  <div class="r" id="r"></div>
  <a class="pb" href="${appUrl}" target="_blank" rel="noopener">Powered by <b>All-Lifes IQ Test</b></a>
</div>
<script>
(function(){var D=${D};
function erf(x){var t=1/(1+0.3275911*Math.abs(x));var y=1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-0.284496736)*t+0.254829592)*t*Math.exp(-x*x);return x>=0?y:-y;}
function pct(iq){return 0.5*(1+erf((iq-100)/15/Math.SQRT2))*100;}
function ci(iq){return iq>=130?0:iq>=120?1:iq>=110?2:iq>=90?3:iq>=80?4:iq>=70?5:6;}
function fp(v){if(v>99.9)v=99.9;if(v<0.1)v=0.1;return v.toFixed(1);}
var R=document.getElementById('r');
function calc(){var iq=parseFloat(document.getElementById('iq').value);if(isNaN(iq))return;var p=pct(iq),i=ci(iq);R.innerHTML='<div class="big">'+fp(p)+'%</div><div class="lab">'+D.sm.replace('{p}',fp(p))+'</div><div class="bd">'+D.bands[i]+'</div>';}
document.getElementById('iq').addEventListener('input',calc);calc();})();
</script>
</body></html>`;
  // 임베드 허용: X-Frame-Options 미설정(기본 허용)
  return new Response(html, { headers:{ 'Content-Type':'text/html;charset=UTF-8', 'Cache-Control':'public, max-age=86400' }});
}

// ── 온사이트 검색 (다른 분야: 대형 콘텐츠사 — 사이트링크 검색창): /iq-test/search/<lang> ──
const searchUrl = (lang) => `https://all-lifes.com/iq-test/search/${lang}`;
function renderSearch(lang, q){
  const useLang = (TOOLS_I18N[lang] && SPOKES[lang]) ? lang : 'en';
  const T = TOOLS_I18N[useLang] || TOOLS_I18N.en, C = T.common;
  const H = HUB_I18N[useLang] || HUB_I18N.en;
  const canonical = searchUrl(useLang);
  const pillar = useLang==='ko' ? 'https://all-lifes.com/iq-test/' : `https://all-lifes.com/${useLang}/iq-test/`;
  // 검색 인덱스 (스포크 + 도구 + 용어 + 인기 점수/백분위)
  const idx = [];
  SPOKE_SLUGS.forEach(s=>idx.push([spokeH1(s,useLang), spokeUrl(s,useLang)]));
  Object.keys(TOOL_SLUGS).forEach(s=>idx.push([T.pages[TOOL_SLUGS[s]].h1, toolUrl(s,useLang)]));
  ((GLOSSARY_I18N[useLang]&&GLOSSARY_I18N[useLang].terms)||[]).forEach(t=>idx.push([t.term, glossaryTermUrl(useLang,t.key)]));
  [100,110,115,120,130,140].forEach(n=>idx.push(['IQ '+n, scoreUrl(useLang,n)]));
  const IDX = JSON.stringify(idx);
  const hreflangs = HREFLANG_ALL.map(l=>`<link rel="alternate" hreflang="${l}" href="${searchUrl(l)}">`).join('\n    ') + `\n    <link rel="alternate" hreflang="x-default" href="${searchUrl('en')}">`;
  const title = `${esc(C.calculate||'Search')} · IQ`;
  const html = `<!DOCTYPE html>
<html lang="${useLang}"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="icon" type="image/png" href="https://all-lifes.com/iq-test/favicon-${useLang}.png">
<title>IQ Search — All-Lifes</title>
<meta name="description" content="Search IQ guides, calculators and terms.">
<link rel="canonical" href="${esc(canonical)}">
    ${hreflangs}
<meta name="robots" content="noindex,follow">
${socialMeta(useLang)}
<style>
*{margin:0;padding:0;box-sizing:border-box;}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f1f5f9;color:#0f172a;}
.hero{background:linear-gradient(135deg,#1e1b4b,#312e81,#1d4ed8);color:#fff;padding:28px 20px;text-align:center;}
.hero h1{font-size:22px;font-weight:900;}
.wrap{max-width:640px;margin:0 auto;padding:18px;}
#sb{width:100%;padding:14px 16px;font-size:16px;border:1.5px solid #e2e8f0;border-radius:12px;background:#fff;}
#sb:focus{outline:none;border-color:#6366f1;}
#res{margin-top:14px;}
.it{display:block;background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:13px 15px;margin-bottom:8px;text-decoration:none;color:#1e1b4b;font-weight:600;font-size:14px;}
.it:hover{border-color:#6366f1;}
.back{display:block;text-align:center;margin-top:18px;color:#64748b;font-size:13px;text-decoration:none;}
</style></head>
<body>
<div class="hero"><h1>🔎 IQ Search</h1></div>
<div class="wrap">
  <input id="sb" type="search" placeholder="IQ 130, percentile, Mensa, EQ…" autocomplete="off">
  <div id="res"></div>
  <a class="back" href="${pillar}">${esc(H.backHome||'← Back to the IQ Test')}</a>
</div>
<script>
(function(){var IDX=${IDX};var sb=document.getElementById('sb'),res=document.getElementById('res');
function render(q){q=(q||'').toLowerCase().trim();var list=q?IDX.filter(function(x){return x[0].toLowerCase().indexOf(q)>=0;}):IDX.slice(0,12);
res.innerHTML=list.slice(0,40).map(function(x){return '<a class="it" href="'+x[1]+'">'+x[0]+'</a>';}).join('')||'<p style="color:#94a3b8;padding:10px">—</p>';}
sb.addEventListener('input',function(){render(sb.value);});
var u=new URL(location.href);var q0=u.searchParams.get('q');if(q0){sb.value=q0;}render(sb.value);})();
</script>
</body></html>`;
  return new Response(html, { headers:{ 'Content-Type':'text/html;charset=UTF-8', 'Cache-Control':'public, max-age=3600' }});
}

// ── 인기/트렌딩 허브 (뉴스/미디어 패턴): /iq-test/popular/<lang> ──
const popularUrl = (lang) => `https://all-lifes.com/iq-test/popular/${lang}`;
const feedUrl = (lang) => `https://all-lifes.com/iq-test/feed/${lang}.xml`;
const POP_I18N = {ko:'인기 IQ 페이지',en:'Most Popular IQ Pages',de:'Beliebteste IQ-Seiten',ja:'人気のIQページ',fr:'Pages de QI les plus populaires',es:'Páginas de CI más populares',pt:'Páginas de QI mais populares',it:'Pagine sul QI più popolari',id:'Halaman IQ Terpopuler',hi:'लोकप्रिय IQ पेज',ru:'Популярные страницы об IQ',vi:'Trang IQ phổ biến nhất',tr:'En Popüler IQ Sayfaları'};
function renderPopular(lang){
  const useLang = (TOOLS_I18N[lang] && SPOKES[lang]) ? lang : 'en';
  const T = TOOLS_I18N[useLang] || TOOLS_I18N.en, C = T.common;
  const bandLabels = (SPOKES[useLang] && SPOKES[useLang].classLabels) || SPOKES.en.classLabels;
  const H = HUB_I18N[useLang] || HUB_I18N.en;
  const title = POP_I18N[useLang] || POP_I18N.en;
  const canonical = popularUrl(useLang);
  const pillar = useLang==='ko' ? 'https://all-lifes.com/iq-test/' : `https://all-lifes.com/${useLang}/iq-test/`;
  const scoreLinks = [100,110,115,120,130,140].map(n=>`<a class="card" href="${scoreUrl(useLang,n)}"><div class="ct">IQ ${n}</div><div class="cd">${fmtPct(pctOf(n,15))}% · ${esc(bandLabels[clsIdx(n)]||'')}</div></a>`).join('');
  const pctLinks = [90,95,98,99].map(p=>`<a class="card" href="${percentileUrl(useLang,p)}"><div class="ct">${esc(C.percentile)} ${p}</div><div class="cd">IQ ${iqForPercentile(p)}</div></a>`).join('');
  const spokeLinks = ['good-iq-score','genius-iq','mensa-iq-requirements','iq-vs-eq','average-iq-by-age','reverse-flynn-effect'].map(s=>`<a class="card" href="${spokeUrl(s,useLang)}"><div class="ct">${esc(spokeH1(s,useLang))}</div></a>`).join('');
  const toolLinks = Object.keys(TOOL_SLUGS).slice(0,4).map(s=>`<a class="card" href="${toolUrl(s,useLang)}"><div class="ct">${esc(T.pages[TOOL_SLUGS[s]].h1)}</div></a>`).join('');
  const hreflangs = HREFLANG_ALL.map(l=>`<link rel="alternate" hreflang="${l}" href="${popularUrl(l)}">`).join('\n    ') + `\n    <link rel="alternate" hreflang="x-default" href="${popularUrl('en')}">`;
  const breadcrumb = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"All-Lifes","item":"https://all-lifes.com/"},{"@type":"ListItem","position":2,"name":"IQ Test","item":pillar},{"@type":"ListItem","position":3,"name":title,"item":canonical}]};
  const sec = (h,inner)=>`<div class="sec">${esc(h)}</div><div class="grid">${inner}</div>`;
  const html = `<!DOCTYPE html>
<html lang="${useLang}">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="icon" type="image/png" href="https://all-lifes.com/iq-test/favicon-${useLang}.png">
<title>${esc(title)} (${YEAR})</title>
<meta name="description" content="${esc(title)} — All-Lifes.">
<link rel="canonical" href="${esc(canonical)}">
    ${hreflangs}
<link rel="alternate" type="application/rss+xml" title="All-Lifes IQ" href="${feedUrl(useLang)}">
<meta property="og:title" content="${esc(title)}"><meta property="og:url" content="${esc(canonical)}"><meta property="og:type" content="website"><meta property="og:image" content="${ogImg(useLang)}">
${socialMeta(useLang)}
${ADSENSE_HEAD}
${AD_ZONE_STYLE}
<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>
<style>
*{margin:0;padding:0;box-sizing:border-box;}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f1f5f9;color:#0f172a;line-height:1.6;}
.hero{background:linear-gradient(135deg,#1e1b4b,#312e81,#1d4ed8);color:#fff;padding:32px 20px 24px;text-align:center;}
.hero h1{font-size:clamp(20px,3.4vw,30px);font-weight:900;}
.crumb{max-width:820px;margin:0 auto;padding:10px 18px 0;font-size:12px;color:#64748b;}.crumb a{color:#4f46e5;text-decoration:none;}
.wrap{max-width:820px;margin:0 auto;padding:14px 18px 50px;}
.sec{font-size:16px;font-weight:800;color:#1e1b4b;margin:22px 0 10px;}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;}
.card{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:13px 15px;text-decoration:none;color:#0f172a;transition:all .15s;}
.card:hover{transform:translateY(-2px);border-color:#6366f1;box-shadow:0 6px 16px rgba(79,70,229,.18);}
.card .ct{font-size:14px;font-weight:800;color:#1e1b4b;}.card .cd{font-size:12px;color:#64748b;margin-top:3px;}
.cta{display:block;text-align:center;margin:24px auto 0;max-width:420px;background:linear-gradient(135deg,#4f46e5,#6366f1);color:#fff;font-weight:800;font-size:16px;padding:14px;border-radius:12px;text-decoration:none;}
</style>
</head>
<body>
<div class="hero"><h1>${esc(title)}</h1></div>
<div class="crumb"><a href="${pillar}">IQ Test</a> › ${esc(title)}</div>
<div class="wrap">
  ${AD_ZONE_BODY}
  ${sec('IQ '+(T.pages.scoreMeaning.h1||'scores'), scoreLinks)}
  ${sec('IQ '+C.percentile, pctLinks)}
  ${sec(H.h1||'Guides', spokeLinks)}
  ${sec(POP_I18N[useLang]||'Tools', toolLinks)}
  ${authorityFooter(useLang,{about:true})}
  <a class="cta" href="${useLang==='ko'?'https://all-lifes.com/iq-test/':'https://all-lifes.com/iq-test/?lang='+useLang}">${esc(H.cta||'🧠 Take the free IQ test →')}</a>
</div>
${adZoneScript(useLang)}
</body>
</html>`;
  return new Response(html, { headers:{ 'Content-Type':'text/html;charset=UTF-8', 'Cache-Control':'public, max-age=86400', 'X-Robots-Tag':'index, follow' }});
}

// ── RSS 피드 (블로그/Discover 신디케이션): /iq-test/feed/<lang>.xml ──
function renderFeed(lang){
  const useLang = HREFLANG_ALL.includes(lang) ? lang : 'en';
  const items = SPOKE_SLUGS.map(slug=>{
    const r = spokeRec(slug, useLang); if(!r) return '';
    return `<item><title>${esc(r.sp.h1)}</title><link>${spokeUrl(slug,useLang)}</link><guid>${spokeUrl(slug,useLang)}</guid><description>${esc(r.sp.desc||'')}</description><pubDate>Wed, 18 Jun 2026 00:00:00 GMT</pubDate></item>`;
  }).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>All-Lifes — IQ &amp; Intelligence</title>
<link>${useLang==='ko'?'https://all-lifes.com/iq-test/':'https://all-lifes.com/'+useLang+'/iq-test/'}</link>
<atom:link href="${feedUrl(useLang)}" rel="self" type="application/rss+xml"/>
<description>IQ test guides, calculators and intelligence explainers.</description>
<language>${useLang}</language>
<lastBuildDate>Wed, 18 Jun 2026 00:00:00 GMT</lastBuildDate>
${items}
</channel>
</rss>`;
  return new Response(xml, { headers:{ 'Content-Type':'application/rss+xml;charset=UTF-8', 'Cache-Control':'public, max-age=86400' }});
}

// ── Google Web Story (AMP, Discover/이미지 검색 유입): /iq-test/story/<lang> ──
const storyUrl = (lang) => `https://all-lifes.com/iq-test/story/${lang}`;
const storyPosterUrl = (lang) => `https://all-lifes.com/iq-test/story/${lang}/poster.svg`;
const STORY_GRADS = ['#1e1b4b,#4338ca','#312e81,#6d28d9','#1d4ed8,#4f46e5','#0f766e,#0ea5e9','#7c3aed,#db2777','#4f46e5,#1e1b4b','#4338ca,#0f766e'];
function storyGrad(i){ const g=STORY_GRADS[i%STORY_GRADS.length]; return `linear-gradient(160deg,${g})`; }

function storyPosterSVG(lang){
  const useLang = STORY_I18N[lang] ? lang : 'en';
  const S = STORY_I18N[useLang] || {};
  const title = esc(S.storyTitle || 'What your IQ score means');
  const tag = esc(S.posterTagline || '');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 960" width="720" height="960">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1e1b4b"/><stop offset="1" stop-color="#4f46e5"/></linearGradient></defs>
<rect width="720" height="960" fill="url(#g)"/>
<text x="360" y="300" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="190" font-weight="900" fill="#ffffff" opacity="0.13">IQ</text>
<text x="360" y="470" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="44" font-weight="900" fill="#ffffff"><tspan>${title.length>26?title.slice(0,26):title}</tspan></text>
<text x="360" y="540" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="26" fill="#c7d2fe">${tag.length>34?tag.slice(0,34):tag}</text>
<text x="360" y="900" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="22" font-weight="700" fill="#a5b4fc">all-lifes.com</text>
</svg>`;
}
function renderStoryPoster(lang){
  const useLang = STORY_I18N[lang] ? lang : 'en';
  return new Response(storyPosterSVG(useLang), { headers:{ 'Content-Type':'image/svg+xml', 'Cache-Control':'public, max-age=86400' }});
}
const AMP_BOILERPLATE = `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`;

function renderWebStory(lang){
  const useLang = STORY_I18N[lang] ? lang : 'en';
  const S = STORY_I18N[useLang];
  if(!S || !Array.isArray(S.slides) || !S.slides.length) return null;
  const H = HUB_I18N[useLang] || HUB_I18N.en;
  const canonical = storyUrl(useLang);
  const appUrl = useLang==='ko' ? 'https://all-lifes.com/iq-test/' : `https://all-lifes.com/iq-test/?lang=${useLang}`;
  const logo = 'https://all-lifes.com/iq-test/IQ%20TEST.png';

  const coverPage = `<amp-story-page id="cover"><amp-story-grid-layer template="fill"><div class="bg b0"></div></amp-story-grid-layer><amp-story-grid-layer template="vertical" class="ct"><div class="kic">IQ</div><h1>${esc(S.storyTitle)}</h1><p class="tag">${esc(S.posterTagline)}</p></amp-story-grid-layer></amp-story-page>`;
  const slidePages = S.slides.map((sl,i)=>`<amp-story-page id="s${i+1}"><amp-story-grid-layer template="fill"><div class="bg b${i+1}"></div></amp-story-grid-layer><amp-story-grid-layer template="vertical" class="ct"><div class="num">${i+1}</div><h2>${esc(sl.h)}</h2><p>${esc(sl.s)}</p></amp-story-grid-layer></amp-story-page>`).join('');
  const ctaPage = `<amp-story-page id="cta"><amp-story-grid-layer template="fill"><div class="bg b6"></div></amp-story-grid-layer><amp-story-grid-layer template="vertical" class="ct"><h2>${esc(S.storyTitle)}</h2><a class="btn" href="${appUrl}">${esc(S.cta)}</a></amp-story-grid-layer></amp-story-page>`;

  const article = {"@context":"https://schema.org","@type":"Article","headline":S.storyTitle,"description":S.posterTagline,"inLanguage":useLang,"datePublished":"2026-05-01","dateModified":LAST_UPDATED,"image":[storyPosterUrl(useLang)],"author":{"@type":"Organization","name":"All-Lifes","url":"https://all-lifes.com/"},"publisher":{"@type":"Organization","name":"All-Lifes","logo":{"@type":"ImageObject","url":logo}},"mainEntityOfPage":canonical};

  const html = `<!doctype html>
<html amp lang="${useLang}">
<head>
<meta charset="utf-8">
<script async src="https://cdn.ampproject.org/v0.js"></script>
<script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
<title>${esc(S.storyTitle)}</title>
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
<meta name="description" content="${esc(S.posterTagline)}">
<link rel="canonical" href="${esc(canonical)}">
${AMP_BOILERPLATE}
<style amp-custom>
amp-story{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#fff;}
.bg{width:100%;height:100%;}
.b0{background:linear-gradient(160deg,#1e1b4b,#4338ca);}
.b1{background:linear-gradient(160deg,#312e81,#6d28d9);}
.b2{background:linear-gradient(160deg,#1d4ed8,#4f46e5);}
.b3{background:linear-gradient(160deg,#0f766e,#0ea5e9);}
.b4{background:linear-gradient(160deg,#7c3aed,#db2777);}
.b5{background:linear-gradient(160deg,#4f46e5,#1e1b4b);}
.b6{background:linear-gradient(160deg,#4338ca,#0f766e);}
.ct{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:32px 26px;}
.kic{font-size:120px;font-weight:900;opacity:.16;line-height:1;margin-bottom:6px;}
.num{width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:20px;margin-bottom:20px;}
h1{font-size:30px;font-weight:900;line-height:1.2;margin:0 0 14px;}
h2{font-size:27px;font-weight:900;line-height:1.22;margin:0 0 14px;}
p{font-size:18px;line-height:1.45;color:#e0e7ff;margin:0;max-width:18em;}
.tag{font-size:17px;color:#c7d2fe;}
.btn{margin-top:26px;background:#fff;color:#3730a3;font-weight:900;font-size:18px;padding:15px 26px;border-radius:30px;text-decoration:none;}
</style>
<script type="application/ld+json">${JSON.stringify(article)}</script>
</head>
<body>
<amp-story standalone title="${esc(S.storyTitle)}" publisher="All-Lifes" publisher-logo-src="${logo}" poster-portrait-src="${storyPosterUrl(useLang)}">
${coverPage}
${slidePages}
${ctaPage}
</amp-story>
</body>
</html>`;
  return new Response(html, { headers:{ 'Content-Type':'text/html;charset=UTF-8', 'Cache-Control':'public, max-age=86400', 'X-Robots-Tag':'index, follow' }});
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let path = url.pathname;

    // /iq-test (슬래시 없음) → /iq-test/ 301 리다이렉트
    // (직접 서빙하면 상대 경로 자산이 /iq-test 밖으로 해석되어 전부 깨짐)
    if (path === '/iq-test') {
      url.pathname = '/iq-test/';
      return Response.redirect(url.toString(), 301);
    }

    // AI 챗 프록시는 원본 서버(PHP)로 통과
    if (path === '/iq-test/chat-proxy.php') {
      return fetch(request);
    }

    // 알리익스프레스 어필리에이트 상품 API (양쪽 도메인 모두 지원)
    if (path === '/iq-test/api/ali-products' || path === '/api/ali-products') {
      return handleAliProducts(request, env);
    }

    // 뉴스레터 구독 (KV 저장)
    if (path === '/iq-test/api/subscribe' && request.method === 'POST') {
      return handleSubscribe(request, env);
    }

    // 국가별 평균 IQ SEO 허브
    if (path === '/iq-test/average-iq-by-country' || path === '/iq-test/average-iq-by-country/') {
      return renderCountryHub(url);
    }

    // About · 방법론: /iq-test/about/<lang>
    const aboutM = path.match(/^\/iq-test\/about\/([a-z]{2})\/?$/);
    if (aboutM) {
      if (!HREFLANG_ALL.includes(aboutM[1])) return new Response('Not Found', { status: 404, headers: { 'Content-Type': 'text/plain' } });
      const r = renderAbout(aboutM[1]);
      if (r) return r;
      return new Response('Not Found', { status: 404, headers: { 'Content-Type': 'text/plain' } });
    }

    // 용어집 허브 + 개별 용어: /iq-test/glossary/<lang>[/<key>]
    const glossM = path.match(/^\/iq-test\/glossary\/([a-z]{2})(?:\/([a-z0-9-]+))?\/?$/);
    if (glossM) {
      if (!HREFLANG_ALL.includes(glossM[1])) return new Response('Not Found', { status: 404, headers: { 'Content-Type': 'text/plain' } });
      const r = glossM[2] ? renderGlossaryTerm(glossM[1], glossM[2]) : renderGlossary(glossM[1]);
      if (r) return r;
      return new Response('Not Found', { status: 404, headers: { 'Content-Type': 'text/plain' } });
    }

    // llms.txt (AI 크롤러 가이드)
    if (path === '/iq-test/llms.txt') {
      return renderLlms();
    }

    // 임베드 위젯: /iq-test/embed/<lang>
    const embedM = path.match(/^\/iq-test\/embed\/([a-z]{2})\/?$/);
    if (embedM) {
      if (!HREFLANG_ALL.includes(embedM[1])) return new Response('Not Found', { status: 404, headers: { 'Content-Type': 'text/plain' } });
      return renderEmbed(embedM[1]);
    }
    // 온사이트 검색: /iq-test/search/<lang>
    const searchM = path.match(/^\/iq-test\/search\/([a-z]{2})\/?$/);
    if (searchM) {
      if (!HREFLANG_ALL.includes(searchM[1])) return new Response('Not Found', { status: 404, headers: { 'Content-Type': 'text/plain' } });
      return renderSearch(searchM[1], url.searchParams.get('q'));
    }

    // 인기 허브: /iq-test/popular/<lang>
    const popM = path.match(/^\/iq-test\/popular\/([a-z]{2})\/?$/);
    if (popM) {
      if (!HREFLANG_ALL.includes(popM[1])) return new Response('Not Found', { status: 404, headers: { 'Content-Type': 'text/plain' } });
      return renderPopular(popM[1]);
    }
    // RSS 피드: /iq-test/feed/<lang>.xml
    const feedM = path.match(/^\/iq-test\/feed\/([a-z]{2})\.xml$/);
    if (feedM) {
      if (!HREFLANG_ALL.includes(feedM[1])) return new Response('Not Found', { status: 404, headers: { 'Content-Type': 'text/plain' } });
      return renderFeed(feedM[1]);
    }

    // Web Story (AMP) + 세로 포스터: /iq-test/story/<lang>[/poster.svg]
    const storyM = path.match(/^\/iq-test\/story\/([a-z]{2})(?:\/poster\.svg)?\/?$/);
    if (storyM) {
      if (!HREFLANG_ALL.includes(storyM[1])) return new Response('Not Found', { status: 404, headers: { 'Content-Type': 'text/plain' } });
      const r = path.endsWith('/poster.svg') ? renderStoryPoster(storyM[1]) : renderWebStory(storyM[1]);
      if (r) return r;
      return new Response('Not Found', { status: 404, headers: { 'Content-Type': 'text/plain' } });
    }

    // 백분위 → IQ: /iq-test/percentile/<lang>[/<p>]
    const pctM = path.match(/^\/iq-test\/percentile\/([a-z]{2})(?:\/([0-9]{1,3}))?\/?$/);
    if (pctM) {
      if (!HREFLANG_ALL.includes(pctM[1])) return new Response('Not Found', { status: 404, headers: { 'Content-Type': 'text/plain' } });
      const r = pctM[2] ? renderPercentilePage(pctM[1], pctM[2]) : renderPercentileHub(pctM[1]);
      if (r) return r;
      return new Response('Not Found', { status: 404, headers: { 'Content-Type': 'text/plain' } });
    }

    // 통계/분포 Dataset: /iq-test/iq-statistics/<lang>
    const statM = path.match(/^\/iq-test\/iq-statistics\/([a-z]{2})\/?$/);
    if (statM) {
      if (!HREFLANG_ALL.includes(statM[1])) return new Response('Not Found', { status: 404, headers: { 'Content-Type': 'text/plain' } });
      const r = renderDataPage(statM[1]);
      if (r) return r;
      return new Response('Not Found', { status: 404, headers: { 'Content-Type': 'text/plain' } });
    }

    // 점수별 프로그래매틱 페이지: /iq-test/score/<lang>/<n>  또는 인덱스 /iq-test/score/<lang>
    const scoreM = path.match(/^\/iq-test\/score\/([a-z]{2})(?:\/([0-9]{1,3}))?\/?$/);
    if (scoreM) {
      if (!HREFLANG_ALL.includes(scoreM[1])) return new Response('Not Found', { status: 404, headers: { 'Content-Type': 'text/plain' } });
      const r = scoreM[2] ? renderScorePage(scoreM[1], scoreM[2]) : renderScoreHub(scoreM[1]);
      if (r) return r;
      return new Response('Not Found', { status: 404, headers: { 'Content-Type': 'text/plain' } });
    }

    // 허브-스포크 설명 페이지: /iq-test/learn/<lang>/<slug>
    const spokeM = path.match(/^\/iq-test\/learn\/([a-z]{2})\/([a-z-]+)\/?$/);
    if (spokeM) {
      const r = HREFLANG_ALL.includes(spokeM[1]) ? renderSpoke(spokeM[2], spokeM[1]) : null;
      if (r) return r;
      return new Response('Not Found', { status: 404, headers: { 'Content-Type': 'text/plain' } });
    }

    // 계산기 & 가이드 허브: /iq-test/tools/<lang>
    const hubM = path.match(/^\/iq-test\/tools\/([a-z]{2})\/?$/);
    if (hubM) {
      if (!HREFLANG_ALL.includes(hubM[1])) return new Response('Not Found', { status: 404, headers: { 'Content-Type': 'text/plain' } });
      return renderToolsHub(hubM[1]);
    }

    // 인터랙티브 계산기 도구: /iq-test/tools/<lang>/<slug>
    const toolM = path.match(/^\/iq-test\/tools\/([a-z]{2})\/([a-z-]+)\/?$/);
    if (toolM) {
      const r = HREFLANG_ALL.includes(toolM[1]) ? renderTool(toolM[2], toolM[1], request.cf && request.cf.country) : null;
      if (r) return r;
      return new Response('Not Found', { status: 404, headers: { 'Content-Type': 'text/plain' } });
    }

    // 신규 4개 언어 SEO 래퍼 페이지: /{hi,ru,vi,tr}/iq-test[/]
    const wrapM = path.match(/^\/([a-z]{2})\/iq-test\/?$/);
    if (wrapM && WRAP_LANGS.includes(wrapM[1]) && SEO_LANGS[wrapM[1]]) {
      return renderSeoWrapper(wrapM[1], url);
    }

    // /iq-test/ → 루트(index.html 자동 서빙, /index.html 직접 요청 시 307 발생 방지)
    if (path === '/iq-test/') {
      path = '/';
    }
    // /iq-test/xxx → /xxx (경로 제거)
    else if (path.startsWith('/iq-test/')) {
      path = path.slice('/iq-test'.length);
    }

    const assetRequest = new Request(new URL(path + url.search, url.origin).toString(), request);
    const response = await env.ASSETS.fetch(assetRequest);

    // 404 처리: 페이지 내비게이션만 SPA fallback, 자산(.js/.png 등)은 진짜 404 반환
    // (HTML을 JS/이미지로 서빙하면 구문 오류·소프트404·SW 캐시 오염 발생)
    if (response.status === 404) {
      const isNavigation = !/\.[a-z0-9]{2,8}$/i.test(path);
      if (isNavigation) {
        return env.ASSETS.fetch(new Request(new URL('/', url.origin).toString(), request));
      }
      return new Response('Not Found', { status: 404, headers: { 'Content-Type': 'text/plain' } });
    }
    return response;
  }
};
