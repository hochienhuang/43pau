export interface Question {
  id: number;
  type: 'single' | 'multiple';
  difficulty: '易' | '中' | '難';
  source: string;
  question: string;
  options: string[];
  correctAnswers: number[]; // 0-based indices
  explanation?: string;
}

export const SINGLE_QUESTIONS: Question[] = [
  {
    id: 1,
    type: 'single',
    difficulty: '中',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊 5012, 5-25',
    question: '如平時不射擊時，制退復進機應多久由三級保養乙次？',
    options: ['每 180 天使其活動一次', '每 240 天使其活動一次', '每 300 天使其活動一次', '每 360 天使其活動一次'],
    correctAnswers: [0],
    explanation: '依手冊規定，平時不射擊時，制退復進機應每 180 天使其活動一次由三級保養實施。'
  },
  {
    id: 2,
    type: 'single',
    difficulty: '中',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 2003, 2-6頁',
    question: '155H之門體型式為何？',
    options: ['梯級連續螺紋式', '梯級間斷螺紋式', '梯級間斷直立式', '梯級間斷不規則式'],
    correctAnswers: [1],
    explanation: '155H 之砲閂門體採用「梯級間斷螺紋式」（Stepped thread），能承受極高之火藥氣體壓力並快速閉鎖。'
  },
  {
    id: 3,
    type: 'single',
    difficulty: '中',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 2003, 2-3頁',
    question: '155H其均力機作用方式為何？',
    options: ['輕開輕閉型', '重開輕閉型', '輕開重閉型', '輕開重閉型'],
    correctAnswers: [1],
    explanation: '155H 均力機（砲閂開啟平衡裝置）為「重開輕閉型」。'
  },
  {
    id: 4,
    type: 'single',
    difficulty: '中',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 2003, 2-6頁',
    question: '發火機之功用為何？',
    options: ['火砲校正', '清潔砲膛', '固定砲門及底火', '擊發底火，引燃拋射藥'],
    correctAnswers: [3],
    explanation: '發火機主要功用為擊發底火，進而引燃砲膛內之拋射發射藥包。'
  },
  {
    id: 5,
    type: 'single',
    difficulty: '中',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 2003, 2-6頁',
    question: '緊塞具之功用為何？',
    options: ['避免砲彈滑落', '用於火砲發射後，阻止火藥氣體後洩之一種裝置', '擊發底火', '引燃藥包'],
    correctAnswers: [1],
    explanation: '緊塞具（Obturator）主要功能為在火砲發射時藉密氣墊膨脹，防止高壓高溫火藥氣體向後洩漏。'
  },
  {
    id: 6,
    type: 'single',
    difficulty: '中',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 5009, 5-8頁',
    question: '火砲實彈射擊後，須連續保養多久？',
    options: ['每隔24小時，連續保養3次', '每隔24小時，連續保養2次', '每隔48小時，連續保養3次', '每隔48小時，連續保養2次'],
    correctAnswers: [0],
    explanation: '實彈射擊後火藥殘渣具強腐蝕性，須每隔24小時保養一次，連續保養3天（3次）。'
  },
  {
    id: 7,
    type: 'single',
    difficulty: '中',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 6013, 6-22頁',
    question: '射擊後多餘藥包之處理方法為何？',
    options: ['攜回彈藥庫儲放', '射擊單位自行保管', '多餘藥包不得攜回，應於原地焚燬', '規劃次日發射使用'],
    correctAnswers: [2],
    explanation: '多餘藥包涉及高度危安且受潮變質風險，不得攜回彈藥庫，應造冊於射擊陣地現地安全焚燬。'
  },
  {
    id: 8,
    type: 'single',
    difficulty: '中',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 6014, 6-25頁',
    question: '黃磷彈應應如何放置儲存？',
    options: ['應橫躺放置', '應豎立放置', '應倒立放置', '以上皆可'],
    correctAnswers: [1],
    explanation: '黃磷（WP）熔點低且易流動偏移重心，儲存時必須「豎立放置」，以防內部黃磷偏心造成射擊失準或自燃。'
  },
  {
    id: 9,
    type: 'single',
    difficulty: '中',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 4003, 4-11頁',
    question: '射向修正口令為何？',
    options: [
      '「方向 XXXX，標定分割 XXXX」',
      '「方向 XXXX，重插標桿」',
      '「方向 XXXX，標定分割 XXXX，重插標桿」',
      '由砲長自行律定'
    ],
    correctAnswers: [2],
    explanation: '射向修正標準口令為：「方向 XXXX，標定分割 XXXX，重插標桿」。'
  },
  {
    id: 10,
    type: 'single',
    difficulty: '中',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 4008, 4-15頁',
    question: 'M114A1牽引式155公厘榴彈砲標定分割為何？',
    options: ['2400', '2600', '2800', '3200'],
    correctAnswers: [0],
    explanation: '155公厘榴彈砲規定之標定分割基準通常為 2400。'
  },
  {
    id: 11,
    type: 'single',
    difficulty: '中',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 4015, 4-20頁',
    question: '何謂遮蔽角？',
    options: [
      '砲口水平面至標桿頂部所成之夾角',
      '砲口水平面至砲遮高低線所成之夾角',
      '週視鏡底緣至砲遮高低線所成之夾角',
      '以上皆非'
    ],
    correctAnswers: [1],
    explanation: '遮蔽角定義：砲口水平面至砲遮高低線（障礙物頂端）所成之垂直夾角。'
  },
  {
    id: 12,
    type: 'single',
    difficulty: '中',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 4037, 4-54頁',
    question: '行直接瞄準射擊時，對固定目標瞄準要領為何？',
    options: ['瞄準中央上方', '瞄準正中央', '瞄準中央下方', '瞄準中央左方或右方'],
    correctAnswers: [2],
    explanation: '直接瞄準射擊固定目標時，瞄準要領為「瞄準中央下方」。'
  },
  {
    id: 13,
    type: 'single',
    difficulty: '中',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 4010, 4-16頁',
    question: '155榴砲其標定分割口令為何？',
    options: [
      '瞄準點-左前(右後)方標桿，標定分割2400，標定',
      '瞄準點-右前方標桿，標定分割2400，標定',
      '瞄準點-左後方標桿，標定分割2400',
      '瞄準點-正前方標桿，標定分割2400，標定'
    ],
    correctAnswers: [0],
    explanation: '標準口令為：「瞄準點-左前(右後)方標桿，標定分割2400，標定」。'
  },
  {
    id: 14,
    type: 'single',
    difficulty: '中',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 3031, 3-50頁',
    question: '火砲校正如無砲體覘視板時，可用何者替代？',
    options: ['可藉由週視鏡代替使用', '可直接目視', '可藉由傳火孔代替使用', '以上皆可'],
    correctAnswers: [2],
    explanation: '無砲體覘視板時，可藉由砲尾底火處之傳火孔實施照準軸線校正。'
  },
  {
    id: 15,
    type: 'single',
    difficulty: '中',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 3033, 3-51頁',
    question: '象限儀之誤差不得大於幾密位？',
    options: ['正負 0.2 密位', '正負 0.4 密位', '正負 0.8 密位', '正負 1 密位'],
    correctAnswers: [1],
    explanation: '象限儀校正公差極限為正負 0.4 密位以內。'
  },
  {
    id: 16,
    type: 'single',
    difficulty: '中',
    source: '105榴砲單砲教練手冊, 2004, 3-68頁',
    question: '105榴砲射擊口令中5段12項中第4段為何？',
    options: ['高低、時間', '批號與裝藥', '方向修正量、方向', '彈種及批號'],
    correctAnswers: [2],
    explanation: '砲兵射擊口令第4段為方向指示：「方向修正量、方向」。'
  },
  {
    id: 17,
    type: 'single',
    difficulty: '中',
    source: '105榴砲單砲教練手冊, 2004, 3-68頁',
    question: '105榴砲射擊口令中5段12項中第5段為何？',
    options: ['射角', '高低', '仰度', '時間'],
    correctAnswers: [0],
    explanation: '射擊口令中第5段通常包含高低指示及最後發射諸元（射角/高低）。'
  },
  {
    id: 18,
    type: 'single',
    difficulty: '中',
    source: '105榴砲單砲教練手冊, 2004, 3-75頁',
    question: '直接瞄準射擊對中國定目標選擇要領何者為是？',
    options: ['上級所賦予之目標', '對我危害最小者', '依砲長決定', '依瞄準手瞄準為主'],
    correctAnswers: [0],
    explanation: '直接瞄準目標選擇首要原則：依上級所賦予之目標或對我危害最大之目標。'
  },
  {
    id: 19,
    type: 'single',
    difficulty: '中',
    source: '105榴砲單砲教練手冊, 2004, 3-68頁',
    question: '直接瞄準射擊裝藥選擇要領為何？',
    options: ['盡可能用最大裝藥', '盡可能用最小裝藥', '依目標性質決定', '依瞄準手瞄準為主'],
    correctAnswers: [0],
    explanation: '直瞄射擊時彈道需平直、初速需高，故以「盡可能用最大裝藥」為原則。'
  },
  {
    id: 20,
    type: 'single',
    difficulty: '中',
    source: '105榴砲單砲教練手冊, 2004, 3-80頁',
    question: '直接瞄準射擊射擊方式有哪些？',
    options: ['單人單鏡', '雙人單鏡', '雙人雙鏡', '以上皆是'],
    correctAnswers: [3],
    explanation: '直瞄射擊可採單人單鏡、雙人單鏡、雙人雙鏡等方式實施操作。'
  },
  {
    id: 21,
    type: 'single',
    difficulty: '中',
    source: '105榴砲單砲教練手冊, 2004, 2-13頁',
    question: '105榴砲砲閂五大部件何者為非？',
    options: ['門體', '開門機', '傳動軸', '十字滑頭'],
    correctAnswers: [3],
    explanation: '105榴砲砲閂五大機構不包含十字滑頭。'
  },
  {
    id: 22,
    type: 'single',
    difficulty: '中',
    source: '105榴砲單砲教練手冊, 2019, 2-36頁',
    question: '105榴砲輪軸及彈子盤換油時機何者為非？',
    options: ['每年半應換油一次', '2M保養', '走行5000哩時', '砲輪涉水後'],
    correctAnswers: [0],
    explanation: '換油時機為2M保養、走行5000哩時或砲輪涉水後。'
  },
  {
    id: 23,
    type: 'single',
    difficulty: '中',
    source: '105榴砲單砲教練手冊, 2038, 2-74頁',
    question: '105榴砲迴轉盤標準為何？',
    options: ['不得超過手輪 1/4', '1/6', '1/8', '1/10 轉'],
    correctAnswers: [2],
    explanation: '空迴盤迴轉間隙標準不得超過手輪之 1/8 轉。'
  },
  {
    id: 24,
    type: 'single',
    difficulty: '中',
    source: '105榴砲單砲教練手冊, 3004, 3-2頁',
    question: '105榴砲火砲前方規定為何？',
    options: [
      '火砲上架後以牽引車車頭前方為前方',
      '下架後則以車頭前方為前方',
      '火砲上架後以火砲砲管為前方',
      '下架後則以車頭後方為前方'
    ],
    correctAnswers: [0],
    explanation: '火砲牽引行軍時，火砲上架後以牽引車車頭前方為前方。'
  },
  {
    id: 25,
    type: 'single',
    difficulty: '中',
    source: '105榴砲單砲教練手冊, 3005, 3-2頁',
    question: '105榴砲班之編成成員何者為非？',
    options: ['發射手', '裝填手', '彈種選定手', '砲車駕駛手'],
    correctAnswers: [3],
    explanation: '砲班編制內為發射手、裝填手、信管手、藥包手等，牽引車駕駛手非砲班直接操砲編制員。'
  },
  {
    id: 26,
    type: 'single',
    difficulty: '中',
    source: '105榴砲單砲教練手冊, 3006, 3-3頁',
    question: '105榴砲班之編成時以何者對準表尺座？',
    options: ['信管測合手', '裝填手', '彈種選定手', '裝藥選定手'],
    correctAnswers: [0],
    explanation: '集合與就位基準通常以信管測合手（或指定之瞄準基準砲手）對準表尺座。'
  },
  {
    id: 27,
    type: 'single',
    difficulty: '中',
    source: '105榴砲單砲教練手冊, 3010, 3-8頁',
    question: '105榴砲人力挽曳時機何者為非？',
    options: ['短距離運動時', '牽引受限制時', '私匿我企圖時', '沒派車單時'],
    correctAnswers: [3],
    explanation: '人力挽曳適用於短距離、陣地機動受限或隱匿企圖時，非因「沒派車單」。'
  },
  {
    id: 28,
    type: 'single',
    difficulty: '中',
    source: '105榴砲單砲教練手冊, 3010, 3-14頁',
    question: '試述 105榴砲人力挽曳時剎車要領為何？',
    options: ['剎車力求齊一', '先剎左邊', '先剎右邊', '無須剎車'],
    correctAnswers: [0],
    explanation: '人力挽曳剎車時兩側必須協調一致，故「剎車力求齊一」。'
  },
  {
    id: 29,
    type: 'single',
    difficulty: '中',
    source: '105榴砲單砲教練手冊, 3019, 3-26頁',
    question: '各種分割之裝定要領為何？',
    options: [
      '先裝本分割，組裝補助分割',
      '先裝補助分割，再裝本分割',
      '由小到大裝定',
      '由左至右裝定'
    ],
    correctAnswers: [0],
    explanation: '各種分割裝定要領：先裝本分割，再裝輔助分割。'
  },
  {
    id: 30,
    type: 'single',
    difficulty: '中',
    source: '105榴砲單砲教練手冊, 3019, 3-26頁',
    question: '如何避免水準氣泡之空迴？',
    options: [
      '由後向前，由右至左',
      '由前向後，由左向右',
      '打動方向機居中',
      '打動高低機居中'
    ],
    correctAnswers: [1],
    explanation: '避免空迴誤差標準要領：「由前向後，由左向右」進行最後微調居中。'
  },
  {
    id: 31,
    type: 'single',
    difficulty: '易',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊-安全規定',
    question: 'M114及M114A1牽引式155榴砲不得使用哪種底火射擊？',
    options: ['M82式底火', 'M83式底火', 'M84式底火', 'M85式底火'],
    correctAnswers: [0],
    explanation: '手冊明定安全規定：M114及M114A1榴砲不得使用 M82 式底火射擊。'
  },
  {
    id: 32,
    type: 'single',
    difficulty: '易',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 1008, 1-5頁',
    question: 'M114及M114A1牽引式155榴砲之膛線為何？',
    options: ['36條等齊右旋', '42條等齊右旋', '48條等齊右旋', '48條等齊左旋'],
    correctAnswers: [2],
    explanation: 'M114A1砲管膛線規格為「48 條等齊右旋」。'
  },
  {
    id: 33,
    type: 'single',
    difficulty: '易',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 1008, 1-6頁',
    question: 'M114及M114A1牽引式155榴砲之輪胎胎壓為何？',
    options: ['40磅', '50磅', '60磅', '70磅'],
    correctAnswers: [1],
    explanation: 'M114/M114A1牽引式155榴砲輪胎胎壓標準值為 50 磅（PSI）。'
  },
  {
    id: 34,
    type: 'single',
    difficulty: '易',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 1008, 1-6頁',
    question: 'M114及M114A1牽引式155榴砲之最大射程為何？',
    options: ['11000公尺', '14600公尺', '15600公尺', '16800公尺'],
    correctAnswers: [1],
    explanation: 'M114/M114A1最大射程為 14,600 公尺。'
  },
  {
    id: 35,
    type: 'single',
    difficulty: '易',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 3005, 3-2頁',
    question: 'M114及M114A1牽引式155榴砲之砲班成員共計幾員？',
    options: ['7員', '9員', '11員', '13員'],
    correctAnswers: [1],
    explanation: '標準砲班編制共計 9 員（砲長、發射手、裝填手、信管手、藥包手、底火手、裝藥手、彈種手、瞄準手）。'
  },
  {
    id: 36,
    type: 'single',
    difficulty: '易',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 3018, 3-28頁',
    question: 'M12A7C式週視鏡其倍率為幾倍？',
    options: ['1倍', '2倍', '3倍', '4倍'],
    correctAnswers: [3],
    explanation: 'M12A7C 式砲兵週視鏡放大倍率為 4 倍。'
  },
  {
    id: 37,
    type: 'single',
    difficulty: '易',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 3020, 3-31頁',
    question: 'M1及M1A1式象限儀其分割可判讀至幾密位？',
    options: ['1/10 密位', '1/20 密位', '2/10 密位', '2/20 密位'],
    correctAnswers: [0],
    explanation: 'M1及M1A1式砲兵象限儀指標游標可精確判讀至 1/10 密位（0.1密位）。'
  },
  {
    id: 38,
    type: 'single',
    difficulty: '易',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 3018, 3-28頁',
    question: 'M12A7C式週視鏡的修正分割極限值為多少？',
    options: ['左右各5密位', '左右各10密位', '左右各20密位', '左右各30密位'],
    correctAnswers: [2],
    explanation: 'M12A7C週視鏡修正分割之極限值為左右各 20 密位。'
  },
  {
    id: 39,
    type: 'single',
    difficulty: '易',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 3024, 3-38頁',
    question: 'M557式信管有哪兩種功能？',
    options: ['瞬發及空炸', '瞬發及延期', '空炸及延期', '瞬發及近發'],
    correctAnswers: [1],
    explanation: 'M557 點火式引信具備「瞬發（SQ）」及「延期（Delay）」兩種作用模式。'
  },
  {
    id: 40,
    type: 'single',
    difficulty: '易',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 3025, 3-40頁',
    question: 'M26信管規之外環分割可裝定幾秒？',
    options: ['25秒', '50秒', '75秒', '100秒'],
    correctAnswers: [2],
    explanation: 'M26 信管測合規外環刻度最大可裝定至 75 秒。'
  },
  {
    id: 41,
    type: 'single',
    difficulty: '易',
    source: '105榴砲單砲教練手冊, 2001, 2-25頁',
    question: '第一砲手火砲保養職責何者為非？',
    options: ['肘形鏡', '表尺座', '高低機', '工具之保養'],
    correctAnswers: [2],
    explanation: '高低機保養職責非第一砲手主要職掌（高低機通常為瞄準手或指定砲手負責）。'
  },
  {
    id: 42,
    type: 'single',
    difficulty: '易',
    source: '105榴砲單砲教練手冊, 2001, 2-25頁',
    question: '射擊後之砲膛應連續擦拭幾天？',
    options: ['1天', '2天', '3天', '5天'],
    correctAnswers: [2],
    explanation: '實彈射擊後砲膛應連續擦拭保養 3 天。'
  },
  {
    id: 43,
    type: 'single',
    difficulty: '易',
    source: '105榴砲單砲教練手冊, 2001, 2-30頁',
    question: '第二、三砲手火砲保養職責掌為何？',
    options: ['砲門及砲身保養', '制退復進機保養', '搖架及撬車保養', '調平架與高低機'],
    correctAnswers: [0],
    explanation: '二、三砲手協力負責砲門、砲閂及砲身之清潔維護保養。'
  },
  {
    id: 44,
    type: 'single',
    difficulty: '易',
    source: '105榴砲單砲教練手冊, 2001, 2-35頁',
    question: '輪胎每行多少哩需左右調換？',
    options: ['4000哩', '5000哩', '6000哩', '8000哩'],
    correctAnswers: [1],
    explanation: '為使輪胎磨耗均勻，火砲行駛每 5,000 哩須實施左右調換。'
  },
  {
    id: 45,
    type: 'single',
    difficulty: '易',
    source: '105榴砲單砲教練手冊, 2001, 2-25頁',
    question: '第五砲手火砲保養職責何者為非？',
    options: ['砲架', '護板', '搖架', '車輪各部分之保養'],
    correctAnswers: [2],
    explanation: '五砲手職責不含搖架精密保養。'
  },
  {
    id: 46,
    type: 'single',
    difficulty: '易',
    source: '105榴砲單砲教練手冊, 2001, 2-30頁',
    question: '砲膛溫度高時不得使用何種擦劑保養火砲？',
    options: ['快乾劑', 'CLP三合一油', '擦膛液', '肥皂水，會使砲體生鏽'],
    correctAnswers: [1],
    explanation: '砲管溫度高時嚴禁使用 CLP 三合一防鏽油，以免受熱變質碳化及揮發冒煙。'
  },
  {
    id: 47,
    type: 'single',
    difficulty: '易',
    source: '105榴砲單砲教練手冊, 2004, 2-48頁',
    question: '105榴砲校正方法何者為非？',
    options: ['校正靶法', '遠方瞄準點法', '方向角基準法', '平面盤法'],
    correctAnswers: [3],
    explanation: '火砲校正方法包含校正靶法、遠方瞄準點法、方向角基準法，無「平面盤法」。'
  },
  {
    id: 48,
    type: 'single',
    difficulty: '易',
    source: '105榴砲單砲教練手冊, 2004, 2-52頁',
    question: '遠方瞄準點法瞄準點選擇多少距離外？',
    options: ['2000公尺', '1300公尺', '1400公尺', '1500公尺'],
    correctAnswers: [3],
    explanation: '遠方瞄準點法為消除視差，規定瞄準點須在 1,500 公尺以外之清晰獨立目標。'
  },
  {
    id: 49,
    type: 'single',
    difficulty: '易',
    source: '105榴砲單砲教練手冊, 2004, 2-74頁',
    question: '105榴砲輪胎胎壓為何？',
    options: ['每平方吋30磅', '每平方吋40磅', '每平方吋50磅', '每平方吋60磅'],
    correctAnswers: [1],
    explanation: '105公厘榴彈砲輪胎規格胎壓為每平方吋 40 磅（PSI）。'
  },
  {
    id: 50,
    type: 'single',
    difficulty: '易',
    source: '105榴砲單砲教練手冊, 2004, 3-27頁',
    question: '象限儀分割可看讀至多少密位？',
    options: ['1/10密位', '1密位', '1/100密位', '1/2密位'],
    correctAnswers: [0],
    explanation: '象限儀刻度可精密判讀至 1/10 密位。'
  },
  {
    id: 51,
    type: 'single',
    difficulty: '難',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 3036, 3-57頁',
    question: '使用遠方瞄準點法實施火砲校正時，其瞄準點選擇要領為何？',
    options: [
      '應選擇獨立、明顯、垂直線狀之固定物較佳，其距離至少應在1000公尺以外',
      '應選擇獨立、明顯、垂直線狀之固定物較佳，其距離至少應在1500公尺以外',
      '應選擇獨立、明顯、垂直線狀之固定物較佳，其距離至少應在2000公尺以外',
      '應選擇獨立、明顯、垂直線狀之固定物較佳，其距離至少應在2500公尺以外'
    ],
    correctAnswers: [1],
    explanation: '遠方瞄準點選擇要領：應選擇獨立、明顯、垂直線狀之固定目標，且距離至少應在 1500 公尺以外。'
  },
  {
    id: 52,
    type: 'single',
    difficulty: '難',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 3034, 3-57~3-55頁',
    question: '實施象限儀箱規校正時，其實施要領何者為非？',
    options: [
      '可使用倒置法及比較法',
      '先使象限儀各部分劃歸零',
      '水準氣泡概略居中即可',
      '使用一具無誤差或誤差小於0.4密位之象限儀'
    ],
    correctAnswers: [2],
    explanation: '校正象限儀時水準氣泡必須「精確居中」，而非「概略居中即可」。'
  },
  {
    id: 53,
    type: 'single',
    difficulty: '難',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 3026, 3-41頁',
    question: 'M27信管規可裝定哪幾類信管？',
    options: ['M501系列', 'M732', 'M514系列', '以上皆可'],
    correctAnswers: [3],
    explanation: 'M27型信管測合規相容適用於 M501系列、M732近發信管及M514系列等多種引信。'
  },
  {
    id: 54,
    type: 'single',
    difficulty: '難',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 2003, 2-6頁',
    question: '155榴砲制退復進機功用為何？',
    options: [
      '用於射擊時完成制退、復進、緩衝等作用',
      '用於射擊中平衡火砲',
      '增加火砲射程',
      '減少爆音及回火'
    ],
    correctAnswers: [0],
    explanation: '制退復進機在火砲擊發瞬間吸收後座能量完成制退，並推動砲身復進與緩衝制動。'
  },
  {
    id: 55,
    type: 'single',
    difficulty: '難',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 2003, 2-7頁',
    question: '155榴砲大架功用何者為非？',
    options: [
      '運動時連結車砲，曳引火砲方向',
      '射擊時穩定火砲',
      '傳導後座力分散於地面',
      '提升射向賦予精度'
    ],
    correctAnswers: [3],
    explanation: '大架主要負責牽引連結、射擊穩定與後座力傳導，不具備主動提升射向精度之功用。'
  },
  {
    id: 56,
    type: 'single',
    difficulty: '難',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 3021, 3-36頁',
    question: '裝定分割之動作要領為何，以減少空迴誤差？',
    options: [
      '裝定分割之動作，必須使指標向數字遞加之方向停止，以減少空迴',
      '裝定分割之動作，必須使指標向數字遞減之方向停止，以減少空迴',
      '不論朝哪個方向轉，都沒有影響',
      '以上皆非'
    ],
    correctAnswers: [0],
    explanation: '消除齒輪空迴游隙要領：必須使齒輪向「數字遞加（增大）」之方向旋轉停止。'
  },
  {
    id: 57,
    type: 'single',
    difficulty: '難',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 3020, 3-33頁',
    question: 'M1象限儀之輔助分割有兩層，分別為何？',
    options: [
      '上層黑色註記為高射界；下層紅色註記為低射界',
      '上層黑色註記為低射界；下層紅色註記為高射界',
      '兩層刻劃均相同',
      '以上皆非'
    ],
    correctAnswers: [1],
    explanation: 'M1象限儀輔助分割中，上層黑色為「低射界」，下層紅色為「高射界」。'
  },
  {
    id: 58,
    type: 'single',
    difficulty: '難',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 3020, 3-33頁',
    question: '象限儀指標與刻劃判讀，上層與下層之高低射界顏色區分何者為真？',
    options: [
      '上層黑色註記為低射界；下層紅色註記為高射界',
      '上層黑色註記為高射界；下層紅色註記為低射界',
      '兩層刻劃均相同',
      '以上皆非'
    ],
    correctAnswers: [0],
    explanation: '上層黑色字樣為低射界（0~800密位），下層紅色字樣為高射界（800~1600密位）。'
  },
  {
    id: 59,
    type: 'single',
    difficulty: '難',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 4009, 4-15頁',
    question: '射向標定如受地形地物限制時，應如何設置標桿？',
    options: [
      '另外找尋適宜陣地',
      '只插近或遠標桿即可',
      '可依陣地大小，予以適當縮短距離，唯遠近標桿必須保持等距',
      '隨機找尋一個目標物作為標桿'
    ],
    correctAnswers: [2],
    explanation: '地形受限時可適度縮短標桿距離，但遠近標桿間仍須保持等距幾何比例以利修正。'
  },
  {
    id: 60,
    type: 'single',
    difficulty: '難',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 6013, 6-22頁',
    question: '多餘藥包焚燒時，其高度及寬度限制為何？',
    options: [
      '高度不超過20公分，寬度不超過15公分',
      '高度不超過15公分，寬度不超過20公分',
      '高度及寬度均不超過30公分',
      '視現地狀況而定，無特別律定'
    ],
    correctAnswers: [1],
    explanation: '現地焚燬多餘發射藥包時，藥堆高度不得超過 15 公分，寬度不得超過 20 公分，避免火焰失控爆燃。'
  },
  {
    id: 61,
    type: 'single',
    difficulty: '難',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 4005, 4-13頁',
    question: '決定射向之測定其口令為何？',
    options: [
      '「第X砲注意-瞄準點方向盤，測反觀分割」',
      '「第X砲注意-瞄準點方向盤，測直觀分割」',
      '「第X砲注意-瞄準點第X砲，測直觀分割」',
      '「第X砲注意-瞄準點第X砲，測反觀分割」'
    ],
    correctAnswers: [1],
    explanation: '手冊規定決定射向標準口令：「第X砲注意-瞄準點方向盤，測直觀分割」。'
  },
  {
    id: 62,
    type: 'single',
    difficulty: '難',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 4005, 4-13頁',
    question: '決定射向時方向盤瞄準火砲鏡頭所測得之分割稱為？',
    options: ['直觀分割', '反觀分割', '標定分割', '修正分割'],
    correctAnswers: [1],
    explanation: '方向盤照準火砲所測之分割為反觀分割；火砲照準方向盤所測之分割為直觀分割。'
  },
  {
    id: 63,
    type: 'single',
    difficulty: '難',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 4005, 4-13頁',
    question: '火砲照準方向盤時，瞄準手所回報之口令為何？',
    options: [
      '「第X砲好，瞄準點方向盤，直觀分割XXXX」',
      '「第X砲好，反觀分割XXXX」',
      '「第X砲好，方向XXXX」',
      '「報告教官，已裝定」'
    ],
    correctAnswers: [0],
    explanation: '火砲瞄準方向盤完畢後，回報直觀分割數值。'
  },
  {
    id: 64,
    type: 'single',
    difficulty: '難',
    source: '105榴砲單砲教練手冊, 3056, 3-88頁',
    question: '105榴砲之距離換算板其分割刻線分為哪些裝藥？',
    options: ['5號裝藥', '6號裝藥', '7號裝藥', '以上皆是'],
    correctAnswers: [3],
    explanation: '105榴砲之距離射表換算板刻線涵蓋常用之5、6、7號發射裝藥。'
  },
  {
    id: 65,
    type: 'single',
    difficulty: '難',
    source: '105榴砲單砲教練手冊, 3045, 3-68頁',
    question: '若要使用特別修正量時，須達於射擊口令中的那一項？',
    options: ['發射砲及發射法', '特別規定', '批號', '彈種'],
    correctAnswers: [1],
    explanation: '在射擊口令架構中，特別修正量係列於「特別規定」項下下達。'
  },
  {
    id: 66,
    type: 'single',
    difficulty: '難',
    source: '105榴砲單砲教練手冊, 3046, 3-70頁',
    question: '105榴砲之射擊操作，何者下達後才裝填砲彈？',
    options: ['高低', '時間', '批號', '仰度(射角)'],
    correctAnswers: [3],
    explanation: '射擊諸元中，下達射角（高低/仰度）口令後，砲班始得執行彈藥裝填推彈入膛動作。'
  },
  {
    id: 67,
    type: 'single',
    difficulty: '難',
    source: '105榴砲單砲教練手冊, 3047, 3-72頁',
    question: '105榴砲若遇不發火時，須每隔幾秒連續拉火幾次？',
    options: [
      '每隔2秒鐘連續拉火兩次',
      '每隔3秒鐘連續拉火兩次',
      '每隔4秒鐘連續拉火兩次',
      '每隔5秒鐘連續拉火兩次'
    ],
    correctAnswers: [1],
    explanation: '不發火標準處置：不待命令「每隔 3 秒鐘連續拉火兩次」。'
  },
  {
    id: 68,
    type: 'single',
    difficulty: '難',
    source: '105榴砲單砲教練手冊, 3053, 3-81頁',
    question: '105榴砲直接瞄準射擊雙人雙鏡瞄準時由何人負責拉火？',
    options: ['一砲手', '四砲手', '三砲手', '二砲手'],
    correctAnswers: [0],
    explanation: '雙人雙鏡直瞄射擊時，由一砲手（發射手）負責執行拉火擊發。'
  },
  {
    id: 69,
    type: 'single',
    difficulty: '難',
    source: '105榴砲單砲教練手冊, 3056, 3-88頁',
    question: '105榴砲肘形鏡內之距離刻劃適用於幾號裝藥？',
    options: ['四號裝藥', '五號裝藥', '六號裝藥', '七號裝藥'],
    correctAnswers: [3],
    explanation: '肘形鏡直接瞄準分劃通常以全裝藥（七號裝藥）彈道曲線為基準。'
  },
  {
    id: 70,
    type: 'single',
    difficulty: '難',
    source: '105榴砲單砲教練手冊, 2003, 2-2頁',
    question: 'M101A1式105榴砲方向手輪每轉為幾密位(螺旋式)？',
    options: ['17', '18', '19', '20'],
    correctAnswers: [0],
    explanation: '手冊記載方向手輪每轉約為 17 密位。'
  },
  {
    id: 71,
    type: 'single',
    difficulty: '難',
    source: '105榴砲單砲教練手冊, 2003, 2-2頁',
    question: 'M101A1式105榴砲高低手輪每轉為幾密位？',
    options: ['7', '8', '9', '10 密位'],
    correctAnswers: [3],
    explanation: '高低機手輪每轉帶動砲身仰俯角約為 10 密位。'
  },
  {
    id: 72,
    type: 'single',
    difficulty: '難',
    source: '105榴砲單砲教練手冊, 附件1-1頁',
    question: '105榴砲使用何種形式彈藥？',
    options: ['固定式', '半固定式', '分裝藥', '藥片式'],
    correctAnswers: [1],
    explanation: '105榴砲彈藥採用「半固定式」（Semi-fixed），彈頭與藥筒可分離增減藥包。'
  },
  {
    id: 73,
    type: 'single',
    difficulty: '難',
    source: '105榴砲單砲教練手冊, 2003, 2-8頁',
    question: '105榴砲正常射速為每分鐘幾發？',
    options: ['每分鐘 2-4 發', '每分鐘 2-3 發', '每分鐘 2-6 發', '每分鐘 2-8 發'],
    correctAnswers: [0],
    explanation: '105公厘榴彈砲之正常（持續）射速為每分鐘 2 ~ 4 發。'
  }
];

