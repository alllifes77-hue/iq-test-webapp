// ═══════════════════════════════════════════════════════════
// IQ APP ENGINE
// ═══════════════════════════════════════════════════════════

// Kakao SDK init (replace YOUR_KAKAO_JS_KEY with your key from https://developers.kakao.com)
try { if(window.Kakao && !Kakao.isInitialized()) { const _kk = window.IQ_KAKAO_KEY || 'YOUR_KAKAO_JS_KEY'; if(_kk !== 'YOUR_KAKAO_JS_KEY') Kakao.init(_kk); } } catch(e){}

// ── i18n helpers ──
function t(k){const L=window.IQ_LANG;return(L&&L[k]!=null?L[k]:null);}
function tl(koLabel){const m=window.IQ_LANG&&window.IQ_LANG.typeLabelMap;return(m&&m[koLabel])||koLabel;}
function tp(key,vars){const raw=t(key);if(raw==null)return null;let s=raw;if(vars)Object.entries(vars).forEach(([k,v])=>{s=s.replace('{'+k+'}',v);});return s;}

function applyLang(){
  const L=window.IQ_LANG;if(!L)return;
  document.documentElement.lang=L.htmlLang||'ko';
  if(L.docTitle)document.title=L.docTitle;
  // Per-language SEO meta tag updates
  const _l=window.IQ_CURRENT_LANG||'ko';
  // 모든 13개 언어가 SEO 래퍼 페이지(/xx/iq-test/)를 보유 (en~id: iq-multilang, hi~tr: iq-test-webapp)
  const _hasWrapper=['en','de','fr','es','pt','it','ja','id','hi','ru','vi','tr'].includes(_l);
  const _url=_l==='ko'?'https://all-lifes.com/iq-test/':_hasWrapper?'https://all-lifes.com/'+_l+'/iq-test/':'https://all-lifes.com/iq-test/?lang='+_l;
  if(L.metaDesc){const m=document.querySelector('meta[name="description"]');if(m)m.content=L.metaDesc;}
  if(L.metaKeywords){const m=document.querySelector('meta[name="keywords"]');if(m)m.content=L.metaKeywords;}
  if(L.ogLocale){const m=document.querySelector('meta[property="og:locale"]');if(m)m.content=L.ogLocale;}
  {const m=document.querySelector('meta[property="og:title"]');if(m&&L.docTitle)m.content=L.docTitle;}
  {const m=document.querySelector('meta[property="og:description"]');if(m&&L.metaDesc)m.content=L.metaDesc;}
  {const m=document.querySelector('meta[property="og:url"]');if(m)m.content=_url;}
  {const c=document.querySelector('link[rel="canonical"]');if(c)c.href=_url;}
  {const _ogPng=['ko','en','de','fr','es','pt','it','ja','id']; // 실제 og-{lang}.png 보유 언어
   const _ogLang=_ogPng.includes(_l)?_l:'en'; // 신규 언어(hi/ru/vi/tr)는 전용 PNG 생성 전까지 en 폴백
   const _img=`https://all-lifes.com/iq-test/og-${_ogLang}.png`;
   const mi=document.querySelector('meta[property="og:image"]');if(mi)mi.content=_img;
   const mt=document.querySelector('meta[name="twitter:image"]');if(mt)mt.content=_img;}
  {const m=document.querySelector('meta[property="og:image:height"]');if(m)m.content='1200';}
  // Hero
  const hero=document.querySelector('.home-hero');
  if(hero){
    const ey=hero.querySelector('.eyebrow');if(ey&&L.heroEyebrow)ey.textContent=L.heroEyebrow;
    const h1=hero.querySelector('h1');if(h1&&L.heroH1)h1.innerHTML=L.heroH1;
    const p=hero.querySelector('p');if(p&&L.heroP)p.innerHTML=L.heroP;
    if(L.trustChips){const chips=hero.querySelectorAll('.trust-chip');L.trustChips.forEach((tx,i)=>{if(chips[i])chips[i].textContent=tx;});}
  }
  // Recommended badge (CSS custom property)
  const featCard=document.querySelector('.test-card.featured');
  if(featCard&&L.longRec)featCard.style.setProperty('--rec-label',`"${L.longRec}"`);
  // Test cards
  const cards=document.querySelectorAll('.test-card');
  if(cards[0]&&L.shortCardTitle){
    const h3=cards[0].querySelector('h3');if(h3)h3.textContent=L.shortCardTitle;
    const p=cards[0].querySelector('p');if(p)p.textContent=L.shortCardDesc||'';
    const bs=cards[0].querySelectorAll('.badge');
    if(bs[0]&&L.shortBadge1)bs[0].textContent=L.shortBadge1;
    if(bs[1]&&L.shortBadge2)bs[1].textContent=L.shortBadge2;
  }
  if(cards[1]&&L.longCardTitle){
    const h3=cards[1].querySelector('h3');if(h3)h3.textContent=L.longCardTitle;
    const p=cards[1].querySelector('p');if(p)p.textContent=L.longCardDesc||'';
    const bs=cards[1].querySelectorAll('.badge');
    if(bs[0]&&L.longBadge1)bs[0].textContent=L.longBadge1;
    if(bs[1]&&L.longBadge2)bs[1].textContent=L.longBadge2;
    if(bs[2]&&L.longBadge3)bs[2].textContent=L.longBadge3;
  }
  // Instructions static items
  if(L.inst1Title){
    const items=document.querySelectorAll('.inst-list li');
    [[L.inst1Title,L.inst1Desc],[L.inst2Title,null],[L.inst3Title,L.inst3Desc],[L.inst4Title,L.inst4Desc]].forEach(([ti,de],i)=>{
      if(!items[i])return;
      const strong=items[i].querySelector('strong');if(strong&&ti)strong.textContent=ti;
      if(de!=null){const sp=items[i].querySelector('span:not([id])');if(sp)sp.textContent=de;}
    });
  }
  const instBtns=document.querySelectorAll('.inst-btns button');
  if(instBtns[0]&&L.instBack)instBtns[0].textContent=L.instBack;
  if(instBtns[1]&&L.instStart)instBtns[1].textContent=L.instStart;
  // Calculating screen
  if(L.calcTitle){const ch=document.querySelector('#screen-calculating h2');if(ch)ch.textContent=L.calcTitle;}
  if(L.calcSub){const cp=document.querySelector('#screen-calculating p');if(cp)cp.textContent=L.calcSub;}
  if(L.calcSteps){['cs1','cs2','cs3','cs4','cs5'].forEach((id,i)=>{
    const el=document.getElementById(id);if(el&&L.calcSteps[i])el.innerHTML=`<span class="calc-check">✓</span> ${L.calcSteps[i]}`;
  });}
  // Results hero static
  const resH2=document.querySelector('#screen-results .results-hero h2');if(resH2&&L.resHeroTitle)resH2.textContent=L.resHeroTitle;
  const iqLbl=document.querySelector('.iq-number-label');if(iqLbl&&L.iqLabel)iqLbl.textContent=L.iqLabel;
  const pctSpans=document.querySelectorAll('.pct-bar-labels span');
  if(pctSpans[0]&&L.pctBarBottom)pctSpans[0].textContent=L.pctBarBottom;
  if(pctSpans[2]&&L.pctBarTop)pctSpans[2].textContent=L.pctBarTop;
  // Results stat labels
  const statLbls=document.querySelectorAll('#screen-results .stat-lbl');
  if(L.statCorrect&&statLbls[0])statLbls[0].textContent=L.statCorrect;
  if(L.statAcc&&statLbls[1])statLbls[1].textContent=L.statAcc;
  if(L.statTime&&statLbls[2])statLbls[2].textContent=L.statTime;
  if(L.statTop&&statLbls[3])statLbls[3].textContent=L.statTop;
  // Ext section
  const extSec=document.querySelector('.ext-section');
  if(extSec){const h3=extSec.querySelector('h3');if(h3&&L.extTitle)h3.textContent=L.extTitle;const sub=extSec.querySelector('.ext-sub');if(sub&&L.extSub)sub.textContent=L.extSub;}
  // Share section
  const shareS=document.querySelector('#iq-share-section');
  if(shareS){const h3=shareS.querySelector('h3');if(h3&&L.shareTitle)h3.textContent=L.shareTitle;const p=shareS.querySelector('p');if(p&&L.shareDesc)p.textContent=L.shareDesc;}
  const srcSite=document.querySelector('#screen-results .src-site');if(srcSite&&L.shareSiteLine)srcSite.textContent=L.shareSiteLine;
  // Extended results stat labels
  const extStatLbls=document.querySelectorAll('#screen-ext-results .stat-lbl');
  if(L.extStatScoreLabel&&extStatLbls[0])extStatLbls[0].textContent=L.extStatScoreLabel;
  if(L.extStatPctLabel&&extStatLbls[1])extStatLbls[1].textContent=L.extStatPctLabel;
  if(L.extStatLevelLabel&&extStatLbls[2])extStatLbls[2].textContent=L.extStatLevelLabel;
  // Reliability bars
  if(L.rlTitle){const rl=document.querySelector('.rl-title');if(rl)rl.textContent=L.rlTitle;}
  if(L.rlSeq||L.rlMat||L.rlSpat||L.rlLog){
    const rlItems=document.querySelectorAll('.rl-label');
    if(rlItems[0]&&L.rlSeq)rlItems[0].textContent=L.rlSeq;
    if(rlItems[1]&&L.rlMat)rlItems[1].textContent=L.rlMat;
    if(rlItems[2]&&L.rlSpat)rlItems[2].textContent=L.rlSpat;
    if(rlItems[3]&&L.rlLog)rlItems[3].textContent=L.rlLog;
  }
  // Science/features/faq section titles
  if(L.sciTitle){const sc=document.querySelector('.science-section h2');if(sc)sc.textContent=L.sciTitle;}
  if(L.sciSub){const ss=document.querySelector('.sci-sub');if(ss)ss.textContent=L.sciSub;}
  if(L.featTitle){const ft=document.querySelector('.features-section h2');if(ft)ft.textContent=L.featTitle;}
  if(L.faqTitle){const fq=document.querySelector('.faq-section h2');if(fq)fq.textContent=L.faqTitle;}
  if(L.seoTitle){const st=document.querySelector('.seo-article h2');if(st)st.textContent=L.seoTitle;}
  // Science items
  if(L.sciItems){const sg=document.querySelector('.science-grid');if(sg)sg.innerHTML=L.sciItems.map(i=>`<div class="sci-item"><div class="si-icon">${i.icon}</div><h4>${i.title}</h4><p>${i.desc}</p></div>`).join('');}
  // Feature items
  if(L.featItems){const fg=document.querySelector('.features-grid');if(fg)fg.innerHTML=L.featItems.map(i=>`<div class="feat-item"><div class="fi-icon">${i.icon}</div><h4>${i.title}</h4><p>${i.desc}</p></div>`).join('');}
  // FAQ items
  if(L.faqItems){const fl=document.querySelector('.faq-list');if(fl)fl.innerHTML=L.faqItems.map(i=>`<div class="faq-item"><button class="faq-btn" onclick="toggleFAQ(this)"><span>${i.q}</span><span class="faq-arrow">▾</span></button><div class="faq-body"><p>${i.a}</p></div></div>`).join('');}
  // SEO article
  if(L.seoH2&&L.seoSections){const sa=document.querySelector('.seo-article .container');if(sa)sa.innerHTML='<h2>'+L.seoH2+'</h2>'+L.seoSections.map(s=>'<h3>'+s.h3+'</h3><p>'+s.p+'</p>').join('');}
  // Copy button labels
  if(L.copyBtn){
    const cl1=document.getElementById('copy-lbl-iq');if(cl1)cl1.textContent=L.copyBtn;
    const cl2=document.getElementById('copy-lbl-ext');if(cl2)cl2.textContent=L.copyBtn;
  }
  // Contact section
  if(L.contactTitle){['contact-title-iq','contact-title-ext'].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent=L.contactTitle;});}
  if(L.contactDesc){['contact-desc-iq','contact-desc-ext'].forEach(id=>{const el=document.getElementById(id);if(el)el.innerHTML=L.contactDesc;});}
  if(L.contactLink){['contact-link-iq','contact-link-ext'].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent=L.contactLink;});}
  // Promo sections
  if(L.promo){
    const P=L.promo;
    const upd=(id,val)=>{const el=document.getElementById(id);if(el&&val!=null)el.textContent=val;};
    upd('promo-badge-iq',P.badge);upd('promo-title-iq',P.iqTitle);upd('promo-sub-iq',P.iqSub);
    upd('promo-lucky-title-iq',P.luckyTitle);upd('promo-lucky-desc-iq',P.luckyDesc);upd('promo-lucky-cta-iq',P.luckyCta);
    upd('promo-brain-title-iq',P.brainIqTitle);upd('promo-brain-desc-iq',P.brainIqDesc);upd('promo-brain-cta-iq',P.brainIqCta);
    upd('promo-badge-ext',P.badge);upd('promo-title-ext',P.extTitle);upd('promo-sub-ext',P.extSub);
    upd('promo-lucky-title-ext',P.luckyTitle);upd('promo-lucky-desc-ext',P.luckyDesc);upd('promo-lucky-cta-ext',P.luckyCta);
    upd('promo-brain-title-ext',P.brainExtTitle);upd('promo-brain-desc-ext',P.brainExtDesc);upd('promo-brain-cta-ext',P.brainExtCta);
    // Lucky URL: language-specific
    const luckyUrl=`https://all-lifes.com/lucky${_l!=='ko'?'?lang='+_l:''}`;
    ['promo-lucky-card-iq','promo-lucky-card-ext'].forEach(id=>{const el=document.getElementById(id);if(el)el.href=luckyUrl;});
  }
  // Daily banner (re-apply after lang switch)
  updateDailyBanner();
  // Brain training screen static text
  if(L.bt){
    const B=L.bt;
    const upd=(id,val)=>{const el=document.getElementById(id);if(el&&val!=null)el.textContent=val;};
    const updH=(id,val)=>{const el=document.getElementById(id);if(el&&val!=null)el.innerHTML=val;};
    updH('bt-h2',B.h2);
    if(B.chips){const c=document.getElementById('bt-chips');if(c)c.innerHTML=B.chips.map(t=>`<span class="bt-chip">${t}</span>`).join('');}
    upd('bt-neuro-h4',B.neuroH4);upd('bt-neuro-p',B.neuroP);
    upd('bt-games-label',B.gamesLabel);upd('bt-games-sub',B.gamesSub);
    upd('bt-stroop-h3',B.stroopH3);updH('bt-stroop-desc',B.stroopDesc);
    upd('stroop-score-box',B.notPlayed);upd('stroop-start-btn',B.start);
    upd('bt-mem-h3',B.memH3);updH('bt-mem-desc',B.memDesc);
    upd('memgrid-score-box',B.notPlayed);upd('memgrid-start-btn',B.start);upd('bt-mem-confirm',B.memConfirm);
    upd('bt-rx-h3',B.rxH3);updH('bt-rx-desc',B.rxDesc);
    upd('reaction-score-box',B.notPlayed);upd('reaction-start-btn',B.start);
    updH('rx-hint',B.rxHint);upd('bt-back-btn',B.backBtn);
  }
  // ASD section localization
  if(L.asd){
    const A=L.asd;
    const aupd=(id,val)=>{const el=document.getElementById(id);if(el&&val!=null)el.textContent=val;};
    aupd('asd-section-title',A.sectionTitle);
    aupd('asd-section-sub',A.sectionSub);
    aupd('asd-card-title',A.cardTitle);
    aupd('asd-card-desc',A.cardDesc);
    aupd('asd-card2-title',A.card2Title);
    aupd('asd-card2-desc',A.card2Desc);
    aupd('asd-q-disclaimer',A.qDisclaimer);
    const bb=document.querySelector('.asd-back-btn');if(bb&&L.backHome)bb.textContent=L.backHome;
  }
}

function sendResize(){
  const h=document.body.scrollHeight;
  window.parent.postMessage({type:'iq-resize',height:h},'*');
}

// ── Mobile share button visibility ──
window.addEventListener('DOMContentLoaded', () => {
  applyLang();
  updateShareRows();
  if(navigator.share) {
    document.querySelectorAll('[id^="native-btn"]').forEach(b => b.style.display = '');
  }
  animateReliabilityBars();
  toggleFAQ(null);
  updateDailyBanner();
  renderSocialProof();
  applyResultI18n();
  checkShareParams();
  // ?test=eq|memory|speed|creativity|focus|cog_flex 딥링크 → 확장검사 바로 시작
  try{
    const _tid=new URLSearchParams(location.search).get('test');
    if(_tid&&typeof extendedTests!=='undefined'&&extendedTests[_tid]&&!new URLSearchParams(location.search).get('r')){
      startExtTest(_tid);
    }
  }catch(e){}
  // Report initial height to parent (Cloudflare Worker iframe wrapper)
  setTimeout(sendResize, 200);
  setTimeout(sendResize, 800);
  // Keep updating as fonts/images finish loading
  window.addEventListener('load', () => setTimeout(sendResize, 300));
  // Watch for DOM size changes
  if(window.ResizeObserver){
    new ResizeObserver(sendResize).observe(document.body);
  }
});

// ── Utility ──
function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function sample(arr,n){return shuffle(arr).slice(0,n);}

