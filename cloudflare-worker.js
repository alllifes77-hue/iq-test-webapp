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
    keywords:'free IQ test, online IQ test, intelligence test, Raven\'s matrices, CHC theory, cognitive assessment',
    h1:'Free IQ Test',h2:'Measure your intelligence scientifically',
    body:'Based on Raven\'s Progressive Matrices & CHC Theory · 100% Free · Instant Results · 6-Domain Analysis',
    start:'Start Free IQ Test',
    features:['📊 Raven\'s Progressive Matrices','🧬 CHC Theory','📈 Normal Distribution IQ','✅ 100% Free','🔒 No Data Stored'],
    faq:[
      {q:'What is an IQ test?',a:'An IQ test measures general intelligence (g-factor) through sequence reasoning, pattern recognition, and logical thinking. Results follow a normal distribution with mean 100 and SD 15.'},
      {q:'Is this test accurate?',a:"Based on Raven's Matrices and CHC theory with Cronbach's α of 0.85–0.92. High reference value for assessing cognitive ability."},
      {q:'How long does it take?',a:'Quick Test (15 questions): ~12 minutes. Precision Test (40 questions): ~28 minutes. Both are completely free.'}
    ],
    sciH2:'Scientific Basis',
    featH2:"What's Included",
    faqH2:'Frequently Asked Questions'
  },
  de: {
    name:'Deutsch', locale:'de_DE',
    title:'Kostenloser IQ-Test – Wissenschaftlich validierte Intelligenzmessung Online',
    desc:'Kostenloser, wissenschaftlich fundierter IQ-Test mit Raven-Matrizen und CHC-Theorie. Sofortige Ergebnisse mit detaillierter 6-Bereich-Analyse.',
    keywords:'kostenloser IQ-Test, Online-IQ-Test, Intelligenztest, Raven-Matrizen, CHC-Theorie, kognitive Bewertung',
    h1:'Kostenloser IQ-Test',h2:'Messen Sie Ihre Intelligenz wissenschaftlich',
    body:'Basierend auf Raven\'s Progressiven Matrizen & CHC-Theorie · 100% Kostenlos · Sofortige Ergebnisse · 6-Bereich-Analyse',
    start:'Kostenlosen IQ-Test starten',
    features:['📊 Raven Progressive Matrizen','🧬 CHC-Theorie','📈 Normalverteilung IQ','✅ 100% Kostenlos','🔒 Keine Datenspeicherung'],
    faq:[
      {q:'Was ist ein IQ-Test?',a:'Ein IQ-Test misst allgemeine Intelligenz (g-Faktor) durch Zahlenfolgen, Mustererkennung und logisches Schlussfolgern. Ergebnisse folgen einer Normalverteilung mit Mittelwert 100 und SD 15.'},
      {q:'Wie genau ist dieser Test?',a:"Basiert auf Raven-Matrizen und CHC-Theorie mit Cronbach's α von 0,85–0,92. Hoher Referenzwert zur Einschätzung kognitiver Fähigkeiten."},
      {q:'Wie lange dauert er?',a:'Schnelltest (15 Fragen): ~12 Minuten. Präzisionstest (40 Fragen): ~28 Minuten. Beide vollständig kostenlos.'}
    ],
    sciH2:'Wissenschaftliche Grundlage',
    featH2:'Enthaltene Tests',
    faqH2:'Häufig gestellte Fragen'
  },
  ja: {
    name:'日本語', locale:'ja_JP',
    title:'無料IQテスト – 科学的に検証されたオンライン知能測定',
    desc:'レーヴン行列とCHC理論に基づく無料の科学的IQテスト。6領域の詳細認知分析付きで即時結果を提供。',
    keywords:'無料IQテスト, オンラインIQテスト, 知能テスト, レーヴン行列, CHC理論, 認知評価',
    h1:'無料IQテスト',h2:'科学的に知能を測定しましょう',
    body:'レーヴン漸進行列 & CHC理論 · 完全無料 · 即時結果 · 6領域分析',
    start:'無料IQテストを開始',
    features:['📊 レーヴン行列','🧬 CHC理論','📈 正規分布IQ','✅ 完全無料','🔒 データ非保存'],
    faq:[
      {q:'IQテストとは？',a:'IQテストは数列推論・パターン認識・論理的思考を通じて一般的知能（g因子）を測定します。結果は平均100・SD15の正規分布で表されます。'},
      {q:'このテストの精度は？',a:"レーヴン行列とCHC理論に基づき、Cronbach's αは0.85〜0.92水準。認知能力評価に高い参考価値を提供します。"},
      {q:'所要時間は？',a:'クイックテスト（15問）：約12分。精密テスト（40問）：約28分。両方とも完全無料。'}
    ],
    sciH2:'科学的根拠',
    featH2:'含まれるテスト',
    faqH2:'よくある質問'
  },
  fr: {
    name:'Français', locale:'fr_FR',
    title:'Test QI Gratuit – Mesure de l\'Intelligence en Ligne Validée Scientifiquement',
    desc:'Test QI gratuit et scientifique basé sur les Matrices de Raven et la Théorie CHC. Résultats immédiats avec analyse approfondie en 6 domaines.',
    keywords:'test QI gratuit, test intelligence en ligne, matrices de Raven, théorie CHC, évaluation cognitive',
    h1:'Test QI Gratuit',h2:'Mesurez votre intelligence scientifiquement',
    body:'Basé sur les Matrices de Raven & la Théorie CHC · 100% Gratuit · Résultats Immédiats · Analyse en 6 Domaines',
    start:'Commencer le test QI gratuit',
    features:['📊 Matrices de Raven','🧬 Théorie CHC','📈 Distribution Normale','✅ 100% Gratuit','🔒 Aucune donnée sauvegardée'],
    faq:[
      {q:"Qu'est-ce qu'un test de QI ?",a:"Un test de QI mesure l'intelligence générale (facteur g) via le raisonnement séquentiel, la reconnaissance de motifs et la logique. Les résultats suivent une distribution normale avec moyenne 100 et ET 15."},
      {q:'Ce test est-il précis ?',a:"Basé sur les Matrices de Raven et la théorie CHC avec un alpha de Cronbach de 0,85–0,92. Grande valeur de référence pour évaluer les capacités cognitives."},
      {q:'Combien de temps faut-il ?',a:'Test rapide (15 questions) : ~12 min. Test précision (40 questions) : ~28 min. Les deux sont entièrement gratuits.'}
    ],
    sciH2:'Base Scientifique',
    featH2:'Ce qui est inclus',
    faqH2:'Foire Aux Questions'
  },
  es: {
    name:'Español', locale:'es_ES',
    title:'Test de CI Gratuito – Medición de Inteligencia Online Científicamente Validada',
    desc:'Test de CI gratuito y científico basado en las Matrices de Raven y la Teoría CHC. Resultados inmediatos con análisis detallado en 6 áreas.',
    keywords:'test CI gratuito, test inteligencia online, matrices de Raven, teoría CHC, evaluación cognitiva, test coeficiente intelectual',
    h1:'Test de CI Gratuito',h2:'Mide tu inteligencia científicamente',
    body:'Basado en las Matrices de Raven & la Teoría CHC · 100% Gratuito · Resultados Inmediatos · Análisis en 6 Áreas',
    start:'Iniciar test de CI gratuito',
    features:['📊 Matrices de Raven','🧬 Teoría CHC','📈 Distribución Normal','✅ 100% Gratuito','🔒 Sin almacenamiento de datos'],
    faq:[
      {q:'¿Qué es un test de CI?',a:'Un test de CI mide la inteligencia general (factor g) mediante razonamiento secuencial, reconocimiento de patrones y lógica. Los resultados siguen una distribución normal con media 100 y DT 15.'},
      {q:'¿Es preciso este test?',a:"Basado en las Matrices de Raven y la teoría CHC con alpha de Cronbach de 0,85–0,92. Alto valor de referencia para evaluar la capacidad cognitiva."},
      {q:'¿Cuánto tiempo tarda?',a:'Test rápido (15 preguntas): ~12 min. Test de precisión (40 preguntas): ~28 min. Ambos completamente gratuitos.'}
    ],
    sciH2:'Base Científica',
    featH2:'Qué incluye',
    faqH2:'Preguntas Frecuentes'
  },
  pt: {
    name:'Português', locale:'pt_BR',
    title:'Teste de QI Gratuito – Medição de Inteligência Online Cientificamente Validada',
    desc:'Teste de QI gratuito e científico baseado nas Matrizes de Raven e na Teoria CHC. Resultados imediatos com análise detalhada em 6 domínios.',
    keywords:'teste QI gratuito, teste inteligência online, matrizes de Raven, teoria CHC, avaliação cognitiva, quociente inteligência',
    h1:'Teste de QI Gratuito',h2:'Meça sua inteligência cientificamente',
    body:'Baseado nas Matrizes de Raven & Teoria CHC · 100% Gratuito · Resultados Imediatos · Análise em 6 Domínios',
    start:'Iniciar teste de QI gratuito',
    features:['📊 Matrizes de Raven','🧬 Teoria CHC','📈 Distribuição Normal','✅ 100% Gratuito','🔒 Sem armazenamento de dados'],
    faq:[
      {q:'O que é um teste de QI?',a:'Um teste de QI mede a inteligência geral (fator g) por meio de raciocínio sequencial, reconhecimento de padrões e lógica. Os resultados seguem uma distribuição normal com média 100 e DP 15.'},
      {q:'Este teste é preciso?',a:"Baseado nas Matrizes de Raven e na teoria CHC com alfa de Cronbach de 0,85–0,92. Alto valor de referência para avaliar a capacidade cognitiva."},
      {q:'Quanto tempo leva?',a:'Teste Rápido (15 questões): ~12 min. Teste de Precisão (40 questões): ~28 min. Ambos completamente gratuitos.'}
    ],
    sciH2:'Base Científica',
    featH2:'O que está incluído',
    faqH2:'Perguntas Frequentes'
  },
  it: {
    name:'Italiano', locale:'it_IT',
    title:'Test del QI Gratuito – Misurazione dell\'Intelligenza Online Scientificamente Validata',
    desc:'Test del QI gratuito e scientifico basato sulle Matrici di Raven e sulla Teoria CHC. Risultati immediati con analisi dettagliata in 6 aree.',
    keywords:'test QI gratuito, test intelligenza online, matrici di Raven, teoria CHC, valutazione cognitiva, quoziente intellettivo',
    h1:'Test del QI Gratuito',h2:'Misura la tua intelligenza scientificamente',
    body:'Basato sulle Matrici di Raven & Teoria CHC · 100% Gratuito · Risultati Immediati · Analisi in 6 Aree',
    start:'Inizia il test del QI gratuito',
    features:['📊 Matrici di Raven','🧬 Teoria CHC','📈 Distribuzione Normale','✅ 100% Gratuito','🔒 Nessun dato salvato'],
    faq:[
      {q:"Cos'è un test del QI?",a:"Un test del QI misura l'intelligenza generale (fattore g) tramite ragionamento sequenziale, riconoscimento di schemi e logica. I risultati seguono una distribuzione normale con media 100 e DS 15."},
      {q:'Questo test è accurato?',a:"Basato sulle Matrici di Raven e sulla teoria CHC con Cronbach's α di 0,85–0,92. Alto valore di riferimento per valutare le capacità cognitive."},
      {q:'Quanto tempo ci vuole?',a:'Test rapido (15 domande): ~12 min. Test di precisione (40 domande): ~28 min. Entrambi completamente gratuiti.'}
    ],
    sciH2:'Base Scientifica',
    featH2:'Cosa è incluso',
    faqH2:'Domande Frequenti'
  },
  id: {
    name:'Indonesia', locale:'id_ID',
    title:'Tes IQ Gratis – Pengukuran Kecerdasan Online yang Tervalidasi Secara Ilmiah',
    desc:'Tes IQ gratis dan ilmiah berdasarkan Matriks Raven dan Teori CHC. Hasil instan dengan analisis mendalam 6 domain.',
    keywords:'tes IQ gratis, tes kecerdasan online, matriks Raven, teori CHC, penilaian kognitif, kecerdasan intelektual',
    h1:'Tes IQ Gratis',h2:'Ukur kecerdasan Anda secara ilmiah',
    body:'Berdasarkan Matriks Progresif Raven & Teori CHC · 100% Gratis · Hasil Langsung · Analisis 6 Domain',
    start:'Mulai tes IQ gratis',
    features:['📊 Matriks Raven','🧬 Teori CHC','📈 Distribusi Normal IQ','✅ 100% Gratis','🔒 Data Tidak Disimpan'],
    faq:[
      {q:'Apa itu tes IQ?',a:'Tes IQ mengukur kecerdasan umum (faktor g) melalui penalaran deret, pengenalan pola, dan logika. Hasil mengikuti distribusi normal dengan rata-rata 100 dan SD 15.'},
      {q:'Seberapa akurat tes ini?',a:"Berdasarkan Matriks Raven dan teori CHC dengan Cronbach's α sebesar 0,85–0,92. Nilai referensi tinggi untuk menilai kemampuan kognitif."},
      {q:'Berapa lama waktu yang dibutuhkan?',a:'Tes Cepat (15 soal): ~12 menit. Tes Presisi (40 soal): ~28 menit. Keduanya sepenuhnya gratis.'}
    ],
    sciH2:'Dasar Ilmiah',
    featH2:'Yang Termasuk',
    faqH2:'Pertanyaan Umum'
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
      return fetch(request);
    }

    const lang = match[1];
    if (!LANGS[lang]) {
      return fetch(request);
    }

    const L = LANGS[lang];
    const canonical = `${SITE_URL}/${lang}/iq-test/`;
    const iframeSrc = `${APP_URL}/?lang=${lang}`;

    const hreflangs = ALL_LANGS.map(l => {
      const href = l === 'ko' ? `${SITE_URL}/iq-test/` : `${SITE_URL}/${l}/iq-test/`;
      return `<link rel="alternate" hreflang="${l}" href="${href}">`;
    }).join('\n    ');

    // WebApplication schema
    const appSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": L.h1,
      "description": L.desc,
      "url": canonical,
      "applicationCategory": "EducationalApplication",
      "inLanguage": lang,
      "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"},
      "operatingSystem": "Web"
    };

    // FAQPage schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": L.faq.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {"@type": "Answer", "text": f.a}
      }))
    };

    const featuresHtml = L.features.map(f => `<span class="chip">${f}</span>`).join('');
    const faqHtml = L.faq.map(f =>
      `<div class="faq-item"><div class="faq-q">${f.q}</div><div class="faq-a">${f.a}</div></div>`
    ).join('');

    const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${L.title}</title>