export const MULTIPLE_QUESTIONS: Question[] = [
  {
    id: 1,
    type: 'multiple',
    difficulty: '中',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 3032, 3-51頁',
    question: '射控器材校正前之準備事項為何？',
    options: [
      '將火砲停放於堅硬水平之地面，傾斜不得超過90密位，必要時應使用鋼墊板',
      '檢查表尺座、週視鏡及鏡座是否鬆動或其他明顯之缺點',
      '塗黃油避免生鏽',
      '將視鏡誤差防護片裝於週視鏡之接目鏡內'
    ],
    correctAnswers: [0, 1, 3],
    explanation: '射控校正前準備要項包含停放水平堅硬地面（傾斜<90密位）、檢查座身有無鬆動、安裝接目鏡防護片；不包含塗黃油妨礙光學瞄準。'
  },
  {
    id: 2,
    type: 'multiple',
    difficulty: '中',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 3036, 3-57頁',
    question: '方向盤校正時機為何？',
    options: [
      '每月配合預防保養時機',
      '應急校正及夜間校正時',
      '因天候影響或受地形限制，其他方法無法實施時',
      '對砲身無法水平之火砲校正時'
    ],
    correctAnswers: [1, 2, 3],
    explanation: '方向盤校正適用於應急校正、夜間校正、受天候地形限制及砲身無法完全水平之環境。'
  },
  {
    id: 3,
    type: 'multiple',
    difficulty: '中',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 6008, 6-15頁',
    question: '155榴砲 M3A1 拋射藥有哪些藥包，其顏色為何？',
    options: [
      '2個基本裝藥及3個增量藥包，共有5號裝藥',
      '1個基本裝藥及4個增量藥包，共有5號裝藥',
      '裝藥為綠色',
      '裝藥為白色'
    ],
    correctAnswers: [1, 2],
    explanation: 'M3A1 拋射藥為綠包（綠色裝藥），由 1 個基本裝藥及 4 個增量藥包組成（1~5號裝藥）。'
  },
  {
    id: 4,
    type: 'multiple',
    difficulty: '中',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 6008, 6-16頁',
    question: '155榴砲 M4A2 拋射藥有哪些藥包，其顏色為何？',
    options: [
      '1個基本裝藥及4個增量藥包，由3~7號裝藥組成',
      '1個基本裝藥及4個增量藥包，由1~5號裝藥組成',
      '裝藥為綠色',
      '裝藥為白色'
    ],
    correctAnswers: [0, 3],
    explanation: 'M4A2 為白包（白色裝藥），由 1 個基本裝藥及 4 個增量裝藥組成（對應3至7號裝藥）。'
  },
  {
    id: 5,
    type: 'multiple',
    difficulty: '中',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 2003, 2-5頁',
    question: '砲管功用為何？',
    options: [
      '承裝砲彈',
      '負荷拋射藥燃燒之氣體壓力，發射彈丸',
      '以膛線復與彈丸旋轉力',
      '減少後座'
    ],
    correctAnswers: [0, 1, 2],
    explanation: '砲管負責容納彈藥、承受膛壓導引彈丸加速並藉膛線賦予旋轉以穩定彈道；減少後座係由制退機負責。'
  },
  {
    id: 6,
    type: 'multiple',
    difficulty: '中',
    source: '105榴砲單砲教練手冊, 2038, 2-72頁',
    question: '105榴砲針對發火機檢查要領有哪些？',
    options: [
      '擊針插銷是否定位',
      '用拉火桿檢查發火機之性能',
      '卸下發火機檢查清潔及潤滑情形',
      '擊針是否過短'
    ],
    correctAnswers: [1, 2],
    explanation: '發火機檢查要領：用拉火桿檢查發火動作性能、卸下檢查擊針機件清潔與潤滑。'
  },
  {
    id: 7,
    type: 'multiple',
    difficulty: '中',
    source: '105榴砲單砲教練手冊, 3010, 3-8頁',
    question: '105榴砲推砲向前之口令為何？',
    options: ['推砲向前', '走', '立定', '停'],
    correctAnswers: [0, 1],
    explanation: '推砲移動之標準操砲口令組合為「推砲向前」及「走」。'
  },
  {
    id: 8,
    type: 'multiple',
    difficulty: '中',
    source: '105榴砲單砲教練手冊, 3013, 3-18頁',
    question: '105榴砲在火砲運動前三砲手檢查項目為何？',
    options: ['牽引桿固定鎖', '大架連接鎖', '洗把桿', '標桿'],
    correctAnswers: [0, 1],
    explanation: '運動前三砲手須逐項檢查行軍緊固機構：包含牽引桿固定鎖與大架連接鎖是否扣緊確實。'
  },
  {
    id: 9,
    type: 'multiple',
    difficulty: '中',
    source: '105榴砲單砲教練手冊, 3020, 3-27頁',
    question: 'M1象限儀主要構件為何？',
    options: ['本體弧架', '水準氣泡器', '指標', '齒弧'],
    correctAnswers: [0, 1, 2, 3],
    explanation: 'M1象限儀本體包含主弧架、水準氣泡管、游標指標與精密微調齒弧。'
  },
  {
    id: 10,
    type: 'multiple',
    difficulty: '中',
    source: '105榴砲單砲教練手冊, 3022, 3-29頁',
    question: '象限儀使用前應檢查哪些要項？',
    options: [
      '水準氣泡管是否破裂或漏液',
      '指標與游標是否平滑歸零',
      '底座有無油污或砂石損傷',
      '射角螺栓是否脫落'
    ],
    correctAnswers: [0, 1, 2],
    explanation: '象限儀使用前需檢查氣泡完整度、刻劃滑動流暢度及精研底座之平整清潔度。'
  },
  {
    id: 11,
    type: 'multiple',
    difficulty: '易',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊-砲操',
    question: '155榴砲班之編成中，下列哪些砲手職稱與任務配對正確？',
    options: [
      '第一兵：發射手',
      '第二兵：裝填手兼彈體裝填手',
      '第三兵：信管測合手',
      '第四兵：底火兼彈體裝填手'
    ],
    correctAnswers: [0, 1, 2],
    explanation: '第四兵為藥包裝填兼彈體搬運手，第五兵才是底火兼彈體裝填手。'
  },
  {
    id: 12,
    type: 'multiple',
    difficulty: '易',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊-砲操',
    question: '155榴砲班之編成中，下列哪些配對正確？',
    options: [
      '第五兵：底火兼彈體裝填手',
      '第六兵：裝藥選定兼標桿設置手',
      '第七兵：彈種選定兼彈體搬運手',
      '末名兵：為本砲副砲長兼瞄準手'
    ],
    correctAnswers: [0, 1, 2, 3],
    explanation: '五、六、七兵及末名兵之配對完全符合手冊編制規範。'
  },
  {
    id: 13,
    type: 'multiple',
    difficulty: '易',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊-射擊任務',
    question: '射擊任務下達時，下列覆誦者配對何者正確？',
    options: [
      '榴彈：七砲手覆誦',
      '批號：四砲手覆誦',
      '藥包、裝藥：六砲手覆誦',
      '時間：瞄準手覆誦'
    ],
    correctAnswers: [0, 1, 2],
    explanation: '時間係由「三砲手（信管測合手）」覆誦，非瞄準手。'
  },
  {
    id: 14,
    type: 'multiple',
    difficulty: '易',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊-射擊任務',
    question: '射擊任務下達時，由瞄準手負責覆誦之項目為何？',
    options: ['方向', '射角', '批號', '發數'],
    correctAnswers: [0, 1],
    explanation: '瞄準手主要負責方向與射角之諸元覆誦並裝定火砲。'
  },
  {
    id: 15,
    type: 'multiple',
    difficulty: '易',
    source: '155公厘牽引砲實彈射擊故障排除',
    question: '實彈射擊發生不發火時，下列靜待時間規範何者正確？',
    options: [
      '未聞底火發火：等待 2 分鐘後再實施檢查',
      '未聞底火發火：等待 10 分鐘後再實施檢查',
      '已聞底火發火或無法判定：等待 10 分鐘後再實施檢查',
      '已聞底火發火：等待 30 分鐘後再實施檢查'
    ],
    correctAnswers: [0, 2],
    explanation: '手冊明確規定：未聞底火發火靜待 2 分鐘；已聞底火發火或無法判定時靜待 10 分鐘。'
  },
  {
    id: 16,
    type: 'multiple',
    difficulty: '易',
    source: '155公厘牽引砲實彈射擊故障排除',
    question: '不發火狀況處置時，下列安全規定何者正確？',
    options: [
      '發射藥未排除前，不得打動砲管',
      '人員均不得位於砲身軸線前後方',
      '檢查底火過程中，紅色封蠟端不得對人',
      '可立即打開砲門取出發射藥檢視'
    ],
    correctAnswers: [0, 1, 2],
    explanation: '未達靜待時間絕不可開啟砲門；發射藥未排除前嚴禁動砲管與位於砲身前後軸線上。'
  },
  {
    id: 17,
    type: 'multiple',
    difficulty: '易',
    source: '155公厘牽引砲器材操作口令',
    question: '信管規裝定之彈體檢查項目包含哪些？',
    options: [
      '檢查信管頭是否凹損，結合是否確實',
      '檢查鋁箔封口是否破裂',
      '檢查彈體是否鏽蝕砂眼，檢查彈帶是否斷裂變形',
      '檢查信管規指標是否歸於S'
    ],
    correctAnswers: [0, 1, 2, 3],
    explanation: '口令中彈體檢查完整包含：凹損/確實、鋁箔封口、彈體鏽蝕砂眼、彈帶變形及指標歸S。'
  },
  {
    id: 18,
    type: 'multiple',
    difficulty: '易',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊',
    question: '關於退彈作業之安全規範，下列何者正確？',
    options: [
      '退出的彈藥，不得再射擊，應於彈體及發射藥上註明原因，繳回彈藥庫檢整',
      '檢查退彈器必須確實抵緊彈體，不得以退彈器撞擊彈體',
      '點火鏈未排除前，應保持火砲對向目標，所有人員均避開砲口與砲後路徑',
      '退彈時可由發射手自行下達口令推進'
    ],
    correctAnswers: [0, 1, 2],
    explanation: '退彈必須由砲長統一下達口令，且退出之彈藥不可再射擊。'
  },
  {
    id: 19,
    type: 'multiple',
    difficulty: '易',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊-砲操',
    question: '關於一砲手在砲操與收砲中的器材配賦，下列何者正確？',
    options: ['絞刀', '油壺', '清潔鑽、擦砲布', '拉火繩'],
    correctAnswers: [0, 1, 2, 3],
    explanation: '一砲手負責取出絞刀、油壺、清潔鑽、擦砲布及拉火繩置於右大架上。'
  },
  {
    id: 20,
    type: 'multiple',
    difficulty: '易',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊-砲操',
    question: '二砲手與六砲手在砲操中協力操作的項目為何？',
    options: [
      '協力結合兩截推彈桿',
      '協力結合推彈器',
      '協力抱推彈架',
      '協力取砲口塞'
    ],
    correctAnswers: [0, 1],
    explanation: '二砲手與六砲手在左大架外側協力結合兩截推彈桿與推彈器。'
  },
  {
    id: 21,
    type: 'multiple',
    difficulty: '難',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊-故障排除',
    question: '門鎖距離過大或底火燒穿時，檢修處置步驟為何？',
    options: [
      '使用樣板檢測門鎖距離，樣板抵住軸頭，肩部應距離發火機座 1/8 至 1/16 吋',
      '調整發火機座',
      '調整緊塞具軸頭',
      '直接更換整組砲管'
    ],
    correctAnswers: [0, 1, 2],
    explanation: '依手冊故障排除程序：使用樣板檢測肩部距離（1/8至1/16吋）、調整發火機座或緊塞具軸頭。'
  },
  {
    id: 22,
    type: 'multiple',
    difficulty: '難',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊-故障排除',
    question: '梯級間斷螺紋閉室塊蝕碳跡（氣體後洩）可能之原因與排除方法為何？',
    options: [
      '密氣墊損壞，更換密氣墊',
      '裂環起毛刺或斷裂，更換裂環',
      '膛線磨耗過大，報廢火砲',
      '底火過短'
    ],
    correctAnswers: [0, 1],
    explanation: '氣體後洩主因為密氣墊受損或裂環磨損斷裂，排除方法為更換密氣墊或更換裂環。'
  },
  {
    id: 23,
    type: 'multiple',
    difficulty: '難',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊-故障排除',
    question: '實彈射擊不發火後，檢視底火已擊發（紅色封蠟已炸開）之檢查程序包含？',
    options: [
      '取裝水水桶置於砲尾環後方',
      '檢查發射藥是否有燒痕，若有儘速丟入水桶',
      '檢查發射藥紅色點火墊是否朝後',
      '檢查發射藥裝填位置是否與砲管末端距離3吋(7.62公分)'
    ],
    correctAnswers: [0, 1, 2, 3],
    explanation: '手冊規定底火已擊發檢查要項：水桶就位、檢視燒痕、點火墊朝後、確認距砲管末端 3 吋。'
  },
  {
    id: 24,
    type: 'multiple',
    difficulty: '難',
    source: '155公厘牽引砲器材操作口令',
    question: '標桿餘裕修正之操作口令要領包含哪些？',
    options: [
      '打動方向機瞄準遠標桿',
      '轉動輔助分割轉盤瞄準近標桿',
      '裝定原先分割XXXX，居中水平氣泡',
      '指揮標桿手重插標桿'
    ],
    correctAnswers: [0, 1, 2, 3],
    explanation: '標桿餘裕修正標準步驟完整涵蓋上述四項協同操作。'
  },
  {
    id: 25,
    type: 'multiple',
    difficulty: '難',
    source: 'M114A1牽引式155公厘榴彈砲操作手冊, 4018, 4-33頁',
    question: '155榴砲其射擊口令包含以下幾項？',
    options: ['隨口令操作砲', '方向', '彈種', '射角'],
    correctAnswers: [1, 2, 3],
    explanation: '射擊諸元口令核心三要素包含方向、彈種及射角。'
  },
  {
    id: 26,
    type: 'multiple',
    difficulty: '難',
    source: '105榴砲單砲教練手冊, 附件1-1頁',
    question: '一發完整105榴砲砲彈包含哪些部分？',
    options: ['底火', '藥筒', '發射藥', '彈丸'],
    correctAnswers: [0, 1, 2, 3],
    explanation: '半固定式砲彈由底火、金屬藥筒、拋射發射藥包及彈丸四部分組成。'
  },
  {
    id: 27,
    type: 'multiple',
    difficulty: '難',
    source: '105榴砲單砲教練手冊, 附件1-2頁',
    question: '105榴砲發射藥由多少藥包組合而成？',
    options: ['普通藥包', '強裝藥', '分裝藥包', '七號裝藥'],
    correctAnswers: [2, 3],
    explanation: '105發射裝藥包含 1 至 7 號藥包（可依射程增減的分裝藥包組合）。'
  },
  {
    id: 28,
    type: 'multiple',
    difficulty: '難',
    source: '105榴砲單砲教練手冊, 附錄3-32頁',
    question: '信管工具有哪些？',
    options: ['M18信管板手', '信管規', 'M26信管規', 'M27信管板手'],
    correctAnswers: [0, 1, 2],
    explanation: '常用信管工具包含 M18信管板手、M26/M27信管規等。'
  },
  {
    id: 29,
    type: 'multiple',
    difficulty: '難',
    source: '105榴砲單砲教練手冊, 2011, 2-5頁',
    question: '制退復進機組成為何？',
    options: ['搖車', '制退管', '復進管', '以上皆非'],
    correctAnswers: [1, 2],
    explanation: '制退復進機主體為制退缸（管）與復進缸（管）液壓氣動機構。'
  },
  {
    id: 30,
    type: 'multiple',
    difficulty: '難',
    source: '105榴砲單砲教練手冊, 3045, 3-68頁',
    question: '下列哪些為射擊口令中5段12項之內容？',
    options: ['隨口令發射砲', '特別規定', '第X砲', '射角'],
    correctAnswers: [0, 1, 2, 3],
    explanation: '砲兵射擊口令5段12項完整包含第X砲（發射砲）、隨口令發射砲（發射法）、特別規定與射角。'
  }
];