function erf(x){
  const t=1/(1+0.3275911*Math.abs(x));
  const y=1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-0.284496736)*t+0.254829592)*t*Math.exp(-x*x);
  return x>=0?y:-y;
}
function normCDF(z){return 0.5*(1+erf(z/Math.SQRT2));}
function getIQPercentile(iq){return Math.round(normCDF((iq-100)/15)*100);}
function getExtPercentile(score,mean=76,sd=8){
  const z=(score-mean)/sd;
  const p=Math.round(normCDF(z)*100);
  return Math.max(1,Math.min(99,p));
}

// ── Build question sets ──
function tagPool(pool,name){return pool.map((q,i)=>Object.assign({},q,{_pool:name,_poolIdx:i}));}
function buildShortSet(){return shuffle([...sample(tagPool(seqPool,'seqPool'),5),...sample(tagPool(matPool,'matPool'),5),...sample(tagPool(logPool,'logPool'),3),...sample(tagPool(anaPool,'anaPool'),2),...tagPool(hardPool,'hardPool')]);}
function buildLongSet(){return shuffle([...sample(tagPool(seqPool,'seqPool'),10),...sample(tagPool(matPool,'matPool'),10),...sample(tagPool(spatPool,'spatPool'),10),...sample(tagPool(logPool,'logPool'),5),...sample(tagPool(anaPool,'anaPool'),5),...tagPool(veryHardPool,'veryHardPool')]);}

// ── BRAIN AGE ──
function calcBrainAge(iq){return Math.max(18,Math.min(65,Math.round(30-(iq-100)/3)));}
function showBrainAgeCard(iq,suffix){
  const age=calcBrainAge(iq);
  const n=document.getElementById('brain-age-num-'+suffix);if(n)n.textContent=age;
  // 나이 단위 현지화
  const _units={ko:'세',en:'yrs',de:'J.',fr:'ans',es:'años',pt:'anos',it:'anni',ja:'歳',id:'thn',hi:'वर्ष',ru:'лет',vi:'tuổi',tr:'yaş'};
  const u=document.getElementById('brain-age-unit-'+suffix);if(u)u.textContent=_units[window.IQ_CURRENT_LANG||'ko']||'yrs';
  const L=window.IQ_LANG&&window.IQ_LANG.brainAge;
  const msgs=L?[
    [25,L.ba_excellent,L.ba_excellent_d],[30,L.ba_great,L.ba_great_d],[38,L.ba_avg,L.ba_avg_d],[99,L.ba_grow,L.ba_grow_d]
  ]:[
    [25,'🧠 탁월한 뇌 나이!','최상위 인지 능력 — 꾸준한 두뇌 훈련으로 유지하세요.'],
    [30,'🧠 우수한 뇌 나이!','평균보다 훨씬 젊은 두뇌 — 두뇌 훈련으로 더 낮춰보세요.'],
    [38,'🧠 측정된 뇌 나이','두뇌 훈련으로 인지 능력을 향상시키세요.'],
    [99,'🧠 성장 가능성 있음','매일 두뇌 훈련으로 뇌 나이를 낮출 수 있습니다!'],
  ];
  const [,title,desc]=msgs.find(([lim])=>age<=lim)||msgs[msgs.length-1];
  const t=document.getElementById('brain-age-title-'+suffix);if(t)t.textContent=title;
  const d=document.getElementById('brain-age-desc-'+suffix);if(d)d.textContent=desc;
}

// ── IQ HISTORY ──
// 로컬 기준 날짜 (UTC 자정이 아닌 사용자 자정에 날짜 전환)
function localDateStr(offsetMs=0){
  const d=new Date(Date.now()+offsetMs);
  return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
}
function saveIQHistory(iq,mode){
  try{const h=JSON.parse(localStorage.getItem('iq_hist_v1')||'[]');h.push({date:localDateStr(),iq,mode});if(h.length>10)h.shift();localStorage.setItem('iq_hist_v1',JSON.stringify(h));}catch{}
}
function renderIQHistory(cardId){
  try{
    const hist=JSON.parse(localStorage.getItem('iq_hist_v1')||'[]');
    const el=document.getElementById(cardId);if(!el)return;
    if(hist.length<2){el.style.display='none';return;}
    el.style.display='block';
    const L=window.IQ_LANG&&window.IQ_LANG;
    const maxQ=Math.max(...hist.map(h=>h.iq)),minQ=Math.min(...hist.map(h=>h.iq));
    const rng=Math.max(maxQ-minQ,10);
    const avg=Math.round(hist.reduce((a,h)=>a+h.iq,0)/hist.length);
    const hd=(L&&L.histTitle)||`📈 내 IQ 기록 (${hist.length}회)`;
    const metaBest=(L&&L.histBest)||'최고';
    const metaAvg=(L&&L.histAvg)||'평균';
    const metaCount=(L&&L.histCount)||'기록';
    el.innerHTML=`<div class="history-hd">${hd.replace('{n}',hist.length)}</div>
      <div class="history-bars">${hist.map(h=>{const pct=Math.max(15,Math.round((h.iq-minQ+5)/(rng+10)*100));const c=h.iq>=120?'var(--success)':h.iq>=100?'#6366f1':'var(--warning)';return`<div class="h-bar-w"><div class="h-bar-v">${h.iq}</div><div class="h-bar" style="height:${pct}%;background:${c}"></div></div>`;}).join('')}</div>
      <div class="history-meta"><span>${metaBest}: <strong>${maxQ}</strong></span><span>${metaAvg}: <strong>${avg}</strong></span><span>${metaCount}: <strong>${hist.length}${(window.IQ_CURRENT_LANG||'ko')==='ko'?'회':''}</strong></span></div>`;
  }catch{}
}

// ── DAILY BRAIN CHALLENGE ──
function _dHash(s){let h=5381;for(let i=0;i<s.length;i++)h=((h<<5)+h^s.charCodeAt(i))&0x7fffffff;return h;}
function _dRand(seed){let s=seed|0;return()=>{s=(s*1664525+1013904223)&0xffffffff;return(s>>>0)/4294967295;};}
function getDSt(){try{return JSON.parse(localStorage.getItem('iq_daily_v1'))||{};}catch{return{};}}
function setDSt(s){try{localStorage.setItem('iq_daily_v1',JSON.stringify(s));}catch{}}

function getDailyQs(){
  const today=localDateStr();
  const rand=_dRand(_dHash(today));
  // Tag with pool name + index so getTranslatedQ can apply localization
  const pool=[...tagPool(seqPool,'seqPool'),...tagPool(anaPool,'anaPool'),...tagPool(logPool,'logPool')];
  return [...pool].map(q=>({q,r:rand()})).sort((a,b)=>a.r-b.r).map(x=>x.q).slice(0,5);
}

function updateDailyBanner(){
  const st=getDSt();
  const today=localDateStr();
  const done=st.lastDate===today&&st.done;
  const streak=st.streak||0;
  const L=window.IQ_LANG;
  const streakEl=document.getElementById('daily-banner-streak');
  if(streakEl)streakEl.textContent=`🔥 ${streak}${(L&&L.daySuffix)||'일'}`;
  const cta=document.getElementById('daily-banner-cta');
  const sub=document.getElementById('daily-banner-sub');
  const title=document.getElementById('daily-banner-title');
  if(title&&L&&L.dailyBannerTitle)title.textContent=L.dailyBannerTitle;
  if(done){
    if(cta)cta.textContent=`✅ ${st.score||0}/5`;
    if(sub)sub.textContent=(L&&L.dailyDoneSub)||'오늘 완료! 내일 또 도전하세요.';
  }else{
    if(cta)cta.textContent=(L&&L.dailyGo)||'도전하기 →';
    if(sub)sub.textContent=(L&&L.dailyBannerSub)||'매일 5문제 · 연속 도전으로 뇌를 깨워보세요';
  }
}

let _dCur=0,_dQs=[],_dRes=[],_dTmr=null,_dSec=30;

function showDailyChallenge(){
  const today=localDateStr();
  const st=getDSt();
  const L=window.IQ_LANG;
  // Update hero
  document.getElementById('daily-date-chip').textContent=today;
  const heroTitle=document.getElementById('daily-hero-title');if(heroTitle&&L&&L.dailyTitle)heroTitle.textContent=L.dailyTitle;
  const heroSub=document.getElementById('daily-hero-sub');if(heroSub&&L&&L.dailyHeroSub)heroSub.textContent=L.dailyHeroSub;
  const streak=st.streak||0,best=st.bestStreak||0;
  const sfx=(L&&L.daySuffix)||'일';
  const strEl=document.getElementById('daily-streak-display');if(strEl)strEl.textContent=`${streak}${sfx} ${(L&&L.consecutive)||'연속'}`;
  const bestEl=document.getElementById('daily-best-display');if(bestEl)bestEl.textContent=`${(L&&L.best)||'최고'} ${best}${sfx}`;
  showScreen('daily');
  // Already done?
  if(st.lastDate===today&&st.done){
    document.getElementById('daily-q-section').style.display='none';
    document.getElementById('daily-result-section').style.display='none';
    document.getElementById('daily-done-section').style.display='block';
    document.getElementById('daily-done-score').textContent=`${st.score||0}/5`;
    const doneMsg=document.getElementById('daily-done-msg');if(doneMsg&&L&&L.dailyAlreadyDone)doneMsg.textContent=L.dailyAlreadyDone;
    document.getElementById('daily-done-streak').textContent=`🔥 ${streak}${sfx} ${(L&&L.inStreak)||'연속 중!'}`;
    const doneBack=document.getElementById('daily-done-back-btn');if(doneBack&&L&&L.backHome)doneBack.textContent=L.backHome;
    return;
  }
  document.getElementById('daily-q-section').style.display='block';
  document.getElementById('daily-result-section').style.display='none';
  document.getElementById('daily-done-section').style.display='none';
  _dQs=getDailyQs();_dCur=0;_dRes=[];
  renderDailyQ();
}

function renderDailyQ(){
  const raw=_dQs[_dCur];
  const q=getTranslatedQ(raw);
  for(let i=0;i<5;i++){const dot=document.getElementById('daily-dot-'+i);if(!dot)continue;dot.className='daily-dot';if(i<_dCur)dot.classList.add(_dRes[i]?'correct':'wrong');else if(i===_dCur)dot.classList.add('active');}
  document.getElementById('daily-q-type').textContent=tl(q.typeLabel)||q.type;
  document.getElementById('daily-q-text').textContent=q.q;
  const body=document.getElementById('daily-q-body');
  body.textContent=q.seq||q.analogy||q.premise||'';
  const optsEl=document.getElementById('daily-q-opts');
  optsEl.innerHTML=q.opts.map((o,i)=>`<button class="daily-q-opt" onclick="answerDaily(${i})">${o}</button>`).join('');
  startDailyTimer();
}

function startDailyTimer(){
  clearInterval(_dTmr);_dSec=30;
  const fill=document.getElementById('daily-timer-fill'),txt=document.getElementById('daily-timer-txt');
  if(fill){fill.style.transition='none';fill.style.width='100%';}
  setTimeout(()=>{if(fill){fill.style.transition='width 30s linear';fill.style.width='0%';}},50);
  _dTmr=setInterval(()=>{_dSec--;if(txt)txt.textContent=_dSec;if(_dSec<=0){clearInterval(_dTmr);answerDaily(-1);}},1000);
}

function answerDaily(chosen){
  clearInterval(_dTmr);
  const q=_dQs[_dCur];
  const correct=chosen===q.correct;
  _dRes.push(correct);
  document.querySelectorAll('.daily-q-opt').forEach((btn,i)=>{btn.disabled=true;if(i===q.correct)btn.classList.add('correct');else if(i===chosen&&!correct)btn.classList.add('wrong');});
  setTimeout(()=>{_dCur++;if(_dCur>=5)endDailyChallenge();else renderDailyQ();},700);
}

function endDailyChallenge(){
  const today=localDateStr();
  const score=_dRes.filter(Boolean).length;
  const st=getDSt();
  const yesterday=localDateStr(-86400000);
  let newStreak=1;
  if(st.lastDate===yesterday)newStreak=(st.streak||0)+1;
  else if(st.lastDate===today)newStreak=st.streak||1;
  const best=Math.max(newStreak,st.bestStreak||0);
  setDSt({lastDate:today,done:true,score,streak:newStreak,bestStreak:best});
  updateDailyBanner();
  const L=window.IQ_LANG;
  const sfx=(L&&L.daySuffix)||'일';
  const starsMap=['💪','⭐','⭐⭐','⭐⭐⭐','⭐⭐⭐⭐','⭐⭐⭐⭐⭐'];
  document.getElementById('daily-res-stars').textContent=starsMap[score]||'💪';
  document.getElementById('daily-res-score').textContent=score;
  const sub=document.getElementById('daily-res-sub');if(sub)sub.textContent=`/ 5 ${(L&&L.correct)||'정답'}`;
  document.getElementById('daily-res-streak').textContent=`🔥 ${newStreak}${sfx} ${(L&&L.streakAchieved)||'연속 달성!'}`;
  for(let i=0;i<5;i++){const dot=document.getElementById('daily-dot-'+i);if(dot)dot.className='daily-dot '+(_dRes[i]?'correct':'wrong');}
  const shareBtn=document.getElementById('daily-share-btn');if(shareBtn&&L&&L.dailyShare)shareBtn.textContent=L.dailyShare;
  const backBtn=document.getElementById('daily-back-btn');if(backBtn&&L&&L.backHome)backBtn.textContent=L.backHome;
  document.getElementById('daily-q-section').style.display='none';
  document.getElementById('daily-result-section').style.display='block';
}

function shareDailyResult(){
  const st=getDSt();const score=st.score||0;const streak=st.streak||0;
  const emoji=_dRes.map(r=>r?'🟩':'🟥').join('');
  const L=window.IQ_LANG;
  const url=(L&&L.shareUrl)||'https://all-lifes.com/iq';
  const text=`🧠 ${(L&&L.dailyTitle)||'오늘의 두뇌 챌린지'} ${score}/5\n${emoji}\n🔥 ${streak}${(L&&L.daySuffix)||'일'} ${(L&&L.consecutive)||'연속'} #IQTest\n${url}`;
  if(navigator.share){navigator.share({text}).catch(()=>{});}
  else if(navigator.clipboard){navigator.clipboard.writeText(text).then(()=>{const msg=(L&&L.copied)||'클립보드에 복사됨!';showToast(msg);}).catch(()=>{});}
}

// ── State ──
let currentMode='short',questions=[],curQ=0,answers=[],timer=null,timeLeft=0,testStart=0;
let extTest=null,extQuestions=[],extCurQ=0,extAnswers=[],extTimer=null;
let savedIQ=100,savedTopPct=50;
let savedResultData=null,isSharedView=false;

// ── 홈 누적 응시자 소셜 프루프 카운터 ──
function computeSocialProof(){
  // 전 세계 누적(추정) — 시간에 따라 자연 증가, 과장 없이 보수적 기준값
  const launch=Date.UTC(2025,0,1);
  const days=Math.max(0,(Date.now()-launch)/86400000);
  return Math.round((260000+days*900)/1000)*1000;
}
function renderSocialProof(){
  const numEl=document.getElementById('sp-num');
  if(!numEl)return;
  const lang=window.IQ_CURRENT_LANG||'ko';
  const target=computeSocialProof();
  let fmt;try{fmt=new Intl.NumberFormat(lang);}catch(e){fmt=new Intl.NumberFormat('en');}
  const lbl=document.getElementById('sp-label');
  if(lbl&&t('socialProofLabel'))lbl.textContent=t('socialProofLabel');
  // 즉시 최종값 표기(폴백) 후 count-up (setInterval은 백그라운드에서도 동작)
  numEl.textContent=fmt.format(target)+'+';
  const dur=1100,t0=Date.now();
  const iv=setInterval(()=>{
    const p=Math.min(1,(Date.now()-t0)/dur);
    const eased=1-Math.pow(1-p,3);
    numEl.textContent=fmt.format(Math.round(target*eased))+'+';
    if(p>=1){clearInterval(iv);numEl.textContent=fmt.format(target)+'+';}
  },40);
}

// ── 결과 화면 신규 텍스트 현지화 ──
function applyResultI18n(){
  const set=(id,key)=>{const el=document.getElementById(id);const v=t(key);if(el&&v)el.textContent=v;};
  set('challenge-btn-iq','challengeCta');
  set('res-trust-summary','resTrustSummary');
  set('res-trust-body','resTrustBody');
}

