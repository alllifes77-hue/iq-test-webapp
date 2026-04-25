// ═══════════════════════════════════════════════════════════
// Cloudflare Worker: iq-multilang
// Route: all-lifes.com/*/iq-test*  (except /iq-test/ → WordPress)
// Deploy: Cloudflare Dashboard → Workers & Pages → Create Worker
// ═══════════════════════════════════════════════════════════

const LANGS = {
  en: {
    name:'English', locale:'en_US',
    title:'Free IQ Test – Scientifically Validated Online Intelligence Measurement',
    desc:'Take a free, science-based IQ test using Raven\'s Matrices and CHC Theory. Get instant results with a detailed 6-domain cognitive analysis.',
    h1:'Free IQ Test',h2:'Measure your intelligence scientifically',
    body:'Take our free online IQ test based on Raven\'s Progressive Matrices and CHC Theory. Instant results, 6-domain analysis, completely free.',
    start:'Start Free IQ Test'
  },
  de: {
    name:'Deutsch', locale:'de_DE',
    title:'Kostenloser IQ-Test – Wissenschaftlich validierte Intelligenzmessung Online',
    desc:'Kostenloser, wissenschaftlich fundierter IQ-Test mit Raven-Matrizen und CHC-Theorie. Sofortige Ergebnisse mit detaillierter 6-Bereich-Analyse.',
    h1:'Kostenloser IQ-Test',h2:'Messen Sie Ihre Intelligenz wissenschaftlich',
    body:'Unser kostenloser Online-IQ-Test basiert auf den Raven\'s Progressive Matrices und der CHC-Theorie. Sofortige Ergebnisse, 6-Bereich-Analyse, vollständig kostenlos.',
    start:'Kostenlosen IQ-Test starten'
  },
  ja: {
    name:'日本語', locale:'ja_JP',
    title:'無料IQテスト – 科学的に検証されたオンライン知能測定',
    desc:'レーヴン行列とCHC理論に基づく無料の科学的IQテスト。6領域の詳細認知分析付きで即時結果を提供。',
    h1:'無料IQテスト',h2:'科学的に知能を測定しましょう',
    body:'レーヴン漸進行列とCHC理論に基づく無料オンラインIQテスト。即時結果・6領域分析・完全無料。',
    start:'無料IQテストを開始'
  },
  fr: {
    name:'Français', locale:'fr_FR',
    title:'Test QI Gratuit – Mesure de l\'Intelligence en Ligne Validée Scientifiquement',
    desc:'Test QI gratuit et scientifique basé sur les Matrices de Raven et la Théorie CHC. Résultats immédiats avec analyse approfondie en 6 domaines.',
    h1:'Test QI Gratuit',h2:'Mesurez votre intelligence scientifiquement',
    body:'Notre test QI en ligne gratuit est basé sur les Matrices de Raven et la Théorie CHC. Résultats immédiats, analyse en 6 domaines, entièrement gratuit.',
    start:'Commencer le test QI gratuit'
  },
  es: {
    name:'Español', locale:'es_ES',
    title:'Test de CI Gratuito – Medición de Inteligencia Online Científicamente Validada',
    desc:'Test de CI gratuito y científico basado en las Matrices de Raven y la Teoría CHC. Resultados inmediatos con análisis detallado en 6 áreas.',
    h1:'Test de CI Gratuito',h2:'Mide tu inteligencia científicamente',
    body:'Nuestro test de CI en línea gratuito está basado en las Matrices de Raven y la Teoría CHC. Resultados inmediatos, análisis en 6 áreas, completamente gratuito.',
    start:'Iniciar test de CI gratuito'
  },
  pt: {
    name:'Português', locale:'pt_BR',
    title:'Teste de QI Gratuito – Medição de Inteligência Online Cientificamente Validada',
    desc:'Teste de QI gratuito e científico baseado nas Matrizes de Raven e na Teoria CHC. Resultados imediatos com análise detalhada em 6 domínios.',
    h1:'Teste de QI Gratuito',h2:'Meça sua inteligência cientificamente',
    body:'Nosso teste de QI online gratuito é baseado nas Matrizes de Raven e na Teoria CHC. Resultados imediatos, análise em 6 domínios, completamente gratuito.',
    start:'Iniciar teste de QI gratuito'
  },
  it: {
    name:'Italiano', locale:'it_IT',
    title:'Test del QI Gratuito – Misurazione dell\'Intelligenza Online Scientificamente Validata',
    desc:'Test del QI gratuito e scientifico basato sulle Matrici di Raven e sulla Teoria CHC. Risultati immediati con analisi dettagliata in 6 aree.',
    h1:'Test del QI Gratuito',h2:'Misura la tua intelligenza scientificamente',
    body:'Il nostro test del QI online gratuito è basato sulle Matrici di Raven e sulla Teoria CHC. Risultati immediati, analisi in 6 aree, completamente gratuito.',
    start:'Inizia il test del QI gratuito'
  },
  id: {
    name:'Indonesia', locale:'id_ID',
    title:'Tes IQ Gratis – Pengukuran Kecerdasan Online yang Tervalidasi Secara Ilmiah',
    desc:'Tes IQ gratis dan ilmiah berdasarkan Matriks Raven dan Teori CHC. Hasil instan dengan analisis mendalam 6 domain.',
    h1:'Tes IQ Gratis',h2:'Ukur kecerdasan Anda secara ilmiah',
    body:'Tes IQ online gratis kami didasarkan pada Matriks Progresif Raven dan Teori CHC. Hasil instan, analisis 6 domain, sepenuhnya gratis.',
    start:'Mulai tes IQ gratis'
  }
};

