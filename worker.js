// Cloudflare Worker: path rewriter + AliExpress affiliate API proxy
// /iq-test/* → serves static assets from repo root
// /iq-test/api/ali-products?lang=xx → server-side AliExpress affiliate product feed

const ALI_APP_KEY = '536770';
const ALI_TRACKING_ID = 'iqtestweb';

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

async function handleAliProducts(request, env) {
  const url = new URL(request.url);
  const lang = (url.searchParams.get('lang') || 'en').toLowerCase();
  const loc = ALI_LOCALE[lang] || ALI_LOCALE.en;

  // 엣지 캐시 (언어별 12시간) — Test 앱 API 한도 보호
  const cacheKey = new Request('https://cache.iq-test/ali-products?lang=' + lang);
  const cache = caches.default;
  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  if (!env.ALI_APP_SECRET) {
    return new Response(JSON.stringify({ error: 'not_configured' }), { status: 503, headers: { 'Content-Type': 'application/json' } });
  }

  const params = {
    method: 'aliexpress.affiliate.product.query',
    app_key: ALI_APP_KEY,
    timestamp: String(Date.now()),
    sign_method: 'sha256',
    keywords: 'brain teaser puzzle',
    target_currency: loc.cur,
    target_language: loc.lang,
    tracking_id: ALI_TRACKING_ID,
    page_size: '8',
    ship_to_country: loc.ship,
    sort: 'LAST_VOLUME_DESC',
  };
  params.sign = await aliSign(params, env.ALI_APP_SECRET);

  let products = [];
  try {
    const apiRes = await fetch('https://api-sg.aliexpress.com/sync?' + new URLSearchParams(params).toString());
    const json = await apiRes.json();
    const list = json?.aliexpress_affiliate_product_query_response?.resp_result?.result?.products?.product || [];
    products = list.slice(0, 8).map(p => ({
      title: p.product_title || '',
      image: (p.product_main_image_url || '').replace(/^http:/, 'https:'),
      price: p.target_sale_price || '',
      currency: p.target_sale_price_currency || loc.cur,
      url: p.promotion_link || '',
      orders: p.lastest_volume || p.latest_volume || 0,
    })).filter(p => p.url && p.image);
  } catch (e) { /* 빈 배열 반환 → 클라이언트가 섹션 숨김 */ }

  const res = new Response(JSON.stringify({ lang, products }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600, s-maxage=43200',
      'Access-Control-Allow-Origin': '*',
    },
  });
  if (products.length) await cache.put(cacheKey, res.clone());
  return res;
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
