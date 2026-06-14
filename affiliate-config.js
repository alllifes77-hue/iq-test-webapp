// ═══════════════════════════════════════════════════════════
// 어필리에이트 오퍼 설정
//
// 사용법:
//   1. impact.com 퍼블리셔 가입 → 브랜드 프로그램 신청·승인
//   2. 승인된 프로그램의 트래킹 링크를 아래 url에 붙여넣기
//   3. git push (자동 배포) — url이 빈 오퍼는 화면에 표시되지 않음
//
// 성과 추적: 링크에 subId1=iqtest_{언어}_{위치} 가 자동으로 붙음
//   → Impact 대시보드에서 언어·배치별 전환 성과 확인 가능
//
// 추천 프로그램 (IQ 테스트 사용자 = 자기계발 고관여층):
//   글로벌: Skillshare, Coursera, Brilliant.org, Babbel (모두 Impact 입점)
//   한국:   쿠팡 파트너스 (partners.coupang.com), 클래스101
//   일본:   A8.net, Rakuten アフィリエイト
// ═══════════════════════════════════════════════════════════

// ── 알리익스프레스 어필리에이트 (전 언어, Worker API 경유) ──
// 시크릿은 Cloudflare Worker에 저장 — 클라이언트엔 노출되지 않음.
// 상품은 언어·배송국가·통화별로 자동 최적화, 엣지에서 12시간 캐싱.
window.ALIEXPRESS = {
  enabled: true,
  endpoint: 'api/ali-products',
  maxItems: 6,
};

// ── 쿠팡 파트너스 다이내믹 위젯 (한국어 페이지 전용) ──
// partners.coupang.com → 링크 생성 → 다이내믹 위젯에서 생성한 위젯 정보.
// 결과 화면 진입 시점에 lazy 삽입되며, 화면 폭에 맞춰 자동 리사이즈.
// 끄려면 enabled: false
window.COUPANG_WIDGET = {
  enabled: true,
  id: 996633,
  trackingCode: 'AF4227535',
  template: 'carousel',
  height: 140,
  maxWidth: 680,
  minWidth: 300,
  // 공정위 경제적 이해관계 표시 의무 문구 — 삭제 시 지급중단 위험, 수정하지 말 것
  disclosure: '이 광고는 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.',
};

window.AFFILIATE_META = {
  ko: { title: '🎁 IQ를 더 키우고 싶다면', disc: '광고 · 구매 시 수수료를 받을 수 있습니다', tag: '광고' },
  en: { title: '🎁 Boost Your Brain Further', disc: 'Ad · We may earn a commission', tag: 'Ad' },
  de: { title: '🎁 Trainiere dein Gehirn weiter', disc: 'Anzeige · Wir erhalten ggf. eine Provision', tag: 'Anzeige' },
  fr: { title: '🎁 Boostez votre cerveau', disc: 'Publicité · Nous pouvons recevoir une commission', tag: 'Pub' },
  es: { title: '🎁 Potencia tu cerebro', disc: 'Anuncio · Podemos recibir una comisión', tag: 'Anuncio' },
  pt: { title: '🎁 Turbine seu cérebro', disc: 'Anúncio · Podemos receber comissão', tag: 'Anúncio' },
  it: { title: '🎁 Potenzia il tuo cervello', disc: 'Annuncio · Potremmo ricevere una commissione', tag: 'AD' },
  ja: { title: '🎁 脳をさらに鍛えよう', disc: '広告 · 購入時に手数料を受け取る場合があります', tag: '広告' },
  id: { title: '🎁 Tingkatkan Kecerdasanmu', disc: 'Iklan · Kami dapat menerima komisi', tag: 'Iklan' },
  hi: { title: '🎁 अपने दिमाग को और तेज़ करें', disc: 'विज्ञापन · हमें कमीशन मिल सकता है', tag: 'विज्ञापन' },
  ru: { title: '🎁 Прокачайте свой мозг', disc: 'Реклама · Мы можем получить комиссию', tag: 'Реклама' },
  vi: { title: '🎁 Nâng cao trí tuệ của bạn', disc: 'Quảng cáo · Chúng tôi có thể nhận hoa hồng', tag: 'QC' },
  tr: { title: '🎁 Beynini Daha da Geliştir', disc: 'Reklam · Komisyon alabiliriz', tag: 'Reklam' },
};

