// ═══════════════════════════════════════════════════════════
// QUESTION POOLS
// ═══════════════════════════════════════════════════════════

const seqPool=[
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'3, 6, 12, 24, ?',opts:['36','42','48','54'],correct:2,difficulty:1},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'1, 4, 9, 16, 25, ?',opts:['30','34','36','49'],correct:2,difficulty:1},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'2, 3, 5, 8, 13, ?',opts:['18','19','21','23'],correct:2,difficulty:2},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'100, 91, 83, 76, 70, ?',opts:['63','64','65','66'],correct:2,difficulty:2},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'1, 3, 7, 15, 31, ?',opts:['47','55','63','71'],correct:2,difficulty:2},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'2, 3, 5, 7, 11, 13, ?',opts:['15','17','19','21'],correct:1,difficulty:3},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'1, 2, 6, 24, 120, ?',opts:['360','480','600','720'],correct:3,difficulty:3},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'3, 5, 9, 17, 33, ?',opts:['55','61','65','67'],correct:2,difficulty:3},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'1, 3, 6, 10, 15, 21, ?',opts:['26','27','28','30'],correct:2,difficulty:2},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'729, 243, 81, 27, ?',opts:['6','8','9','12'],correct:2,difficulty:2},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'1, 8, 27, 64, 125, ?',opts:['196','210','216','225'],correct:2,difficulty:3},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'2, 5, 11, 23, 47, ?',opts:['89','93','95','97'],correct:2,difficulty:3},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'4, 13, 40, 121, 364, ?',opts:['1011','1090','1093','1095'],correct:2,difficulty:4},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'1, 7, 25, 79, 241, ?',opts:['721','723','725','727'],correct:3,difficulty:4},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'2, 5, 14, 41, 122, ?',opts:['361','363','365','367'],correct:2,difficulty:4},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'0, 1, 3, 7, 15, 31, ?',opts:['47','55','63','71'],correct:2,difficulty:3},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'1, 2, 3, 7, 11, 18, 29, ?',opts:['40','43','47','50'],correct:2,difficulty:4},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'2, 1, 3, 4, 7, 11, 18, ?',opts:['25','27','29','31'],correct:2,difficulty:4},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'6, 11, 21, 41, 81, ?',opts:['151','159','161','163'],correct:2,difficulty:4},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'1, 11, 21, 1211, 111221, ?',opts:['211','312211','3122','11121'],correct:1,difficulty:5},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'1, 2, 4, 7, 11, 16, 22, ?',opts:['27','28','29','30'],correct:2,difficulty:3},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'1, 1, 2, 4, 7, 13, 24, ?',opts:['40','42','44','46'],correct:2,difficulty:5},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'2, 6, 18, 54, 162, ?',opts:['324','486','648','972'],correct:1,difficulty:2},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'1, 5, 14, 30, 55, 91, ?',opts:['126','130','140','143'],correct:3,difficulty:5},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'81, 64, 49, 36, 25, ?',opts:['9','12','16','18'],correct:2,difficulty:2},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'3, 7, 13, 21, 31, 43, ?',opts:['55','57','59','61'],correct:1,difficulty:4},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'4, 8, 24, 48, 144, 288, ?',opts:['576','720','864','1024'],correct:2,difficulty:4},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'1, 2, 9, 12, 25, 30, ?',opts:['43','47','49','53'],correct:2,difficulty:5},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'2, 12, 36, 80, 150, ?',opts:['240','252','280','300'],correct:1,difficulty:5},
  {type:'sequence',typeLabel:'수열 추론',q:'다음 수열의 빈 칸에 들어갈 숫자는?',seq:'5, 10, 20, 35, 55, ?',opts:['75','80','85','90'],correct:1,difficulty:3}
];