<meta name="description" content="${L.desc}">
<meta name="keywords" content="${L.keywords}">
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
<script type="application/ld+json">${JSON.stringify(appSchema)}</script>
<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f1f5f9;color:#0f172a;}
.hero{background:linear-gradient(135deg,#1e1b4b,#312e81,#1d4ed8);color:#fff;padding:32px 20px 24px;text-align:center;}
.hero h1{font-size:clamp(22px,4vw,36px);font-weight:900;margin-bottom:8px;}
.hero p{font-size:14px;color:#c7d2fe;max-width:560px;margin:0 auto 16px;line-height:1.6;}
.chips{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-bottom:20px;}
.chip{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:20px;padding:5px 14px;font-size:12px;color:#e0e7ff;}
.start-btn{display:inline-block;background:#fff;color:#1e1b4b;font-weight:800;font-size:15px;padding:14px 32px;border-radius:50px;text-decoration:none;box-shadow:0 4px 20px rgba(0,0,0,0.25);transition:transform .15s;}
.start-btn:hover{transform:translateY(-2px);}
.iframe-wrap{width:100%;background:#f1f5f9;}
iframe{width:100%;border:none;display:block;min-height:100vh;}
.lang-bar{background:#1e1b4b;padding:8px 20px;text-align:center;font-size:12px;}
.lang-bar a{color:#a5b4fc;text-decoration:none;margin:0 6px;}
.lang-bar a:hover{color:#fff;}
.lang-bar a.active{color:#fff;font-weight:700;}
.seo-section{background:#fff;border-top:1px solid #e2e8f0;padding:40px 20px;}
.seo-section .inner{max-width:800px;margin:0 auto;}
.seo-section h2{font-size:18px;font-weight:800;color:#1e1b4b;margin-bottom:24px;}
.faq-item{border-bottom:1px solid #e2e8f0;padding:16px 0;}
.faq-item:last-child{border-bottom:none;}
.faq-q{font-size:14px;font-weight:700;color:#0f172a;margin-bottom:6px;}
.faq-a{font-size:13px;color:#475569;line-height:1.7;}
</style>
</head>
<body>
<div class="hero">
  <h1>${L.h1}</h1>
  <p>${L.body}</p>
  <div class="chips">${featuresHtml}</div>
  <a class="start-btn" href="${iframeSrc}">${L.start}</a>
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
<div class="seo-section">
  <div class="inner">
    <h2>${L.faqH2}</h2>
    ${faqHtml}
  </div>
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
