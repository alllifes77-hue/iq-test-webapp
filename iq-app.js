// ═══════════════════════════════════════════════════════════
// IQ APP ENGINE
// ═══════════════════════════════════════════════════════════

// Kakao SDK init (replace YOUR_KAKAO_JS_KEY with your key from https://developers.kakao.com)
try { if(window.Kakao && !Kakao.isInitialized()) { const _kk = window.IQ_KAKAO_KEY || 'YOUR_KAKAO_JS_KEY'; if(_kk !== 'YOUR_KAKAO_JS_KEY') Kakao.init(_kk); } } catch(e){}

// ── Mobile share button visibility ──
window.addEventListener('DOMContentLoaded', () => {
  if(navigator.share) {
    document.querySelectorAll('[id^="native-btn"]').forEach(b => b.style.display = '');
  }
  animateReliabilityBars();
  toggleFAQ(null);
  checkShareParams();
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
function buildShortSet(){return shuffle([...sample(seqPool,5),...sample(matPool,5),...sample(logPool,3),...sample(anaPool,2)]);}
function buildLongSet(){return shuffle([...sample(seqPool,10),...sample(matPool,10),...sample(spatPool,10),...sample(logPool,5),...sample(anaPool,5)]);}

// ── State ──
let currentMode='short',questions=[],curQ=0,answers=[],timer=null,timeLeft=0,testStart=0;
let extTest=null,extQuestions=[],extCurQ=0,extAnswers=[],extTimer=null;
let savedIQ=100,savedTopPct=50;
let savedResultData=null,isSharedView=false;

// ── Navigation ──
function showScreen(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById('screen-'+id).classList.add('active');window.scrollTo(0,0);}
function scrollToExt(){showScreen('results');setTimeout(()=>{const el=document.getElementById('ext-grid');if(el)el.scrollIntoView({behavior:'smooth'});},300);}
function restartAll(){showScreen('home');}
function switchMode(){startTest(currentMode==='short'?'long':'short');}

// ── Start test ──
function startTest(mode){
  currentMode=mode;
  document.getElementById('inst-title').textContent=mode==='short'?'단기 IQ 테스트 안내':'정밀 IQ 테스트 안내';
  document.getElementById('inst-sub').textContent=mode==='short'?'15문항 · 약 12분 · 수열·행렬·논리·유추 영역':'40문항 · 약 28분 · 4개 영역 심층 분석';
  document.getElementById('inst-time-info').textContent=mode==='short'?'난이도에 따라 45~95초 제한이 적용됩니다':'문항 난이도별 45~95초 제한이 적용됩니다';
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
  document.getElementById('q-prog-text').textContent=`문항 ${curQ+1} / ${tot}`;
  document.getElementById('q-type-lbl').textContent=q.typeLabel;
  document.getElementById('progress-fill').style.width=(curQ/tot*100)+'%';
  timeLeft=getTimeLimit(q);
  updateTimerUI(timeLeft);
  timer=setInterval(()=>{timeLeft--;updateTimerUI(timeLeft);if(timeLeft<=0){clearInterval(timer);autoSkip();}},1000);
  const card=document.getElementById('q-card');
  card.innerHTML=buildQHTML(q,curQ);
  card.style.animation='none';void card.offsetHeight;card.style.animation='slideIn .3s ease';
}

function buildQHTML(q,idx){
  let html=`<div class="q-num">문항 ${idx+1} &nbsp;·&nbsp;<span class="tag" style="background:var(--primary-bg);color:var(--primary-mid)">${q.typeLabel}</span></div>
    <div class="q-text">${q.q}</div>`;
  if(q.type==='sequence') html+=`<div class="q-seq">${q.seq}</div>`;
  else if(q.type==='matrix') html+=buildMatrixHTML(q.matrix);
  else if(q.type==='analogy') html+=`<div class="q-sub" style="font-size:18px;font-weight:700;color:var(--text);padding:14px;background:var(--primary-bg);border-radius:12px;margin:10px 0 20px;">${q.analogy}</div>`;
  else if(q.type==='logic') html+=`<div class="q-premise">${q.premise}</div>`;
  html+=`<div class="options-grid">`;
  ['A','B','C','D'].forEach((L,i)=>{html+=`<div class="option" id="opt${i}" onclick="selectAns(${i})"><div class="opt-letter">${L}</div><div class="opt-text">${q.opts[i]}</div></div>`;});
  html+=`</div><div class="q-nav"><span class="q-nav-hint">선택 후 자동으로 다음 문항으로 넘어갑니다</span><button class="btn btn-secondary btn-sm" onclick="skipQ()">건너뛰기 →</button></div>`;
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

function selectAns(idx){
  clearInterval(timer);
  const q=questions[curQ];
  answers[curQ]={selected:idx,correct:q.correct};
  document.querySelectorAll('.option').forEach((el,i)=>{
    el.style.pointerEvents='none';
    if(q.correct!==undefined&&i===q.correct)el.classList.add('correct');
    if(i===idx&&idx!==q.correct)el.classList.add('wrong');
    if(i===idx)el.classList.add('selected');
  });
  setTimeout(advanceQ,950);
}
function skipQ(){clearInterval(timer);answers[curQ]={selected:-1,correct:questions[curQ].correct};advanceQ();}
function autoSkip(){answers[curQ]={selected:-1,correct:questions[curQ].correct};advanceQ();}
function advanceQ(){curQ++;if(curQ>=questions.length)finishTest();else renderQ();}

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
  const mean=total*0.50,sd=total*0.17;
  const z=(correct-mean)/sd;
  return Math.max(55,Math.min(148,Math.round(100+z*15)));
}
function getIQCat(iq){return iqCats.find(c=>iq>=c.min)||iqCats[iqCats.length-1];}

function computeResults(){
  const correct=answers.filter(a=>a&&a.selected!==-1&&a.selected===a.correct).length;
  const total=questions.length;
  const iq=calcIQ(correct,total);
  const pctile=getIQPercentile(iq);
  const topPct=100-pctile;
  const cat=getIQCat(iq);
  const elapsed=Math.round((Date.now()-testStart)/1000);
  savedIQ=iq;savedTopPct=topPct;
  savedResultData={iq,cat:cat.label,topPct,mode:currentMode,correct,total};

  document.getElementById('res-test-label').textContent=currentMode==='short'?'단기 IQ 테스트 결과':'정밀 IQ 테스트 결과';
  document.getElementById('res-iq').textContent=iq;
  document.getElementById('res-cat').textContent=cat.label;
  document.getElementById('res-cat').style.color=cat.color;
  document.getElementById('res-desc').textContent=cat.desc;
  document.getElementById('r-correct').textContent=`${correct}/${total}`;
  document.getElementById('r-acc').textContent=Math.round(correct/total*100)+'%';
  document.getElementById('r-time').textContent=Math.floor(elapsed/60)+'분 '+(elapsed%60)+'초';
  document.getElementById('r-top').textContent=topPct;
  document.getElementById('res-pct-label').textContent=`상위 ${topPct}%`;
  document.getElementById('pct-text').textContent=`상위 ${topPct}%`;
  document.getElementById('switch-btn').textContent=currentMode==='short'?'📝 정밀 검사 받기':'⚡ 단기 검사 받기';

  // Share card update
  document.getElementById('sc-iq').textContent=iq;
  document.getElementById('sc-cat').textContent=cat.label.split(' ')[0];
  document.getElementById('sc-pct').textContent=`상위 ${topPct}%`;

  setTimeout(()=>{document.getElementById('pct-fill').style.width=pctile+'%';},300);
  setTimeout(()=>{
    drawBellCurve('bellChart',iq,'#4f46e5');
    if(currentMode==='long'){
      document.getElementById('radar-wrap').classList.remove('hidden');
      document.getElementById('breakdown-wrap').classList.remove('hidden');
      drawRadarChart();renderBreakdown();
    }
  },400);
  buildExtGrid();
}

// ── Bell Curve ──
function drawBellCurve(canvasId,score,color='#4f46e5',mean=100,sd=15){
  const ctx=document.getElementById(canvasId).getContext('2d');
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
      {label:'전체 분포',data:normal,borderColor:'rgba(79,70,229,.35)',backgroundColor:'rgba(79,70,229,.07)',fill:true,tension:.4,pointRadius:0,borderWidth:2},
      {label:'나의 위치',data:filled,borderColor:color,backgroundColor:color+'28',fill:true,tension:.4,pointRadius:0,borderWidth:2.5}
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
  const ctx=document.getElementById('radarChart').getContext('2d');
  new Chart(ctx,{type:'radar',data:{labels,datasets:[{label:'영역별 정답률 (%)',data,borderColor:'#4f46e5',backgroundColor:'rgba(79,70,229,.15)',pointBackgroundColor:'#4f46e5',pointBorderColor:'#fff',borderWidth:2}]},options:{responsive:true,scales:{r:{min:0,max:100,ticks:{color:'#94a3b8',backdropColor:'transparent',stepSize:25},grid:{color:'rgba(0,0,0,.07)'},pointLabels:{color:'#475569',font:{size:11}}}},plugins:{legend:{labels:{color:'#475569',font:{size:11}}}}}});
}
function renderBreakdown(){
  const areas=getAreaScores();
  const colors=['#4f46e5','#0284c7','#7c3aed','#059669','#d97706'];
  let html='';
  Object.entries(areas).filter(([,v])=>v.total>0).forEach(([name,v],i)=>{
    const pct=Math.round(v.correct/v.total*100);
    html+=`<div class="bd-item"><div class="bd-name">${name}</div><div class="bd-bar"><div class="bd-fill" style="width:0%;background:${colors[i%colors.length]}" data-w="${pct}"></div></div><div class="bd-score" style="color:${colors[i%colors.length]}">${pct}%</div></div>`;
  });
  document.getElementById('bd-list').innerHTML=html;
  setTimeout(()=>{document.querySelectorAll('#bd-list .bd-fill').forEach(el=>{el.style.width=el.dataset.w+'%';});},300);
}

// ── Extended test grid ──
function buildExtGrid(){
  const list=[
    {id:'eq',title:'감성 지수 (EQ)',icon:'💛',desc:'공감·감정 조절·사회적 기술',time:'12분'},
    {id:'memory',title:'작업 기억력',icon:'🧩',desc:'단기 기억 및 정보 유지 능력',time:'8분'},
    {id:'speed',title:'처리 속도',icon:'⚡',desc:'정보 처리 속도 및 반응 정확도',time:'5분'},
    {id:'creativity',title:'창의성 지수',icon:'🎨',desc:'발산적 사고 및 창의적 해결',time:'12분'},
    {id:'focus',title:'집중력 & 주의력',icon:'🎯',desc:'주의력 지속 및 세밀 처리',time:'8분'},
    {id:'cog_flex',title:'인지 유연성',icon:'🔄',desc:'사고 전환 및 적응 능력',time:'10분'}
  ];
  document.getElementById('ext-grid').innerHTML=list.map(t=>`
    <div class="ext-card" onclick="startExtTest('${t.id}')">
      <div class="ec-icon">${t.icon}</div>
      <h4>${t.title}</h4>
      <p>${t.desc}</p>
      <div class="ec-meta"><span class="badge badge-blue">⏱ ${t.time}</span><span class="badge badge-green">무료</span></div>
    </div>`).join('');
}

// ── Extended test engine ──
function startExtTest(id){
  extTest=extendedTests[id];
  extQuestions=shuffle(extTest.questions);
  extCurQ=0;extAnswers=[];
  document.getElementById('eq-type-lbl').textContent=extTest.title;
  showScreen('extended-test');renderExtQ();
}

function renderExtQ(){
  clearInterval(extTimer);
  const q=extQuestions[extCurQ],tot=extQuestions.length;
  document.getElementById('eq-prog-text').textContent=`문항 ${extCurQ+1} / ${tot}`;
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
  card.innerHTML=`<div class="q-num">문항 ${extCurQ+1} &nbsp;·&nbsp;<span class="tag" style="background:var(--primary-bg);color:var(--primary-mid)">${extTest.title}</span></div>
    <div class="q-text">${q.q}</div>
    <div class="options-grid">${q.opts.map((opt,i)=>`<div class="option" id="eopt${i}" onclick="selectExtAns(${i})"><div class="opt-letter">${['A','B','C','D'][i]}</div><div class="opt-text">${opt}</div></div>`).join('')}</div>
    <div class="q-nav"><span class="q-nav-hint">선택 후 자동으로 다음 문항으로 넘어갑니다</span><button class="btn btn-secondary btn-sm" onclick="extSkip()">건너뛰기 →</button></div>`;
  card.style.animation='none';void card.offsetHeight;card.style.animation='slideIn .3s ease';
}

function selectExtAns(idx){
  clearInterval(extTimer);
  const q=extQuestions[extCurQ];
  extAnswers[extCurQ]={selected:idx,weights:q.weights,correct:q.correct};
  document.querySelectorAll('.option').forEach((el,i)=>{
    el.style.pointerEvents='none';
    if(q.correct!==undefined&&i===q.correct)el.classList.add('correct');
    if(i===idx&&idx!==q.correct)el.classList.add('wrong');
    if(i===idx)el.classList.add('selected');
  });
  setTimeout(extAdvance,850);
}
function extSkip(){clearInterval(extTimer);extAnswers[extCurQ]={selected:-1};extAdvance();}
function extAutoSkip(){extAnswers[extCurQ]={selected:-1};extAdvance();}
function extAdvance(){extCurQ++;if(extCurQ>=extQuestions.length)finishExt();else renderExtQ();}

function finishExt(){
  clearInterval(extTimer);
  let result;
  if(extTest.id==='eq'){
    let total=0,max=0;
    extAnswers.forEach(a=>{if(a&&a.weights){max+=Math.max(...a.weights);if(a.selected!==-1)total+=a.weights[a.selected];}});
    result=extTest.scoring(total,max);
  } else {
    const correct=extAnswers.filter(a=>a&&a.selected!==-1&&a.selected===a.correct).length;
    result=extTest.scoring(correct,extQuestions.length);
  }
  showExtResults(result);
}

// ── Extended Results Display ──
function showExtResults(result){
  const score=result.score;
  const pctile=getExtPercentile(score,extTest.mean||76,extTest.sd||8);
  const topPct=100-pctile;

  // Hero
  document.getElementById('ext-res-label').textContent=extTest.title+' 결과';
  document.getElementById('ext-score').textContent=score;
  document.getElementById('ext-top-pct').textContent=topPct;
  document.getElementById('ext-res-cat').textContent=result.cat;
  document.getElementById('ext-res-desc').textContent=result.desc;

  // Stats row
  document.getElementById('ext-stat-score').textContent=score+'점';
  document.getElementById('ext-stat-pct').textContent='상위 '+topPct+'%';
  const levelRange=extTest.scoreRanges.find(r=>score>=r.min)||extTest.scoreRanges[extTest.scoreRanges.length-1];
  document.getElementById('ext-stat-level').textContent=levelRange.label;
  document.getElementById('ext-stat-level').style.color=levelRange.color;

  // Share card
  document.getElementById('ext-sc-score').textContent=score+'점';
  document.getElementById('ext-sc-cat').textContent=result.cat;
  document.getElementById('ext-sc-pct').textContent='상위 '+topPct+'%';

  // Ring animation
  const circ=2*Math.PI*60;
  const pct=Math.round(((score-62)/38)*100);
  const offset=circ*(1-pct/100);
  const ring=document.getElementById('ring-fill');
  ring.style.stroke=extTest.color;
  ring.setAttribute('stroke-dasharray',circ.toFixed(1));
  setTimeout(()=>{ring.style.strokeDashoffset=offset;},200);

  showScreen('ext-results');

  setTimeout(()=>{
    // Bell curve
    const bellTitle=`📊 ${extTest.title} 점수 분포에서의 위치`;
    document.getElementById('ext-bell-title').textContent=bellTitle;
    drawBellCurve('ext-bell-chart',score,extTest.color,extTest.mean||76,extTest.sd||8);

    // Radar
    document.getElementById('ext-chart-title').textContent=`🔍 ${extTest.title} 세부 영역 분석`;
    drawExtRadar(score);

    // Interpretation table
    renderInterpTable(score,extTest.scoreRanges,pctile);

    // Breakdown bars
    renderExtBreakdown(score);

    // Tips
    const tips=extTest.getTips(score);
    document.getElementById('tips-title').textContent=`💡 ${extTest.title} 개선 가이드`;
    document.getElementById('tips-list').innerHTML=tips.map(t=>`<div class="tip-item"><div class="tip-dot"></div><div>${t}</div></div>`).join('');
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

  let html='<tr><th>점수 범위</th><th>등급</th><th>전체 중 위치</th></tr>';
  const bounds=[100,...ranges.slice(1).map(r=>r.min),0];
  ranges.forEach((r,i)=>{
    const hi=i===0?100:ranges[i-1].min-1;
    const lo=r.min;
    const isActive=i===curIdx;
    html+=`<tr${isActive?' class="highlight"':''}>
      <td><span class="interp-rank-dot" style="background:${r.color}"></span>${lo}~${hi}점</td>
      <td style="font-weight:${isActive?'700':'400'};color:${isActive?r.color:'inherit'}">${r.label}${isActive?' ◀ 현재':''}</td>
      <td>상위 ${r.top}% 이내</td>
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
  const cats=catMap[extTest.id]||['영역1','영역2','영역3','영역4','영역5'];
  const base=(score-62)/38;
  const data=cats.map(()=>Math.max(10,Math.min(100,Math.round((base+(Math.random()*.24-.12))*100))));
  const ctx=document.getElementById('ext-radar').getContext('2d');
  new Chart(ctx,{type:'radar',data:{labels:cats,datasets:[{label:'세부 영역 점수',data,borderColor:extTest.color,backgroundColor:extTest.color+'22',pointBackgroundColor:extTest.color,pointBorderColor:'#fff',borderWidth:2}]},options:{responsive:true,scales:{r:{min:0,max:100,ticks:{color:'#94a3b8',backdropColor:'transparent',stepSize:25},grid:{color:'rgba(0,0,0,.07)'},pointLabels:{color:'#475569',font:{size:11}}}},plugins:{legend:{labels:{color:'#475569',font:{size:11}}}}}});
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
  const cats=catMap[extTest.id]||['영역1','영역2','영역3','영역4','영역5'];
  const base=(score-62)/38;
  let html='';
  cats.forEach(cat=>{
    const pct=Math.max(10,Math.min(100,Math.round((base+(Math.random()*.24-.12))*100)));
    html+=`<div class="bd-item"><div class="bd-name">${cat}</div><div class="bd-bar"><div class="bd-fill" style="width:0%;background:${extTest.color}" data-w="${pct}"></div></div><div class="bd-score" style="color:${extTest.color}">${pct}점</div></div>`;
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
    return `[${extTest.title}] 결과: ${score}점 (${cat}) | 상위 ${top}%\n나도 무료로 테스트해봐!`;
  }
  const iq=document.getElementById('res-iq').textContent;
  const catFull=document.getElementById('res-cat').textContent;
  const top=document.getElementById('r-top').textContent;
  const cat=catFull.split(' ')[0];
  return `[무료 IQ 테스트] 나의 IQ: ${iq}점 (${cat}) | 상위 ${top}%\n너는 몇 점이야? 바로 테스트해봐!`;
}

function getShareURL(){return window.location.href.split('?')[0];}

function getResultShareURL(isExt=false){
  const base='https://all-lifes.com/iq-test/';
  if(isExt&&extTest){
    const score=document.getElementById('ext-score').textContent;
    const cat=document.getElementById('ext-res-cat').textContent;
    const top=document.getElementById('ext-top-pct').textContent;
    return `${base}?r=ext&tid=${extTest.id}&s=${score}&cat=${encodeURIComponent(cat)}&top=${top}`;
  }
  if(savedResultData){
    const d=savedResultData;
    return `${base}?r=iq&iq=${d.iq}&cat=${encodeURIComponent(d.cat)}&top=${d.topPct}&mode=${d.mode}`;
  }
  return base;
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
    isSharedView=true;
    restoreIQResults(iq,catLabel,topPct,mode);
  } else if(r==='ext'){
    const tid=p.get('tid');
    const score=parseInt(p.get('s'))||70;
    const cat=p.get('cat')||'';
    const top=parseInt(p.get('top'))||50;
    isSharedView=true;
    restoreExtResults(tid,score,cat,top);
  }
}

function restoreIQResults(iq,catLabel,topPct,mode){
  const pctile=100-topPct;
  savedIQ=iq;savedTopPct=topPct;
  currentMode=mode;
  document.getElementById('shared-banner-iq').style.display='block';
  document.getElementById('res-test-label').textContent=mode==='short'?'단기 IQ 테스트 결과':'정밀 IQ 테스트 결과';
  document.getElementById('res-iq').textContent=iq;
  document.getElementById('res-cat').textContent=catLabel;
  const cat=getIQCat(iq);
  document.getElementById('res-cat').style.color=cat.color;
  document.getElementById('res-desc').textContent=cat.desc;
  document.getElementById('res-pct-label').textContent=`상위 ${topPct}%`;
  document.getElementById('pct-text').textContent=`상위 ${topPct}%`;
  document.getElementById('r-correct').textContent='--';
  document.getElementById('r-acc').textContent='--';
  document.getElementById('r-time').textContent='--';
  document.getElementById('r-top').textContent=topPct;
  document.getElementById('sc-iq').textContent=iq;
  document.getElementById('sc-cat').textContent=catLabel.split(' ')[0];
  document.getElementById('sc-pct').textContent=`상위 ${topPct}%`;
  document.getElementById('switch-btn').style.display='none';
  setTimeout(()=>{document.getElementById('pct-fill').style.width=pctile+'%';},300);
  setTimeout(()=>{drawBellCurve('bellChart',iq,'#4f46e5');},400);
  showScreen('results');
}

function restoreExtResults(tid,score,cat,topPct){
  extTest=extendedTests[tid];
  if(!extTest)return;
  const pctile=100-topPct;
  document.getElementById('shared-banner-ext').style.display='block';
  document.getElementById('ext-res-label').textContent=extTest.title+' 결과';
  document.getElementById('ext-score').textContent=score;
  document.getElementById('ext-top-pct').textContent=topPct;
  document.getElementById('ext-res-cat').textContent=cat;
  document.getElementById('ext-res-desc').textContent='';
  document.getElementById('ext-stat-score').textContent=score+'점';
  document.getElementById('ext-stat-pct').textContent='상위 '+topPct+'%';
  const levelRange=extTest.scoreRanges.find(r=>score>=r.min)||extTest.scoreRanges[extTest.scoreRanges.length-1];
  document.getElementById('ext-stat-level').textContent=levelRange.label;
  document.getElementById('ext-stat-level').style.color=levelRange.color;
  document.getElementById('ext-sc-score').textContent=score+'점';
  document.getElementById('ext-sc-cat').textContent=cat;
  document.getElementById('ext-sc-pct').textContent='상위 '+topPct+'%';
  const circ=2*Math.PI*60;
  const pct=Math.round(((score-62)/38)*100);
  const offset=circ*(1-pct/100);
  const ring=document.getElementById('ring-fill');
  ring.style.stroke=extTest.color;
  ring.setAttribute('stroke-dasharray',circ.toFixed(1));
  setTimeout(()=>{ring.style.strokeDashoffset=offset;},200);
  showScreen('ext-results');
  setTimeout(()=>{
    document.getElementById('ext-bell-title').textContent=`📊 ${extTest.title} 점수 분포에서의 위치`;
    drawBellCurve('ext-bell-chart',score,extTest.color,extTest.mean||76,extTest.sd||8);
    document.getElementById('ext-chart-title').textContent=`🔍 ${extTest.title} 세부 영역 분석`;
    drawExtRadar(score);
    renderInterpTable(score,extTest.scoreRanges,pctile);
    renderExtBreakdown(score);
    const tips=extTest.getTips(score);
    document.getElementById('tips-title').textContent=`💡 ${extTest.title} 개선 가이드`;
    document.getElementById('tips-list').innerHTML=tips.map(t=>`<div class="tip-item"><div class="tip-dot"></div><div>${t}</div></div>`).join('');
  },400);
}

function shareKakao(isExt=false){
  const text=getShareText(isExt);
  const url=getShareURL();
  if(window.Kakao&&Kakao.isInitialized()){
    try{
      Kakao.Share.sendDefault({objectType:'text',text,link:{mobileWebUrl:url,webUrl:url}});
      return;
    }catch(e){}
  }
  // Fallback: copy
  copyLink(isExt);
  showToast('💬 카카오 앱키 설정 후 이용 가능합니다. 텍스트가 복사되었습니다!');
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
    navigator.share({title:'IQ 테스트 결과',text,url}).catch(()=>copyLink(isExt));
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
    showToast('📋 결과가 클립보드에 복사되었습니다!');
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