const matPool=[
  {type:'matrix',typeLabel:'행렬 패턴',q:'3×3 행렬에서 규칙을 찾아 ?에 들어갈 것을 선택하세요.',matrix:[['1','2','3'],['2','4','6'],['3','6','?']],opts:['7','8','9','10'],correct:2,difficulty:2},
  {type:'matrix',typeLabel:'행렬 패턴',q:'3×3 행렬에서 규칙을 찾아 ?에 들어갈 것을 선택하세요.',matrix:[['●','●●','●●●'],['■','■■','■■■'],['▲','▲▲','?']],opts:['▲▲▲','▲▲','●●●','■■'],correct:0,difficulty:2},
  {type:'matrix',typeLabel:'행렬 패턴',q:'3×3 행렬에서 규칙을 찾아 ?에 들어갈 것을 선택하세요.',matrix:[['2','4','8'],['3','9','27'],['4','16','?']],opts:['32','48','64','128'],correct:2,difficulty:3},
  {type:'matrix',typeLabel:'행렬 패턴',q:'3×3 행렬에서 규칙을 찾아 ?에 들어갈 것을 선택하세요.',matrix:[['◆','◇','◆'],['◇','◆','◇'],['◆','◇','?']],opts:['◆','◇','●','■'],correct:0,difficulty:3},
  {type:'matrix',typeLabel:'행렬 패턴',q:'3×3 행렬에서 규칙을 찾아 ?에 들어갈 것을 선택하세요.',matrix:[['A','C','E'],['B','D','F'],['C','E','?']],opts:['F','G','H','I'],correct:1,difficulty:3},
  {type:'matrix',typeLabel:'행렬 패턴',q:'3×3 행렬에서 규칙을 찾아 ?에 들어갈 것을 선택하세요.',matrix:[['Z','Y','X'],['W','V','U'],['T','S','?']],opts:['P','Q','R','S'],correct:2,difficulty:3},
  {type:'matrix',typeLabel:'행렬 패턴',q:'3×3 행렬에서 규칙을 찾아 ?에 들어갈 것을 선택하세요.',matrix:[['9','3','1'],['36','6','1'],['16','4','?']],opts:['1','2','4','8'],correct:0,difficulty:4},
  {type:'matrix',typeLabel:'행렬 패턴',q:'3×3 행렬에서 규칙을 찾아 ?에 들어갈 것을 선택하세요.',matrix:[['2','6','18'],['3','9','27'],['4','12','?']],opts:['24','32','36','48'],correct:2,difficulty:3},
  {type:'matrix',typeLabel:'행렬 패턴',q:'3×3 행렬에서 규칙을 찾아 ?에 들어갈 것을 선택하세요.',matrix:[['△▽△','▽△▽','△▽△'],['▽△▽','△▽△','▽△▽'],['△▽△','▽△▽','?']],opts:['△▽△','▽△▽','△△△','▽▽▽'],correct:0,difficulty:4},
  {type:'matrix',typeLabel:'행렬 패턴',q:'3×3 행렬에서 규칙을 찾아 ?에 들어갈 것을 선택하세요.',matrix:[['1','2','4'],['3','6','12'],['5','10','?']],opts:['15','18','20','25'],correct:2,difficulty:3},
  {type:'matrix',typeLabel:'행렬 패턴',q:'3×3 행렬에서 규칙을 찾아 ?에 들어갈 것을 선택하세요.',matrix:[['○△□','●▲■','○▲□'],['●▲□','○△■','●△□'],['○△■','●▲□','?']],opts:['○▲■','●△■','○△□','●△□'],correct:0,difficulty:5},
  {type:'matrix',typeLabel:'행렬 패턴',q:'3×3 행렬에서 규칙을 찾아 ?에 들어갈 것을 선택하세요.',matrix:[['3','6','9'],['5','10','15'],['7','14','?']],opts:['18','19','21','23'],correct:2,difficulty:2},
  {type:'matrix',typeLabel:'행렬 패턴',q:'3×3 행렬에서 규칙을 찾아 ?에 들어갈 것을 선택하세요.',matrix:[['1','4','16'],['2','6','18'],['3','8','?']],opts:['18','20','24','32'],correct:2,difficulty:4},
  {type:'matrix',typeLabel:'행렬 패턴',q:'3×3 행렬에서 규칙을 찾아 ?에 들어갈 것을 선택하세요.',matrix:[['A','B','D'],['B','D','H'],['D','H','?']],opts:['I','J','P','Q'],correct:2,difficulty:5},
  {type:'matrix',typeLabel:'행렬 패턴',q:'3×3 행렬에서 규칙을 찾아 ?에 들어갈 것을 선택하세요.',matrix:[['●○','○●','●○'],['○●','●○','○●'],['●○','○●','?']],opts:['●○','○●','●●','○○'],correct:0,difficulty:3},
  {type:'matrix',typeLabel:'행렬 패턴',q:'3×3 행렬에서 규칙을 찾아 ?에 들어갈 것을 선택하세요.',matrix:[['2','3','5'],['3','5','8'],['5','8','?']],opts:['10','11','13','15'],correct:2,difficulty:3},
  {type:'matrix',typeLabel:'행렬 패턴',q:'3×3 행렬에서 규칙을 찾아 ?에 들어갈 것을 선택하세요.',matrix:[['64','16','4'],['81','27','9'],['100','50','?']],opts:['10','20','25','50'],correct:2,difficulty:5},
  {type:'matrix',typeLabel:'행렬 패턴',q:'3×3 행렬에서 규칙을 찾아 ?에 들어갈 것을 선택하세요.',matrix:[['J','K','M'],['K','M','P'],['M','P','?']],opts:['R','S','T','U'],correct:2,difficulty:5},
  {type:'matrix',typeLabel:'행렬 패턴',q:'3×3 행렬에서 규칙을 찾아 ?에 들어갈 것을 선택하세요.',matrix:[['4','2','1'],['9','3','1'],['25','5','?']],opts:['0','1','5','25'],correct:1,difficulty:4},
  {type:'matrix',typeLabel:'행렬 패턴',q:'3×3 행렬에서 규칙을 찾아 ?에 들어갈 것을 선택하세요.',matrix:[['1','3','9'],['2','8','32'],['3','15','?']],opts:['45','63','75','81'],correct:1,difficulty:5},
  {type:'matrix',typeLabel:'행렬 패턴',q:'3×3 행렬에서 규칙을 찾아 ?에 들어갈 것을 선택하세요.',matrix:[['1','0','1'],['0','1','0'],['1','0','?']],opts:['0','1','2','3'],correct:1,difficulty:2},
  {type:'matrix',typeLabel:'행렬 패턴',q:'3×3 행렬에서 규칙을 찾아 ?에 들어갈 것을 선택하세요.',matrix:[['◐','◑','◒'],['◑','◒','◓'],['◒','◓','?']],opts:['◐','◑','◒','◔'],correct:3,difficulty:4}
];

const spatPool=[
  {type:'spatial',typeLabel:'공간 추론',q:'주사위에서 마주 보는 면의 합은 항상 7입니다. 1이 보이는 면의 반대쪽 숫자는?',opts:['4','5','6','7'],correct:2,difficulty:2},
  {type:'spatial',typeLabel:'공간 추론',q:'정육면체 전개도가 정육면체가 되는 유형은 총 몇 가지입니까?',opts:['9가지','10가지','11가지','12가지'],correct:2,difficulty:4},
  {type:'spatial',typeLabel:'공간 추론',q:'시계가 3:15를 가리킬 때, 시침과 분침이 이루는 각도(작은 쪽)는?',opts:['0°','7.5°','15°','22.5°'],correct:1,difficulty:4},
  {type:'spatial',typeLabel:'공간 추론',q:'정육각형의 한 꼭짓점에서 그을 수 있는 대각선의 수는?',opts:['2개','3개','4개','5개'],correct:1,difficulty:3},
  {type:'spatial',typeLabel:'공간 추론',q:'4×4 격자에서 직사각형(정사각형 포함)의 총 개수는?',opts:['36','64','100','120'],correct:2,difficulty:5},
  {type:'spatial',typeLabel:'공간 추론',q:'정n각형의 한 내각이 162°일 때, n의 값은?',opts:['18','20','22','24'],correct:1,difficulty:5},
  {type:'spatial',typeLabel:'공간 추론',q:'오각형의 내각의 합은?',opts:['360°','450°','540°','630°'],correct:2,difficulty:3},
  {type:'spatial',typeLabel:'공간 추론',q:'정육면체의 꼭짓점 + 모서리 + 면의 합은?',opts:['24','26','28','30'],correct:1,difficulty:3},
  {type:'spatial',typeLabel:'공간 추론',q:'100개의 점이 원형으로 배열될 때, 대각선의 총 개수는?',opts:['4750','4850','4950','5050'],correct:0,difficulty:5},
  {type:'spatial',typeLabel:'공간 추론',q:'시계가 6시 정각일 때 시침과 분침이 이루는 각도는?',opts:['90°','120°','150°','180°'],correct:3,difficulty:2},
  {type:'spatial',typeLabel:'공간 추론',q:'정이십면체의 꼭짓점 수는?',opts:['8','12','16','20'],correct:1,difficulty:4},
  {type:'spatial',typeLabel:'공간 추론',q:'원뿔을 밑면에 평행하게 자른 단면의 모양은?',opts:['삼각형','직사각형','원','타원'],correct:2,difficulty:2},
  {type:'spatial',typeLabel:'공간 추론',q:'n개의 직선이 서로 다른 최대 교점 수는?',opts:['n-1','n(n-1)','n(n-1)/2','n²'],correct:2,difficulty:4},
  {type:'spatial',typeLabel:'공간 추론',q:'정팔면체의 면의 수는?',opts:['4','6','8','12'],correct:2,difficulty:3},
  {type:'spatial',typeLabel:'공간 추론',q:'한 변의 길이가 a인 정육면체의 대각선 길이는?',opts:['a√2','a√3','2a','a√6'],correct:1,difficulty:4},
  {type:'spatial',typeLabel:'공간 추론',q:'정삼각형을 4개의 합동 정삼각형으로 나눌 때, 각 작은 삼각형의 한 변은 원래의?',opts:['1/2','1/3','1/4','√3/2'],correct:0,difficulty:3}
];

