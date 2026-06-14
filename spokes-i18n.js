// 허브-스포크 설명 페이지 다국어 콘텐츠 (13개 언어, 네이티브 작성).
// build-spoke-content 워크플로우 산출물. ESM 모듈 — worker.js로 번들.
export const SPOKES = {
 "ko": {
  "tableHeaders": [
   "IQ 범위",
   "분류",
   "백분위(상위 %)",
   "인구 비율"
  ],
  "classLabels": [
   "최우수(영재)",
   "우수",
   "평균 상",
   "평균",
   "평균 하",
   "경계선",
   "매우 낮음"
  ],
  "spokes": {
   "good-iq-score": {
    "title": "좋은 IQ 점수는 몇 점? 평균·우수·천재 기준 정리",
    "desc": "좋은 IQ 점수 기준을 한눈에. IQ 100은 정확히 평균, 110~119는 평균 이상, 120 이상은 상위 10%(좋은 점수), 130 이상은 상위 2% 영재 수준입니다. 점수대별 의미를 정확히 설명합니다.",
    "keywords": "좋은 IQ 점수, IQ 평균, IQ 110 의미, IQ 120 상위, IQ 130 천재, 정상 IQ 범위, 높은 아이큐 기준",
    "h1": "좋은 IQ 점수는 몇 점일까? 점수대별 의미",
    "intro": "IQ 100이 정확히 평균이며, 120 이상이면 상위 10%로 흔히 '좋은 점수', 130 이상이면 상위 2%로 영재 수준으로 봅니다. 아래에서 각 점수대가 인구 중 어디쯤인지 정확히 설명합니다.",
    "sections": [
     {
      "q": "IQ 평균은 몇 점인가요?",
      "a": "IQ 평균은 정확히 100점입니다. IQ는 평균 100, 표준편차 15의 정규분포를 따르도록 설계되어 있어, 100점은 전체 인구의 정확히 50번째 백분위(한가운데)에 해당합니다. 대략 전체의 68%가 85~115점 사이, 95%가 70~130점 사이에 분포합니다."
     },
     {
      "q": "좋은 IQ 점수의 기준은 무엇인가요?",
      "a": "일반적으로 120점 이상이면 '좋은 점수'로 봅니다. IQ 120은 상위 약 10%에 해당해 또래 100명 중 상위 10명 안에 드는 수준이기 때문입니다. 110~119는 '평균 이상'으로 충분히 우수하며, 130 이상이면 상위 2%로 영재(매우 우수) 범주에 들어갑니다."
     },
     {
      "q": "IQ 110은 어느 정도 수준인가요?",
      "a": "IQ 110은 평균보다 약간 높은 '평균 상' 수준입니다. 백분위로는 약 75번째로 상위 25% 안에 들며, 표준편차의 약 3분의 2만큼 평균을 웃도는 점수입니다. 통계적으로 흔하지만 분명히 평균을 상회하는 양호한 점수입니다."
     },
     {
      "q": "IQ 130이면 천재인가요?",
      "a": "IQ 130은 상위 약 2%로 '영재(매우 우수)' 수준이며, 멘사(Mensa) 가입 기준선이기도 합니다. 다만 흔히 말하는 '천재' 이미지에 가까운 IQ 145 이상(상위 0.1%)과는 구분됩니다. 130은 통계적으로 50명 중 1명꼴로 나타나는 매우 높은 점수입니다."
     },
     {
      "q": "IQ 점수가 높으면 무조건 똑똑한 건가요?",
      "a": "IQ는 지능의 한 측면일 뿐, 사람의 전체 능력을 대표하지 않습니다. IQ는 주로 논리·패턴 인식·추론 같은 일반지능(g-요인)을 측정하며, 창의력·정서지능(EQ)·실무 능력·성실성은 별도로 측정되지 않습니다. 또한 온라인 점수는 교육·문화·검사 친숙도에 따라 달라지는 추정치이므로 절대적 기준으로 받아들이지 않는 것이 좋습니다."
     }
    ]
   },
   "iq-percentile-chart": {
    "title": "IQ 백분위표 — 내 IQ는 상위 몇 %일까?",
    "desc": "IQ 백분위표로 내 점수가 상위 몇 %인지 바로 확인하세요. IQ 100은 50%, 115는 상위 16%, 120은 상위 10%, 130은 상위 2%입니다. 점수와 백분위의 관계를 표로 정리했습니다.",
    "keywords": "IQ 백분위, IQ 상위 몇 퍼센트, IQ 백분위표, 내 IQ 순위, IQ 분포표, IQ 100 백분위, IQ 130 상위",
    "h1": "IQ 백분위표 — 내 점수는 상위 몇 %?",
    "intro": "IQ 백분위는 나보다 점수가 낮은 사람의 비율을 뜻하며, IQ 100은 50번째 백분위(딱 중간), 120은 상위 10%, 130은 상위 2%입니다. 아래 표에서 점수대별 백분위와 인구 비율을 한눈에 확인하세요.",
    "sections": [
     {
      "q": "IQ 백분위가 무엇인가요?",
      "a": "백분위는 나보다 점수가 낮은 사람의 비율을 백분율로 나타낸 값입니다. 예를 들어 IQ 120이 '90번째 백분위'라면, 나보다 점수가 낮은 사람이 전체의 90%라는 뜻이고 곧 상위 10%에 해당합니다. 점수 자체보다 '인구 중 내 위치'를 직관적으로 보여주는 지표입니다."
     },
     {
      "q": "IQ 점수와 백분위는 어떻게 대응되나요?",
      "a": "주요 점수의 백분위는 다음과 같습니다. IQ 100 = 50번째 백분위(정확히 중간), IQ 115 ≈ 84번째(상위 16%), IQ 120 ≈ 상위 10%, IQ 130 ≈ 상위 2%, IQ 145 ≈ 상위 0.1%입니다. 이 대응은 평균 100·표준편차 15의 정규분포에서 계산됩니다."
     },
     {
      "q": "IQ 100은 상위 몇 %인가요?",
      "a": "IQ 100은 상위 50%, 즉 정확히 한가운데입니다. 평균이자 50번째 백분위로, 인구의 절반은 100점 이상, 절반은 100점 미만입니다. IQ 분포에서 가장 많은 사람이 몰려 있는 지점이기도 합니다."
     },
     {
      "q": "내 IQ가 상위 1%에 들려면 몇 점이어야 하나요?",
      "a": "상위 1%에 들려면 약 IQ 135점이 필요합니다. 더 정확히는 IQ 130이 상위 약 2%, IQ 135가 상위 약 1%, IQ 145가 상위 약 0.1%에 해당합니다. 점수가 높아질수록 같은 1~2점 차이라도 백분위 변화가 급격히 커집니다."
     },
     {
      "q": "백분위표는 어떻게 읽어야 하나요?",
      "a": "표에서 자신의 점수가 속한 IQ 범위 행을 찾아 '백분위(상위 %)' 열을 보면 됩니다. 예를 들어 IQ 122라면 120~129 구간으로 상위 약 10% 안에 듭니다. 단, 온라인 검사 점수는 추정치이므로 백분위도 ±5~10점의 오차 범위를 감안해 참고용으로 보는 것이 바람직합니다."
     }
    ]
   },
   "online-iq-test-accuracy": {
    "title": "온라인 IQ 테스트 정확도 — 믿을 수 있을까?",
    "desc": "온라인 IQ 테스트는 얼마나 정확할까요? 본 검사는 레이븐 매트릭스와 CHC 이론 기반에 신뢰도(Cronbach's α) 0.85~0.92로 높지만, 임상 진단(WAIS)을 대체하지는 않습니다. 측정 원리와 한계를 솔직하게 설명합니다.",
    "keywords": "온라인 IQ 테스트 정확도, IQ 테스트 신뢰도, 무료 IQ 테스트 정확한가, 레이븐 매트릭스, IQ 검사 원리, IQ 테스트 믿을만한가",
    "h1": "온라인 IQ 테스트는 정확한가요?",
    "intro": "잘 설계된 온라인 IQ 테스트는 인지 능력을 추정하는 데 참고 가치가 높지만, 임상 진단을 대체하지는 않습니다. 본 검사는 레이븐 매트릭스와 CHC 이론을 기반으로 하며 내적 신뢰도(Cronbach's α)가 0.85~0.92 수준으로 높습니다.",
    "sections": [
     {
      "q": "이 IQ 테스트는 어떤 원리로 측정하나요?",
      "a": "본 검사는 레이븐 누진 행렬(Raven's Progressive Matrices)과 CHC 지능 이론을 기반으로 합니다. 비언어적 패턴 인식, 수열·논리 추론, 공간 추론 등을 통해 일반지능(g-요인)을 측정하며, 결과는 평균 100·표준편차 15의 정규분포에 맞춰 환산됩니다. 언어·문화 의존도가 낮은 도형 문항 중심이라 비교적 공정한 측정을 지향합니다."
     },
     {
      "q": "온라인 IQ 테스트는 얼마나 정확한가요?",
      "a": "본 검사의 내적 신뢰도(Cronbach's α)는 0.85~0.92로, 심리측정학적으로 높은 수준입니다. 신뢰도가 높다는 것은 같은 사람이 다시 풀어도 비슷한 점수가 나올 가능성이 크다는 뜻입니다. 다만 점수에는 ±5점 안팎의 측정 오차가 늘 존재하므로 절대적 수치가 아니라 범위로 이해하는 것이 정확합니다."
     },
     {
      "q": "온라인 IQ 테스트가 임상 검사를 대체할 수 있나요?",
      "a": "아니요, 온라인 IQ 테스트는 임상 진단을 대체할 수 없습니다. 정식 지능 진단은 전문가가 일대일로 시행하는 WAIS(웩슬러)나 스탠퍼드-비네 검사가 표준이며, 이는 작업기억·처리속도 등 여러 영역을 포괄합니다. 온라인 검사는 교육적·참고용 추정치로, 영재 판별이나 의학적 진단의 근거로 쓸 수 없습니다."
     },
     {
      "q": "왜 검사할 때마다 점수가 달라지나요?",
      "a": "점수는 컨디션·집중도·검사 친숙도·연습 효과에 따라 회마다 조금씩 달라집니다. 특히 비슷한 유형의 문제를 반복해 풀면 점수가 오르는 연습 효과가 있고, 세대 전체로도 점수가 오르는 플린 효과(10년에 약 3점)가 있습니다. 이런 변동성 때문에 단 한 번의 점수보다 여러 번의 평균적 경향을 보는 것이 합리적입니다."
     },
     {
      "q": "그래서 이 점수를 어떻게 받아들여야 하나요?",
      "a": "교육적·참고용 추정치로 받아들이는 것이 가장 정확합니다. 본 검사는 과학적 근거가 탄탄한 무료 온라인 IQ 테스트이지만, 문화·교육 배경과 검사 친숙도의 영향을 받으며 임상 진단이 아닙니다. 자기 인지 능력을 가늠하고 흥미롭게 탐색하는 도구로 활용하되, 자신이나 타인의 가치를 판단하는 잣대로는 사용하지 마세요."
     }
    ]
   },
   "improve-iq": {
    "title": "IQ 올릴 수 있을까? 과학이 말하는 진짜 방법",
    "desc": "IQ는 정말 올릴 수 있을까요? 작업기억 훈련은 유동지능(Gf)을 일부 높일 수 있지만 핵심 g는 유전 영향이 큽니다. 두뇌게임의 과장된 주장과, 독서·운동·수면 등 검증된 방법을 균형 있게 정리합니다.",
    "keywords": "IQ 높이는 법, IQ 올리는 방법, 머리 좋아지는 법, 두뇌 훈련 효과, 작업기억 훈련, 유동지능 향상, 인지 능력 높이기",
    "h1": "IQ를 올릴 수 있을까? 근거 기반 정리",
    "intro": "IQ는 어느 정도 변할 수 있지만 흔한 광고만큼 극적이지는 않습니다. 작업기억·유동지능(Gf) 훈련과 꾸준한 교육은 점수를 일부 끌어올릴 수 있는 반면, 핵심 일반지능(g)은 상당 부분 유전의 영향을 받습니다.",
    "sections": [
     {
      "q": "IQ는 정말 올릴 수 있나요?",
      "a": "부분적으로 가능하지만 한계가 분명합니다. 작업기억 훈련(예: N-back)과 같은 인지 훈련은 유동지능(Gf)을 일시적·소폭으로 높일 수 있고, 교육 기간이 길수록 IQ 점수가 올라간다는 연구도 일관되게 나옵니다. 다만 핵심 일반지능(g-요인)은 유전의 영향이 커서, 누구나 단기간에 크게 끌어올릴 수 있는 것은 아닙니다."
     },
     {
      "q": "두뇌 게임 앱이 정말 효과가 있나요?",
      "a": "두뇌 게임의 효과는 흔히 과장돼 있습니다. 대부분의 두뇌 트레이닝은 '그 게임 자체'에는 능숙해지지만, 그 향상이 일상의 전반적 지능으로 옮겨가는 '전이 효과'는 약하거나 불확실하다는 것이 다수 연구의 결론입니다. 따라서 게임 점수가 오른다고 실제 IQ가 그만큼 오르는 것은 아닙니다."
     },
     {
      "q": "교육은 IQ에 영향을 주나요?",
      "a": "네, 정규 교육은 IQ를 높이는 가장 일관된 요인 중 하나입니다. 여러 연구에서 학교 교육을 1년 더 받을 때마다 IQ가 평균 1~5점 상승하는 효과가 관찰됩니다. 새로운 지식과 추론 훈련이 누적되며 인지 능력 전반을 끌어올리기 때문으로 해석됩니다."
     },
     {
      "q": "생활 습관으로 머리를 좋게 할 수 있나요?",
      "a": "생활 습관은 IQ를 극적으로 올리기보다 인지 능력을 최상으로 유지·발휘하게 돕습니다. 충분한 수면, 규칙적인 유산소 운동, 꾸준한 독서와 새로운 기술 학습은 집중력·기억력·추론력을 뒷받침하는 가장 검증된 방법입니다. 반대로 만성 수면 부족과 스트레스는 검사 점수를 실제보다 낮게 만들 수 있습니다."
     },
     {
      "q": "성인이 되면 IQ를 더 올릴 수 없나요?",
      "a": "성인도 인지 능력을 개선하고 유지할 수 있습니다. 유동지능(새로운 문제 해결력)은 보통 20대에 정점을 찍고 서서히 감소하지만, 결정지능(지식·경험·어휘)은 중년 이후까지 계속 늘어납니다. 평생 학습, 운동, 사회적 활동, 좋은 수면은 나이가 들어도 인지 기능을 높게 유지하는 데 큰 도움이 됩니다."
     }
    ]
   }
  },
  "faq8": [
   {
    "q": "IQ 테스트란 무엇이고 무엇을 측정하나요?",
    "a": "IQ 테스트는 일반지능(g-요인)을 측정하는 표준화된 검사입니다. 수열 추론, 비언어적 패턴 인식, 공간 추론, 논리적 사고 등을 통해 인지 능력을 평가하며, 결과는 평균 100·표준편차 15의 정규분포를 따릅니다. 즉 점수는 절대적 능력치가 아니라 '같은 인구 집단 안에서 나의 상대적 위치'를 나타냅니다."
   },
   {
    "q": "이 무료 IQ 테스트는 정확한가요?",
    "a": "본 검사는 레이븐 누진 행렬과 CHC 이론을 기반으로 하며, 내적 신뢰도(Cronbach's α)가 0.85~0.92로 높은 편입니다. WAIS-IV 같은 임상 검사를 완전히 대체하지는 않지만, 인지 능력을 가늠하는 참고 자료로서 가치가 높고 온라인에서 접할 수 있는 가장 과학적 근거가 탄탄한 무료 IQ 테스트 중 하나입니다."
   },
   {
    "q": "검사하는 데 얼마나 걸리나요?",
    "a": "보통 10~20분 정도 소요됩니다. 문항은 난이도가 점차 올라가는 도형·패턴 위주로 구성되며, 시간에 쫓기지 않고 집중할 수 있는 조용한 환경에서 푸는 것이 가장 정확한 결과를 얻는 방법입니다. 회원가입 없이 바로 시작해 즉시 결과를 확인할 수 있습니다."
   },
   {
    "q": "좋은 IQ 점수는 몇 점인가요?",
    "a": "IQ 100이 정확히 평균이며, 120 이상이면 상위 10%로 흔히 '좋은 점수'로 봅니다. 110~119는 평균 이상, 120~129는 우수, 130 이상은 상위 2%로 영재(매우 우수) 수준입니다. 다만 IQ는 지능의 한 측면일 뿐이라 점수 하나로 사람을 평가할 수는 없습니다."
   },
   {
    "q": "IQ는 평생 바뀌나요, 변하지 않나요?",
    "a": "IQ는 어느 정도 변할 수 있습니다. 교육, 작업기억·유동지능 훈련, 건강한 생활 습관은 점수를 일부 높일 수 있는 반면, 핵심 일반지능(g)은 유전의 영향이 큽니다. 또한 세대 전체로 점수가 오르는 플린 효과(10년에 약 3점)도 있어, IQ는 완전히 고정된 값은 아닙니다."
   },
   {
    "q": "멘사(Mensa) 가입 기준 IQ는 몇 점인가요?",
    "a": "멘사 가입 기준은 상위 2%, 즉 IQ 약 130점 이상입니다(표준편차 15 기준). 전체 인구 50명 중 1명꼴에 해당하는 점수이며, 실제 가입을 위해서는 멘사가 인정하는 공식 감독 검사를 통과해야 합니다. 온라인 추정 점수만으로는 자격이 인정되지 않습니다."
   },
   {
    "q": "IQ와 EQ는 어떻게 다른가요?",
    "a": "IQ는 논리·추론 같은 인지적 지능을, EQ(정서지능)는 자기 감정과 타인 감정을 이해하고 조절하는 능력을 가리킵니다. 둘은 서로 다른 능력으로, IQ가 높다고 EQ가 높은 것은 아닙니다. 학업·문제 해결에는 IQ가, 대인관계·리더십·협업에는 EQ가 중요하게 작용하며 둘 다 삶에서 필요한 능력입니다."
   },
   {
    "q": "나이가 IQ 점수에 영향을 주나요?",
    "a": "IQ 점수는 같은 연령대와 비교해 산출되므로 나이가 들어도 '상대적' 점수는 비교적 안정적입니다. 다만 능력별로는 차이가 있어, 새로운 문제 해결력인 유동지능은 20대 이후 서서히 감소하는 반면 지식·어휘 중심의 결정지능은 중년 이후까지 늘어납니다. 아동의 경우 IQ가 더 크게 변동할 수 있어 반복 측정이 권장됩니다."
   }
  ]
 },
 "en": {
  "tableHeaders": [
   "IQ range",
   "Classification",
   "Percentile",
   "% of population"
  ],
  "classLabels": [
   "Very Superior / Gifted",
   "Superior",
   "High Average",
   "Average",
   "Low Average",
   "Borderline",
   "Extremely Low"
  ],
  "spokes": {
   "good-iq-score": {
    "title": "What Is a Good IQ Score? Average, High & Genius",
    "desc": "What is a good IQ score? 100 is exactly average, 110-119 is above average, 120+ puts you in the top 10%, and 130+ is gifted. Full breakdown plus a free IQ test.",
    "keywords": "what is a good IQ score, good IQ score, average IQ, high IQ, genius IQ, is 120 a good IQ, what IQ is gifted",
    "h1": "What Is a Good IQ Score?",
    "intro": "An IQ of 100 is exactly average; 110-119 is above average, 120 and up puts you in the top 10% (a genuinely 'good' score), and 130+ is considered gifted. IQ is built on a normal distribution with a mean of 100 and a standard deviation of 15, so most people cluster near the middle.",
    "sections": [
     {
      "q": "What is considered a good IQ score?",
      "a": "A score of 120 or higher is generally considered a good IQ, because it places you in roughly the top 10% of the population. On the standard scale (mean 100, SD 15), 110-119 is 'above average', 120-129 is 'superior', and 130+ is 'gifted'. There's no single official threshold, but most psychologists treat anything clearly above 115 (the top ~16%) as a strong result."
     },
     {
      "q": "What is the average IQ score?",
      "a": "The average IQ score is exactly 100, by design. IQ tests are normed so that the mean of the population sits at 100 with a standard deviation of 15, which means about 68% of people score between 85 and 115. Roughly half of all people fall between 90 and 109, the band usually labeled simply 'average'."
     },
     {
      "q": "Is an IQ of 120 good?",
      "a": "Yes, an IQ of 120 is good and places you in approximately the top 10% of the population. It sits in the 'superior' range (120-129) and is about 1.3 standard deviations above the mean. People in this band typically learn quickly and handle abstract reasoning well, though IQ alone never determines real-world success."
     },
     {
      "q": "What IQ score is considered genius or gifted?",
      "a": "An IQ of 130 or higher is the threshold most commonly used for 'gifted', and it represents roughly the top 2% of people. The popular word 'genius' has no formal cutoff, but 130+ is the level required to join Mensa, and scores around 145+ (top 0.1%) are exceptionally rare. Above 130, small differences in score become statistically less meaningful."
     },
     {
      "q": "Where do scores like 110, 120, and 130 actually sit?",
      "a": "On the standard curve, 110 is around the 75th percentile, 115 is about the 84th, 120 reaches roughly the top 10%, and 130 marks roughly the top 2%. Each 15-point step equals one full standard deviation, so the gap from 100 to 115 covers far more people than the gap from 130 to 145. This is why high scores get rarer very quickly as the number climbs."
     }
    ]
   },
   "iq-percentile-chart": {
    "title": "IQ Percentile Chart — What Percentile Is My IQ?",
    "desc": "IQ percentile chart with the full score-to-percentile mapping. See what percentile your IQ is: 100 = 50th, 115 = 84th, 120 = top 10%, 130 = top 2%.",
    "keywords": "IQ percentile chart, IQ percentile, what percentile is my IQ, IQ distribution chart, IQ score chart, IQ ranking by percentile",
    "h1": "IQ Percentile Chart: What Percentile Is My IQ?",
    "intro": "Your IQ percentile tells you the share of people you scored higher than: an IQ of 100 is the 50th percentile, 115 is about the 84th, 120 is roughly the top 10%, and 130 is roughly the top 2%. The table below maps every major IQ band to its classification, percentile, and share of the population.",
    "sections": [
     {
      "q": "What is an IQ percentile?",
      "a": "An IQ percentile is the percentage of people who score at or below your IQ. So if your IQ is at the 84th percentile, you scored higher than about 84% of the population. Percentiles are often more intuitive than raw scores because they describe your standing directly, rather than relying on the abstract 100-point scale."
     },
     {
      "q": "What is the difference between an IQ score and a percentile?",
      "a": "An IQ score is a standardized number on a fixed scale (mean 100, SD 15), while a percentile is your rank relative to everyone else. The score and the percentile describe the same result two different ways: an IQ of 115 and 'the 84th percentile' mean exactly the same thing. The score stays constant across the population, but it converts to a percentile through the normal distribution."
     },
     {
      "q": "What percentile is my IQ score?",
      "a": "Use the standard conversion: IQ 100 is the 50th percentile, 110 is about the 75th, 115 is about the 84th, 120 is about the 91st (top ~10%), 130 is about the 98th (top 2%), and 145 is about the 99.9th (top 0.1%). Below the mean, the curve mirrors: 85 is about the 16th percentile and 70 is about the 2nd. The full mapping is shown in the classification table on this page."
     },
     {
      "q": "How are IQ percentiles calculated?",
      "a": "IQ percentiles come from the normal (bell-curve) distribution, where scores are converted into standard deviations from the mean. Because IQ is set to a mean of 100 and an SD of 15, a score of 130 is exactly two standard deviations above average, which the normal curve places at roughly the 98th percentile. This is why the same percentile always corresponds to the same score, no matter who takes the test."
     },
     {
      "q": "What percentile is a genius-level or top-2% IQ?",
      "a": "A top-2% IQ is 130 or higher, which corresponds to about the 98th percentile and is the usual Mensa cutoff. The top 0.1% begins around an IQ of 145 (about the 99.9th percentile), a level reached by roughly 1 in 1,000 people. Because the bell curve thins out sharply at the edges, each additional point near the top represents far fewer people than a point near the middle."
     }
    ]
   },
   "online-iq-test-accuracy": {
    "title": "Are Online IQ Tests Accurate? Methodology & Limits",
    "desc": "Are online IQ tests accurate? This one uses Raven's matrices, CHC theory, and a reliability (Cronbach's alpha) of 0.85-0.92 — a solid estimate, but not a clinical diagnosis.",
    "keywords": "are online IQ tests accurate, online IQ test accuracy, is this IQ test reliable, free IQ test accuracy, real IQ test, how accurate are IQ tests",
    "h1": "Are Online IQ Tests Accurate?",
    "intro": "A well-designed online IQ test gives a reliable estimate of your reasoning ability, but it is not a clinical diagnosis — only a proctored test like the WAIS or Stanford-Binet provides that. This test is built on Raven's Progressive Matrices and CHC theory, scored on the standard scale (mean 100, SD 15), with an internal reliability (Cronbach's alpha) of about 0.85-0.92.",
    "sections": [
     {
      "q": "Are online IQ tests accurate?",
      "a": "A good online IQ test is a reliable educational estimate, but it is not as precise as a clinical assessment. Reputable tests use validated item types and norm scores against a large sample, so results usually correlate well with proctored tests. However, factors like distractions, no time supervision, and self-reporting mean an online score should be read as an estimate with a margin of several points."
     },
     {
      "q": "How is this IQ test designed and scored?",
      "a": "This test is based on Raven's Progressive Matrices and CHC (Cattell-Horn-Carroll) theory, the dominant modern framework for cognitive abilities. The matrix items measure fluid reasoning (Gf) — your ability to spot patterns and solve novel problems — without relying on language or prior knowledge. Scores are placed on the standard IQ scale, where 100 is the mean and 15 is the standard deviation."
     },
     {
      "q": "How reliable is this test (Cronbach's alpha)?",
      "a": "This test has an internal reliability, measured as Cronbach's alpha, of roughly 0.85-0.92, which is considered good to excellent for a cognitive assessment. Reliability describes how consistently the items measure the same underlying ability, so a high alpha means your score should be stable if you retook a similar test. Note that reliability is about consistency, not whether the test perfectly measures 'intelligence' in every context."
     },
     {
      "q": "Is an online IQ test the same as a clinical IQ test?",
      "a": "No — an online IQ test is an estimate, while a clinical IQ test is a formal diagnostic tool. The clinical standard is an individually administered, proctored battery such as the WAIS (adults) or Stanford-Binet, given by a trained psychologist. These cover several cognitive domains under controlled conditions, which is why they are used for diagnoses and official decisions and an online score is not."
     },
     {
      "q": "What can make an IQ score vary?",
      "a": "IQ scores can shift with culture, education, sleep, stress, and familiarity with test-style questions. The Flynn effect also shows average scores have risen across generations, which is why tests are periodically re-normed. Practice with similar puzzles can raise a score modestly, so a single result is best treated as a snapshot rather than a fixed, lifelong number."
     }
    ]
   },
   "improve-iq": {
    "title": "Can You Increase Your IQ? What Works & What Doesn't",
    "desc": "Can you increase your IQ? You can sharpen reasoning and working memory with training and education, but core 'g' is largely heritable. An evidence-based guide to what really works.",
    "keywords": "can you increase your IQ, how to improve IQ, increase IQ, brain training, does brain training work, how to boost intelligence, improve fluid intelligence",
    "h1": "Can You Increase Your IQ?",
    "intro": "You can meaningfully sharpen reasoning skills, working memory, and test performance through training and education, but raising your underlying general intelligence (g) substantially and permanently is not well supported — core g is largely heritable. The honest answer is that some gains are real and some popular claims are overstated.",
    "sections": [
     {
      "q": "Can you actually increase your IQ?",
      "a": "You can improve your measured performance and some specific skills, but large, permanent jumps in core intelligence are unlikely. Fluid intelligence (Gf) can shift modestly with sustained working-memory and reasoning practice, and more education reliably raises scores by a few points. However, general intelligence (g) is substantially heritable, so the realistic goal is to reach and maintain your potential, not to add 30 points."
     },
     {
      "q": "Does brain training really work?",
      "a": "Brain-training games mostly make you better at those specific games, with limited transfer to general intelligence. Research shows practice improves the trained task and sometimes closely related skills, but the evidence for broad, lasting IQ gains is weak. Working-memory training can produce small short-term improvements in fluid reasoning, though these effects tend to fade without continued practice."
     },
     {
      "q": "What lifestyle factors support cognitive performance?",
      "a": "Good sleep, regular exercise, reading, and learning new skills all help you perform at your cognitive best. Sleep consolidates memory and restores attention, aerobic exercise supports brain health, and continual learning builds knowledge (crystallized intelligence) over a lifetime. These habits won't turn an average score into a gifted one, but they protect and maximize the ability you have."
     },
     {
      "q": "What's the difference between fluid and crystallized intelligence?",
      "a": "Fluid intelligence (Gf) is your ability to reason and solve novel problems, while crystallized intelligence (Gc) is accumulated knowledge and skills. Gf tends to peak in early adulthood and is harder to change, whereas Gc keeps growing for decades through reading, education, and experience. Many lifelong learning gains show up in crystallized intelligence, which is why staying mentally active pays off over time."
     },
     {
      "q": "How can I do better on an IQ test specifically?",
      "a": "You can raise an IQ-test score modestly by getting familiar with the question types, sleeping well, and staying calm and focused during the test. Practicing pattern-recognition puzzles like matrices reduces the 'novelty penalty' of unfamiliar formats, which is a real effect. Just remember this improves your test score, not necessarily your underlying intelligence, so treat any single result as an estimate."
     }
    ]
   }
  },
  "faq8": [
   {
    "q": "What is IQ?",
    "a": "IQ (intelligence quotient) is a standardized score that compares your reasoning ability to the general population. It's built on a normal distribution with a mean of 100 and a standard deviation of 15, so most people score near 100. Rather than measuring everything about 'how smart' someone is, IQ mainly captures pattern recognition, logical reasoning, and problem-solving."
   },
   {
    "q": "Is this IQ test accurate?",
    "a": "This test is a reliable educational estimate, not a clinical diagnosis. It's based on Raven's Progressive Matrices and CHC theory with an internal reliability (Cronbach's alpha) of about 0.85-0.92, which is good for a cognitive test. For an official assessment you would need a proctored test such as the WAIS or Stanford-Binet, administered by a psychologist."
   },
   {
    "q": "How long does the IQ test take?",
    "a": "The test takes about 10-20 minutes to complete. It uses visual matrix questions that get progressively harder, so you can work at a steady pace without needing any special knowledge. Answering thoughtfully matters more than rushing, since the patterns are designed to test reasoning rather than speed alone."
   },
   {
    "q": "What is a good IQ score?",
    "a": "A score of 120 or higher is generally considered good, placing you in roughly the top 10%. On the standard scale, 100 is exactly average, 110-119 is above average, 120-129 is superior, and 130+ is gifted. Because of the bell curve, about 68% of people score between 85 and 115."
   },
   {
    "q": "Can your IQ change over time?",
    "a": "Your IQ score can shift modestly, though your core ability is relatively stable. Education, sleep, practice with test-style questions, and even your mood on the day can move a score by a few points. Fluid reasoning can improve a little with training, but large permanent gains are not well supported, since general intelligence is substantially heritable."
   },
   {
    "q": "What is the IQ cutoff for Mensa?",
    "a": "Mensa accepts people who score in the top 2% of the population, which corresponds to an IQ of about 130 or higher on a standard scale with SD 15. The exact qualifying score depends on which approved test you take, since different tests use slightly different scales. Roughly 1 in 50 people meet this threshold."
   },
   {
    "q": "What is the difference between IQ and EQ?",
    "a": "IQ measures reasoning and problem-solving ability, while EQ (emotional intelligence) describes how well you recognize and manage emotions in yourself and others. They are largely independent, so a high IQ does not guarantee a high EQ or vice versa. Both contribute to real-world outcomes, and EQ is especially linked to social and workplace skills."
   },
   {
    "q": "Does age affect IQ?",
    "a": "IQ scores are age-adjusted, so they compare you to others in your age group rather than to everyone. Different abilities peak at different times: fluid reasoning tends to peak in early adulthood, while crystallized knowledge (vocabulary and accumulated facts) can keep growing for decades. This is why a well-designed IQ test stays meaningful across the lifespan."
   }
  ]
 },
 "de": {
  "tableHeaders": [
   "IQ-Bereich",
   "Einordnung",
   "Perzentil",
   "Anteil der Bevölkerung"
  ],
  "classLabels": [
   "Höchst überdurchschnittlich (hochbegabt)",
   "Weit überdurchschnittlich",
   "Oberer Durchschnitt",
   "Durchschnitt",
   "Unterer Durchschnitt",
   "Grenzbereich",
   "Weit unterdurchschnittlich"
  ],
  "spokes": {
   "good-iq-score": {
    "title": "Was ist ein guter IQ-Wert? Tabelle & Einordnung",
    "desc": "Was ist ein guter IQ-Wert? 100 ist genau Durchschnitt, ab 120 gehörst du zu den besten 10 %, ab 130 giltst du als hochbegabt. Alle Werte erklärt.",
    "keywords": "guter IQ-Wert, was ist ein guter IQ, hoher IQ, durchschnittlicher IQ, IQ 120, IQ 130, ab wann hochbegabt, IQ Einordnung",
    "h1": "Was ist ein guter IQ-Wert?",
    "intro": "Ein IQ von 100 ist exakt der Durchschnitt; alles ab etwa 110 gilt als überdurchschnittlich, ab 120 gehörst du zu den besten 10 % und ab 130 zu den besten 2 % (Hochbegabung).",
    "sections": [
     {
      "q": "Ab welchem IQ-Wert spricht man von einem guten IQ?",
      "a": "Ein „guter\" IQ beginnt etwa ab 110 und wird ab 120 deutlich, denn dort gehörst du bereits zu den besten 10 % der Bevölkerung. Der IQ folgt einer Normalverteilung mit dem Mittelwert 100 und einer Standardabweichung von 15. Werte von 110 bis 119 heißen „oberer Durchschnitt\", 120 bis 129 „weit überdurchschnittlich\". Ein einzelner Wert sagt allerdings wenig über konkrete Stärken in Sprache, Mathematik oder Kreativität aus."
     },
     {
      "q": "Was bedeutet ein IQ von 100?",
      "a": "Ein IQ von 100 ist exakt der statistische Durchschnitt und entspricht dem 50. Perzentil. Das heißt: Genau die Hälfte aller Menschen erzielt einen niedrigeren, die andere Hälfte einen höheren Wert. Rund 68 % aller Menschen liegen im Bereich von 85 bis 115, weshalb die meisten Ergebnisse nahe der Mitte liegen. Ein Wert um 100 ist also völlig normal und kein Grund zur Sorge."
     },
     {
      "q": "Ist ein IQ von 120 hoch?",
      "a": "Ja, ein IQ von 120 ist hoch und bringt dich in die besten 10 % der Bevölkerung. Dieser Bereich (120–129) wird als „weit überdurchschnittlich\" eingestuft und ist typisch für Menschen mit akademischer oder anspruchsvoller beruflicher Ausbildung. Zum Vergleich: Ein IQ von 115 entspricht bereits dem 84. Perzentil. Ein Wert ab 120 ist daher klar überdurchschnittlich, aber noch unterhalb der Hochbegabungs-Schwelle."
     },
     {
      "q": "Ab welchem IQ gilt man als hochbegabt oder Genie?",
      "a": "Als hochbegabt gilt man üblicherweise ab einem IQ von 130, was den besten 2 % der Bevölkerung entspricht. Dies ist auch die übliche Aufnahmegrenze für Mensa. Den Begriff „Genie\" reservieren Fachleute oft für Werte ab etwa 145, also die besten 0,1 %. Wichtig: Ein hoher IQ misst vor allem logisch-analytisches Potenzial und sagt nichts über Motivation, soziale Kompetenz oder tatsächlichen Erfolg aus."
     },
     {
      "q": "Was ist ein durchschnittlicher IQ-Bereich?",
      "a": "Der durchschnittliche IQ-Bereich liegt zwischen 90 und 109 und umfasst etwa die Hälfte aller Menschen. Da der IQ um den Mittelwert 100 herum konzentriert ist, fallen die meisten Ergebnisse in dieses mittlere Band. Werte von 85 bis 89 gelten als „unterer Durchschnitt\", Werte von 110 bis 119 als „oberer Durchschnitt\". Ein Ergebnis in diesem Bereich ist völlig typisch und bedeutet eine normale kognitive Leistungsfähigkeit."
     }
    ]
   },
   "iq-percentile-chart": {
    "title": "IQ-Perzentil-Tabelle: Welches Perzentil ist mein IQ?",
    "desc": "IQ in Perzentil umrechnen: IQ 100 = 50. Perzentil, 115 = 84., 130 = beste 2 %. Komplette IQ-Perzentil-Tabelle mit Einordnung und Bevölkerungsanteil.",
    "keywords": "IQ Perzentil, IQ Perzentil Tabelle, welches Perzentil ist mein IQ, IQ Verteilung, IQ Prozentrang, IQ Tabelle, IQ Normalverteilung",
    "h1": "IQ-Perzentil-Tabelle: Welches Perzentil ist mein IQ?",
    "intro": "Das Perzentil sagt dir, wie viel Prozent der Menschen du übertriffst: Ein IQ von 100 entspricht dem 50. Perzentil, 115 dem 84. und 130 den besten 2 %.",
    "sections": [
     {
      "q": "Was ist der Unterschied zwischen IQ-Wert und Perzentil?",
      "a": "Der IQ-Wert ist deine Punktzahl auf der Skala (Mittelwert 100), das Perzentil gibt dagegen an, welchen Prozentsatz der Bevölkerung du übertriffst. Ein IQ von 120 entspricht zum Beispiel etwa dem 90. Perzentil, du liegst also über 90 % der Menschen. Das Perzentil ist oft anschaulicher, weil es deine relative Position in der Bevölkerung direkt beschreibt. Beide Angaben beruhen auf derselben Normalverteilung."
     },
     {
      "q": "Welches Perzentil entspricht einem IQ von 100?",
      "a": "Ein IQ von 100 entspricht exakt dem 50. Perzentil. Das bedeutet, du liegst genau in der Mitte: 50 % der Menschen schneiden schlechter, 50 % besser ab. Da 100 der Mittelwert der Normalverteilung ist, ballt sich die Mehrheit der Ergebnisse rund um diesen Punkt. Es ist der häufigste und damit der „typischste\" IQ-Wert überhaupt."
     },
     {
      "q": "Welchem Perzentil entspricht ein IQ von 130?",
      "a": "Ein IQ von 130 entspricht etwa dem 98. Perzentil, du gehörst damit zu den besten 2 % der Bevölkerung. Dieser Wert liegt zwei Standardabweichungen über dem Mittelwert und ist die übliche Schwelle für Hochbegabung sowie für eine Mensa-Aufnahme. Nur rund 2 von 100 Personen erreichen einen solchen Wert oder mehr. Ein IQ von 145 (drei Standardabweichungen) entspricht sogar den besten 0,1 %."
     },
     {
      "q": "Wie ist der IQ in der Bevölkerung verteilt?",
      "a": "Der IQ folgt einer Normalverteilung (Glockenkurve) mit dem Mittelwert 100 und einer Standardabweichung von 15. Daraus folgt, dass rund 68 % aller Menschen zwischen 85 und 115 liegen und etwa 95 % zwischen 70 und 130. Nur wenige Prozent erreichen sehr hohe oder sehr niedrige Werte an den Rändern der Kurve. Diese Verteilung ist die mathematische Grundlage jeder Perzentil-Einordnung."
     },
     {
      "q": "Wie rechne ich meinen IQ in ein Perzentil um?",
      "a": "Du rechnest deinen IQ über die Normalverteilung in ein Perzentil um, indem du den Abstand zum Mittelwert in Standardabweichungen misst. Faustregeln: IQ 100 = 50. Perzentil, 115 ≈ 84., 120 ≈ beste 10 %, 130 ≈ beste 2 %, 145 ≈ beste 0,1 %. Am einfachsten liest du den Wert in der Perzentil-Tabelle auf dieser Seite ab. Diese Zuordnung gilt für jede IQ-Skala mit Standardabweichung 15."
     }
    ]
   },
   "online-iq-test-accuracy": {
    "title": "Sind Online-IQ-Tests genau? Methodik & Zuverlässigkeit",
    "desc": "Sind Online-IQ-Tests genau? Sie basieren auf Raven-Matrizen und der CHC-Theorie mit hoher Reliabilität (α ≈ 0,85–0,92), ersetzen aber keinen klinischen Test.",
    "keywords": "Online-IQ-Test genau, sind IQ-Tests seriös, IQ-Test Zuverlässigkeit, IQ-Test Methodik, Raven Matrizen, wie genau ist ein IQ-Test, kostenloser IQ-Test seriös",
    "h1": "Sind Online-IQ-Tests genau?",
    "intro": "Ein gut konstruierter Online-IQ-Test liefert eine zuverlässige Schätzung deines logischen Denkvermögens, ersetzt aber keinen klinischen Test wie den WAIS und bleibt eine Orientierung, keine Diagnose.",
    "sections": [
     {
      "q": "Auf welcher Methodik beruht dieser IQ-Test?",
      "a": "Dieser Test basiert auf den Raven-Matrizen (Progressive Matrices) und der CHC-Theorie der Intelligenz, einem wissenschaftlich etablierten Modell. Die Aufgaben messen vor allem die fluide Intelligenz (logisches Schlussfolgern), die weitgehend sprach- und kulturunabhängig ist. Die Ergebnisse werden auf eine Normalverteilung mit Mittelwert 100 und Standardabweichung 15 abgebildet. So lässt sich dein Wert direkt mit der Allgemeinbevölkerung vergleichen."
     },
     {
      "q": "Wie zuverlässig ist ein Online-IQ-Test?",
      "a": "Die innere Zuverlässigkeit dieses Tests liegt bei einem Cronbachs Alpha von etwa 0,85 bis 0,92, was als gut bis sehr gut gilt. Das bedeutet, dass die Aufgaben konsistent dieselbe Fähigkeit messen und du bei einer Wiederholung ein ähnliches Ergebnis erzielen würdest. Ein gut gemachter Online-Test kommt damit nahe an die Genauigkeit professioneller Tests heran. Einzelne Tagesform, Konzentration und Testroutine können das Ergebnis dennoch um einige Punkte verschieben."
     },
     {
      "q": "Ersetzt ein Online-IQ-Test einen klinischen Test?",
      "a": "Nein, ein Online-IQ-Test ersetzt keinen klinischen Test und ist keine Diagnose. Der klinische Goldstandard sind beaufsichtigte Verfahren wie der WAIS oder der Stanford-Binet-Test, die von qualifizierten Psychologen einzeln durchgeführt werden. Diese erfassen mehrere Intelligenzbereiche und kontrollieren Störfaktoren. Ein Online-Test ist eine schnelle, lehrreiche Schätzung für die Selbsteinordnung, nicht für medizinische oder rechtliche Zwecke."
     },
     {
      "q": "Warum schwanken IQ-Ergebnisse zwischen verschiedenen Tests?",
      "a": "IQ-Ergebnisse schwanken, weil Bildung, kultureller Hintergrund, Testvertrautheit und Tagesform die Punktzahl beeinflussen. Hinzu kommt der Flynn-Effekt: Über Generationen steigen die Rohwerte um etwa 3 Punkte pro Jahrzehnt, weshalb die Normen regelmäßig angepasst werden müssen. Auch Übung und Schlafmangel können dein Ergebnis um einige Punkte verändern. Deshalb sollte man einen einzelnen Wert immer als Schätzung mit einer gewissen Schwankungsbreite verstehen."
     },
     {
      "q": "Kann ich einem kostenlosen IQ-Test vertrauen?",
      "a": "Du kannst einem kostenlosen IQ-Test vertrauen, wenn er auf einer anerkannten Methodik beruht, seine Zuverlässigkeit offenlegt und ehrlich seine Grenzen benennt. Seriöse Tests verwenden validierte Aufgabentypen wie Matrizen, normieren ihre Werte und versprechen keine offizielle Diagnose. Vorsicht ist bei Anbietern geboten, die schmeichelhaft hohe Werte oder ein „Zertifikat\" gegen Bezahlung anbieten. Dieser Test ist transparent: Er ist eine fundierte Orientierung, kein klinisches Gutachten."
     }
    ]
   },
   "improve-iq": {
    "title": "Kann man seinen IQ steigern? Was wirklich hilft",
    "desc": "Kann man seinen IQ steigern? Bildung und Training des Arbeitsgedächtnisses helfen der fluiden Intelligenz, doch der Kern-g-Faktor ist stark vererbt. Was Evidenz hat.",
    "keywords": "IQ steigern, kann man IQ erhöhen, IQ trainieren, Intelligenz verbessern, fluide Intelligenz trainieren, Gehirntraining IQ, IQ erhöhen Tipps",
    "h1": "Kann man seinen IQ steigern?",
    "intro": "Du kannst deine fluide Intelligenz durch Bildung und Training des Arbeitsgedächtnisses in bescheidenem Maß verbessern, doch der genetisch stark verankerte g-Faktor lässt sich nicht beliebig steigern.",
    "sections": [
     {
      "q": "Kann man seinen IQ überhaupt erhöhen?",
      "a": "Ja, du kannst deine messbare Intelligenzleistung in Grenzen steigern, vor allem die fluide Intelligenz (Gf). Bildung, geistig anspruchsvolle Tätigkeiten und gezieltes Training können deine Ergebnisse moderat verbessern. Der zugrunde liegende allgemeine Intelligenzfaktor (g) ist jedoch zu einem erheblichen Teil erblich und bleibt relativ stabil. Realistisch sind also spürbare, aber begrenzte Verbesserungen, keine dramatischen Sprünge."
     },
     {
      "q": "Welches Training verbessert die fluide Intelligenz?",
      "a": "Training des Arbeitsgedächtnisses, etwa mit anspruchsvollen N-Back-Übungen, kann die fluide Intelligenz in gewissem Umfang fördern. Auch das Erlernen komplexer Fähigkeiten wie einer Sprache, eines Instruments oder anspruchsvoller Mathematik fordert das Denken nachhaltig. Wichtig ist echte kognitive Herausforderung statt bloßer Wiederholung. Die Effekte sind real, aber meist moderat und nicht immer dauerhaft."
     },
     {
      "q": "Funktionieren Gehirnjogging-Apps wirklich?",
      "a": "Gehirnjogging-Apps machen vor allem in genau den trainierten Aufgaben besser, übertragen sich aber selten auf die allgemeine Intelligenz. Dieser Effekt heißt fehlender „Transfer\": Du wirst gut im Spiel, nicht unbedingt klüger im Alltag. Studien zeigen für kommerzielle Trainingsspiele meist nur kleine, eng begrenzte Verbesserungen. Vielfältiges Lernen und echte intellektuelle Herausforderungen bringen mehr als ein einzelnes App-Spiel."
     },
     {
      "q": "Welche Lebensgewohnheiten unterstützen die kognitive Leistung?",
      "a": "Ausreichend Schlaf, regelmäßige Bewegung und viel Lesen unterstützen deine kognitive Leistungsfähigkeit nachweislich. Körperliche Aktivität fördert die Durchblutung des Gehirns, Schlaf festigt Gelerntes, und Lesen baut Wissen und Sprachvermögen auf. Eine ausgewogene Ernährung und der Verzicht auf chronischen Stress helfen zusätzlich. Diese Gewohnheiten steigern weniger den Kern-IQ, als dass sie helfen, dein vorhandenes Potenzial voll auszuschöpfen."
     },
     {
      "q": "Welche Versprechen zur IQ-Steigerung sind übertrieben?",
      "a": "Übertrieben sind Versprechen, der IQ lasse sich durch ein einzelnes Produkt schnell und dauerhaft um viele Punkte erhöhen. Weder Nahrungsergänzungsmittel noch klassische Musik im Hintergrund („Mozart-Effekt\") heben den IQ nachhaltig an. Auch garantierte Punktzuwächse durch teure Kurse sind wissenschaftlich nicht belegt. Echte, bescheidene Fortschritte entstehen über Monate durch Bildung, Übung und gesunde Gewohnheiten, nicht über Nacht."
     }
    ]
   }
  },
  "faq8": [
   {
    "q": "Was ist der IQ überhaupt?",
    "a": "Der IQ (Intelligenzquotient) ist ein standardisierter Messwert für das logische Denk- und Problemlösevermögen. Er folgt einer Normalverteilung mit dem Mittelwert 100 und einer Standardabweichung von 15. Dein Wert zeigt also, wie du im Vergleich zur Allgemeinbevölkerung abschneidest, nicht deinen absoluten „Wert\" als Mensch."
   },
   {
    "q": "Ist dieser IQ-Test genau?",
    "a": "Dieser Test basiert auf den Raven-Matrizen und der CHC-Theorie und erreicht eine gute Zuverlässigkeit (Cronbachs Alpha ≈ 0,85–0,92). Damit liefert er eine fundierte Schätzung deines logischen Denkvermögens. Er ist jedoch eine lehrreiche Orientierung und ersetzt keinen beaufsichtigten klinischen Test wie den WAIS."
   },
   {
    "q": "Wie lange dauert der IQ-Test?",
    "a": "Der Test dauert in der Regel nur wenige Minuten und lässt sich bequem am Computer oder Smartphone durchführen. Nimm dir die Zeit in einer ruhigen Umgebung, in der du dich konzentrieren kannst. Da Tagesform und Konzentration das Ergebnis beeinflussen, solltest du den Test ausgeruht machen."
   },
   {
    "q": "Was ist ein guter IQ-Wert?",
    "a": "Ein IQ von 100 ist exakt der Durchschnitt, Werte ab 110 gelten als überdurchschnittlich. Ab 120 gehörst du zu den besten 10 %, ab 130 zu den besten 2 % (Hochbegabung). Rund 68 % aller Menschen liegen zwischen 85 und 115, ein Ergebnis in diesem Bereich ist also völlig normal."
   },
   {
    "q": "Kann sich der IQ im Laufe des Lebens ändern?",
    "a": "Ja, der gemessene IQ kann sich moderat verändern, vor allem die fluide Intelligenz lässt sich durch Bildung und Training etwas verbessern. Der grundlegende g-Faktor ist jedoch stark vererbt und bleibt relativ stabil. Schlaf, Bewegung und geistige Aktivität helfen, dein vorhandenes Potenzial voll auszuschöpfen."
   },
   {
    "q": "Ab welchem IQ wird man bei Mensa aufgenommen?",
    "a": "Mensa nimmt Personen ab einem IQ von 130 auf, was den besten 2 % der Bevölkerung entspricht. Dieser Wert liegt zwei Standardabweichungen über dem Mittelwert von 100. Nur etwa 2 von 100 Menschen erreichen einen solchen Wert in einem anerkannten, beaufsichtigten Test."
   },
   {
    "q": "Was ist der Unterschied zwischen IQ und EQ?",
    "a": "Der IQ misst logisch-analytisches Denken, der EQ (emotionale Intelligenz) dagegen das Erkennen und Steuern von Emotionen bei sich und anderen. Beide sind weitgehend unabhängig voneinander und ergänzen sich im Alltag. Ein hoher IQ garantiert keinen hohen EQ und umgekehrt, beide tragen auf ihre Weise zum Erfolg bei."
   },
   {
    "q": "Beeinflusst das Alter den IQ-Wert?",
    "a": "Der IQ wird altersnormiert, das heißt, du wirst stets mit deiner eigenen Altersgruppe verglichen, sodass der Wert über das Leben relativ stabil bleibt. Die fluide Intelligenz (schnelles Schlussfolgern) erreicht ihren Höhepunkt im jungen Erwachsenenalter, während die kristalline Intelligenz (Wissen und Wortschatz) bis ins hohe Alter weiter wachsen kann. Ein sinkender Rohwert in einzelnen Aufgaben bedeutet also nicht automatisch einen sinkenden IQ."
   }
  ]
 },
 "ja": {
  "tableHeaders": [
   "IQの範囲",
   "分類（知能水準）",
   "パーセンタイル（上位）",
   "人口に占める割合"
  ],
  "classLabels": [
   "非常に高い（ギフテッド）",
   "高い（優秀）",
   "平均の上",
   "平均",
   "平均の下",
   "境界域",
   "非常に低い"
  ],
  "spokes": {
   "good-iq-score": {
    "title": "IQはいくつから高い？平均・天才・上位の目安を解説",
    "desc": "IQ100はちょうど平均、110〜119は平均より上、120以上で上位約10%（高IQ）、130以上は上位約2%（ギフテッド）。良いIQスコアの基準と平均値、110・120・130の意味を数値で解説します。",
    "keywords": "IQ 高い いくつから, IQ 平均, 高い IQ, IQ 天才, IQ 120, IQ 130, 良い IQ スコア, IQ 110 すごい",
    "h1": "IQはいくつから高い？平均・高い・天才の基準を数値で解説",
    "intro": "IQ100はちょうど平均（50パーセンタイル）で、110〜119は平均より上、120以上で上位約10%に入り「高い」と言われ、130以上は上位約2%でギフテッド水準とされます。IQは平均100・標準偏差15の正規分布に従うため、数値が何を意味するかは統計的に明確に決まっています。",
    "sections": [
     {
      "q": "IQの平均はいくつですか？",
      "a": "IQの平均は定義上ちょうど100で、これが50パーセンタイル（真ん中）にあたります。IQは平均100・標準偏差15の正規分布になるよう設計されており、約68%の人が85〜115の範囲、約95%の人が70〜130の範囲に収まります。つまり「IQ100」は劣っているのではなく、もっとも標準的なスコアです。"
     },
     {
      "q": "IQはいくつから高いと言えますか？",
      "a": "一般にIQ120以上が「高い」とされ、これは上位約10%にあたる水準です。具体的には110〜119が「平均の上」、120〜129が「優秀（高IQ）」、130以上が「非常に高い（ギフテッド）」と分類されます。逆に言えばIQ120未満は統計上はごく一般的な範囲であり、110台でも十分に平均より上です。"
     },
     {
      "q": "IQ130はどのくらいすごいのですか？",
      "a": "IQ130は上位約2%にあたり、ギフテッド（英才）の目安とされる水準です。これは平均から標準偏差2つ分上に位置し、知能検査ではもっとも高い分類帯に入ります。国際的な高IQ団体であるメンサの入会基準も、多くの検査でこのIQ130（上位2%）付近に設定されています。"
     },
     {
      "q": "IQ140以上は天才ですか？",
      "a": "IQ140〜145以上は俗に「天才レベル」と呼ばれることが多く、特に145は上位約0.1%（千人に一人）にあたる極めて稀な水準です。ただし「天才」は心理学の正式な診断区分ではなく、創造性・専門知識・努力など知能指数だけでは測れない要素も大きく関わります。あくまで統計上どれだけ珍しいスコアかを示す目安と理解するのが適切です。"
     },
     {
      "q": "IQ110は良いスコアですか？",
      "a": "IQ110は「平均の上」にあたる良好なスコアで、上位約25%に入ります。標準的な平均（100）よりはっきり高く、学習面でも有利に働きやすい水準です。なお当サイトのようなオンラインIQテストは教育目的の推定値であり、文化や教育環境、テスト慣れによって数ポイント前後する点は理解しておくとよいでしょう。"
     }
    ]
   },
   "iq-percentile-chart": {
    "title": "IQパーセンタイル早見表｜あなたのIQは上位何％？",
    "desc": "IQ100は50パーセンタイル、115は上位約16%、120は上位約10%、130は上位約2%。IQスコアとパーセンタイル（上位何％か）の対応を一覧表で確認できます。あなたのIQが全体のどこに位置するかが一目でわかります。",
    "keywords": "IQ パーセンタイル, IQ 上位 何パーセント, IQ 分布 表, IQ 偏差値 換算, IQ ランキング 割合, IQ 一覧表",
    "h1": "IQパーセンタイル早見表｜スコアと上位％の対応一覧",
    "intro": "パーセンタイルとは「自分より低いスコアの人が全体の何％いるか」を示す指標で、IQ100は50パーセンタイル（真ん中）、115は約84パーセンタイル（上位約16%）、120は上位約10%、130は上位約2%にあたります。下の早見表で、自分のIQが全体のどこに位置するかを確認できます。",
    "sections": [
     {
      "q": "IQのパーセンタイルとは何ですか？",
      "a": "パーセンタイルとは、自分のIQより低い人が全体の何％いるかを示す順位の指標です。たとえば「84パーセンタイル」なら、自分より下に84%の人がいて、上位約16%に入っていることを意味します。IQそのものの数値より、全体のどこに位置するかを直感的に理解しやすいのが特徴です。"
     },
     {
      "q": "IQ120は上位何％ですか？",
      "a": "IQ120はおよそ上位10%（約91パーセンタイル）にあたります。これは平均から標準偏差1.33個分上の位置で、「優秀（高IQ）」の分類帯に入る水準です。10人に1人程度の珍しさであり、はっきりと平均より高いスコアと言えます。"
     },
     {
      "q": "IQ130は上位何％ですか？",
      "a": "IQ130は上位約2%（約98パーセンタイル）にあたり、50人に1人ほどの稀少さです。平均から標準偏差2つ分上に位置し、ギフテッドやメンサ入会基準の目安として使われる水準です。さらにIQ145になると上位約0.1%（千人に一人）まで珍しくなります。"
     },
     {
      "q": "IQと偏差値（パーセンタイル）はどう対応しますか？",
      "a": "IQは平均100・標準偏差15の正規分布で、パーセンタイルはその分布上の順位として計算されます。目安として、IQ85は約16パーセンタイル、100は50パーセンタイル、115は約84パーセンタイル、130は約98パーセンタイルです。上の早見表では各IQ帯ごとのパーセンタイルと人口割合をまとめているので、換算の参考にしてください。"
     },
     {
      "q": "平均的なIQの範囲はどこまでですか？",
      "a": "IQ90〜109が「平均」とされ、ここに人口全体の約50%が集まります。さらに範囲を広げると、約68%の人がIQ85〜115（標準偏差±1）、約95%がIQ70〜130（標準偏差±2）に収まります。多くの人が真ん中付近に集中し、両端にいくほど人数が急激に少なくなるのが正規分布の特徴です。"
     }
    ]
   },
   "online-iq-test-accuracy": {
    "title": "オンラインIQテストは正確？信頼性と精度を専門的に解説",
    "desc": "オンラインIQテストは教育目的の推定値で、当サイトはレーヴン漸進的マトリックスとCHC理論に基づき信頼性（α）約0.85〜0.92を確保。クリニックのWAISとの違いや、結果の正しい受け止め方をわかりやすく解説します。",
    "keywords": "オンライン IQ テスト 正確, IQ テスト 信頼性, 無料 IQ テスト 精度, IQ テスト 当てにならない, レーヴン マトリックス, IQ 測定 正しい",
    "h1": "オンラインIQテストは正確なのか？精度と信頼性の本当のところ",
    "intro": "オンラインIQテストは、適切に設計されていれば傾向の目安として十分役立ちますが、あくまで教育目的の推定値であり医学的な診断ではありません。当サイトのテストはレーヴン漸進的マトリックスとCHC理論に基づき、内部一貫性（クロンバックのα）約0.85〜0.92という良好な信頼性を確保しています。",
    "sections": [
     {
      "q": "当サイトのIQテストはどんな仕組みですか？",
      "a": "当サイトのテストは、図形パターンから法則を見抜く「レーヴン漸進的マトリックス」と、知能を体系化したCHC理論を土台にしています。出題されるのは言語や文化の影響を受けにくい論理・パターン認識の問題が中心で、流動性知能（Gf）を測る設計です。結果は平均100・標準偏差15の正規分布に基づいてスコア化されます。"
     },
     {
      "q": "オンラインIQテストはどれくらい信頼できますか？",
      "a": "当サイトのテストは内部一貫性の指標であるクロンバックのαが約0.85〜0.92で、心理測定上「良好〜優秀」とされる水準にあります。これは設問群が一貫して同じ能力を測れていることを示す数値です。ただし信頼性が高くても、後述のとおりオンライン環境特有の誤差はゼロにはできません。"
     },
     {
      "q": "オンラインIQテストとクリニックの検査は何が違いますか？",
      "a": "最大の違いは、オンラインテストが教育目的の推定値であるのに対し、WAISやスタンフォード・ビネーは臨床心理士が対面で実施する診断の標準であることです。専門家による検査は実施環境が統制され、言語・記憶・処理速度など複数領域を総合的に評価します。知的能力の正式な評価や診断が必要な場合は、必ず医療・専門機関の対面検査を受けてください。"
     },
     {
      "q": "なぜテストのたびにIQが変わるのですか？",
      "a": "オンラインIQの結果は、体調や集中力、テストへの慣れ、文化や教育背景によって数ポイント前後するためです。特に同種の問題を繰り返すと「テスト慣れ」でスコアが上がりやすく、また世代を通じて平均点が上昇する『フリン効果』も知られています。一度の数値に一喜一憂せず、おおよその傾向としてとらえるのが正しい使い方です。"
     },
     {
      "q": "オンラインIQテストの結果はどう受け止めればよいですか？",
      "a": "結果は自分の思考の傾向を知る目安として活用し、自己診断や優劣の決めつけには使わないことが大切です。スコアが高くても低くても、それだけで知能や将来が決まるわけではありません。学習・進路・医療上の判断が必要なときは、専門家による正式な評価を基準にしてください。"
     }
    ]
   },
   "improve-iq": {
    "title": "IQは上げられる？科学的に効果がある方法を検証",
    "desc": "IQの中核（g）は遺伝の影響が大きい一方、流動性知能（Gf）はワーキングメモリ訓練や教育で多少向上します。IQを上げる方法の科学的根拠、効果が誇張されがちな点、睡眠・読書・運動の役割を中立的に解説します。",
    "keywords": "IQ 上げる 方法, IQ 高める, ワーキングメモリ 訓練, 頭が良くなる方法, IQ 上がる トレーニング, 知能 向上",
    "h1": "IQは上げられるのか？効果が実証された方法と誇張の見分け方",
    "intro": "IQの中核である一般知能（g）は遺伝の影響が大きく、大きく劇的に上げるのは難しいというのが現在の科学的な見解です。ただし流動性知能（Gf）はワーキングメモリ訓練や教育によって多少向上する余地があり、睡眠・読書・運動といった生活習慣も認知機能の維持に役立ちます。",
    "sections": [
     {
      "q": "そもそもIQは上げられるのですか？",
      "a": "IQの中核である一般知能（g）は遺伝の影響がかなり大きく、本質的に大きく押し上げるのは難しいとされています。一方で、論理や新しい問題を解く力である流動性知能（Gf）は、訓練や教育によって多少改善できることが研究で示されています。「劇的に上がる」より「伸ばせる部分を着実に鍛える」というのが現実的な理解です。"
     },
     {
      "q": "ワーキングメモリ訓練でIQは上がりますか？",
      "a": "ワーキングメモリ（一時的に情報を保持・操作する力）の訓練は、流動性知能を多少向上させる可能性が報告されています。ただし、訓練した課題自体は上達しても、それが日常生活や全般的なIQへ広く波及するか（転移効果）については研究者の間で評価が分かれています。効果は限定的と考え、過度な期待は禁物です。"
     },
     {
      "q": "教育や学習はIQに影響しますか？",
      "a": "教育を受ける年数が増えるほどIQが上がる傾向は、複数の研究で一貫して確認されています。学校教育は知識だけでなく、抽象的に考える力や問題解決の方法そのものを鍛えるためと考えられています。読書や新しい技能の習得など、頭を継続的に使う活動も認知機能の維持・向上に有効です。"
     },
     {
      "q": "脳トレアプリでIQは本当に上がりますか？",
      "a": "市販の脳トレアプリの多くは、宣伝されるほど全般的なIQを上げる効果は実証されていません。練習した特定のゲームは上手くなりますが、その上達が他の能力やIQ全体に広がる証拠は乏しいのが実情です。誇大な広告に注意し、効果が限定的であることを前提に楽しむのが賢明です。"
     },
     {
      "q": "生活習慣は知能にどう関係しますか？",
      "a": "十分な睡眠・定期的な運動・読書などの生活習慣は、IQを劇的に上げるというより、本来の認知機能を最大限に発揮・維持するのに役立ちます。特に睡眠不足や運動不足は集中力や記憶力を低下させ、テストの成績にも悪影響を及ぼします。新しいことに挑戦し続けることが、長期的に脳の健康を保つ最良の方法の一つです。"
     }
    ]
   }
  },
  "faq8": [
   {
    "q": "そもそもIQとは何ですか？",
    "a": "IQ（知能指数）は、論理的思考・パターン認識・問題解決などの認知能力を数値化した指標です。平均100・標準偏差15の正規分布になるよう設計されており、100がちょうど平均にあたります。あくまで知能の一面を測る目安であり、人の価値や能力のすべてを表すものではありません。"
   },
   {
    "q": "このIQテストは正確ですか？",
    "a": "当サイトのテストはレーヴン漸進的マトリックスとCHC理論に基づき、信頼性（クロンバックのα）約0.85〜0.92という良好な水準を確保しています。ただし教育目的の推定値であり、臨床的な診断ではありません。正式な評価が必要な場合は、専門家によるWAISなどの対面検査を受けてください。"
   },
   {
    "q": "テストにはどのくらい時間がかかりますか？",
    "a": "数分から十数分程度で完了し、登録なしで無料で受けられます。図形パターンの問題に直感的に答えていくだけなので、空いた時間に気軽に挑戦できます。落ち着いて集中できる環境で受けると、より安定した結果が得られます。"
   },
   {
    "q": "良いIQスコアの目安はいくつですか？",
    "a": "IQ110〜119が「平均の上」、120以上で上位約10%の「高い」水準、130以上は上位約2%のギフテッド水準です。IQ100はちょうど平均で、決して低いスコアではありません。約95%の人がIQ70〜130の範囲に収まるため、多くの人がこの幅の中に位置します。"
   },
   {
    "q": "IQは年齢とともに変わりますか？",
    "a": "IQスコアは同年齢集団との比較で算出されるため、年齢が上がっても順位としての数値は比較的安定しています。一方で、新しい問題を素早く解く流動性知能は加齢とともにゆるやかに低下し、知識や語彙に基づく結晶性知能は中高年まで伸び続ける傾向があります。睡眠・運動・読書などの習慣が認知機能の維持に役立ちます。"
   },
   {
    "q": "メンサの入会基準のIQはいくつですか？",
    "a": "メンサの入会基準は上位2%、多くの検査でIQ130前後にあたります。これは50人に1人ほどの珍しさで、ギフテッドの目安とされる水準です。なお基準値は使用する検査の標準偏差によって異なる場合があるため、正式には認定された検査での受検が必要です。"
   },
   {
    "q": "IQとEQ（心の知能指数）は何が違いますか？",
    "a": "IQが論理や問題解決などの認知能力を測るのに対し、EQは自分や他人の感情を理解し対人関係をうまく扱う力を指します。両者は別々の能力で、IQが高いからEQも高いとは限りません。仕事や人生の成功には、どちらもバランスよく関わると考えられています。"
   },
   {
    "q": "IQは生まれつきで決まっていますか？",
    "a": "IQの中核（一般知能g）は遺伝の影響が大きいことが分かっていますが、すべてが生まれつきで固定されているわけではありません。教育や訓練によって流動性知能は多少伸ばせますし、睡眠・運動・継続的な学習が本来の力を発揮させ維持するのに役立ちます。遺伝と環境の両方が関わると理解するのが正確です。"
   }
  ]
 },
 "fr": {
  "tableHeaders": [
   "Plage de QI",
   "Classification",
   "Centile",
   "% de la population"
  ],
  "classLabels": [
   "Très supérieur (haut potentiel)",
   "Supérieur",
   "Moyenne haute",
   "Moyen",
   "Moyenne basse",
   "Limite (zone borderline)",
   "Très faible"
  ],
  "spokes": {
   "good-iq-score": {
    "title": "C'est quoi un bon score de QI ? Échelle expliquée",
    "desc": "Un bon score de QI, c'est quoi ? 100 est la moyenne exacte, 120+ vous place dans le top 10 %, 130+ chez les surdoués. Échelle, seuils et signification.",
    "keywords": "bon score de QI, c'est quoi un bon QI, QI moyen, QI 120, QI 130 surdoué, échelle de QI, quel QI est élevé, QI au-dessus de la moyenne",
    "h1": "C'est quoi un bon score de QI ?",
    "intro": "Un score de QI de 100 correspond exactement à la moyenne, 110 à 119 est au-dessus de la moyenne, et tout score de 120 ou plus vous place dans les 10 % les plus élevés de la population. À partir de 130, on parle généralement de haut potentiel intellectuel.",
    "sections": [
     {
      "q": "Quel est un score de QI considéré comme bon ?",
      "a": "Un score de QI de 120 ou plus est généralement considéré comme bon, car il situe la personne dans les 10 % les plus élevés. Le QI suit une distribution normale centrée sur 100 avec un écart-type de 15, ce qui signifie qu'environ 90 % des gens obtiennent moins de 120. Un résultat entre 110 et 119, qualifié de « moyenne haute », reste nettement au-dessus de la moyenne sans être rare."
     },
     {
      "q": "Quel est le QI moyen ?",
      "a": "Le QI moyen est de 100 par définition, c'est le point central de l'échelle. Les tests sont étalonnés pour que la majorité de la population se concentre autour de cette valeur : environ 68 % des personnes obtiennent un score compris entre 85 et 115. Un QI de 100 correspond donc au 50e centile, c'est-à-dire pile au milieu."
     },
     {
      "q": "Que signifie un QI de 120 ou de 130 ?",
      "a": "Un QI de 120 place une personne dans le top 10 %, tandis qu'un QI de 130 correspond aux 2 % les plus élevés et constitue le seuil habituel du haut potentiel intellectuel. Le seuil de 130 est aussi le critère d'admission le plus courant à Mensa. Au-delà, un QI de 145 ne concerne plus qu'environ 0,1 % de la population, soit une personne sur mille."
     },
     {
      "q": "Quel QI correspond au génie ?",
      "a": "Il n'existe pas de seuil officiel de « génie », mais les scores de 145 et plus, soit le top 0,1 %, sont souvent associés à ce terme. La notion de génie relève davantage de la réussite créative ou scientifique exceptionnelle que d'un simple chiffre de QI. Un score très élevé indique un fort potentiel cognitif, sans garantir à lui seul un accomplissement remarquable."
     },
     {
      "q": "Un QI inférieur à 100 est-il mauvais ?",
      "a": "Non, un QI inférieur à 100 n'est pas « mauvais », car par construction la moitié de la population se situe en dessous de cette valeur. Un score entre 90 et 109 reste dans la zone moyenne, parfaitement normale et fréquente. Le QI ne mesure qu'une partie du raisonnement logique et n'évalue ni la créativité, ni la motivation, ni les compétences pratiques ou sociales."
     }
    ]
   },
   "iq-percentile-chart": {
    "title": "Tableau des centiles de QI : à quel rang vous situez-vous",
    "desc": "Tableau des centiles de QI : convertissez votre score en rang sur 100. QI 100 = 50e centile, 115 = 84e, 130 = top 2 %. Classification complète.",
    "keywords": "tableau centile QI, centile de QI, à quel centile correspond mon QI, score de QI percentile, classification QI, rang QI population, QI 115 centile",
    "h1": "Tableau des centiles de QI",
    "intro": "Le centile indique le pourcentage de la population que vous dépassez : un QI de 100 correspond au 50e centile, 115 au 84e centile environ, et 130 au 98e centile (top 2 %). Le tableau ci-dessous met en correspondance chaque plage de score avec sa classification et son rang dans la population.",
    "sections": [
     {
      "q": "Quelle est la différence entre score de QI et centile ?",
      "a": "Le score de QI est une valeur sur une échelle centrée à 100, tandis que le centile indique la part de la population que vous surpassez. Par exemple, un QI de 115 ne signifie pas « 115 % » de quoi que ce soit : il correspond au 84e centile, c'est-à-dire que vous obtenez un meilleur résultat que 84 % des gens. Le centile est souvent plus parlant car il situe directement votre rang relatif."
     },
     {
      "q": "À quel centile correspond mon score de QI ?",
      "a": "Un QI de 100 correspond au 50e centile, 110 au 75e environ, 120 au 90e (top 10 %), 130 au 98e (top 2 %) et 145 au 99,9e (top 0,1 %). Cette correspondance découle directement de la distribution normale avec une moyenne de 100 et un écart-type de 15. Chaque tranche de 15 points s'éloigne de la moyenne d'un écart-type complet."
     },
     {
      "q": "Pourquoi le QI suit-il une courbe en cloche ?",
      "a": "Le QI suit une courbe en cloche, ou distribution normale, parce que l'intelligence est un trait influencé par de très nombreux facteurs qui se combinent. La plupart des gens se concentrent autour de la moyenne de 100, et les scores extrêmes, très bas ou très élevés, sont de plus en plus rares à mesure qu'on s'éloigne du centre. C'est pourquoi environ 68 % de la population se situe entre 85 et 115, et 95 % entre 70 et 130."
     },
     {
      "q": "Le 90e centile, c'est élevé ?",
      "a": "Oui, le 90e centile est élevé : il correspond à un QI d'environ 120 et signifie que vous dépassez 90 % de la population. Ce niveau est généralement qualifié de « supérieur » dans les classifications psychométriques. Atteindre le 98e centile (QI 130) est nettement plus rare et marque l'entrée dans la zone du haut potentiel intellectuel."
     },
     {
      "q": "Que veut dire être dans le top 2 % ?",
      "a": "Être dans le top 2 % signifie obtenir un QI d'au moins 130, c'est-à-dire surpasser 98 % de la population. C'est le seuil le plus couramment utilisé pour parler de haut potentiel intellectuel et le critère d'admission le plus répandu à Mensa. Sur 100 personnes prises au hasard, seules deux atteignent en moyenne ce niveau."
     }
    ]
   },
   "online-iq-test-accuracy": {
    "title": "Les tests de QI en ligne sont-ils fiables ? La vérité",
    "desc": "Les tests de QI en ligne sont-ils fiables ? Méthodologie (matrices de Raven, théorie CHC), fiabilité réelle et différence avec un test clinique WAIS.",
    "keywords": "test de QI en ligne fiable, test QI fiabilité, test QI gratuit précis, matrices de Raven, test QI clinique, vrai test de QI, fiabilité test intelligence",
    "h1": "Les tests de QI en ligne sont-ils fiables ?",
    "intro": "Un bon test de QI en ligne fournit une estimation utile et raisonnablement fiable du raisonnement logique, mais il s'agit d'un outil éducatif, et non d'un diagnostic clinique. Notre test repose sur les matrices progressives de Raven et la théorie CHC, avec une fiabilité (alpha de Cronbach) située entre 0,85 et 0,92.",
    "sections": [
     {
      "q": "Sur quelle méthodologie repose ce test de QI ?",
      "a": "Ce test s'appuie sur les matrices progressives de Raven et sur la théorie CHC (Cattell-Horn-Carroll), références reconnues en psychométrie. Les matrices de Raven mesurent l'intelligence fluide, c'est-à-dire la capacité à résoudre des problèmes nouveaux sans connaissances préalables, ce qui limite les biais liés au vocabulaire ou à la culture. Les scores sont ensuite étalonnés sur une distribution normale de moyenne 100 et d'écart-type 15."
     },
     {
      "q": "Quelle est la fiabilité de ce test de QI en ligne ?",
      "a": "La fiabilité de ce test, mesurée par l'alpha de Cronbach, se situe entre 0,85 et 0,92, ce qui est considéré comme bon à excellent. Cet indice évalue la cohérence interne des questions : plus il est proche de 1, plus le test mesure la même aptitude de façon stable. Ce niveau est comparable à celui de nombreux tests reconnus, même si un test clinique encadré reste plus précis individuellement."
     },
     {
      "q": "Un test en ligne vaut-il un test clinique comme le WAIS ?",
      "a": "Non, un test en ligne ne remplace pas un test clinique comme le WAIS ou le Stanford-Binet, qui restent la référence en matière de diagnostic. Ces tests cliniques sont administrés individuellement par un psychologue qualifié, couvrent plusieurs domaines cognitifs et durent souvent plus d'une heure. Un test en ligne offre une bonne estimation, mais ne doit jamais servir de base à un diagnostic médical ou scolaire."
     },
     {
      "q": "Qu'est-ce qui peut fausser mon résultat ?",
      "a": "Plusieurs facteurs peuvent influencer votre score : la fatigue, le stress, le niveau d'éducation, la familiarité avec ce type de tests et même la culture. L'effet Flynn montre d'ailleurs que les scores moyens ont augmenté au fil des générations, ce qui rappelle que le contexte compte. Pour un résultat représentatif, mieux vaut passer le test au calme, reposé et sans distraction."
     },
     {
      "q": "Le résultat constitue-t-il un diagnostic ?",
      "a": "Non, le résultat d'un test en ligne est une estimation éducative et ne constitue en aucun cas un diagnostic clinique. Aucun trouble de l'apprentissage, ni haut potentiel officiel, ne peut être établi à partir d'un test en ligne. Pour une évaluation officielle, il faut consulter un psychologue habilité qui administrera un test standardisé encadré."
     }
    ]
   },
   "improve-iq": {
    "title": "Peut-on augmenter son QI ? Ce qui marche vraiment",
    "desc": "Peut-on augmenter son QI ? L'entraînement de la mémoire de travail et l'éducation aident l'intelligence fluide, mais les gains sont limités. Le point honnête.",
    "keywords": "augmenter son QI, comment améliorer son QI, entraînement mémoire de travail, intelligence fluide, augmenter intelligence, exercices cerveau QI, peut-on changer son QI",
    "h1": "Peut-on augmenter son QI ?",
    "intro": "On peut améliorer modestement son intelligence fluide grâce à l'entraînement de la mémoire de travail et à l'éducation, mais l'idée d'augmenter durablement son QI de plusieurs dizaines de points est largement exagérée. L'intelligence de base (facteur g) est en grande partie héréditaire, même si un mode de vie sain aide à préserver ses capacités.",
    "sections": [
     {
      "q": "Peut-on vraiment augmenter son QI ?",
      "a": "On peut faire progresser certaines capacités cognitives, notamment l'intelligence fluide, mais les gains restent modestes et n'égalent pas les promesses des publicités pour applications « anti-âge cérébral ». L'intelligence générale, ou facteur g, est substantiellement héréditaire et relativement stable à l'âge adulte. L'éducation prolongée est l'un des rares facteurs dont l'effet positif sur le QI est solidement démontré."
     },
     {
      "q": "L'entraînement cérébral fonctionne-t-il ?",
      "a": "L'entraînement de la mémoire de travail peut améliorer les performances sur des tâches proches de celles entraînées, mais le transfert vers l'intelligence générale est limité. Autrement dit, on devient meilleur à l'exercice pratiqué sans forcément devenir « plus intelligent » de façon globale. Les jeux cérébraux commerciaux promettent souvent bien plus que ce que la recherche démontre réellement."
     },
     {
      "q": "Quel rôle joue l'éducation ?",
      "a": "L'éducation est l'un des leviers les mieux documentés pour augmenter le QI, chaque année de scolarité supplémentaire étant associée à un gain de quelques points. L'apprentissage, la lecture et la résolution de problèmes développent le raisonnement et enrichissent les connaissances mesurées par certains tests. C'est un effet durable, contrairement aux gains éphémères d'un simple entraînement répétitif."
     },
     {
      "q": "Le mode de vie influence-t-il l'intelligence ?",
      "a": "Oui, un mode de vie sain aide à préserver et à exprimer pleinement ses capacités cognitives, même s'il ne crée pas de QI à partir de rien. Un sommeil suffisant, une activité physique régulière, une lecture fréquente et une bonne alimentation soutiennent la concentration, la mémoire et le raisonnement. À l'inverse, le manque de sommeil ou le stress chronique dégradent nettement les performances mentales."
     },
     {
      "q": "Quels gains de QI sont réalistes ?",
      "a": "Des gains de quelques points sont réalistes grâce à l'éducation, à de bonnes habitudes et à la familiarité avec les tests, mais une hausse de 20 ou 30 points relève du mythe. Une partie de l'amélioration observée vient simplement de l'entraînement à passer ce type d'épreuves, et non d'une intelligence réellement supérieure. L'objectif raisonnable est d'exploiter au mieux son potentiel, plutôt que de chercher à transformer radicalement son QI."
     }
    ]
   }
  },
  "faq8": [
   {
    "q": "Qu'est-ce que le QI exactement ?",
    "a": "Le QI, ou quotient intellectuel, est une mesure standardisée du raisonnement logique et de la résolution de problèmes. Il est calibré sur une distribution normale de moyenne 100 et d'écart-type 15, de sorte que la majorité des gens se situent autour de 100. Il évalue surtout l'intelligence dite fluide et logique, et non la créativité, la culture générale ou les compétences sociales."
   },
   {
    "q": "Ce test de QI est-il fiable ?",
    "a": "Oui, ce test offre une bonne fiabilité, avec un alpha de Cronbach situé entre 0,85 et 0,92. Il repose sur les matrices progressives de Raven et la théorie CHC, des bases reconnues en psychométrie. Il s'agit toutefois d'une estimation éducative qui ne remplace pas un test clinique encadré comme le WAIS."
   },
   {
    "q": "Combien de temps dure le test ?",
    "a": "Le test se complète généralement en une vingtaine de minutes, selon votre rythme. Il vaut mieux le passer d'une traite, au calme et sans interruption, pour obtenir un résultat représentatif. Prendre son temps sur chaque question tout en évitant la fatigue donne l'estimation la plus juste."
   },
   {
    "q": "Quel est un bon score de QI ?",
    "a": "Un score de 100 correspond exactement à la moyenne, 110 à 119 est au-dessus de la moyenne, et 120 ou plus vous place dans les 10 % les plus élevés. À partir de 130, soit le top 2 %, on parle de haut potentiel intellectuel. La plupart des gens, environ 68 %, obtiennent un résultat compris entre 85 et 115."
   },
   {
    "q": "Le QI peut-il évoluer au cours de la vie ?",
    "a": "Le QI est relativement stable à l'âge adulte, mais il peut varier modestement avec l'éducation, l'entraînement et le mode de vie. L'intelligence fluide peut progresser un peu, tandis que le facteur g de base est en grande partie héréditaire. Le sommeil, la lecture et l'exercice physique aident surtout à préserver ses capacités existantes."
   },
   {
    "q": "Quel est le seuil de QI pour entrer à Mensa ?",
    "a": "Mensa admet les personnes dont le QI se situe dans les 2 % les plus élevés, soit un score d'environ 130 ou plus. L'admission exige toutefois un test supervisé et reconnu, et non un test en ligne. Atteindre ce niveau correspond au 98e centile de la population."
   },
   {
    "q": "Quelle différence entre QI et QE ?",
    "a": "Le QI mesure le raisonnement logique et la résolution de problèmes, tandis que le QE, ou quotient émotionnel, concerne la capacité à comprendre et à gérer les émotions. Ce sont deux dimensions distinctes : on peut avoir un QI élevé et un QE moyen, ou l'inverse. Les deux contribuent à la réussite, mais aucun test de QI ne mesure l'intelligence émotionnelle."
   },
   {
    "q": "L'âge influence-t-il le score de QI ?",
    "a": "Oui, les scores de QI sont calculés par rapport à des groupes du même âge, de sorte que votre résultat reflète votre position relative dans votre tranche d'âge. L'intelligence fluide tend à culminer chez le jeune adulte puis à décliner lentement, tandis que les connaissances accumulées (intelligence cristallisée) restent stables plus longtemps. Un bon test tient compte de l'âge pour situer correctement le score."
   }
  ]
 },
 "es": {
  "tableHeaders": [
   "Rango de CI",
   "Clasificación",
   "Percentil",
   "% de la población"
  ],
  "classLabels": [
   "Muy superior (superdotado)",
   "Superior",
   "Normal-alto",
   "Promedio (media)",
   "Normal-bajo",
   "Límite (fronterizo)",
   "Extremadamente bajo"
  ],
  "spokes": {
   "good-iq-score": {
    "title": "¿Qué es un buen CI? Tabla de puntuación",
    "desc": "¿Qué se considera un buen CI? 100 es la media exacta; 110-119 está por encima de la media y 120+ te sitúa en el 10% superior. Guía clara por rangos.",
    "keywords": "qué es un buen CI, buen coeficiente intelectual, CI alto, CI promedio, qué significa un CI de 120, CI de genio, escala de CI, niveles de coeficiente intelectual",
    "h1": "¿Qué es un buen CI? Guía por rangos de puntuación",
    "intro": "Un CI de 100 es exactamente la media de la población; a partir de 110-119 ya estás por encima del promedio y un 120 o más te coloca en el 10% superior, lo que suele considerarse un \"buen\" resultado. Un CI de 130 o más (top 2%) entra en el rango de superdotación.",
    "sections": [
     {
      "q": "¿Qué puntuación de CI se considera buena?",
      "a": "Un CI de 120 o más se considera \"bueno\" porque te sitúa aproximadamente en el 10% superior de la población. La escala se calibra con una media de 100 y una desviación típica de 15, así que cualquier resultado por encima de 110 ya indica una capacidad por encima del promedio. Los valores de 120 a 129 se clasifican como \"superior\" y reflejan un rendimiento claramente destacado frente a la población general."
     },
     {
      "q": "¿Cuál es el CI promedio de una persona?",
      "a": "El CI promedio es exactamente 100, que corresponde al percentil 50 de la población. El rango normal o de \"media\" abarca de 90 a 109, donde se encuentra cerca de la mitad de las personas. Por diseño, las pruebas se estandarizan para que la puntuación más frecuente sea 100, de modo que tu resultado siempre se interpreta en relación con los demás, no como una cantidad absoluta."
     },
     {
      "q": "¿Qué significa tener un CI de 110, 120 o 130?",
      "a": "Un CI de 110 está por encima de la media (percentil 75 aproximadamente), 120 te coloca en el 10% superior y 130 en el 2% superior. Cada salto de 15 puntos equivale a una desviación típica completa, así que la diferencia entre estos valores es considerable. Un 130 es además el umbral habitual de admisión en Mensa y marca el inicio del rango de superdotación."
     },
     {
      "q": "¿A partir de qué CI se considera a alguien superdotado o genio?",
      "a": "Se suele hablar de superdotación a partir de un CI de 130, que corresponde al 2% más alto de la población. El término \"genio\" no tiene una definición psicométrica oficial, pero se asocia informalmente a puntuaciones de 145 o más, presentes en alrededor del 0,1% de las personas. Conviene recordar que la superdotación abarca mucho más que una cifra: incluye creatividad, motivación y capacidad de aprendizaje."
     },
     {
      "q": "¿Es malo tener un CI por debajo de 100?",
      "a": "No, un CI ligeramente inferior a 100 sigue estando dentro del rango normal y no implica ningún problema. La franja de 90 a 109 se considera promedio y agrupa a una gran parte de la población, mientras que de 80 a 89 se habla de \"normal-bajo\". El CI mide solo una parte de la inteligencia y no predice por sí solo el éxito académico, profesional o personal."
     }
    ]
   },
   "iq-percentile-chart": {
    "title": "Tabla de percentiles de CI: ¿en qué percentil estás?",
    "desc": "Convierte tu CI en percentil con esta tabla: 100 = percentil 50, 115 ≈ 84, 130 = top 2%. Aprende qué significa tu puntuación frente a la población.",
    "keywords": "tabla de percentiles de CI, percentil de coeficiente intelectual, en qué percentil está mi CI, distribución de CI, qué percentil es un CI de 120, conversión CI percentil",
    "h1": "Tabla de percentiles de CI: convierte tu puntuación",
    "intro": "El percentil indica qué porcentaje de la población queda por debajo de tu puntuación: un CI de 100 equivale al percentil 50, 115 al percentil 84 y 130 al percentil 98 (top 2%). A continuación encontrarás la tabla completa para situar tu resultado.",
    "sections": [
     {
      "q": "¿Qué diferencia hay entre la puntuación de CI y el percentil?",
      "a": "El CI es tu puntuación estandarizada (con media 100), mientras que el percentil indica el porcentaje de personas que obtienen un resultado igual o inferior al tuyo. Por ejemplo, un CI de 120 corresponde al percentil 90, lo que significa que superas al 90% de la población. El percentil es a menudo más intuitivo porque te dice directamente tu posición relativa dentro del grupo."
     },
     {
      "q": "¿En qué percentil está un CI de 100?",
      "a": "Un CI de 100 corresponde exactamente al percentil 50, justo en el centro de la distribución. Esto significa que la mitad de las personas obtiene una puntuación inferior y la otra mitad superior. Como 100 es la media de diseño de la prueba, es por definición el punto que divide a la población en dos partes iguales."
     },
     {
      "q": "¿Qué percentil corresponde a un CI de 120 o 130?",
      "a": "Un CI de 120 corresponde aproximadamente al percentil 90 (10% superior) y un CI de 130 al percentil 98 (2% superior). Estos umbrales derivan de la distribución normal: cada desviación típica de 15 puntos desplaza tu posición de forma exponencial hacia los extremos. Por eso ganar 10 puntos en la parte alta de la escala representa un salto de percentil mucho mayor que en la zona media."
     },
     {
      "q": "¿Cómo se distribuyen los CI en la población?",
      "a": "Los CI siguen una distribución normal o \"campana de Gauss\" con media 100 y desviación típica de 15. Alrededor del 68% de las personas puntúa entre 85 y 115, y cerca del 95% entre 70 y 130. Esto implica que las puntuaciones extremas, tanto muy altas como muy bajas, son poco frecuentes por naturaleza, mientras que la mayoría se concentra cerca del promedio."
     },
     {
      "q": "¿Cómo convierto mi CI en percentil?",
      "a": "Para convertir tu CI en percentil basta con situarlo en la curva normal estándar: 85 ≈ percentil 16, 100 = 50, 115 ≈ 84, 120 ≈ 90 y 130 ≈ 98. La tabla de esta página recoge cada rango con su percentil y su porcentaje de población correspondiente. Ten en cuenta que se trata de valores de referencia que pueden variar ligeramente según la prueba y su muestra de estandarización."
     }
    ]
   },
   "online-iq-test-accuracy": {
    "title": "¿Son fiables los test de CI online? Metodología",
    "desc": "Los test de CI online son estimaciones educativas fiables (α ≈ 0,85-0,92) basadas en matrices de Raven y teoría CHC, pero no equivalen a un diagnóstico clínico.",
    "keywords": "test de CI online fiable, precisión test de coeficiente intelectual, son fiables los test de CI, validez test CI gratis, matrices de Raven, test CI vs WAIS",
    "h1": "¿Son fiables los test de CI online?",
    "intro": "Los test de CI online bien diseñados ofrecen una estimación educativa razonablemente fiable (consistencia interna de Cronbach α ≈ 0,85-0,92) basada en las matrices progresivas de Raven y la teoría CHC, pero no sustituyen a una evaluación clínica supervisada. Sirven para orientarte, no para diagnosticar.",
    "sections": [
     {
      "q": "¿En qué metodología se basa este test de CI?",
      "a": "Esta prueba se apoya en las matrices progresivas de Raven y en la teoría CHC (Cattell-Horn-Carroll), dos de los marcos más reconocidos en psicometría. Las matrices de Raven evalúan el razonamiento abstracto sin depender del idioma ni de conocimientos culturales, lo que reduce el sesgo. Las puntuaciones se calibran sobre una distribución normal con media 100 y desviación típica de 15, igual que las pruebas estandarizadas."
     },
     {
      "q": "¿Qué tan fiable es un test de CI gratuito por internet?",
      "a": "Un test online riguroso alcanza una fiabilidad (consistencia interna) de Cronbach α de aproximadamente 0,85 a 0,92, un valor considerado bueno en psicometría. Esto indica que sus preguntas miden de forma coherente la misma capacidad y que el resultado es bastante estable si repites la prueba. Aun así, la fiabilidad de un test breve y no supervisado es algo menor que la de una evaluación clínica completa."
     },
     {
      "q": "¿Es lo mismo un test online que una prueba clínica como el WAIS?",
      "a": "No: un test online es una estimación educativa, mientras que el estándar clínico es una prueba supervisada como el WAIS o el Stanford-Binet. Estas pruebas profesionales las administra un psicólogo en persona, miden varios dominios cognitivos y son las únicas válidas para un diagnóstico oficial. Un test gratuito por internet ofrece una aproximación útil, pero no tiene valor diagnóstico ni clínico."
     },
     {
      "q": "¿Qué factores pueden afectar a la precisión del resultado?",
      "a": "El resultado puede variar según tu nivel educativo, tu cultura, tu familiaridad con este tipo de pruebas, el cansancio o las distracciones del entorno. También influye el llamado efecto Flynn, la tendencia de las puntuaciones a aumentar con las generaciones, que obliga a reactualizar las normas periódicamente. Por eso es recomendable hacer el test descansado, sin interrupciones y entendiendo que es una estimación, no una medida exacta."
     },
     {
      "q": "¿Puedo usar el resultado para un diagnóstico médico o educativo?",
      "a": "No, ningún test online debe usarse como diagnóstico médico, psicológico o educativo. Para una valoración oficial de superdotación, dificultades de aprendizaje o discapacidad intelectual es imprescindible acudir a un profesional que administre una prueba estandarizada supervisada. Considera tu puntuación online como una referencia orientativa y educativa, nunca como un dictamen clínico."
     }
    ]
   },
   "improve-iq": {
    "title": "¿Se puede aumentar el CI? Qué funciona de verdad",
    "desc": "¿Se puede subir el CI? El entrenamiento de la memoria de trabajo y la educación mejoran la inteligencia fluida de forma modesta; el núcleo g es muy heredable.",
    "keywords": "cómo aumentar el CI, se puede subir el coeficiente intelectual, mejorar la inteligencia, entrenamiento memoria de trabajo, inteligencia fluida, ejercicios para el cerebro",
    "h1": "¿Se puede aumentar el CI? Evidencia real",
    "intro": "Sí, es posible mejorar de forma modesta la inteligencia fluida con educación y entrenamiento de la memoria de trabajo, aunque el núcleo de la inteligencia (el factor g) es en gran parte hereditario y difícil de cambiar. Muchas promesas de \"subir el CI rápido\" están exageradas.",
    "sections": [
     {
      "q": "¿Se puede aumentar realmente el coeficiente intelectual?",
      "a": "Sí, pero solo de manera moderada y sobre todo en la inteligencia fluida (Gf), la capacidad de razonar y resolver problemas nuevos. La educación formal es el factor con más respaldo científico: cada año adicional de escolarización se asocia a una mejora medible. El factor g, el núcleo más estable de la inteligencia, es en gran parte heredable y apenas varía con el entrenamiento."
     },
     {
      "q": "¿Funciona el entrenamiento de la memoria de trabajo?",
      "a": "El entrenamiento de la memoria de trabajo puede producir mejoras reales, aunque suelen ser modestas y no siempre se transfieren a la inteligencia general. Ejercicios como las tareas n-back mejoran sobre todo la propia habilidad entrenada y, en menor medida, el razonamiento fluido. Es una herramienta válida, pero conviene gestionar las expectativas: no convierte un CI medio en uno excepcional."
     },
     {
      "q": "¿Qué hábitos de vida ayudan a mantener la inteligencia?",
      "a": "Dormir bien, leer con regularidad y hacer ejercicio físico son los hábitos con mejor evidencia para mantener y proteger la función cognitiva. El sueño consolida la memoria y el aprendizaje, mientras que el ejercicio aeróbico favorece la salud cerebral a largo plazo. Una dieta equilibrada y la actividad mental continua también contribuyen a preservar tu rendimiento con el paso de los años."
     },
     {
      "q": "¿Sirven las apps de \"entrenamiento cerebral\" para subir el CI?",
      "a": "Las apps de entrenamiento cerebral te hacen mejorar en sus propios juegos, pero la evidencia de que aumenten la inteligencia general es escasa. Este fenómeno se llama falta de transferencia: practicar un ejercicio concreto rara vez eleva tu capacidad cognitiva global. Pueden ser entretenidas y útiles como práctica puntual, pero no son una vía fiable para incrementar el CI de forma duradera."
     },
     {
      "q": "¿Por qué cambian mis resultados entre un test y otro?",
      "a": "Tus resultados pueden variar por la práctica, el descanso, el estado de ánimo o la familiaridad con el formato de la prueba. Repetir test similares produce un \"efecto de aprendizaje\" que sube la puntuación sin que tu inteligencia real haya cambiado. Por eso una mejora puntual en un test online no equivale necesariamente a un aumento auténtico del CI, sino a menudo a una mayor práctica."
     }
    ]
   }
  },
  "faq8": [
   {
    "q": "¿Qué es el CI o coeficiente intelectual?",
    "a": "El CI (coeficiente intelectual) es una puntuación estandarizada que estima tu capacidad de razonamiento en relación con la población general. Se calibra con una media de 100 y una desviación típica de 15, de modo que tu resultado indica tu posición relativa frente a los demás. Mide sobre todo el razonamiento lógico, abstracto y la resolución de problemas, no toda la inteligencia humana."
   },
   {
    "q": "¿Es preciso este test de CI?",
    "a": "Este test ofrece una estimación educativa fiable, con una consistencia interna (Cronbach α) de aproximadamente 0,85 a 0,92, basada en las matrices de Raven y la teoría CHC. Es una buena referencia orientativa, pero no sustituye a una evaluación clínica supervisada como el WAIS. Considera tu puntuación como una aproximación útil, no como un diagnóstico oficial."
   },
   {
    "q": "¿Cuánto se tarda en hacer el test?",
    "a": "El test se completa en pocos minutos, normalmente entre 10 y 20 según tu ritmo. Está diseñado para medir tu razonamiento sin que la duración resulte agotadora. Para obtener un resultado más representativo, hazlo descansado, en un lugar tranquilo y sin interrupciones."
   },
   {
    "q": "¿Qué se considera una buena puntuación de CI?",
    "a": "Un CI de 120 o más se considera bueno porque te sitúa en el 10% superior de la población. La franja de 90 a 109 es la media, de 110 a 119 está por encima del promedio y a partir de 130 se habla de superdotación (2% superior). Recuerda que el CI mide solo una parte de la inteligencia y no determina por sí solo tu éxito en la vida."
   },
   {
    "q": "¿Puede cambiar el CI con el tiempo?",
    "a": "El CI es bastante estable en la edad adulta, aunque puede variar de forma modesta con la educación y el entrenamiento cognitivo. La inteligencia fluida puede mejorar algo con práctica de memoria de trabajo, pero el núcleo (factor g) es en gran parte hereditario. Hábitos como dormir bien, leer y hacer ejercicio ayudan a mantener tu rendimiento cognitivo a lo largo de los años."
   },
   {
    "q": "¿Qué CI se necesita para entrar en Mensa?",
    "a": "Mensa admite a personas con un CI de 130 o más, lo que corresponde al 2% superior de la población. Este umbral se mide con pruebas estandarizadas y supervisadas reconocidas por la organización. Un test online puede orientarte sobre si te acercas a ese nivel, pero para ingresar necesitarás realizar una prueba oficial homologada."
   },
   {
    "q": "¿Qué diferencia hay entre el CI y la inteligencia emocional (IE)?",
    "a": "El CI mide la capacidad de razonamiento lógico y abstracto, mientras que la inteligencia emocional (IE) se refiere a reconocer y gestionar las emociones, propias y ajenas. Son capacidades distintas y relativamente independientes: una persona puede destacar en una y ser media en la otra. Ambas son valiosas, y el éxito personal y profesional suele depender de la combinación de las dos."
   },
   {
    "q": "¿Influye la edad en el CI?",
    "a": "El CI está ajustado por edad, así que tu puntuación se compara siempre con la de personas de tu mismo grupo de edad. La inteligencia fluida tiende a alcanzar su punto máximo en la juventud y a descender lentamente con los años, mientras que la inteligencia cristalizada (conocimientos y vocabulario) suele mantenerse o aumentar. Por eso una puntuación estable a lo largo de la vida refleja un rendimiento constante respecto a tu propia generación."
   }
  ]
 },
 "pt": {
  "tableHeaders": [
   "Faixa de QI",
   "Classificação",
   "Percentil",
   "% da população"
  ],
  "classLabels": [
   "Muito superior / Sobredotado",
   "Superior",
   "Média alta",
   "Média",
   "Média baixa",
   "Limítrofe",
   "Extremamente baixo"
  ],
  "spokes": {
   "good-iq-score": {
    "title": "O que é um bom resultado de QI? Tabela e faixas",
    "desc": "Um bom resultado de QI começa em 120 (top 10%). Veja o que é QI alto, médio e de génio, e onde ficam 110, 120 e 130 na escala.",
    "keywords": "bom resultado de QI, QI alto, QI médio, QI de génio, o que é um QI normal, QI 120, QI 130, qual é um bom QI",
    "h1": "O que é considerado um bom resultado de QI?",
    "intro": "Um QI de 100 é exatamente a média; valores de 110 a 119 são acima da média, 120 ou mais coloca-o nos 10% mais altos (um \"bom\" resultado) e 130 ou mais corresponde aos 2% mais altos (sobredotação).",
    "sections": [
     {
      "q": "Qual é o resultado de QI médio?",
      "a": "O QI médio é exatamente 100, por definição da escala. Os testes de QI são calibrados para que a média da população seja 100 e o desvio-padrão seja 15, por isso cerca de 68% das pessoas obtêm entre 85 e 115. Um resultado próximo de 100 significa que pensa de forma semelhante à maioria das pessoas, não que tem capacidades limitadas."
     },
     {
      "q": "A partir de que valor o QI é considerado alto?",
      "a": "Um QI é considerado alto a partir de 120, valor que o coloca nos 10% melhores da população. A faixa de 110 a 119 já é \"média alta\" (acima da média), enquanto 120 a 129 é classificada como \"superior\". Acima de 130 entra-se no território de sobredotação, alcançado por apenas cerca de 2% das pessoas."
     },
     {
      "q": "Que QI é considerado de génio?",
      "a": "Não existe um limite oficial de \"génio\", mas costuma associar-se a resultados de 140 ou mais, atingidos por menos de 0,5% da população. Um QI de 145 corresponde aproximadamente ao 0,1% mais alto, ou seja, cerca de 1 pessoa em 1000. Convém lembrar que o QI mede apenas o raciocínio abstrato e não a criatividade, a motivação ou a inteligência emocional, que também são essenciais ao sucesso."
     },
     {
      "q": "O que significa um QI de 120 ou 130?",
      "a": "Um QI de 120 coloca-o aproximadamente nos 10% mais altos, e um QI de 130 nos 2% mais altos da população. Em termos práticos, 120 indica forte capacidade de raciocínio lógico e de resolução de problemas, e 130 é o ponto de corte habitual da Mensa, a associação internacional de altas capacidades. Ambos os valores são resultados muito bons e relativamente raros."
     },
     {
      "q": "Um QI mais alto garante mais sucesso na vida?",
      "a": "Não, um QI elevado aumenta a probabilidade de bom desempenho académico mas não garante sucesso por si só. A investigação mostra que fatores como esforço, persistência, competências sociais e oportunidades têm um peso enorme nos resultados de vida. O QI é uma boa estimativa do raciocínio fluido, mas é apenas uma das muitas variáveis que determinam o que cada pessoa alcança."
     }
    ]
   },
   "iq-percentile-chart": {
    "title": "Tabela de percentis de QI: em que percentil estou?",
    "desc": "Veja a tabela de percentis de QI e descubra em que percentil está o seu resultado. QI 100 = percentil 50; 115 = 84; 130 = top 2%.",
    "keywords": "tabela de percentis de QI, percentil de QI, em que percentil está o meu QI, classificação de QI, faixas de QI, QI percentil 90, distribuição de QI",
    "h1": "Tabela de percentis de QI: o que significa o seu resultado",
    "intro": "O percentil indica a percentagem de pessoas que ficam abaixo de si: um QI de 100 está no percentil 50 (mediana), 115 no percentil 84 e 130 nos 2% mais altos da população.",
    "sections": [
     {
      "q": "Qual é a diferença entre resultado de QI e percentil?",
      "a": "O resultado de QI é um número numa escala com média 100, enquanto o percentil indica que percentagem da população obtém um valor inferior ao seu. Por exemplo, um QI de 115 corresponde ao percentil 84, o que significa que supera 84% das pessoas. O percentil é muitas vezes mais intuitivo porque mostra diretamente a sua posição relativa."
     },
     {
      "q": "Em que percentil está o meu resultado de QI?",
      "a": "Cada resultado de QI corresponde a um percentil fixo segundo a distribuição normal: QI 100 = percentil 50, QI 110 ≈ percentil 75, QI 115 ≈ percentil 84, QI 120 ≈ percentil 91 e QI 130 ≈ percentil 98. Por outras palavras, quanto mais alto o número, maior a percentagem de pessoas que fica abaixo de si. A tabela nesta página mostra cada faixa, a sua classificação e a percentagem da população correspondente."
     },
     {
      "q": "Por que razão o QI segue uma curva em sino?",
      "a": "O QI segue uma distribuição normal (curva em sino) porque a inteligência resulta de muitos fatores genéticos e ambientais que se combinam ao acaso. Por isso, a maioria das pessoas agrupa-se perto da média de 100 e cada vez menos pessoas obtêm valores extremos. Cerca de 68% ficam entre 85 e 115, e aproximadamente 95% entre 70 e 130."
     },
     {
      "q": "Que percentil corresponde aos 10% e aos 2% mais altos?",
      "a": "Os 10% mais altos começam por volta de um QI de 120 (percentil 90) e os 2% mais altos por volta de um QI de 130 (percentil 98). Um QI de 145, no extremo superior, corresponde aproximadamente ao 0,1% mais alto, ou seja, ao percentil 99,9. Estes pontos de corte são os mesmos em qualquer teste calibrado com média 100 e desvio-padrão 15."
     },
     {
      "q": "O percentil de QI muda consoante o país ou o teste?",
      "a": "A escala de percentis é a mesma em qualquer teste bem padronizado, mas o resultado bruto pode variar com o grupo de referência e a época. O chamado efeito Flynn mostra que os resultados médios subiram ao longo das décadas, obrigando a recalibrar os testes regularmente. Por isso, dois testes devem ser comparados apenas se usarem a mesma norma de referência."
     }
    ]
   },
   "online-iq-test-accuracy": {
    "title": "Os testes de QI online são fiáveis? Metodologia",
    "desc": "Os testes de QI online são estimativas educativas fiáveis, mas não diagnósticos clínicos. Saiba como funcionam (Raven, CHC, fiabilidade).",
    "keywords": "teste de QI online é fiável, testes de QI online precisos, fiabilidade do teste de QI, teste de QI grátis confiável, validade teste de QI, matrizes de Raven",
    "h1": "Os testes de QI online são fiáveis e precisos?",
    "intro": "Um bom teste de QI online é uma estimativa educativa fiável do seu raciocínio, mas não substitui uma avaliação clínica feita por um psicólogo; o nosso teste apresenta uma consistência interna (alfa de Cronbach) de cerca de 0,85 a 0,92.",
    "sections": [
     {
      "q": "Como funciona este teste de QI?",
      "a": "Este teste baseia-se em matrizes progressivas no estilo de Raven e na teoria CHC (Cattell-Horn-Carroll), focando-se sobretudo no raciocínio fluido e na perceção de padrões. As suas respostas são comparadas com uma distribuição normal de média 100 e desvio-padrão 15 para gerar o resultado. Por usar padrões visuais em vez de palavras, reduz a dependência da língua e da cultura específica do utilizador."
     },
     {
      "q": "Qual é a fiabilidade deste teste de QI?",
      "a": "Este teste apresenta uma consistência interna (alfa de Cronbach) de cerca de 0,85 a 0,92, o que é considerado bom a excelente em psicometria. Isto significa que os itens medem de forma coerente a mesma capacidade e que repetir o teste tende a dar resultados próximos. Ainda assim, qualquer teste tem uma margem de erro, por isso o resultado deve ser lido como uma faixa e não como um valor exato."
     },
     {
      "q": "Um teste online é tão preciso como um teste clínico?",
      "a": "Não, um teste online é menos preciso do que uma avaliação clínica supervisionada como a WAIS ou a Stanford-Binet. Os testes clínicos são administrados individualmente por um profissional, cobrem vários domínios cognitivos e controlam fatores como ansiedade e fadiga. Um teste online é excelente para uma estimativa rápida e educativa, mas não tem o mesmo rigor de um diagnóstico formal."
     },
     {
      "q": "O que pode afetar o meu resultado de QI online?",
      "a": "O resultado pode ser influenciado pela educação, pela familiaridade com este tipo de exercícios, pelo cansaço, pelo stress e até pela qualidade do ecrã ou da ligação. A prática com testes semelhantes tende a elevar ligeiramente os resultados, um fenómeno relacionado com o efeito Flynn. Por isso, recomenda-se fazer o teste descansado, sem distrações e sem interrupções."
     },
     {
      "q": "Posso usar este resultado para um diagnóstico?",
      "a": "Não, este resultado é uma estimativa educativa e não constitui um diagnóstico clínico. Se suspeita de altas capacidades, de dificuldades de aprendizagem ou precisa de um valor oficial, deve procurar um psicólogo qualificado para uma avaliação formal. O nosso teste serve para explorar e compreender o seu raciocínio, não para fins médicos, escolares ou legais."
     }
    ]
   },
   "improve-iq": {
    "title": "É possível aumentar o QI? O que a ciência diz",
    "desc": "É possível melhorar parte do QI (raciocínio fluido) com treino e educação, mas há mitos. Veja o que funciona e o que é exagero.",
    "keywords": "como aumentar o QI, é possível aumentar o QI, melhorar o QI, treino cognitivo funciona, exercícios para o cérebro, aumentar inteligência, jogos de memória QI",
    "h1": "É possível aumentar o seu QI?",
    "intro": "É possível melhorar de forma modesta algumas componentes do raciocínio, sobretudo o raciocínio fluido, através de educação e de treino da memória de trabalho, mas grandes saltos permanentes no QI geral são raros e muitos produtos prometem mais do que a ciência demonstra.",
    "sections": [
     {
      "q": "O QI pode realmente mudar ao longo da vida?",
      "a": "Sim, o QI pode oscilar modestamente ao longo da vida, sobretudo na infância e na adolescência. A educação formal é um dos fatores com efeito mais consistente: cada ano adicional de escolaridade está associado a um ligeiro aumento dos resultados. Na idade adulta, o QI tende a ser bastante estável, mas hábitos saudáveis ajudam a preservá-lo."
     },
     {
      "q": "O treino cognitivo e os jogos para o cérebro funcionam?",
      "a": "O treino da memória de trabalho pode melhorar ligeiramente o raciocínio fluido, mas os ganhos costumam ser pequenos e nem sempre se transferem para tarefas do dia a dia. Muitas aplicações de \"jogos para o cérebro\" tornam-no melhor naquele jogo específico, sem elevar de forma significativa o QI geral. A evidência é mais sólida para a educação e a leitura do que para qualquer aplicação isolada."
     },
     {
      "q": "Qual é a parte do QI mais difícil de mudar?",
      "a": "A inteligência geral (o fator g) é em grande parte hereditária e é a componente mais difícil de alterar de forma duradoura. Enquanto o raciocínio fluido pode beneficiar um pouco de treino, o g de base mantém-se relativamente estável ao longo da vida adulta. Por isso, intervenções que prometem aumentos enormes e permanentes do QI devem ser vistas com ceticismo."
     },
     {
      "q": "Que hábitos ajudam a manter o cérebro em forma?",
      "a": "Dormir bem, ler com regularidade, fazer exercício físico e manter uma vida social ativa ajudam a preservar a cognição ao longo do tempo. O sono consolida a memória, o exercício melhora a irrigação cerebral e a aprendizagem contínua mantém as redes neuronais ativas. Estes hábitos não transformam um QI médio em génio, mas evitam declínios desnecessários."
     },
     {
      "q": "É possível enganar ou inflacionar artificialmente o resultado?",
      "a": "Praticar muitos testes semelhantes pode elevar temporariamente o resultado, mas isso reflete familiaridade e não um verdadeiro aumento da inteligência. Este efeito de prática é conhecido e é uma das razões pelas quais os testes profissionais são recalibrados ao longo do tempo. Para conhecer a sua capacidade real, é melhor fazer o teste sem treino prévio intensivo e em condições adequadas."
     }
    ]
   }
  },
  "faq8": [
   {
    "q": "O que é o QI e o que mede exatamente?",
    "a": "QI significa quociente de inteligência e é uma medida padronizada do raciocínio, da resolução de problemas e da capacidade de reconhecer padrões. É calibrado numa escala com média 100 e desvio-padrão 15, o que permite comparar o seu resultado com o da população em geral. O QI mede sobretudo a inteligência geral, mas não abrange a criatividade nem a inteligência emocional."
   },
   {
    "q": "Este teste de QI é fiável e preciso?",
    "a": "Sim, este teste é uma estimativa educativa fiável, com uma consistência interna (alfa de Cronbach) de cerca de 0,85 a 0,92, considerada boa a excelente. Baseia-se em matrizes ao estilo de Raven e na teoria CHC, comparando as suas respostas com uma distribuição normal. Ainda assim, não substitui uma avaliação clínica feita por um psicólogo."
   },
   {
    "q": "Quanto tempo demora a fazer o teste?",
    "a": "A maioria das pessoas completa o teste em cerca de 10 a 20 minutos. Recomenda-se um ambiente tranquilo, sem interrupções, para responder com a máxima concentração. Não há vantagem em apressar-se, mas também não convém demorar demasiado em cada questão."
   },
   {
    "q": "O que é considerado um bom resultado de QI?",
    "a": "Um QI de 100 é exatamente a média, valores entre 110 e 119 estão acima da média e 120 ou mais coloca-o nos 10% mais altos. Acima de 130 entra-se na faixa de sobredotação, atingida por cerca de 2% da população. Qualquer resultado dentro da faixa normal (85 a 115) é perfeitamente comum e saudável."
   },
   {
    "q": "O QI pode mudar com o tempo ou com treino?",
    "a": "Sim, o QI pode variar de forma modesta, sobretudo o raciocínio fluido, através de educação e de treino da memória de trabalho. No entanto, a inteligência geral (fator g) é em grande parte hereditária e bastante estável na idade adulta. Hábitos como dormir bem, ler e fazer exercício ajudam a preservar a cognição."
   },
   {
    "q": "Qual é o QI mínimo para entrar na Mensa?",
    "a": "A Mensa exige um resultado dentro dos 2% mais altos da população, o que corresponde habitualmente a um QI de 130 ou mais na escala com desvio-padrão 15. O valor exato pode variar consoante o teste oficial utilizado, mas o critério é sempre o percentil 98. Note que apenas testes supervisionados e aprovados são aceites para admissão."
   },
   {
    "q": "Qual é a diferença entre QI e QE (inteligência emocional)?",
    "a": "O QI mede o raciocínio lógico e a resolução de problemas, enquanto o QE (quociente emocional) mede a capacidade de reconhecer e gerir emoções, próprias e dos outros. São capacidades distintas e relativamente independentes: uma pessoa pode ter QI elevado e QE moderado, ou vice-versa. Ambos contribuem para o sucesso pessoal e profissional de formas diferentes."
   },
   {
    "q": "A idade influencia o resultado de QI?",
    "a": "O resultado de QI é ajustado à idade, por isso é sempre comparado com pessoas do mesmo grupo etário. O raciocínio fluido (resolver problemas novos) tende a atingir o pico no início da idade adulta e a diminuir lentamente depois, enquanto a inteligência cristalizada (conhecimento acumulado) costuma manter-se ou crescer ao longo da vida. Graças ao ajuste por idade, um QI de 100 significa sempre estar na média do seu grupo."
   }
  ]
 },
 "it": {
  "tableHeaders": [
   "Punteggio QI",
   "Classificazione",
   "Percentile",
   "% della popolazione"
  ],
  "classLabels": [
   "Molto superiore / Plusdotato",
   "Superiore",
   "Medio-alto",
   "Nella media",
   "Medio-basso",
   "Limite (borderline)",
   "Estremamente basso"
  ],
  "spokes": {
   "good-iq-score": {
    "title": "Qual è un buon punteggio QI? Tabella e medie",
    "desc": "Un buon QI parte da 120 (top 10%); 100 è la media esatta, 110-119 sopra la media, 130+ plusdotato. Scopri dove si collocano i tuoi punti.",
    "keywords": "buon punteggio QI, QI nella media, QI alto, QI genio, QI 120, QI 130, scala QI, quanto è un buon QI",
    "h1": "Qual è un buon punteggio QI?",
    "intro": "Un punteggio di 100 è esattamente la media; 110-119 è sopra la media, 120 o più ti colloca nel 10% più alto (un \"buon\" QI) e 130+ rientra nel 2% più alto, soglia della plusdotazione.",
    "sections": [
     {
      "q": "Quanto vale un QI nella media?",
      "a": "Un QI nella media è 100, perché il test è tarato su una distribuzione normale con media 100 e deviazione standard 15. Circa il 68% delle persone ottiene un punteggio compreso tra 85 e 115, quindi quasi due terzi della popolazione rientra nella fascia \"nella media\". Questo intervallo non indica nulla di problematico: rappresenta semplicemente la norma statistica."
     },
     {
      "q": "Da quale punteggio si parla di QI alto?",
      "a": "Si parla di QI alto a partire da 120, che corrisponde al 10% più alto della popolazione. La fascia 110-119 è già \"medio-alta\" (sopra la media), mentre 120-129 è classificata come \"superiore\". Superare 120 significa quindi ottenere un risultato migliore di nove persone su dieci."
     },
     {
      "q": "Cosa significa un QI di 130 o più?",
      "a": "Un QI di 130 ti colloca nel 2% più alto della popolazione ed è la soglia comunemente usata per la plusdotazione e per l'ammissione al Mensa. Statisticamente solo circa due persone su cento raggiungono o superano questo valore. Oltre i 145 si entra nello 0,1% più alto, un risultato estremamente raro."
     },
     {
      "q": "Da quale punteggio si può parlare di \"genio\"?",
      "a": "Non esiste una soglia ufficiale di \"genio\", ma il termine è spesso associato a punteggi superiori a 145, ossia lo 0,1% più alto della popolazione. È importante ricordare che il QI misura il ragionamento astratto e la capacità di risolvere problemi, non la creatività, il talento o i risultati concreti nella vita. Molte persone considerate geniali devono il loro impatto a fattori che un test non rileva."
     },
     {
      "q": "Quanto è affidabile il punteggio di un test online?",
      "a": "Un test online ben costruito fornisce una stima utile, ma resta una valutazione orientativa, non una diagnosi clinica. Questo test si basa sulle Matrici Progressive di Raven e sulla teoria CHC, con un'affidabilità interna (alfa di Cronbach) compresa tra 0,85 e 0,92. Per una valutazione ufficiale serve un test somministrato da uno psicologo, come la WAIS o la Stanford-Binet."
     }
    ]
   },
   "iq-percentile-chart": {
    "title": "Tabella percentili QI: a che percentile sei?",
    "desc": "Il QI 100 è il 50° percentile, 115 circa l'84°, 130 il top 2%. Tabella completa per convertire il tuo punteggio QI in percentile.",
    "keywords": "percentile QI, tabella percentili QI, QI 50 percentile, QI 84 percentile, conversione QI percentile, scala percentili QI",
    "h1": "Tabella dei percentili del QI",
    "intro": "Il percentile indica la percentuale di persone che ottengono un punteggio uguale o inferiore al tuo: un QI di 100 corrisponde al 50° percentile, 115 a circa l'84°, 120 al top 10% e 130 al top 2%.",
    "sections": [
     {
      "q": "Qual è la differenza tra punteggio QI e percentile?",
      "a": "Il punteggio QI è un numero su una scala fissa (media 100, deviazione standard 15), mentre il percentile indica la tua posizione rispetto agli altri. Per esempio, un QI di 115 non significa \"115 punti\" in senso assoluto: significa che superi circa l'84% delle persone. Il percentile rende il punteggio più intuitivo perché lo traduce in un confronto diretto con la popolazione."
     },
     {
      "q": "A che percentile corrisponde un QI di 100?",
      "a": "Un QI di 100 corrisponde esattamente al 50° percentile, cioè la mediana della popolazione. Questo significa che metà delle persone ottiene un punteggio inferiore e metà superiore. È il punto centrale della curva normale su cui è tarato il test."
     },
     {
      "q": "A che percentile corrispondono 115, 120 e 130?",
      "a": "Un QI di 115 corrisponde a circa l'84° percentile, 120 al 90° (il 10% più alto) e 130 al 98° (il 2% più alto). Ogni 15 punti rappresentano una deviazione standard di distanza dalla media. Salire di pochi punti vicino agli estremi sposta molto la posizione percentile, perché la curva si assottiglia."
     },
     {
      "q": "Come si converte un punteggio QI in percentile?",
      "a": "La conversione si basa sulla distribuzione normale, in cui ogni punteggio occupa una posizione precisa sotto la curva a campana. La tabella qui sopra mostra le corrispondenze principali: 85 = 16° percentile, 100 = 50°, 115 = 84°, 130 = 98°. Non serve fare calcoli: basta individuare la fascia del proprio punteggio e leggere il percentile associato."
     },
     {
      "q": "Perché pochi punti vicino agli estremi contano così tanto?",
      "a": "Perché nella distribuzione normale le persone si concentrano vicino alla media e diventano sempre più rare verso gli estremi. Tra 95 e 105 si trova un'enorme quantità di popolazione, mentre tra 130 e 140 ce n'è pochissima. Per questo passare da 130 a 140 sposta molto il percentile, anche se la differenza numerica è la stessa di un salto centrale."
     }
    ]
   },
   "online-iq-test-accuracy": {
    "title": "I test del QI online sono attendibili?",
    "desc": "Un buon test QI online è una stima affidabile (alfa di Cronbach 0,85-0,92) ma non una diagnosi clinica. Scopri metodo, limiti e attendibilità reale.",
    "keywords": "test QI online attendibile, test QI affidabile, accuratezza test QI, matrici di Raven, test QI gratis valido, test QI vero",
    "h1": "I test del QI online sono attendibili?",
    "intro": "Un test del QI online ben progettato fornisce una stima affidabile della capacità di ragionamento, ma resta uno strumento orientativo ed educativo, non una diagnosi clinica come la WAIS somministrata da uno psicologo.",
    "sections": [
     {
      "q": "Su quale metodo si basa questo test?",
      "a": "Questo test si basa sulle Matrici Progressive di Raven e sulla teoria CHC dell'intelligenza, due tra i fondamenti più consolidati della psicometria. Le matrici misurano l'intelligenza fluida (Gf), cioè la capacità di riconoscere schemi e risolvere problemi nuovi senza conoscenze pregresse. I punteggi vengono poi tarati su una distribuzione normale con media 100 e deviazione standard 15."
     },
     {
      "q": "Quanto è affidabile dal punto di vista statistico?",
      "a": "L'affidabilità interna di questo test, misurata con l'alfa di Cronbach, è compresa tra 0,85 e 0,92, un valore considerato buono o eccellente in psicometria. Questo indica che le domande misurano in modo coerente lo stesso costrutto e che ripetendo il test si otterrebbe un risultato simile. Tuttavia, l'affidabilità non equivale alla validità diagnostica di un test clinico completo."
     },
     {
      "q": "Qual è la differenza con un test clinico come la WAIS?",
      "a": "La differenza principale è che la WAIS o la Stanford-Binet vengono somministrate individualmente da uno psicologo, in condizioni controllate e su più aree cognitive. Un test online valuta soprattutto il ragionamento fluido in autonomia, senza supervisione né correzione per fattori come stress o distrazioni. Per questo solo un test clinico può fornire una diagnosi ufficiale, ad esempio di plusdotazione."
     },
     {
      "q": "Quali fattori possono falsare il risultato?",
      "a": "Il risultato può variare in base a cultura, livello di istruzione, familiarità con questo tipo di esercizi e persino al cosiddetto effetto Flynn, l'aumento dei punteggi medi nel tempo. Anche stanchezza, fretta o un ambiente rumoroso possono abbassare il punteggio. Per questo è meglio interpretare il risultato come un intervallo orientativo, non come un numero esatto e definitivo."
     },
     {
      "q": "Mi posso fidare del punteggio che ottengo?",
      "a": "Sì, come stima indicativa della tua capacità di ragionamento, ma non come verdetto definitivo o diagnosi medica. Un buon test online colloca correttamente la maggior parte delle persone nella fascia giusta, il che lo rende utile per curiosità, confronto e auto-conoscenza. Se hai bisogno di un punteggio ufficiale per motivi scolastici o di ammissione, rivolgiti a uno psicologo abilitato."
     }
    ]
   },
   "improve-iq": {
    "title": "Si può aumentare il QI? Cosa dice la scienza",
    "desc": "Il QI di base è in gran parte ereditario, ma allenamento della memoria di lavoro, studio e stile di vita possono migliorare le prestazioni. Ecco cosa funziona davvero.",
    "keywords": "aumentare il QI, migliorare il QI, allenare il cervello, memoria di lavoro, esercizi per il QI, si può alzare il QI",
    "h1": "Si può aumentare il QI?",
    "intro": "Puoi migliorare in modo modesto le tue prestazioni cognitive con allenamento mirato, studio e uno stile di vita sano, ma il QI di base resta in larga parte ereditario e non esistono scorciatoie per aumentarlo drasticamente.",
    "sections": [
     {
      "q": "È davvero possibile aumentare il proprio QI?",
      "a": "È possibile migliorare alcune prestazioni cognitive, soprattutto l'intelligenza fluida (Gf), ma solo in modo modesto e non illimitato. L'intelligenza generale (il fattore g) è sostanzialmente ereditaria e tende a rimanere stabile in età adulta. Gli allenamenti possono affinare strategie e velocità, ma non trasformano un punteggio medio in uno eccezionale."
     },
     {
      "q": "Quali metodi funzionano davvero?",
      "a": "I metodi più sostenuti dalle prove sono l'allenamento della memoria di lavoro, lo studio strutturato e l'istruzione formale prolungata. Anni di scuola in più sono tra i fattori più solidamente associati a punteggi QI più alti. L'allenamento cognitivo mirato può migliorare le prestazioni in compiti simili, anche se il trasferimento ad abilità generali resta limitato."
     },
     {
      "q": "I giochi di brain training funzionano?",
      "a": "I giochi di brain training migliorano soprattutto la bravura nei giochi stessi, con effetti limitati sull'intelligenza generale. La ricerca mostra che l'allenamento su un compito specifico raramente si trasferisce a capacità cognitive ampie e diverse. Possono essere utili e divertenti, ma le promesse di \"aumentare il QI di molti punti\" sono in genere esagerate."
     },
     {
      "q": "Quanto incide lo stile di vita?",
      "a": "Lo stile di vita non aumenta il QI di base, ma aiuta a mantenere il cervello al meglio delle sue possibilità. Dormire a sufficienza, leggere regolarmente e fare attività fisica favoriscono attenzione, memoria e lucidità mentale. Al contrario, privazione di sonno, stress cronico e sedentarietà possono far rendere il cervello al di sotto del suo potenziale."
     },
     {
      "q": "Cosa è sopravvalutato quando si parla di aumentare il QI?",
      "a": "Sono sopravvalutate le promesse di guadagnare molti punti QI in poche settimane con app, integratori o singoli esercizi. Nessun metodo dimostra di alzare in modo stabile e ampio l'intelligenza generale di un adulto sano. L'approccio realistico è puntare a esprimere appieno il proprio potenziale, non a inseguire un numero più alto."
     }
    ]
   }
  },
  "faq8": [
   {
    "q": "Che cos'è il quoziente intellettivo (QI)?",
    "a": "Il QI è una misura standardizzata della capacità di ragionamento e di risoluzione dei problemi, tarata su una distribuzione normale con media 100 e deviazione standard 15. Non misura tutta l'intelligenza, ma soprattutto il ragionamento logico, astratto e la velocità di elaborazione. Il punteggio indica la tua posizione rispetto alla popolazione, non un valore assoluto."
   },
   {
    "q": "Questo test del QI è attendibile?",
    "a": "Sì, è una stima affidabile: si basa sulle Matrici Progressive di Raven e sulla teoria CHC, con un'affidabilità interna (alfa di Cronbach) tra 0,85 e 0,92. Resta però uno strumento educativo e orientativo, non una diagnosi clinica. Per un punteggio ufficiale serve un test come la WAIS somministrato da uno psicologo."
   },
   {
    "q": "Quanto dura il test?",
    "a": "Il test richiede generalmente pochi minuti e si completa in un'unica sessione, senza interruzioni. Per ottenere un risultato attendibile è meglio svolgerlo in un ambiente tranquillo, senza fretta e senza distrazioni. Rispondere con calma ma senza fermarsi troppo a lungo su ogni domanda aiuta a riflettere le tue reali capacità."
   },
   {
    "q": "Qual è un buon punteggio QI?",
    "a": "Un QI di 100 è la media esatta, 110-119 è sopra la media e da 120 in su si entra nel 10% più alto, considerato un \"buon\" punteggio. Da 130 si parla di plusdotazione (top 2%). Quasi il 68% delle persone ottiene un punteggio compreso tra 85 e 115."
   },
   {
    "q": "Il QI può cambiare nel tempo?",
    "a": "Il QI di base è abbastanza stabile in età adulta e in gran parte ereditario, ma le prestazioni possono variare modestamente. L'intelligenza fluida può migliorare un po' con allenamento della memoria di lavoro e istruzione, mentre sonno, lettura e attività fisica aiutano a mantenere la lucidità. Non esistono però metodi per aumentare drasticamente il punteggio."
   },
   {
    "q": "Qual è la soglia del QI per entrare nel Mensa?",
    "a": "Il Mensa ammette chi ottiene un punteggio nel 2% più alto della popolazione, che corrisponde a circa 130 su una scala con deviazione standard 15. L'ammissione richiede però un test ufficiale supervisionato, riconosciuto dall'associazione. Un test online può darti un'indicazione, ma non è valido per l'iscrizione."
   },
   {
    "q": "Che differenza c'è tra QI e intelligenza emotiva (QE)?",
    "a": "Il QI misura il ragionamento logico e la risoluzione di problemi, mentre il QE (intelligenza emotiva) riguarda la capacità di riconoscere e gestire le emozioni, proprie e altrui. Sono due dimensioni distinte: una persona può avere un QI alto e un QE modesto, o viceversa. Entrambi contribuiscono al successo personale e relazionale, ma misurano cose diverse."
   },
   {
    "q": "Il QI dipende dall'età?",
    "a": "Il punteggio QI è calcolato rispetto a persone della stessa fascia d'età, quindi un valore di 100 indica sempre la media per il proprio gruppo. Le capacità grezze cambiano con l'età, ma la taratura tiene conto di questo, mantenendo il punteggio confrontabile nel tempo. L'intelligenza fluida tende a calare leggermente con l'età, mentre quella cristallizzata (conoscenze e vocabolario) può aumentare."
   }
  ]
 },
 "id": {
  "tableHeaders": [
   "Rentang IQ",
   "Klasifikasi",
   "Persentil",
   "Persentase Populasi"
  ],
  "classLabels": [
   "Sangat Superior (Jenius/Berbakat)",
   "Superior",
   "Di Atas Rata-rata",
   "Rata-rata",
   "Di Bawah Rata-rata",
   "Ambang Batas",
   "Sangat Rendah"
  ],
  "spokes": {
   "good-iq-score": {
    "title": "Skor IQ Berapa yang Bagus? Panduan Lengkap",
    "desc": "Skor IQ berapa yang bagus? 100 adalah rata-rata, 120 ke atas masuk 10% teratas, dan 130+ tergolong jenius. Pahami arti skor IQ Anda di sini.",
    "keywords": "skor iq bagus, iq berapa yang normal, iq rata-rata orang, iq 120, iq 130 jenius, klasifikasi iq, iq tinggi",
    "h1": "Skor IQ Berapa yang Tergolong Bagus?",
    "intro": "Skor IQ 100 adalah tepat rata-rata, sedangkan skor 120 ke atas (10% teratas populasi) sudah tergolong bagus dan 130 ke atas (2% teratas) dikategorikan berbakat atau jenius. Berikut panduan lengkap untuk memahami posisi skor Anda.",
    "sections": [
     {
      "q": "Berapa skor IQ rata-rata orang?",
      "a": "Skor IQ rata-rata adalah tepat 100. Skor IQ dirancang mengikuti distribusi normal dengan rata-rata 100 dan simpangan baku 15, sehingga 100 selalu menjadi titik tengah populasi. Sekitar 68% orang memiliki skor antara 85 dan 115, yang semuanya masih dianggap berada dalam rentang normal."
     },
     {
      "q": "Apa arti skor IQ 110 sampai 119?",
      "a": "Skor IQ 110-119 tergolong di atas rata-rata. Orang dalam rentang ini umumnya memiliki kemampuan penalaran dan belajar yang lebih cepat dibandingkan kebanyakan orang, dan berada di atas sekitar 75-90% populasi. Skor 115 setara dengan persentil ke-84, artinya Anda mengungguli 84 dari 100 orang."
     },
     {
      "q": "Apakah IQ 120 sudah termasuk tinggi?",
      "a": "Ya, skor IQ 120 sudah tergolong tinggi karena menempatkan Anda di sekitar 10% teratas populasi. Kategori ini sering disebut superior dan umum ditemukan pada lulusan universitas serta profesional di bidang yang menuntut analisis kompleks. Skor 120-129 secara psikometri masuk klasifikasi superior."
     },
     {
      "q": "Skor IQ berapa yang disebut jenius?",
      "a": "Skor IQ 130 ke atas umumnya disebut jenius atau sangat superior, dan hanya dimiliki sekitar 2% populasi. Angka 130 juga merupakan ambang batas umum untuk masuk keanggotaan Mensa. Pada tingkat yang lebih ekstrem, skor 145 ke atas hanya dimiliki sekitar 0,1% orang, atau 1 dari 1.000."
     },
     {
      "q": "Apakah skor IQ rendah berarti tidak cerdas?",
      "a": "Tidak, skor IQ rendah tidak berarti seseorang tidak cerdas atau tidak akan sukses. IQ hanya mengukur satu aspek kemampuan kognitif, yaitu penalaran logis, dan tidak mencakup kreativitas, kecerdasan emosional, keterampilan sosial, atau bakat praktis. Banyak faktor seperti pendidikan, motivasi, dan kerja keras yang berperan besar dalam pencapaian hidup."
     }
    ]
   },
   "iq-percentile-chart": {
    "title": "Tabel Persentil IQ: Berapa Persentil Skor Saya?",
    "desc": "Tabel persentil IQ lengkap: IQ 100 = persentil 50, 115 = persentil 84, 130 = 2% teratas. Cari tahu posisi skor IQ Anda di tabel ini.",
    "keywords": "tabel persentil iq, persentil iq, iq 130 persentil berapa, klasifikasi skor iq, peringkat iq, distribusi iq",
    "h1": "Tabel Persentil IQ: Di Mana Posisi Skor Anda?",
    "intro": "Persentil menunjukkan berapa persen orang yang skornya berada di bawah Anda; IQ 100 setara persentil ke-50, IQ 115 setara persentil ke-84, dan IQ 130 menempatkan Anda di 2% teratas. Tabel di bawah memetakan setiap rentang IQ ke klasifikasi dan persentilnya.",
    "sections": [
     {
      "q": "Apa perbedaan antara skor IQ dan persentil?",
      "a": "Skor IQ adalah angka mentah hasil tes, sedangkan persentil menunjukkan berapa persen populasi yang skornya di bawah Anda. Misalnya, skor IQ 120 setara dengan persentil ke-90, artinya Anda mengungguli 90% orang. Persentil sering lebih mudah dipahami karena langsung menjelaskan peringkat relatif Anda."
     },
     {
      "q": "IQ 130 setara dengan persentil berapa?",
      "a": "Skor IQ 130 setara dengan sekitar persentil ke-98, yang berarti Anda berada di 2% teratas populasi. Hanya sekitar 2 dari 100 orang yang mencapai skor ini atau lebih tinggi. Inilah alasan angka 130 dipakai sebagai ambang batas masuk Mensa."
     },
     {
      "q": "Bagaimana cara membaca tabel persentil IQ?",
      "a": "Cari rentang skor IQ Anda pada kolom pertama, lalu baca klasifikasi, persentil, dan persentase populasinya pada kolom berikutnya. Misalnya skor 122 masuk rentang 120-129 dengan klasifikasi Superior dan berada di sekitar 10% teratas. Tabel ini didasarkan pada distribusi normal standar dengan rata-rata 100 dan simpangan baku 15."
     },
     {
      "q": "Berapa persen orang yang memiliki IQ di atas 120?",
      "a": "Hanya sekitar 10% populasi yang memiliki IQ 120 atau lebih tinggi. Semakin tinggi skornya, semakin langka jumlah orang yang mencapainya: sekitar 2% mencapai 130 ke atas dan hanya 0,1% mencapai 145 ke atas. Kelangkaan inilah yang membuat skor tinggi bernilai khusus secara statistik."
     },
     {
      "q": "Apakah persentil IQ sama di semua negara?",
      "a": "Persentil IQ pada tes terstandar relatif konsisten, tetapi rata-rata skor mentah bisa bergeser antar populasi karena faktor pendidikan dan budaya. Fenomena Flynn effect juga menunjukkan rata-rata skor cenderung naik dari generasi ke generasi, sehingga tes harus dinormalisasi ulang secara berkala. Karena itu, persentil selalu dihitung relatif terhadap kelompok pembanding tertentu."
     }
    ]
   },
   "online-iq-test-accuracy": {
    "title": "Apakah Tes IQ Online Akurat? Penjelasan Ilmiah",
    "desc": "Apakah tes IQ online akurat? Pelajari metodologinya: Matriks Raven, teori CHC, reliabilitas 0,85-0,92, dan batasannya dibanding tes klinis.",
    "keywords": "tes iq online akurat, apakah tes iq online valid, reliabilitas tes iq, metodologi tes iq, tes iq terpercaya, matriks raven",
    "h1": "Apakah Tes IQ Online Akurat dan Bisa Dipercaya?",
    "intro": "Tes IQ online yang dirancang dengan baik dapat memberikan estimasi yang andal untuk tujuan edukasi, tetapi tidak menggantikan diagnosis klinis. Berikut penjelasan metodologi, tingkat reliabilitas, dan batasan yang jujur dari tes semacam ini.",
    "sections": [
     {
      "q": "Bagaimana cara tes IQ online ini mengukur kecerdasan?",
      "a": "Tes ini mengukur kecerdasan cair melalui soal pola visual yang mengikuti format Matriks Progresif Raven dan kerangka teori CHC (Cattell-Horn-Carroll). Pendekatan ini menilai kemampuan penalaran abstrak tanpa bergantung pada bahasa atau pengetahuan budaya tertentu, sehingga lebih adil lintas latar belakang. Hasilnya kemudian dikonversi ke skala IQ standar dengan rata-rata 100 dan simpangan baku 15."
     },
     {
      "q": "Seberapa andal hasil tes IQ online?",
      "a": "Tes IQ online yang baik memiliki reliabilitas (Cronbach's alpha) sekitar 0,85-0,92, yang tergolong tinggi secara psikometri. Angka ini berarti hasil tes cukup konsisten jika diulang dalam kondisi serupa. Meski begitu, reliabilitas tinggi tidak otomatis menyamai validitas tes klinis penuh yang diawasi langsung."
     },
     {
      "q": "Apa bedanya tes IQ online dengan tes IQ klinis?",
      "a": "Perbedaan utama adalah pengawasan dan cakupan: tes klinis seperti WAIS atau Stanford-Binet diberikan oleh psikolog terlatih dan menilai banyak domain kognitif secara mendalam. Tes online umumnya berfokus pada penalaran cair dan dikerjakan mandiri tanpa kontrol lingkungan. Karena itu, hanya tes klinis yang diakui sebagai standar baku untuk diagnosis resmi."
     },
     {
      "q": "Faktor apa yang bisa memengaruhi akurasi skor saya?",
      "a": "Akurasi skor dapat dipengaruhi oleh kelelahan, gangguan, kecemasan, serta tingkat keakraban Anda dengan format soal. Pendidikan, latar budaya, dan efek latihan juga dapat menggeser hasil, sebagaimana ditunjukkan oleh Flynn effect. Untuk hasil paling representatif, kerjakan tes dalam kondisi istirahat cukup dan lingkungan yang tenang."
     },
     {
      "q": "Apakah hasil tes IQ online bisa dijadikan diagnosis resmi?",
      "a": "Tidak, hasil tes IQ online tidak boleh dijadikan diagnosis klinis atau medis. Tes ini dirancang sebagai alat edukasi dan estimasi mandiri, bukan pengganti penilaian profesional. Jika Anda membutuhkan penilaian resmi untuk keperluan pendidikan, pekerjaan, atau medis, konsultasikan dengan psikolog berlisensi yang dapat melakukan tes terstandar yang diawasi."
     }
    ]
   },
   "improve-iq": {
    "title": "Apakah IQ Bisa Ditingkatkan? Fakta dan Cara Efektif",
    "desc": "Apakah IQ bisa naik? Latihan memori kerja dan pendidikan dapat meningkatkan kecerdasan cair secara moderat. Pelajari cara yang terbukti dan mitosnya.",
    "keywords": "cara meningkatkan iq, apakah iq bisa naik, latihan otak, meningkatkan kecerdasan, latihan memori kerja, iq genetik",
    "h1": "Apakah IQ Bisa Ditingkatkan?",
    "intro": "IQ relatif stabil dan sebagian besar dipengaruhi genetik, tetapi kecerdasan cair dapat meningkat secara moderat melalui latihan memori kerja, pendidikan, dan gaya hidup sehat. Berikut penjelasan seimbang tentang apa yang benar-benar berhasil dan apa yang dilebih-lebihkan.",
    "sections": [
     {
      "q": "Apakah skor IQ bisa benar-benar naik?",
      "a": "Ya, skor IQ bisa naik secara moderat, terutama pada komponen kecerdasan cair (Gf). Latihan memori kerja dan pendidikan yang konsisten terbukti memberikan peningkatan terukur, meskipun bukan lonjakan dramatis. Faktor inti kecerdasan (g) sebagian besar diturunkan secara genetik, sehingga ada batas alami seberapa jauh skor dapat ditingkatkan."
     },
     {
      "q": "Latihan apa yang terbukti meningkatkan kecerdasan?",
      "a": "Latihan memori kerja, seperti tugas n-back, serta pendidikan formal yang menantang adalah yang paling didukung bukti ilmiah. Aktivitas ini melatih kemampuan otak menyimpan dan memanipulasi informasi, yang menjadi dasar penalaran. Namun manfaatnya cenderung spesifik pada tugas yang dilatih, sehingga konsistensi jangka panjang lebih penting daripada intensitas singkat."
     },
     {
      "q": "Apakah aplikasi latihan otak benar-benar berhasil?",
      "a": "Manfaat aplikasi latihan otak sering dilebih-lebihkan dan harus disikapi dengan hati-hati. Anda biasanya akan menjadi lebih mahir pada permainan tertentu, tetapi peningkatan itu jarang berpindah (transfer) ke kemampuan kognitif umum atau kehidupan sehari-hari. Pendidikan menyeluruh dan membaca terbukti jauh lebih bermanfaat daripada sekadar bermain game pelatihan."
     },
     {
      "q": "Bagaimana gaya hidup memengaruhi kecerdasan?",
      "a": "Gaya hidup sehat berperan penting dalam menjaga dan mengoptimalkan fungsi kognitif. Tidur yang cukup, olahraga teratur, dan kebiasaan membaca terbukti membantu mempertahankan ketajaman mental serta memori. Sebaliknya, kurang tidur, stres kronis, dan gaya hidup tidak aktif dapat menurunkan performa kognitif sementara."
     },
     {
      "q": "Apakah membaca dan belajar bisa membuat seseorang lebih cerdas?",
      "a": "Ya, membaca dan belajar terus-menerus memperkaya kecerdasan terkristalisasi, yaitu pengetahuan dan keterampilan yang terakumulasi seiring waktu. Meski tidak banyak mengubah kecerdasan cair bawaan, kebiasaan ini meningkatkan kemampuan Anda memecahkan masalah nyata dan memahami konsep kompleks. Berbeda dengan kecerdasan cair yang memuncak di usia muda, kecerdasan terkristalisasi dapat terus bertambah sepanjang hidup."
     }
    ]
   }
  },
  "faq8": [
   {
    "q": "Apa itu IQ dan apa yang sebenarnya diukur?",
    "a": "IQ (Intelligence Quotient) adalah skor standar yang mengukur kemampuan penalaran, logika, dan pemecahan masalah seseorang dibandingkan dengan populasi umum. Tes IQ modern berfokus pada kecerdasan cair (fluid intelligence), yaitu kemampuan mengenali pola dan menyelesaikan masalah baru tanpa bergantung pada pengetahuan yang sudah dipelajari. Skor IQ disusun mengikuti distribusi normal dengan rata-rata 100 dan simpangan baku 15."
   },
   {
    "q": "Apakah tes IQ online ini akurat?",
    "a": "Tes IQ online ini memberikan estimasi yang andal untuk tujuan edukasi, tetapi bukan diagnosis klinis. Tes kami dibangun di atas Matriks Progresif Raven dan teori CHC dengan reliabilitas (Cronbach's alpha) sekitar 0,85-0,92, yang tergolong baik secara psikometri. Namun untuk penilaian resmi, hanya tes berstandar klinis seperti WAIS atau Stanford-Binet yang diawasi psikolog yang dianggap sebagai standar baku."
   },
   {
    "q": "Berapa lama waktu yang dibutuhkan untuk menyelesaikan tes?",
    "a": "Tes IQ ini biasanya selesai dalam waktu sekitar 15-25 menit. Waktu ini cukup untuk mengukur kemampuan penalaran Anda secara memadai tanpa membuat kelelahan yang dapat menurunkan skor. Sebaiknya kerjakan dalam kondisi tenang, cukup istirahat, dan tanpa gangguan agar hasilnya mencerminkan kemampuan Anda yang sebenarnya."
   },
   {
    "q": "Berapa skor IQ yang tergolong bagus?",
    "a": "Skor IQ 100 adalah tepat rata-rata, sementara skor 110-119 sudah tergolong di atas rata-rata. Skor 120 ke atas masuk 10% teratas populasi dan umumnya disebut bagus atau superior, sedangkan 130 ke atas masuk 2% teratas dan dikategorikan sangat superior atau berbakat. Sekitar 68% orang memiliki skor antara 85 dan 115."
   },
   {
    "q": "Apakah IQ bisa berubah atau ditingkatkan?",
    "a": "IQ relatif stabil sepanjang hidup, tetapi kecerdasan cair (Gf) dapat meningkat secara moderat melalui latihan memori kerja dan pendidikan. Faktor inti kecerdasan (g) sebagian besar diturunkan secara genetik, sehingga lonjakan dramatis tidak realistis. Namun tidur cukup, membaca, dan olahraga teratur terbukti membantu menjaga fungsi kognitif tetap optimal."
   },
   {
    "q": "Berapa skor IQ minimum untuk masuk Mensa?",
    "a": "Mensa menerima anggota dengan skor IQ minimal 130, yang setara dengan 2% teratas populasi (persentil ke-98). Artinya hanya sekitar 2 dari 100 orang yang memenuhi syarat ini. Mensa hanya menerima skor dari tes resmi yang diawasi, bukan hasil tes online, meskipun tes online bisa menjadi indikator awal yang baik."
   },
   {
    "q": "Apa perbedaan IQ dan EQ?",
    "a": "IQ mengukur kemampuan kognitif seperti logika dan penalaran, sedangkan EQ (kecerdasan emosional) mengukur kemampuan mengenali serta mengelola emosi diri sendiri dan orang lain. Keduanya merupakan kemampuan yang berbeda dan relatif independen, sehingga IQ tinggi tidak otomatis berarti EQ tinggi. Dalam kehidupan nyata, kesuksesan biasanya membutuhkan kombinasi keduanya."
   },
   {
    "q": "Apakah usia memengaruhi skor IQ?",
    "a": "Skor IQ sudah disesuaikan dengan usia, sehingga skor Anda selalu dibandingkan dengan orang seusia Anda, bukan dengan populasi umum lintas usia. Inilah sebabnya seorang anak dan orang dewasa bisa memiliki skor IQ yang sama meski jumlah jawaban benarnya berbeda. Kecerdasan cair cenderung memuncak pada usia muda dewasa, sementara kecerdasan terkristalisasi (pengetahuan) justru terus bertambah seiring usia."
   }
  ]
 },
 "hi": {
  "tableHeaders": [
   "IQ रेंज",
   "वर्गीकरण",
   "परसेंटाइल",
   "जनसंख्या का %"
  ],
  "classLabels": [
   "अति श्रेष्ठ / प्रतिभाशाली",
   "श्रेष्ठ (उच्च)",
   "उच्च औसत",
   "औसत",
   "निम्न औसत",
   "सीमावर्ती",
   "अत्यंत निम्न"
  ],
  "spokes": {
   "good-iq-score": {
    "title": "अच्छा IQ स्कोर कितना होता है? (110, 120, 130)",
    "desc": "अच्छा IQ स्कोर कितना होता है? 100 बिल्कुल औसत है, 110–119 औसत से ऊपर, 120+ शीर्ष 10% और 130+ प्रतिभाशाली। पूरी रेंज यहाँ समझें।",
    "keywords": "अच्छा IQ स्कोर, सामान्य IQ कितना होता है, हाई IQ, जीनियस IQ, औसत IQ स्कोर, 120 IQ, 130 IQ, IQ रेंज",
    "h1": "अच्छा IQ स्कोर कितना होता है?",
    "intro": "100 बिल्कुल औसत IQ है, 110–119 औसत से ऊपर माना जाता है, 120 या उससे अधिक शीर्ष 10% में आता है (इसे 'अच्छा' कहा जाता है), और 130+ को प्रतिभाशाली (gifted) श्रेणी में रखा जाता है। IQ का यह पैमाना माध्य 100 और मानक विचलन 15 वाले सामान्य वितरण पर आधारित है।",
    "sections": [
     {
      "q": "औसत IQ स्कोर कितना होता है?",
      "a": "औसत IQ स्कोर बिल्कुल 100 होता है। IQ टेस्ट इस तरह मानकीकृत किए जाते हैं कि पूरी आबादी का माध्य 100 और मानक विचलन 15 हो। लगभग 68% लोग 85 से 115 के बीच और लगभग 95% लोग 70 से 130 के बीच स्कोर करते हैं, इसलिए 90–109 की रेंज को 'औसत' माना जाता है।"
     },
     {
      "q": "क्या 120 IQ अच्छा स्कोर है?",
      "a": "हाँ, 120 IQ एक बहुत अच्छा स्कोर है और यह आबादी के शीर्ष लगभग 10% में आता है। 120–129 की रेंज को 'श्रेष्ठ' (Superior) वर्ग में रखा जाता है, जहाँ व्यक्ति की तार्किक और समस्या-समाधान क्षमता औसत से काफ़ी ऊपर होती है। यह स्तर अकादमिक और पेशेवर कार्यों में मज़बूत संज्ञानात्मक क्षमता दर्शाता है।"
     },
     {
      "q": "हाई IQ और जीनियस IQ में क्या अंतर है?",
      "a": "हाई IQ आमतौर पर 130 से ऊपर के स्कोर को कहते हैं, जो आबादी के शीर्ष लगभग 2% में आता है, जबकि 'जीनियस' स्तर इससे भी दुर्लभ है। 130 अधिकांश Mensa समाजों का सामान्य प्रवेश कट-ऑफ है, और 145+ का स्कोर शीर्ष 0.1% (लगभग एक हज़ार में एक) में आता है। ध्यान दें कि 'जीनियस' की कोई एक सार्वभौमिक संख्या नहीं है।"
     },
     {
      "q": "110 का IQ कैसा माना जाता है?",
      "a": "110 का IQ 'उच्च औसत' (High Average) श्रेणी में आता है, यानी औसत से थोड़ा ऊपर। 110–119 की रेंज में आने वाले लोग आबादी के ऊपरी हिस्से में होते हैं और सामान्यतः नई जानकारी जल्दी सीखते हैं। यह स्कोर 100 (50वाँ परसेंटाइल) और 115 (लगभग 84वाँ परसेंटाइल) के बीच पड़ता है।"
     },
     {
      "q": "क्या अच्छा IQ होने का मतलब जीवन में सफलता पक्की है?",
      "a": "नहीं, ऊँचा IQ अकेले जीवन में सफलता की गारंटी नहीं देता। IQ केवल तार्किक तर्क और समस्या-समाधान जैसी संज्ञानात्मक क्षमताओं का एक माप है; मेहनत, भावनात्मक बुद्धि (EQ), प्रेरणा, अवसर और सामाजिक कौशल भी उतने ही मायने रखते हैं। इसलिए IQ को संभावनाओं का एक संकेतक मानें, अंतिम निर्णय नहीं।"
     }
    ]
   },
   "iq-percentile-chart": {
    "title": "IQ परसेंटाइल चार्ट — मेरा IQ कौन से प्रतिशत में है?",
    "desc": "IQ परसेंटाइल चार्ट: जानें आपका स्कोर कौन से प्रतिशत में आता है। 100=50वाँ, 115≈84वाँ, 130≈शीर्ष 2%। पूरा वर्गीकरण टेबल यहाँ देखें।",
    "keywords": "IQ परसेंटाइल चार्ट, IQ प्रतिशतक, मेरा IQ कौन से प्रतिशत में, IQ स्कोर टेबल, IQ वर्गीकरण, परसेंटाइल का मतलब",
    "h1": "IQ परसेंटाइल चार्ट: आपका स्कोर कौन से प्रतिशत में है?",
    "intro": "परसेंटाइल बताता है कि आपका IQ कितने प्रतिशत लोगों से बराबर या ऊपर है: IQ 100 = 50वाँ परसेंटाइल, 115 ≈ 84वाँ, 120 ≈ शीर्ष 10%, और 130 ≈ शीर्ष 2%। नीचे दिया गया वर्गीकरण चार्ट हर IQ रेंज को उसके परसेंटाइल और जनसंख्या प्रतिशत से जोड़कर दिखाता है।",
    "sections": [
     {
      "q": "IQ परसेंटाइल का क्या मतलब होता है?",
      "a": "परसेंटाइल यह दर्शाता है कि किसी व्यक्ति का स्कोर कितने प्रतिशत आबादी से बराबर या अधिक है। उदाहरण के लिए, 84वाँ परसेंटाइल का अर्थ है कि वह व्यक्ति लगभग 84% लोगों से ऊपर है। परसेंटाइल और IQ स्कोर अलग चीज़ें हैं — स्कोर एक संख्या है, जबकि परसेंटाइल उस संख्या की आबादी में सापेक्ष स्थिति बताता है।"
     },
     {
      "q": "IQ 115 कौन से परसेंटाइल में आता है?",
      "a": "IQ 115 लगभग 84वें परसेंटाइल में आता है। चूँकि मानक विचलन 15 है, 115 का स्कोर माध्य से ठीक एक मानक विचलन ऊपर है, और सामान्य वितरण के अनुसार लगभग 84% लोग इससे नीचे होते हैं। इसी तरह IQ 85 (एक मानक विचलन नीचे) लगभग 16वें परसेंटाइल में पड़ता है।"
     },
     {
      "q": "130 IQ का परसेंटाइल क्या है?",
      "a": "IQ 130 लगभग 98वें परसेंटाइल में आता है, यानी यह शीर्ष लगभग 2% में है। यही कारण है कि 130 अधिकांश उच्च-IQ समाजों (जैसे Mensa) का प्रवेश कट-ऑफ है। इससे आगे, 145 का स्कोर शीर्ष लगभग 0.1% (99.9वाँ परसेंटाइल) में आता है।"
     },
     {
      "q": "IQ स्कोर को परसेंटाइल में कैसे बदला जाता है?",
      "a": "IQ स्कोर को परसेंटाइल में बदलने के लिए सामान्य वितरण (माध्य 100, मानक विचलन 15) के संचयी प्रायिकता फलन का उपयोग होता है। पहले स्कोर को z-मान में बदला जाता है (z = (IQ − 100) ÷ 15), फिर उस z-मान का संचयी प्रतिशत निकाला जाता है। यही गणितीय आधार ऊपर दिए गए चार्ट के परसेंटाइल मानों को तय करता है।"
     },
     {
      "q": "नीचे दी गई वर्गीकरण टेबल को कैसे पढ़ें?",
      "a": "टेबल में हर पंक्ति एक IQ रेंज दिखाती है, उसका वर्गीकरण नाम, उससे जुड़ा परसेंटाइल बैंड, और आबादी में उसका अनुमानित प्रतिशत। बीच की रेंज (90–109) में सबसे अधिक लगभग 50% लोग आते हैं, और दोनों छोरों (130+ तथा 70 से नीचे) में सबसे कम — लगभग 2%-2% — लोग होते हैं। यह 'घंटी-आकार' (bell curve) वितरण का सीधा परिणाम है।"
     }
    ]
   },
   "online-iq-test-accuracy": {
    "title": "क्या ऑनलाइन IQ टेस्ट सटीक होते हैं? — सच्चाई",
    "desc": "क्या ऑनलाइन IQ टेस्ट सटीक होते हैं? जानें इसकी पद्धति (रेवेन मैट्रिसेज़, CHC, सामान्य वितरण), विश्वसनीयता (α≈0.85–0.92) और सीमाएँ।",
    "keywords": "ऑनलाइन IQ टेस्ट सटीक, क्या IQ टेस्ट सही होते हैं, IQ टेस्ट विश्वसनीयता, मुफ्त IQ टेस्ट सटीकता, रेवेन मैट्रिसेज़, IQ टेस्ट पद्धति",
    "h1": "क्या ऑनलाइन IQ टेस्ट सटीक होते हैं?",
    "intro": "एक अच्छी तरह बनाया गया ऑनलाइन IQ टेस्ट आपकी संज्ञानात्मक क्षमता का उपयोगी अनुमान दे सकता है, लेकिन यह नैदानिक निदान नहीं है। हमारा टेस्ट रेवेन के प्रोग्रेसिव मैट्रिसेज़ और CHC सिद्धांत पर आधारित है, सामान्य वितरण से स्कोर देता है, और इसकी आंतरिक विश्वसनीयता (Cronbach's α) लगभग 0.85–0.92 है।",
    "sections": [
     {
      "q": "यह IQ टेस्ट किस वैज्ञानिक पद्धति पर बना है?",
      "a": "यह टेस्ट रेवेन के प्रोग्रेसिव मैट्रिसेज़ और CHC (Cattell–Horn–Carroll) बुद्धि सिद्धांत पर आधारित है। मैट्रिक्स-आधारित प्रश्न मुख्य रूप से 'तरल बुद्धि' (fluid intelligence, Gf) मापते हैं, जो भाषा या शिक्षा पर कम निर्भर है। अंतिम स्कोर सामान्य वितरण (माध्य 100, मानक विचलन 15) के अनुसार मानकीकृत किया जाता है।"
     },
     {
      "q": "इस टेस्ट की विश्वसनीयता कितनी है?",
      "a": "इस टेस्ट की आंतरिक संगति विश्वसनीयता (Cronbach's α) लगभग 0.85–0.92 है, जो एक स्क्रीनिंग टेस्ट के लिए अच्छा स्तर माना जाता है। इसका अर्थ है कि टेस्ट के प्रश्न आपस में सुसंगत रूप से एक ही अंतर्निहित क्षमता को मापते हैं। हालाँकि उच्च विश्वसनीयता का मतलब यह नहीं कि स्कोर नैदानिक रूप से अंतिम है।"
     },
     {
      "q": "ऑनलाइन और नैदानिक (clinical) IQ टेस्ट में क्या अंतर है?",
      "a": "ऑनलाइन टेस्ट एक शैक्षिक अनुमान देते हैं, जबकि WAIS या Stanford-Binet जैसे नैदानिक टेस्ट प्रशिक्षित मनोवैज्ञानिक की देखरेख में दिए जाते हैं और यही नैदानिक मानक हैं। नैदानिक टेस्ट कई संज्ञानात्मक क्षेत्रों को अलग-अलग और नियंत्रित परिस्थितियों में मापते हैं। इसलिए किसी आधिकारिक निदान या निर्णय के लिए हमेशा प्रमाणित नैदानिक मूल्यांकन ही उपयोग करें।"
     },
     {
      "q": "ऑनलाइन IQ स्कोर को कौन-सी चीज़ें प्रभावित कर सकती हैं?",
      "a": "ऑनलाइन IQ स्कोर सांस्कृतिक पृष्ठभूमि, शिक्षा, टेस्ट से परिचय और यहाँ तक कि नींद व थकान से भी प्रभावित होते हैं। 'फ्लिन प्रभाव' (Flynn effect) दर्शाता है कि औसत स्कोर पीढ़ियों के साथ बदलते रहे हैं, और बार-बार टेस्ट देने से अभ्यास के कारण स्कोर थोड़ा बढ़ सकता है। यही कारण है कि एक ही टेस्ट का परिणाम भी पूर्ण सत्य नहीं, बल्कि एक अनुमान-सीमा माना जाना चाहिए।"
     },
     {
      "q": "क्या मैं इस स्कोर को मेडिकल या आधिकारिक निदान मान सकता हूँ?",
      "a": "नहीं, इस ऑनलाइन स्कोर को किसी भी मेडिकल, मनोवैज्ञानिक या आधिकारिक निदान के रूप में नहीं लेना चाहिए। यह केवल शिक्षा और आत्म-समझ के लिए एक संदर्भ बिंदु है। यदि आपको नैदानिक मूल्यांकन की आवश्यकता है, तो किसी योग्य मनोवैज्ञानिक से प्रमाणित WAIS या Stanford-Binet जैसा टेस्ट करवाएँ।"
     }
    ]
   },
   "improve-iq": {
    "title": "क्या IQ बढ़ाया जा सकता है? — विज्ञान क्या कहता है",
    "desc": "क्या IQ बढ़ाया जा सकता है? जानें क्या वाकई काम करता है (कार्यशील स्मृति, शिक्षा), क्या बढ़ा-चढ़ाकर कहा जाता है, और जीवनशैली का असर।",
    "keywords": "IQ कैसे बढ़ाएँ, क्या IQ बढ़ सकता है, IQ बढ़ाने के तरीके, दिमाग तेज़ करना, कार्यशील स्मृति प्रशिक्षण, बुद्धि बढ़ाना",
    "h1": "क्या IQ बढ़ाया जा सकता है?",
    "intro": "आपकी 'तरल बुद्धि' (Gf) कुछ हद तक प्रशिक्षण और कार्यशील-स्मृति अभ्यास से सुधर सकती है, पर मूल सामान्य बुद्धि (g) काफ़ी हद तक आनुवंशिक होती है और इसमें नाटकीय, स्थायी छलांग दुर्लभ है। शिक्षा, नींद, पढ़ना और व्यायाम संज्ञानात्मक क्षमता को बनाए रखने और निखारने में सबसे विश्वसनीय रूप से मदद करते हैं।",
    "sections": [
     {
      "q": "क्या IQ वाकई बढ़ाया जा सकता है?",
      "a": "हाँ, कुछ हद तक — खासकर तरल बुद्धि (Gf) और मापे गए स्कोर में मामूली सुधार संभव है। शिक्षा के अतिरिक्त वर्ष लगातार थोड़े उच्च IQ स्कोर से जुड़े पाए गए हैं, और टेस्ट से परिचय भी स्कोर को थोड़ा बढ़ाता है। लेकिन मूल सामान्य बुद्धि (g) में बड़ी, स्थायी वृद्धि के पुख्ता वैज्ञानिक प्रमाण सीमित हैं।"
     },
     {
      "q": "कौन-से तरीके वाकई काम करते हैं?",
      "a": "सबसे विश्वसनीय तरीके हैं औपचारिक शिक्षा, नियमित पढ़ना और कार्यशील-स्मृति का लक्षित अभ्यास। ये सोचने की दक्षता, तर्क और समस्या-समाधान कौशल को मज़बूत करते हैं, जिससे संज्ञानात्मक प्रदर्शन बेहतर होता है। महत्वपूर्ण बात यह है कि इनका असर निरंतर अभ्यास से आता है, किसी एक 'जादुई' तकनीक से नहीं।"
     },
     {
      "q": "किन दावों को बढ़ा-चढ़ाकर पेश किया जाता है?",
      "a": "अधिकांश 'ब्रेन-ट्रेनिंग' ऐप्स और शॉर्टकट के दावे बढ़ा-चढ़ाकर पेश किए जाते हैं। शोध बताते हैं कि इन खेलों में आप मुख्यतः उसी विशेष खेल में बेहतर होते हैं, पर यह सुधार सामान्य बुद्धि या रोज़मर्रा की समस्या-समाधान क्षमता में बहुत कम स्थानांतरित होता है। तेज़ी से IQ कई अंक बढ़ाने के वादे आमतौर पर वैज्ञानिक रूप से असमर्थित होते हैं।"
     },
     {
      "q": "जीवनशैली का संज्ञानात्मक क्षमता पर क्या असर पड़ता है?",
      "a": "पर्याप्त नींद, नियमित शारीरिक व्यायाम और संतुलित आहार आपकी मौजूदा संज्ञानात्मक क्षमता को बनाए रखने और चरम पर लाने में मदद करते हैं। नींद की कमी, तनाव और गतिहीन जीवनशैली ध्यान, स्मृति और प्रसंस्करण गति को घटा देती है। यानी अच्छी जीवनशैली IQ को 'बढ़ाती' भले न हो, पर आपको आपकी पूरी क्षमता पर प्रदर्शन करने में मदद ज़रूर करती है।"
     },
     {
      "q": "क्या बच्चों में IQ बढ़ाना वयस्कों की तुलना में आसान है?",
      "a": "हाँ, बचपन में मस्तिष्क अधिक लचीला (plastic) होता है, इसलिए समृद्ध शैक्षिक और पोषण-संपन्न वातावरण का प्रभाव अधिक होता है। प्रारंभिक उम्र में अच्छी शिक्षा, किताबें, भाषा-संपर्क और उत्तेजक गतिविधियाँ दीर्घकालिक संज्ञानात्मक विकास में बड़ी भूमिका निभाती हैं। वयस्कों में भी सीखना जारी रहता है, पर बदलाव आमतौर पर अधिक मामूली होते हैं।"
     }
    ]
   }
  },
  "faq8": [
   {
    "q": "IQ क्या है और इसे कैसे मापा जाता है?",
    "a": "IQ (बुद्धि लब्धि) एक मानकीकृत स्कोर है जो तार्किक तर्क, पैटर्न पहचान और समस्या-समाधान जैसी संज्ञानात्मक क्षमताओं को मापता है। इसे सामान्य वितरण पर मानकीकृत किया जाता है जिसका माध्य 100 और मानक विचलन 15 होता है, यानी 100 बिल्कुल औसत है।"
   },
   {
    "q": "क्या यह ऑनलाइन IQ टेस्ट सटीक है?",
    "a": "यह टेस्ट रेवेन के प्रोग्रेसिव मैट्रिसेज़ और CHC सिद्धांत पर आधारित है और इसकी विश्वसनीयता (Cronbach's α) लगभग 0.85–0.92 है, इसलिए यह एक भरोसेमंद अनुमान देता है। हालाँकि यह शैक्षिक उद्देश्य के लिए है और किसी प्रशिक्षित मनोवैज्ञानिक द्वारा दिए गए नैदानिक टेस्ट (जैसे WAIS) का विकल्प नहीं है।"
   },
   {
    "q": "IQ टेस्ट में कितना समय लगता है?",
    "a": "हमारे क्विक टेस्ट में 15 प्रश्न होते हैं और इसमें लगभग 12 मिनट लगते हैं, जबकि प्रिसिज़न टेस्ट में 40 प्रश्न होते हैं और लगभग 28 मिनट लगते हैं। दोनों के अंत में तुरंत परिणाम मिलता है, और प्रिसिज़न टेस्ट क्षेत्रवार ताकत/कमज़ोरी का विश्लेषण भी देता है।"
   },
   {
    "q": "अच्छा IQ स्कोर कितना होता है?",
    "a": "100 बिल्कुल औसत है, 110–119 औसत से ऊपर, और 120 या अधिक 'अच्छा' माना जाता है क्योंकि यह शीर्ष लगभग 10% में आता है। 130 से ऊपर का स्कोर प्रतिभाशाली (gifted) श्रेणी में आता है, जो आबादी के शीर्ष लगभग 2% में होता है।"
   },
   {
    "q": "क्या समय के साथ IQ बदल सकता है?",
    "a": "हाँ, IQ स्कोर में मामूली बदलाव संभव है — शिक्षा, अभ्यास और जीवनशैली से तरल बुद्धि कुछ हद तक सुधर सकती है। लेकिन मूल सामान्य बुद्धि (g) काफ़ी हद तक आनुवंशिक और स्थिर रहती है, इसलिए बड़े स्थायी बदलाव दुर्लभ हैं।"
   },
   {
    "q": "Mensa में शामिल होने के लिए कितना IQ चाहिए?",
    "a": "Mensa का सामान्य प्रवेश कट-ऑफ IQ 130 या उससे ऊपर होता है, जो आबादी के शीर्ष लगभग 2% (98वाँ परसेंटाइल) में आता है। हालाँकि Mensa केवल अपने मान्यता-प्राप्त, निगरानी में दिए गए टेस्टों के स्कोर ही स्वीकार करती है, ऑनलाइन टेस्ट के नहीं।"
   },
   {
    "q": "IQ और EQ में क्या अंतर है?",
    "a": "IQ तार्किक तर्क और समस्या-समाधान जैसी संज्ञानात्मक क्षमता मापता है, जबकि EQ (भावनात्मक बुद्धि) भावनाओं को समझने, नियंत्रित करने और सामाजिक संबंध निभाने की क्षमता है। दोनों अलग-अलग कौशल हैं और जीवन में सफलता के लिए दोनों का अपना महत्व है — ऊँचा IQ अच्छे EQ की गारंटी नहीं देता।"
   },
   {
    "q": "क्या उम्र के साथ IQ बदलता है?",
    "a": "IQ स्कोर उम्र के सापेक्ष मानकीकृत होता है, इसलिए आपका स्कोर हमेशा आपकी ही आयु-समूह की तुलना में होता है। तरल बुद्धि (नई समस्याएँ हल करना) आमतौर पर युवावस्था में चरम पर होती है और धीरे-धीरे घटती है, जबकि 'संचित बुद्धि' (ज्ञान और शब्दावली) उम्र के साथ अक्सर बनी रहती है या बढ़ती है।"
   }
  ]
 },
 "ru": {
  "tableHeaders": [
   "Диапазон IQ",
   "Классификация",
   "Процентиль",
   "% населения"
  ],
  "classLabels": [
   "Очень высокий (одарённость)",
   "Высокий",
   "Выше среднего",
   "Средний",
   "Ниже среднего",
   "Пограничный",
   "Крайне низкий"
  ],
  "spokes": {
   "good-iq-score": {
    "title": "Какой IQ считается хорошим: норма и высокий уровень",
    "desc": "Какой IQ считается хорошим, нормальным и высоким? 100 — это среднее, 110–119 выше среднего, 120+ входит в топ-10%, а 130+ — одарённость.",
    "keywords": "какой IQ считается хорошим, нормальный IQ, высокий IQ, средний уровень IQ, какой IQ у гения, что значит IQ 120, что значит IQ 130, сколько IQ у обычного человека",
    "h1": "Какой IQ считается хорошим?",
    "intro": "100 — это ровно средний результат, 110–119 считается выше среднего, 120 и выше входит в верхние 10% («хороший» IQ), а 130 и выше относят к одарённости (верхние 2%).",
    "sections": [
     {
      "q": "Какой IQ считается нормальным или средним?",
      "a": "Нормальным считается IQ в диапазоне 90–109, причём ровно 100 — это среднее значение по популяции. IQ распределяется по нормальной кривой со средним 100 и стандартным отклонением 15, поэтому около 68% всех людей набирают от 85 до 115 баллов. Именно поэтому большинство результатов закономерно оказываются около ста, и это совершенно обычный показатель."
     },
     {
      "q": "С какого балла IQ считается высоким?",
      "a": "Высоким принято считать IQ от 120 баллов — это уже верхние 10% населения. Диапазон 110–119 относят к уровню «выше среднего», а 120–129 — к категории «высокий интеллект» с развитым абстрактным мышлением и навыками решения задач. Чем дальше балл отклоняется от 100 вверх, тем реже он встречается: к примеру, IQ 130 есть лишь примерно у 2 человек из 100."
     },
     {
      "q": "Что означает IQ 130 и выше?",
      "a": "IQ 130 и выше означает интеллектуальную одарённость и попадание в верхние 2% населения. Именно 130 — типичный порог для вступления в Mensa и многие программы для одарённых. Такой результат указывает на исключительную способность быстро схватывать сложные концепции, хотя сам по себе он не гарантирует жизненного успеха."
     },
     {
      "q": "Какой IQ у гения?",
      "a": "Уровнем гения обычно называют IQ 145 и выше — это верхние 0,1% населения, то есть примерно 1 человек из 1000. Строгого научного определения «гениальности» по баллу IQ не существует, и психологи относятся к этому ярлыку с осторожностью. Подлинная выдающаяся одарённость проявляется не только в высоком IQ, но и в реальных творческих и интеллектуальных достижениях."
     },
     {
      "q": "Делает ли высокий IQ человека успешным?",
      "a": "Нет, высокий IQ повышает шансы на академические и профессиональные достижения, но не определяет успех полностью. IQ измеряет лишь одну грань интеллекта — логику и решение задач, тогда как эмоциональный интеллект (EQ), мотивация, упорство и социальные навыки не менее важны для реальной жизни. Поэтому «хороший» IQ стоит рассматривать как одно из преимуществ, а не как приговор или гарантию."
     }
    ]
   },
   "iq-percentile-chart": {
    "title": "Таблица процентилей IQ: какой у меня процентиль",
    "desc": "Таблица процентилей IQ и расшифровка баллов: IQ 100 = 50-й процентиль, 115 ≈ 84-й, 120 — топ-10%, 130 — топ-2%. Узнайте, какому проценту соответствует ваш балл.",
    "keywords": "таблица процентилей IQ, процентиль IQ, какой у меня процентиль IQ, расшифровка IQ, что значит мой IQ, IQ 115 процентиль, IQ 120 топ, шкала IQ по баллам",
    "h1": "Таблица процентилей IQ: какому проценту вы соответствуете",
    "intro": "Процентиль показывает, какой процент людей вы опередили по баллу: IQ 100 = 50-й процентиль (середина), 115 ≈ 84-й процентиль, 120 — верхние 10%, а 130 — верхние 2%.",
    "sections": [
     {
      "q": "Чем процентиль отличается от балла IQ?",
      "a": "Балл IQ — это абсолютное число по шкале со средним 100, а процентиль показывает, какой процент людей вы опередили. Например, IQ 100 соответствует 50-му процентилю — вы ровно посередине и опережаете половину населения. Процентиль удобнее для понимания, потому что наглядно отражает вашу позицию относительно всех остальных, а не просто абстрактную цифру."
     },
     {
      "q": "Какому процентилю соответствует мой IQ?",
      "a": "IQ 100 — это 50-й процентиль, 115 — примерно 84-й, 120 — около 91-го (верхние 10%), а 130 — около 98-го (верхние 2%). IQ 85 соответствует примерно 16-му процентилю, а 145 — 99,9-му (верхние 0,1%). Эти соответствия рассчитываются по нормальному распределению со средним 100 и стандартным отклонением 15, поэтому они одинаковы для любого корректно нормированного теста."
     },
     {
      "q": "Что означает IQ 115 в процентилях?",
      "a": "IQ 115 находится примерно на 84-м процентиле, то есть вы опережаете около 84% населения. Это ровно на одно стандартное отклонение выше среднего (100 + 15) и попадает в категорию «выше среднего». Иначе говоря, лишь примерно каждый шестой человек набирает столько же или больше."
     },
     {
      "q": "Почему очень высокие и очень низкие баллы так редки?",
      "a": "Потому что IQ распределён по колоколообразной кривой, где большинство людей скапливается у центра, а крайние значения встречаются всё реже. Около 68% людей попадают в диапазон 85–115 и примерно 95% — в диапазон 70–130, поэтому баллы выше 130 или ниже 70 редки по определению. Именно из-за нормального распределения каждый следующий шаг вверх по шкале даётся всё «дороже» в смысле процентиля."
     },
     {
      "q": "Как читать таблицу процентилей IQ ниже?",
      "a": "Найдите свой балл в столбце «Диапазон IQ» — соседние столбцы покажут классификацию, процентиль и долю населения в этой группе. Например, строка 120–129 соответствует категории «Высокий», 91–97-му процентилям и примерно 8% людей. Таблица помогает за секунды перевести сухой балл в понятное «я опережаю столько-то процентов людей»."
     }
    ]
   },
   "online-iq-test-accuracy": {
    "title": "Точны ли онлайн тесты IQ: методика и надёжность",
    "desc": "Насколько точны бесплатные онлайн тесты IQ? Методика на основе матриц Равена и теории CHC, надёжность (α Кронбаха) 0,85–0,92 и честные ограничения.",
    "keywords": "точность онлайн теста IQ, насколько точны тесты на IQ, достоверный тест IQ, надёжность IQ теста, матрицы Равена онлайн, бесплатный точный тест IQ, можно ли верить онлайн IQ тесту",
    "h1": "Насколько точны онлайн тесты IQ?",
    "intro": "Качественный онлайн тест IQ даёт надёжную образовательную оценку (надёжность α Кронбаха ≈ 0,85–0,92), но он не заменяет клиническую диагностику под наблюдением психолога.",
    "sections": [
     {
      "q": "На какой методике основан этот тест IQ?",
      "a": "Тест построен на прогрессивных матрицах Равена и теории интеллекта CHC (Кеттелла — Хорна — Кэрролла), а баллы выставляются по нормальному распределению со средним 100 и стандартным отклонением 15. Матрицы Равена измеряют подвижный интеллект (Gf) с минимальным влиянием языка и культуры, что делает их золотым стандартом невербальной оценки. Эта научная основа позволяет сопоставлять результат с теми же нормами, что используют профессиональные психологи."
     },
     {
      "q": "Что такое надёжность теста и какова она здесь?",
      "a": "Надёжность — это показатель внутренней согласованности теста, и у нашего теста коэффициент α Кронбаха составляет примерно 0,85–0,92. Значения выше 0,80 считаются хорошими, а выше 0,90 — отличными и близкими к клиническому уровню. Это означает, что при повторном прохождении в схожих условиях вы, как правило, получите близкий результат, а не случайный разброс."
     },
     {
      "q": "Заменяет ли онлайн тест клиническую диагностику?",
      "a": "Нет, онлайн тест IQ — это образовательная оценка, а не клинический диагноз. Официальным стандартом остаются индивидуальные тесты под наблюдением специалиста, такие как WAIS-IV или Стэнфорд — Бине, которые проводит квалифицированный психолог. Онлайн-результат отлично подходит для самопознания и ориентира, но его нельзя использовать для медицинских или юридических решений."
     },
     {
      "q": "Что влияет на точность результата?",
      "a": "На результат влияют усталость, отвлекающие факторы, знакомство с форматом тестов, уровень образования и культурный контекст. Существует и эффект Флинна — постепенный рост средних баллов примерно на 3 пункта за десятилетие, который требует регулярной перекалибровки норм. Чтобы получить максимально достоверную оценку, проходите тест отдохнувшим, в тишине и без спешки."
     },
     {
      "q": "Чем точная (40 вопросов) версия лучше быстрой?",
      "a": "Точная версия из 40 вопросов даёт более стабильный и надёжный результат, чем быстрый тест из 15 вопросов. Чем больше заданий охватывает разные когнитивные области, тем меньше влияние случайной ошибки и тем выше итоговая надёжность измерения. Поэтому для серьёзной самооценки лучше выбирать развёрнутую версию, а быстрый тест использовать как ознакомительный."
     }
    ]
   },
   "improve-iq": {
    "title": "Можно ли повысить IQ: что реально работает",
    "desc": "Можно ли повысить IQ и как это сделать? Тренировка рабочей памяти и образование дают эффект, базовый g наследуется, а сон, чтение и спорт поддерживают мозг.",
    "keywords": "как повысить IQ, можно ли увеличить IQ, тренировка мозга для IQ, развитие интеллекта, упражнения для IQ, рабочая память тренировка, как развить интеллект, повышение IQ упражнения",
    "h1": "Можно ли повысить свой IQ?",
    "intro": "Подвижный интеллект (Gf) можно умеренно развить тренировкой рабочей памяти и образованием, но базовый общий интеллект (g) в значительной мере наследуется, поэтому радикального скачка IQ ожидать не стоит.",
    "sections": [
     {
      "q": "Можно ли вообще увеличить IQ?",
      "a": "Да, отдельные показатели интеллекта можно умеренно улучшить, особенно подвижный интеллект (Gf) и навыки решения задач. Однако базовый общий интеллект (g-фактор) в значительной степени определяется генетикой, поэтому речь идёт о скромном приросте, а не о превращении среднего IQ в гениальный. Реалистичная цель — раскрыть и поддерживать свой потенциал, а не «накрутить» десятки баллов."
     },
     {
      "q": "Какие тренировки реально работают?",
      "a": "Лучше всего подтверждена эффективность тренировки рабочей памяти (например, упражнения N-back) и системного образования. Освоение новых сложных навыков, изучение языков и регулярное решение задач нагружают подвижный интеллект и улучшают связанные с ним способности. Эффект скромный и во многом специфичен для тренируемого навыка, но он реален и накапливается со временем."
     },
     {
      "q": "Какие обещания о повышении IQ преувеличены?",
      "a": "Сильно преувеличены обещания «поднять IQ на 20 баллов за неделю» с помощью простых приложений или роликов. Научные данные показывают, что эффект когнитивных тренировок ограничен и часто не переносится широко на другие задачи, а яркая реклама обычно опережает реальные результаты. Здоровый скепсис к «волшебным» методикам — лучшая защита от разочарования и потраченных денег."
     },
     {
      "q": "Как образ жизни влияет на интеллект?",
      "a": "Качественный сон, регулярная физическая активность, чтение и сбалансированное питание помогают поддерживать когнитивные функции на пике. Аэробные нагрузки улучшают кровоснабжение мозга, а глубокий сон закрепляет память и обучение. Эти привычки не превратят вас в гения, но позволяют стабильно работать на уровне своего потенциала и замедляют возрастное снижение."
     },
     {
      "q": "Снижается ли интеллект с возрастом?",
      "a": "Частично да: скорость обработки и подвижный интеллект (Gf) обычно начинают плавно снижаться после молодого взрослого возраста. При этом кристаллизованный интеллект (Gc) — накопленные знания и словарный запас — может расти вплоть до пожилого возраста. Активная умственная и физическая нагрузка, обучение новому и общение помогают дольше сохранять когнитивную форму."
     }
    ]
   }
  },
  "faq8": [
   {
    "q": "Что такое тест на IQ и что он измеряет?",
    "a": "Тест на IQ измеряет общий интеллект (g-фактор) через задания на логику, числовые ряды, распознавание паттернов и пространственное мышление. Результаты следуют нормальному распределению со средним 100 и стандартным отклонением 15, показывая ваше положение относительно остального населения. Это оценка способности рассуждать и решать задачи, а не объёма заученных знаний."
   },
   {
    "q": "Насколько точен этот бесплатный онлайн тест IQ?",
    "a": "Тест основан на матрицах Равена и теории CHC, а его надёжность (α Кронбаха) составляет 0,85–0,92, что соответствует хорошему уровню. Он даёт достоверную образовательную оценку, но не заменяет клинические тесты под наблюдением, такие как WAIS-IV. Для самопознания и ориентира этого более чем достаточно."
   },
   {
    "q": "Сколько времени занимает прохождение теста?",
    "a": "Быстрый тест из 15 вопросов занимает около 10–12 минут, а точный тест из 40 вопросов — примерно 25–30 минут. На каждый вопрос отводится от 45 до 95 секунд в зависимости от сложности. Тест нельзя поставить на паузу, поэтому заранее выберите тихое место без отвлекающих факторов."
   },
   {
    "q": "Какой балл IQ считается хорошим?",
    "a": "Хорошим считается IQ от 120 баллов — это верхние 10% населения, а диапазон 110–119 относят к уровню «выше среднего». IQ 130 и выше означает одарённость (верхние 2%), тогда как 100 — это ровно среднее значение. При этом около 68% людей набирают от 85 до 115 баллов, и такой результат совершенно нормален."
   },
   {
    "q": "Можно ли повысить свой IQ?",
    "a": "Подвижный интеллект (Gf) можно умеренно развить тренировкой рабочей памяти, образованием и освоением новых навыков. Однако базовый общий интеллект (g-фактор) в значительной степени наследуется, поэтому радикального скачка ожидать не стоит. Сон, чтение, спорт и сбалансированное питание помогают поддерживать когнитивные функции на пике."
   },
   {
    "q": "Какой IQ нужен для вступления в Mensa?",
    "a": "Mensa принимает людей с IQ в верхних 2% населения, что обычно соответствует баллу около 130 и выше. Точный порог зависит от конкретного теста и его шкалы, но смысл всегда один — попадание в верхние 2%. При этом Mensa засчитывает только результаты официальных тестов под наблюдением, а не онлайн-оценки."
   },
   {
    "q": "Чем IQ отличается от EQ?",
    "a": "IQ измеряет логику, рассуждение и способность решать задачи, а EQ (эмоциональный интеллект) — умение понимать и управлять эмоциями, своими и чужими. Высокий IQ помогает в учёбе и аналитической работе, тогда как высокий EQ важен для отношений, лидерства и устойчивости к стрессу. Это разные и взаимодополняющие способности, и для жизненного успеха ценны обе."
   },
   {
    "q": "Меняется ли IQ с возрастом?",
    "a": "Относительный показатель IQ у взрослого человека остаётся довольно стабильным, потому что он рассчитывается с поправкой на возрастную норму. При этом скорость обработки и подвижный интеллект (Gf) с годами плавно снижаются, а кристаллизованный интеллект (Gc) — знания и словарный запас — может расти до пожилого возраста. Поэтому тест предназначен в первую очередь для взрослых от 16 лет, для детей используют отдельные нормы (например, WISC-V)."
   }
  ]
 },
 "vi": {
  "tableHeaders": [
   "Khoảng IQ",
   "Phân loại",
   "Phân vị (Percentile)",
   "Tỷ lệ dân số"
  ],
  "classLabels": [
   "Rất ưu tú / Thiên tài",
   "Ưu tú",
   "Trên trung bình",
   "Trung bình",
   "Dưới trung bình",
   "Ranh giới (chậm nhẹ)",
   "Rất thấp"
  ],
  "spokes": {
   "good-iq-score": {
    "title": "Chỉ số IQ bao nhiêu là cao? Mức IQ tốt là bao nhiêu",
    "desc": "IQ bao nhiêu là cao, là giỏi? IQ 100 là trung bình, 110–119 trên trung bình, từ 120 trở lên thuộc top 10% và 130+ là thiên tài. Xem mốc chuẩn ngay.",
    "keywords": "chỉ số iq bao nhiêu là cao, iq bao nhiêu là giỏi, iq trung bình của người việt, iq 120 là cao hay thấp, iq 130 là gì, mức iq thiên tài",
    "h1": "Chỉ số IQ bao nhiêu là cao và thế nào là mức IQ tốt?",
    "intro": "IQ 100 là mức trung bình chính xác; từ 110–119 là trên trung bình, từ 120 trở lên đã thuộc top 10% (được xem là cao/giỏi), và từ 130 trở lên là rất ưu tú (chỉ khoảng 2% dân số). Dưới đây là cách hiểu từng mốc điểm.",
    "sections": [
     {
      "q": "Chỉ số IQ bao nhiêu là cao?",
      "a": "Chỉ số IQ từ 120 trở lên được xem là cao, vì nó đưa bạn vào nhóm khoảng 10% người thông minh nhất. IQ được chuẩn hóa với điểm trung bình 100 và độ lệch chuẩn 15, nên mỗi 15 điểm tương ứng một độ lệch chuẩn. Cụ thể: 110–119 là trên trung bình, 120–129 là ưu tú (top 10%), và 130 trở lên là rất ưu tú (top 2%)."
     },
     {
      "q": "IQ trung bình của một người bình thường là bao nhiêu?",
      "a": "IQ trung bình là 100, theo định nghĩa của thang đo IQ. Khoảng 68% dân số có IQ nằm trong khoảng 85–115, và khoảng 95% nằm trong khoảng 70–130. Vì vậy nếu IQ của bạn quanh mốc 90–109 thì bạn hoàn toàn ở mức bình thường, giống đa số mọi người."
     },
     {
      "q": "IQ 120 là cao hay thấp?",
      "a": "IQ 120 là mức cao, đưa bạn vào khoảng top 10% dân số (phân vị thứ 90). Điều này nghĩa là trong 100 người, chỉ khoảng 10 người đạt từ mức này trở lên. Mốc 120 thường gắn với khả năng tư duy logic, học tập và giải quyết vấn đề tốt hơn rõ rệt so với mức trung bình."
     },
     {
      "q": "IQ 130 là gì và có phải thiên tài không?",
      "a": "IQ 130 là ngưỡng 'rất ưu tú' (gifted), thuộc khoảng top 2% dân số và cũng chính là mốc tuyển thành viên phổ biến của Mensa. Đây thường được coi là điểm khởi đầu của 'năng khiếu trí tuệ'. Mức 'thiên tài' theo nghĩa hiếm hơn nữa thường được nhắc đến từ khoảng 145 trở lên — chỉ chiếm khoảng 0,1% dân số."
     },
     {
      "q": "IQ bao nhiêu thì được xem là giỏi để học tập và làm việc?",
      "a": "IQ từ 110 trở lên đã là một lợi thế rõ rệt cho việc học và làm việc trí óc. Tuy nhiên, IQ chỉ phản ánh một phần năng lực — sự kiên trì, kỹ năng học tập, động lực và trí tuệ cảm xúc (EQ) cũng quyết định thành công không kém. Vì vậy một người có IQ trung bình vẫn có thể vượt trội nhờ nỗ lực và phương pháp đúng."
     }
    ]
   },
   "iq-percentile-chart": {
    "title": "Bảng phân vị IQ: IQ của bạn thuộc top bao nhiêu %",
    "desc": "Bảng tra phân vị IQ chuẩn: IQ 100 = phân vị 50, 115 ≈ 84%, 120 ≈ top 10%, 130 ≈ top 2%. Tra ngay xem IQ của bạn thuộc top bao nhiêu phần trăm dân số.",
    "keywords": "bảng phân vị iq, iq thuộc top bao nhiêu phần trăm, percentile iq là gì, phân loại chỉ số iq, bảng iq chuẩn, iq top 10%",
    "h1": "Bảng phân vị IQ — IQ của bạn xếp top bao nhiêu phần trăm?",
    "intro": "Phân vị (percentile) cho biết bạn vượt trên bao nhiêu phần trăm dân số: IQ 100 nằm ở phân vị thứ 50 (giữa bảng), 115 ≈ phân vị 84, 120 ≈ top 10%, và 130 ≈ top 2%. Bảng phân loại bên dưới giúp bạn tra nhanh vị trí của mình.",
    "sections": [
     {
      "q": "Phân vị (percentile) IQ là gì?",
      "a": "Phân vị IQ là tỷ lệ phần trăm dân số có điểm bằng hoặc thấp hơn bạn. Ví dụ, IQ ở phân vị thứ 84 nghĩa là bạn cao hơn 84% số người và chỉ có 16% người đạt cao hơn. Phân vị trực quan hơn điểm số thô vì nó cho biết ngay vị trí tương đối của bạn trong cộng đồng."
     },
     {
      "q": "IQ 100 thì thuộc top bao nhiêu phần trăm?",
      "a": "IQ 100 nằm chính giữa, tức phân vị thứ 50 — bạn cao hơn đúng một nửa dân số. Đây là điểm trung bình theo định nghĩa của thang đo IQ. Nói cách khác, có IQ 100 nghĩa là bạn hoàn toàn ở mức điển hình, không cao cũng không thấp."
     },
     {
      "q": "IQ 120 và 130 tương ứng với top bao nhiêu phần trăm?",
      "a": "IQ 120 tương ứng khoảng top 10% (phân vị 90), còn IQ 130 tương ứng khoảng top 2% (phân vị 98). Mỗi 15 điểm IQ là một độ lệch chuẩn, nên điểm càng xa mốc 100 thì tỷ lệ người đạt được càng hiếm. Mốc 145 hiếm hơn nữa, chỉ vào khoảng top 0,1% dân số."
     },
     {
      "q": "Vì sao đa số mọi người có IQ gần mức 100?",
      "a": "Vì IQ tuân theo phân phối chuẩn (hình chuông), trong đó điểm tập trung dày đặc quanh giá trị trung bình 100. Khoảng 68% dân số có IQ trong khoảng 85–115 và khoảng 95% nằm trong khoảng 70–130. Càng đi về hai cực (rất cao hoặc rất thấp), số người càng ít dần."
     },
     {
      "q": "Làm sao để đọc bảng phân loại IQ bên dưới?",
      "a": "Bạn tìm khoảng điểm chứa IQ của mình, sau đó đọc tên phân loại, phân vị tương ứng và tỷ lệ dân số ở cùng hàng. Ví dụ, IQ 122 rơi vào nhóm 120–129 ('Ưu tú', top 10%). Bảng dựa trên thang chuẩn (trung bình 100, độ lệch chuẩn 15) nên áp dụng được cho hầu hết các bài test IQ phổ biến."
     }
    ]
   },
   "online-iq-test-accuracy": {
    "title": "Test IQ online có chính xác không? Độ tin cậy thực tế",
    "desc": "Test IQ online có chính xác không? Bài test dựa trên ma trận Raven, lý thuyết CHC, phân phối chuẩn, độ tin cậy α ≈ 0,85–0,92 — nhưng chỉ là ước lượng, không thay chẩn đoán.",
    "keywords": "test iq online có chính xác không, bài test iq có đáng tin không, độ tin cậy test iq, test iq miễn phí chuẩn, ma trận raven, cách tính điểm iq",
    "h1": "Test IQ online có chính xác không và đáng tin đến đâu?",
    "intro": "Một bài test IQ online được thiết kế tốt có thể cho ước lượng đáng tin cậy (độ tin cậy nội tại α ≈ 0,85–0,92), nhưng nó là công cụ tham khảo mang tính giáo dục, không phải chẩn đoán lâm sàng. Dưới đây là phương pháp đo và những giới hạn bạn nên biết.",
    "sections": [
     {
      "q": "Bài test IQ này được xây dựng dựa trên cơ sở nào?",
      "a": "Bài test dựa trên Ma trận Tiến triển Raven (Raven's Progressive Matrices) và lý thuyết trí thông minh CHC (Cattell–Horn–Carroll). Raven đo trí thông minh linh hoạt (fluid intelligence) bằng các bài tìm quy luật hình ảnh, ít phụ thuộc vào ngôn ngữ hay văn hóa. Điểm số được chuẩn hóa theo phân phối chuẩn với trung bình 100 và độ lệch chuẩn 15."
     },
     {
      "q": "Test IQ online chính xác đến mức nào?",
      "a": "Độ tin cậy nội tại của bài test này (hệ số Cronbach's α) vào khoảng 0,85–0,92, mức được xem là tốt trong tâm trắc học. Điều đó nghĩa là kết quả khá ổn định và nhất quán nếu bạn làm trong điều kiện nghiêm túc. Tuy vậy, độ tin cậy cao không đồng nghĩa con số là tuyệt đối — hãy xem nó như một ước lượng tốt, không phải một con số cố định."
     },
     {
      "q": "Test online có khác gì so với test IQ lâm sàng?",
      "a": "Khác biệt lớn nhất là test online tự làm, còn test lâm sàng do chuyên gia tâm lý thực hiện và giám sát. Tiêu chuẩn lâm sàng là các bài như WAIS hoặc Stanford-Binet, được thực hiện trực tiếp, đo nhiều mặt năng lực và dùng cho chẩn đoán chính thức. Test online tiện lợi và miễn phí, nhưng không thể thay thế đánh giá lâm sàng chính thức."
     },
     {
      "q": "Những yếu tố nào ảnh hưởng đến điểm IQ của tôi?",
      "a": "Điểm IQ có thể dao động theo trình độ học vấn, nền văn hóa, mức độ quen thuộc với dạng bài, sự tập trung và cả tâm trạng lúc làm. Hiệu ứng Flynn cho thấy điểm IQ trung bình của các thế hệ thay đổi theo thời gian, chứng tỏ môi trường có vai trò đáng kể. Vì vậy làm test khi tỉnh táo, yên tĩnh sẽ cho kết quả phản ánh đúng năng lực hơn."
     },
     {
      "q": "Tôi có nên xem kết quả test online như một chẩn đoán không?",
      "a": "Không — kết quả test IQ online là ước lượng mang tính tham khảo và giáo dục, không phải chẩn đoán y khoa. Nếu bạn cần đánh giá chính thức (ví dụ cho mục đích học tập, công việc hay y tế), hãy tìm đến chuyên gia tâm lý để làm bài test chuẩn có giám sát. Hãy dùng kết quả online để hiểu bản thân và rèn luyện, chứ không để gắn nhãn cho mình."
     }
    ]
   },
   "improve-iq": {
    "title": "Có thể tăng chỉ số IQ không? Cách cải thiện IQ hiệu quả",
    "desc": "Có thể tăng IQ không? Luyện trí nhớ làm việc và học vấn giúp cải thiện trí thông minh linh hoạt phần nào, nhưng nhiều lời quảng cáo bị thổi phồng. Xem cách dựa trên bằng chứng.",
    "keywords": "cách tăng chỉ số iq, có thể tăng iq không, cách cải thiện iq, luyện trí nhớ làm việc, iq có thay đổi được không, rèn luyện trí não",
    "h1": "Có thể tăng chỉ số IQ không và cách cải thiện hiệu quả?",
    "intro": "Bạn có thể cải thiện một phần trí thông minh linh hoạt (Gf) nhờ luyện trí nhớ làm việc và học vấn, nhưng năng lực nền tảng (g) phần lớn do di truyền và khó thay đổi mạnh. Dưới đây là điều thực sự hiệu quả, điều bị thổi phồng và thói quen giúp duy trì trí não.",
    "sections": [
     {
      "q": "Chỉ số IQ có thể tăng được không?",
      "a": "Có thể tăng ở mức độ vừa phải, nhất là với trí thông minh linh hoạt (Gf), nhưng không thể tăng đột biến. Trí thông minh nền tảng (yếu tố g) có tính di truyền cao, nên khó thay đổi mạnh bằng luyện tập. Tuy vậy, giáo dục, rèn luyện tư duy và môi trường kích thích trí não vẫn có thể giúp bạn cải thiện điểm số một cách thực chất."
     },
     {
      "q": "Cách nào thực sự giúp cải thiện trí thông minh?",
      "a": "Học vấn và rèn luyện trí nhớ làm việc (working memory) là hai phương pháp có bằng chứng tốt nhất. Đi học lâu hơn được chứng minh làm tăng điểm IQ, còn luyện trí nhớ làm việc có thể cải thiện phần nào năng lực tư duy linh hoạt. Đọc sách, học kỹ năng mới và giải các bài tư duy logic cũng giúp não bộ hoạt động hiệu quả hơn."
     },
     {
      "q": "Những lời quảng cáo nào về 'tăng IQ' bị thổi phồng?",
      "a": "Các ứng dụng 'luyện não' hứa hẹn tăng IQ vài chục điểm thường bị phóng đại quá mức. Nghiên cứu cho thấy bạn chủ yếu giỏi hơn ở chính trò chơi đó, chứ lợi ích ít khi lan rộng sang trí thông minh tổng quát. Tương tự, các loại 'thuốc thông minh' hay khóa học thần tốc thường không có bằng chứng vững chắc về việc nâng IQ lâu dài."
     },
     {
      "q": "Thói quen sống nào giúp duy trì và bảo vệ trí não?",
      "a": "Ngủ đủ giấc, tập thể dục đều đặn và đọc sách thường xuyên là ba thói quen giúp duy trì khả năng nhận thức tốt. Giấc ngủ giúp củng cố trí nhớ, vận động cải thiện lưu thông máu lên não, còn đọc và học hỏi giúp giữ trí óc linh hoạt. Những thói quen này không biến bạn thành thiên tài, nhưng giúp bạn phát huy tối đa năng lực sẵn có."
     },
     {
      "q": "Luyện tập có làm tăng điểm test IQ không?",
      "a": "Có, làm quen với dạng bài có thể giúp điểm test tăng lên một chút, nhưng đó là 'hiệu ứng luyện tập' chứ chưa hẳn là trí thông minh thật sự tăng. Khi bạn quen với cấu trúc câu hỏi, bạn làm nhanh và đúng hơn, nên điểm cao hơn lần đầu. Vì vậy, để đánh giá đúng năng lực, nên xem kết quả ổn định qua nhiều lần làm chứ không chỉ một lần duy nhất."
     }
    ]
   }
  },
  "faq8": [
   {
    "q": "IQ là gì?",
    "a": "IQ (chỉ số thông minh) là một con số ước lượng năng lực tư duy của bạn so với dân số chung. Nó được chuẩn hóa với điểm trung bình 100 và độ lệch chuẩn 15, đo các khả năng như suy luận logic, nhận diện quy luật và giải quyết vấn đề. IQ phản ánh một phần năng lực trí tuệ, chứ không phải toàn bộ sự thông minh hay thành công của một người."
   },
   {
    "q": "Bài test IQ này có chính xác không?",
    "a": "Bài test có độ tin cậy nội tại tốt (hệ số Cronbach's α ≈ 0,85–0,92) và dựa trên Ma trận Raven cùng lý thuyết CHC. Tuy vậy, đây là công cụ ước lượng mang tính tham khảo và giáo dục, không phải chẩn đoán lâm sàng. Để có kết quả chuẩn xác nhất cho mục đích chính thức, bạn nên làm bài test có giám sát bởi chuyên gia tâm lý."
   },
   {
    "q": "Làm bài test IQ mất bao lâu?",
    "a": "Bài test thường chỉ mất khoảng 10–20 phút để hoàn thành. Bạn nên làm trong môi trường yên tĩnh, không bị gián đoạn và khi đầu óc tỉnh táo. Làm vội hoặc khi mệt mỏi có thể khiến kết quả thấp hơn năng lực thật của bạn."
   },
   {
    "q": "Chỉ số IQ bao nhiêu là tốt?",
    "a": "IQ 100 là mức trung bình, 110–119 là trên trung bình, và từ 120 trở lên được xem là cao (thuộc top 10%). Từ 130 trở lên là rất ưu tú, chỉ chiếm khoảng 2% dân số. Tuy nhiên, một IQ ở mức trung bình vẫn hoàn toàn đủ để thành công nếu kết hợp với nỗ lực và kỹ năng phù hợp."
   },
   {
    "q": "Chỉ số IQ có thay đổi theo thời gian không?",
    "a": "Có, IQ có thể dao động đôi chút theo độ tuổi, giáo dục, sức khỏe và mức độ quen thuộc với dạng bài. Trí thông minh linh hoạt có thể cải thiện phần nào nhờ học tập và luyện trí nhớ làm việc, nhưng năng lực nền tảng phần lớn do di truyền. Nhìn chung, IQ tương đối ổn định ở tuổi trưởng thành nhưng không hoàn toàn cố định."
   },
   {
    "q": "Cần IQ bao nhiêu để vào Mensa?",
    "a": "Mensa thường yêu cầu IQ từ 130 trở lên, tương ứng top 2% dân số. Mốc này được tính trên thang đo có độ lệch chuẩn 15. Vì rất ít người đạt được, đây được xem là ngưỡng của năng khiếu trí tuệ (gifted)."
   },
   {
    "q": "IQ và EQ khác nhau như thế nào?",
    "a": "IQ đo năng lực tư duy logic và giải quyết vấn đề, còn EQ (trí tuệ cảm xúc) đo khả năng nhận biết và quản lý cảm xúc của bản thân và người khác. Cả hai đều quan trọng nhưng đo những thứ khác nhau, và một người có thể mạnh ở mặt này nhưng trung bình ở mặt kia. Trong cuộc sống và công việc, sự kết hợp của cả IQ lẫn EQ thường quyết định thành công nhiều hơn chỉ riêng IQ."
   },
   {
    "q": "Tuổi tác có ảnh hưởng đến chỉ số IQ không?",
    "a": "Có, điểm IQ được chuẩn hóa theo từng nhóm tuổi nên kết quả luôn so sánh bạn với người cùng độ tuổi. Trí thông minh linh hoạt (suy luận nhanh) thường đạt đỉnh ở tuổi trẻ rồi giảm dần, trong khi trí thông minh kết tinh (kiến thức và kinh nghiệm) có xu hướng tăng theo tuổi. Vì vậy, một điểm IQ cụ thể phản ánh vị trí của bạn so với người cùng tuổi, chứ không phải so với mọi lứa tuổi."
   }
  ]
 },
 "tr": {
  "tableHeaders": [
   "IQ Aralığı",
   "Sınıflandırma",
   "Yüzdelik Dilim",
   "Nüfus Oranı"
  ],
  "classLabels": [
   "Çok Üstün (Üstün Zekalı)",
   "Üstün",
   "Ortalamanın Üstü",
   "Ortalama",
   "Ortalamanın Altı",
   "Sınırda",
   "Çok Düşük"
  ],
  "spokes": {
   "good-iq-score": {
    "title": "İyi Bir IQ Puanı Kaçtır? Ortalama ve Yüksek IQ",
    "desc": "İyi bir IQ puanı kaçtır? 100 tam ortalama, 110-119 ortalama üstü, 120+ ilk %10, 130+ üstün zekalı. Yüksek, dahi ve ortalama IQ değerlerini öğrenin.",
    "keywords": "iyi bir iq kaç, yüksek iq kaç, ortalama iq, iq 120 ne demek, iq 130, dahi iq, normal iq aralığı, iq puanı anlamı",
    "h1": "İyi Bir IQ Puanı Kaçtır?",
    "intro": "İyi bir IQ puanı genellikle 120 ve üzeridir; bu, nüfusun ilk %10'una girdiğiniz anlamına gelir. 100 tam ortalamadır, 110-119 ortalamanın üstü, 130 ve üzeri ise üstün zekalı (ilk %2) kabul edilir.",
    "sections": [
     {
      "q": "İyi bir IQ puanı kaçtan başlar?",
      "a": "İyi bir IQ puanı genellikle 120'den başlar çünkü bu değer sizi nüfusun ilk %10'una yerleştirir. IQ ölçeği ortalaması 100, standart sapması 15 olan normal dağılımı izler. 110-119 arası \"ortalamanın üstü\", 120-129 arası \"üstün\", 130 ve üzeri ise \"çok üstün\" olarak sınıflandırılır."
     },
     {
      "q": "Ortalama IQ puanı kaçtır?",
      "a": "Ortalama IQ puanı tam olarak 100'dür ve nüfusun yaklaşık %68'i 85 ile 115 arasında puan alır. Bu aralık \"normal\" veya \"ortalama\" zeka olarak kabul edilir. İnsanların yaklaşık %95'i 70 ile 130 arasında bir IQ puanına sahiptir, dolayısıyla çoğu insan bu geniş bantta yer alır."
     },
     {
      "q": "IQ 120 ne anlama gelir?",
      "a": "IQ 120, sizi nüfusun ilk %10'una koyan \"üstün\" düzeyde bir puandır. Bu seviyedeki kişiler güçlü soyut düşünme, hızlı öğrenme ve karmaşık problemleri çözme becerisi gösterir. Akademik ve mesleki başarıyla pozitif ilişkilidir, ancak başarıyı tek başına garanti etmez."
     },
     {
      "q": "IQ 130 yüksek mi, üstün zekalı mı sayılır?",
      "a": "IQ 130 üstün zekalı (gifted) eşiği kabul edilir ve nüfusun yalnızca ilk %2'sine karşılık gelir. Bu, Mensa'nın üyelik için aradığı yaygın eşiktir. 130 ve üzeri puanlar olağanüstü soyut akıl yürütme ve örüntü tanıma yeteneğine işaret eder."
     },
     {
      "q": "Dahi sayılmak için IQ kaç olmalı?",
      "a": "\"Dahi\" terimi genellikle 145 ve üzeri IQ puanları için kullanılır ve bu, nüfusun yalnızca ilk %0,1'ine denk gelir. Resmî bir psikometrik kategori olmasa da 145+ olağanüstü nadir bir bilişsel performansı gösterir. Karşılaştırma için, IQ 100 ortalama, 130 ise ilk %2'dir."
     }
    ]
   },
   "iq-percentile-chart": {
    "title": "IQ Yüzdelik Dilim Tablosu: IQ Puanım Kaçıncı %",
    "desc": "IQ yüzdelik dilim tablosu ile puanınızın nüfusun yüzde kaçını geçtiğini görün. IQ 100=%50, 115≈%84, 120=ilk %10, 130=ilk %2. Tam dönüşüm cetveli.",
    "keywords": "iq yüzdelik dilim, iq puanı yüzde kaç, iq tablosu, iq dağılımı, iq 115 yüzde kaç, iq sınıflandırma tablosu, percentile iq",
    "h1": "IQ Yüzdelik Dilim Tablosu",
    "intro": "Yüzdelik dilim, IQ puanınızın nüfusun yüzde kaçını geçtiğini gösterir: IQ 100 = %50 (tam ortalama), 115 ≈ %84, 120 ≈ ilk %10 ve 130 ≈ ilk %2. Aşağıdaki tablo her puan aralığını yüzdelik dilime ve nüfus oranına dönüştürür.",
    "sections": [
     {
      "q": "Yüzdelik dilim nedir ve IQ puanından farkı nedir?",
      "a": "Yüzdelik dilim, sizin puanınızın altında kalan insanların yüzdesini gösterirken, IQ puanı ham yeteneği sayısal bir ölçeğe oturtur. Örneğin %84 yüzdelik dilim, nüfusun %84'ünden daha yüksek puan aldığınız anlamına gelir. IQ puanı mutlak bir ölçek, yüzdelik dilim ise göreceli sıralamadır."
     },
     {
      "q": "IQ puanımı yüzdelik dilime nasıl çeviririm?",
      "a": "IQ puanı normal dağılım kullanılarak yüzdelik dilime çevrilir: IQ 100 = %50, IQ 115 ≈ %84, IQ 120 ≈ %90 (ilk %10) ve IQ 130 ≈ %98 (ilk %2). Ortalamadan her 15 puanlık artış, bir standart sapmaya karşılık gelir. Yukarıdaki tablo, her IQ aralığı için karşılık gelen yüzdelik dilimi gösterir."
     },
     {
      "q": "IQ 115 kaçıncı yüzdelik dilimdir?",
      "a": "IQ 115 yaklaşık 84. yüzdelik dilime denk gelir, yani nüfusun yaklaşık %84'ünden daha yüksek puan almışsınızdır. Bu, ortalamanın tam bir standart sapma (15 puan) üzerindedir. 115 puanı \"ortalamanın üstü\" sınıfına girer."
     },
     {
      "q": "Yüzdelik dilim neden 100'ü geçemez?",
      "a": "Yüzdelik dilim bir oran olduğu için en yüksek değer 99,9'a yaklaşır ama asla %100'e ulaşmaz, çünkü sizden daha yüksek puan alan birileri her zaman olabilir. Örneğin IQ 145, yaklaşık 99,9. yüzdelik dilimdir (ilk %0,1). Bu nedenle \"%100 yüzdelik dilim\" gibi bir değer mümkün değildir."
     },
     {
      "q": "Yüksek bir yüzdelik dilim ne anlama gelir?",
      "a": "Yüksek bir yüzdelik dilim, aynı testi alan kişilerin çoğundan daha iyi performans gösterdiğiniz anlamına gelir. Örneğin 98. yüzdelik dilim (IQ ≈ 130) sizi ilk %2'ye yerleştirir ve Mensa eşiğine karşılık gelir. Ancak yüzdelik dilim göreceli bir sıralamadır ve tek başına yaşam başarısını belirlemez."
     }
    ]
   },
   "online-iq-test-accuracy": {
    "title": "Online IQ Testleri Doğru mu? Güvenilirlik ve Yöntem",
    "desc": "Online IQ testleri doğru mu? Raven matrisleri, CHC teorisi ve normal dağılıma dayanır; güvenilirliği (Cronbach α) 0,85-0,92'dir. Klinik testlerden farkını öğrenin.",
    "keywords": "online iq testi doğru mu, iq testi güvenilir mi, ücretsiz iq testi gerçek mi, iq testi nasıl ölçer, raven testi, iq testi geçerliliği",
    "h1": "Online IQ Testleri Doğru mu?",
    "intro": "İyi tasarlanmış online IQ testleri zekanın güvenilir bir tahminini verir, ancak klinik bir tanı aracı değildir. Bu test Raven İlerleyen Matrisleri ile CHC zeka teorisine dayanır ve iç tutarlılık güvenilirliği (Cronbach α) yaklaşık 0,85-0,92'dir.",
    "sections": [
     {
      "q": "Online IQ testleri ne kadar doğrudur?",
      "a": "Bilimsel temelli online IQ testleri, zekanın güvenilir bir tahminini sunar ancak gözetimli klinik testler kadar kesin değildir. Bu testin iç tutarlılık güvenilirliği (Cronbach alfa) yaklaşık 0,85-0,92'dir; bu, psikometrik açıdan yüksek bir değerdir. Yine de sonuçlar eğitim amaçlı bir tahmin olarak yorumlanmalıdır."
     },
     {
      "q": "Bu IQ testi zekayı nasıl ölçer?",
      "a": "Bu test, sözel olmayan akıl yürütmeyi ölçen Raven İlerleyen Matrisleri ve kapsamlı Cattell-Horn-Carroll (CHC) zeka teorisine dayanır. Sorular örüntü tanıma, mantıksal akıl yürütme ve uzamsal becerileri değerlendirerek genel zekayı (g-faktörü) ölçer. Ham puanınız normal dağılım kullanılarak standart IQ ölçeğine (ortalama 100, standart sapma 15) dönüştürülür."
     },
     {
      "q": "Online IQ testi ile klinik IQ testi arasındaki fark nedir?",
      "a": "En önemli fark, klinik testlerin (WAIS, Stanford-Binet) lisanslı bir psikolog gözetiminde bireysel olarak uygulanmasıdır ve tıbbi tanı için altın standarttır. Online testler erişilebilir, hızlı ve eğitseldir ancak resmî bir tanı koyamaz. Üstün zeka tanısı veya klinik bir değerlendirme için her zaman bir uzmana başvurmalısınız."
     },
     {
      "q": "Hangi etkenler IQ testi sonucunu etkiler?",
      "a": "IQ test sonuçları kültür, eğitim düzeyi, test deneyimi, uyku, stres ve motivasyon gibi etkenlerden etkilenebilir. Flynn etkisi olarak bilinen olgu nedeniyle nüfus ortalamaları zamanla değişir ve testlerin yeniden norm edilmesi gerekir. Bu yüzden tek bir test puanı kesin bir gerçek değil, bir tahmin aralığı olarak görülmelidir."
     },
     {
      "q": "Online IQ testi sonucuna güvenebilir miyim?",
      "a": "Genel bilişsel düzeyinizin güvenilir bir göstergesi olarak güvenebilirsiniz, ancak tıbbi veya resmî bir karar için tek başına yeterli değildir. Yüksek güvenilirlik (α ≈ 0,85-0,92) puanın tutarlı olduğunu gösterir; yani testi tekrar etseniz benzer sonuç alırsınız. Sonucu kendinizi tanımak için kullanın, klinik tanı için bir uzmana danışın."
     }
    ]
   },
   "improve-iq": {
    "title": "IQ Artırılabilir mi? Zekayı Geliştirmenin Yolları",
    "desc": "IQ artırılabilir mi? Çalışma belleği ve akıcı zeka antrenmanı, eğitim ve sağlıklı yaşam zihni destekler. Bilimsel kanıtlarla neyin işe yaradığını öğrenin.",
    "keywords": "iq artırma, zeka nasıl geliştirilir, iq yükseltmek, akıcı zeka antrenmanı, beyin egzersizleri, çalışma belleği, iq geliştirme yolları",
    "h1": "IQ Artırılabilir mi?",
    "intro": "IQ puanınızı bir miktar etkileyebilirsiniz: eğitim, çalışma belleği ve akıcı zeka (Gf) antrenmanı ölçülü kazanımlar sağlayabilir, ancak çekirdek genel zeka (g) büyük ölçüde kalıtsaldır. Sağlıklı uyku, düzenli okuma ve egzersiz bilişsel performansı korumaya yardımcı olur.",
    "sections": [
     {
      "q": "IQ gerçekten artırılabilir mi?",
      "a": "IQ puanınızın bazı bileşenleri, özellikle akıcı zeka (Gf), antrenman ve eğitimle ölçülü düzeyde gelişebilir. Ancak çekirdek genel zeka (g-faktörü) büyük ölçüde kalıtsaldır ve kökten değiştirmek zordur. Gerçekçi beklenti, dramatik bir sıçrama değil, mevcut potansiyelinizi daha iyi kullanmaktır."
     },
     {
      "q": "Hangi yöntemler IQ'yu geliştirmek için işe yarar?",
      "a": "En güçlü kanıtlar eğitim ve çalışma belleği (working memory) antrenmanı lehinedir; her ek eğitim yılı ölçülebilir bilişsel kazanımlarla ilişkilidir. Karmaşık problem çözme, yeni bir dil veya beceri öğrenmek ve düzenli okumak akıcı akıl yürütmeyi destekler. Bu kazanımlar gerçek olsa da genellikle mütevazı ölçektedir."
     },
     {
      "q": "Beyin antrenmanı uygulamaları IQ'yu artırır mı?",
      "a": "Beyin antrenmanı uygulamaları çoğunlukla yalnızca o spesifik görevde sizi geliştirir; bu kazanımlar genel zekaya nadiren aktarılır. Bilimsel literatür, ticari beyin oyunlarının genel IQ üzerindeki etkisinin abartıldığını gösterir. Gerçek bir yeni beceri öğrenmek, tek bir oyunda ustalaşmaktan daha değerlidir."
     },
     {
      "q": "Yaşam tarzı bilişsel performansı nasıl etkiler?",
      "a": "Yeterli uyku, düzenli fiziksel egzersiz ve dengeli beslenme bilişsel performansı korumak ve en üst düzeye çıkarmak için kritiktir. Uyku, belleğin pekişmesini sağlar; egzersiz beyne kan akışını ve nöroplastisiteyi artırır. Bu alışkanlıklar IQ'yu sıfırdan yükseltmese de mevcut zihinsel kapasitenizi tam olarak kullanmanızı sağlar."
     },
     {
      "q": "IQ yaşla birlikte düşer mi, korunabilir mi?",
      "a": "Akıcı zeka (Gf) genellikle genç yetişkinlikte zirve yapıp yaşla yavaşça azalırken, kristalize zeka (Gc) yani bilgi ve kelime dağarcığı ileri yaşlara kadar artmaya devam edebilir. Zihinsel olarak aktif kalmak, okumak, öğrenmeye devam etmek ve sosyal bağ kurmak yaşa bağlı bilişsel gerilemeyi yavaşlatır. Yani bilişsel performans büyük ölçüde korunabilir."
     }
    ]
   }
  },
  "faq8": [
   {
    "q": "IQ nedir ve neyi ölçer?",
    "a": "IQ (Zeka Katsayısı), genel zekayı (g-faktörü) ölçen standartlaştırılmış bir puandır. Örüntü tanıma, mantıksal ve uzamsal akıl yürütme gibi becerileri değerlendirir. Sonuçlar ortalaması 100, standart sapması 15 olan normal dağılımı izler ve sizi genel nüfusa göre konumlandırır."
   },
   {
    "q": "Bu IQ testi doğru ve güvenilir mi?",
    "a": "Evet, bu test Raven İlerleyen Matrisleri ve CHC zeka teorisine dayanır; iç tutarlılık güvenilirliği (Cronbach α) yaklaşık 0,85-0,92'dir. Bu, online bir test için yüksek bir güvenilirlik düzeyidir. Yine de sonuçlar eğitim amaçlı bir tahmindir ve klinik tanının yerini tutmaz."
   },
   {
    "q": "IQ testi ne kadar sürer?",
    "a": "Test genellikle birkaç dakikada tamamlanır ve dikkatinizi korumanız için kısa ve odaklı tasarlanmıştır. Soruları kendi hızınızda yanıtlayabilirsiniz. En doğru sonuç için sakin, dikkat dağıtıcı unsurlardan uzak bir ortamda çözmeniz önerilir."
   },
   {
    "q": "İyi bir IQ puanı kaçtır?",
    "a": "İyi bir IQ puanı genellikle 120 ve üzeridir; bu sizi nüfusun ilk %10'una yerleştirir. 100 tam ortalama, 110-119 ortalamanın üstü, 130 ve üzeri ise üstün zekalı (ilk %2) kabul edilir. İnsanların yaklaşık %68'i 85-115 arasında puan alır."
   },
   {
    "q": "IQ zamanla değişir mi?",
    "a": "IQ'nun bir kısmı, özellikle akıcı zeka, eğitim ve çalışma belleği antrenmanıyla ölçülü düzeyde değişebilir. Ancak çekirdek genel zeka büyük ölçüde kalıtsaldır ve oldukça istikrarlıdır. Uyku, egzersiz ve düzenli okuma gibi sağlıklı alışkanlıklar bilişsel performansı korumaya yardımcı olur."
   },
   {
    "q": "Mensa'ya girmek için IQ kaç olmalı?",
    "a": "Mensa International, gözetimli bir IQ testinde nüfusun ilk %2'sine giren kişileri kabul eder; bu çoğu ölçekte yaklaşık 130 IQ'ya denk gelir. Bu eşik, standart sapması 15 olan testler için geçerlidir. Mensa yalnızca onayladığı resmî, gözetimli testlerin sonuçlarını kabul eder."
   },
   {
    "q": "IQ ile EQ arasındaki fark nedir?",
    "a": "IQ mantıksal akıl yürütme, problem çözme ve soyut düşünme gibi bilişsel yetenekleri ölçerken, EQ (Duygusal Zeka) duyguları tanıma, anlama ve yönetme becerisini ifade eder. İkisi farklı yeteneklerdir ve birbirinden büyük ölçüde bağımsızdır. Yaşamda başarı için her ikisi de önemlidir; yüksek IQ tek başına yeterli değildir."
   },
   {
    "q": "Yaş IQ puanını etkiler mi?",
    "a": "IQ puanları yaşa göre normlandırılır, yani puanınız kendi yaş grubunuzla karşılaştırılarak hesaplanır. Akıcı zeka genç yetişkinlikte zirve yapıp yavaşça azalırken, kristalize zeka (bilgi ve kelime dağarcığı) ileri yaşa kadar artabilir. Bu nedenle yaşlanmak otomatik olarak \"daha düşük IQ\" anlamına gelmez."
   }
  ]
 }
};