// ── IQ 비교 사다리 (결과 공유 유발 장치) ──
const IQ_LADDER_I18N={
  ko:{title:'🏆 나의 IQ는 어디쯤일까?',sub:'잘 알려진 추정치 기준 비교 (참고용)',you:'나',einstein:'아인슈타인 (추정)',genius:'천재 기준선',mensa:'멘사 가입 기준',college:'대졸자 평균',avg:'세계 평균'},
  en:{title:'🏆 Where Does Your IQ Stand?',sub:'Compared to well-known estimates (for reference)',you:'YOU',einstein:'Einstein (est.)',genius:'Genius threshold',mensa:'Mensa minimum',college:'College grad average',avg:'Global average'},
  de:{title:'🏆 Wo steht dein IQ?',sub:'Im Vergleich zu bekannten Schätzwerten (Richtwerte)',you:'DU',einstein:'Einstein (gesch.)',genius:'Genie-Schwelle',mensa:'Mensa-Minimum',college:'Hochschulabsolventen Ø',avg:'Weltdurchschnitt'},
  fr:{title:'🏆 Où se situe votre QI ?',sub:'Comparé à des estimations connues (à titre indicatif)',you:'VOUS',einstein:'Einstein (est.)',genius:'Seuil de génie',mensa:'Minimum Mensa',college:'Moyenne diplômés',avg:'Moyenne mondiale'},
  es:{title:'🏆 ¿Dónde está tu CI?',sub:'Comparado con estimaciones conocidas (referencia)',you:'TÚ',einstein:'Einstein (est.)',genius:'Umbral de genio',mensa:'Mínimo Mensa',college:'Media universitarios',avg:'Media mundial'},
  pt:{title:'🏆 Onde está o seu QI?',sub:'Comparado a estimativas conhecidas (referência)',you:'VOCÊ',einstein:'Einstein (est.)',genius:'Limiar de gênio',mensa:'Mínimo Mensa',college:'Média universitários',avg:'Média mundial'},
  it:{title:'🏆 Dove si colloca il tuo QI?',sub:'Rispetto a stime note (indicativo)',you:'TU',einstein:'Einstein (stima)',genius:'Soglia del genio',mensa:'Minimo Mensa',college:'Media laureati',avg:'Media mondiale'},
  ja:{title:'🏆 あなたのIQはどのあたり？',sub:'よく知られた推定値との比較（参考値）',you:'あなた',einstein:'アインシュタイン（推定）',genius:'天才の基準',mensa:'MENSA入会基準',college:'大卒平均',avg:'世界平均'},
  id:{title:'🏆 Di Mana Posisi IQ Anda?',sub:'Dibandingkan estimasi terkenal (referensi)',you:'ANDA',einstein:'Einstein (est.)',genius:'Ambang jenius',mensa:'Minimum Mensa',college:'Rata-rata sarjana',avg:'Rata-rata global'},
  hi:{title:'🏆 आपका IQ कहाँ खड़ा है?',sub:'प्रसिद्ध अनुमानों की तुलना में (संदर्भ हेतु)',you:'आप',einstein:'आइंस्टीन (अनुमानित)',genius:'जीनियस सीमा',mensa:'मेन्सा न्यूनतम',college:'स्नातक औसत',avg:'वैश्विक औसत'},
  ru:{title:'🏆 Где находится ваш IQ?',sub:'По сравнению с известными оценками (справочно)',you:'ВЫ',einstein:'Эйнштейн (оценка)',genius:'Порог гениальности',mensa:'Минимум Mensa',college:'Среднее выпускников вузов',avg:'Мировое среднее'},
  vi:{title:'🏆 IQ của bạn đứng ở đâu?',sub:'So với các ước tính nổi tiếng (tham khảo)',you:'BẠN',einstein:'Einstein (ước tính)',genius:'Ngưỡng thiên tài',mensa:'Chuẩn Mensa',college:'TB tốt nghiệp ĐH',avg:'Trung bình thế giới'},
  tr:{title:'🏆 IQ Puanınız Nerede?',sub:'Bilinen tahminlerle karşılaştırma (referans)',you:'SEN',einstein:'Einstein (tahmini)',genius:'Deha eşiği',mensa:'Mensa alt sınırı',college:'Üniversite mezunu ort.',avg:'Dünya ortalaması'},
};
function renderIQLadder(iq){
  const card=document.getElementById('iq-ladder-card');
  if(!card)return;
  const L=IQ_LADDER_I18N[window.IQ_CURRENT_LANG||'ko']||IQ_LADDER_I18N.en;
  const rows=[
    {iq:160,name:L.einstein},
    {iq:145,name:L.genius},
    {iq:132,name:L.mensa},
    {iq:115,name:L.college},
    {iq:100,name:L.avg},
  ];
  rows.push({iq,me:true,name:L.you});
  rows.sort((a,b)=>b.iq-a.iq||(a.me?-1:1));
  card.style.display='';
  card.innerHTML=`<h3>${L.title}</h3><div class="iq-ladder-sub">${L.sub}</div>`+rows.map(r=>
    r.me?`<div class="ladder-row me"><div class="lr-iq">${r.iq}</div><div class="lr-name">${r.name}</div><div class="lr-badge">★</div></div>`
        :`<div class="ladder-row"><div class="lr-iq">${r.iq}</div><div class="lr-name">${r.name}</div></div>`
  ).join('');
}

// ── Theme toggle ──
function updateThemeBtn(){
  const b=document.getElementById('theme-toggle');
  if(b)b.textContent=document.documentElement.getAttribute('data-theme')==='dark'?'☀️':'🌙';
}
function toggleTheme(){
  const r=document.documentElement;
  const next=r.getAttribute('data-theme')==='dark'?'light':'dark';
  r.setAttribute('data-theme',next);
  try{localStorage.setItem('iq_theme',next);}catch(e){}
  updateThemeBtn();
}
document.addEventListener('DOMContentLoaded',updateThemeBtn);

// ── Keyboard shortcuts: 1-4 / A-D answer, S skip ──
document.addEventListener('keydown',e=>{
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  const tgt=e.target;
  if(tgt&&(tgt.tagName==='INPUT'||tgt.tagName==='TEXTAREA'||tgt.isContentEditable))return;
  const iqActive=document.getElementById('screen-test')?.classList.contains('active');
  const extActive=document.getElementById('screen-extended-test')?.classList.contains('active');
  if(!iqActive&&!extActive)return;
  const k=e.key.toLowerCase();
  let idx=-1;
  if(k>='1'&&k<='6')idx=parseInt(k)-1;
  else if(k>='a'&&k<='f'&&k.length===1)idx=k.charCodeAt(0)-97;
  if(idx>=0){
    const card=document.getElementById(iqActive?'q-card':'eq-card');
    const opts=card?card.querySelectorAll('.option'):[];
    if(opts[idx]&&opts[idx].style.pointerEvents!=='none'){e.preventDefault();opts[idx].click();}
  }else if(k==='s'&&iqActive){
    e.preventDefault();skipQ();
  }
});

// ── Leave guard during test ──
window.addEventListener('beforeunload',e=>{
  const testing=document.getElementById('screen-test')?.classList.contains('active')||
                document.getElementById('screen-extended-test')?.classList.contains('active');
  if(testing){e.preventDefault();e.returnValue='';}
});

// ── Affiliate rendering ──
// affiliate-config.js의 오퍼 중 url이 입력된 것만 표시.
// Impact subId1 파라미터로 언어·배치별 성과 추적 (대시보드에서 확인 가능)
function affTrackUrl(o,placement){
  try{
    const u=new URL(o.url);
    if(!u.searchParams.has('subId1'))u.searchParams.set('subId1','iqtest_'+(window.IQ_CURRENT_LANG||'ko')+'_'+placement);
    return u.toString();
  }catch(e){return o.url;}
}
function renderAffiliates(){
  const lang=window.IQ_CURRENT_LANG||'ko';
  const meta=(window.AFFILIATE_META&&(window.AFFILIATE_META[lang]||window.AFFILIATE_META.en))||{};
  const all=(window.AFFILIATE_OFFERS&&(window.AFFILIATE_OFFERS[lang]||window.AFFILIATE_OFFERS.en))||[];
  const offers=all.filter(o=>o.url);
  [['aff-section-iq','res'],['aff-section-ext','ext']].forEach(([cid,placement])=>{
    const el=document.getElementById(cid);
    if(!el)return;
    if(!offers.length){el.style.display='none';return;}
    el.style.display='';
    el.innerHTML=`<h3>${meta.title||'🎁 Recommended'}</h3><div class="aff-disc">${meta.disc||''}</div>
      <div class="aff-cards">${offers.slice(0,2).map(o=>
        `<a class="aff-card" href="${affTrackUrl(o,placement)}" target="_blank" rel="noopener sponsored">
           <span class="aff-tag">${meta.tag||'AD'}</span>
           <div class="aff-icon">${o.icon||'⭐'}</div>
           <div><div class="aff-title">${o.title}</div><div class="aff-desc">${o.desc}</div><div class="aff-cta">${o.cta}</div></div>
         </a>`).join('')}</div>`;
  });
}
document.addEventListener('DOMContentLoaded',renderAffiliates);

// ── 언어 푸터: 현재 언어 하이라이트 ──
document.addEventListener('DOMContentLoaded',()=>{
  const cur=window.IQ_CURRENT_LANG||'ko';
  document.querySelectorAll('.lang-links a').forEach(a=>{
    if(a.dataset.lang===cur)a.classList.add('active');
  });
});

// ── 쿠팡 파트너스 다이내믹 위젯 (ko 전용, 결과 화면 첫 진입 시 lazy 삽입) ──
function ensureCoupangWidget(placement){
  const cfg=window.COUPANG_WIDGET;
  if(!cfg||!cfg.enabled)return;
  if((window.IQ_CURRENT_LANG||'ko')!=='ko')return;
  const sec=document.getElementById(placement==='ext'?'aff-section-ext':'aff-section-iq');
  if(!sec||sec.querySelector('.coupang-widget'))return;
  // 카드 오퍼가 없어 숨겨진 상태면 섹션을 열고 헤더 구성
  if(sec.style.display==='none'){
    const meta=(window.AFFILIATE_META&&window.AFFILIATE_META.ko)||{};
    sec.style.display='';
    sec.innerHTML=`<h3>${meta.title||'🎁 추천'}</h3>`;
  }
  const w=Math.max(cfg.minWidth||300,Math.min(cfg.maxWidth||680,(sec.clientWidth||640)-44));
  const wrap=document.createElement('div');
  wrap.className='coupang-widget';
  wrap.innerHTML=`<iframe src="https://ads-partners.coupang.com/widgets.html?id=${cfg.id}&template=${cfg.template}&trackingCode=${cfg.trackingCode}&subId=iqtest_ko_${placement}&width=${w}&height=${cfg.height}" width="${w}" height="${cfg.height}" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" loading="lazy" browsingtopics></iframe><div class="coupang-disc">${cfg.disclosure||''}</div>`;
  sec.appendChild(wrap);
}

// ── 알리익스프레스 상품 렌더링 (전 언어, 결과 화면 lazy 로드) ──
let _aliCache=null;
async function ensureAliProducts(placement){
  const cfg=window.ALIEXPRESS;
  if(!cfg||!cfg.enabled)return;
  const lang=window.IQ_CURRENT_LANG||'ko';
  const secId=placement==='ext'?'aff-section-ext':'aff-section-iq';
  const sec=document.getElementById(secId);
  if(!sec||sec.querySelector('.ali-grid'))return;
  try{
    if(!_aliCache){
      const resp=await fetch(cfg.endpoint+'?lang='+lang);
      if(!resp.ok)return;
      _aliCache=await resp.json();
    }
    const items=(_aliCache.products||[]).slice(0,cfg.maxItems||4);
    if(!items.length)return;
    // 섹션이 숨겨져 있으면 헤더와 함께 열기
    const meta=(window.AFFILIATE_META&&(window.AFFILIATE_META[lang]||window.AFFILIATE_META.en))||{};
    if(sec.style.display==='none'){
      sec.style.display='';
      sec.innerHTML=`<h3>${meta.title||'🎁 Picks for You'}</h3><div class="aff-disc">${meta.disc||''}</div>`;
    }
    const wrap=document.createElement('div');
    wrap.className='ali-grid';
    wrap.innerHTML=items.map(p=>
      `<a class="ali-card" href="${p.url}" target="_blank" rel="noopener sponsored">
         <img class="ali-img" src="${p.image}" alt="" loading="lazy">
         <div class="ali-title">${String(p.title).replace(/[<>]/g,'').slice(0,60)}</div>
         <div class="ali-price">${p.price} ${p.currency}</div>
       </a>`).join('');
    sec.appendChild(wrap);
    setTimeout(sendResize,300);
  }catch(e){}
}

// ── AdSense: SPA 화면 전환 시 보이는 광고만 push ──
// display:none 상태에서 push하면 폭 0으로 실패 → 보이는 유닛만, 한 번에 하나씩 순차 push
// (연속 push는 구글 스크립트 처리 race로 일부 유닛이 누락됨)
let _adPushTries=0;
function pushVisibleAds(){
  let pending=[];
  try{
    pending=Array.from(document.querySelectorAll('ins.adsbygoogle:not([data-adsbygoogle-status])')).filter(i=>i.offsetParent);
  }catch(e){return;}
  if(!pending.length||_adPushTries>20)return;
  _adPushTries++;
  // push 에러(숨김 유닛 width=0 등)가 나도 재시도 체인은 유지
  try{(window.adsbygoogle=window.adsbygoogle||[]).push({});}catch(e){}
  setTimeout(pushVisibleAds,450);
}
document.addEventListener('DOMContentLoaded',()=>{setTimeout(pushVisibleAds,400);});

// ── Navigation ──
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-'+id).classList.add('active');
  window.scrollTo(0,0);
  setTimeout(sendResize,150);
  setTimeout(pushVisibleAds,250);
  if(id==='results'){ensureCoupangWidget('res');ensureAliProducts('res');}
  else if(id==='ext-results'){ensureCoupangWidget('ext');ensureAliProducts('ext');}
}
function scrollToExt(){showScreen('results');setTimeout(()=>{const el=document.getElementById('ext-grid');if(el)el.scrollIntoView({behavior:'smooth'});},300);}
function restartAll(){showScreen('home');}
function switchMode(){startTest(currentMode==='short'?'long':'short');}

// ── BRAIN TRAINING ──
let btPrevScreen='results';
function btL(){return(window.IQ_LANG&&window.IQ_LANG.bt)||null;}
function btFmt(tpl,vars){return tpl?tpl.replace(/\{(\w+)\}/g,(_,k)=>vars[k]!=null?vars[k]:_):'';}
function showBrainTraining(){
  const cur=document.querySelector('.screen.active');
  btPrevScreen=cur?cur.id.replace('screen-',''):'results';
  showScreen('brain-training');
  const iq=savedIQ||100;
  const B=btL();
  const badge=document.getElementById('bt-iq-badge-text');
  if(badge)badge.textContent=B?btFmt(B.badge,{iq}):`내 IQ: ${iq}점`;
  const msg=document.getElementById('bt-hero-msg');
  if(msg){
    if(B){
      msg.textContent=iq<90?btFmt(B.msgLow,{iq}):iq<110?btFmt(B.msgMid,{iq}):iq<130?btFmt(B.msgHigh,{iq}):btFmt(B.msgTop,{iq});
    }else{
      if(iq<90)msg.textContent=`IQ ${iq}점 — 지금부터가 시작입니다! 뇌가소성 연구는 지능이 훈련으로 실질적으로 향상될 수 있음을 증명합니다. 매일 5분 훈련이 뇌 구조 자체를 변화시킵니다.`;
      else if(iq<110)msg.textContent=`IQ ${iq}점 — 탄탄한 기반을 갖추고 있습니다. 두뇌 훈련으로 작업 기억과 처리 속도를 높이면 인지 능력 전반이 눈에 띄게 향상됩니다.`;
      else if(iq<130)msg.textContent=`IQ ${iq}점 — 뛰어난 두뇌입니다! 꾸준한 인지 훈련은 최상위 수행을 유지하고 노화에 따른 인지 저하를 효과적으로 늦춥니다.`;
      else msg.textContent=`IQ ${iq}점 — 탁월한 지능입니다! 도전적인 인지 훈련으로 뇌의 한계를 계속 넓히고 신경 회로의 효율성을 극대화하세요.`;
    }
  }
  const backBtn=document.getElementById('bt-back-btn');
  if(backBtn)backBtn.onclick=()=>showScreen(btPrevScreen);
}

// ── STROOP TEST ──
const SCOLS_KO=[{n:'빨강',c:'#ef4444'},{n:'파랑',c:'#3b82f6'},{n:'초록',c:'#22c55e'},{n:'노랑',c:'#eab308'}];
function getSCOLS(){const B=btL();const names=B&&B.colors?B.colors:null;if(!names)return SCOLS_KO;return[{n:names[0],c:'#ef4444'},{n:names[1],c:'#3b82f6'},{n:names[2],c:'#22c55e'},{n:names[3],c:'#eab308'}];}
let sSt=null;
function startStroop(){
  document.getElementById('stroop-area').classList.add('active');
  const B=btL();document.getElementById('stroop-start-btn').textContent=B?B.playing:'■ 진행 중...';
  sSt={r:0,ok:0,ms:0};nextStroop();
}
function nextStroop(){
  if(!sSt)return;
  if(sSt.r>=10){endStroop();return;}
  sSt.r++;
  document.getElementById('stroop-prog').textContent=`${sSt.r} / 10`;
  const SCOLS=getSCOLS();
  const wi=Math.floor(Math.random()*4);
  let ii;do{ii=Math.floor(Math.random()*4);}while(ii===wi);
  const w=document.getElementById('stroop-word');
  w.textContent=SCOLS[wi].n;w.style.color=SCOLS[ii].c;
  sSt.ink=ii;sSt.t0=Date.now();
  document.getElementById('stroop-opts').innerHTML=[0,1,2,3].sort(()=>Math.random()-.5).map(i=>
    `<button class="stroop-opt" style="background:${SCOLS[i].c}" onclick="answerStroop(${i})">${SCOLS[i].n}</button>`
  ).join('');
  let sec=3;
  const tEl=document.getElementById('stroop-timer');
  if(tEl)tEl.textContent=`${sec}s`;
  clearInterval(sSt.iv);
  sSt.iv=setInterval(()=>{sec--;const e=document.getElementById('stroop-timer');if(e)e.textContent=`${sec}s`;if(sec<=0){clearInterval(sSt.iv);answerStroop(-1);}},1000);
}
function answerStroop(chosen){
  if(!sSt)return;clearInterval(sSt.iv);
  if(chosen===sSt.ink){sSt.ok++;sSt.ms+=Date.now()-sSt.t0;}
  document.getElementById('stroop-opts').querySelectorAll('button').forEach(b=>b.disabled=true);
  setTimeout(nextStroop,350);
}
function endStroop(){
  document.getElementById('stroop-area').classList.remove('active');
  const B=btL();document.getElementById('stroop-start-btn').textContent=B?B.replay:'▶ 다시 하기';
  const acc=Math.round(sSt.ok/10*100);
  const avg=sSt.ok>0?Math.round(sSt.ms/sSt.ok):0;
  const box=document.getElementById('stroop-score-box');
  box.textContent=B?btFmt(B.stroopScore,{acc,avg}):`정확도 ${acc}% · 평균 ${avg}ms`;
  box.style.color=acc>=80?'var(--success)':acc>=60?'var(--warning)':'var(--danger)';
  sSt=null;
}