const anaPool=[
  {type:'analogy',typeLabel:'언어 유추',q:'다음 유추를 완성하세요.',analogy:'의사 : 병원 = 선생님 : ?',opts:['학교','도서관','공장','병원'],correct:0,difficulty:2},
  {type:'analogy',typeLabel:'언어 유추',q:'다음 유추를 완성하세요.',analogy:'눈 : 보다 = 귀 : ?',opts:['말하다','냄새 맡다','듣다','걷다'],correct:2,difficulty:1},
  {type:'analogy',typeLabel:'언어 유추',q:'다음 유추를 완성하세요.',analogy:'교향곡 : 지휘자 = 영화 : ?',opts:['배우','각본가','감독','제작자'],correct:2,difficulty:3},
  {type:'analogy',typeLabel:'언어 유추',q:'다음 유추를 완성하세요.',analogy:'단어 : 사전 = 별 : ?',opts:['망원경','행성','성도(星圖)','우주'],correct:2,difficulty:4},
  {type:'analogy',typeLabel:'언어 유추',q:'다음 유추를 완성하세요.',analogy:'물고기 : 아가미 = 사람 : ?',opts:['심장','폐','뇌','간'],correct:1,difficulty:2},
  {type:'analogy',typeLabel:'언어 유추',q:'다음 유추를 완성하세요.',analogy:'봄 : 씨앗 = 가을 : ?',opts:['눈','꽃','수확','바람'],correct:2,difficulty:2},
  {type:'analogy',typeLabel:'언어 유추',q:'다음 유추를 완성하세요.',analogy:'온도계 : 온도 = 기압계 : ?',opts:['습도','기압','풍속','강수량'],correct:1,difficulty:3},
  {type:'analogy',typeLabel:'언어 유추',q:'다음 유추를 완성하세요.',analogy:'소설 : 작가 = 법률 : ?',opts:['검사','변호사','판사','입법자'],correct:3,difficulty:3},
  {type:'analogy',typeLabel:'언어 유추',q:'다음 유추를 완성하세요.',analogy:'진화 : 다윈 = 상대성 이론 : ?',opts:['뉴턴','아인슈타인','보어','하이젠베르크'],correct:1,difficulty:3},
  {type:'analogy',typeLabel:'언어 유추',q:'다음 유추를 완성하세요.',analogy:'빛 : 광자 = 소리 : ?',opts:['전자','음소(음운)','음자(phonon)','파동'],correct:2,difficulty:5},
  {type:'analogy',typeLabel:'언어 유추',q:'다음 유추를 완성하세요.',analogy:'코드 : 프로그래머 = 음표 : ?',opts:['청중','작곡가','지휘자','악기'],correct:1,difficulty:3},
  {type:'analogy',typeLabel:'언어 유추',q:'다음 유추를 완성하세요.',analogy:'귀납 : 특수→일반 = 연역 : ?',opts:['일반→특수','특수→특수','일반→일반','사례→사례'],correct:0,difficulty:4},
  {type:'analogy',typeLabel:'언어 유추',q:'다음 유추를 완성하세요.',analogy:'반도체 : 실리콘 = 뇌 : ?',opts:['산소','시냅스','뉴런','글루코스'],correct:2,difficulty:4},
  {type:'analogy',typeLabel:'언어 유추',q:'다음 유추를 완성하세요.',analogy:'엔트로피 : 열역학 = 불확정성 : ?',opts:['상대성이론','양자역학','고전역학','전자기학'],correct:1,difficulty:5},
  {type:'analogy',typeLabel:'언어 유추',q:'다음 유추를 완성하세요.',analogy:'책 : 도서관 = 작품 : ?',opts:['창고','화랑(갤러리)','극장','공방'],correct:1,difficulty:2},
  {type:'analogy',typeLabel:'언어 유추',q:'다음 유추를 완성하세요.',analogy:'삼각형 내각합 : 180° = 오각형 내각합 : ?',opts:['360°','450°','540°','720°'],correct:2,difficulty:3},
  {type:'analogy',typeLabel:'언어 유추',q:'다음 유추를 완성하세요.',analogy:'심리학 : 행동 = 경제학 : ?',opts:['화폐','자원 배분','금융','무역'],correct:1,difficulty:4},
  {type:'analogy',typeLabel:'언어 유추',q:'다음 유추를 완성하세요.',analogy:'바이러스 : 백신 = 버그 : ?',opts:['컴파일러','디버거','에디터','IDE'],correct:1,difficulty:3}
];

