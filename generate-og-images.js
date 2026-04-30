// generate-og-images.js
// Run: node generate-og-images.js
// Outputs og-{lang}.svg for each language + fixes og-image.svg domain

const fs = require('fs');
const path = require('path');

const LANGS = {
  en: {
    badge:    '🧠 Scientifically Validated',
    title:    'Free IQ Test',
    titleSize: 68,
    sub:      'Online Intelligence Measurement & Deep Analysis',
    f1: '✓  Raven\'s Progressive Matrices · CHC Theory',
    f2: '✓  Quick (15 items) · Precision (40 items)',
    f3: '✓  EQ · Memory · Creativity Extended Tests',
    f4: '✓  Instant free results, no sign-up needed',
    url:      'all-lifes.com · IQ Test',
    cardLabel:'TEST RESULT',
    catLabel: 'Superior · Top 3%',
    stat1v:'93%', stat1l:'Accuracy',
    stat2v:'18m', stat2l:'Time Taken',
    stat3v:'40Q',  stat3l:'Precision Ver.',
  },
  de: {
    badge:    '🧠 Wissenschaftlich Validiert',
    title:    'Kostenloser IQ-Test',
    titleSize: 50,
    sub:      'Online-Intelligenzmessung & Tiefenanalyse',
    f1: '✓  Raven-Matrizen · CHC-Theorie',
    f2: '✓  Schnell (15) · Präzision (40 Fragen)',
    f3: '✓  EQ · Gedächtnis · Kreativität Tests',
    f4: '✓  Sofortige Ergebnisse ohne Anmeldung',
    url:      'all-lifes.com · IQ-Test',
    cardLabel:'TESTERGEBNIS',
    catLabel: 'Sehr gut · Top 3%',
    stat1v:'93%', stat1l:'Genauigkeit',
    stat2v:'18m', stat2l:'Zeit',
    stat3v:'40F',  stat3l:'Präzision',
  },
  ja: {
    badge:    '🧠 科学的に検証済み',
    title:    '無料IQテスト',
    titleSize: 68,
    sub:      'オンライン知能測定・詳細分析',
    f1: '✓  レーヴン行列 · CHC理論',
    f2: '✓  クイック(15問) · 精密(40問)',
    f3: '✓  EQ · 記憶力 · 創造性テスト',
    f4: '✓  登録不要・即時無料結果',
    url:      'all-lifes.com · IQテスト',
    cardLabel:'検査結果',
    catLabel: '優秀 · 上位3%',
    stat1v:'93%', stat1l:'正答率',
    stat2v:'18分', stat2l:'所要時間',
    stat3v:'40問',  stat3l:'精密版',
  },
  fr: {
    badge:    '🧠 Scientifiquement Validé',
    title:    'Test QI Gratuit',
    titleSize: 62,
    sub:      'Mesure d\'Intelligence en Ligne & Analyse',
    f1: '✓  Matrices de Raven · Théorie CHC',
    f2: '✓  Rapide (15) · Précision (40 questions)',
    f3: '✓  IE · Mémoire · Créativité',
    f4: '✓  Résultats immédiats, sans inscription',
    url:      'all-lifes.com · Test QI',
    cardLabel:'RÉSULTAT',
    catLabel: 'Supérieur · Top 3%',
    stat1v:'93%', stat1l:'Précision',
    stat2v:'18m', stat2l:'Durée',
    stat3v:'40Q',  stat3l:'Précision',
  },
  es: {
    badge:    '🧠 Científicamente Validado',
    title:    'Test de CI Gratuito',
    titleSize: 56,
    sub:      'Medición de Inteligencia Online & Análisis',
    f1: '✓  Matrices de Raven · Teoría CHC',
    f2: '✓  Rápido (15) · Precisión (40 preguntas)',
    f3: '✓  IE · Memoria · Creatividad',
    f4: '✓  Resultados inmediatos, sin registro',
    url:      'all-lifes.com · Test CI',
    cardLabel:'RESULTADO',
    catLabel: 'Superior · Top 3%',
    stat1v:'93%', stat1l:'Precisión',
    stat2v:'18m', stat2l:'Tiempo',
    stat3v:'40P',  stat3l:'Precisión',
  },
  pt: {
    badge:    '🧠 Cientificamente Validado',
    title:    'Teste de QI Gratuito',
    titleSize: 54,
    sub:      'Medição de Inteligência Online & Análise',
    f1: '✓  Matrizes de Raven · Teoria CHC',
    f2: '✓  Rápido (15) · Precisão (40 questões)',
    f3: '✓  IE · Memória · Criatividade',
    f4: '✓  Resultados imediatos, sem cadastro',
    url:      'all-lifes.com · Teste QI',
    cardLabel:'RESULTADO',
    catLabel: 'Superior · Top 3%',
    stat1v:'93%', stat1l:'Precisão',
    stat2v:'18m', stat2l:'Tempo',
    stat3v:'40Q',  stat3l:'Precisão',
  },
  it: {
    badge:    '🧠 Scientificamente Validato',
    title:    'Test del QI Gratuito',
    titleSize: 54,
    sub:      'Misurazione dell\'Intelligenza Online & Analisi',
    f1: '✓  Matrici di Raven · Teoria CHC',
    f2: '✓  Rapido (15) · Precisione (40 domande)',
    f3: '✓  IE · Memoria · Creatività',
    f4: '✓  Risultati immediati, senza registrazione',
    url:      'all-lifes.com · Test QI',
    cardLabel:'RISULTATO',
    catLabel: 'Superiore · Top 3%',
    stat1v:'93%', stat1l:'Precisione',
    stat2v:'18m', stat2l:'Tempo',
    stat3v:'40D',  stat3l:'Precisione',
  },
  id: {
    badge:    '🧠 Tervalidasi Secara Ilmiah',
    title:    'Tes IQ Gratis',
    titleSize: 68,
    sub:      'Pengukuran Kecerdasan Online & Analisis Mendalam',
    f1: '✓  Matriks Raven · Teori CHC',
    f2: '✓  Cepat (15) · Presisi (40 soal)',
    f3: '✓  EQ · Memori · Kreativitas',
    f4: '✓  Hasil langsung, tanpa daftar',
    url:      'all-lifes.com · Tes IQ',
    cardLabel:'HASIL TES',
    catLabel: 'Superior · Top 3%',
    stat1v:'93%', stat1l:'Akurasi',
    stat2v:'18m', stat2l:'Waktu',
    stat3v:'40S',  stat3l:'Presisi',
  },
};