// ── MEMORY GRID ──
let mSt=null;
function startMemgrid(){
  document.getElementById('memgrid-area').classList.add('active');
  const B=btL();document.getElementById('memgrid-start-btn').textContent=B?B.playing:'■ 진행 중...';
  mSt={lv:1,sc:0};runMemLv();
}
function runMemLv(){
  if(!mSt)return;
  const sz=3,total=sz*sz,litN=2+mSt.lv;
  const lit=[...Array(total).keys()].sort(()=>Math.random()-.5).slice(0,litN);
  mSt.lit=lit;mSt.sel=[];
  const csz='clamp(44px,11vw,58px)';
  const grid=document.getElementById('memgrid-grid');
  grid.style.gridTemplateColumns=`repeat(${sz},1fr)`;
  grid.innerHTML=[...Array(total)].map((_,i)=>
    `<div class="memgrid-cell${lit.includes(i)?' lit':''}" data-i="${i}" style="width:${csz};height:${csz};"></div>`
  ).join('');
  const B=btL();
  document.getElementById('memgrid-status').textContent=B?btFmt(B.memLevel,{lv:mSt.lv,n:litN}):`레벨 ${mSt.lv} — 패턴 기억 (${litN}칸)`;
  document.getElementById('memgrid-confirm-btn').style.display='none';
  setTimeout(()=>{
    if(!mSt)return;
    grid.querySelectorAll('.memgrid-cell').forEach(c=>{
      c.classList.remove('lit');
      c.onclick=()=>memClick(c,parseInt(c.dataset.i));
    });
    document.getElementById('memgrid-status').textContent=B?B.memClickHint:'기억한 칸을 클릭하세요';
    document.getElementById('memgrid-confirm-btn').style.display='inline-block';
  },1600);
}
function memClick(cell,idx){
  if(!mSt)return;
  if(mSt.sel.includes(idx)){mSt.sel=mSt.sel.filter(i=>i!==idx);cell.classList.remove('selected');}
  else{mSt.sel.push(idx);cell.classList.add('selected');}
}
function confirmMemgrid(){
  if(!mSt)return;
  const lit=new Set(mSt.lit),sel=new Set(mSt.sel);
  document.getElementById('memgrid-grid').querySelectorAll('.memgrid-cell').forEach(c=>{
    const i=parseInt(c.dataset.i);c.onclick=null;
    if(lit.has(i)&&sel.has(i))c.classList.add('correct');
    else if(!lit.has(i)&&sel.has(i))c.classList.add('wrong');
    else if(lit.has(i)&&!sel.has(i))c.classList.add('lit');
  });
  const ok=[...lit].every(i=>sel.has(i))&&[...sel].every(i=>lit.has(i));
  if(ok)mSt.sc++;
  const Bm=btL();document.getElementById('memgrid-status').textContent=ok?(Bm?Bm.memCorrect:'✓ 정확합니다!'):(Bm?Bm.memWrong:'✗ 틀렸습니다');
  document.getElementById('memgrid-confirm-btn').style.display='none';
  setTimeout(()=>{if(ok&&mSt.lv<5){mSt.lv++;runMemLv();}else endMemgrid();},900);
}
function endMemgrid(){
  document.getElementById('memgrid-area').classList.remove('active');
  const B=btL();document.getElementById('memgrid-start-btn').textContent=B?B.replay:'▶ 다시 하기';
  const box=document.getElementById('memgrid-score-box');
  box.textContent=B?btFmt(B.memResult,{lv:mSt.lv,sc:mSt.sc}):`레벨 ${mSt.lv} 도달 · ${mSt.sc}/5 통과`;
  box.style.color=mSt.lv>=4?'var(--success)':mSt.lv>=2?'var(--warning)':'var(--danger)';
  mSt=null;
}

// ── REACTION (GO/NO-GO) ──
let rxSt=null;
function startReaction(){
  document.getElementById('reaction-area').classList.add('active');
  const B=btL();document.getElementById('reaction-start-btn').textContent=B?B.playing:'■ 진행 중...';
  rxSt={ok:0,wrong:0,t:30,tapped:false};
  document.getElementById('rx-live').textContent=B?btFmt(B.rxLive,{ok:0,wrong:0}):'정답: 0 · 오답: 0';
  const fill=document.getElementById('rx-bar-fill');
  fill.style.transition='none';fill.style.width='100%';
  setTimeout(()=>{fill.style.transition='width 30s linear';fill.style.width='0%';},50);
  rxSt.iv=setInterval(()=>{rxSt.t--;if(rxSt.t<=0){clearInterval(rxSt.iv);clearTimeout(rxSt.st);endReaction();}},1000);
  showNextRx();
}
function showNextRx(){
  if(!rxSt||rxSt.t<=0)return;
  const n=Math.floor(Math.random()*9)+1;
  rxSt.n=n;rxSt.odd=n%2!==0;rxSt.tapped=false;
  const tgt=document.getElementById('rx-target');
  tgt.textContent=n;tgt.className='rx-target '+(rxSt.odd?'go':'nogo');
  rxSt.st=setTimeout(()=>{if(!rxSt.tapped&&rxSt.odd){rxSt.wrong++;updateRxLive();}showNextRx();},1100);
}
function reactionTap(){
  if(!rxSt||rxSt.tapped)return;
  rxSt.tapped=true;clearTimeout(rxSt.st);
  if(rxSt.odd)rxSt.ok++;else rxSt.wrong++;
  updateRxLive();setTimeout(showNextRx,180);
}
function updateRxLive(){const B=btL();const el=document.getElementById('rx-live');if(el)el.textContent=B?btFmt(B.rxLive,{ok:rxSt.ok,wrong:rxSt.wrong}):`정답: ${rxSt.ok} · 오답: ${rxSt.wrong}`;}
function endReaction(){
  document.getElementById('reaction-area').classList.remove('active');
  const B=btL();document.getElementById('reaction-start-btn').textContent=B?B.replay:'▶ 다시 하기';
  const tot=rxSt.ok+rxSt.wrong,acc=tot>0?Math.round(rxSt.ok/tot*100):0;
  const box=document.getElementById('reaction-score-box');
  box.textContent=B?btFmt(B.rxResult,{ok:rxSt.ok,acc}):`정답 ${rxSt.ok}회 · 정확도 ${acc}%`;
  box.style.color=acc>=80?'var(--success)':acc>=60?'var(--warning)':'var(--danger)';
  rxSt=null;
}

// ── Start test ──
function startTest(mode){
  currentMode=mode;
  document.getElementById('inst-title').textContent=t(mode==='short'?'instTitle_short':'instTitle_long')||(mode==='short'?'단기 IQ 테스트 안내':'정밀 IQ 테스트 안내');
  document.getElementById('inst-sub').textContent=t(mode==='short'?'instSub_short':'instSub_long')||(mode==='short'?'15문항 · 약 12분 · 수열·행렬·논리·유추 영역':'40문항 · 약 28분 · 4개 영역 심층 분석');
  document.getElementById('inst-time-info').textContent=t(mode==='short'?'instTime_short':'instTime_long')||(mode==='short'?'난이도에 따라 45~95초 제한이 적용됩니다':'문항 난이도별 45~95초 제한이 적용됩니다');
  showScreen('instructions');
}

function beginTest(){
  questions=currentMode==='short'?buildShortSet():buildLongSet();
  curQ=0;answers=[];testStart=Date.now();
  showScreen('test');renderQ();
}

// ── Timer ──
function getTimeLimit(q){return({1:45,2:60,3:72,4:82,5:95})[q.difficulty]||65;}
function updateTimerUI(val){
  document.getElementById('timer-val').textContent=val;
  const w=document.getElementById('timer-wrap');
  w.className='timer-display'+(val<=10?' danger':val<=20?' warning':'');
}

// ── Render question ──
function renderQ(){
  clearInterval(timer);
  const q=questions[curQ],tot=questions.length;
  document.getElementById('q-prog-text').textContent=tp('qProg',{n:curQ+1,tot})||`문항 ${curQ+1} / ${tot}`;
  document.getElementById('q-type-lbl').textContent=tl(q.typeLabel);
  document.getElementById('progress-fill').style.width=(curQ/tot*100)+'%';
  timeLeft=getTimeLimit(q);
  updateTimerUI(timeLeft);
  timer=setInterval(()=>{timeLeft--;updateTimerUI(timeLeft);if(timeLeft<=0){clearInterval(timer);autoSkip();}},1000);
  const card=document.getElementById('q-card');
  card.innerHTML=buildQHTML(q,curQ);
  card.style.animation='none';void card.offsetHeight;card.style.animation='slideIn .3s ease';
}

function getTranslatedQ(q){
  const IQ=window.IQ_Q;if(!IQ)return q;
  const r=Object.assign({},q);
  if(q.type==='sequence'){if(IQ.qSeqPrompt)r.q=IQ.qSeqPrompt;return r;}
  if(q.type==='matrix'){if(IQ.qMatPrompt)r.q=IQ.qMatPrompt;return r;}
  const pool=IQ[q._pool];
  if(pool&&pool[q._poolIdx]){
    const tq=pool[q._poolIdx];
    if(q.type==='analogy'){if(IQ.qAnaPrompt)r.q=IQ.qAnaPrompt;if(tq.analogy)r.analogy=tq.analogy;if(tq.opts)r.opts=tq.opts;}
    else if(q.type==='logic'){if(IQ.qLogPrompt)r.q=IQ.qLogPrompt;if(tq.premise)r.premise=tq.premise;if(tq.opts)r.opts=tq.opts;}
    else if(q.type==='spatial'){if(tq.q)r.q=tq.q;if(tq.opts)r.opts=tq.opts;}
  }
  return r;
}

function buildQHTML(q,idx){
  let tq=getTranslatedQ(q);
  // Shuffle option order to eliminate systematic answer-position bias
  const perm=[0,1,2,3];
  for(let i=3;i>0;i--){const j=Math.floor(Math.random()*(i+1));[perm[i],perm[j]]=[perm[j],perm[i]];}
  tq={...tq,opts:perm.map(p=>tq.opts[p]),correct:perm.indexOf(tq.correct)};
  questions[curQ].correct=tq.correct;
  const typeLabel=tl(q.typeLabel);
  const qNum=tp('qNum',{n:idx+1})||`문항 ${idx+1}`;
  let html=`<div class="q-num">${qNum} &nbsp;·&nbsp;<span class="tag" style="background:var(--primary-bg);color:var(--primary-mid)">${typeLabel}</span></div>
    <div class="q-text">${tq.q}</div>`;
  if(tq.type==='sequence') html+=`<div class="q-seq">${tq.seq}</div>`;
  else if(tq.type==='matrix') html+=buildMatrixHTML(tq.matrix);
  else if(tq.type==='analogy') html+=`<div class="q-sub" style="font-size:18px;font-weight:700;color:var(--text);padding:14px;background:var(--primary-bg);border-radius:12px;margin:10px 0 20px;">${tq.analogy}</div>`;
  else if(tq.type==='logic') html+=`<div class="q-premise">${tq.premise}</div>`;
  html+=`<div class="options-grid">`;
  ['A','B','C','D'].forEach((L,i)=>{html+=`<div class="option" id="opt${i}" onclick="selectAns(${i})"><div class="opt-letter">${L}</div><div class="opt-text">${tq.opts[i]}</div></div>`;});
  html+=`</div><div class="q-nav"><span class="q-nav-hint">${t('qAutoNext')||'선택 후 자동으로 다음 문항으로 넘어갑니다'}<span class="kbd-hint">⌨ 1–4 · S</span></span><button class="btn btn-secondary btn-sm" onclick="skipQ()">${t('qSkip')||'건너뛰기 →'}</button></div>`;
  return html;
}

function buildMatrixHTML(matrix){
  let html=`<div class="matrix-wrap"><div class="matrix-grid">`;
  matrix.forEach(row=>row.forEach(cell=>{
    const isQ=cell==='?';
    html+=`<div class="matrix-cell${isQ?' qmark':''}">${cell}</div>`;
  }));
  return html+`</div></div>`;
}

let _ansLock=false; // 답변 후 피드백 지연 중 스킵/중복 입력 방지
function selectAns(idx){
  if(_ansLock)return;
  _ansLock=true;
  clearInterval(timer);
  const q=questions[curQ];
  answers[curQ]={selected:idx,correct:q.correct};
  document.querySelectorAll('#q-card .option').forEach((el,i)=>{
    el.style.pointerEvents='none';
    if(q.correct!==undefined&&i===q.correct)el.classList.add('correct');
    if(i===idx&&idx!==q.correct)el.classList.add('wrong');
    if(i===idx)el.classList.add('selected');
  });
  setTimeout(advanceQ,950);
}
function skipQ(){if(_ansLock)return;_ansLock=true;clearInterval(timer);answers[curQ]={selected:-1,correct:questions[curQ].correct};advanceQ();}
function autoSkip(){if(_ansLock)return;_ansLock=true;answers[curQ]={selected:-1,correct:questions[curQ].correct};advanceQ();}
function advanceQ(){curQ++;_ansLock=false;if(curQ>=questions.length)finishTest();else renderQ();}

// ── Finish test ──
function finishTest(){
  clearInterval(timer);showScreen('calculating');
  ['cs1','cs2','cs3','cs4','cs5'].forEach((id,i)=>{
    setTimeout(()=>{
      document.getElementById(id).classList.add('vis');
      if(i===4)setTimeout(()=>{computeResults();showScreen('results');},500);
    },i*500+300);
  });
}

// ── IQ Computation ──
function calcIQ(correct,total){
  const mean=total*0.55,sd=total*0.14;
  const z=(correct-mean)/sd;
  return Math.max(55,Math.min(145,Math.round(100+z*15)));
}
function getIQCat(iq){return iqCats.find(c=>iq>=c.min)||iqCats[iqCats.length-1];}

// ── 인지 유형(아키타입) — 도메인 강점으로 기억하기 쉬운 '두뇌 타입' 산출 ──
const DOMAIN_TO_TYPE={'수열 추론':'PATTERN','행렬 패턴':'ABSTRACT','공간 추론':'SPATIAL','논리 추론':'LOGIC','유추':'VERBAL','언어 유추':'VERBAL'};
// 기본 언어(한국어) 폴백 — 타 언어는 lang/*.js의 cogTypes에서 로드
const COGTYPE_FALLBACK={
  PATTERN:{name:'패턴 마스터',emoji:'🔢',blurb:'숫자와 규칙 속에 숨은 질서를 꿰뚫어 보는 두뇌입니다.',strengths:['수열·규칙 추론','빠른 패턴 인식','수리적 직관']},
  ABSTRACT:{name:'추상 설계자',emoji:'🧩',blurb:'복잡한 정보에서 본질적 구조를 추출하는 데 탁월합니다.',strengths:['행렬·도식 분석','추상적 사고','구조 파악']},
  SPATIAL:{name:'공간 항해사',emoji:'🧭',blurb:'머릿속에서 형태를 자유자재로 회전·조립하는 시각형 두뇌입니다.',strengths:['공간 지각','3차원 회전','시각적 상상력']},
  LOGIC:{name:'논리 전략가',emoji:'⚖️',blurb:'전제에서 결론까지 빈틈없이 추론하는 사고의 설계자입니다.',strengths:['연역 추론','모순 탐지','논리적 일관성']},
  VERBAL:{name:'통찰의 연결자',emoji:'🔗',blurb:'서로 멀리 떨어진 개념 사이의 관계를 직관적으로 잇습니다.',strengths:['유추·관계 추론','개념 연결','언어적 통찰']},
  POLYMATH:{name:'균형의 폴리매스',emoji:'🌟',blurb:'특정 영역에 치우치지 않고 전 영역에서 고르게 강한 만능형입니다.',strengths:['전 영역 균형','유연한 사고','종합적 문제해결']},
};
function deriveCognitiveType(){
  const areas=(typeof getAreaScores==='function')?getAreaScores():{};
  const agg={};
  Object.entries(areas).forEach(([k,v])=>{
    if(!v.total)return;
    const ty=DOMAIN_TO_TYPE[k]||'LOGIC';
    (agg[ty]=agg[ty]||[]).push(v.correct/v.total);
  });
  const ranked=Object.entries(agg).map(([ty,arr])=>({ty,acc:arr.reduce((a,b)=>a+b,0)/arr.length})).sort((a,b)=>b.acc-a.acc);
  if(!ranked.length)return 'POLYMATH';
  if(ranked.length>=2&&(ranked[0].acc-ranked[1].acc)<0.10)return 'POLYMATH';
  return ranked[0].ty;
}
function cogType(code){
  const L=window.IQ_LANG&&window.IQ_LANG.cogTypes;
  return (L&&L[code])||COGTYPE_FALLBACK[code]||COGTYPE_FALLBACK.POLYMATH;
}
function renderCogType(code){
  const el=document.getElementById('cog-type-block');
  if(!el)return;
  const c=cogType(code);
  el.style.display='';
  el.innerHTML=`<div class="ct-emoji">${c.emoji}</div><div class="ct-name">${c.name}</div><div class="ct-blurb">${c.blurb}</div>`
    +`<div class="ct-strengths">${(c.strengths||[]).map(s=>`<span>${s}</span>`).join('')}</div>`;
}