const logPool=[
  {type:'logic',typeLabel:'논리 추론',q:'다음 논리 문제를 풀어보세요.',premise:'모든 A는 B이다. 모든 B는 C이다. 따라서?',opts:['모든 A는 C이다','모든 C는 A이다','일부 A는 C이다','A와 C는 무관하다'],correct:0,difficulty:2},
  {type:'logic',typeLabel:'논리 추론',q:'다음 논리 문제를 풀어보세요.',premise:'비가 오면 길이 젖는다. 길이 젖어 있다. 따라서?',opts:['반드시 비가 왔다','비가 왔을 수도 있다','비가 오지 않았다','판단할 수 없다'],correct:1,difficulty:3},
  {type:'logic',typeLabel:'논리 추론',q:'다음 논리 문제를 풀어보세요.',premise:'"비가 오면 우산을 쓴다"가 참일 때, 반드시 참인 것은?',opts:['우산을 쓰면 비가 온다','비가 안 오면 우산을 안 쓴다','우산을 안 쓰면 비가 오지 않는다','비와 우산은 무관하다'],correct:2,difficulty:4},
  {type:'logic',typeLabel:'논리 추론',q:'다음 논리 문제를 풀어보세요.',premise:'갑·을·병·정이 릴레이 순서를 정한다. 갑은 첫 번째가 아니고, 을은 갑 바로 다음이며, 병은 마지막이 아니다. 병이 두 번째라면 첫 번째는?',opts:['갑','을','병','정'],correct:3,difficulty:4},
  {type:'logic',typeLabel:'논리 추론',q:'다음 논리 문제를 풀어보세요.',premise:'100명 중 70%가 A를 좋아하고, 80%가 B를 좋아한다. A·B 모두 좋아하는 최소 인원은?',opts:['40명','50명','60명','70명'],correct:1,difficulty:4},
  {type:'logic',typeLabel:'논리 추론',q:'다음 논리 문제를 풀어보세요.',premise:'어느 마을 이발사는 "스스로 면도하지 않는 사람만 면도해준다". 이발사 본인은?',opts:['스스로 면도한다','이발사가 면도해준다','이 상황은 논리적 모순이다','면도를 하지 않는다'],correct:2,difficulty:5},
  {type:'logic',typeLabel:'논리 추론',q:'다음 논리 문제를 풀어보세요.',premise:'어떤 도시는 오염되어 있다. 오염된 곳은 건강에 해롭다. 오염되지 않은 도시 X가 있다면?',opts:['X는 건강에 해롭다','알 수 없다','X는 건강에 해롭지 않다','X에는 사람이 살 수 없다'],correct:2,difficulty:3},
  {type:'logic',typeLabel:'논리 추론',q:'다음 논리 문제를 풀어보세요.',premise:'A, B, C 중 한 명만 진실을 말한다. A:"나는 거짓말쟁이다" B:"A는 거짓말쟁이다" C:"나는 진실을 말한다". 누가 진실을 말하는가?',opts:['A','B','C','알 수 없다'],correct:1,difficulty:5},
  {type:'logic',typeLabel:'논리 추론',q:'다음 논리 문제를 풀어보세요.',premise:'저울로 9개의 공 중 무거운 공 1개를 찾으려면 최소 몇 번 필요한가?',opts:['1번','2번','3번','4번'],correct:1,difficulty:4},
  {type:'logic',typeLabel:'논리 추론',q:'다음 논리 문제를 풀어보세요.',premise:'"이 문장은 거짓이다"라는 문장은?',opts:['참이다','거짓이다','참도 거짓도 아닌 역설이다','의미 없는 문장이다'],correct:2,difficulty:4},
  {type:'logic',typeLabel:'논리 추론',q:'다음 논리 문제를 풀어보세요.',premise:'4명이 악수를 할 때, 총 악수 횟수는?',opts:['4번','6번','8번','12번'],correct:1,difficulty:2},
  {type:'logic',typeLabel:'논리 추론',q:'다음 논리 문제를 풀어보세요.',premise:'A, B, C 세 물건의 무게를 비교했다. A는 B보다 무겁고, C는 A보다 가볍고 B보다는 무겁다. 무거운 순서로 나열하면?',opts:['A-B-C','A-C-B','C-A-B','B-A-C'],correct:1,difficulty:3},
  {type:'logic',typeLabel:'논리 추론',q:'다음 논리 문제를 풀어보세요.',premise:'카드 4장 [E, K, 4, 7]: "모음이면 짝수" 규칙 검증 시 뒤집어야 할 카드는?',opts:['E만','E와 4','E와 7','E, 4, 7 모두'],correct:2,difficulty:5},
  {type:'logic',typeLabel:'논리 추론',q:'다음 논리 문제를 풀어보세요.',premise:'6명이 서로 한 번씩 악수하면 총 몇 번인가?',opts:['12번','15번','18번','30번'],correct:1,difficulty:3},
  {type:'logic',typeLabel:'논리 추론',q:'다음 논리 문제를 풀어보세요.',premise:'"모든 의사는 대학 졸업자다. 홍길동은 대학 졸업자다." 이때 반드시 참인 것은?',opts:['홍길동은 의사다','홍길동은 의사가 아닐 수도 있다','홍길동은 반드시 의사다','결론을 내릴 수 없다'],correct:1,difficulty:4},
  {type:'logic',typeLabel:'논리 추론',q:'다음 논리 문제를 풀어보세요.',premise:'"A이면 B이다. B이면 C가 거짓이다." C가 참일 때, A는?',opts:['반드시 참','반드시 거짓','알 수 없다','참일 수도 거짓일 수도 있다'],correct:1,difficulty:5}
];

