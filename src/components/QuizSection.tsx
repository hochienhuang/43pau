import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Square, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Clock, 
  Award, 
  AlertCircle, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  Shuffle, 
  Filter, 
  BookOpen, 
  Layers,
  ChevronRight,
  Eye,
  Sparkles,
  Download
} from 'lucide-react';
import { Question, SINGLE_QUESTIONS, MULTIPLE_QUESTIONS } from '../data/questions.ts';

interface ShuffledQuestion {
  originalQuestion: Question;
  shuffledOptions: {
    originalIndex: number;
    text: string;
  }[];
}

interface QuizSectionProps {
  initialConfig?: {
    type?: 'single' | 'multiple' | 'all';
    count?: number;
  };
}

export const QuizSection: React.FC<QuizSectionProps> = ({ initialConfig }) => {
  // Quiz State
  const [quizState, setQuizState] = useState<'config' | 'running' | 'result'>('config');

  // Configuration settings
  const [selectedType, setSelectedType] = useState<'single' | 'multiple' | 'all'>(initialConfig?.type || 'all');
  const [selectedCount, setSelectedCount] = useState<number | 'all'>(initialConfig?.count || 20);
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | '易' | '中' | '難'>('all');
  const [shuffleOptions, setShuffleOptions] = useState<boolean>(true);
  const [shuffleQuestions, setShuffleQuestions] = useState<boolean>(true);

  // Active quiz session data
  const [questions, setQuestions] = useState<ShuffledQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number[]>>({}); // questionIndex -> array of originalIndices
  const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(new Set());
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Result stats
  const [scoreResult, setScoreResult] = useState<{
    totalQuestions: number;
    correctCount: number;
    wrongCount: number;
    scorePercent: number;
    wrongQuestions: {
      questionIndex: number;
      question: Question;
      userSelection: number[];
      correctAnswers: number[];
    }[];
  } | null>(null);

  // Result review filter
  const [resultFilter, setResultFilter] = useState<'wrong' | 'all'>('wrong');

  // Flashcard mode toggle
  const [isFlashcardMode, setIsFlashcardMode] = useState<boolean>(false);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);

  // Effect to update config if initialConfig changes
  useEffect(() => {
    if (initialConfig?.type) {
      setSelectedType(initialConfig.type);
    }
    if (initialConfig?.count) {
      setSelectedCount(initialConfig.count);
    }
  }, [initialConfig]);

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && quizState === 'running') {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, quizState]);

  // Helper to get questions based on type and difficulty
  const getPoolQuestions = (): Question[] => {
    let pool: Question[] = [];
    if (selectedType === 'single') {
      pool = [...SINGLE_QUESTIONS];
    } else if (selectedType === 'multiple') {
      pool = [...MULTIPLE_QUESTIONS];
    } else {
      pool = [...SINGLE_QUESTIONS, ...MULTIPLE_QUESTIONS];
    }

    if (difficultyFilter !== 'all') {
      pool = pool.filter(q => q.difficulty === difficultyFilter);
    }

    return pool;
  };

  const startQuiz = (overrideQuestions?: Question[]) => {
    let pool = overrideQuestions ? [...overrideQuestions] : getPoolQuestions();

    if (pool.length === 0) {
      alert('所選條件下無對應題目，請調整難度或題型篩選！');
      return;
    }

    // Shuffle questions if enabled
    if (shuffleQuestions) {
      pool = [...pool].sort(() => Math.random() - 0.5);
    }

    // Slice question count
    const limit = selectedCount === 'all' ? pool.length : Math.min(selectedCount, pool.length);
    const selectedPool = pool.slice(0, limit);

    // Shuffle options for each question (per requirement)
    const preparedQuestions: ShuffledQuestion[] = selectedPool.map(q => {
      const optionsWithIndex = q.options.map((opt, idx) => ({
        originalIndex: idx,
        text: opt
      }));

      if (shuffleOptions) {
        optionsWithIndex.sort(() => Math.random() - 0.5);
      }

      return {
        originalQuestion: q,
        shuffledOptions: optionsWithIndex
      };
    });

    setQuestions(preparedQuestions);
    setCurrentIndex(0);
    setUserAnswers({});
    setMarkedQuestions(new Set());
    setTimerSeconds(0);
    setIsTimerRunning(true);
    setQuizState('running');
    setScoreResult(null);
    setIsFlashcardMode(false);
    setIsCardFlipped(false);
  };

  const handleSelectOption = (originalIndex: number) => {
    const currentQ = questions[currentIndex].originalQuestion;
    const currentSelected = userAnswers[currentIndex] || [];

    if (currentQ.type === 'single') {
      // Single choice replace
      setUserAnswers(prev => ({
        ...prev,
        [currentIndex]: [originalIndex]
      }));
    } else {
      // Multiple choice toggle
      let updated: number[];
      if (currentSelected.includes(originalIndex)) {
        updated = currentSelected.filter(i => i !== originalIndex);
      } else {
        updated = [...currentSelected, originalIndex].sort((a, b) => a - b);
      }
      setUserAnswers(prev => ({
        ...prev,
        [currentIndex]: updated
      }));
    }
  };

  const toggleBookmark = () => {
    setMarkedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(currentIndex)) {
        next.delete(currentIndex);
      } else {
        next.add(currentIndex);
      }
      return next;
    });
  };

  const handleSubmitQuiz = () => {
    setIsTimerRunning(false);

    let correct = 0;
    const wrongList: {
      questionIndex: number;
      question: Question;
      userSelection: number[];
      correctAnswers: number[];
    }[] = [];

    questions.forEach((qItem, idx) => {
      const originalQ = qItem.originalQuestion;
      const userSel = (userAnswers[idx] || []).slice().sort((a, b) => a - b);
      const correctAns = originalQ.correctAnswers.slice().sort((a, b) => a - b);

      const isCorrect = userSel.length === correctAns.length &&
        userSel.every((val, i) => val === correctAns[i]);

      if (isCorrect) {
        correct++;
      } else {
        wrongList.push({
          questionIndex: idx,
          question: originalQ,
          userSelection: userSel,
          correctAnswers: correctAns
        });
      }
    });

    const total = questions.length;
    const percent = Math.round((correct / total) * 100);

    setScoreResult({
      totalQuestions: total,
      correctCount: correct,
      wrongCount: total - correct,
      scorePercent: percent,
      wrongQuestions: wrongList
    });

    setQuizState('result');
  };

  const handleRetestWrong = () => {
    if (!scoreResult || scoreResult.wrongQuestions.length === 0) return;
    const wrongOriginalQuestions = scoreResult.wrongQuestions.map(w => w.question);
    startQuiz(wrongOriginalQuestions);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  // 1. CONFIGURATION VIEW
  if (quizState === 'config') {
    const totalSingle = SINGLE_QUESTIONS.length;
    const totalMultiple = MULTIPLE_QUESTIONS.length;
    const currentPoolTotal = getPoolQuestions().length;

    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="rounded-2xl bg-stone-900 border border-stone-800 p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <CheckSquare className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-100">
                M114A1牽引式155公厘榴彈砲 測考題庫
              </h2>
              <p className="text-xs sm:text-sm text-stone-400">
                收錄準則士兵測考題庫（單選 73 題 / 複選 30 題，共 103 題完整題目）
              </p>
            </div>
          </div>

          <div className="space-y-6 mt-6 border-t border-stone-800 pt-6">
            {/* Step 1: Choose Question Type */}
            <div>
              <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block mb-2.5">
                步驟 1：選擇測驗題型
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedType('single')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedType === 'single'
                      ? 'bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/50 text-white'
                      : 'bg-stone-850 border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">單選題專區</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-amber-900/60 text-amber-300 border border-amber-700/60">
                      {totalSingle} 題
                    </span>
                  </div>
                  <p className="text-xs text-stone-400">四選一單選題，含基礎及進階諸元與故障判斷</p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedType('multiple')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedType === 'multiple'
                      ? 'bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/50 text-white'
                      : 'bg-stone-850 border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">複選題專區</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-amber-900/60 text-amber-300 border border-amber-700/60">
                      {totalMultiple} 題
                    </span>
                  </div>
                  <p className="text-xs text-stone-400">多選題，鍛鍊裝藥顏色、安全時間與檢查程序細節</p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedType('all')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedType === 'all'
                      ? 'bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/50 text-white'
                      : 'bg-stone-850 border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">全部題庫混合</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 border border-purple-700/60">
                      {totalSingle + totalMultiple} 題
                    </span>
                  </div>
                  <p className="text-xs text-stone-400">單選＋複選混合抽測，最完整的模擬驗收模式</p>
                </button>
              </div>
            </div>

            {/* Step 2: Choose Count */}
            <div>
              <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block mb-2.5">
                步驟 2：選擇測驗題數
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {[5, 10, 20, 50, 'all'].map((cnt) => {
                  const isSelected = selectedCount === cnt;
                  const label = cnt === 'all' ? `全做 (${currentPoolTotal}題)` : `${cnt} 題`;
                  return (
                    <button
                      key={cnt.toString()}
                      type="button"
                      onClick={() => setSelectedCount(cnt as any)}
                      className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                        isSelected
                          ? 'bg-amber-600 text-stone-950 border-amber-500 shadow-lg shadow-amber-950/50 font-bold'
                          : 'bg-stone-850 border-stone-800 text-stone-300 hover:bg-stone-800'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Difficulty Filter */}
            <div>
              <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block mb-2.5">
                步驟 3：難度篩選
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {(['all', '易', '中', '難'] as const).map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setDifficultyFilter(diff)}
                    className={`px-4 py-2 rounded-lg text-xs font-medium border transition-colors ${
                      difficultyFilter === diff
                        ? 'bg-stone-700 text-stone-100 border-stone-600'
                        : 'bg-stone-850 text-stone-400 border-stone-800 hover:text-stone-200'
                    }`}
                  >
                    {diff === 'all' ? '全部難度' : `難度：${diff}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Shuffling & Quizlet Options */}
            <div className="p-4 rounded-xl bg-stone-850/70 border border-stone-800 space-y-3">
              <div className="text-xs font-bold text-stone-300 uppercase tracking-wider">
                測驗環境設定
              </div>
              <div className="flex items-center justify-between flex-wrap gap-4 text-xs sm:text-sm text-stone-300">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shuffleOptions}
                    onChange={(e) => setShuffleOptions(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 bg-stone-800 border-stone-700"
                  />
                  <span>選項順序隨機打亂 (防死背選項位置)</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shuffleQuestions}
                    onChange={(e) => setShuffleQuestions(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 bg-stone-800 border-stone-700"
                  />
                  <span>題目出題順序打亂</span>
                </label>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 flex items-center justify-end gap-3">
            <button
              onClick={() => startQuiz()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-base shadow-xl shadow-amber-950/40 transition-all flex items-center justify-center gap-2"
            >
              <span>開始測驗</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. QUIZ RUNNING VIEW (Quizlet style card)
  if (quizState === 'running' && questions.length > 0) {
    const qItem = questions[currentIndex];
    const q = qItem.originalQuestion;
    const currentSelected = userAnswers[currentIndex] || [];
    const isAnswered = currentSelected.length > 0;
    const isBookmarked = markedQuestions.has(currentIndex);

    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Top Status Bar: Progress, Timer, Bookmark */}
        <div className="flex items-center justify-between flex-wrap gap-3 bg-stone-900 border border-stone-800 px-5 py-3 rounded-2xl">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-stone-200">
              第 <span className="text-amber-400 text-lg">{currentIndex + 1}</span> / {questions.length} 題
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
              {q.type === 'single' ? '單選題' : '複選題'}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full border ${
              q.difficulty === '易' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
              q.difficulty === '中' ? 'bg-amber-950 text-amber-300 border-amber-800' :
              'bg-rose-950 text-rose-300 border-rose-800'
            }`}>
              難度：{q.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-stone-400 font-mono bg-stone-850 px-3 py-1.5 rounded-lg border border-stone-800">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{formatTime(timerSeconds)}</span>
            </div>

            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                isBookmarked
                  ? 'bg-amber-900/40 text-amber-300 border-amber-600'
                  : 'bg-stone-850 text-stone-400 border-stone-800 hover:text-stone-200'
              }`}
              title="標記此題"
            >
              ★ <span className="hidden sm:inline">標記</span>
            </button>

            <button
              onClick={handleSubmitQuiz}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-colors"
            >
              交卷評分
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-amber-500 h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Main Question Card (Quizlet Style) */}
        <div className="rounded-2xl bg-stone-900 border border-stone-800 shadow-xl p-6 sm:p-8 space-y-6">
          {/* Question Text & Source */}
          <div>
            <div className="text-xs text-stone-400 font-mono mb-2 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-stone-500" />
              <span>出處：{q.source}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-100 leading-relaxed">
              {q.question}
            </h3>
            {q.type === 'multiple' && (
              <p className="mt-2 text-xs font-semibold text-amber-400 bg-amber-950/40 px-3 py-1 rounded-md inline-block border border-amber-800/50">
                【複選題：此題有多個正確答案，請逐一勾選】
              </p>
            )}
          </div>

          {/* Options List (Shuffled) */}
          <div className="space-y-3">
            {qItem.shuffledOptions.map((opt, optIndex) => {
              const isSelected = currentSelected.includes(opt.originalIndex);
              const letter = String.fromCharCode(65 + optIndex); // A, B, C, D

              return (
                <button
                  key={opt.originalIndex}
                  type="button"
                  onClick={() => handleSelectOption(opt.originalIndex)}
                  className={`w-full p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    isSelected
                      ? 'bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/40 text-stone-100 shadow-md'
                      : 'bg-stone-850 border-stone-800 text-stone-300 hover:bg-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5 ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 font-extrabold'
                      : 'bg-stone-800 text-stone-400 border border-stone-700'
                  }`}>
                    {q.type === 'single' ? letter : (isSelected ? '✓' : letter)}
                  </div>
                  <span className="text-sm sm:text-base leading-relaxed flex-1">
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom Card Navigation */}
          <div className="pt-4 border-t border-stone-800 flex items-center justify-between flex-wrap gap-3">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-xl bg-stone-850 hover:bg-stone-800 text-stone-300 disabled:opacity-30 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>上一題</span>
            </button>

            {/* Questions Quick Palette Popup or dots */}
            <div className="text-xs text-stone-400">
              已作答: {Object.keys(userAnswers).filter(k => (userAnswers[Number(k)] || []).length > 0).length} / {questions.length} 題
            </div>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs sm:text-sm font-bold shadow-md transition-colors flex items-center gap-1.5"
              >
                <span>下一題</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-md transition-colors flex items-center gap-1.5"
              >
                <span>完成並評分</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Jump Grid */}
        <div className="p-4 rounded-xl bg-stone-900 border border-stone-800">
          <div className="text-xs font-bold text-stone-400 mb-2.5">
            題目快速跳轉面板
          </div>
          <div className="flex flex-wrap gap-1.5">
            {questions.map((_, idx) => {
              const answered = (userAnswers[idx] || []).length > 0;
              const isCurrent = idx === currentIndex;
              const marked = markedQuestions.has(idx);

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all relative ${
                    isCurrent
                      ? 'ring-2 ring-amber-400 bg-stone-100 text-stone-950'
                      : answered
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-stone-850 text-stone-400 border border-stone-800 hover:bg-stone-800'
                  }`}
                >
                  {idx + 1}
                  {marked && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 3. RESULTS & GRADING VIEW (With wrong questions review below score as requested)
  if (quizState === 'result' && scoreResult) {
    const isPassing = scoreResult.scorePercent >= 70;
    const isPerfect = scoreResult.scorePercent === 100;

    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Score & Evaluation Card */}
        <div className="rounded-2xl bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 border border-stone-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-2 bg-stone-800 text-stone-300 border border-stone-700">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>測驗成績評定報告</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-100">
                {isPerfect ? '🎯 滿分特優！精熟掌握' : isPassing ? '🎖️ 合格通過！成績優異' : '⚠️ 需加強複習！未達合格'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 mt-1">
                測驗耗時：{formatTime(timerSeconds)} ‧ 答對 {scoreResult.correctCount} 題，答錯 {scoreResult.wrongCount} 題
              </p>
            </div>

            {/* Score Badge */}
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-stone-950/80 border border-stone-800 shadow-inner min-w-[140px]">
              <span className="text-4xl sm:text-5xl font-black text-amber-400 font-mono tracking-tight">
                {scoreResult.scorePercent}
              </span>
              <span className="text-xs text-stone-400 font-bold mt-1">得分百分比</span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="mt-6 pt-5 border-t border-stone-800 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              {scoreResult.wrongQuestions.length > 0 && (
                <button
                  onClick={handleRetestWrong}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>僅重測錯題 ({scoreResult.wrongQuestions.length}題)</span>
                </button>
              )}

              <button
                onClick={() => setQuizState('config')}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5"
              >
                <Shuffle className="w-4 h-4" />
                <span>重新隨機測驗</span>
              </button>
            </div>

            <div className="text-xs text-stone-400">
              參考 Quizlet 學習法：針對下方錯題逐一檢討，加深記憶。
            </div>
          </div>
        </div>

        {/* WRONG QUESTIONS REVIEW SECTION (Directly below the score per user prompt) */}
        <div className="rounded-2xl bg-stone-900 border border-stone-800 shadow-xl overflow-hidden">
          <div className="p-5 sm:p-6 bg-stone-850 border-b border-stone-800 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-lg font-bold text-stone-100 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-400" />
                <span>錯誤題目檢討與複習</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 font-mono">
                  {scoreResult.wrongQuestions.length} 題
                </span>
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                評分檢視：核對您的作答與標準解答，包含原手冊頁次出處與詳解
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setResultFilter('wrong')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  resultFilter === 'wrong'
                    ? 'bg-rose-600 text-white'
                    : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                僅看錯題 ({scoreResult.wrongQuestions.length})
              </button>
              <button
                onClick={() => setResultFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  resultFilter === 'all'
                    ? 'bg-stone-700 text-stone-100'
                    : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                看全部題目 ({questions.length})
              </button>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-6">
            {scoreResult.wrongQuestions.length === 0 && resultFilter === 'wrong' ? (
              <div className="text-center py-12 text-stone-400">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-base font-bold text-stone-200">太棒了！沒有任何錯誤題目！</h4>
                <p className="text-xs mt-1">您在此次測驗中全數答對，熟練度達 100%。</p>
              </div>
            ) : (
              (resultFilter === 'wrong'
                ? scoreResult.wrongQuestions
                : questions.map((q, idx) => {
                    const originalQ = q.originalQuestion;
                    const userSel = (userAnswers[idx] || []).slice().sort((a, b) => a - b);
                    const correctAns = originalQ.correctAnswers.slice().sort((a, b) => a - b);
                    return {
                      questionIndex: idx,
                      question: originalQ,
                      userSelection: userSel,
                      correctAnswers: correctAns
                    };
                  })
              ).map((item, itemIdx) => {
                const q = item.question;
                const isCorrect = item.userSelection.length === item.correctAnswers.length &&
                  item.userSelection.every((val, i) => val === item.correctAnswers[i]);

                return (
                  <div
                    key={itemIdx}
                    className={`p-5 rounded-xl border transition-all ${
                      isCorrect
                        ? 'bg-stone-850/50 border-emerald-900/50'
                        : 'bg-rose-950/15 border-rose-900/60'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                          isCorrect
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}>
                          {isCorrect ? '✓ 正確' : '✗ 答錯'}
                        </span>
                        <span className="text-xs text-stone-400 font-mono">
                          第 {item.questionIndex + 1} 題 ({q.type === 'single' ? '單選' : '複選'} ‧ 難度：{q.difficulty})
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-500 font-mono">
                        {q.source}
                      </span>
                    </div>

                    {/* Question text */}
                    <h4 className="text-base font-bold text-stone-100 mt-2 mb-3">
                      {q.question}
                    </h4>

                    {/* Options list with indicators */}
                    <div className="space-y-2 mb-4">
                      {q.options.map((opt, optIdx) => {
                        const wasChosenByUser = item.userSelection.includes(optIdx);
                        const isCorrectAnswer = item.correctAnswers.includes(optIdx);

                        let badgeColor = 'bg-stone-800/80 text-stone-400 border-stone-800';
                        if (isCorrectAnswer) {
                          badgeColor = 'bg-emerald-950/70 text-emerald-300 border-emerald-700/80 font-semibold';
                        } else if (wasChosenByUser && !isCorrectAnswer) {
                          badgeColor = 'bg-rose-950/70 text-rose-300 border-rose-700/80 line-through';
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-2.5 rounded-lg border text-xs sm:text-sm flex items-start gap-2.5 ${badgeColor}`}
                          >
                            <span className="font-mono font-bold mt-0.5">
                              ({optIdx + 1})
                            </span>
                            <span className="flex-1">{opt}</span>
                            {isCorrectAnswer && (
                              <span className="text-xs text-emerald-400 font-bold px-1.5 py-0.2 rounded bg-emerald-950 border border-emerald-800">
                                正確解答
                              </span>
                            )}
                            {wasChosenByUser && !isCorrectAnswer && (
                              <span className="text-xs text-rose-400 font-bold px-1.5 py-0.2 rounded bg-rose-950 border border-rose-800">
                                您的選項 (錯誤)
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {q.explanation && (
                      <div className="p-3 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-300 flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-amber-300">【解題要點】</span>
                          <span className="ml-1">{q.explanation}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