// ── Wordle식 스포일러-프리 결과 그리드(공유용) ──
function buildResultGrid(ans){
  const a=ans||answers;
  if(!a||!a.length)return '';
  const cells=a.map(x=>(!x||x.selected===-1)?'⬜':(x.selected===x.correct?'🟩':'🟥'));
  let out='';
  for(let i=0;i<cells.length;i+=5){out+=cells.slice(i,i+5).join('')+'\n';}
  return out.trim();
}

function computeResults(){
  // 공유 보기 상태 해제 (공유 링크로 본 뒤 직접 응시한 경우)
  isSharedView=false;
  const _sb=document.getElementById('shared-banner-iq');if(_sb)_sb.style.display='none';
  const _swb=document.getElementById('switch-btn');if(_swb)_swb.style.display='';
  const correct=answers.filter(a=>a&&a.selected!==-1&&a.selected===a.correct).length;
  const total=questions.length;
  const iq=calcIQ(correct,total);
  const pctile=getIQPercentile(iq);
  const topPct=100-pctile;
  const cat=getIQCat(iq);
  const elapsed=Math.round((Date.now()-testStart)/1000);
  savedIQ=iq;savedTopPct=topPct;
  const typeCode=deriveCognitiveType();
  savedResultData={iq,cat:cat.label,topPct,mode:currentMode,correct,total,typeCode,grid:buildResultGrid()};
  renderCogType(typeCode);

  document.getElementById('res-test-label').textContent=t(currentMode==='short'?'resTestLabel_short':'resTestLabel_long')||(currentMode==='short'?'Short IQ Test Result':'Full IQ Test Result');
  document.getElementById('res-iq').textContent=iq;
  const catLang=window.IQ_LANG&&window.IQ_LANG.iqCats?window.IQ_LANG.iqCats.find(c=>iq>=c.min)||window.IQ_LANG.iqCats[window.IQ_LANG.iqCats.length-1]:null;
  const catLabel=catLang?catLang.label:cat.label;
  const catDesc=catLang?catLang.desc:cat.desc;
  document.getElementById('res-cat').textContent=catLabel;
  document.getElementById('res-cat').style.color=cat.color;
  document.getElementById('res-desc').textContent=catDesc;
  document.getElementById('r-correct').textContent=`${correct}/${total}`;
  document.getElementById('r-acc').textContent=Math.round(correct/total*100)+'%';
  const timeT=t('timeStr');
  document.getElementById('r-time').textContent=timeT?timeT.replace('{m}',Math.floor(elapsed/60)).replace('{s}',elapsed%60):(Math.floor(elapsed/60)+'m '+(elapsed%60)+'s');
  document.getElementById('r-top').textContent=topPct;
  document.getElementById('res-pct-label').textContent=tp('topPctStr',{n:topPct})||`상위 ${topPct}%`;
  document.getElementById('pct-text').textContent=tp('topPctStr',{n:topPct})||`상위 ${topPct}%`;
  document.getElementById('switch-btn').textContent=currentMode==='short'?(t('switchToLong')||'📝 Full Test'):(t('switchToShort')||'⚡ Short Test');
  const retakeBtn=document.getElementById('retake-btn');if(retakeBtn)retakeBtn.textContent=t('retake')||'🔁 Restart';

  // Share card update
  document.getElementById('sc-iq').textContent=iq;
  document.getElementById('sc-cat').textContent=catLabel.split(' ')[0];
  document.getElementById('sc-pct').textContent=tp('topPctStr',{n:topPct})||`상위 ${topPct}%`;

  setTimeout(()=>{document.getElementById('pct-fill').style.width=pctile+'%';},300);
  setTimeout(()=>{
    const bellCard=document.querySelector('.chart-card.full h3');if(bellCard)bellCard.textContent=t('bellTitle')||'📊 IQ Distribution in General Population';
    drawBellCurve('bellChart',iq,'#4f46e5');
    renderIQLadder(iq);
    if(currentMode==='long'){
      const radarWrap=document.getElementById('radar-wrap');const bdWrap=document.getElementById('breakdown-wrap');
      radarWrap.classList.remove('hidden');bdWrap.classList.remove('hidden');
      const radarH3=radarWrap.querySelector('h3');if(radarH3)radarH3.textContent=t('radarTitle')||'🔍 Cognitive Profile by Domain';
      const bdH3=bdWrap.querySelector('h3');if(bdH3)bdH3.textContent=t('areaTitle')||'Score by Domain';
      drawRadarChart();renderBreakdown();
    }
  },400);
  buildExtGrid();
  saveIQHistory(iq,currentMode);
  showBrainAgeCard(iq,'iq');
  renderIQHistory('history-card-iq');
  _showChatFAB();
}

// ── Bell Curve ──
// 같은 캔버스에 재렌더링 시 기존 차트 제거 (Chart.js 'Canvas is already in use' 방지)
function _destroyChart(canvas){
  try{if(window.Chart&&Chart.getChart){const p=Chart.getChart(canvas);if(p)p.destroy();}}catch(e){}
}
function drawBellCurve(canvasId,score,color='#4f46e5',mean=100,sd=15){
  const cv=document.getElementById(canvasId);
  _destroyChart(cv);
  const ctx=cv.getContext('2d');
  const labels=[],normal=[],filled=[];
  for(let x=mean-3.5*sd;x<=mean+3.5*sd;x+=sd/9){
    labels.push(Math.round(x));
    const z=(x-mean)/sd;
    const y=Math.exp(-0.5*z*z)/(sd*Math.sqrt(2*Math.PI));
    normal.push(y);
    filled.push(x<=score?y:null);
  }
  new Chart(ctx,{
    type:'line',
    data:{labels,datasets:[
      {label:t('bellLabelAll')||'전체 분포',data:normal,borderColor:'rgba(79,70,229,.35)',backgroundColor:'rgba(79,70,229,.07)',fill:true,tension:.4,pointRadius:0,borderWidth:2},
      {label:t('bellLabelMe')||'나의 위치',data:filled,borderColor:color,backgroundColor:color+'28',fill:true,tension:.4,pointRadius:0,borderWidth:2.5}
    ]},
    options:{responsive:true,plugins:{legend:{labels:{color:'#475569',font:{size:11}}}},scales:{x:{ticks:{color:'#94a3b8',maxTicksLimit:10},grid:{color:'rgba(0,0,0,.05)'}},y:{display:false}}}
  });
}

// ── Radar Chart ──
function getAreaScores(){
  const a={};
  questions.forEach((q,i)=>{
    const k=q.typeLabel;
    if(!a[k])a[k]={correct:0,total:0};
    a[k].total++;
    if(answers[i]&&answers[i].selected===answers[i].correct)a[k].correct++;
  });
  return a;
}
function drawRadarChart(){
  const areas=getAreaScores();
  const labels=Object.keys(areas).filter(k=>areas[k].total>0);
  const data=labels.map(k=>Math.round(areas[k].correct/areas[k].total*100));
  const cv=document.getElementById('radarChart');
  _destroyChart(cv);
  const ctx=cv.getContext('2d');
  new Chart(ctx,{type:'radar',data:{labels:labels.map(k=>tl(k)),datasets:[{label:t('radarAccLabel')||'Domain Accuracy (%)',data,borderColor:'#4f46e5',backgroundColor:'rgba(79,70,229,.15)',pointBackgroundColor:'#4f46e5',pointBorderColor:'#fff',borderWidth:2}]},options:{responsive:true,scales:{r:{min:0,max:100,ticks:{color:'#94a3b8',backdropColor:'transparent',stepSize:25},grid:{color:'rgba(0,0,0,.07)'},pointLabels:{color:'#475569',font:{size:11}}}},plugins:{legend:{labels:{color:'#475569',font:{size:11}}}}}});
}
function renderBreakdown(){
  const areas=getAreaScores();
  const colors=['#4f46e5','#0284c7','#7c3aed','#059669','#d97706'];
  let html='';
  Object.entries(areas).filter(([,v])=>v.total>0).forEach(([name,v],i)=>{
    const pct=Math.round(v.correct/v.total*100);
    html+=`<div class="bd-item"><div class="bd-name">${tl(name)}</div><div class="bd-bar"><div class="bd-fill" style="width:0%;background:${colors[i%colors.length]}" data-w="${pct}"></div></div><div class="bd-score" style="color:${colors[i%colors.length]}">${pct}%</div></div>`;
  });
  document.getElementById('bd-list').innerHTML=html;
  setTimeout(()=>{document.querySelectorAll('#bd-list .bd-fill').forEach(el=>{el.style.width=el.dataset.w+'%';});},300);
}

// ── Extended test grid ──
function buildExtGrid(){
  const extLang=window.IQ_LANG&&window.IQ_LANG.extTests||{};
  const free=t('freeBadge')||'무료';
  const list=[
    {id:'eq',title:extLang.eq?extLang.eq.title:'감성 지수 (EQ)',icon:'💛',desc:extLang.eq?extLang.eq.desc:'공감·감정 조절·사회적 기술',time:extLang.eq?extLang.eq.time:'12분'},
    {id:'memory',title:extLang.memory?extLang.memory.title:'작업 기억력',icon:'🧩',desc:extLang.memory?extLang.memory.desc:'단기 기억 및 정보 유지 능력',time:extLang.memory?extLang.memory.time:'8분'},
    {id:'speed',title:extLang.speed?extLang.speed.title:'처리 속도',icon:'⚡',desc:extLang.speed?extLang.speed.desc:'정보 처리 속도 및 반응 정확도',time:extLang.speed?extLang.speed.time:'5분'},
    {id:'creativity',title:extLang.creativity?extLang.creativity.title:'창의성 지수',icon:'🎨',desc:extLang.creativity?extLang.creativity.desc:'발산적 사고 및 창의적 해결',time:extLang.creativity?extLang.creativity.time:'12분'},
    {id:'focus',title:extLang.focus?extLang.focus.title:'집중력 & 주의력',icon:'🎯',desc:extLang.focus?extLang.focus.desc:'주의력 지속 및 세밀 처리',time:extLang.focus?extLang.focus.time:'8분'},
    {id:'cog_flex',title:extLang.cog_flex?extLang.cog_flex.title:'인지 유연성',icon:'🔄',desc:extLang.cog_flex?extLang.cog_flex.desc:'사고 전환 및 적응 능력',time:extLang.cog_flex?extLang.cog_flex.time:'10분'}
  ];
  document.getElementById('ext-grid').innerHTML=list.map(tx=>`
    <div class="ext-card" onclick="startExtTest('${tx.id}')">
      <div class="ec-icon">${tx.icon}</div>
      <h4>${tx.title}</h4>
      <p>${tx.desc}</p>
      <div class="ec-meta"><span class="badge badge-blue">⏱ ${tx.time}</span><span class="badge badge-green">${free}</span></div>
    </div>`).join('');
}

// ── Extended test engine ──
function startExtTest(id){
  extTest={...extendedTests[id]};
  const extLang=window.IQ_LANG&&window.IQ_LANG.extTests&&window.IQ_LANG.extTests[id];
  if(extLang&&extLang.title)extTest.title=extLang.title;
  const extQT=window.IQ_LANG&&window.IQ_LANG.extQuestions&&window.IQ_LANG.extQuestions[id];
  const qList=extQT&&extQT.questions;
  const qs=extTest.questions.map((q,i)=>qList&&qList[i]?Object.assign({},q,{q:qList[i].q||q.q,opts:qList[i].opts||q.opts}):q);
  extQuestions=shuffle(qs);
  extCurQ=0;extAnswers=[];
  document.getElementById('eq-type-lbl').textContent=extTest.title;
  showScreen('extended-test');renderExtQ();
}

function renderExtQ(){
  clearInterval(extTimer);
  const q=extQuestions[extCurQ],tot=extQuestions.length;
  document.getElementById('eq-prog-text').textContent=tp('qProg',{n:extCurQ+1,tot})||`문항 ${extCurQ+1} / ${tot}`;
  document.getElementById('eq-prog-fill').style.width=(extCurQ/tot*100)+'%';
  timeLeft=extTest.time||45;
  document.getElementById('eq-timer-val').textContent=timeLeft;
  extTimer=setInterval(()=>{
    timeLeft--;
    document.getElementById('eq-timer-val').textContent=timeLeft;
    const w=document.getElementById('eq-timer-wrap');
    w.className='timer-display'+(timeLeft<=5?' danger':timeLeft<=10?' warning':'');
    if(timeLeft<=0){clearInterval(extTimer);extAutoSkip();}
  },1000);
  const card=document.getElementById('eq-card');
  const qNum=tp('qNum',{n:extCurQ+1})||`문항 ${extCurQ+1}`;
  card.innerHTML=`<div class="q-num">${qNum} &nbsp;·&nbsp;<span class="tag" style="background:var(--primary-bg);color:var(--primary-mid)">${extTest.title}</span></div>
    <div class="q-text">${q.q}</div>
    <div class="options-grid">${q.opts.map((opt,i)=>`<div class="option" id="eopt${i}" onclick="selectExtAns(${i})"><div class="opt-letter">${['A','B','C','D'][i]}</div><div class="opt-text">${opt}</div></div>`).join('')}</div>
    <div class="q-nav"><span class="q-nav-hint">${t('qAutoNext')||'선택 후 자동으로 다음 문항으로 넘어갑니다'}</span><button class="btn btn-secondary btn-sm" onclick="extSkip()">${t('qSkip')||'건너뛰기 →'}</button></div>`;
  card.style.animation='none';void card.offsetHeight;card.style.animation='slideIn .3s ease';
}

let _extAnsLock=false;
function selectExtAns(idx){
  if(_extAnsLock)return;
  _extAnsLock=true;
  clearInterval(extTimer);
  const q=extQuestions[extCurQ];
  extAnswers[extCurQ]={selected:idx,weights:q.weights,correct:q.correct};
  document.querySelectorAll('#eq-card .option').forEach((el,i)=>{
    el.style.pointerEvents='none';
    if(q.correct!==undefined&&i===q.correct)el.classList.add('correct');
    if(i===idx&&idx!==q.correct)el.classList.add('wrong');
    if(i===idx)el.classList.add('selected');
  });
  setTimeout(extAdvance,850);
}
// 스킵도 weights를 저장해 분모에 포함 (스킵이 저점 답변보다 유리해지는 문제 방지)
function extSkip(){if(_extAnsLock)return;_extAnsLock=true;clearInterval(extTimer);const q=extQuestions[extCurQ];extAnswers[extCurQ]={selected:-1,weights:q.weights,correct:q.correct};extAdvance();}
function extAutoSkip(){if(_extAnsLock)return;_extAnsLock=true;const q=extQuestions[extCurQ];extAnswers[extCurQ]={selected:-1,weights:q.weights,correct:q.correct};extAdvance();}
function extAdvance(){extCurQ++;_extAnsLock=false;if(extCurQ>=extQuestions.length)finishExt();else renderExtQ();}

function finishExt(){
  clearInterval(extTimer);
  let result;
  if(extTest.id==='eq'){
    let total=0,max=0;
    extAnswers.forEach(a=>{if(a&&a.weights){max+=Math.max(...a.weights);if(a.selected!==-1)total+=a.weights[a.selected];}});
    result=extTest.scoring(total,max||1);
  } else {
    const correct=extAnswers.filter(a=>a&&a.selected!==-1&&a.selected===a.correct).length;
    result=extTest.scoring(correct,extQuestions.length);
  }
  showExtResults(result);
}