// ═══════════════════════════════════════════════════════════
// EXTENDED TESTS
// ═══════════════════════════════════════════════════════════
const extendedTests={
  eq:{id:'eq',title:'감성 지수 (EQ)',icon:'💛',color:'#d97706',mean:76,sd:8,
    questions:[
      {q:'친한 친구가 갑자기 울기 시작했습니다. 당신은?',opts:['왜 우는지 바로 묻는다','조용히 곁에 앉아 기다린다','"괜찮아?" 하고 묻는다','자리를 피해준다'],weights:[2,4,3,1]},
      {q:'팀 프로젝트에서 내 의견이 채택되지 않았습니다. 반응은?',opts:['강하게 밀어붙인다','팀 결정을 수용하고 최선을 다한다','불만을 품지만 따른다','다음 기회를 준비한다'],weights:[1,4,2,3]},
      {q:'극심한 스트레스를 받을 때 주로 어떻게 하십니까?',opts:['음식이나 음주로 해소','운동·취미 활동으로 푼다','혼자 삭인다','친한 사람에게 이야기한다'],weights:[1,4,2,3]},
      {q:'상대방이 틀린 말을 할 때 당신은?',opts:['즉시 정정한다','부드럽게 다른 관점을 제시한다','그냥 넘어간다','나중에 따로 이야기한다'],weights:[2,4,1,3]},
      {q:'의견 충돌이 발생했을 때 가장 먼저 하는 것은?',opts:['자신의 입장을 먼저 설명한다','상대 말을 끝까지 듣는다','중재자를 찾는다','잠시 자리를 피한다'],weights:[2,4,3,1]},
      {q:'실수를 했을 때 당신은?',opts:['남의 탓을 먼저 찾는다','솔직하게 인정하고 사과한다','모른 척 넘어간다','과도하게 자책한다'],weights:[1,4,1,2]},
      {q:'다른 사람의 감정을 얼마나 잘 알아챕니까?',opts:['거의 못 알아챈다','직접 말할 때만 안다','표정·말투로 대부분 파악한다','미세한 변화도 감지한다'],weights:[1,2,3,4]},
      {q:'화가 났을 때 당신은?',opts:['즉시 감정을 표출한다','가라앉을 때까지 기다린다','속으로만 삭인다','이유 파악 후 차분히 이야기한다'],weights:[1,2,2,4]},
      {q:'칭찬을 받았을 때 반응은?',opts:['당연하다고 생각한다','감사하며 겸손하게 받아들인다','민망해서 부정한다','더 잘해야겠다고 다짐한다'],weights:[1,4,2,3]},
      {q:'낯선 사람과의 대화에서 당신은?',opts:['주로 자기 이야기를 한다','상대방 이야기에 적극 경청한다','필요한 말만 한다','공통 관심사를 찾으려 노력한다'],weights:[1,4,2,3]}
    ],
    scoreRanges:[
      {min:92,label:'탁월한 EQ',top:3,color:'#4f46e5'},
      {min:85,label:'높은 EQ',top:10,color:'#0284c7'},
      {min:76,label:'평균 상위 EQ',top:25,color:'#059669'},
      {min:67,label:'평균 EQ',top:50,color:'#d97706'},
      {min:0, label:'개선 필요',top:85,color:'#dc2626'}
    ],
    getTips:(score)=>{
      if(score>=88) return['탁월한 공감 능력을 어려운 갈등 상황에서 더 활용해보세요','다른 사람의 감성 성장을 도와주는 멘토 역할을 시도해보세요','복잡한 감정 상황에서의 리더십을 연습해보세요'];
      if(score>=76) return['하루 5분 마음챙김 명상으로 자기 인식을 강화하세요','감정 일기를 작성하여 패턴을 파악해보세요','대화 중 의도적으로 판단을 유보하고 경청을 연습하세요'];
      return['Daniel Goleman의 「감성지능」을 읽어보세요','매일 하루를 마무리하며 감정을 3가지 이상 기록해보세요','공감 훈련 앱이나 그룹 상담 프로그램을 활용해보세요'];
    },
    scoring:(total,max)=>{
      const pct=total/max;
      const score=Math.round(62+pct*38);
      if(pct>=.85) return{cat:'탁월한 감성 지수',desc:'뛰어난 공감 능력과 자기 인식을 보유하고 있습니다. 자연스럽게 관계에서 신뢰를 형성하고 리더십을 발휘합니다.',score};
      if(pct>=.7) return{cat:'높은 감성 지수',desc:'감정을 잘 인식·조절하며 타인과 효과적으로 소통합니다. 대부분의 사회적 상황에서 적절하게 대응합니다.',score};
      if(pct>=.5) return{cat:'평균 감성 지수',desc:'기본적인 공감 능력과 감정 조절 능력을 갖추고 있습니다. 특정 상황에서의 감정 인식을 더 발전시킬 여지가 있습니다.',score};
      return{cat:'개발 중인 감성 지수',desc:'감성 지수는 훈련과 경험으로 향상됩니다. 자기 성찰과 타인 관찰에 더 집중해보세요.',score};
    }
  },
  memory:{id:'memory',title:'작업 기억력',icon:'🧩',color:'#6366f1',mean:74,sd:9,
    questions:[
      {q:'다음 숫자를 역순으로 나열하면? 7, 3, 9, 1, 5',opts:['5,1,9,3,7','5,3,9,1,7','7,3,9,1,5','1,5,9,3,7'],correct:0},
      {q:'200 - 36 - 36 - 36 = ?',opts:['88','92','96','102'],correct:1},
      {q:'"사과-자동차-책-달-강-신발-새" 중 4번째 단어는?',opts:['책','달','강','신발'],correct:1},
      {q:'"가나다라마바사" 앞에서 3번째와 뒤에서 2번째 글자를 합치면?',opts:['다바','다사','라바','라사'],correct:0},
      {q:'49에서 7씩 빼면: 49→42→35→?',opts:['27','28','29','30'],correct:1},
      {q:'2-4-6-8-1-3-5-7 중 짝수 위치(2,4,6,8번째) 숫자의 합은?',opts:['15','16','17','18'],correct:1},
      {q:'"K-A-R-E-N-S"를 역순으로 할 때 3번째 문자는?',opts:['E','N','R','A'],correct:0},
      {q:'1+2+3+…+10 = ?',opts:['45','50','55','60'],correct:2},
      {q:'"ABCDE"에서 C와 E의 위치를 바꾸면?',opts:['ABCED','ABCDE','ABECD','ABDCE'],correct:0},
      {q:'4×4×4 - 3×3×3 = ?',opts:['31','37','47','91'],correct:1}
    ],
    scoreRanges:[
      {min:92,label:'탁월한 기억력',top:3,color:'#4f46e5'},
      {min:84,label:'우수한 기억력',top:10,color:'#0284c7'},
      {min:74,label:'평균 기억력',top:50,color:'#059669'},
      {min:65,label:'개선 가능',top:80,color:'#d97706'},
      {min:0, label:'훈련 필요',top:90,color:'#dc2626'}
    ],
    getTips:(score)=>{
      if(score>=88) return['N-back 훈련으로 작업 기억 용량을 더 확장해보세요','멀티태스킹 과제로 분할 주의력을 강화하세요','기억술(Method of Loci)을 활용하여 장기 기억과 연결해보세요'];
      if(score>=74) return['매일 숫자 역순 반복 연습으로 작업 기억을 강화하세요','Dual N-back 앱(Brain Workshop 등)을 활용해보세요','암기할 내용을 덩어리(청킹) 지어 기억하는 연습을 하세요'];
      return['간단한 기억 게임(숫자 외우기, 단어 목록)부터 시작하세요','충분한 수면이 기억 공고화에 필수적입니다 (7~9시간 권장)','규칙적인 유산소 운동이 해마(기억 담당) 기능을 향상시킵니다'];
    },
    scoring:(correct,total)=>{
      const pct=correct/total;
      const score=Math.round(62+pct*38);
      if(pct>=.9) return{cat:'탁월한 작업 기억력',desc:'최상위 수준의 작업 기억력입니다. 복잡한 정보를 동시에 처리하는 능력이 매우 뛰어납니다.',score};
      if(pct>=.7) return{cat:'우수한 작업 기억력',desc:'평균 이상의 작업 기억력으로, 여러 정보를 동시에 처리하는 데 능숙합니다.',score};
      if(pct>=.5) return{cat:'평균 작업 기억력',desc:'일반적인 수준의 작업 기억력을 갖추고 있습니다.',score};
      return{cat:'개선 가능한 기억력',desc:'기억 훈련 앱이나 숫자 역순 반복 훈련이 도움이 됩니다.',score};
    }
  },
  speed:{id:'speed',title:'정보 처리 속도',icon:'⚡',color:'#059669',mean:77,sd:8,
    questions:[
      {q:'17 × 6 - 22 = ?',opts:['78','80','82','84'],correct:1},
      {q:'12 × 8 + 4 - 16 = ?',opts:['82','84','86','88'],correct:1},
      {q:'다음 중 나머지와 종류가 다른 것은?',opts:['사과','배','망고','당근'],correct:3},
      {q:'"STOP"을 거꾸로 쓰면?',opts:['POTS','TOPS','OPTS','SPOT'],correct:0},
      {q:'15 × 15 - 14 × 14 = ?',opts:['26','28','29','31'],correct:2},
      {q:'알파벳 순서에서 빠진 것: A C E ? I',opts:['F','G','H','D'],correct:1},
      {q:'25% of 200 = ?',opts:['25','40','50','75'],correct:2},
      {q:'1+3+5+7+9 = ?',opts:['23','24','25','26'],correct:2},
      {q:'999 × 9 = ?',opts:['8981','8991','9001','9009'],correct:1},
      {q:'반반 할인 시 원가 40,000원 상품의 최종 가격은?',opts:['10,000원','15,000원','20,000원','25,000원'],correct:2}
    ],
    scoreRanges:[
      {min:92,label:'최고 처리 속도',top:3,color:'#4f46e5'},
      {min:85,label:'빠른 처리 속도',top:10,color:'#0284c7'},
      {min:77,label:'평균 처리 속도',top:50,color:'#059669'},
      {min:68,label:'느린 처리 속도',top:80,color:'#d97706'},
      {min:0, label:'훈련 필요',top:90,color:'#dc2626'}
    ],
    getTips:(score)=>{
      if(score>=88) return['빠른 독서(Speed Reading) 기법으로 정보 처리를 더 가속화하세요','복잡한 수학 암산 연습으로 계산 속도를 강화하세요','반응 시간 훈련 게임(예: reaction time 테스트)을 활용해보세요'];
      if(score>=77) return['스도쿠와 크로스워드 퍼즐로 처리 속도를 높이세요','멘탈 계산 연습 앱(Elevate, Lumosity 등)을 활용해보세요','집중적인 시간 압박 문제 풀이 훈련을 해보세요'];
      return['매일 10분 빠른 암산 연습부터 시작하세요','충분한 수면이 처리 속도에 직접적 영향을 미칩니다','카페인 과다 섭취는 오히려 집중력을 분산시킬 수 있습니다'];
    },
    scoring:(correct,total)=>{
      const pct=correct/total;
      const score=Math.round(62+pct*38);
      if(pct>=.9) return{cat:'탁월한 처리 속도',desc:'정보를 매우 빠르고 정확하게 처리합니다. 상위 5% 수준의 인지 처리 속도입니다.',score};
      if(pct>=.7) return{cat:'빠른 처리 속도',desc:'평균 이상의 빠르고 정확한 정보 처리 능력을 보입니다.',score};
      if(pct>=.5) return{cat:'평균 처리 속도',desc:'일반적인 수준의 정보 처리 속도입니다.',score};
      return{cat:'느린 처리 속도',desc:'연습과 훈련을 통해 처리 속도를 향상시킬 수 있습니다.',score};
    }
  },
  creativity:{id:'creativity',title:'창의성 지수',icon:'🎨',color:'#db2777',mean:73,sd:9,
    questions:[
      {q:'양초·성냥·압정 한 상자가 있다. 양초를 벽에 수직으로 고정하는 가장 영리한 방법은?',opts:['양초에 압정을 직접 꽂아 벽에 고정','성냥불로 양초를 녹여 벽에 붙임','압정 상자를 벽에 고정한 뒤 그 위에 양초를 올림','양초 옆면에 압정을 박음'],correct:2,difficulty:2},
      {q:'농부가 배로 강을 건넌다. 배에는 농부+짐 하나만 탈 수 있다. 짐은 닭·여우·옥수수. 여우는 닭을, 닭은 옥수수를 먹는다. 첫 번째로 건너야 할 것은?',opts:['여우','옥수수','닭','셋 동시에'],correct:2,difficulty:2},
      {q:'다음 세 단어를 하나로 묶는 공통 단어는?  눈 · 발 · 새',opts:['겨울','봄','자국','하늘'],correct:2,difficulty:3},
      {q:'9개의 점이 3×3으로 배열되어 있다. 펜을 떼지 않고 직선 4개로 모든 점을 연결하려면?',opts:['점 내부에서만 선을 그어야 한다','선을 점 배열 밖으로 연장해야 한다','불가능하다','5개의 선이 필요하다'],correct:1,difficulty:3},
      {q:'"부모 2명과 자녀 2명"이 있는데 실제로 총 3명뿐이다. 어떻게 가능한가?',opts:['한 명은 입양아다','할아버지·아버지·아들의 3대 구성이다','한 명은 쌍둥이다','불가능하다'],correct:1,difficulty:3},
      {q:'다음 세 단어를 하나로 묶는 공통 단어는?  시간 · 황금 · 기회',opts:['귀하다','흐른다','잡다','낭비'],correct:2,difficulty:3},
      {q:'사과 10개를 5개의 줄에 각 4개씩 놓으려면 어떻게 배치해야 하는가?',opts:['불가능하다','사과를 반으로 자른다','★ 모양으로 줄이 교차하게 배치한다','원형으로 배치한다'],correct:2,difficulty:4},
      {q:'"토마스는 의사의 아들이지만 아버지는 의사가 아니다." 이 상황이 가능한 경우는?',opts:['토마스가 의사를 거짓말했다','의사가 토마스의 어머니다','토마스는 의사를 모른다','이 문장은 모순이다'],correct:1,difficulty:4},
      {q:'물이 담긴 병에 코르크 마개가 빠져 들어가 있다. 병을 손상시키지 않고 물을 꺼낼 수 있는 방법은?',opts:['병을 깨야 한다','끈으로 마개를 꺼낸다','마개를 병 안으로 완전히 밀어 넣은 뒤 물을 따른다','빨대로 빨아낸다'],correct:2,difficulty:4},
      {q:'"불"을 앞에 붙여도 뒤에 붙여도 자연스러운 한국어 단어가 되는 것은?',opts:['고기','꽃','씨앗','나무'],correct:1,difficulty:5}
    ],
    scoreRanges:[
      {min:90,label:'탁월한 창의성',top:5,color:'#4f46e5'},
      {min:82,label:'높은 창의성',top:15,color:'#0284c7'},
      {min:73,label:'평균 창의성',top:50,color:'#059669'},
      {min:64,label:'개발 중인 창의성',top:80,color:'#d97706'},
      {min:0, label:'훈련 필요',top:90,color:'#dc2626'}
    ],
    getTips:(score)=>{
      if(score>=85) return['SCAMPER 기법을 일상 문제에 적용하여 창의성을 더욱 발전시키세요','서로 다른 두 분야를 연결하는 "비스코포어" 연습을 해보세요','창의적 해결법을 팀과 공유하고 피드백을 받아보세요'];
      if(score>=73) return['매일 "만약에..." 질문을 3개씩 만들어보세요','서로 다른 분야의 책과 강연을 의도적으로 접해보세요','브레인스토밍을 혼자 또는 그룹으로 정기적으로 해보세요'];
      return['창의성 관련 도서(「생각의 탄생」, 「아이디어의 99%」)를 읽어보세요','새로운 취미 활동을 시작하여 뇌에 새로운 자극을 주세요','낙서·그림 그리기 등 비구조적 활동으로 뇌를 자유롭게 해보세요'];
    },
    scoring:(correct,total)=>{
      const pct=correct/total;
      const score=Math.round(62+pct*38);
      if(pct>=.8) return{cat:'탁월한 창의적 사고',desc:'창의적 문제 해결에 대한 깊은 이해를 보유합니다. 혁신적 아이디어 생성에 탁월합니다.',score};
      if(pct>=.6) return{cat:'우수한 창의적 사고',desc:'다양한 관점에서 문제를 바라보는 창의적 사고가 우수합니다.',score};
      if(pct>=.4) return{cat:'평균적 창의성',desc:'기본적인 창의적 사고 능력을 보유하고 있습니다.',score};
      return{cat:'발전 중인 창의성',desc:'창의성은 훈련을 통해 크게 향상될 수 있습니다.',score};
    }
  },
  focus:{id:'focus',title:'집중력 & 주의력',icon:'🎯',color:'#7c3aed',mean:75,sd:8,
    questions:[
      {q:'"baboon bubble bob blab"에서 알파벳 "b"의 개수는?',opts:['6개','7개','8개','9개'],correct:2},
      {q:'100에서 7을 연속 3번 빼면?',opts:['77','79','81','83'],correct:1},
      {q:'"CONCENTRATION"에서 N의 개수는?',opts:['2개','3개','4개','5개'],correct:1},
      {q:'시계 초침이 1분 동안 이동하는 각도는?',opts:['180°','270°','360°','720°'],correct:2},
      {q:'"가나다라마바사아자차카타파하"에서 앞에서 5번째 글자는?',opts:['마','바','사','아'],correct:0},
      {q:'143, 217, 362, 489 중 홀수는 몇 개?',opts:['1개','2개','3개','4개'],correct:2},
      {q:'333 + 444 + 555 = ?',opts:['1222','1332','1333','1342'],correct:1},
      {q:'"IIIlIlIIl"에서 소문자 l(엘)은 몇 개?',opts:['2개','3개','4개','5개'],correct:1},
      {q:'999 - 111 - 222 - 333 = ?',opts:['233','333','443','533'],correct:1},
      {q:'"집중력검사"를 거꾸로 쓰면?',opts:['사검력중집','사검력집중','력중검사집','검사력중집'],correct:0}
    ],
    scoreRanges:[
      {min:92,label:'탁월한 집중력',top:3,color:'#4f46e5'},
      {min:83,label:'높은 집중력',top:10,color:'#0284c7'},
      {min:75,label:'평균 집중력',top:50,color:'#059669'},
      {min:66,label:'낮은 집중력',top:80,color:'#d97706'},
      {min:0, label:'훈련 필요',top:90,color:'#dc2626'}
    ],
    getTips:(score)=>{
      if(score>=88) return['복잡한 멀티태스킹 환경에서도 집중을 유지하는 훈련을 해보세요','집중 상태를 더 오래 유지하기 위해 포모도로 시간을 30→45분으로 늘려보세요','마음챙김 명상으로 메타인지 집중력을 더욱 강화하세요'];
      if(score>=75) return['포모도로 기법(25분 집중 + 5분 휴식)을 일상화하세요','스마트폰 알림을 집중 시간 동안 완전히 차단하세요','규칙적인 수면·운동으로 기본 인지 체력을 키우세요'];
      return['하루 10분 마음챙김 명상으로 주의력의 기반을 닦으세요','집중을 방해하는 환경 요소(소음, 휴대폰)를 제거하세요','집중 지속 시간을 5분부터 점진적으로 늘려가세요'];
    },
    scoring:(correct,total)=>{
      const pct=correct/total;
      const score=Math.round(62+pct*38);
      if(pct>=.9) return{cat:'탁월한 집중력',desc:'매우 높은 주의력과 집중력입니다. 세밀한 변화도 놓치지 않는 예리한 관찰력이 특징입니다.',score};
      if(pct>=.7) return{cat:'우수한 집중력',desc:'평균 이상의 집중력으로 대부분의 과제를 정확하게 처리합니다.',score};
      if(pct>=.5) return{cat:'평균 집중력',desc:'일반적인 수준의 집중력을 갖추고 있습니다.',score};
      return{cat:'개선 가능한 집중력',desc:'마음챙김 훈련과 명상이 집중력 향상에 효과적입니다.',score};
    }
  },
  cog_flex:{id:'cog_flex',title:'인지 유연성',icon:'🔄',color:'#0f766e',mean:73,sd:9,
    questions:[
      {q:'규칙: 홀수이면 +3, 짝수이면 ÷2. 7에 세 번 연속 적용하면?',opts:['6','7','8','9'],correct:2,difficulty:2},
      {q:'빨강→파랑→노랑 순서가 반복될 때, 13번째는?',opts:['빨강','파랑','노랑','초록'],correct:0,difficulty:2},
      {q:'규칙이 바뀐다: 처음 3번은 ×2, 이후부터는 -5. 1→2→4→8→?',opts:['3','4','5','16'],correct:0,difficulty:3},
      {q:'A=1, B=2… Z=26. 이 규칙을 반전하면 A=26, B=25… 새 규칙에서 D의 값은?',opts:['4','21','23','25'],correct:2,difficulty:3},
      {q:'규칙 변경: 3→9→27에서 2→?→?→16. 두 번째 항은?',opts:['4','6','8','10'],correct:0,difficulty:3},
      {q:'변환 규칙: 짝수는 그대로, 홀수는 ×2. 2, 5, 8, 3을 변환한 합은?',opts:['24','26','28','30'],correct:1,difficulty:3},
      {q:'기호 ★●■이 순서대로 반복. 역순(■●★)으로 세면 20번째 기호는?',opts:['★','●','■','△'],correct:1,difficulty:4},
      {q:'[+1, ×2] 규칙이 교대로 반복. 1부터 시작해 5번 연산 결과는?',opts:['9','10','11','12'],correct:2,difficulty:4},
      {q:'1→3→9에서 규칙을 반전 적용하면 9→?',opts:['3','6','27','81'],correct:0,difficulty:3},
      {q:'새 규칙: 홀수 번째 알파벳(A,C,E…)은 +2 이동, 짝수 번째(B,D,F…)는 −1 이동. D를 변환하면?',opts:['B','C','E','F'],correct:1,difficulty:5}
    ],
    scoreRanges:[
      {min:90,label:'탁월한 인지 유연성',top:5,color:'#4f46e5'},
      {min:82,label:'높은 인지 유연성',top:15,color:'#0284c7'},
      {min:73,label:'평균 인지 유연성',top:50,color:'#059669'},
      {min:64,label:'낮은 인지 유연성',top:80,color:'#d97706'},
      {min:0, label:'훈련 필요',top:90,color:'#dc2626'}
    ],
    getTips:(score)=>{
      if(score>=85) return['익숙하지 않은 분야의 전문가와 대화하는 기회를 늘리세요','역할극이나 관점 바꾸기 연습으로 유연성을 더 확장하세요','복잡한 다문화 환경에서의 협업 경험을 늘려보세요'];
      if(score>=73) return['새로운 기술이나 언어 학습으로 뇌에 새로운 경로를 만드세요','익숙하지 않은 경로로 출퇴근하거나 새로운 취미를 시작해보세요','의도적으로 반대 입장에서 주장을 만들어보는 연습을 하세요'];
      return['여행이나 낯선 환경 경험으로 적응력을 키우세요','다양한 장르의 책·영화·음악을 의도적으로 접해보세요','하루 한 가지 일상적 루틴을 의도적으로 바꿔보세요'];
    },
    scoring:(correct,total)=>{
      const pct=correct/total;
      const score=Math.round(62+pct*38);
      if(pct>=.8) return{cat:'탁월한 인지 유연성',desc:'뛰어난 사고 전환 능력입니다. 다양한 상황에 유연하게 적응하며 창의적 문제 해결에 탁월합니다.',score};
      if(pct>=.6) return{cat:'우수한 인지 유연성',desc:'평균 이상의 인지 유연성으로 변화에 잘 적응합니다.',score};
      if(pct>=.4) return{cat:'평균적 인지 유연성',desc:'기본적인 인지 유연성을 갖추고 있습니다.',score};
      return{cat:'발전 중인 인지 유연성',desc:'다양한 관점으로 문제를 바라보는 연습이 도움이 됩니다.',score};
    }
  }
};

