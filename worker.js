// Cloudflare Worker: path rewriter for iq-test-webapp
// /iq-test/* → serves static assets from repo root
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let path = url.pathname;

    // /iq-test/ 또는 /iq-test → 루트(index.html 자동 서빙, /index.html 직접 요청 시 307 발생 방지)
    if (path === '/iq-test' || path === '/iq-test/') {
      path = '/';
    }
    // /iq-test/xxx → /xxx (경로 제거)
    else if (path.startsWith('/iq-test/')) {
      path = path.slice('/iq-test'.length);
    }

    const assetRequest = new Request(new URL(path + url.search, url.origin).toString(), request);
    const response = await env.ASSETS.fetch(assetRequest);

    // 404면 루트로 fallback (SPA)
    if (response.status === 404) {
      return env.ASSETS.fetch(new Request(new URL('/', url.origin).toString(), request));
    }
    return response;
  }
};