// ── Extended Results Display ──
function showExtResults(result){
  isSharedView=false;
  const _sbe=document.getElementById('shared-banner-ext');if(_sbe)_sbe.style.display='none';
  const score=result.score;
  const pctile=getExtPercentile(score,extTest.mean||76,extTest.sd||8);
  const topPct=100-pctile;
  // Apply translated result strings
  const extSR=window.IQ_LANG&&window.IQ_LANG.extScoreResult&&window.IQ_LANG.extScoreResult[extTest.id];
  if(extSR){const k=score>=85?'hi':score>=67?'mid':'lo';if(extSR[k])result={...result,...extSR[k]};}
  const extSRL=window.IQ_LANG&&window.IQ_LANG.extScoreRanges&&window.IQ_LANG.extScoreRanges[extTest.id];
  const scoreRanges=extSRL?extTest.scoreRanges.map((r,i)=>({...r,...(extSRL[i]||{})})):extTest.scoreRanges;

  // Hero
  document.getElementById('ext-res-label').textContent=tp('extResLabel',{title:extTest.title})||(extTest.title+' Result');
  document.getElementById('ext-score').textContent=score;
  document.getElementById('ext-top-pct').textContent=topPct;
  document.getElementById('ext-res-cat').textContent=result.cat;
  document.getElementById('ext-res-desc').textContent=result.desc;
  const extTopSuffix=document.querySelector('#screen-ext-results .ext-pct-badge span');
  if(extTopSuffix&&t('extTopPctSuffix'))extTopSuffix.textContent=t('extTopPctSuffix');

  // Stats row
  const scoreUnit=t('extStatScoreLabel')||'점';
  document.getElementById('ext-stat-score').textContent=score+(scoreUnit==='Score'?'':scoreUnit);
  document.getElementById('ext-stat-pct').textContent=tp('topPctStr',{n:topPct})||('상위 '+topPct+'%');
  const levelRange=scoreRanges.find(r=>score>=r.min)||scoreRanges[scoreRanges.length-1];
  document.getElementById('ext-stat-level').textContent=levelRange.label;
  document.getElementById('ext-stat-level').style.color=levelRange.color;

  // Share card
  document.getElementById('ext-sc-score').textContent=window.IQ_LANG?score:(score+'점');
  document.getElementById('ext-sc-cat').textContent=result.cat;
  document.getElementById('ext-sc-pct').textContent=tp('topPctStr',{n:topPct})||('상위 '+topPct+'%');

  // Ring animation
  const circ=2*Math.PI*60;
  const pct=Math.round(((score-62)/38)*100);
  const offset=circ*(1-pct/100);
  const ring=document.getElementById('ring-fill');
  ring.style.stroke=extTest.color;
  ring.setAttribute('stroke-dasharray',circ.toFixed(1));
  setTimeout(()=>{ring.style.strokeDashoffset=offset;},200);

  showScreen('ext-results');
  showBrainAgeCard(savedIQ,'ext');
  renderIQHistory('history-card-ext');

  setTimeout(()=>{
    document.getElementById('ext-bell-title').textContent=tp('extBellTitle',{title:extTest.title})||`📊 ${extTest.title} 점수 분포에서의 위치`;
    drawBellCurve('ext-bell-chart',score,extTest.color,extTest.mean||76,extTest.sd||8);
    document.getElementById('ext-chart-title').textContent=tp('extChartTitle',{title:extTest.title})||`🔍 ${extTest.title} 세부 영역 분석`;
    drawExtRadar(score);
    renderInterpTable(score,scoreRanges,pctile);
    renderExtBreakdown(score);
    const extBDH3=document.getElementById('ext-bd-title');if(extBDH3)extBDH3.textContent=t('extBDTitle')||'Detailed Domain Results';
    const extQT2=window.IQ_LANG&&window.IQ_LANG.extQuestions&&window.IQ_LANG.extQuestions[extTest.id];
    let tips=extTest.getTips(score);
    if(extQT2&&extQT2.tips){const tk=score>=85?'hi':score>=67?'mid':'lo';if(extQT2.tips[tk])tips=extQT2.tips[tk];}
    document.getElementById('tips-title').textContent=tp('tipsTitle',{title:extTest.title})||`💡 ${extTest.title} Improvement Guide`;
    document.getElementById('tips-list').innerHTML=tips.map(tip=>`<div class="tip-item"><div class="tip-dot"></div><div>${tip}</div></div>`).join('');
  },400);
}

function renderInterpTable(score,ranges,pctile){
  const rows=ranges.map(r=>{
    const isHere=score>=r.min&&(ranges.indexOf(r)===0||(score<ranges[ranges.indexOf(r)-1]?.min));
    // simpler: highlight the matching range
    return {r,isHere};
  });
  // find current range
  let curIdx=ranges.length-1;
  for(let i=0;i<ranges.length;i++){if(score>=ranges[i].min){curIdx=i;break;}}

  const headers=window.IQ_LANG&&window.IQ_LANG.interpHeaders||['점수 범위','등급','전체 중 위치'];
  const curLabel=t('interpCurrent')||'◀ 현재';
  let html=`<tr><th>${headers[0]}</th><th>${headers[1]}</th><th>${headers[2]}</th></tr>`;
  ranges.forEach((r,i)=>{
    const hi=i===0?100:ranges[i-1].min-1;
    const lo=r.min;
    const isActive=i===curIdx;
    const topStr=tp('interpTopPct',{n:r.top})||`상위 ${r.top}%`;
    html+=`<tr${isActive?' class="highlight"':''}>
      <td><span class="interp-rank-dot" style="background:${r.color}"></span>${lo}~${hi}</td>
      <td style="font-weight:${isActive?'700':'400'};color:${isActive?r.color:'inherit'}">${r.label}${isActive?' '+curLabel:''}</td>
      <td>${topStr}</td>
    </tr>`;
  });
  document.getElementById('interp-table').innerHTML=html;
}

function drawExtRadar(score){
  const catMap={
    eq:['자기인식','공감 능력','감정 조절','사회적 기술','동기 부여'],
    memory:['즉각 회상','작업 기억','순서 기억','역순 처리','집중 지속'],
    speed:['계산 속도','언어 처리','패턴 인식','분류 속도','오류 감지'],
    creativity:['발산적 사고','유추 능력','재구성 능력','연결 사고','혁신 성향'],
    focus:['선택 주의','지속 주의','분할 주의','억제 제어','처리 정확도'],
    cog_flex:['전환 능력','재구성','다관점','적응력','규칙 적용 유연성']
  };
  const langCats=window.IQ_LANG&&window.IQ_LANG.radarLabels&&window.IQ_LANG.radarLabels[extTest.id];
  const cats=langCats||catMap[extTest.id]||['영역1','영역2','영역3','영역4','영역5'];
  const base=(score-62)/38;
  const data=cats.map(()=>Math.max(10,Math.min(100,Math.round((base+(Math.random()*.24-.12))*100))));
  const cv=document.getElementById('ext-radar');
  _destroyChart(cv);
  const ctx=cv.getContext('2d');
  new Chart(ctx,{type:'radar',data:{labels:cats,datasets:[{label:t('extRadarLabel')||'Domain Scores',data,borderColor:extTest.color,backgroundColor:extTest.color+'22',pointBackgroundColor:extTest.color,pointBorderColor:'#fff',borderWidth:2}]},options:{responsive:true,scales:{r:{min:0,max:100,ticks:{color:'#94a3b8',backdropColor:'transparent',stepSize:25},grid:{color:'rgba(0,0,0,.07)'},pointLabels:{color:'#475569',font:{size:11}}}},plugins:{legend:{labels:{color:'#475569',font:{size:11}}}}}});
}

function renderExtBreakdown(score){
  const catMap={
    eq:['자기인식','공감 능력','감정 조절','사회적 기술','동기 부여'],
    memory:['즉각 회상','작업 기억','순서 기억','역순 처리','집중 지속'],
    speed:['계산 속도','언어 처리','패턴 인식','분류 속도','오류 감지'],
    creativity:['발산적 사고','유추 능력','재구성 능력','연결 사고','혁신 성향'],
    focus:['선택 주의','지속 주의','분할 주의','억제 제어','처리 정확도'],
    cog_flex:['전환 능력','재구성','다관점','적응력','규칙 적용 유연성']
  };
  const langCats=window.IQ_LANG&&window.IQ_LANG.radarLabels&&window.IQ_LANG.radarLabels[extTest.id];
  const cats=langCats||catMap[extTest.id]||['영역1','영역2','영역3','영역4','영역5'];
  const base=(score-62)/38;
  let html='';
  cats.forEach(cat=>{
    const pct=Math.max(10,Math.min(100,Math.round((base+(Math.random()*.24-.12))*100)));
    html+=`<div class="bd-item"><div class="bd-name">${cat}</div><div class="bd-bar"><div class="bd-fill" style="width:0%;background:${extTest.color}" data-w="${pct}"></div></div><div class="bd-score" style="color:${extTest.color}">${pct}${window.IQ_LANG?'':'점'}</div></div>`;
  });
  document.getElementById('ext-bd-list').innerHTML=html;
  setTimeout(()=>{document.querySelectorAll('#ext-bd-list .bd-fill').forEach(el=>{el.style.width=el.dataset.w+'%';});},300);
}

// ── SHARE FUNCTIONS ──
function getShareText(isExt=false){
  if(isExt&&extTest){
    const score=document.getElementById('ext-score').textContent;
    const cat=document.getElementById('ext-res-cat').textContent;
    const top=document.getElementById('ext-top-pct').textContent;
    const tmpl=t('shareTextExt');
    return tmpl?tmpl.replace('{title}',extTest.title).replace('{score}',score).replace('{cat}',cat).replace('{top}',top):`[${extTest.title}] 결과: ${score}점 (${cat}) | 상위 ${top}%\n나도 무료로 테스트해봐!`;
  }
  const iq=document.getElementById('res-iq').textContent;
  const catFull=document.getElementById('res-cat').textContent;
  const top=document.getElementById('r-top').textContent;
  const cat=catFull.split(' ')[0];
  const tmpl=t('shareTextIQ');
  let base=tmpl?tmpl.replace('{iq}',iq).replace('{cat}',cat).replace('{top}',top):`[무료 IQ 테스트] 나의 IQ: ${iq}점 (${cat}) | 상위 ${top}%\n너는 몇 점이야? 바로 테스트해봐!`;
  // 아키타입명 + Wordle식 그리드 삽입 (정체성 + 스포일러-프리 호기심 훅)
  const d=savedResultData||{};
  if(d.typeCode){const c=cogType(d.typeCode);base=`${c.emoji} ${c.name}\n`+base;}
  if(d.grid){base=base+'\n\n'+d.grid;}
  return base;
}

function getShareURL(){return window.location.href.split('?')[0];}

// ── '친구에게 도전장' — 지목형 도전 링크 (공유율↑) ──
function challengeFriend(isExt){
  const url=getResultShareURL(isExt)+'&c=1';
  const iq=(savedResultData&&savedResultData.iq)||savedIQ;
  const txt=(tp('challengeShare',{iq})||(`내 IQ ${iq}, 넘을 수 있어? 도전 받아라! 🧠`))+'\n'+url;
  if(navigator.share){navigator.share({text:txt}).catch(()=>{});}
  else if(navigator.clipboard){navigator.clipboard.writeText(txt).then(()=>{const L=window.IQ_LANG;showToast((L&&L.copied)||'클립보드에 복사됨!');}).catch(()=>{});}
}

function getResultShareURL(isExt=false){
  // 결과 복원 파라미터는 앱(?lang=)에서만 동작 — /xx/iq-test/ 래퍼는 SEO 랜딩이라 사용 불가
  const lang=window.IQ_CURRENT_LANG||'ko';
  const base='https://all-lifes.com/iq-test/';
  const lp=lang==='ko'?'':`lang=${lang}&`;
  if(isExt&&extTest){
    const score=document.getElementById('ext-score').textContent;
    const cat=document.getElementById('ext-res-cat').textContent;
    const top=document.getElementById('ext-top-pct').textContent;
    return `${base}?${lp}r=ext&tid=${extTest.id}&s=${score}&cat=${encodeURIComponent(cat)}&top=${top}`;
  }
  if(savedResultData){
    const d=savedResultData;
    const ty=d.typeCode?`&ty=${d.typeCode}`:'';
    return `${base}?${lp}r=iq&iq=${d.iq}&cat=${encodeURIComponent(d.cat)}&top=${d.topPct}&mode=${d.mode}${ty}`;
  }
  return lang==='ko'?base:`${base}?lang=${lang}`;
}

// ── URL 공유 결과 복원 ──
function checkShareParams(){
  const p=new URLSearchParams(window.location.search);
  const r=p.get('r');
  if(r==='iq'){
    const iq=parseInt(p.get('iq'))||100;
    const catLabel=p.get('cat')||'평균';
    const topPct=parseInt(p.get('top'))||50;
    const mode=p.get('mode')||'short';
    const ty=p.get('ty')||'';
    const challenge=p.get('c')==='1';
    isSharedView=true;
    restoreIQResults(iq,catLabel,topPct,mode,ty,challenge);
  } else if(r==='ext'){
    const tid=p.get('tid');
    const score=parseInt(p.get('s'))||70;
    const cat=p.get('cat')||'';
    const top=parseInt(p.get('top'))||50;
    isSharedView=true;
    restoreExtResults(tid,score,cat,top);
  }
}

function restoreIQResults(iq,catLabel,topPct,mode,typeCode,challenge){
  const pctile=100-topPct;
  savedIQ=iq;savedTopPct=topPct;
  currentMode=mode;
  if(typeCode)renderCogType(typeCode);else{const ct=document.getElementById('cog-type-block');if(ct)ct.style.display='none';}
  document.getElementById('shared-banner-iq').style.display='block';
  const bannerP=document.querySelector('#shared-banner-iq p');
  if(bannerP){
    // 도전장 링크면 도전 배너, 아니면 일반 공유 배너
    if(challenge){bannerP.textContent=(tp('challengeBanner',{iq})||t('sharedBannerIQ')||bannerP.textContent);}
    else{bannerP.textContent=t('sharedBannerIQ')||bannerP.textContent;}
  }
  const bannerBtn=document.querySelector('#shared-banner-iq button');if(bannerBtn)bannerBtn.textContent=t('sharedBannerBtn')||bannerBtn.textContent;
  document.getElementById('res-test-label').textContent=t(mode==='short'?'resTestLabel_short':'resTestLabel_long')||(mode==='short'?'Short IQ Test Result':'Full IQ Test Result');
  document.getElementById('res-iq').textContent=iq;
  const cat=getIQCat(iq);
  const catLang=window.IQ_LANG&&window.IQ_LANG.iqCats?window.IQ_LANG.iqCats.find(c=>iq>=c.min)||window.IQ_LANG.iqCats[window.IQ_LANG.iqCats.length-1]:null;
  const displayLabel=catLang?catLang.label:catLabel;
  document.getElementById('res-cat').textContent=displayLabel;
  document.getElementById('res-cat').style.color=cat.color;
  document.getElementById('res-desc').textContent=catLang?catLang.desc:cat.desc;
  document.getElementById('res-pct-label').textContent=tp('topPctStr',{n:topPct})||`상위 ${topPct}%`;
  document.getElementById('pct-text').textContent=tp('topPctStr',{n:topPct})||`상위 ${topPct}%`;
  document.getElementById('r-correct').textContent='--';
  document.getElementById('r-acc').textContent='--';
  document.getElementById('r-time').textContent='--';
  document.getElementById('r-top').textContent=topPct;
  document.getElementById('sc-iq').textContent=iq;
  document.getElementById('sc-cat').textContent=displayLabel.split(' ')[0];
  document.getElementById('sc-pct').textContent=tp('topPctStr',{n:topPct})||`상위 ${topPct}%`;
  document.getElementById('switch-btn').style.display='none';
  setTimeout(()=>{document.getElementById('pct-fill').style.width=pctile+'%';},300);
  setTimeout(()=>{drawBellCurve('bellChart',iq,'#4f46e5');renderIQLadder(iq);},400);
  showScreen('results');
}

function restoreExtResults(tid,score,cat,topPct){
  extTest=extendedTests[tid];
  if(!extTest)return;
  const pctile=100-topPct;
  // 언어별 등급표 병합 (showExtResults와 동일 로직)
  const extSRL=window.IQ_LANG&&window.IQ_LANG.extScoreRanges&&window.IQ_LANG.extScoreRanges[extTest.id];
  const scoreRanges=extSRL?extTest.scoreRanges.map((r,i)=>({...r,...(extSRL[i]||{})})):extTest.scoreRanges;
  document.getElementById('shared-banner-ext').style.display='block';
  document.getElementById('ext-res-label').textContent=tp('extResLabel',{title:extTest.title})||(extTest.title+' Result');
  document.getElementById('ext-score').textContent=score;
  document.getElementById('ext-top-pct').textContent=topPct;
  document.getElementById('ext-res-cat').textContent=cat;
  document.getElementById('ext-res-desc').textContent='';
  document.getElementById('ext-stat-score').textContent=window.IQ_LANG?score:(score+'점');
  document.getElementById('ext-stat-pct').textContent=tp('topPctStr',{n:topPct})||('상위 '+topPct+'%');
  const levelRange=scoreRanges.find(r=>score>=r.min)||scoreRanges[scoreRanges.length-1];
  document.getElementById('ext-stat-level').textContent=levelRange.label;
  document.getElementById('ext-stat-level').style.color=levelRange.color;
  document.getElementById('ext-sc-score').textContent=window.IQ_LANG?score:(score+'점');
  document.getElementById('ext-sc-cat').textContent=cat;
  document.getElementById('ext-sc-pct').textContent=tp('topPctStr',{n:topPct})||('상위 '+topPct+'%');
  const circ=2*Math.PI*60;
  const pct=Math.round(((score-62)/38)*100);
  const offset=circ*(1-pct/100);
  const ring=document.getElementById('ring-fill');
  ring.style.stroke=extTest.color;
  ring.setAttribute('stroke-dasharray',circ.toFixed(1));
  setTimeout(()=>{ring.style.strokeDashoffset=offset;},200);
  showScreen('ext-results');
  setTimeout(()=>{
    document.getElementById('ext-bell-title').textContent=tp('extBellTitle',{title:extTest.title})||`📊 ${extTest.title} Score Distribution`;
    drawBellCurve('ext-bell-chart',score,extTest.color,extTest.mean||76,extTest.sd||8);
    document.getElementById('ext-chart-title').textContent=tp('extChartTitle',{title:extTest.title})||`🔍 ${extTest.title} Detailed Analysis`;
    drawExtRadar(score);
    renderInterpTable(score,extTest.scoreRanges,pctile);
    renderExtBreakdown(score);
    const tips=extTest.getTips(score);
    document.getElementById('tips-title').textContent=tp('tipsTitle',{title:extTest.title})||`💡 ${extTest.title} Improvement Guide`;
    document.getElementById('tips-list').innerHTML=tips.map(t=>`<div class="tip-item"><div class="tip-dot"></div><div>${t}</div></div>`).join('');
  },400);
}