// IQ categories
const iqCats=[
  {min:145,label:'천재 수준 (Genius)',color:'#7c3aed',desc:'상위 0.1% 이내. 역사적으로 탁월한 업적을 남긴 수준의 지능입니다.'},
  {min:130,label:'최고 우수 (Very Superior)',color:'#4f46e5',desc:'상위 2% 이내의 매우 뛰어난 지능입니다. 복잡한 개념을 신속하게 파악하고 탁월한 문제 해결 능력을 보입니다.'},
  {min:120,label:'우수 (Superior)',color:'#0284c7',desc:'상위 10% 이내의 높은 지능입니다. 추상적 사고와 복잡한 문제 해결에 뛰어난 능력을 갖추고 있습니다.'},
  {min:110,label:'평균 상위 (High Average)',color:'#0891b2',desc:'평균보다 높은 수준의 지능입니다. 대부분의 지적 과제를 수월하게 처리합니다.'},
  {min:90, label:'평균 (Average)',color:'#059669',desc:'전체 인구의 약 50%가 속하는 일반적인 지능 범위입니다. 일상적인 문제 해결에 충분한 능력을 갖추고 있습니다.'},
  {min:80, label:'평균 하위 (Low Average)',color:'#d97706',desc:'평균보다 약간 낮은 수준입니다. 특정 유형의 과제에서 추가적인 노력이 필요할 수 있습니다.'},
  {min:70, label:'경계선 (Borderline)',color:'#dc2626',desc:'평균보다 낮은 수준으로, 지적 과제에서 지원이 필요할 수 있습니다.'},
  {min:0,  label:'극히 낮음',color:'#7f1d1d',desc:''}
];
