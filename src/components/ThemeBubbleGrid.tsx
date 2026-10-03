import React, { useState } from 'react';
import { 
  Volume2, 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  FolderKanban, 
  Download, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Layers, 
  Compass, 
  Target, 
  Wrench, 
  AlertTriangle,
  Play
} from 'lucide-react';

interface ThemeBubbleGridProps {
  onSelectRecitation: (recitationId: string) => void;
  onStartQuiz: (options: { type: 'single' | 'multiple' | 'all'; count: number }) => void;
  onSelectOperation: (opId: string) => void;
  onOpenCloud: () => void;
}

export const ThemeBubbleGrid: React.FC<ThemeBubbleGridProps> = ({
  onSelectRecitation,
  onStartQuiz,
  onSelectOperation,
  onOpenCloud,
}) => {
  const [filter, setFilter] = useState<'all' | 'mandatory' | 'quiz' | 'elective'>('all');

  const bubbles = [
    // 必修背誦類
    {
      id: 'squad-formation',
      category: 'mandatory',
      title: '1. 班之編成 (背誦)',
      subtitle: '砲操必修第一科目',
      badge: '必修 ‧ 文字+語音',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      icon: Layers,
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      description: '向中看齊、砲後集合、任務賦予至末名兵副砲長之報數口令全流程背誦與語音聽力',
      points: ['8名砲手職責賦予', '雙向報數口令節奏', '逐句高亮同步聽力'],
      actionLabel: '進入聽力背誦',
      onClick: () => onSelectRecitation('squad-formation')
    },
    {
      id: 'firing-mission',
      category: 'mandatory',
      title: '2. 射擊任務 (背誦)',
      subtitle: '射擊諸元與發射口令',
      badge: '必修 ‧ 文字+語音',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      icon: Target,
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      description: '射擊任務下達、彈種、批號、藥包、信管、時間、射角覆誦至「放」口令全流程',
      points: ['全體及指定砲手覆誦分工', '檢查諸元要領', '手順勢揮下放砲口令'],
      actionLabel: '進入聽力背誦',
      onClick: () => onSelectRecitation('firing-mission')
    },
    {
      id: 'direction-setting',
      category: 'mandatory',
      title: '3-a. 方向裝定 (背誦)',
      subtitle: '155榴砲器材操作口令',
      badge: '必修 ‧ 文字+語音',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      icon: Compass,
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      description: '方向裝定場地測驗口令，打動方向機瞄準標桿左緣、居中水平氣泡並請示檢查',
      points: ['瞄準標桿左緣', '居中水平氣泡', '標準請示與回報'],
      actionLabel: '進入聽力背誦',
      onClick: () => onSelectRecitation('direction-setting')
    },
    {
      id: 'elevation-setting',
      category: 'mandatory',
      title: '3-b. 射角裝定 (背誦)',
      subtitle: '155榴砲器材操作口令',
      badge: '必修 ‧ 文字+語音',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      icon: Target,
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      description: '射角裝定場地測驗口令，打動高低機、居中水平氣泡、報好並請示檢查',
      points: ['打動高低機', '居中水平氣泡', '密位射角精準裝定'],
      actionLabel: '進入聽力背誦',
      onClick: () => onSelectRecitation('elevation-setting')
    },
    {
      id: 'fuze-setting',
      category: 'mandatory',
      title: '3-c. 信管規裝定 (背誦)',
      subtitle: '155榴砲器材操作口令',
      badge: '必修 ‧ 文字+語音',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      icon: Wrench,
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      description: '彈體六大項目外觀檢查、指標歸S、雙手取插銷、食指護住信管頭逆時針旋轉聞卡聲',
      points: ['彈體外觀六大檢查', '逆時針旋轉聞卡聲', '裁判官時間裝定'],
      actionLabel: '進入聽力背誦',
      onClick: () => onSelectRecitation('fuze-setting')
    },

    // 測驗題庫類
    {
      id: 'quiz-single',
      category: 'quiz',
      title: '4-A. M114A1 單選題測驗',
      subtitle: '操作手冊士兵測考題庫',
      badge: '小測驗 ‧ 73題單選',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      icon: HelpCircle,
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      description: '可選擇測驗題數(10/20/50或全做73題)，選項隨機打亂，測驗完成即時評分並列出錯題複習',
      points: ['難中易完整三級分佈', '選項亂數防作弊', '錯題集中複習與重測'],
      actionLabel: '開始單選小測驗',
      onClick: () => onStartQuiz({ type: 'single', count: 20 })
    },
    {
      id: 'quiz-multi',
      category: 'quiz',
      title: '4-B. M114A1 複選題測驗',
      subtitle: '操作手冊士兵測考題庫',
      badge: '小測驗 ‧ 30題複選',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      icon: CheckCircle2,
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      description: '多選題小測驗，鍛鍊細節記憶（藥包顏色、射控校正要項、安全規定等），選項打亂與錯題解析',
      points: ['多重答案多維度複習', '計分標準與 Quizlet 體驗', '專屬錯題重測'],
      actionLabel: '開始複選小測驗',
      onClick: () => onStartQuiz({ type: 'multiple', count: 10 })
    },
    {
      id: 'quiz-all',
      category: 'quiz',
      title: '4-C. 全題庫綜合模擬測驗',
      subtitle: '103題完整實力驗收',
      badge: '小測驗 ‧ 綜合103題',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      icon: Sparkles,
      iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      description: '混合單選與複選題，自由設定測驗規模(10/25/50/全部)，選項打亂，附測驗計時與成績單',
      points: ['全真部隊測考模式', '成績合格評等 (特優/合格)', '匯出個人測驗報告'],
      actionLabel: '進入綜合測驗',
      onClick: () => onStartQuiz({ type: 'all', count: 25 })
    },

    // 選看文件類
    {
      id: 'op-gun-drill',
      category: 'elective',
      title: '砲操各砲手職責與用砲動作',
      subtitle: '一砲手至七砲手與瞄準手',
      badge: '選看 ‧ 完整文字',
      badgeColor: 'bg-stone-700 text-stone-300 border-stone-600',
      icon: FileText,
      iconBg: 'bg-stone-800 text-stone-300 border-stone-700',
      description: '零件箱取件配置、大架開架、駐鋤結合、砲長指揮分解口令完整文字排版',
      points: ['各砲手零件配賦表', '用砲階段指揮順序', '就砲位置指引'],
      actionLabel: '閱讀文字內容',
      onClick: () => onSelectOperation('gun-drill-duties')
    },
    {
      id: 'op-stowage',
      category: 'elective',
      title: '155榴砲操口令 M1A2版',
      subtitle: '收砲反順序操作手冊',
      badge: '選看 ‧ 完整文字',
      badgeColor: 'bg-stone-700 text-stone-300 border-stone-600',
      icon: FileText,
      iconBg: 'bg-stone-800 text-stone-300 border-stone-700',
      description: '收砲作業各砲手反向歸位操作、棘輪調整、方向2400與射角300歸定位口令',
      points: ['收砲反順序分解動作', '儀器歸零與裝箱', '抱拳姿勢規範'],
      actionLabel: '閱讀文字內容',
      onClick: () => onSelectOperation('gun-stowage-m1a2')
    },
    {
      id: 'op-misfire',
      category: 'elective',
      title: '實彈射擊故障排除：不發火與退彈',
      subtitle: '高風險科目緊急處置規範',
      badge: '選看 ‧ 完整文字',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      icon: AlertTriangle,
      iconBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      description: '未聞底火發火靜待2分鐘、已聞底火發火等10分鐘、退彈指定四員操作與安全防護',
      points: ['靜待時間嚴格規範', '水桶浸泡與防後洩', '退彈程序操作九步驟'],
      actionLabel: '閱讀文字內容',
      onClick: () => onSelectOperation('misfire-handling')
    },
    {
      id: 'op-specs',
      category: 'elective',
      title: 'M-155榴砲 基本諸元與砲教安全',
      subtitle: '口徑、射程、胎壓、象限儀',
      badge: '選看 ‧ 完整文字',
      badgeColor: 'bg-stone-700 text-stone-300 border-stone-600',
      icon: FileText,
      iconBg: 'bg-stone-800 text-stone-300 border-stone-700',
      description: '最大射程14600m、輪胎胎壓50磅、膛線48條右旋、空迴誤差消除等基礎知識速查',
      points: ['核心諸元數值速記', '防空迴操作口訣', '砲膛高熱保養禁忌'],
      actionLabel: '閱讀文字內容',
      onClick: () => onSelectOperation('artillery-specs-safety')
    },

    // 雲端資料夾與匯出
    {
      id: 'cloud-hub',
      category: 'elective',
      title: '雲端資料夾分類與全系統 JSON 匯出',
      subtitle: '供 GitHub 網頁前端直接調用',
      badge: '工具 ‧ 雲端/JSON',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      icon: FolderKanban,
      iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      description: '自動分類至虛擬雲端資料夾(01必修、02器材、03題庫等)，支援一鍵匯出完整 JSON 格式及單檔下載',
      points: ['分類資料夾層級樹狀檢視', '一鍵匯出前端調用 JSON', '單檔 TXT / JSON 下載'],
      actionLabel: '前往雲端資料夾',
      onClick: onOpenCloud
    }
  ];

  const filteredBubbles = bubbles.filter(b => {
    if (filter === 'all') return true;
    return b.category === filter;
  });

  return (
    <div className="space-y-6">
      {/* Banner / Hero Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 border border-stone-800 p-6 sm:p-8 shadow-xl">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>數位砲校自主研習平台 ‧ 支援 GitHub Pages 部署</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-100 tracking-tight leading-tight">
            155公厘牽引榴彈砲 (M114A1) <br className="hidden sm:inline" />
            <span className="text-emerald-400">砲操口令背誦</span> 與 <span className="text-amber-400">準則測考系統</span>
          </h1>
          <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
            全文件高精度掃描轉譯，分類收錄 <strong>班之編成</strong>、<strong>射擊任務</strong> 與 <strong>器材操作口令</strong> 之語音聽力背誦，
            並提供 <strong>103 題完整題庫</strong>（單選 73 題 / 複選 30 題）之 Quizlet 模式小測驗與錯題複習，
            隨時可匯出標準 JSON 格式供前端網站調用。
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onSelectRecitation('squad-formation')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm shadow-md shadow-emerald-900/30 transition-all hover:scale-102"
            >
              <Volume2 className="w-4 h-4" />
              <span>必修口令聽力訓練</span>
            </button>
            <button
              onClick={() => onStartQuiz({ type: 'all', count: 20 })}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-sm shadow-md shadow-amber-900/30 transition-all hover:scale-102"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>進入題庫小測驗 (103題)</span>
            </button>
            <button
              onClick={onOpenCloud}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-medium text-sm transition-all"
            >
              <Download className="w-4 h-4 text-blue-400" />
              <span>匯出 JSON 資料包</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-stone-800 pb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-stone-100 text-stone-900'
                : 'bg-stone-800/80 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
          >
            全部主題 ({bubbles.length})
          </button>
          <button
            onClick={() => setFilter('mandatory')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 ${
              filter === 'mandatory'
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-800/80 text-emerald-400 hover:bg-stone-800'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>必修背誦與語音 (5)</span>
          </button>
          <button
            onClick={() => setFilter('quiz')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 ${
              filter === 'quiz'
                ? 'bg-amber-600 text-stone-950 font-bold'
                : 'bg-stone-800/80 text-amber-400 hover:bg-stone-800'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>題庫小測驗 (3)</span>
          </button>
          <button
            onClick={() => setFilter('elective')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              filter === 'elective'
                ? 'bg-stone-700 text-stone-100'
                : 'bg-stone-800/80 text-stone-400 hover:bg-stone-800'
            }`}
          >
            選看內容與雲端 (5)
          </button>
        </div>

        <div className="text-xs text-stone-400 flex items-center gap-1">
          <span>點選方塊氣泡即可進入學習</span>
        </div>
      </div>

      {/* Bubble Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredBubbles.map((bubble) => {
          const IconComp = bubble.icon;
          return (
            <div
              key={bubble.id}
              onClick={bubble.onClick}
              className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-stone-900 border border-stone-800/80 hover:border-emerald-500/50 hover:bg-stone-850 hover:shadow-xl hover:shadow-black/40 transition-all duration-200 cursor-pointer text-left"
            >
              <div>
                {/* Card Top: Icon & Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className={`p-3 rounded-xl border ${bubble.iconBg} group-hover:scale-110 transition-transform`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${bubble.badgeColor}`}>
                    {bubble.badge}
                  </span>
                </div>

                {/* Subtitle & Title */}
                <div className="text-xs font-mono text-stone-400 mb-1">{bubble.subtitle}</div>
                <h3 className="text-lg font-bold text-stone-100 group-hover:text-emerald-400 transition-colors">
                  {bubble.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-sm text-stone-400 line-clamp-3 leading-relaxed">
                  {bubble.description}
                </p>

                {/* Highlights */}
                <div className="mt-4 space-y-1.5 pt-3 border-t border-stone-800/60">
                  {bubble.points.map((pt, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-stone-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                      <span className="truncate">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Action Link */}
              <div className="mt-5 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs font-semibold text-stone-300 group-hover:text-emerald-400">
                <span>{bubble.actionLabel}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
