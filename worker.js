// Cloudflare Worker: path rewriter for iq-test-webapp
// /iq-test/* → serves static assets from repo root
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
