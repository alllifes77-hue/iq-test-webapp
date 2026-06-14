// Cloudflare Worker: path rewriter + AliExpress affiliate API proxy + SEO wrappers
// /iq-test/* → serves static assets from repo root
// /iq-test/api/ali-products?lang=xx → server-side AliExpress affiliate product feed
// /{hi,ru,vi,tr}/iq-test/ → server-rendered localized SEO landing (embeds the app)

import { SEO_LANGS } from './seo-langs.js';
import { COUNTRY_IQ } from './country-iq.js';
import { HUB_I18N } from './hub-i18n.js';

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
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":L.faq.map(f=>({"@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}}))};
  const featuresHtml = L.features.map(f=>`<span class="chip">${esc(f)}</span>`).join('');
  const faqHtml = L.faq.map(f=>`<div class="faq-item"><div class="faq-q">${esc(f.q)}</div><div class="faq-a">${esc(f.a)}</div></div>`).join('');
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
iframe{width:100%;border:none;display:block;min-height:100vh;}
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
<div class="seo-section"><div class="inner"><h2>${esc(L.faqH2)}</h2>${faqHtml}</div></div>
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

// 국가 → 통화 (가격을 방문자 현지 통화로; 미지정 국가는 USD)
const COUNTRY_CUR = { KR:'KRW', US:'USD', JP:'JPY', CN:'USD', DE:'EUR', FR:'EUR', ES:'EUR', IT:'EUR', PT:'EUR', NL:'EUR', AT:'EUR', BE:'EUR', IE:'EUR', BR:'BRL', RU:'USD', VN:'VND', GB:'GBP', CA:'CAD', AU:'AUD', IN:'USD', ID:'USD', TR:'USD', PH:'USD', TH:'USD', MX:'USD', SG:'USD', MY:'USD', SA:'USD', AE:'USD', PL:'PLN' };

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

  const rows = COUNTRY_IQ.slice().sort((a,b)=>b.iq-a.iq)
    .map((r,i)=>`<tr><td class="rk">${i+1}</td><td>${esc(r.c)}</td><td class="iq">${r.iq}</td></tr>`).join('');

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
<script type="application/ld+json">${JSON.stringify(itemList)}</script>
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
  <div class="caveat">${esc(L.caveat)}</div>
  <table><thead><tr><th>#</th><th>${esc(L.colCountry)}</th><th style="text-align:right">${esc(L.colIQ)}</th></tr></thead><tbody>${rows}</tbody></table>
  <div class="how"><h2>${esc(L.howTitle)}</h2><p>${esc(L.howBody)}</p></div>
  <div id="hub-ali"></div>
  <a class="cta" href="${esc(appUrl)}">${esc(L.cta)}</a>
  <a class="back" href="${esc(appUrl)}">${esc(L.backHome)}</a>
</div>
<script>
(function(){
  var lang=${JSON.stringify(lang)};
  var s=document.createElement('script');
  s.src='https://all-lifes.com/iq-test/affiliate-config.js';
  s.onload=function(){
    var meta=(window.AFFILIATE_META&&(window.AFFILIATE_META[lang]||window.AFFILIATE_META.en))||{};
    fetch('https://all-lifes.com/iq-test/api/ali-products?lang='+lang).then(function(r){return r.json();}).then(function(d){
      var items=(d.products||[]).slice(0,6);
      if(!items.length)return;
      var html='<h2>'+(meta.title||'🎁')+'</h2><div class="disc">'+(meta.disc||'')+'</div><div class="ali-grid">';
      html+=items.map(function(p){return '<a class="ali-card" href="'+p.url+'" target="_blank" rel="noopener sponsored"><img src="'+p.image+'" loading="lazy" alt=""><div class="ali-t">'+String(p.title).replace(/[<>]/g,'').slice(0,60)+'</div><div class="ali-p">'+p.price+' '+p.currency+'</div></a>';}).join('');
      html+='</div>';
      document.getElementById('hub-ali').innerHTML=html;
    }).catch(function(){});
  };
  document.body.appendChild(s);
})();
</script>
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