// ── Platform share config (per language) ──
const SHARE_PLATFORMS={
  ko:[{id:'kakao',label:'카카오톡'},{id:'band',label:'Band'},{id:'twitter',label:'X (Twitter)'},{id:'copy'}],
  en:[{id:'twitter',label:'X (Twitter)'},{id:'facebook',label:'Facebook'},{id:'whatsapp',label:'WhatsApp'},{id:'copy'}],
  ja:[{id:'line',label:'LINE'},{id:'twitter',label:'X (Twitter)'},{id:'copy'}],
  de:[{id:'whatsapp',label:'WhatsApp'},{id:'facebook',label:'Facebook'},{id:'copy'}],
  fr:[{id:'whatsapp',label:'WhatsApp'},{id:'facebook',label:'Facebook'},{id:'twitter',label:'X (Twitter)'},{id:'copy'}],
  es:[{id:'whatsapp',label:'WhatsApp'},{id:'twitter',label:'X (Twitter)'},{id:'facebook',label:'Facebook'},{id:'copy'}],
  pt:[{id:'whatsapp',label:'WhatsApp'},{id:'twitter',label:'X (Twitter)'},{id:'facebook',label:'Facebook'},{id:'copy'}],
  it:[{id:'whatsapp',label:'WhatsApp'},{id:'facebook',label:'Facebook'},{id:'copy'}],
  id:[{id:'whatsapp',label:'WhatsApp'},{id:'line',label:'LINE'},{id:'facebook',label:'Facebook'},{id:'copy'}],
  hi:[{id:'whatsapp',label:'WhatsApp'},{id:'facebook',label:'Facebook'},{id:'twitter',label:'X (Twitter)'},{id:'copy'}],
  ru:[{id:'telegram_share',label:'Telegram'},{id:'whatsapp',label:'WhatsApp'},{id:'twitter',label:'X (Twitter)'},{id:'copy'}],
  vi:[{id:'facebook',label:'Facebook'},{id:'whatsapp',label:'WhatsApp'},{id:'telegram_share',label:'Telegram'},{id:'copy'}],
  tr:[{id:'whatsapp',label:'WhatsApp'},{id:'twitter',label:'X (Twitter)'},{id:'facebook',label:'Facebook'},{id:'copy'}],
};

function buildShareRow(isExt){
  const lang=window.IQ_CURRENT_LANG||'ko';
  const plats=SHARE_PLATFORMS[lang]||SHARE_PLATFORMS.en;
  const copyLabel=t('copyBtn')||'링크복사';
  const ex=isExt?'true':'false';
  const suf=isExt?'-ext':'-iq';
  return plats.map(p=>{
    switch(p.id){
      case 'kakao':   return `<button class="share-btn kakao" onclick="shareKakao(${ex})"><span class="sb-icon">💛</span><span>${p.label}</span></button>`;
      case 'band':    return `<button class="share-btn band" onclick="shareBand(${ex})"><span class="sb-icon">B</span><span>${p.label}</span></button>`;
      case 'twitter': return `<button class="share-btn twitter" onclick="shareTwitter(${ex})"><span class="sb-icon">𝕏</span><span>${p.label}</span></button>`;
      case 'facebook':return `<button class="share-btn facebook" onclick="shareFacebook(${ex})"><span class="sb-icon">f</span><span>${p.label}</span></button>`;
      case 'whatsapp':return `<button class="share-btn whatsapp" onclick="shareWhatsApp(${ex})"><span class="sb-icon">💬</span><span>${p.label}</span></button>`;
      case 'line':    return `<button class="share-btn line" onclick="shareLine(${ex})"><span class="sb-icon">L</span><span>${p.label}</span></button>`;
      case 'telegram_share': return `<button class="share-btn telegram" onclick="shareTelegramResult(${ex})" style="background:#229ED9;color:#fff;"><span class="sb-icon">✈️</span><span>${p.label}</span></button>`;
      case 'copy':    return `<button class="share-btn copy" id="copy-btn${suf}" onclick="copyLink(${ex})"><span class="sb-icon">🔗</span><span id="copy-lbl${suf}">${copyLabel}</span></button>`;
      default: return '';
    }
  }).join('')+`<button class="share-btn copy" onclick="downloadResultCard(${ex})"><span class="sb-icon">💾</span><span>${t('saveImage')||(lang==='ko'?'이미지 저장':'Save Image')}</span></button>`;
}

// ── Result card PNG download ──
function downloadResultCard(isExt){
  const W=1080,H=1080;
  const cv=document.createElement('canvas');cv.width=W;cv.height=H;
  const x=cv.getContext('2d');
  // Background gradient
  const g=x.createLinearGradient(0,0,W,H);
  g.addColorStop(0,'#1e1b4b');g.addColorStop(.5,'#312e81');g.addColorStop(1,'#1d4ed8');
  x.fillStyle=g;x.fillRect(0,0,W,H);
  // Decorative circles
  x.globalAlpha=.07;x.fillStyle='#ffffff';
  x.beginPath();x.arc(W*.9,H*.12,220,0,7);x.fill();
  x.beginPath();x.arc(W*.08,H*.88,260,0,7);x.fill();
  x.globalAlpha=1;
  // Content
  let big,cat,pct,eyebrow;
  if(isExt){
    big=(document.getElementById('ext-score')||{}).textContent||'--';
    cat=(document.getElementById('ext-res-cat')||{}).textContent||'';
    pct=(document.getElementById('ext-top-pct')||{}).textContent||'--';
    eyebrow=(document.getElementById('ext-res-label')||{}).textContent||'Cognitive Test';
  }else{
    const d=savedResultData||{};
    big=String(d.iq||savedIQ);cat=d.cat||'';pct=String(d.topPct!=null?d.topPct:savedTopPct);
    eyebrow='IQ TEST RESULT';
  }
  // 아키타입 (정체성 — 카드의 공유 가치 핵심)
  let archeName='',archeEmoji='';
  if(!isExt&&savedResultData&&savedResultData.typeCode){const c=cogType(savedResultData.typeCode);archeName=c.name||'';archeEmoji=c.emoji||'';}
  const lang=window.IQ_CURRENT_LANG||'ko';
  x.textAlign='center';
  x.fillStyle='#a5b4fc';x.font='700 38px sans-serif';
  x.fillText(eyebrow.toUpperCase().slice(0,30),W/2,170);
  x.fillStyle='#ffffff';x.font='900 300px sans-serif';
  x.fillText(big,W/2,540);
  x.fillStyle='#93c5fd';x.font='800 64px sans-serif';
  x.fillText(cat.slice(0,22),W/2,660);
  // Top % chip
  const chipTxt=(lang==='ko'?'상위 ':'TOP ')+pct+'%';
  x.font='700 46px sans-serif';
  const tw=x.measureText(chipTxt).width;
  x.fillStyle='rgba(255,255,255,.14)';
  const cw=tw+80,chx=(W-cw)/2;
  x.beginPath();if(x.roundRect)x.roundRect(chx,710,cw,90,45);else x.rect(chx,710,cw,90);x.fill();
  x.fillStyle='#e0e7ff';x.fillText(chipTxt,W/2,772);
  // 아키타입명 + 이모지 (카드 정체성 라인)
  if(archeName){
    x.fillStyle='#ffffff';x.font='800 50px sans-serif';
    x.fillText(archeEmoji+' '+archeName.slice(0,26),W/2,872);
  }
  // Bell curve
  x.strokeStyle='rgba(165,180,252,.65)';x.lineWidth=5;x.beginPath();
  for(let i=0;i<=100;i++){
    const px=140+(W-280)*i/100;
    const py=980-90*Math.exp(-Math.pow((i-50)/18,2));
    i===0?x.moveTo(px,py):x.lineTo(px,py);
  }
  x.stroke();
  // Footer URL
  x.fillStyle='#c7d2fe';x.font='600 36px sans-serif';
  x.fillText('all-lifes.com/iq-test',W/2,1020);
  // Download
  cv.toBlob(b=>{
    if(!b)return;
    const a=document.createElement('a');
    a.href=URL.createObjectURL(b);
    a.download='iq-test-result.png';
    document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(a.href),3000);
    if(typeof showToast==='function')showToast(lang==='ko'?'이미지가 저장되었습니다!':'Image saved!');
  },'image/png');
}

function updateShareRows(){
  const r1=document.getElementById('share-row-iq');
  const r2=document.getElementById('share-row-ext');
  if(r1)r1.innerHTML=buildShareRow(false);
  if(r2)r2.innerHTML=buildShareRow(true);
}

function shareTelegram(){
  window.open('https://t.me/all_lifes_community','_blank','noopener');
}

function shareTelegramResult(isExt=false){
  const text=getShareText(isExt);
  const url=getResultShareURL(isExt);
  window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,'_blank','noopener');
}

function shareWhatsApp(isExt=false){
  const text=getShareText(isExt);
  const url=getResultShareURL(isExt);
  window.open(`https://wa.me/?text=${encodeURIComponent(text+'\n\n🔗 '+url)}`,'_blank','noopener');
}

function shareBand(isExt=false){
  const text=getShareText(isExt);
  const url=getResultShareURL(isExt);
  window.open(`https://band.us/plugin/share?body=${encodeURIComponent(text)}&route=${encodeURIComponent(url)}`,'_blank','noopener');
}

function shareKakao(isExt=false){
  try{
    if(window.Kakao&&Kakao.isInitialized()){
      const desc=getShareText(isExt);
      const url=getResultShareURL(isExt);
      Kakao.Share.sendDefault({
        objectType:'feed',
        content:{
          title:t('shareTitle')||'IQ 테스트 결과',
          description:desc,
          imageUrl:'https://all-lifes.com/iq-test/og-ko.png',
          link:{mobileWebUrl:url,webUrl:url}
        }
      });
      return;
    }
  }catch(e){}
  copyLink(isExt);
}

function shareTwitter(isExt=false){
  const text=getShareText(isExt);
  const url=getShareURL();
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,'_blank','width=600,height=420,noopener');
}

function shareFacebook(isExt=false){
  const url=getShareURL();
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,'_blank','width=600,height=420,noopener');
}

function shareLine(isExt=false){
  const text=getShareText(isExt);
  const url=getShareURL();
  window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,'_blank','noopener');
}

function shareNative(isExt=false){
  const text=getShareText(isExt);
  const url=getShareURL();
  if(navigator.share){
    navigator.share({title:t('shareTitle')||'IQ Test Result',text,url}).catch(()=>copyLink(isExt));
  } else {
    copyLink(isExt);
  }
}

function copyLink(isExt=false){
  const text=getShareText(isExt)+'\n\n🔗 '+getResultShareURL(isExt);
  const btnId=isExt?'copy-btn-ext':'copy-btn-iq';
  const btn=document.getElementById(btnId);
  const copy=()=>{
    if(btn){btn.classList.add('copy-success');btn.querySelector('.sb-icon').textContent='✓';setTimeout(()=>{btn.classList.remove('copy-success');btn.querySelector('.sb-icon').textContent='🔗';},2000);}
    showToast(t('copiedToast')||'📋 Copied to clipboard!');
  };
  if(navigator.clipboard){
    navigator.clipboard.writeText(text).then(copy).catch(()=>{legacyCopy(text);copy();});
  } else {
    legacyCopy(text);copy();
  }
}

function legacyCopy(text){
  const el=document.createElement('textarea');
  el.value=text;el.style.position='fixed';el.style.opacity='0';
  document.body.appendChild(el);el.select();
  try{document.execCommand('copy');}catch(e){}
  document.body.removeChild(el);
}

// ── Toast ──
function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3000);
}

// ── FAQ ──
function toggleFAQ(btn){
  if(!btn)return;
  const body=btn.nextElementSibling;
  const arrow=btn.querySelector('.faq-arrow');
  const isOpen=body.classList.contains('open');
  document.querySelectorAll('.faq-body').forEach(b=>b.classList.remove('open'));
  document.querySelectorAll('.faq-arrow').forEach(a=>a.classList.remove('open'));
  if(!isOpen){body.classList.add('open');arrow.classList.add('open');}
}

// ── Reliability bars (home) ──
function animateReliabilityBars(){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.querySelectorAll('.rl-inner').forEach(el=>{el.style.width=el.dataset.w+'%';});
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.3});
  const wrap=document.querySelector('.rl-wrap');
  if(wrap)observer.observe(wrap);
}

// ═══════════════════════════════════════════════════════════
// ASD / ASPERGER / ADHD SCREENING
// ═══════════════════════════════════════════════════════════

// Question pool metadata: cat = sc|rb|ss|cg|adhd, reverse = true → disagree scores 1
const _asdPool=[
  {cat:'sc',reverse:true},  // Q1
  {cat:'sc',reverse:false}, // Q2
  {cat:'sc',reverse:true},  // Q3
  {cat:'sc',reverse:false}, // Q4
  {cat:'sc',reverse:false}, // Q5
  {cat:'sc',reverse:false}, // Q6
  {cat:'sc',reverse:false}, // Q7
  {cat:'rb',reverse:false}, // Q8
  {cat:'rb',reverse:false}, // Q9
  {cat:'rb',reverse:false}, // Q10
  {cat:'rb',reverse:false}, // Q11
  {cat:'ss',reverse:false}, // Q12
  {cat:'ss',reverse:false}, // Q13
  {cat:'ss',reverse:false}, // Q14
  {cat:'ss',reverse:false}, // Q15
  {cat:'cg',reverse:false}, // Q16
  {cat:'cg',reverse:false}, // Q17
  {cat:'cg',reverse:false}, // Q18
  {cat:'cg',reverse:false}, // Q19
  {cat:'cg',reverse:false}, // Q20
  {cat:'adhd',reverse:false},// Q21
  {cat:'adhd',reverse:false},// Q22
  {cat:'adhd',reverse:false},// Q23
  {cat:'adhd',reverse:false},// Q24
  {cat:'adhd',reverse:false},// Q25
];

const _asdQKo=[
  '누군가 직접 말하지 않아도 그 뜻을 쉽게 알아챈다',
  '사교적인 상황이 혼란스럽거나 압도적으로 느껴진다',
  '상대방이 지루해하거나 흥미를 잃었다는 것을 쉽게 알 수 있다',
  '대화 중 표정이나 목소리 톤만으로 상대방의 감정을 파악하기 어렵다',
  '가벼운 잡담이나 사교적 대화가 어렵거나 불편하다',
  '원하더라도 새로운 사람을 사귀는 것이 어렵다',
  '사람들이 나를 이상하다고 하거나, 당연한 사회적 규칙을 잘 모른다고 한다',
  '일과나 일상이 예상치 못하게 바뀌면 매우 불편하거나 괴롭다',
  '같은 경로, 같은 방식, 같은 순서로 일을 처리하는 것을 선호한다',
  '남들보다 훨씬 깊이 빠져드는 특별한 관심사가 하나 이상 있다',
  '특정 종류(자동차, 역사, 동물 등)에 대한 정보를 수집하는 것을 즐긴다',
  '남들은 신경 쓰지 않는 소리, 빛, 냄새, 질감에 민감하게 반응한다',
  '특정 옷감, 소리, 냄새가 강한 불편감을 준다',
  '소란스럽거나 사람이 많은 장소에서 쉽게 압도되거나 지친다',
  '다른 사람들이 보통 알아채지 못하는 환경 속 작은 세부 사항을 잘 인식한다',
  '책이나 영화에서 등장인물의 생각이나 의도를 파악하기 어렵다',
  '사물이나 상황에서 패턴이나 규칙을 찾는 것을 즐긴다',
  '하나의 일을 하다가 다른 일로 전환하는 것이 힘들다',
  '여러 사람의 대화를 동시에 따라가기 어렵다',
  '말로 설명된 것보다 그림이나 시각적 자료를 이해하기 더 쉽다',
  '집중이 필요한 과제를 수행할 때 부주의한 실수를 자주 한다',
  '흥미롭지 않은 일에 집중을 유지하기 어렵다',
  '가만히 있기 어렵거나 내면적으로 안절부절못하는 느낌이 있다',
  '생각이 빠르게 여러 방향으로 이리저리 옮겨다닌다',
  '결과를 생각하지 않고 충동적으로 행동하거나 말할 때가 있다',
];

// ASD state
let _asdAnswers=[];
let _asdCur=0;

function _asdL(key,fallback){const A=window.IQ_LANG&&window.IQ_LANG.asd;return(A&&A[key]!=null?A[key]:fallback);}

function startASD(){
  _asdAnswers=[];_asdCur=0;
  showScreen('asd');
  _renderASDQ();
}

function _asdQText(i){
  const A=window.IQ_LANG&&window.IQ_LANG.asd;
  return(A&&A.questions&&A.questions[i])||_asdQKo[i];
}

function _asdCatLabel(cat){
  const A=window.IQ_LANG&&window.IQ_LANG.asd;
  const m=A&&A.catLabels;
  const ko={sc:'사회적 소통',rb:'반복 행동·루틴',ss:'감각 민감도',cg:'인지 스타일',adhd:'ADHD 동반 평가'};
  return(m&&m[cat])||ko[cat]||cat;
}

