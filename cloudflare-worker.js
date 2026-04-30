// ═══════════════════════════════════════════════════════════
// Cloudflare Worker: iq-multilang
// Routes:
//   all-lifes.com/og-image        → dynamic SVG OG image
//   all-lifes.com/*/iq-test*      → SEO wrapper (except /iq-test/ → WordPress)
// ═══════════════════════════════════════════════════════════

// ── IQ category color ────────────────────────────────────────
function getIQColor(iq) {
  if (iq >= 145) return '#7c3aed';
  if (iq >= 130) return '#4f46e5';
  if (iq >= 120) return '#0284c7';
  if (iq >= 110) return '#0891b2';
  if (iq >= 90)  return '#059669';
  if (iq >= 80)  return '#d97706';
  if (iq >= 70)  return '#dc2626';
  return '#991b1b';
}

// ── Dynamic SVG OG Image ─────────────────────────────────────
function generateOGImage(iq, top, cat, lang) {
  iq  = Math.max(55, Math.min(155, parseInt(iq)  || 100));
  top = Math.max(0.1, Math.min(99.9, parseFloat(top) || 50));
  cat = cat || '';

  const color = getIQColor(iq);

  // Bell curve geometry
  const CX0 = 120, CX1 = 760;          // x range for curve
  const CY_TOP = 340, CY_BASE = 580;   // y range (top = peak, base = baseline)
  const IQ_MIN = 55, IQ_MAX = 145;

  function iqToX(v) {
    return CX0 + (Math.min(Math.max(v, IQ_MIN), IQ_MAX) - IQ_MIN) / (IQ_MAX - IQ_MIN) * (CX1 - CX0);
  }
  function iqToY(v) {
    const g = Math.exp(-Math.pow(v - 100, 2) / (2 * 225));
    return CY_BASE - (CY_BASE - CY_TOP) * g;
  }

  // Generate polyline points for bell curve (step 1 IQ unit)
  const pts = [];
  for (let x = IQ_MIN; x <= IQ_MAX; x++) {
    pts.push(`${iqToX(x).toFixed(1)},${iqToY(x).toFixed(1)}`);
  }
  const linePath = `M ${pts.join(' L ')}`;

  // Filled area under curve
  const fillPath = `M ${CX0},${CY_BASE} L ${pts.join(' L ')} L ${CX1},${CY_BASE} Z`;

  // Shaded "right of marker" area (top % region)
  const markerX = iqToX(iq);
  const markerY = iqToY(iq);

  // Right-tail fill (from marker to end of curve)
  const rightPts = [];
  for (let x = Math.max(IQ_MIN, iq); x <= IQ_MAX; x++) {
    rightPts.push(`${iqToX(x).toFixed(1)},${iqToY(x).toFixed(1)}`);
  }
  const tailFill = rightPts.length > 1
    ? `M ${markerX.toFixed(1)},${CY_BASE} L ${rightPts.join(' L ')} L ${CX1},${CY_BASE} Z`
    : '';

  // Top % label (format)
  const topStr = top < 1 ? top.toFixed(1) : (top < 10 ? top.toFixed(1) : Math.round(top).toString());

  // Per-language labels on the image
  const IMG_LABELS = {
    en: { header:'IQ TEST RESULT', topLabel:'of all people',   cta:'Can you beat this?', site:'all-lifes.com' },
    de: { header:'IQ-TEST ERGEBNIS', topLabel:'aller Menschen', cta:'Kannst du das toppen?', site:'all-lifes.com' },
    ja: { header:'IQテスト結果',   topLabel:'全人口中',          cta:'あなたも挑戦しよう',  site:'all-lifes.com' },
    fr: { header:'RÉSULTAT TEST QI', topLabel:'de la population', cta:'Peux-tu faire mieux ?', site:'all-lifes.com' },
    es: { header:'RESULTADO TEST CI', topLabel:'de la población', cta:'¿Puedes superarlo?',    site:'all-lifes.com' },
    pt: { header:'RESULTADO TESTE QI', topLabel:'da população',  cta:'Você consegue superar?', site:'all-lifes.com' },
    it: { header:'RISULTATO TEST QI', topLabel:'della popolazione', cta:'Riesci a batterlo?',  site:'all-lifes.com' },
    id: { header:'HASIL TES IQ',   topLabel:'dari semua orang', cta:'Bisakah kamu mengalahkannya?', site:'all-lifes.com' },
    ko: { header:'IQ 테스트 결과', topLabel:'전체 인구 중',       cta:'당신도 도전해보세요', site:'all-lifes.com' },
  };
  const L = IMG_LABELS[lang] || IMG_LABELS.en;

  // IQ score font size (shrink slightly for 3-digit+ numbers)
  const iqFontSize = iq >= 100 ? 190 : 200;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
    <stop offset="0%"   stop-color="#0f0c29"/>
    <stop offset="55%"  stop-color="#1e1b4b"/>
    <stop offset="100%" stop-color="#0c0a22"/>
  </linearGradient>
  <linearGradient id="fillG" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
    <stop offset="0%"   stop-color="${color}" stop-opacity="0.28"/>
    <stop offset="100%" stop-color="${color}" stop-opacity="0.04"/>
  </linearGradient>
  <linearGradient id="tailG" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
    <stop offset="0%"   stop-color="${color}" stop-opacity="0.55"/>
    <stop offset="100%" stop-color="${color}" stop-opacity="0.10"/>
  </linearGradient>
  <filter id="glow">
    <feGaussianBlur stdDeviation="5" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="dotglow">
    <feGaussianBlur stdDeviation="8" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs>

<!-- Background -->
<rect width="1200" height="630" fill="url(#bg)"/>

<!-- Decorative circles -->
<circle cx="950" cy="120" r="220" fill="${color}" fill-opacity="0.06"/>
<circle cx="100" cy="500" r="150" fill="${color}" fill-opacity="0.05"/>

<!-- Left accent bar -->
<rect x="0" y="0" width="7" height="630" fill="${color}"/>

<!-- Top header -->
<text x="56" y="52" font-family="Arial,Helvetica,sans-serif"
  font-size="17" font-weight="700" letter-spacing="4" fill="#a5b4fc" opacity="0.85">🧠 ${L.header}</text>

<!-- Site URL top-right -->
<text x="1148" y="52" font-family="Arial,Helvetica,sans-serif"
  font-size="17" fill="#6366f1" text-anchor="end" opacity="0.8">${L.site}</text>

<!-- Vertical divider (left panel / right panel) -->
<line x1="820" y1="70" x2="820" y2="440" stroke="#4f46e5" stroke-width="1" opacity="0.3"/>

<!-- ═══ LEFT PANEL: score ═══ -->

<!-- IQ number -->
<text x="390" y="280" font-family="Arial Black,Arial,sans-serif"
  font-size="${iqFontSize}" font-weight="900" fill="white" text-anchor="middle"
  filter="url(#glow)">${iq}</text>

<!-- Category pill -->
<rect x="245" y="298" width="290" height="52" rx="26" fill="${color}" opacity="0.85"/>
<text x="390" y="331" font-family="Arial,Helvetica,sans-serif"
  font-size="24" font-weight="700" fill="white" text-anchor="middle">${cat}</text>

<!-- Top % -->
<text x="390" y="398" font-family="Arial,Helvetica,sans-serif"
  font-size="22" fill="#c7d2fe" text-anchor="middle">
  ▲ Top <tspan fill="${color}" font-weight="900" font-size="30">${topStr}%</tspan>  ${L.topLabel}
</text>

<!-- Separator line -->
<line x1="56" y1="425" x2="780" y2="425" stroke="#4f46e5" stroke-width="1" opacity="0.35"/>

<!-- ═══ BELL CURVE ═══ -->

<!-- Area fill under curve -->
<path d="${fillPath}" fill="url(#fillG)"/>

<!-- Tail fill (right of marker = high-scoring zone) -->
${tailFill ? `<path d="${tailFill}" fill="url(#tailG)"/>` : ''}

<!-- Curve line -->
<path d="${linePath}" fill="none" stroke="${color}" stroke-width="2.5" opacity="0.85"/>

<!-- X-axis baseline -->
<line x1="${CX0}" y1="${CY_BASE}" x2="${CX1}" y2="${CY_BASE}" stroke="#4f46e5" stroke-width="1.5" opacity="0.5"/>

<!-- X-axis labels -->
<text x="${iqToX(70).toFixed(0)}"  y="600" font-family="Arial,sans-serif" font-size="13" fill="#818cf8" text-anchor="middle" opacity="0.7">70</text>
<text x="${iqToX(85).toFixed(0)}"  y="600" font-family="Arial,sans-serif" font-size="13" fill="#818cf8" text-anchor="middle" opacity="0.7">85</text>
<text x="${iqToX(100).toFixed(0)}" y="600" font-family="Arial,sans-serif" font-size="13" fill="#a5b4fc" text-anchor="middle" font-weight="700">100</text>
<text x="${iqToX(115).toFixed(0)}" y="600" font-family="Arial,sans-serif" font-size="13" fill="#818cf8" text-anchor="middle" opacity="0.7">115</text>
<text x="${iqToX(130).toFixed(0)}" y="600" font-family="Arial,sans-serif" font-size="13" fill="#818cf8" text-anchor="middle" opacity="0.7">130</text>

<!-- Marker vertical line -->
<line x1="${markerX.toFixed(1)}" y1="${markerY.toFixed(1)}"
  x2="${markerX.toFixed(1)}" y2="${CY_BASE}"
  stroke="${color}" stroke-width="2" stroke-dasharray="5,3" opacity="0.9"/>

<!-- Marker dot -->
<circle cx="${markerX.toFixed(1)}" cy="${markerY.toFixed(1)}" r="12" fill="${color}" filter="url(#dotglow)"/>
<circle cx="${markerX.toFixed(1)}" cy="${markerY.toFixed(1)}" r="6"  fill="white"/>

<!-- ═══ RIGHT PANEL: branding ═══ -->

<text x="1010" y="155" font-family="Arial,Helvetica,sans-serif"
  font-size="18" font-weight="700" fill="white" text-anchor="middle">Free IQ Test</text>

<text x="1010" y="190" font-family="Arial,Helvetica,sans-serif"
  font-size="14" fill="#a5b4fc" text-anchor="middle" opacity="0.9">Raven's Matrices · CHC Theory</text>

<text x="1010" y="215" font-family="Arial,Helvetica,sans-serif"
  font-size="14" fill="#a5b4fc" text-anchor="middle" opacity="0.9">Normal Distribution · 6 Domains</text>

<!-- Three trust badges -->
<rect x="870" y="240" width="280" height="34" rx="17" fill="#1e1b4b" stroke="${color}" stroke-width="1.5" opacity="0.9"/>
<text x="1010" y="262" font-family="Arial,Helvetica,sans-serif"
  font-size="14" fill="#c7d2fe" text-anchor="middle">✅ 100% Free  ·  🔒 No Login</text>

<!-- CTA button -->
<rect x="860" y="295" width="300" height="46" rx="23" fill="${color}" opacity="0.9"/>
<text x="1010" y="324" font-family="Arial,Helvetica,sans-serif"
  font-size="15" font-weight="700" fill="white" text-anchor="middle">${L.cta}</text>

<!-- Bottom bar -->
<rect x="0" y="618" width="1200" height="12" fill="${color}" opacity="0.25"/>
</svg>`;
}

// ── Language data ─────────────────────────────────────────────
const LANGS = {
  en: {
    name:'English', locale:'en_US',
    title:'Free IQ Test – Scientifically Validated Online Intelligence Measurement',
    desc:'Take a free, science-based IQ test using Raven\'s Matrices and CHC Theory. Get instant results with a detailed 6-domain cognitive analysis.',
    keywords:'free IQ test, online IQ test, intelligence test, Raven\'s matrices, CHC theory, cognitive assessment',
    h1:'Free IQ Test', h2:'Measure your intelligence scientifically',
    body:'Based on Raven\'s Progressive Matrices & CHC Theory · 100% Free · Instant Results · 6-Domain Analysis',
    start:'Start Free IQ Test',
    features:['📊 Raven\'s Progressive Matrices','🧬 CHC Theory','📈 Normal Distribution IQ','✅ 100% Free','🔒 No Data Stored'],
    faq:[
      {q:'What is an IQ test?', a:'An IQ test measures general intelligence (g-factor) through sequence reasoning, pattern recognition, and logical thinking. Results follow a normal distribution with mean 100 and SD 15.'},
      {q:'Is this test accurate?', a:"Based on Raven's Matrices and CHC theory with Cronbach's α of 0.85–0.92. High reference value for assessing cognitive ability."},
      {q:'How long does it take?', a:'Quick Test (15 questions): ~12 minutes. Precision Test (40 questions): ~28 minutes. Both are completely free.'}
    ],
    ogResultTitle:'IQ Result: {iq} ({cat}) | Top {top}% 🧠',
    ogResultDesc:'I just tested my intelligence using Raven\'s Progressive Matrices. Where do you rank? Take the free test →',
    faqH2:'Frequently Asked Questions'
  },
  de: {
    name:'Deutsch', locale:'de_DE',
    title:'Kostenloser IQ-Test – Wissenschaftlich validierte Intelligenzmessung Online',
    desc:'Kostenloser, wissenschaftlich fundierter IQ-Test mit Raven-Matrizen und CHC-Theorie. Sofortige Ergebnisse mit detaillierter 6-Bereich-Analyse.',
    keywords:'kostenloser IQ-Test, Online-IQ-Test, Intelligenztest, Raven-Matrizen, CHC-Theorie, kognitive Bewertung',
    h1:'Kostenloser IQ-Test', h2:'Messen Sie Ihre Intelligenz wissenschaftlich',
    body:'Basierend auf Raven\'s Progressiven Matrizen & CHC-Theorie · 100% Kostenlos · Sofortige Ergebnisse · 6-Bereich-Analyse',
    start:'Kostenlosen IQ-Test starten',
    features:['📊 Raven Progressive Matrizen','🧬 CHC-Theorie','📈 Normalverteilung IQ','✅ 100% Kostenlos','🔒 Keine Datenspeicherung'],
    faq:[
      {q:'Was ist ein IQ-Test?', a:'Ein IQ-Test misst allgemeine Intelligenz (g-Faktor) durch Zahlenfolgen, Mustererkennung und logisches Schlussfolgern. Ergebnisse folgen einer Normalverteilung mit Mittelwert 100 und SD 15.'},
      {q:'Wie genau ist dieser Test?', a:"Basiert auf Raven-Matrizen und CHC-Theorie mit Cronbach's α von 0,85–0,92. Hoher Referenzwert zur Einschätzung kognitiver Fähigkeiten."},
      {q:'Wie lange dauert er?', a:'Schnelltest (15 Fragen): ~12 Minuten. Präzisionstest (40 Fragen): ~28 Minuten. Beide vollständig kostenlos.'}
    ],
    ogResultTitle:'IQ Ergebnis: {iq} ({cat}) | Top {top}% 🧠',
    ogResultDesc:'Ich habe gerade meinen IQ mit Raven-Matrizen getestet. Wo stehst du? Mach den kostenlosen Test →',
    faqH2:'Häufig gestellte Fragen'
  },
  ja: {
    name:'日本語', locale:'ja_JP',
    title:'無料IQテスト – 科学的に検証されたオンライン知能測定',
    desc:'レーヴン行列とCHC理論に基づく無料の科学的IQテスト。6領域の詳細認知分析付きで即時結果を提供。',
    keywords:'無料IQテスト, オンラインIQテスト, 知能テスト, レーヴン行列, CHC理論, 認知評価',
    h1:'無料IQテスト', h2:'科学的に知能を測定しましょう',
    body:'レーヴン漸進行列 & CHC理論 · 完全無料 · 即時結果 · 6領域分析',
    start:'無料IQテストを開始',
    features:['📊 レーヴン行列','🧬 CHC理論','📈 正規分布IQ','✅ 完全無料','🔒 データ非保存'],
    faq:[
      {q:'IQテストとは？', a:'IQテストは数列推論・パターン認識・論理的思考を通じて一般的知能（g因子）を測定します。結果は平均100・SD15の正規分布で表されます。'},
      {q:'このテストの精度は？', a:"レーヴン行列とCHC理論に基づき、Cronbach's αは0.85〜0.92水準。認知能力評価に高い参考価値を提供します。"},
      {q:'所要時間は？', a:'クイックテスト（15問）：約12分。精密テスト（40問）：約28分。両方とも完全無料。'}
    ],
    ogResultTitle:'IQ結果: {iq}（{cat}）| 上位{top}% 🧠',
    ogResultDesc:'レーヴン行列でIQを測定しました。あなたは何位？無料でテストしてみよう →',
    faqH2:'よくある質問'
  },
  fr: {
    name:'Français', locale:'fr_FR',
    title:'Test QI Gratuit – Mesure de l\'Intelligence en Ligne Validée Scientifiquement',
    desc:'Test QI gratuit et scientifique basé sur les Matrices de Raven et la Théorie CHC. Résultats immédiats avec analyse approfondie en 6 domaines.',
    keywords:'test QI gratuit, test intelligence en ligne, matrices de Raven, théorie CHC, évaluation cognitive',
    h1:'Test QI Gratuit', h2:'Mesurez votre intelligence scientifiquement',
    body:'Basé sur les Matrices de Raven & la Théorie CHC · 100% Gratuit · Résultats Immédiats · Analyse en 6 Domaines',
    start:'Commencer le test QI gratuit',
    features:['📊 Matrices de Raven','🧬 Théorie CHC','📈 Distribution Normale','✅ 100% Gratuit','🔒 Aucune donnée sauvegardée'],
    faq:[
      {q:"Qu'est-ce qu'un test de QI ?", a:"Un test de QI mesure l'intelligence générale (facteur g) via le raisonnement séquentiel, la reconnaissance de motifs et la logique. Les résultats suivent une distribution normale avec moyenne 100 et ET 15."},
      {q:'Ce test est-il précis ?', a:"Basé sur les Matrices de Raven et la théorie CHC avec un alpha de Cronbach de 0,85–0,92. Grande valeur de référence pour évaluer les capacités cognitives."},
      {q:'Combien de temps faut-il ?', a:'Test rapide (15 questions) : ~12 min. Test précision (40 questions) : ~28 min. Les deux sont entièrement gratuits.'}
    ],
    ogResultTitle:'Résultat QI : {iq} ({cat}) | Top {top}% 🧠',
    ogResultDesc:"Je viens de tester mon QI avec les Matrices de Raven. Et toi, où te situes-tu ? Test gratuit →",
    faqH2:'Foire Aux Questions'
  },
  es: {
    name:'Español', locale:'es_ES',
    title:'Test de CI Gratuito – Medición de Inteligencia Online Científicamente Validada',
    desc:'Test de CI gratuito y científico basado en las Matrices de Raven y la Teoría CHC. Resultados inmediatos con análisis detallado en 6 áreas.',
    keywords:'test CI gratuito, test inteligencia online, matrices de Raven, teoría CHC, evaluación cognitiva',
    h1:'Test de CI Gratuito', h2:'Mide tu inteligencia científicamente',
    body:'Basado en las Matrices de Raven & la Teoría CHC · 100% Gratuito · Resultados Inmediatos · Análisis en 6 Áreas',
    start:'Iniciar test de CI gratuito',
    features:['📊 Matrices de Raven','🧬 Teoría CHC','📈 Distribución Normal','✅ 100% Gratuito','🔒 Sin almacenamiento de datos'],
    faq:[
      {q:'¿Qué es un test de CI?', a:'Un test de CI mide la inteligencia general (factor g) mediante razonamiento secuencial, reconocimiento de patrones y lógica. Los resultados siguen una distribución normal con media 100 y DT 15.'},
      {q:'¿Es preciso este test?', a:"Basado en las Matrices de Raven y la teoría CHC con alpha de Cronbach de 0,85–0,92. Alto valor de referencia para evaluar la capacidad cognitiva."},
      {q:'¿Cuánto tiempo tarda?', a:'Test rápido (15 preguntas): ~12 min. Test de precisión (40 preguntas): ~28 min. Ambos completamente gratuitos.'}
    ],
    ogResultTitle:'Resultado CI: {iq} ({cat}) | Top {top}% 🧠',
    ogResultDesc:'Acabo de medir mi inteligencia con las Matrices de Raven. ¿Y tú dónde quedas? Test gratuito →',
    faqH2:'Preguntas Frecuentes'
  },
  pt: {
    name:'Português', locale:'pt_BR',
    title:'Teste de QI Gratuito – Medição de Inteligência Online Cientificamente Validada',
    desc:'Teste de QI gratuito e científico baseado nas Matrizes de Raven e na Teoria CHC. Resultados imediatos com análise detalhada em 6 domínios.',
    keywords:'teste QI gratuito, teste inteligência online, matrizes de Raven, teoria CHC, avaliação cognitiva',
    h1:'Teste de QI Gratuito', h2:'Meça sua inteligência cientificamente',
    body:'Baseado nas Matrizes de Raven & Teoria CHC · 100% Gratuito · Resultados Imediatos · Análise em 6 Domínios',
    start:'Iniciar teste de QI gratuito',
    features:['📊 Matrizes de Raven','🧬 Teoria CHC','📈 Distribuição Normal','✅ 100% Gratuito','🔒 Sem armazenamento de dados'],
    faq:[
      {q:'O que é um teste de QI?', a:'Um teste de QI mede a inteligência geral (fator g) por meio de raciocínio sequencial, reconhecimento de padrões e lógica. Os resultados seguem uma distribuição normal com média 100 e DP 15.'},
      {q:'Este teste é preciso?', a:"Baseado nas Matrizes de Raven e na teoria CHC com alfa de Cronbach de 0,85–0,92. Alto valor de referência para avaliar a capacidade cognitiva."},
      {q:'Quanto tempo leva?', a:'Teste Rápido (15 questões): ~12 min. Teste de Precisão (40 questões): ~28 min. Ambos completamente gratuitos.'}
    ],
    ogResultTitle:'Resultado QI: {iq} ({cat}) | Top {top}% 🧠',
    ogResultDesc:'Acabei de medir minha inteligência com as Matrizes de Raven. E você, como se sai? Teste gratuito →',
    faqH2:'Perguntas Frequentes'
  },
  it: {
    name:'Italiano', locale:'it_IT',
    title:'Test del QI Gratuito – Misurazione dell\'Intelligenza Online Scientificamente Validata',
    desc:'Test del QI gratuito e scientifico basato sulle Matrici di Raven e sulla Teoria CHC. Risultati immediati con analisi dettagliata in 6 aree.',
    keywords:'test QI gratuito, test intelligenza online, matrici di Raven, teoria CHC, valutazione cognitiva',
    h1:'Test del QI Gratuito', h2:'Misura la tua intelligenza scientificamente',
    body:'Basato sulle Matrici di Raven & Teoria CHC · 100% Gratuito · Risultati Immediati · Analisi in 6 Aree',
    start:'Inizia il test del QI gratuito',
    features:['📊 Matrici di Raven','🧬 Teoria CHC','📈 Distribuzione Normale','✅ 100% Gratuito','🔒 Nessun dato salvato'],
    faq:[
      {q:"Cos'è un test del QI?", a:"Un test del QI misura l'intelligenza generale (fattore g) tramite ragionamento sequenziale, riconoscimento di schemi e logica. I risultati seguono una distribuzione normale con media 100 e DS 15."},
      {q:'Questo test è accurato?', a:"Basato sulle Matrici di Raven e sulla teoria CHC con Cronbach's α di 0,85–0,92. Alto valore di riferimento per valutare le capacità cognitive."},
      {q:'Quanto tempo ci vuole?', a:'Test rapido (15 domande): ~12 min. Test di precisione (40 domande): ~28 min. Entrambi completamente gratuiti.'}
    ],
    ogResultTitle:'Risultato QI: {iq} ({cat}) | Top {top}% 🧠',
    ogResultDesc:'Ho appena testato la mia intelligenza con le Matrici di Raven. Dove ti posizioni? Test gratuito →',
    faqH2:'Domande Frequenti'
  },
  id: {
    name:'Indonesia', locale:'id_ID',
    title:'Tes IQ Gratis – Pengukuran Kecerdasan Online yang Tervalidasi Secara Ilmiah',
    desc:'Tes IQ gratis dan ilmiah berdasarkan Matriks Raven dan Teori CHC. Hasil instan dengan analisis mendalam 6 domain.',
    keywords:'tes IQ gratis, tes kecerdasan online, matriks Raven, teori CHC, penilaian kognitif',
    h1:'Tes IQ Gratis', h2:'Ukur kecerdasan Anda secara ilmiah',
    body:'Berdasarkan Matriks Progresif Raven & Teori CHC · 100% Gratis · Hasil Langsung · Analisis 6 Domain',
    start:'Mulai tes IQ gratis',
    features:['📊 Matriks Raven','🧬 Teori CHC','📈 Distribusi Normal IQ','✅ 100% Gratis','🔒 Data Tidak Disimpan'],
    faq:[
      {q:'Apa itu tes IQ?', a:'Tes IQ mengukur kecerdasan umum (faktor g) melalui penalaran deret, pengenalan pola, dan logika. Hasil mengikuti distribusi normal dengan rata-rata 100 dan SD 15.'},
      {q:'Seberapa akurat tes ini?', a:"Berdasarkan Matriks Raven dan teori CHC dengan Cronbach's α sebesar 0,85–0,92. Nilai referensi tinggi untuk menilai kemampuan kognitif."},
      {q:'Berapa lama waktu yang dibutuhkan?', a:'Tes Cepat (15 soal): ~12 menit. Tes Presisi (40 soal): ~28 menit. Keduanya sepenuhnya gratis.'}
    ],
    ogResultTitle:'Hasil IQ: {iq} ({cat}) | Top {top}% 🧠',
    ogResultDesc:'Saya baru saja mengukur kecerdasan saya menggunakan Matriks Raven. Di mana posisi kamu? Tes gratis →',
    faqH2:'Pertanyaan Umum'
  }
};

const ALL_LANGS = ['ko','en','de','ja','fr','es','pt','it','id'];
const APP_URL  = 'https://iq-test.all-lifes.com';
const SITE_URL = 'https://all-lifes.com';

// ── escape HTML for attribute values ────────────────────────
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

export default {
  async fetch(request) {
    const url  = new URL(request.url);
    const path = url.pathname;

    // ── Route 0: Sitemap (/iq-test-sitemap.xml) ────────────
    if (path === '/iq-test-sitemap.xml') {
      const lastmod = '2026-04-30';
      const langs = [
        { lang: 'ko', loc: `${SITE_URL}/iq-test/` },
        { lang: 'en', loc: `${SITE_URL}/en/iq-test/` },
        { lang: 'de', loc: `${SITE_URL}/de/iq-test/` },
        { lang: 'ja', loc: `${SITE_URL}/ja/iq-test/` },
        { lang: 'fr', loc: `${SITE_URL}/fr/iq-test/` },
        { lang: 'es', loc: `${SITE_URL}/es/iq-test/` },
        { lang: 'pt', loc: `${SITE_URL}/pt/iq-test/` },
        { lang: 'it', loc: `${SITE_URL}/it/iq-test/` },
        { lang: 'id', loc: `${SITE_URL}/id/iq-test/` },
      ];
      const alternates = langs.map(l =>
        `    <xhtml:link rel="alternate" hreflang="${l.lang}" href="${l.loc}"/>`
      ).join('\n') +
      `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/en/iq-test/"/>`;

      const urls = langs.map((l, i) => `  <url>
    <loc>${l.loc}</loc>
${alternates}
    <changefreq>weekly</changefreq>
    <priority>${i === 0 ? '1.0' : '0.9'}</priority>
    <lastmod>${lastmod}</lastmod>
  </url>`).join('\n');

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;
      return new Response(xml, {
        headers: {
          'Content-Type': 'application/xml;charset=UTF-8',
          'Cache-Control': 'public, max-age=86400'
        }
      });
    }

    // ── Route 1: OG Image (/og-image) ──────────────────────
    if (path === '/og-image' || path === '/og-image/') {
      const p   = url.searchParams;
      const iq  = p.get('iq')  || '100';
      const top = p.get('top') || '50';
      const cat = decodeURIComponent(p.get('cat') || '');
      const lg  = p.get('lang') || 'en';
      const svg = generateOGImage(iq, top, cat, lg);
      return new Response(svg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=86400',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // ── Route 2: Language IQ test pages ────────────────────
    const match = path.match(/^\/([a-z]{2})\/iq-test/);
    if (!match) return fetch(request);

    const lang = match[1];
    if (!LANGS[lang]) return fetch(request);

    const L         = LANGS[lang];
    const p         = url.searchParams;
    const canonical = `${SITE_URL}/${lang}/iq-test/`;

    // Detect result share params
    const isResultShare = p.get('r') === 'iq';
    const isExtShare    = p.get('r') === 'ext';
    const sharedIQ      = p.get('iq')  || '100';
    const sharedTop     = p.get('top') || '50';
    const sharedCat     = decodeURIComponent(p.get('cat') || '');
    const sharedMode    = p.get('mode') || 'short';

    // Build OG data (dynamic for result shares, default otherwise)
    let ogTitle, ogDesc, ogImage;
    if (isResultShare) {
      ogTitle = (L.ogResultTitle || 'IQ: {iq} ({cat}) | Top {top}% 🧠')
        .replace('{iq}', sharedIQ)
        .replace('{cat}', sharedCat)
        .replace('{top}', sharedTop);
      ogDesc  = L.ogResultDesc || L.desc;
      ogImage = `${SITE_URL}/og-image?iq=${sharedIQ}&top=${sharedTop}&cat=${encodeURIComponent(sharedCat)}&lang=${lang}`;
    } else {
      ogTitle = L.title;
      ogDesc  = L.desc;
      ogImage = `${APP_URL}/og-${lang}.svg`;
    }

    // iframe src — pass all query params through to the app
    const iframeSrc = `${APP_URL}/?lang=${lang}${isResultShare ? `&r=iq&iq=${sharedIQ}&cat=${encodeURIComponent(sharedCat)}&top=${sharedTop}&mode=${sharedMode}` : ''}${isExtShare ? `&r=ext&tid=${p.get('tid')||''}&s=${p.get('s')||''}&cat=${encodeURIComponent(p.get('cat')||'')}&top=${sharedTop}` : ''}`;

    // hreflang
    const hreflangs = ALL_LANGS.map(l => {
      const href = l === 'ko' ? `${SITE_URL}/iq-test/` : `${SITE_URL}/${l}/iq-test/`;
      return `<link rel="alternate" hreflang="${l}" href="${href}">`;
    }).join('\n    ');

    // Schema.org: WebApplication
    const appSchema = {
      "@context":"https://schema.org","@type":"WebApplication",
      "name":L.h1,"description":L.desc,"url":canonical,
      "applicationCategory":"EducationalApplication","inLanguage":lang,
      "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},
      "operatingSystem":"Web"
    };

    // Schema.org: FAQPage
    const faqSchema = {
      "@context":"https://schema.org","@type":"FAQPage",
      "mainEntity": L.faq.map(f=>({
        "@type":"Question","name":f.q,
        "acceptedAnswer":{"@type":"Answer","text":f.a}
      }))
    };

    // Result share banner content (shown on shared pages)
    const featuresHtml = L.features.map(f=>`<span class="chip">${f}</span>`).join('');
    const faqHtml = L.faq.map(f=>
      `<div class="faq-item"><div class="faq-q">${esc(f.q)}</div><div class="faq-a">${esc(f.a)}</div></div>`
    ).join('');

    const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(ogTitle)}</title>
<meta name="description" content="${esc(ogDesc)}">
<meta name="keywords" content="${esc(L.keywords)}">
<link rel="canonical" href="${esc(canonical)}">
${hreflangs}
<meta property="og:title"       content="${esc(ogTitle)}">
<meta property="og:description" content="${esc(ogDesc)}">
<meta property="og:url"         content="${esc(canonical)}">
<meta property="og:type"        content="website">
<meta property="og:locale"      content="${L.locale}">
<meta property="og:image"       content="${esc(ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card"        content="summary_large_image">
<meta name="twitter:title"       content="${esc(ogTitle)}">
<meta name="twitter:description" content="${esc(ogDesc)}">
<meta name="twitter:image"       content="${esc(ogImage)}">
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
.lang-bar a:hover{color:#fff;}
.lang-bar a.active{color:#fff;font-weight:700;}
.iframe-wrap{width:100%;background:#f1f5f9;}
iframe{width:100%;border:none;display:block;min-height:100vh;}
.seo-section{background:#fff;border-top:1px solid #e2e8f0;padding:36px 20px;}
.seo-section .inner{max-width:760px;margin:0 auto;}
.seo-section h2{font-size:17px;font-weight:800;color:#1e1b4b;margin-bottom:20px;}
.faq-item{border-bottom:1px solid #e2e8f0;padding:14px 0;}
.faq-item:last-child{border-bottom:none;}
.faq-q{font-size:14px;font-weight:700;color:#0f172a;margin-bottom:5px;}
.faq-a{font-size:13px;color:#475569;line-height:1.7;}
</style>
</head>
<body>
<div class="hero">
  <h1>${esc(L.h1)}</h1>
  <p>${esc(L.body)}</p>
  <div class="chips">${featuresHtml}</div>
  <a class="start-btn" href="${esc(iframeSrc)}">${esc(L.start)}</a>
</div>
<div class="lang-bar">
  ${ALL_LANGS.map(l=>{
    const href=l==='ko'?`${SITE_URL}/iq-test/`:`${SITE_URL}/${l}/iq-test/`;
    const name=l==='ko'?'한국어':(LANGS[l]?LANGS[l].name:l.toUpperCase());
    return `<a href="${href}"${l===lang?' class="active"':''}>${name}</a>`;
  }).join('')}
</div>
<div class="iframe-wrap">
  <iframe id="iq-frame" src="${esc(iframeSrc)}" scrolling="no" title="${esc(L.h1)}"></iframe>
</div>
<div class="seo-section">
  <div class="inner">
    <h2>${esc(L.faqH2)}</h2>
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
        'Content-Type':'text/html;charset=UTF-8',
        'Cache-Control': isResultShare ? 'public, max-age=300' : 'public, max-age=3600',
        'X-Robots-Tag':'index, follow'
      }
    });
  }
};