function makeSVG(lang, L) {
  const ts = L.titleSize;
  // Adjust title y-position based on font size (bigger font → move up slightly)
  const titleY = ts >= 68 ? 220 : ts >= 60 ? 225 : 230;
  const subY   = titleY + (ts >= 68 ? 58 : ts >= 60 ? 52 : 46);
  const divY   = subY + 27;
  const f1Y    = divY + 45;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e1b4b"/>
      <stop offset="50%" style="stop-color:#3730a3"/>
      <stop offset="100%" style="stop-color:#4f46e5"/>
    </linearGradient>
    <linearGradient id="card" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.12"/>
      <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0.04"/>
    </linearGradient>
    <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#a5b4fc"/>
      <stop offset="100%" style="stop-color:#818cf8"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="shadow">
      <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>

  <circle cx="980" cy="80" r="200" fill="#6366f1" opacity="0.12"/>
  <circle cx="150" cy="550" r="160" fill="#4f46e5" opacity="0.15"/>
  <circle cx="1150" cy="580" r="120" fill="#818cf8" opacity="0.1"/>

  <g opacity="0.15">
    <circle cx="60" cy="60" r="3" fill="#a5b4fc"/>
    <circle cx="120" cy="60" r="3" fill="#a5b4fc"/>
    <circle cx="180" cy="60" r="3" fill="#a5b4fc"/>
    <circle cx="60" cy="120" r="3" fill="#a5b4fc"/>
    <circle cx="120" cy="120" r="3" fill="#a5b4fc"/>
    <circle cx="180" cy="120" r="3" fill="#a5b4fc"/>
    <circle cx="60" cy="180" r="3" fill="#a5b4fc"/>
    <circle cx="120" cy="180" r="3" fill="#a5b4fc"/>
    <circle cx="180" cy="180" r="3" fill="#a5b4fc"/>
  </g>

  <rect x="60" y="120" width="260" height="36" rx="18" fill="#ffffff" opacity="0.15"/>
  <text x="190" y="143" font-family="Arial,sans-serif" font-size="14" font-weight="700" fill="#c7d2fe" text-anchor="middle" letter-spacing="1">${escXml(L.badge)}</text>

  <text x="60" y="${titleY}" font-family="Arial,sans-serif" font-size="${ts}" font-weight="900" fill="#ffffff" letter-spacing="-1">${escXml(L.title)}</text>

  <text x="60" y="${subY}" font-family="Arial,sans-serif" font-size="22" fill="#a5b4fc" font-weight="400">${escXml(L.sub)}</text>

  <rect x="60" y="${divY}" width="80" height="4" rx="2" fill="#6366f1"/>

  <g font-family="Arial,sans-serif" font-size="18" fill="#c7d2fe">
    <text x="60" y="${f1Y}">${escXml(L.f1)}</text>
    <text x="60" y="${f1Y + 35}">${escXml(L.f2)}</text>
    <text x="60" y="${f1Y + 70}">${escXml(L.f3)}</text>
    <text x="60" y="${f1Y + 105}">${escXml(L.f4)}</text>
  </g>

  <rect x="60" y="490" width="340" height="44" rx="22" fill="#4f46e5" opacity="0.7"/>
  <text x="230" y="517" font-family="Arial,monospace" font-size="15" fill="#e0e7ff" text-anchor="middle" font-weight="600">${escXml(L.url)}</text>

  <rect x="680" y="90" width="460" height="450" rx="32" fill="url(#card)" stroke="#ffffff" stroke-opacity="0.2" stroke-width="1.5" filter="url(#shadow)"/>

  <text x="910" y="145" font-family="Arial,sans-serif" font-size="15" fill="#a5b4fc" text-anchor="middle" font-weight="600" letter-spacing="2">${escXml(L.cardLabel)}</text>

  <circle cx="910" cy="275" r="100" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="16"/>
  <circle cx="910" cy="275" r="100" fill="none" stroke="url(#ring)" stroke-width="16" stroke-linecap="round"
    stroke-dasharray="565" stroke-dashoffset="113"
    transform="rotate(-90 910 275)" filter="url(#glow)"/>

  <text x="910" y="258" font-family="Arial,sans-serif" font-size="62" font-weight="900" fill="#ffffff" text-anchor="middle">128</text>
  <text x="910" y="290" font-family="Arial,sans-serif" font-size="14" fill="#a5b4fc" text-anchor="middle" font-weight="600" letter-spacing="1">IQ SCORE</text>

  <rect x="810" y="308" width="200" height="32" rx="16" fill="#6366f1" opacity="0.6"/>
  <text x="910" y="329" font-family="Arial,sans-serif" font-size="14" fill="#e0e7ff" text-anchor="middle" font-weight="700">${escXml(L.catLabel)}</text>

  <g font-family="Arial,sans-serif">
    <rect x="700" y="420" width="130" height="80" rx="16" fill="#ffffff" opacity="0.08"/>
    <text x="765" y="452" font-size="28" font-weight="900" fill="#ffffff" text-anchor="middle">${escXml(L.stat1v)}</text>
    <text x="765" y="472" font-size="12" fill="#a5b4fc" text-anchor="middle">${escXml(L.stat1l)}</text>

    <rect x="845" y="420" width="130" height="80" rx="16" fill="#ffffff" opacity="0.08"/>
    <text x="910" y="452" font-size="28" font-weight="900" fill="#ffffff" text-anchor="middle">${escXml(L.stat2v)}</text>
    <text x="910" y="472" font-size="12" fill="#a5b4fc" text-anchor="middle">${escXml(L.stat2l)}</text>

    <rect x="990" y="420" width="130" height="80" rx="16" fill="#ffffff" opacity="0.08"/>
    <text x="1055" y="452" font-size="28" font-weight="900" fill="#ffffff" text-anchor="middle">${escXml(L.stat3v)}</text>
    <text x="1055" y="472" font-size="12" fill="#a5b4fc" text-anchor="middle">${escXml(L.stat3l)}</text>
  </g>

  <text x="600" y="610" font-family="Arial,sans-serif" font-size="13" fill="#6366f1" text-anchor="middle" opacity="0.7">Raven's Progressive Matrices · CHC Theory · Cronbach's α .85~.92</text>
</svg>`;
}

function escXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const outDir = __dirname;

for (const [lang, L] of Object.entries(LANGS)) {
  const svg = makeSVG(lang, L);
  const file = path.join(outDir, `og-${lang}.svg`);
  fs.writeFileSync(file, svg, 'utf8');
  console.log(`✓ ${file}`);
}

// Also fix the Korean og-image.svg domain
const koFile = path.join(outDir, 'og-image.svg');
let koSVG = fs.readFileSync(koFile, 'utf8');
koSVG = koSVG.replace('jeybeeicon.com · IQ 테스트', 'all-lifes.com · IQ 테스트');
fs.writeFileSync(koFile, koSVG, 'utf8');
console.log('✓ Fixed og-image.svg domain → all-lifes.com');

console.log('\nDone! Generated files:');
Object.keys(LANGS).forEach(l => console.log(`  og-${l}.svg`));