function _renderASDQ(){
  const q=_asdPool[_asdCur];
  const total=_asdPool.length;
  // Dots
  const dots=document.getElementById('asd-dots');
  if(dots)dots.innerHTML=_asdPool.map((_,i)=>`<span class="asd-dot${i<_asdCur?' done':i===_asdCur?' active':''}"></span>`).join('');
  // Counter
  const ctr=document.getElementById('asd-counter');if(ctr)ctr.textContent=`${_asdCur+1} / ${total}`;
  // Category
  const catEl=document.getElementById('asd-cat');if(catEl)catEl.textContent=_asdCatLabel(q.cat);
  // Cat color class
  if(catEl){catEl.className='asd-cat-badge asd-cat-'+q.cat;}
  // Question
  const qEl=document.getElementById('asd-q-text');if(qEl)qEl.textContent=_asdQText(_asdCur);
  // Progress bar
  const bar=document.getElementById('asd-progress-bar');if(bar)bar.style.width=`${(_asdCur/total)*100}%`;
  // Answer buttons
  const labels=_asdL('answerLabels',['전혀 아니다','약간 아니다','약간 그렇다','매우 그렇다']);
  const optsEl=document.getElementById('asd-opts');
  if(optsEl)optsEl.innerHTML=labels.map((lb,i)=>`<button class="asd-opt" onclick="answerASD(${i})">${lb}</button>`).join('');
}

function answerASD(val){
  _asdAnswers.push(val);
  _asdCur++;
  if(_asdCur>=_asdPool.length){_computeASDResult();}
  else{_renderASDQ();}
}

function _computeASDResult(){
  let asdScore=0,adhdScore=0;
  const catScores={sc:0,rb:0,ss:0,cg:0};
  const catMax={sc:7,rb:4,ss:4,cg:5};
  _asdPool.forEach((q,i)=>{
    const agreed=_asdAnswers[i]>=2;
    const pt=q.reverse?(agreed?0:1):(agreed?1:0);
    if(q.cat==='adhd'){adhdScore+=pt;}
    else{asdScore+=pt;catScores[q.cat]+=pt;}
  });
  _showASDResult(asdScore,adhdScore,catScores,catMax);
}

function _showASDResult(asdScore,adhdScore,catScores,catMax){
  showScreen('asd-result');
  // Score
  const sEl=document.getElementById('asd-score');if(sEl)sEl.textContent=asdScore;
  // Level
  const lvl=asdScore<=5?0:asdScore<=10?1:asdScore<=15?2:3;
  const lvlKeys=['low','borderline','significant','strong'];
  const lvlLabelsKo=['낮음','경계선','유의미','강함'];
  const lvlDescsKo=[
    'ASD 관련 특성이 낮은 범위입니다. 신경전형적(Neurotypical) 범위에 해당합니다.',
    '일부 ASD 특성이 관찰됩니다. 스트레스·환경에 따라 더 두드러질 수 있습니다.',
    '유의미한 ASD 특성이 있습니다. 정신건강의학과 또는 심리 전문가 평가를 권장합니다.',
    '강한 ASD 특성이 있습니다. 전문 심리사 또는 정신건강의학과 전문의 상담을 강력히 권장합니다.',
  ];
  const lvlEl=document.getElementById('asd-level');
  if(lvlEl){lvlEl.textContent=_asdL('levels',lvlLabelsKo)[lvl];lvlEl.className='asd-level-badge asd-lvl-'+lvlKeys[lvl];}
  const ldEl=document.getElementById('asd-level-desc');if(ldEl)ldEl.textContent=_asdL('levelDescs',lvlDescsKo)[lvl];
  // Profile
  let profileIdx=4;
  if(asdScore<=5)profileIdx=0;
  else if(asdScore>=11&&adhdScore<=1)profileIdx=1;
  else if(asdScore>=11&&adhdScore>=3)profileIdx=2;
  else if(asdScore<=10&&adhdScore>=3)profileIdx=3;
  const profilesKo=['신경전형적 범위','아스퍼거 / 고기능 자폐 프로필','AuDHD (ASD + ADHD 동반) 프로필','ADHD 주도 프로필','경계선 / 추가 평가 권장'];
  const pfEl=document.getElementById('asd-profile');if(pfEl)pfEl.textContent=_asdL('profiles',profilesKo)[profileIdx];
  // ADHD
  const adhdLvl=adhdScore<=1?0:adhdScore<=3?1:2;
  const adhdLbsKo=['낮음','중간','높음'];
  const adhdDsKo=[
    'ADHD 관련 특성이 낮습니다.',
    '일부 ADHD 특성이 관찰됩니다. ASD와 ADHD는 함께 나타나는 경우가 많습니다.',
    'ADHD 관련 특성이 높습니다. ASD+ADHD(AuDHD) 동반 가능성이 있으며 전문가 평가를 권장합니다.',
  ];
  const adhdLbs=_asdL('adhdLevels',adhdLbsKo);
  const adhdDs=_asdL('adhdDescs',adhdDsKo);
  const ahdlEl=document.getElementById('asd-adhd-level');if(ahdlEl)ahdlEl.textContent=`ADHD ${adhdLbs[adhdLvl]}: ${adhdScore}/5`;
  const ahddEl=document.getElementById('asd-adhd-desc');if(ahddEl)ahddEl.textContent=adhdDs[adhdLvl];
  // Category bars
  const catEl=document.getElementById('asd-cat-bars');
  if(catEl){
    const A=window.IQ_LANG&&window.IQ_LANG.asd;
    const cn=A&&A.catNames||{sc:'사회적 소통',rb:'반복 행동',ss:'감각 민감도',cg:'인지 스타일'};
    catEl.innerHTML=Object.entries(catScores).map(([cat,score])=>{
      const pct=Math.round((score/catMax[cat])*100);
      return `<div class="asd-cat-row"><span class="asd-cat-nm">${cn[cat]||cat}</span><div class="asd-bar-wrap"><div class="asd-bar asd-bar-${cat}" style="width:${pct}%"></div></div><span class="asd-bar-sc">${score}/${catMax[cat]}</span></div>`;
    }).join('');
  }
  // Result disclaimer
  const disEl=document.getElementById('asd-result-disclaimer');
  if(disEl)disEl.textContent=_asdL('resultDisclaimer','⚠️ 이 결과는 전문적 진단이 아닙니다. 점수가 높다면 정신건강의학과 또는 심리 전문가와 상담을 받아보시길 권장합니다.');
  // Share button text
  const shBtn=document.getElementById('asd-share-btn');if(shBtn)shBtn.textContent=_asdL('shareBtn','📤 결과 공유');
  const hBtn=document.getElementById('asd-home-btn');if(hBtn)hBtn.textContent=_asdL('homeBtn','홈으로');
  _showChatFAB();
}

function shareASD(){
  const scoreEl=document.getElementById('asd-score');
  const levelEl=document.getElementById('asd-level');
  const profileEl=document.getElementById('asd-profile');
  const score=scoreEl?scoreEl.textContent:'?';
  const level=levelEl?levelEl.textContent:'';
  const profile=profileEl?profileEl.textContent:'';
  const A=window.IQ_LANG&&window.IQ_LANG.asd;
  const tmpl=(A&&A.shareText)||`[자폐 스펙트럼 검사] ASD 점수: ${score}/20 · ${level} · ${profile}\n무료 스크리닝 → https://all-lifes.com/iq-test/`;
  const text=tmpl.replace('{score}',score).replace('{level}',level).replace('{profile}',profile);
  const url='https://all-lifes.com/iq-test/';
  if(navigator.share){navigator.share({title:'ASD 검사 결과',text,url}).catch(()=>{});}
  else{
    const el=document.createElement('textarea');el.value=text+'\n'+url;
    el.style.position='fixed';el.style.opacity='0';document.body.appendChild(el);el.select();
    try{document.execCommand('copy');}catch(e){}document.body.removeChild(el);
    showToast(_asdL('copiedToast','📋 결과가 복사되었습니다!'));
  }
}

// ══════════════════════════════════════════
// ── AI CHAT ──
// ══════════════════════════════════════════
let _chatOpen=false,_chatBusy=false,_chatInit=false;
let _chatMsgs=[];

function _aiL(k,fb){const C=window.IQ_LANG&&window.IQ_LANG.chat;return(C&&C[k]!=null?C[k]:fb);}

function _buildAIContext(){
  const lang=window.IQ_CURRENT_LANG||'ko';
  const langMap={ko:'Korean',en:'English',de:'German',fr:'French',es:'Spanish',pt:'Portuguese',it:'Italian',ja:'Japanese',id:'Indonesian'};
  const countryMap={ko:'South Korea',en:'English-speaking countries (US, UK, Australia)',de:'Germany',fr:'France',es:'Spanish-speaking countries (Spain, Mexico, Latin America)',pt:'Brazil and Portugal',it:'Italy',ja:'Japan',id:'Indonesia'};
  const ln=langMap[lang]||'Korean';
  const cn=countryMap[lang]||'their country';
  const lines=[];

  // IQ context
  const iqNum=document.getElementById('res-iq');
  if(iqNum&&iqNum.textContent&&!['—','--',''].includes(iqNum.textContent.trim())){
    const cat=document.getElementById('res-cat')?.textContent||'';
    const top=document.getElementById('r-top')?.textContent||'';
    const mode=document.getElementById('res-test-label')?.textContent||'';
    lines.push(`IQ Score: ${iqNum.textContent}${cat?' ('+cat+')':''}${top?' · Top '+top+'%':''}`);
    if(mode)lines.push(`Test type: ${mode}`);
  }

  // ASD context
  const asdSc=document.getElementById('asd-score');
  if(asdSc&&asdSc.textContent){
    const lvl=document.getElementById('asd-level')?.textContent||'';
    const prf=document.getElementById('asd-profile')?.textContent||'';
    const adhd=document.getElementById('asd-adhd-level')?.textContent||'';
    lines.push(`ASD Screening Score: ${asdSc.textContent}/20 · ${lvl} · ${prf}`);
    if(adhd)lines.push(`ADHD Assessment: ${adhd}`);
    // Category bars
    const bars=document.querySelectorAll('#asd-cat-bars .asd-cat-row');
    if(bars.length){
      const cats=[];bars.forEach(r=>{const nm=r.querySelector('.asd-cat-nm')?.textContent||'';const sc=r.querySelector('.asd-bar-sc')?.textContent||'';if(nm)cats.push(`${nm}: ${sc}`);});
      if(cats.length)lines.push(`Domain scores: ${cats.join(', ')}`);
    }
  }

  if(!lines.length)return null;

  const today=new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
  return `You are a warm cognitive science advisor. Give a concise, personalized analysis of these results.

Results: ${lines.join(' | ')}
Date: ${today} | Region: ${cn}
Language: ALWAYS respond ONLY in ${ln}.

Write ~150 words covering:
1. What these scores mean for this person (specific numbers, warm tone)
2. One key strength to leverage
3. One concrete action for the next 30 days
4. Brief encouragement

FORMAT RULES (strictly follow):
- Plain paragraphs only — NO markdown tables, NO pipe characters (|)
- NO HTML tags (no <br>, no <strong> tags)
- You MAY use **bold** for 2-3 key phrases only
- NO section headers with ## or ###
- Keep total response under 180 words
- This is a screening tool, not clinical diagnosis — frame accordingly

Respond ONLY in ${ln}.`;
}

function _showChatFAB(){
  const fab=document.getElementById('ai-chat-fab');
  if(fab)fab.style.display='flex';
  // Update lang strings on fab area
  const L=window.IQ_LANG;
  if(L&&L.chat){
    const t=document.getElementById('ai-chat-title');if(t&&L.chat.panelTitle)t.textContent=L.chat.panelTitle;
    const s=document.getElementById('ai-chat-sub');if(s&&L.chat.panelSub)s.textContent=L.chat.panelSub;
    const d=document.getElementById('ai-chat-disc');if(d&&L.chat.disclaimer)d.textContent=L.chat.disclaimer;
    const inp=document.getElementById('ai-chat-input');if(inp&&L.chat.placeholder)inp.placeholder=L.chat.placeholder;
  }
}

function openAIChat(){
  const panel=document.getElementById('ai-chat-panel');if(!panel)return;
  _chatOpen=true;panel.classList.add('ai-chat-open');
  if(!_chatInit){
    _chatInit=true;
    const ctx=_buildAIContext();
    if(ctx){
      _chatMsgs=[{role:'system',content:ctx}];
      const greeting=_aiL('greeting','안녕하세요! 검사 결과를 바탕으로 심층 분석을 시작할게요. 잠시만 기다려주세요 🧠');
      _appendAIMsg('assistant',greeting);
      const loader=_appendAILoader();
      _fetchAI(_chatMsgs).then(res=>{
        _removeAILoader(loader);
        if(res.rateLimit){_appendRateLimitMsg();}
        else if(res.content){_chatMsgs.push({role:'assistant',content:res.content});_appendAIMsg('assistant',res.content);}
        else{_appendAIMsg('assistant',_aiL('error','오류가 발생했습니다. 다시 시도해주세요.'));}
      });
    } else {
      _appendAIMsg('assistant',_aiL('noContext','먼저 IQ 검사 또는 ASD 검사를 완료해주세요.'));
    }
  }
  setTimeout(()=>{const inp=document.getElementById('ai-chat-input');if(inp)inp.focus();},320);
}

function closeAIChat(){
  const panel=document.getElementById('ai-chat-panel');if(panel)panel.classList.remove('ai-chat-open');
  _chatOpen=false;
}

function _md(text){
  const s=text
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*([^*\n]+?)\*/g,'<em>$1</em>');
  return s.split(/\n\n+/).map(p=>`<p>${p.replace(/\n/g,'<br>')}</p>`).join('');
}

function _appendAIMsg(role,content){
  const msgs=document.getElementById('ai-chat-msgs');if(!msgs)return null;
  const div=document.createElement('div');
  div.className=`ai-msg ${role}`;
  if(role==='assistant'){div.innerHTML=_md(content);}
  else{div.textContent=content;}
  msgs.appendChild(div);msgs.scrollTop=msgs.scrollHeight;
  return div;
}

function _appendAILoader(){
  const msgs=document.getElementById('ai-chat-msgs');if(!msgs)return null;
  const div=document.createElement('div');
  div.className='ai-msg loading';
  div.innerHTML='<div class="ai-dots"><span></span><span></span><span></span></div>';
  msgs.appendChild(div);msgs.scrollTop=msgs.scrollHeight;
  return div;
}

function _removeAILoader(el){if(el&&el.parentNode)el.parentNode.removeChild(el);}

async function _fetchAI(messages){
  try{
    const resp=await fetch('/iq-test/chat-proxy.php',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({messages})
    });
    if(resp.status===429||resp.status===503)return{content:null,rateLimit:true};
    const data=await resp.json();
    return{content:data.content||null,rateLimit:false};
  }catch(e){
    return{content:null,rateLimit:false};
  }
}

function _appendRateLimitMsg(){
  const msgs=document.getElementById('ai-chat-msgs');if(!msgs)return;
  const div=document.createElement('div');
  div.className='ai-msg assistant ai-rate-limit-msg';
  const txt=_aiL('rateLimit','무료 AI 서버가 혼잡합니다. 잠시 후 재시도해주세요.');
  const btnTxt=_aiL('retryBtn','🔄 다시 시도');
  div.innerHTML=`<div class="ai-rate-txt">${txt}</div><button class="ai-retry-btn" onclick="retryAIChat(this)">${btnTxt}</button>`;
  msgs.appendChild(div);msgs.scrollTop=msgs.scrollHeight;
}

function retryAIChat(btn){
  const msgEl=btn?btn.closest('.ai-rate-limit-msg'):null;
  if(msgEl)msgEl.remove();
  if(!_chatInit||!_chatMsgs.length)return;
  const loader=_appendAILoader();
  _fetchAI(_chatMsgs).then(res=>{
    _removeAILoader(loader);
    if(res.rateLimit){_appendRateLimitMsg();}
    else if(res.content){_chatMsgs.push({role:'assistant',content:res.content});_appendAIMsg('assistant',res.content);}
    else{_appendAIMsg('assistant',_aiL('error','오류가 발생했습니다. 다시 시도해주세요.'));}
  });
}

async function sendAIChatMessage(){
  if(_chatBusy)return;
  const inp=document.getElementById('ai-chat-input');
  const btn=document.getElementById('ai-chat-send');
  if(!inp)return;
  const text=inp.value.trim();if(!text)return;
  inp.value='';inp.style.height='auto';
  _chatBusy=true;if(btn)btn.disabled=true;
  _chatMsgs.push({role:'user',content:text});
  _appendAIMsg('user',text);
  const loader=_appendAILoader();
  const res=await _fetchAI(_chatMsgs);
  _removeAILoader(loader);
  if(res.rateLimit){
    _chatMsgs.pop(); // remove failed user message from history
    _appendRateLimitMsg();
  } else if(res.content){
    _chatMsgs.push({role:'assistant',content:res.content});
    _appendAIMsg('assistant',res.content);
  } else {
    _chatMsgs.pop();
    _appendAIMsg('assistant',_aiL('error','오류가 발생했습니다. 다시 시도해주세요.'));
  }
  _chatBusy=false;if(btn)btn.disabled=false;
  if(inp)inp.focus();
}

function handleAIChatKey(e){
  const ta=e.target;
  ta.style.height='auto';
  ta.style.height=Math.min(ta.scrollHeight,80)+'px';
  if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendAIChatMessage();}
}
