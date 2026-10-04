export interface Question {
  id: number;
  type: 'single' | 'multiple';
  difficulty: '易' | '中' | '難';
  source: string;
  question: string;
  options: string[];
  correctAnswers: number[];
  explanation?: string;
}

export const SINGLE_QUESTIONS: Question[] = [
  {
    "id": 1,
    "type": "single",
    "difficulty": "中",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 5012, 5-25頁",
    "question": "如平時不射擊時，制退復進機應多久由三級保養乙次？",
    "options": [
      "每180天使其活動一次",
      "每240天使其活動一次",
      "每300天使其活動一次",
      "每360天使其活動一次"
    ],
    "correctAnswers": [
      0
    ],
    "explanation": "原卷答案標記 ●(1)：每180天使其活動一次。"
  },
  {
    "id": 2,
    "type": "single",
    "difficulty": "中",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 2003, 2-6頁",
    "question": "155H之門體型式為何？",
    "options": [
      "梯級連接螺紋式",
      "梯級間斷螺紋式",
      "梯級間斷直立式",
      "梯級間斷不規則式"
    ],
    "correctAnswers": [
      1
    ],
    "explanation": "原卷答案標記 ●(2)：梯級間斷螺紋式。"
  },
  {
    "id": 3,
    "type": "single",
    "difficulty": "中",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 2003, 2-3頁",
    "question": "155H其均力機作用方式為何？",
    "options": [
      "輕開輕關型",
      "重開輕關型",
      "輕開重關型",
      "輕開重關型"
    ],
    "correctAnswers": [
      1
    ],
    "explanation": "原卷答案標記 ●(2)：重開輕關型。"
  },
  {
    "id": 4,
    "type": "single",
    "difficulty": "中",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 2003, 2-6頁",
    "question": "發火機之功用為何？",
    "options": [
      "火砲校正",
      "清潔砲膛",
      "固定砲門及底火",
      "擊發底火，引燃拋射藥"
    ],
    "correctAnswers": [
      3
    ],
    "explanation": "原卷答案標記 ●(4)：擊發底火，引燃拋射藥。"
  },
  {
    "id": 5,
    "type": "single",
    "difficulty": "中",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 2003, 2-6頁",
    "question": "緊塞具之功用為何？",
    "options": [
      "避免砲彈滑落",
      "用於火砲發射後，阻止火藥氣體後洩之一種裝置",
      "擊發底火",
      "引燃藥包"
    ],
    "correctAnswers": [
      1
    ],
    "explanation": "原卷答案標記 ●(2)：用於火砲發射後，阻止火藥氣體後洩之一種裝置。"
  },
  {
    "id": 6,
    "type": "single",
    "difficulty": "中",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 5009, 5-8頁",
    "question": "火砲實彈射擊後，須連續保養多久？",
    "options": [
      "每隔24小時，連續保養3次",
      "每隔24小時，連續保養2次",
      "每隔48小時，連續保養3次",
      "每隔48小時，連續保養2次"
    ],
    "correctAnswers": [
      0
    ],
    "explanation": "原卷答案標記 ●(1)：每隔24小時，連續保養3次。"
  },
  {
    "id": 7,
    "type": "single",
    "difficulty": "中",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 6013, 6-22頁",
    "question": "射擊後多餘藥包之處理方法為何？",
    "options": [
      "攜回彈藥庫儲放",
      "射擊單位自行保管",
      "多餘藥包不得攜回，應於原地焚燬",
      "規劃次回射擊使用"
    ],
    "correctAnswers": [
      2
    ],
    "explanation": "原卷答案標記 ●(3)：多餘藥包不得攜回，應於原地焚燬。"
  },
  {
    "id": 8,
    "type": "single",
    "difficulty": "中",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 6014, 6-25頁",
    "question": "黃磷彈應應如何放置儲存？",
    "options": [
      "應橫躺放置",
      "應豎立放置",
      "應倒立放置",
      "以上皆可"
    ],
    "correctAnswers": [
      1
    ],
    "explanation": "原卷答案標記 ●(2)：應豎立放置。"
  },
  {
    "id": 9,
    "type": "single",
    "difficulty": "中",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 4003, 4-11頁",
    "question": "射向修正口令為何？",
    "options": [
      "「方向 XXXX，標定分劃 XXXX」",
      "「方向 XXXX，重插標桿」",
      "「方向 XXXX，標定分劃 XXXX，重插標桿」",
      "由砲長自行律定"
    ],
    "correctAnswers": [
      2
    ],
    "explanation": "原卷答案標記 ●(3)：「方向 XXXX，標定分劃 XXXX，重插標桿」。"
  },
  {
    "id": 10,
    "type": "single",
    "difficulty": "中",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 4008, 4-15頁",
    "question": "M114A1牽引式155公厘榴彈砲標定分劃為何？",
    "options": [
      "2400",
      "2600",
      "2800",
      "3200"
    ],
    "correctAnswers": [
      0
    ],
    "explanation": "原卷答案標記 ●(1)：2400。"
  },
  {
    "id": 11,
    "type": "single",
    "difficulty": "中",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 4015, 4-20頁",
    "question": "何謂遮蔽角？",
    "options": [
      "砲口水平面至標桿頂部所成之夾角",
      "砲口水平面至砲遮高低線所成之夾角",
      "週視鏡底緣至砲遮高低線所成之夾角",
      "以上皆非"
    ],
    "correctAnswers": [
      1
    ],
    "explanation": "原卷答案標記 ●(2)：砲口水平面至砲遮高低線所成之夾角。"
  },
  {
    "id": 12,
    "type": "single",
    "difficulty": "中",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 4037, 4-54頁",
    "question": "行直接瞄準射擊時，對固定目標瞄準要領為何？",
    "options": [
      "瞄準中央上方",
      "瞄準正中央",
      "瞄準中央下方",
      "瞄準中央左方或右方"
    ],
    "correctAnswers": [
      2
    ],
    "explanation": "原卷答案標記 ●(3)：瞄準中央下方。"
  },
  {
    "id": 13,
    "type": "single",
    "difficulty": "中",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 4010, 4-16頁",
    "question": "155榴砲其標定分劃口令為何？",
    "options": [
      "瞄準點-左前(右後)方標桿，標定分劃2400，標定",
      "瞄準點-右前方標桿，標定分劃2400，標定",
      "瞄準點-左後方標桿，標定分劃2400",
      "瞄準點-正前方標桿，標定分劃2400，標定"
    ],
    "correctAnswers": [
      0
    ],
    "explanation": "原卷答案標記 ●(1)：瞄準點-左前(右後)方標桿，標定分劃2400，標定。"
  },
  {
    "id": 14,
    "type": "single",
    "difficulty": "中",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 3031, 3-50頁",
    "question": "火砲校正如無砲體覘視板時，可用何者替代？",
    "options": [
      "可藉由週視鏡代替使用",
      "可直接目視",
      "可藉由傳火孔代替使用",
      "以上皆可"
    ],
    "correctAnswers": [
      2
    ],
    "explanation": "原卷答案標記 ●(3)：可藉由傳火孔代替使用。"
  },
  {
    "id": 15,
    "type": "single",
    "difficulty": "中",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 3033, 3-51頁",
    "question": "象限儀之誤差不得大於幾密位？",
    "options": [
      "正負 0.2 密位",
      "正負 0.4 密位",
      "正負 0.8 密位",
      "正負 1 密位"
    ],
    "correctAnswers": [
      1
    ],
    "explanation": "原卷答案標記 ●(2)：正負 0.4 密位。"
  },
  {
    "id": 16,
    "type": "single",
    "difficulty": "中",
    "source": "105榴砲單砲教練手冊, 2004, 3-68頁",
    "question": "105榴砲射擊口令中5段12項中第4段為何？",
    "options": [
      "高低、時間",
      "批號與裝藥",
      "方向修正量，方向",
      "彈種及批號"
    ],
    "correctAnswers": [
      0
    ],
    "explanation": "原卷答案標記 ●(1)：高低、時間。"
  },
  {
    "id": 17,
    "type": "single",
    "difficulty": "中",
    "source": "105榴砲單砲教練手冊, 2004, 3-68頁",
    "question": "105榴砲射擊口令中5段12項中第5段為何？",
    "options": [
      "射角",
      "高低",
      "仰度",
      "時間"
    ],
    "correctAnswers": [
      2
    ],
    "explanation": "原卷答案標記 ●(3)：仰度。"
  },
  {
    "id": 18,
    "type": "single",
    "difficulty": "中",
    "source": "105榴砲單砲教練手冊, 2004, 3-75頁",
    "question": "直接瞄準射擊中固定目標選擇要領何者為是？",
    "options": [
      "上級所賦予之目標",
      "對我危害最小者",
      "依砲長決定",
      "依瞄準手瞄準為主"
    ],
    "correctAnswers": [
      0
    ],
    "explanation": "原卷答案標記 ●(1)：上級所賦予之目標。"
  },
  {
    "id": 19,
    "type": "single",
    "difficulty": "中",
    "source": "105榴砲單砲教練手冊, 2004, 3-68頁",
    "question": "直接瞄準射擊裝藥選擇要領為何？",
    "options": [
      "盡可能用最大裝藥",
      "盡可能用最小裝藥",
      "依目標性質決定",
      "依瞄準手瞄準為主"
    ],
    "correctAnswers": [
      0
    ],
    "explanation": "原卷答案標記 ●(1)：盡可能用最大裝藥。"
  },
  {
    "id": 20,
    "type": "single",
    "difficulty": "中",
    "source": "105榴砲單砲教練手冊, 2004, 3-80頁",
    "question": "直接瞄準射擊射擊方式有哪些？",
    "options": [
      "單人單鏡",
      "雙人單鏡",
      "雙人雙鏡",
      "以上皆是"
    ],
    "correctAnswers": [
      3
    ],
    "explanation": "原卷答案標記 ●(4)：以上皆是。"
  },
  {
    "id": 21,
    "type": "single",
    "difficulty": "中",
    "source": "105榴砲單砲教練手冊, 2004, 2-13頁",
    "question": "105榴砲砲閂五大部件何者為非？",
    "options": [
      "閂體",
      "開門機",
      "傳動軸",
      "十字滑頭"
    ],
    "correctAnswers": [
      3
    ],
    "explanation": "原卷答案標記 ●(4)：十字滑頭。"
  },
  {
    "id": 22,
    "type": "single",
    "difficulty": "中",
    "source": "105榴砲單砲教練手冊, 2019, 2-36頁",
    "question": "105榴砲輪軸及彈子盤換油時機何者為非？",
    "options": [
      "每半年應換油一次",
      "M保養",
      "砲行5000哩時",
      "砲輪涉水後"
    ],
    "correctAnswers": [
      1
    ],
    "explanation": "原卷答案標記 ●(2)：M保養。"
  },
  {
    "id": 23,
    "type": "single",
    "difficulty": "中",
    "source": "105榴砲單砲教練手冊, 2038, 2-74頁",
    "question": "105榴砲空迴檢查標準為何？",
    "options": [
      "不得超過手輪 1/4",
      "1/6",
      "1/8",
      "1/10 轉"
    ],
    "correctAnswers": [
      1
    ],
    "explanation": "原卷答案標記 ●(2)：1/6。"
  },
  {
    "id": 24,
    "type": "single",
    "difficulty": "中",
    "source": "105榴砲單砲教練手冊, 3004, 3-2頁",
    "question": "105榴砲火砲前方規定為何？",
    "options": [
      "火砲上架後以牽引車車頭前方為前方",
      "下架後則以車頭前方為前方",
      "火砲上架後以火砲砲管為前方",
      "下架後則以車頭後方為前方"
    ],
    "correctAnswers": [
      0
    ],
    "explanation": "原卷答案標記 ●(1)：火砲上架後以牽引車車頭前方為前方。"
  },
  {
    "id": 25,
    "type": "single",
    "difficulty": "中",
    "source": "105榴砲單砲教練手冊, 3005, 3-2頁",
    "question": "105榴砲班之編成成員何者為非？",
    "options": [
      "發射手",
      "裝填手",
      "彈種選定手",
      "砲車駕駛手"
    ],
    "correctAnswers": [
      3
    ],
    "explanation": "原卷答案標記 ●(4)：砲車駕駛手。"
  },
  {
    "id": 26,
    "type": "single",
    "difficulty": "中",
    "source": "105榴砲單砲教練手冊, 3006, 3-3頁",
    "question": "105榴砲班之編成時以何者對準表尺座？",
    "options": [
      "信管測合手",
      "裝填手",
      "彈種選定手",
      "裝藥選定手"
    ],
    "correctAnswers": [
      0
    ],
    "explanation": "原卷答案標記 ●(1)：信管測合手。"
  },
  {
    "id": 27,
    "type": "single",
    "difficulty": "中",
    "source": "105榴砲單砲教練手冊, 3010, 3-8頁",
    "question": "試述 105榴砲人力挽曳時機何者為非？",
    "options": [
      "短距離運動時",
      "牽引受限制時",
      "秘匿我企圖時",
      "沒派車單時"
    ],
    "correctAnswers": [
      3
    ],
    "explanation": "原卷答案標記 ●(4)：沒派車單時。"
  },
  {
    "id": 28,
    "type": "single",
    "difficulty": "中",
    "source": "105榴砲單砲教練手冊, 3010, 3-14頁",
    "question": "試述 105榴砲人力挽曳時剎車要領為何？",
    "options": [
      "剎車力求齊一",
      "先剎左邊",
      "先剎右邊",
      "無須剎車"
    ],
    "correctAnswers": [
      0
    ],
    "explanation": "原卷答案標記 ●(1)：剎車力求齊一。"
  },
  {
    "id": 29,
    "type": "single",
    "difficulty": "中",
    "source": "105榴砲單砲教練手冊, 3019, 3-26頁",
    "question": "各種分劃之裝定要領為何？",
    "options": [
      "先裝本分劃，繼裝補助分劃",
      "先裝輔助分劃，再裝本分劃",
      "由小到大裝定",
      "由左至右裝定"
    ],
    "correctAnswers": [
      0
    ],
    "explanation": "原卷答案標記 ●(1)：先裝本分劃，繼裝補助分劃。"
  },
  {
    "id": 30,
    "type": "single",
    "difficulty": "中",
    "source": "105榴砲單砲教練手冊, 3019, 3-26頁",
    "question": "如何避免水準氣泡之空迴？",
    "options": [
      "由後向前，由右至左",
      "由前向後，由左向右",
      "打動方向機居中",
      "打動高低機居中"
    ],
    "correctAnswers": [
      1
    ],
    "explanation": "原卷答案標記 ●(2)：由前向後，由左向右。"
  },
  {
    "id": 31,
    "type": "single",
    "difficulty": "易",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊-安全規定",
    "question": "M114及M114A1牽引式155榴砲不得使用哪種底火射擊？",
    "options": [
      "M82式底火",
      "M83式底火",
      "M84式底火",
      "M85式底火"
    ],
    "correctAnswers": [
      0
    ],
    "explanation": "原卷答案標記 ●(1)：M82式底火。"
  },
  {
    "id": 32,
    "type": "single",
    "difficulty": "易",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 1008, 1-5頁",
    "question": "M114及M114A1牽引式155榴砲之膛線為何？",
    "options": [
      "36條等齊右旋",
      "42條等齊右旋",
      "48條等齊右旋",
      "48條等齊左旋"
    ],
    "correctAnswers": [
      2
    ],
    "explanation": "原卷答案標記 ●(3)：48條等齊右旋。"
  },
  {
    "id": 33,
    "type": "single",
    "difficulty": "易",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 1008, 1-6頁",
    "question": "M114及M114A1牽引式155榴砲之輪胎胎壓為何？",
    "options": [
      "40磅",
      "50磅",
      "60磅",
      "70磅"
    ],
    "correctAnswers": [
      1
    ],
    "explanation": "原卷答案標記 ●(2)：50磅。"
  },
  {
    "id": 34,
    "type": "single",
    "difficulty": "易",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 1008, 1-6頁",
    "question": "M114及M114A1牽引式155榴砲之最大射程為何？",
    "options": [
      "11000公尺",
      "14600公尺",
      "15600公尺",
      "16800公尺"
    ],
    "correctAnswers": [
      1
    ],
    "explanation": "原卷答案標記 ●(2)：14600公尺。"
  },
  {
    "id": 35,
    "type": "single",
    "difficulty": "易",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 3005, 3-2頁",
    "question": "M114及M114A1牽引式155榴砲之砲班成員共計幾員？",
    "options": [
      "7員",
      "9員",
      "11員",
      "13員"
    ],
    "correctAnswers": [
      1
    ],
    "explanation": "原卷答案標記 ●(2)：9員。"
  },
  {
    "id": 36,
    "type": "single",
    "difficulty": "易",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 3018, 3-28頁",
    "question": "M12A7C式週視鏡其倍率為幾倍？",
    "options": [
      "1倍",
      "2倍",
      "3倍",
      "4倍"
    ],
    "correctAnswers": [
      3
    ],
    "explanation": "原卷答案標記 ●(4)：4倍。"
  },
  {
    "id": 37,
    "type": "single",
    "difficulty": "易",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 3020, 3-31頁",
    "question": "M1及M1A1式象限儀其分劃可判讀至幾密位？",
    "options": [
      "1/10 密位",
      "1/20 密位",
      "2/10 密位",
      "2/20 密位"
    ],
    "correctAnswers": [
      0
    ],
    "explanation": "原卷答案標記 ●(1)：1/10 密位。"
  },
  {
    "id": 38,
    "type": "single",
    "difficulty": "易",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 3018, 3-28頁",
    "question": "M12A7C式週視鏡的修正分劃極限值為多少？",
    "options": [
      "左右各5密位",
      "左右各10密位",
      "左右各20密位",
      "左右各30密位"
    ],
    "correctAnswers": [
      2
    ],
    "explanation": "原卷答案標記 ●(3)：左右各20密位。"
  },
  {
    "id": 39,
    "type": "single",
    "difficulty": "易",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 3024, 3-38頁",
    "question": "M557式信管有哪兩種功能？",
    "options": [
      "瞬發及空炸",
      "瞬發及延期",
      "空炸及延期",
      "瞬發及近發"
    ],
    "correctAnswers": [
      1
    ],
    "explanation": "原卷答案標記 ●(2)：瞬發及延期。"
  },
  {
    "id": 40,
    "type": "single",
    "difficulty": "易",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 3025, 3-40頁",
    "question": "M26信管規之外環分劃可裝定幾秒？",
    "options": [
      "25秒",
      "50秒",
      "75秒",
      "100秒"
    ],
    "correctAnswers": [
      2
    ],
    "explanation": "原卷答案標記 ●(3)：75秒。"
  },
  {
    "id": 41,
    "type": "single",
    "difficulty": "易",
    "source": "105榴砲單砲教練手冊, 2001, 2-25頁",
    "question": "第一砲手火砲保養職責何者為非？",
    "options": [
      "肘形鏡",
      "表尺座",
      "高低機",
      "工具之保養"
    ],
    "correctAnswers": [
      2
    ],
    "explanation": "原卷答案標記 ●(3)：高低機。"
  },
  {
    "id": 42,
    "type": "single",
    "difficulty": "易",
    "source": "105榴砲單砲教練手冊, 2001, 2-25頁",
    "question": "射擊後之砲膛應連續擦拭幾天？",
    "options": [
      "2天",
      "3天",
      "4天",
      "5天"
    ],
    "correctAnswers": [
      1
    ],
    "explanation": "原卷選項為 (1)2天 (2)3天 (3)4天 (4)5天，答案標記 ●(2)：3天。"
  },
  {
    "id": 43,
    "type": "single",
    "difficulty": "易",
    "source": "105榴砲單砲教練手冊, 2001, 2-30頁",
    "question": "第二、三砲手火砲保養職責掌為何？",
    "options": [
      "砲閂及砲身保養",
      "制退復進機保養",
      "搖架及撬車保養",
      "調平架與高低機"
    ],
    "correctAnswers": [
      0
    ],
    "explanation": "原卷答案標記 ●(1)：砲閂及砲身保養。"
  },
  {
    "id": 44,
    "type": "single",
    "difficulty": "易",
    "source": "105榴砲單砲教練手冊, 2001, 2-35頁",
    "question": "輪胎每行多少哩需左右調換？",
    "options": [
      "4000哩",
      "5000哩",
      "6000哩",
      "8000哩"
    ],
    "correctAnswers": [
      1
    ],
    "explanation": "原卷答案標記 ●(2)：5000哩。"
  },
  {
    "id": 45,
    "type": "single",
    "difficulty": "易",
    "source": "105榴砲單砲教練手冊, 2001, 2-25頁",
    "question": "第五砲手火砲保養職責何者為非？",
    "options": [
      "砲架",
      "護板",
      "搖架",
      "車輪各部分之保養"
    ],
    "correctAnswers": [
      2
    ],
    "explanation": "原卷答案標記 ●(3)：搖架。"
  },
  {
    "id": 46,
    "type": "single",
    "difficulty": "易",
    "source": "105榴砲單砲教練手冊, 2001, 2-30頁",
    "question": "砲膛溫度高時不得使用何種擦劑保養火砲？",
    "options": [
      "快乾劑",
      "CLP三合一油",
      "擦膛液",
      "肥皂水，會使砲膛生鏽"
    ],
    "correctAnswers": [
      0
    ],
    "explanation": "原卷答案標記 ●(1)：快乾劑。"
  },
  {
    "id": 47,
    "type": "single",
    "difficulty": "易",
    "source": "105榴砲單砲教練手冊, 2004, 2-48頁",
    "question": "105榴砲校正方法何者為非？",
    "options": [
      "校正靶法",
      "遠方瞄準點法",
      "方向基角法",
      "方向盤法"
    ],
    "correctAnswers": [
      2
    ],
    "explanation": "原卷答案標記 ●(3)：方向基角法。"
  },
  {
    "id": 48,
    "type": "single",
    "difficulty": "易",
    "source": "105榴砲單砲教練手冊, 2004, 2-52頁",
    "question": "遠方瞄準點法瞄準點選擇多少距離外？",
    "options": [
      "2000公尺",
      "1300公尺",
      "1400公尺",
      "1500公尺"
    ],
    "correctAnswers": [
      3
    ],
    "explanation": "原卷答案標記 ●(4)：1500公尺。"
  },
  {
    "id": 49,
    "type": "single",
    "difficulty": "易",
    "source": "105榴砲單砲教練手冊, 2004, 2-74頁",
    "question": "105榴砲輪胎胎壓為何？",
    "options": [
      "每平方吋30磅",
      "每平方吋40磅",
      "每平方吋50磅",
      "每平方吋60磅"
    ],
    "correctAnswers": [
      1
    ],
    "explanation": "原卷答案標記 ●(2)：每平方吋40磅。"
  },
  {
    "id": 50,
    "type": "single",
    "difficulty": "易",
    "source": "105榴砲單砲教練手冊, 2004, 3-27頁",
    "question": "象限儀分劃可看讀至多少密位？",
    "options": [
      "1/10密位",
      "1密位",
      "10密位",
      "1/2密位"
    ],
    "correctAnswers": [
      0
    ],
    "explanation": "原卷選項為 (1)1/10密位 (2)1密位 (3)10密位 (4)1/2密位，答案標記 ●(1)：1/10密位。"
  },
  {
    "id": 51,
    "type": "single",
    "difficulty": "難",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 3036, 3-57頁",
    "question": "使用遠方瞄準點法實施火砲校正時，其瞄準點選擇要領為何？",
    "options": [
      "應選擇獨立、明顯、垂直線狀之固定物體較佳，其距離至少應在1000公尺以外",
      "應選擇獨立、明顯、垂直線狀之固定物較佳，其距離至少應在1500公尺以外",
      "應選擇獨立、明顯、垂直線狀之固定物體較佳，其距離至少應在2000公尺以外",
      "應選擇獨立、明顯、垂直線狀之固定物體較佳，其距離至少應在2500公尺以外"
    ],
    "correctAnswers": [
      1
    ],
    "explanation": "原卷答案標記 ●(2)：應選擇獨立、明顯、垂直線狀之固定物較佳，其距離至少應在1500公尺以外。"
  },
  {
    "id": 52,
    "type": "single",
    "difficulty": "難",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 3034, 3-57~3-55頁",
    "question": "實施象限儀箱規校正時，其實施要領何者為非？",
    "options": [
      "可使用倒置法及比較法",
      "先使象限儀各部分劃歸零",
      "水準氣泡概略居中即可",
      "使用一具無誤差或誤差小於0.4密位之象限儀"
    ],
    "correctAnswers": [
      2
    ],
    "explanation": "原卷答案標記 ●(3)：水準氣泡概略居中即可。"
  },
  {
    "id": 53,
    "type": "single",
    "difficulty": "難",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 3026, 3-41頁",
    "question": "M27信管規可裝定哪幾類信管？",
    "options": [
      "M501系列",
      "M732",
      "M514系列",
      "以上皆可"
    ],
    "correctAnswers": [
      3
    ],
    "explanation": "原卷答案標記 ●(4)：以上皆可。"
  },
  {
    "id": 54,
    "type": "single",
    "difficulty": "難",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 2003, 2-6頁",
    "question": "155榴砲制退復進機功用為何？",
    "options": [
      "用於射擊時完成制退、復進、緩衝等作用",
      "用於射擊中平衡火砲",
      "增加火砲射程",
      "減少爆音及回火"
    ],
    "correctAnswers": [
      0
    ],
    "explanation": "原卷答案標記 ●(1)：用於射擊時完成制退、復進、緩衝等作用。"
  },
  {
    "id": 55,
    "type": "single",
    "difficulty": "難",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 2003, 2-7頁",
    "question": "155榴砲大架功用何者為非？",
    "options": [
      "運動時連結車砲，曳引火砲方向",
      "射擊時穩定火砲",
      "傳導後座力分散於地面",
      "提升射向賦予精度"
    ],
    "correctAnswers": [
      3
    ],
    "explanation": "原卷答案標記 ●(4)：提升射向賦予精度。"
  },
  {
    "id": 56,
    "type": "single",
    "difficulty": "難",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 3021, 3-36頁",
    "question": "裝定分劃之動作要領為何，以減少空迴誤差？",
    "options": [
      "裝定分劃之動作，必須使指標向數字遞加之方向停止，以減少空迴",
      "裝定分劃之動作，必須使指標向數字遞減之方向停止，以減少空迴",
      "不論朝哪個方向轉，都沒有影響",
      "以上皆非"
    ],
    "correctAnswers": [
      0
    ],
    "explanation": "原卷答案標記 ●(1)：裝定分劃之動作，必須使指標向數字遞加之方向停止，以減少空迴。"
  },
  {
    "id": 57,
    "type": "single",
    "difficulty": "難",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 3020, 3-33頁",
    "question": "M1象限儀之輔助分劃有兩層，分別為何？",
    "options": [
      "上層黑色註記為高射界；下層紅色註記為低射界",
      "上層黑色註記為低射界；下層紅色註記為高射界",
      "兩層刻劃均相同",
      "以上皆非"
    ],
    "correctAnswers": [
      1
    ],
    "explanation": "原卷答案標記 ●(2)：上層黑色註記為低射界；下層紅色註記為高射界。"
  },
  {
    "id": 58,
    "type": "single",
    "difficulty": "難",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 3020, 3-33頁",
    "question": "M1象限儀之輔助分劃有兩層，分別為何？",
    "options": [
      "上層黑色註記為高射界；下層紅色註記為低射界",
      "上層黑色註記為低射界；下層紅色註記為高射界",
      "兩層刻劃均相同",
      "以上皆非"
    ],
    "correctAnswers": [
      1
    ],
    "explanation": "原卷答案標記 ●(2)：上層黑色註記為低射界；下層紅色註記為高射界。"
  },
  {
    "id": 59,
    "type": "single",
    "difficulty": "難",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 4009, 4-15頁",
    "question": "射向標定如受地形地物限制時，應如何設置標桿？",
    "options": [
      "另外找尋適宜陣地",
      "只插近或遠標桿即可",
      "可依陣地大小，予以適當縮短距離，唯遠近標桿必須保持等距",
      "隨機找尋一個目標物作為標桿"
    ],
    "correctAnswers": [
      2
    ],
    "explanation": "原卷答案標記 ●(3)：可依陣地大小，予以適當縮短距離，唯遠近標桿必須保持等距。"
  },
  {
    "id": 60,
    "type": "single",
    "difficulty": "難",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 6013, 6-22頁",
    "question": "多餘藥包焚燒時，其高度及寬度限制為何？",
    "options": [
      "高度不超過20公分，寬度不超過15公分",
      "高度不超過15公分，寬度不超過20公分",
      "高度及寬度均不超過30公分",
      "視現地狀況而定，無特別律定"
    ],
    "correctAnswers": [
      1
    ],
    "explanation": "原卷答案標記 ●(2)：高度不超過15公分，寬度不超過20公分。"
  },
  {
    "id": 61,
    "type": "single",
    "difficulty": "難",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 4005, 4-13頁",
    "question": "決定射向之測定其口令為何？",
    "options": [
      "「第X砲注意-瞄準點方向盤，測反覘分劃」",
      "「第X砲注意-瞄準點方向盤，測直覘分劃」",
      "「第X砲注意-瞄準點第X砲，測直覘分劃」",
      "「第X砲注意-瞄準點第X砲，測反覘分劃」"
    ],
    "correctAnswers": [
      1
    ],
    "explanation": "原卷答案標記 ●(2)：「第X砲注意-瞄準點方向盤，測直覘分劃」。"
  },
  {
    "id": 62,
    "type": "single",
    "difficulty": "難",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 4005, 4-13頁",
    "question": "決定射向之測定其口令為何？",
    "options": [
      "「第X砲注意-瞄準點方向盤，測反覘分劃」",
      "「第X砲注意-瞄準點方向盤，測直覘分劃」",
      "「第X砲注意-瞄準點第X砲，測直覘分劃」",
      "「第X砲注意-瞄準點第X砲，測反覘分劃」"
    ],
    "correctAnswers": [
      1
    ],
    "explanation": "原卷答案標記 ●(2)：「第X砲注意-瞄準點方向盤，測直覘分劃」。"
  },
  {
    "id": 63,
    "type": "single",
    "difficulty": "難",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 4005, 4-13頁",
    "question": "決定射向之測定其口令為何？",
    "options": [
      "「第X砲注意-瞄準點方向盤，測反覘分劃」",
      "「第X砲注意-瞄準點方向盤，測直覘分劃」",
      "「第X砲注意-瞄準點第X砲，測直覘分劃」",
      "「第X砲注意-瞄準點第X砲，測反覘分劃」"
    ],
    "correctAnswers": [
      1
    ],
    "explanation": "原卷答案標記 ●(2)：「第X砲注意-瞄準點方向盤，測直覘分劃」。"
  },
  {
    "id": 64,
    "type": "single",
    "difficulty": "難",
    "source": "105榴砲單砲教練手冊, 3056, 3-88頁",
    "question": "105榴砲之距離換算板其分劃刻線分為哪些裝藥？",
    "options": [
      "5號裝藥",
      "6號裝藥",
      "7號裝藥",
      "以上皆是"
    ],
    "correctAnswers": [
      3
    ],
    "explanation": "原卷答案標記 ●(4)：以上皆是。"
  },
  {
    "id": 65,
    "type": "single",
    "difficulty": "難",
    "source": "105榴砲單砲教練手冊, 3045, 3-68頁",
    "question": "若要使用特別修正量時，須下達於射擊口令中的那一項？",
    "options": [
      "發射砲及發射法",
      "特別規定",
      "批號",
      "彈種"
    ],
    "correctAnswers": [
      1
    ],
    "explanation": "原卷答案標記 ●(2)：特別規定。"
  },
  {
    "id": 66,
    "type": "single",
    "difficulty": "難",
    "source": "105榴砲單砲教練手冊, 3046, 3-70頁",
    "question": "105榴砲之射擊操作，何者下達後才裝填砲彈？",
    "options": [
      "高低",
      "時間",
      "批號",
      "仰度"
    ],
    "correctAnswers": [
      3
    ],
    "explanation": "原卷答案標記 ●(4)：仰度。"
  },
  {
    "id": 67,
    "type": "single",
    "difficulty": "難",
    "source": "105榴砲單砲教練手冊, 3047, 3-72頁",
    "question": "105榴砲若遇不發火時，須每隔幾秒連續拉火幾次？",
    "options": [
      "每隔2秒鐘連續拉火兩次",
      "每隔3秒鐘連續拉火兩次",
      "每隔4秒鐘連續拉火兩次",
      "每隔5秒鐘連續拉火兩次"
    ],
    "correctAnswers": [
      1
    ],
    "explanation": "原卷答案標記 ●(2)：每隔3秒鐘連續拉火兩次。"
  },
  {
    "id": 68,
    "type": "single",
    "difficulty": "難",
    "source": "105榴砲單砲教練手冊, 3053, 3-81頁",
    "question": "105榴砲直接瞄準射擊雙人雙鏡瞄準時由何人負責拉火？",
    "options": [
      "五砲手",
      "四砲手",
      "三砲手",
      "二砲手"
    ],
    "correctAnswers": [
      0
    ],
    "explanation": "原卷選項為 (1)五砲手 (2)四砲手 (3)三砲手 (4)二砲手，答案標記 ●(1)：五砲手。"
  },
  {
    "id": 69,
    "type": "single",
    "difficulty": "難",
    "source": "105榴砲單砲教練手冊, 3056, 3-88頁",
    "question": "105榴砲肘形鏡內之距離刻劃適用於幾號裝藥？",
    "options": [
      "四號裝藥",
      "五號裝藥",
      "六號裝藥",
      "七號裝藥"
    ],
    "correctAnswers": [
      2
    ],
    "explanation": "原卷答案標記 ●(3)：六號裝藥。"
  },
  {
    "id": 70,
    "type": "single",
    "difficulty": "難",
    "source": "105榴砲單砲教練手冊, 2003, 2-2頁",
    "question": "M101A1式105榴砲方向手輪每轉為幾密位(螺旋式)？",
    "options": [
      "17",
      "18",
      "19",
      "20"
    ],
    "correctAnswers": [
      2
    ],
    "explanation": "原卷答案標記 ●(3)：19。"
  },
  {
    "id": 71,
    "type": "single",
    "difficulty": "難",
    "source": "105榴砲單砲教練手冊, 2003, 2-2頁",
    "question": "M101A1式105榴砲高低手輪每轉為幾密位？",
    "options": [
      "7",
      "8",
      "9",
      "10密位"
    ],
    "correctAnswers": [
      3
    ],
    "explanation": "原卷答案標記 ●(4)：10密位。"
  },
  {
    "id": 72,
    "type": "single",
    "difficulty": "難",
    "source": "105榴砲單砲教練手冊, 附件1-1頁",
    "question": "105榴砲使用何種形式彈藥？",
    "options": [
      "固定式",
      "半固定式",
      "分裝藥",
      "藥片式"
    ],
    "correctAnswers": [
      1
    ],
    "explanation": "原卷答案標記 ●(2)：半固定式。"
  },
  {
    "id": 73,
    "type": "single",
    "difficulty": "難",
    "source": "105榴砲單砲教練手冊, 2003, 2-8頁",
    "question": "105榴砲正常射速為每分鐘幾發？",
    "options": [
      "每分鐘 2-4 發",
      "每分鐘 2-3 發",
      "每分鐘 2-6 發",
      "每分鐘 2-8 發"
    ],
    "correctAnswers": [
      0
    ],
    "explanation": "原卷答案標記 ●(1)：每分鐘 2-4 發。"
  }
];

