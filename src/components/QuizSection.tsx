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
  Download,
  Trophy,
  User,
  Medal,
  Flame,
  FileCheck,
  Code,
  Users,
  Check,
  X,
  Cloud,
  UserCheck
} from 'lucide-react';
import { Question, SINGLE_QUESTIONS, MULTIPLE_QUESTIONS } from '../data/questions.ts';
import { UserStatsManager, UserStats } from '../utils/userStats.ts';
import { LeaderboardModal } from './LeaderboardModal.tsx';
import { firebaseSync } from '../services/firebase.ts';

interface ShuffledQuestion {
  originalQuestion: Question;
  shuffledOptions: {
    originalIndex: number;
    text: string;
  }[];
}

interface QuizSectionProps {
  initialConfig?: {
    type?: 'formal' | 'single' | 'multiple' | 'all';
    count?: number;
  };
  onBack?: () => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ initialConfig, onBack }) => {
  // User Nickname & Guest State
  const [nickname, setNickname] = useState<string>(
    UserStatsManager.getCurrentNickname() || (UserStatsManager.isGuestMode() ? UserStatsManager.GUEST_NICKNAME : '新進砲手')
  );
  const [nicknameInput, setNicknameInput] = useState<string>('');
  const [isSettingNickname, setIsSettingNickname] = useState<boolean>(
    !UserStatsManager.getCurrentNickname() && !UserStatsManager.isGuestMode()
  );
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [leaderboardTab, setLeaderboardTab] = useState<'leaderboard' | 'wrongQuestions' | 'jsonView' | 'cloudSync'>('leaderboard');
  const [cloudStatus, setCloudStatus] = useState(() => firebaseSync.getStatus());

  const isGuest = UserStatsManager.isGuestMode() || nickname === UserStatsManager.GUEST_NICKNAME;

  useEffect(() => {
    const unsub = firebaseSync.onStatusChange((s) => {
      setCloudStatus({ ...firebaseSync.getStatus(), ...s });
    });
    return unsub;
  }, []);

  // Explicit Nickname Prompt Modal before entering quiz (never auto-open if in Guest mode)
  const [showNicknameModal, setShowNicknameModal] = useState<boolean>(
    !UserStatsManager.getCurrentNickname() && !UserStatsManager.isGuestMode()
  );
  const [customNickInput, setCustomNickInput] = useState<string>('');
  const [pendingQuizStart, setPendingQuizStart] = useState<Question[] | null | 'default'>(null);

  // Quiz State
  const [quizState, setQuizState] = useState<'config' | 'running' | 'result'>('config');

  // Configuration settings
  const [selectedType, setSelectedType] = useState<'formal' | 'single' | 'multiple' | 'all'>(
    (initialConfig?.type as any) || 'formal'
  );
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
    singleCorrect: number;
    multipleCorrect: number;
    pointsEarned: number;
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

  // Effect to update config if initialConfig changes
  useEffect(() => {
    if (initialConfig?.type) {
      setSelectedType(initialConfig.type as any);
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

  const handleSaveNickname = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalNick = nicknameInput.trim() || '砲兵戰士';
    UserStatsManager.setCurrentNickname(finalNick);
    setNickname(finalNick);
    setIsSettingNickname(false);
  };

  const handleConfirmNicknameModal = (chosenNick: string) => {
    const finalNick = chosenNick.trim() || '砲兵戰士';
    // If migrating from guest mode, transfer all points and sync to cloud
    if (isGuest) {
      const migrated = UserStatsManager.migrateGuestToNickname(finalNick);
      if (migrated) {
        firebaseSync.syncUserToCloud(migrated).catch(() => {});
      }
    } else {
      UserStatsManager.setCurrentNickname(finalNick);
    }
    setNickname(finalNick);
    setShowNicknameModal(false);

    if (pendingQuizStart) {
      const override = pendingQuizStart === 'default' ? undefined : pendingQuizStart;
      setPendingQuizStart(null);
      executeStartQuiz(override);
    }
  };

  const handleStartAsGuest = () => {
    UserStatsManager.setGuestMode(true);
    setNickname(UserStatsManager.GUEST_NICKNAME);
    setShowNicknameModal(false);

    if (pendingQuizStart) {
      const override = pendingQuizStart === 'default' ? undefined : pendingQuizStart;
      setPendingQuizStart(null);
      executeStartQuiz(override);
    } else {
      executeStartQuiz();
    }
  };

  const handleCancelOrBackNicknameModal = () => {
    setShowNicknameModal(false);
    const wasPending = !!pendingQuizStart;
    setPendingQuizStart(null);
    if (!wasPending && onBack) {
      onBack();
    }
  };

  const startQuiz = (overrideQuestions?: Question[]) => {
    // If already in Guest mode, start immediately without prompt!
    if (UserStatsManager.isGuestMode() || nickname === UserStatsManager.GUEST_NICKNAME) {
      executeStartQuiz(overrideQuestions);
      return;
    }
    const activeNick = UserStatsManager.getCurrentNickname();
    if (!activeNick || activeNick === '新進砲手') {
      setPendingQuizStart(overrideQuestions || 'default');
      setCustomNickInput(activeNick && activeNick !== '新進砲手' ? activeNick : '');
      setShowNicknameModal(true);
      return;
    }
    executeStartQuiz(overrideQuestions);
  };

  const executeStartQuiz = (overrideQuestions?: Question[]) => {
    let selectedPool: Question[] = [];

    if (overrideQuestions) {
      selectedPool = [...overrideQuestions];
    } else if (selectedType === 'formal') {
      // Formal exam per user request:
      // 「正式考試模擬只會有二十題單選題與十題複選 題目隨機抽選」
      // 「正式考試模擬的複選題要集中在最後面」
      let pickedSingles = [...SINGLE_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 20);
      let pickedMultiples = [...MULTIPLE_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 10);
      
      if (shuffleQuestions) {
        pickedSingles = [...pickedSingles].sort(() => Math.random() - 0.5);
        pickedMultiples = [...pickedMultiples].sort(() => Math.random() - 0.5);
      }
      
      // Singles 1~20 first, followed by Multiples 21~30 strictly at the end
      selectedPool = [...pickedSingles, ...pickedMultiples];
    } else {
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

      if (pool.length === 0) {
        alert('所選條件下無對應題目，請調整篩選條件！');
        return;
      }

      if (shuffleQuestions) {
        pool = [...pool].sort(() => Math.random() - 0.5);
      }

      const limit = selectedCount === 'all' ? pool.length : Math.min(selectedCount, pool.length);
      selectedPool = pool.slice(0, limit);
    }

    // Shuffle options for each question
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
  };

  const handleSelectOption = (originalIndex: number) => {
    const currentQ = questions[currentIndex].originalQuestion;
    const currentSelected = userAnswers[currentIndex] || [];

    if (currentQ.type === 'single') {
      setUserAnswers(prev => ({
        ...prev,
        [currentIndex]: [originalIndex]
      }));
    } else {
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
    let singleCorrect = 0;
    let multipleCorrect = 0;

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
        if (originalQ.type === 'single') {
          singleCorrect++;
        } else {
          multipleCorrect++;
        }
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

    // Record stats to localStorage & update leaderboard (單選 +1, 多選 +1.5, 累積)
    const effectiveNickname = nickname.trim() || '砲兵戰士';
    const modeName = selectedType === 'formal' ? '國軍正式模擬考 (30題)' :
      selectedType === 'single' ? '單選題測驗' :
      selectedType === 'multiple' ? '複選題測驗' : '全題庫混合測驗';

    const { pointsEarned, updatedStats } = UserStatsManager.recordQuizCompletion({
      nickname: effectiveNickname,
      mode: selectedType === 'formal' ? 'formal' : (selectedType as any),
      modeName,
      singleCorrect,
      multipleCorrect,
      wrongQuestions: wrongList.map(w => ({
        questionId: w.question.id,
        type: w.question.type,
        questionText: w.question.question,
        options: w.question.options,
        correctAnswers: w.question.correctAnswers,
        source: w.question.source,
        difficulty: w.question.difficulty,
        explanation: w.question.explanation
      })),
      totalQuestions: total,
      scorePercent: percent
    });

    // Real-time Cloud Firestore synchronization
    try {
      firebaseSync.syncUserToCloud(updatedStats).catch((err) => {
        console.warn('Firebase sync notice:', err);
      });
      firebaseSync.recordTestSubmission({
        nickname: effectiveNickname,
        mode: selectedType === 'formal' ? 'formal' : (selectedType as any),
        modeName,
        scorePercent: percent,
        pointsEarned,
        correctCount: correct,
        totalQuestions: total
      }).catch((err) => {
        console.warn('Firebase record submission notice:', err);
      });
    } catch {
      // safe fallback
    }

    setScoreResult({
      totalQuestions: total,
      correctCount: correct,
      wrongCount: total - correct,
      singleCorrect,
      multipleCorrect,
      pointsEarned,
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

  const currentUserStats = UserStatsManager.getUser(nickname);

  // 1. CONFIGURATION VIEW
  if (quizState === 'config') {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        {onBack && (
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900/90 hover:bg-stone-850 text-stone-400 hover:text-amber-400 border border-stone-800 text-xs font-semibold transition-colors shadow-sm group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-amber-400" />
              <span>回上一頁 (首頁主題方塊)</span>
            </button>
          </div>
        )}

        {/* Nickname & Leaderboard Bar */}
        <div className="rounded-2xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-stone-400">當前測考學員</div>
              {isGuest ? (
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-600/40 text-xs font-bold flex items-center gap-1.5 shadow-sm">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>訪客模式 (Guest)</span>
                  </span>
                  <span className="text-xs text-stone-400">（免輸入暱稱，本地暢快刷題）</span>
                  <button
                    onClick={() => {
                      setCustomNickInput('');
                      setShowNicknameModal(true);
                    }}
                    className="text-xs text-amber-400 hover:underline font-bold ml-1"
                  >
                    登記正式學員
                  </button>
                </div>
              ) : !isSettingNickname ? (
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <span className="text-base font-bold text-stone-100">{nickname}</span>
                  {currentUserStats && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
                      累計點數：{currentUserStats.totalPoints} 分
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setNicknameInput(nickname);
                      setIsSettingNickname(true);
                    }}
                    className="text-xs text-amber-400 hover:underline ml-1"
                  >
                    更改
                  </button>
                  <button
                    onClick={() => {
                      UserStatsManager.setGuestMode(true);
                      setNickname(UserStatsManager.GUEST_NICKNAME);
                    }}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-stone-800 hover:bg-stone-750 text-stone-400 hover:text-stone-200 border border-stone-700 ml-1 transition-colors"
                    title="切換成訪客免暱稱模式"
                  >
                    切為訪客模式
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSaveNickname} className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    required
                    placeholder="輸入學員暱稱或呼號..."
                    value={nicknameInput}
                    onChange={(e) => setNicknameInput(e.target.value)}
                    className="px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-700 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold"
                  >
                    儲存
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
            <button
              onClick={() => {
                setLeaderboardTab('cloudSync');
                setShowLeaderboard(true);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md border ${
                cloudStatus.isConnected
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/80'
                  : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-750'
              }`}
              title="查看跨手機全連即時連線同步狀態"
            >
              <Cloud className={`w-4 h-4 ${cloudStatus.isConnected ? 'text-emerald-400 animate-pulse' : 'text-stone-400'}`} />
              <span>{cloudStatus.isConnected ? '雲端即時連線 🟢' : '雲端跨手機同步 ☁️'}</span>
            </button>

            <button
              onClick={() => {
                setLeaderboardTab('leaderboard');
                setShowLeaderboard(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>排行榜與歷史錯題本</span>
            </button>
          </div>
        </div>

        {/* Quiz Setup Card */}
        <div className="rounded-2xl bg-stone-900 border border-stone-800 p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <CheckSquare className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-100">
                M114A1 牽引式 155 公厘榴彈砲 準則測考
              </h2>
              <p className="text-xs sm:text-sm text-stone-400">
                收錄準則士兵測考題庫（單選 73 題 / 複選 30 題，全真 103 題）
              </p>
            </div>
          </div>

          <div className="space-y-6 mt-6 border-t border-stone-800 pt-6">
            {/* Step 1: Choose Question Type (Highlighted Formal Exam Simulation) */}
            <div>
              <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block mb-2.5">
                步驟 1：選擇測驗模式
              </label>
              
              {/* Featured: Formal Exam Simulation Button */}
              <div
                onClick={() => setSelectedType('formal')}
                className={`p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all mb-3 relative overflow-hidden ${
                  selectedType === 'formal'
                    ? 'bg-gradient-to-r from-amber-950/60 via-stone-850 to-amber-950/40 border-amber-500 ring-2 ring-amber-500/50 shadow-xl'
                    : 'bg-stone-850 border-stone-750 hover:border-amber-600/60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
                      <Medal className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-base sm:text-lg text-amber-300">
                          🎖️ 國軍正式考試模擬
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-600 text-stone-950 font-bold uppercase">
                          準則測驗
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-300 mt-1">
                        依規定<strong>隨機抽選 20 題單選題 ＋ 10 題複選題</strong>（複選題集中於最後第 21～30 題，共 30 題），全真計時與模擬合格驗收！
                      </p>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <span className="text-xs font-mono px-2 py-1 rounded bg-stone-900 border border-stone-800 text-amber-400 font-bold">
                      合計 30 題
                    </span>
                  </div>
                </div>
              </div>

              {/* Other Practice Modes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedType('single')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedType === 'single'
                      ? 'bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/50 text-white'
                      : 'bg-stone-850 border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">單選題專區</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-amber-900/60 text-amber-300 border border-amber-700/60 font-mono">
                      73 題
                    </span>
                  </div>
                  <p className="text-xs text-stone-400">自主練習單選題（答對每題 +1 分）</p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedType('multiple')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedType === 'multiple'
                      ? 'bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/50 text-white'
                      : 'bg-stone-850 border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">複選題專區</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-amber-900/60 text-amber-300 border border-amber-700/60 font-mono">
                      30 題
                    </span>
                  </div>
                  <p className="text-xs text-stone-400">自主練習複選題（答對每題 +1.5 分）</p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedType('all')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedType === 'all'
                      ? 'bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/50 text-white'
                      : 'bg-stone-850 border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">全部題庫混合</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 border border-purple-700/60 font-mono">
                      103 題
                    </span>
                  </div>
                  <p className="text-xs text-stone-400">單選＋複選自選題數練習</p>
                </button>
              </div>
            </div>

            {/* Step 2: Choose Count (Only if not formal) */}
            {selectedType !== 'formal' && (
              <div>
                <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block mb-2.5">
                  步驟 2：選擇測驗題數
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {[5, 10, 20, 50, 'all'].map((cnt) => {
                    const isSelected = selectedCount === cnt;
                    const label = cnt === 'all' ? '全部做完' : `${cnt} 題`;
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
            )}

            {/* Step 3: Difficulty Filter (Only if not formal) */}
            {selectedType !== 'formal' && (
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
            )}

            {/* Step 4: Shuffling & Scoring Rules */}
            <div className="p-4 rounded-xl bg-stone-850/70 border border-stone-800 space-y-3">
              <div className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center justify-between">
                <span>測驗環境與計分規範</span>
                <span className="text-amber-400 font-mono text-[11px]">單選 +1 分 / 多選 +1.5 分</span>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-4 text-xs sm:text-sm text-stone-300">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shuffleOptions}
                    onChange={(e) => setShuffleOptions(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 bg-stone-800 border-stone-700"
                  />
                  <span>選項順序隨機打亂（防死記位置）</span>
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
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-extrabold text-base shadow-xl shadow-amber-950/40 transition-all flex items-center justify-center gap-2"
            >
              <span>{selectedType === 'formal' ? '開始國軍正式模擬考 (30題)' : '開始小測驗'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Explicit Nickname Modal Before Quiz */}
        {showNicknameModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-md bg-stone-900 border border-stone-700 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-5">
              {/* Back to Previous Step/Page Arrow Header */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <button
                  type="button"
                  onClick={handleCancelOrBackNicknameModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-850 hover:bg-stone-800 text-stone-300 hover:text-amber-400 border border-stone-750 transition-all text-xs font-semibold group shadow-sm"
                  title="回上一頁"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-amber-400" />
                  <span>回上一頁</span>
                </button>
                <span className="text-[11px] text-stone-500 font-mono">測考學員登記</span>
                <button
                  type="button"
                  onClick={handleCancelOrBackNicknameModal}
                  className="p-1.5 text-stone-400 hover:text-stone-200 hover:bg-stone-800 rounded-lg transition-colors"
                  title="關閉返回"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-100">
                    請輸入測考學員暱稱 / 呼號
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    進入小測驗前請先登記您的學員身份
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800 text-xs text-stone-300 space-y-2">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>榮譽排行榜計分與錯題規範：</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-stone-400">
                  <li>單選題答對 1 題得 <strong className="text-emerald-400">1 分</strong></li>
                  <li>多選題答對 1 題得 <strong className="text-cyan-400">1.5 分</strong></li>
                  <li>僅計答對題數並<strong className="text-amber-300">持續累積</strong>登錄排行榜</li>
                  <li>自動記錄錯題題目與<strong className="text-rose-400">累計答錯次數</strong>供個人隨時複習</li>
                </ul>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!customNickInput.trim()) return;
                  handleConfirmNicknameModal(customNickInput.trim());
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    學員暱稱（如「信管手阿憨」、「發射手龍寶」或部隊代號）
                  </label>
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder="請輸入學員暱稱（如：信管手阿憨、發射手龍寶）..."
                    value={customNickInput}
                    onChange={(e) => setCustomNickInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                  <div className="flex flex-wrap gap-1.5 items-center mt-2">
                    <span className="text-[11px] text-stone-500">快速範例：</span>
                    {['信管手阿憨', '發射手龍寶'].map((sample) => (
                      <button
                        key={sample}
                        type="button"
                        onClick={() => setCustomNickInput(sample)}
                        className="px-2 py-0.5 rounded-md bg-stone-850 hover:bg-stone-800 text-amber-400 border border-stone-750 text-xs transition-colors"
                      >
                        {sample}
                      </button>
                    ))}
                  </div>
                </div>

                {UserStatsManager.getAllNicknames().length > 0 && (
                  <div>
                    <span className="text-[11px] text-stone-500 block mb-1.5">
                      或直接點選切換現有學員：
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {UserStatsManager.getAllNicknames().slice(0, 6).map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => {
                            setCustomNickInput(n);
                            handleConfirmNicknameModal(n);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-stone-850 hover:bg-stone-800 text-stone-300 border border-stone-750 text-xs transition-colors"
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between gap-2.5">
                  <button
                    type="button"
                    onClick={handleCancelOrBackNicknameModal}
                    className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-white border border-stone-700 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-sm group"
                  >
                    <ArrowLeft className="w-4 h-4 text-amber-400 transition-transform group-hover:-translate-x-0.5" />
                    <span>回上一頁</span>
                  </button>
                  <button
                    type="submit"
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-950/40 flex items-center justify-center gap-2"
                  >
                    <span>確認並進入測考</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Guest Mode Direct Access */}
              <div className="pt-2 border-t border-stone-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-stone-500">不想輸入暱稱？可選擇：</span>
                  <span className="text-[10px] text-emerald-400/80 font-mono">免填寫 ‧ 本地練習</span>
                </div>
                <button
                  type="button"
                  onClick={handleStartAsGuest}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 hover:text-emerald-200 border border-emerald-600/40 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md group"
                >
                  <UserCheck className="w-4 h-4 text-emerald-400 transition-transform group-hover:scale-110" />
                  <span>以【訪客模式】直接開始（免輸入暱稱）</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Modal */}
        <LeaderboardModal
          isOpen={showLeaderboard}
          initialTab={leaderboardTab}
          onClose={() => setShowLeaderboard(false)}
          currentNickname={nickname}
          onSwitchNickname={(newNick) => {
            UserStatsManager.setCurrentNickname(newNick);
            setNickname(newNick);
          }}
          onStartRetest={(questions) => startQuiz(questions)}
        />
      </div>
    );
  }

  // 2. QUIZ RUNNING VIEW
  if (quizState === 'running' && questions.length > 0) {
    const qItem = questions[currentIndex];
    const q = qItem.originalQuestion;
    const currentSelected = userAnswers[currentIndex] || [];
    const isBookmarked = markedQuestions.has(currentIndex);

    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Top Status Bar: Progress, Timer, Bookmark */}
        <div className="flex items-center justify-between flex-wrap gap-3 bg-stone-900 border border-stone-800 px-5 py-3 rounded-2xl">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-bold text-stone-200">
              第 <span className="text-amber-400 text-lg font-mono">{currentIndex + 1}</span> / {questions.length} 題
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
              {q.type === 'single' ? '單選題 (答對+1分)' : '複選題 (答對+1.5分)'}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full border ${
              q.difficulty === '易' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
              q.difficulty === '中' ? 'bg-amber-950 text-amber-300 border-amber-800' :
              'bg-rose-950 text-rose-300 border-rose-800'
            }`}>
              難度：{q.difficulty}
            </span>
            {selectedType === 'formal' && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold hidden md:inline-flex items-center gap-1">
                <Medal className="w-3 h-3 text-amber-400" />
                <span>國軍正式模擬考 (20單選+10複選)</span>
              </span>
            )}
            <span className="text-xs text-stone-400 font-mono hidden sm:inline">
              學員：<strong className="text-emerald-300">{nickname}</strong>
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
              const letter = String.fromCharCode(65 + optIndex);

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
                <span>交卷並評分</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Jump Grid */}
        <div className="p-4 rounded-xl bg-stone-900 border border-stone-800">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2.5">
            <span className="text-xs font-bold text-stone-400">
              題目快速跳轉面板
            </span>
            {selectedType === 'formal' && (
              <span className="text-[11px] px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/50 font-mono font-medium">
                第 1～20 題：單選 ｜ 第 21～30 題：複選（集中末段）
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {questions.map((qItem, idx) => {
              const answered = (userAnswers[idx] || []).length > 0;
              const isCurrent = idx === currentIndex;
              const marked = markedQuestions.has(idx);
              const isMultiple = qItem.originalQuestion.type === 'multiple';

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
                  title={`第 ${idx + 1} 題（${isMultiple ? '複選題' : '單選題'}）`}
                >
                  {idx + 1}
                  {marked && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" />
                  )}
                  {isMultiple && (
                    <span className="absolute -bottom-1 -right-0.5 text-[8px] px-0.5 rounded bg-amber-500/90 text-stone-950 font-black leading-none pointer-events-none">
                      複
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 3. RESULTS & GRADING VIEW
  if (quizState === 'result' && scoreResult) {
    const isPassing = scoreResult.scorePercent >= 70;
    const isPerfect = scoreResult.scorePercent === 100;
    const latestUser = UserStatsManager.getUser(nickname);

    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Score & Evaluation Card */}
        <div className="rounded-2xl bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 border border-stone-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-2 bg-stone-800 text-stone-300 border border-stone-700">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>學員測驗成績與點數報告</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-100">
                {isPerfect ? '🎯 滿分特優！精熟掌握' : isPassing ? '🎖️ 合格通過！成績優異' : '⚠️ 需加強複習！未達合格'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 mt-1">
                測驗學員：<strong className="text-emerald-300">{nickname}</strong> ‧ 耗時：{formatTime(timerSeconds)}
              </p>

              {/* Points Earned Banner */}
              <div className="mt-4 p-3 rounded-xl bg-amber-950/40 border border-amber-600/50 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  ★
                </div>
                <div className="text-xs text-stone-200">
                  本次測驗獲得：<strong className="text-amber-400 text-sm font-mono font-bold">+{scoreResult.pointsEarned}</strong> 點數！
                  （單選答對 {scoreResult.singleCorrect} 題 × 1分 + 複選答對 {scoreResult.multipleCorrect} 題 × 1.5分）
                  {latestUser && (
                    <span className="block text-[11px] text-stone-400 mt-0.5">
                      個人累計總點數：<strong className="text-amber-300 font-mono">{latestUser.totalPoints}</strong> 分
                    </span>
                  )}
                </div>
              </div>

              {/* Guest Mode Notice in Results */}
              {isGuest && (
                <div className="mt-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 text-xs text-emerald-200">
                    <UserCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <div>
                      <span className="font-bold">您目前以【訪客模式】測驗完畢</span>
                      <span className="block text-stone-400 text-[11px] mt-0.5">
                        本次成績與錯題已完整保存在這台手機本機，未同步上傳至連隊雲端排行榜。
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setCustomNickInput('');
                      setShowNicknameModal(true);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1 shadow-sm whitespace-nowrap self-stretch sm:self-auto justify-center"
                  >
                    <span>登記暱稱並將點數登錄雲端</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Score Badge */}
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-stone-950/80 border border-stone-800 shadow-inner min-w-[150px]">
              <span className="text-4xl sm:text-5xl font-black text-amber-400 font-mono tracking-tight">
                {scoreResult.scorePercent}
              </span>
              <span className="text-xs text-stone-400 font-bold mt-1">得分百分比</span>
              <span className="text-[11px] text-stone-500 mt-0.5">答對 {scoreResult.correctCount}/{scoreResult.totalQuestions} 題</span>
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
                  <span>僅重測本次錯題 ({scoreResult.wrongQuestions.length}題)</span>
                </button>
              )}

              <button
                onClick={() => setQuizState('config')}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5"
              >
                <Shuffle className="w-4 h-4" />
                <span>返回測驗設定</span>
              </button>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => {
                  setLeaderboardTab('leaderboard');
                  setShowLeaderboard(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-amber-600/20 text-amber-300 border border-amber-500/40 hover:bg-amber-600 hover:text-stone-950 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>榮譽排行榜</span>
              </button>
              <button
                onClick={() => {
                  setLeaderboardTab('wrongQuestions');
                  setShowLeaderboard(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-rose-950/40 text-rose-300 border border-rose-800/60 hover:bg-rose-600 hover:text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors"
              >
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>個人歷史錯題本</span>
              </button>
              <button
                onClick={() => {
                  setLeaderboardTab('jsonView');
                  setShowLeaderboard(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-blue-950/40 text-blue-300 border border-blue-800/60 hover:bg-blue-600 hover:text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors"
              >
                <Code className="w-4 h-4 text-blue-400" />
                <span>檢視/匯出 JSON 統計</span>
              </button>
            </div>
          </div>
        </div>

        {/* WRONG QUESTIONS REVIEW SECTION (Below the score) */}
        <div className="rounded-2xl bg-stone-900 border border-stone-800 shadow-xl overflow-hidden">
          <div className="p-5 sm:p-6 bg-stone-850 border-b border-stone-800 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-lg font-bold text-stone-100 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-400" />
                <span>本次測驗錯誤題目檢討與複習</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 font-mono">
                  {scoreResult.wrongQuestions.length} 題
                </span>
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                已將錯題自動記入學員【{nickname}】的歷史錯題資料庫中
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
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {isCorrect ? (
                          <span className="text-xs px-2.5 py-0.5 rounded font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                            ✓ 正確 (+{q.type === 'single' ? '1' : '1.5'}分)
                          </span>
                        ) : (
                          <>
                            <span className="text-xs px-2 py-0.5 rounded font-bold bg-rose-950 text-rose-300 border border-rose-800">
                              ✗ 答錯
                            </span>
                            <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-900/60 text-rose-200 border border-rose-700 font-mono font-bold">
                              此題累計答錯 {latestUser?.wrongQuestionHistory?.[`${q.type}_${q.id}`]?.missCount || 1} 次
                            </span>
                          </>
                        )}
                        <span className="text-xs text-stone-400 font-mono">
                          第 {item.questionIndex + 1} 題 ({q.type === 'single' ? '單選' : '複選'} ‧ 難度：{q.difficulty})
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-500 font-mono">
                        {q.source}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-stone-100 mt-2 mb-3">
                      {q.question}
                    </h4>

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

        {/* Leaderboard Modal */}
        <LeaderboardModal
          isOpen={showLeaderboard}
          initialTab={leaderboardTab}
          onClose={() => setShowLeaderboard(false)}
          currentNickname={nickname}
          onSwitchNickname={(newNick) => {
            UserStatsManager.setCurrentNickname(newNick);
            setNickname(newNick);
          }}
          onStartRetest={(questions) => startQuiz(questions)}
        />
      </div>
    );
  }

  return null;
};