const ALL_LANGS = ['ko','en','de','ja','fr','es','pt','it','id'];
const APP_URL = 'https://iq-test.all-lifes.com';
const SITE_URL = 'https://all-lifes.com';

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Extract language code from path like /en/iq-test/ or /de/iq-test
    const match = path.match(/^\/([a-z]{2})\/iq-test/);
    if (!match) {
      // Not a multilang route — pass through to origin (WordPress)
      return fetch(request);
    }

    const lang = match[1];
    if (!LANGS[lang]) {
      // Unknown language — pass through
      return fetch(request);
    }

    const L = LANGS[lang];
    const canonical = `${SITE_URL}/${lang}/iq-test/`;
    const iframeSrc = `${APP_URL}/?lang=${lang}`;

    // Build hreflang tags for all languages
    const hreflangs = ALL_LANGS.map(l => {
      const href = l === 'ko' ? `${SITE_URL}/iq-test/` : `${SITE_URL}/${l}/iq-test/`;
      return `<link rel="alternate" hreflang="${l}" href="${href}">`;
    }).join('\n    ');

    // Schema.org JSON-LD
    const schema = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": L.h1,
      "description": L.desc,
      "url": canonical,
      "applicationCategory": "EducationalApplication",
      "inLanguage": lang,
      "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"},
      "operatingSystem": "Web"
    });

    const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${L.title}</title>
<meta name="description" content="${L.desc}">
<link rel="canonical" href="${canonical}">
${hreflangs}
<meta property="og:title" content="${L.title}">
<meta property="og:description" content="${L.desc}">
<meta property="og:url" content="${canonical}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${L.locale}">
<meta property="og:image" content="${APP_URL}/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${L.title}">
<meta name="twitter:description" content="${L.desc}">
<meta name="twitter:image" content="${APP_URL}/og-image.png">
<script type="application/ld+json">${schema}</script>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f1f5f9;color:#0f172a;}
.hero{background:linear-gradient(135deg,#1e1b4b,#312e81,#1d4ed8);color:#fff;padding:32px 20px 24px;text-align:center;}
.hero h1{font-size:clamp(22px,4vw,36px);font-weight:900;margin-bottom:8px;}
.hero p{font-size:14px;color:#c7d2fe;max-width:560px;margin:0 auto 16px;line-height:1.6;}
.iframe-wrap{width:100%;background:#f1f5f9;}
iframe{width:100%;border:none;display:block;min-height:100vh;}
.lang-bar{background:#1e1b4b;padding:8px 20px;text-align:center;font-size:12px;}
.lang-bar a{color:#a5b4fc;text-decoration:none;margin:0 6px;}
.lang-bar a:hover{color:#fff;}
.lang-bar a.active{color:#fff;font-weight:700;}
</style>
</head>
<body>
<div class="hero">
  <h1>${L.h1}</h1>
  <p>${L.body}</p>
</div>
<div class="lang-bar">
  ${ALL_LANGS.map(l=>{
    const href = l==='ko'?`${SITE_URL}/iq-test/`:`${SITE_URL}/${l}/iq-test/`;
    const name = l==='ko'?'한국어':(LANGS[l]?LANGS[l].name:l.toUpperCase());
    return `<a href="${href}"${l===lang?' class="active"':''}>${name}</a>`;
  }).join('')}
</div>
<div class="iframe-wrap">
  <iframe id="iq-frame" src="${iframeSrc}" scrolling="no" title="${L.h1}"></iframe>
</div>
<script>
window.addEventListener('message',function(e){
  if(e.data&&e.data.type==='iq-resize'){
    document.getElementById('iq-frame').style.height=e.data.height+'px';
  }
});
</script>
</body>
</html>`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'public, max-age=3600',
        'X-Robots-Tag': 'index, follow'
      }
    });
  }
};