export const MULTIPLE_QUESTIONS: Question[] = [
  {
    "id": 1,
    "type": "multiple",
    "difficulty": "中",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 3032, 3-51頁",
    "question": "射控器材校正前之準備事項為何？",
    "options": [
      "將火砲停放於堅硬水平之地面，傾斜不得超過90密位，必要時應使用鋼墊板",
      "檢查表尺座、週視鏡及鏡座是否鬆動或其他明顯之缺點",
      "塗黃油避免生鏽",
      "將視鏡誤差防護片裝於週視鏡之接目鏡內"
    ],
    "correctAnswers": [
      0,
      1,
      3
    ],
    "explanation": "原卷答案標記 ■(1)、■(2)、■(4)。"
  },
  {
    "id": 2,
    "type": "multiple",
    "difficulty": "中",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 3036, 3-57頁",
    "question": "方向盤校正時機為何？",
    "options": [
      "每月配合預防保養時機",
      "應急校正及夜間校正時",
      "因天候影響或受地形限制，其他方法無法實施時",
      "對砲身無法水平之火砲校正時"
    ],
    "correctAnswers": [
      1,
      2,
      3
    ],
    "explanation": "原卷答案標記 ■(2)、■(3)、■(4)。"
  },
  {
    "id": 3,
    "type": "multiple",
    "difficulty": "中",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 6008, 6-15頁",
    "question": "155榴砲 M3A1 拋射藥有哪些藥包，其顏色為何？",
    "options": [
      "2個基本裝藥及3個增量藥包，共有5號裝藥",
      "1個基本裝藥及4個增量藥包，共有5號裝藥",
      "裝藥為綠色",
      "裝藥為白色"
    ],
    "correctAnswers": [
      1,
      2
    ],
    "explanation": "原卷答案標記 ■(2)、■(3)。"
  },
  {
    "id": 4,
    "type": "multiple",
    "difficulty": "中",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 6008, 6-16頁",
    "question": "155榴砲 M4A2 拋射藥有哪些藥包，其顏色為何？",
    "options": [
      "1個基本裝藥及4個增量藥包，由3~7號裝藥組成",
      "1個基本裝藥及4個增量藥包，由1~5號裝藥組成",
      "裝藥為綠色",
      "裝藥為白色"
    ],
    "correctAnswers": [
      0,
      3
    ],
    "explanation": "原卷答案標記 ■(1)、■(4)。"
  },
  {
    "id": 5,
    "type": "multiple",
    "difficulty": "中",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 2003, 2-5頁",
    "question": "砲管功用為何？",
    "options": [
      "承裝砲彈",
      "負荷拋射藥燃燒之氣體壓力，發射彈丸",
      "以膛線復與彈丸旋轉力",
      "減少後座"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ],
    "explanation": "原卷答案標記 ■(1)、■(2)、■(3)。"
  },
  {
    "id": 6,
    "type": "multiple",
    "difficulty": "中",
    "source": "105榴砲單砲教練手冊, 2038, 2-72頁",
    "question": "105榴砲針對發火機檢查要領有哪些？",
    "options": [
      "擊針插銷是否定位",
      "用拉火桿檢查發火機之性能",
      "卸下發火機檢查清潔及潤滑情形",
      "擊針是否過短"
    ],
    "correctAnswers": [
      1,
      2
    ],
    "explanation": "原卷答案標記 ■(2)、■(3)。"
  },
  {
    "id": 7,
    "type": "multiple",
    "difficulty": "中",
    "source": "105榴砲單砲教練手冊, 3010, 3-8頁",
    "question": "105榴砲推砲向前之口令為何？",
    "options": [
      "「推砲向前」",
      "「走」",
      "「立定」",
      "「停」"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ],
    "explanation": "原卷答案標記 ■(1)「推砲向前」、■(2)「走」、■(3)「立定」。"
  },
  {
    "id": 8,
    "type": "multiple",
    "difficulty": "中",
    "source": "105榴砲單砲教練手冊, 3013, 3-18頁",
    "question": "105榴砲在火砲運動前三砲手檢查項目為何？",
    "options": [
      "牽引桿固定鎖",
      "大架連接鎖",
      "洗把桿",
      "標桿"
    ],
    "correctAnswers": [
      0,
      1
    ],
    "explanation": "原卷答案標記 ■(1)、■(2)。"
  },
  {
    "id": 9,
    "type": "multiple",
    "difficulty": "中",
    "source": "（原卷該頁未提供，出處待補）",
    "question": "M101式105榴彈砲炮管區分爲哪幾部分？",
    "options": [
      "砲口十字線",
      "硝煙避震器",
      "砲身鎖環及固環",
      "砲膛"
    ],
    "correctAnswers": [
      0,
      1,
      2,
      3
    ],
    "explanation": "原卷答案標記 ■(1)砲口十字線、■(2)硝煙避震器、■(3)砲身鎖環及固環、■(4)砲膛。"
  },
  {
    "id": 10,
    "type": "multiple",
    "difficulty": "中",
    "source": "（原卷該頁未提供，出處待補）",
    "question": "直接瞄準射擊時雙人雙鏡操作瞄準裝置炮手？",
    "options": [
      "砲長",
      "副砲長",
      "發射手",
      "彈種選定手"
    ],
    "correctAnswers": [
      1,
      2
    ],
    "explanation": "原卷答案標記 ■(2)、■(3)。"
  },
  {
    "id": 11,
    "type": "multiple",
    "difficulty": "易",
    "source": "（原卷該頁未提供，出處待補）",
    "question": "M1及M1A1式象限儀其高低射界劃分應如何區分？",
    "options": [
      "低射界:0～800密位",
      "低射界:0～600密位",
      "高射界:800～1600密位",
      "高射界:600～1400密位"
    ],
    "correctAnswers": [
      0,
      2
    ],
    "explanation": "原卷答案標記 ■(1)、■(3)。"
  },
  {
    "id": 12,
    "type": "multiple",
    "difficulty": "易",
    "source": "（原卷該頁未提供，出處待補）",
    "question": "火砲之標竿誤差修正方法為何？",
    "options": [
      "應急修正",
      "餘裕修正",
      "遠方瞄準點修正",
      "以上皆是"
    ],
    "correctAnswers": [
      0,
      1
    ],
    "explanation": "原卷答案標記 ■(1)、■(2)。"
  },
  {
    "id": 13,
    "type": "multiple",
    "difficulty": "易",
    "source": "（原卷該頁未提供，出處待補）",
    "question": "砲膛擦拭步驟及項目為何？",
    "options": [
      "拖擦、沖洗",
      "擦乾、檢查",
      "潤滑",
      "以上皆是"
    ],
    "correctAnswers": [
      0,
      1,
      2,
      3
    ],
    "explanation": "原卷答案標記 ■(1)、■(2)、■(3)、■(4)。"
  },
  {
    "id": 14,
    "type": "multiple",
    "difficulty": "易",
    "source": "（原卷該頁未提供，出處待補）",
    "question": "彈體各部位名稱為何？",
    "options": [
      "彈頭部",
      "定心部、彈體部",
      "彈帶部",
      "彈底部"
    ],
    "correctAnswers": [
      0,
      1,
      2,
      3
    ],
    "explanation": "原卷答案標記 ■(1)、■(2)、■(3)、■(4)。"
  },
  {
    "id": 15,
    "type": "multiple",
    "difficulty": "易",
    "source": "（原卷該頁未提供，出處待補）",
    "question": "平行檢查及檢查方法為何？",
    "options": [
      "基準砲法",
      "方位角法",
      "方向盤法",
      "指北針法"
    ],
    "correctAnswers": [
      0,
      2
    ],
    "explanation": "原卷答案標記 ■(1)、■(3)。"
  },
  {
    "id": 16,
    "type": "multiple",
    "difficulty": "易",
    "source": "（原卷該頁未提供，出處待補）",
    "question": "105榴彈炮制退復進機在射擊中復進過猛應如何處置？",
    "options": [
      "因存油過多，需放油",
      "因存油過少，需加油",
      "因空氣調節失調，或氮氣壓力過大，需調整或通知兵工單位",
      "再射擊2-3發"
    ],
    "correctAnswers": [
      0,
      2
    ],
    "explanation": "原卷答案標記 ■(1)、■(3)。"
  },
  {
    "id": 17,
    "type": "multiple",
    "difficulty": "易",
    "source": "（原卷該頁未提供，出處待補）",
    "question": "平行檢查及檢查方法為何？",
    "options": [
      "基準砲法",
      "方位角法",
      "方向盤法",
      "指北針法"
    ],
    "correctAnswers": [
      0,
      2
    ],
    "explanation": "原卷答案標記 ■(1)、■(3)。"
  },
  {
    "id": 18,
    "type": "multiple",
    "difficulty": "易",
    "source": "（原卷該頁未提供，出處待補）",
    "question": "105榴砲砲閂保養要領為何？",
    "options": [
      "應保持清潔，且潤滑良好",
      "防護油料，需擦去後，要用煤油或蘇打及肥皂溶液洗擦",
      "不用時應塗防護油，用時應經常洗擦，射擊後要立即洗擦",
      "洗擦後，應塗一層防護油"
    ],
    "correctAnswers": [
      0,
      1,
      2,
      3
    ],
    "explanation": "原卷答案標記 ■(1)、■(2)、■(3)、■(4)。"
  },
  {
    "id": 19,
    "type": "multiple",
    "difficulty": "易",
    "source": "（原卷該頁未提供，出處待補）",
    "question": "105榴彈炮制退復進機再射擊前制退油應如何使用？",
    "options": [
      "火砲應及時注入制退油（平時每週加放一次）",
      "油量指標應隨時保持正常，勿使用過量",
      "發現氮氣內漏逕行實施砲身運動",
      "油量指標突出筒面1/6吋"
    ],
    "correctAnswers": [
      0,
      1
    ],
    "explanation": "原卷答案標記 ■(1)、■(2)。"
  },
  {
    "id": 20,
    "type": "multiple",
    "difficulty": "易",
    "source": "（原卷該頁未提供，出處待補）",
    "question": "105榴彈炮制退復進機在射擊中復進過猛應如何處置？",
    "options": [
      "因存油過多，需放油",
      "因存油過少，需加油",
      "因空氣調節失調，或氮氣壓力過大，需調整或通知兵工單位",
      "再射擊2-3發"
    ],
    "correctAnswers": [
      0,
      2
    ],
    "explanation": "原卷答案標記 ■(1)、■(3)。"
  },
  {
    "id": 21,
    "type": "multiple",
    "difficulty": "難",
    "source": "（原卷該頁未提供，出處待補）",
    "question": "射控器材檢查時機為何？",
    "options": [
      "凡不參加射擊，僅負責訓練用火炮應每年檢查一次",
      "用於射擊之火炮應每三個月檢查一次",
      "火砲經過射擊後應立即實施檢查",
      "射擊間，如發現火砲精度不良，應實施檢查"
    ],
    "correctAnswers": [
      0,
      1,
      2,
      3
    ],
    "explanation": "原卷答案標記 ■(1)、■(2)、■(3)、■(4)。"
  },
  {
    "id": 22,
    "type": "multiple",
    "difficulty": "難",
    "source": "（原卷該頁未提供，出處待補）",
    "question": "射控器材校正前檢查事項為何？",
    "options": [
      "象限儀檢查",
      "砲身（耳）水平檢查",
      "調整活動臂",
      "瞄準鏡座檢查"
    ],
    "correctAnswers": [
      0,
      1,
      2,
      3
    ],
    "explanation": "原卷答案標記 ■(1)、■(2)、■(3)、■(4)。"
  },
  {
    "id": 23,
    "type": "multiple",
    "difficulty": "難",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 3037, 3-72頁",
    "question": "方向盤法其校正要領為何？",
    "options": [
      "將方向盤黑色分劃3200（即紅色分劃0朝向自己）",
      "調整打動方向機，同時轉動方向盤之下半部使砲身軸線之左緣與方向盤之右緣確實一致",
      "方向盤於火砲後方約10-20公尺處",
      "轉動方向盤之上半部，使其鏡內十字縱線對準瞄準鏡正中央，並看讀其分劃"
    ],
    "correctAnswers": [
      0,
      2,
      3
    ],
    "explanation": "原卷答案標記 ■(1)、■(3)、■(4)。"
  },
  {
    "id": 24,
    "type": "multiple",
    "difficulty": "難",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 4048, 4-68頁",
    "question": "標桿誤差檢驗修正要領為何？",
    "options": [
      "裝定方向XXXX，打動方向機瞄準遠標桿",
      "轉動輔助分劃轉盤瞄準近標桿",
      "再打動方向機瞄準遠標桿",
      "裝定原先之方向分劃，居中水平氣泡，覆瞄"
    ],
    "correctAnswers": [
      0,
      1,
      2,
      3
    ],
    "explanation": "原卷答案標記 ■(1)裝定方向XXXX，打動方向機瞄準遠標桿、■(2)轉動輔助分劃轉盤瞄準近標桿、■(3)再打動方向機瞄準遠標桿、■(4)裝定原先之方向分劃，居中水平氣泡，覆瞄。"
  },
  {
    "id": 25,
    "type": "multiple",
    "difficulty": "難",
    "source": "M114A1牽引式155公厘榴彈砲操作手冊, 4018, 4-33頁",
    "question": "155榴砲其射擊口令包含以下幾項？",
    "options": [
      "隨口令操作砲",
      "方向",
      "彈種",
      "射角"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ],
    "explanation": "原卷答案標記 ■(1)隨口令操作砲、■(2)方向、■(3)彈種。"
  },
  {
    "id": 26,
    "type": "multiple",
    "difficulty": "難",
    "source": "105榴砲單砲教練手冊, 附件, 附1-1頁",
    "question": "一發完整105榴砲砲彈包括哪些部分？",
    "options": [
      "底火",
      "藥筒",
      "發射藥",
      "彈丸"
    ],
    "correctAnswers": [
      0,
      1,
      2,
      3
    ],
    "explanation": "原卷答案標記 ■(1)、■(2)、■(3)、■(4)。"
  },
  {
    "id": 27,
    "type": "multiple",
    "difficulty": "難",
    "source": "105榴砲單砲教練手冊, 附件, 附1-2頁",
    "question": "105榴砲發射藥由多少藥包組合而成？",
    "options": [
      "普通藥包",
      "強裝藥",
      "六號裝藥",
      "七號裝藥"
    ],
    "correctAnswers": [
      2,
      3
    ],
    "explanation": "原卷答案標記 ■(3)六號裝藥、■(4)七號裝藥。"
  },
  {
    "id": 28,
    "type": "multiple",
    "difficulty": "難",
    "source": "105榴砲單砲教練手冊, 附錄, 附3-32頁",
    "question": "信管工具有哪些？",
    "options": [
      "M18信管板手",
      "M16信管板手",
      "M23信管板手",
      "M26信管板手"
    ],
    "correctAnswers": [
      0,
      1,
      3
    ],
    "explanation": "原卷答案標記 ■(1)M18信管板手、■(2)M16信管板手、■(4)M26信管板手。"
  },
  {
    "id": 29,
    "type": "multiple",
    "difficulty": "難",
    "source": "105榴砲單砲教練手冊, 2011, 2-5頁",
    "question": "制退復進機組成為何？",
    "options": [
      "橇車",
      "制退管",
      "復進管",
      "以上皆非"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ],
    "explanation": "原卷答案標記 ■(1)橇車、■(2)制退管、■(3)復進管。"
  },
  {
    "id": 30,
    "type": "multiple",
    "difficulty": "難",
    "source": "105榴砲單砲教練手冊, 3045, 3-68頁",
    "question": "下列哪些為105榴砲射擊口令中5段12項之內容？",
    "options": [
      "隨口令操作砲",
      "特別規定",
      "高低",
      "射角"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ],
    "explanation": "原卷答案標記 ■(1)隨口令操作砲、■(2)特別規定、■(3)高低。"
  }
];