window.AFFILIATE_OFFERS = {
  ko: [
    { id: 'coupang-brain',  icon: '📚', title: '두뇌 훈련 베스트셀러',     desc: 'IQ·논리 퍼즐·두뇌 개발 도서 모음',         cta: '쿠팡에서 보기 →',   url: '' },
    { id: 'class101',       icon: '🎨', title: '클래스101 자기계발 클래스', desc: '사고력·창의력 키우는 온라인 클래스',        cta: '클래스 보기 →',     url: '' },
  ],
  en: [
    { id: 'skillshare',     icon: '🎨', title: 'Skillshare — 1 Month Free', desc: 'Thousands of classes in design, business & more', cta: 'Start Free Trial →', url: '' },
    { id: 'coursera',       icon: '🎓', title: 'Coursera Plus',             desc: 'Unlimited access to 7,000+ world-class courses',  cta: 'Explore Courses →',  url: '' },
  ],
  de: [
    { id: 'babbel',         icon: '🗣️', title: 'Babbel Sprachkurse',        desc: 'Sprachenlernen hält das Gehirn fit',              cta: 'Jetzt starten →',    url: '' },
    { id: 'coursera',       icon: '🎓', title: 'Coursera Plus',             desc: 'Unbegrenzter Zugang zu 7.000+ Kursen',            cta: 'Kurse entdecken →',  url: '' },
  ],
  fr: [
    { id: 'babbel',         icon: '🗣️', title: 'Babbel — Cours de langues', desc: 'Apprendre une langue muscle le cerveau',          cta: 'Commencer →',        url: '' },
    { id: 'coursera',       icon: '🎓', title: 'Coursera Plus',             desc: 'Accès illimité à plus de 7 000 cours',            cta: 'Découvrir →',        url: '' },
  ],
  es: [
    { id: 'babbel',         icon: '🗣️', title: 'Babbel — Idiomas',          desc: 'Aprender idiomas entrena tu cerebro',             cta: 'Empezar →',          url: '' },
    { id: 'coursera',       icon: '🎓', title: 'Coursera Plus',             desc: 'Acceso ilimitado a más de 7.000 cursos',          cta: 'Explorar →',         url: '' },
  ],
  pt: [
    { id: 'babbel',         icon: '🗣️', title: 'Babbel — Idiomas',          desc: 'Aprender idiomas exercita o cérebro',             cta: 'Começar →',          url: '' },
    { id: 'coursera',       icon: '🎓', title: 'Coursera Plus',             desc: 'Acesso ilimitado a mais de 7.000 cursos',         cta: 'Explorar →',         url: '' },
  ],
  it: [
    { id: 'babbel',         icon: '🗣️', title: 'Babbel — Corsi di lingue',  desc: 'Imparare le lingue allena il cervello',           cta: 'Inizia ora →',       url: '' },
    { id: 'coursera',       icon: '🎓', title: 'Coursera Plus',             desc: 'Accesso illimitato a oltre 7.000 corsi',          cta: 'Esplora →',          url: '' },
  ],
  ja: [
    { id: 'brain-books',    icon: '📚', title: '脳トレ・ベストセラー',       desc: 'IQ・論理パズル・脳開発の本',                       cta: '楽天で見る →',       url: '' },
    { id: 'coursera',       icon: '🎓', title: 'Coursera Plus',             desc: '7,000以上の講座が受け放題',                        cta: '講座を見る →',       url: '' },
  ],
  id: [
    { id: 'coursera',       icon: '🎓', title: 'Coursera Plus',             desc: 'Akses tanpa batas ke 7.000+ kursus',              cta: 'Jelajahi →',         url: '' },
    { id: 'skillshare',     icon: '🎨', title: 'Skillshare',                desc: 'Ribuan kelas online gratis 1 bulan',              cta: 'Coba Gratis →',      url: '' },
  ],
  hi: [
    { id: 'coursera',       icon: '🎓', title: 'Coursera Plus',             desc: '7,000+ विश्वस्तरीय कोर्स असीमित एक्सेस',           cta: 'कोर्स देखें →',       url: '' },
    { id: 'skillshare',     icon: '🎨', title: 'Skillshare',                desc: 'हज़ारों ऑनलाइन क्लासेस — 1 महीना मुफ़्त',          cta: 'मुफ़्त आज़माएं →',     url: '' },
  ],
  ru: [
    { id: 'coursera',       icon: '🎓', title: 'Coursera Plus',             desc: 'Безлимитный доступ к 7000+ курсам',               cta: 'Смотреть курсы →',   url: '' },
    { id: 'skillshare',     icon: '🎨', title: 'Skillshare',                desc: 'Тысячи онлайн-курсов — месяц бесплатно',          cta: 'Попробовать →',      url: '' },
  ],
  vi: [
    { id: 'coursera',       icon: '🎓', title: 'Coursera Plus',             desc: 'Truy cập không giới hạn 7.000+ khóa học',         cta: 'Khám phá →',         url: '' },
    { id: 'skillshare',     icon: '🎨', title: 'Skillshare',                desc: 'Hàng nghìn lớp học online — 1 tháng miễn phí',    cta: 'Dùng thử →',         url: '' },
  ],
  tr: [
    { id: 'coursera',       icon: '🎓', title: 'Coursera Plus',             desc: "7.000+ dünya standartında kursa sınırsız erişim", cta: 'Kursları Gör →',     url: '' },
    { id: 'skillshare',     icon: '🎨', title: 'Skillshare',                desc: 'Binlerce online ders — 1 ay ücretsiz',            cta: 'Ücretsiz Dene →',    url: '' },
  ],
};
