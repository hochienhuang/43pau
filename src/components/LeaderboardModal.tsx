import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  User, 
  AlertCircle, 
  Download, 
  Upload, 
  CheckCircle, 
  RotateCcw, 
  X, 
  BookOpen, 
  Search,
  Sparkles,
  Flame,
  ArrowRight,
  Code,
  Copy,
  Check,
  Users,
  Cloud,
  CloudUpload,
  RefreshCw,
  Database,
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { UserStatsManager, UserStats, MissedQuestionRecord } from '../utils/userStats.ts';
import { Question } from '../data/questions.ts';
import { downloadBlobFile } from '../data/cloudExport.ts';
import { firebaseSync, FirebaseClientConfig } from '../services/firebase.ts';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentNickname: string;
  onSwitchNickname: (newNickname: string) => void;
  onStartRetest: (questions: Question[]) => void;
  initialTab?: 'leaderboard' | 'wrongQuestions' | 'jsonView' | 'cloudSync';
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  currentNickname,
  onSwitchNickname,
  onStartRetest,
  initialTab = 'leaderboard'
}) => {
  const [tab, setTab] = useState<'leaderboard' | 'wrongQuestions' | 'jsonView' | 'cloudSync'>(initialTab);
  const [tempNickname, setTempNickname] = useState<string>('');
  const [isEditingNick, setIsEditingNick] = useState<boolean>(false);
  const [wrongFilter, setWrongFilter] = useState<string>('');
  const [copiedJSON, setCopiedJSON] = useState<boolean>(false);
  const [jsonMode, setJsonMode] = useState<'full' | 'personal'>('full');
  const [refreshTick, setRefreshTick] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [customProjectId, setCustomProjectId] = useState<string>('');
  const [customConfigText, setCustomConfigText] = useState<string>('');
  const [showConfigEditor, setShowConfigEditor] = useState<boolean>(false);

  const [firebaseStatus, setFirebaseStatus] = useState(() => firebaseSync.getStatus());

  React.useEffect(() => {
    if (initialTab && isOpen) {
      setTab(initialTab);
    }
  }, [initialTab, isOpen]);

  // Subscribe to real-time cloud updates and status changes
  React.useEffect(() => {
    if (!isOpen) return;

    const unsubStatus = firebaseSync.onStatusChange((status) => {
      setFirebaseStatus({
        ...firebaseSync.getStatus(),
        ...status
      });
    });

    const unsubLeaderboard = firebaseSync.subscribeLeaderboard(() => {
      // Incoming update from another student's phone! Refresh UI
      setRefreshTick((t) => t + 1);
    });

    const currentCfg = firebaseSync.getStoredConfig();
    if (currentCfg) {
      setCustomProjectId(currentCfg.projectId || '');
      setCustomConfigText(JSON.stringify(currentCfg, null, 2));
    }

    return () => {
      if (unsubLeaderboard) unsubLeaderboard();
      unsubStatus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const leaderboard = UserStatsManager.getLeaderboard();
  const allNicknames = UserStatsManager.getAllNicknames();
  const currentUser = UserStatsManager.getUser(currentNickname);

  const missedList: MissedQuestionRecord[] = currentUser 
    ? Object.values(currentUser.wrongQuestionHistory || {}).sort((a, b) => b.missCount - a.missCount)
    : [];

  const filteredMissedList = missedList.filter(item => 
    !wrongFilter || 
    item.questionText.toLowerCase().includes(wrongFilter.toLowerCase()) ||
    item.source.toLowerCase().includes(wrongFilter.toLowerCase())
  );

  const activeJsonString = jsonMode === 'full' 
    ? UserStatsManager.exportStatsJSON() 
    : UserStatsManager.exportUserStatsJSON(currentNickname);

  const handleExportJSON = () => {
    const filename = jsonMode === 'full' 
      ? '155_artillery_leaderboard_ranking.json' 
      : `155_artillery_${currentNickname}_stats.json`;
    downloadBlobFile(filename, activeJsonString, 'application/json');
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(activeJsonString);
    setCopiedJSON(true);
    setTimeout(() => setCopiedJSON(false), 2000);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const ok = UserStatsManager.importStatsJSON(content);
        if (ok) {
          alert('排行榜與統計資料庫匯入成功！');
          window.location.reload();
        } else {
          alert('JSON 格式錯誤，匯入失敗！');
        }
      }
    };
    reader.readAsText(file);
  };

  const handleSaveNickname = () => {
    if (!tempNickname.trim()) return;
    onSwitchNickname(tempNickname.trim());
    setIsEditingNick(false);
    setTempNickname('');
  };

  const handlePracticeAllWrong = () => {
    if (missedList.length === 0) return;
    const questions: Question[] = missedList.map(m => ({
      id: m.questionId,
      type: m.type,
      difficulty: m.difficulty as any,
      source: m.source,
      question: m.questionText,
      options: m.options,
      correctAnswers: m.correctAnswers,
      explanation: m.explanation
    }));
    onClose();
    onStartRetest(questions);
  };

  const handlePushLocalToCloud = async () => {
    setIsSyncing(true);
    setSyncStatusMsg({ type: 'info', text: '正在將本機學員紀錄同步上傳至雲端 Firestore...' });
    try {
      const res = await firebaseSync.pushAllLocalUsersToCloud();
      if (res.error) {
        setSyncStatusMsg({ type: 'error', text: res.error });
      } else {
        setSyncStatusMsg({ type: 'success', text: `成功同步 ${res.count} 位學員累積成績至雲端資料庫！全連手機即刻可見。` });
        setRefreshTick(t => t + 1);
      }
    } catch (e: any) {
      setSyncStatusMsg({ type: 'error', text: `同步失敗: ${e?.message || '請確認網路或 Firebase 權限'}` });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSaveCustomConfig = () => {
    try {
      if (!customConfigText.trim() && !customProjectId.trim()) {
        firebaseSync.setCustomConfig(null);
        setFirebaseStatus(firebaseSync.getStatus());
        setSyncStatusMsg({ type: 'info', text: '已恢復為本機單機模式。' });
        return;
      }

      let parsed: FirebaseClientConfig;
      if (customConfigText.trim().startsWith('{')) {
        parsed = JSON.parse(customConfigText.trim());
      } else {
        parsed = {
          apiKey: '',
          projectId: customProjectId.trim(),
          firestoreDatabaseId: '(default)'
        };
      }

      firebaseSync.setCustomConfig(parsed);
      setFirebaseStatus(firebaseSync.getStatus());
      setSyncStatusMsg({ type: 'success', text: '已套用 Firebase 雲端設定！正在測試即時連線...' });
    } catch (e: any) {
      setSyncStatusMsg({ type: 'error', text: `設定格式錯誤: ${e?.message}` });
    }
  };

  const handleResetConfig = () => {
    firebaseSync.setCustomConfig(null);
    setCustomProjectId('');
    setCustomConfigText('');
    setFirebaseStatus(firebaseSync.getStatus());
    setSyncStatusMsg({ type: 'info', text: '已清除自訂設定，恢復單機模式' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-stone-900 border border-stone-700 rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Top Bar */}
        <div className="p-5 sm:p-6 bg-stone-850 border-b border-stone-800 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-stone-100">
                  學員榮譽榜與錯題統計
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 font-mono">
                  JSON 累積統計排名
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                單選答對 <strong>+1 分</strong> ‧ 多選答對 <strong>+1.5 分</strong>（只計算答對題數持續累積）‧ 錯題次數統計
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTab('cloudSync')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                firebaseStatus.isConnected
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900'
                  : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-750'
              }`}
              title="點擊設定全連跨手機即時雲端同步"
            >
              <Cloud className={`w-3.5 h-3.5 ${firebaseStatus.isConnected ? 'text-emerald-400 animate-pulse' : 'text-stone-400'}`} />
              <span>{firebaseStatus.isConnected ? '雲端即時連線中 🟢' : '雲端跨手機同步 ☁️'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-xl bg-stone-800 hover:bg-stone-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Current User Quick Bar & Nickname Switcher */}
        <div className="px-6 py-3 bg-stone-950/80 border-b border-stone-800 flex items-center justify-between flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-stone-400">
              <User className="w-4 h-4 text-emerald-400" />
              <span>當前學員暱稱：</span>
            </div>
            {!isEditingNick ? (
              <div className="flex items-center gap-2">
                <span className="font-bold text-emerald-300 text-sm">
                  {currentNickname || '（尚未設定）'}
                </span>
                <button
                  onClick={() => {
                    setTempNickname(currentNickname);
                    setIsEditingNick(true);
                  }}
                  className="text-[11px] px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-750 text-amber-400 border border-stone-700 transition-colors"
                >
                  切換/改名
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  placeholder="輸入新暱稱..."
                  value={tempNickname}
                  onChange={(e) => setTempNickname(e.target.value)}
                  className="px-2.5 py-1 rounded bg-stone-850 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                />
                <button
                  onClick={handleSaveNickname}
                  className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold"
                >
                  儲存
                </button>
                <button
                  onClick={() => setIsEditingNick(false)}
                  className="px-2.5 py-1 rounded bg-stone-800 text-stone-400"
                >
                  取消
                </button>
              </div>
            )}

            {/* Quick Switch Chips if multiple nicknames exist */}
            {allNicknames.length > 1 && !isEditingNick && (
              <div className="hidden sm:flex items-center gap-1 ml-2 pl-2 border-l border-stone-800">
                <span className="text-[10px] text-stone-500">切換：</span>
                {allNicknames.slice(0, 4).map((nick) => (
                  <button
                    key={nick}
                    onClick={() => onSwitchNickname(nick)}
                    className={`text-[10px] px-1.5 py-0.5 rounded transition-colors ${
                      nick === currentNickname 
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                        : 'bg-stone-850 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {nick}
                  </button>
                ))}
              </div>
            )}
          </div>

          {currentUser && (
            <div className="flex items-center gap-3 text-stone-300 font-mono">
              <span>累積點數: <strong className="text-amber-400 font-bold text-sm">{currentUser.totalPoints}</strong> 分</span>
              <span>‧</span>
              <span>測驗: <strong>{currentUser.totalTestsTaken}</strong> 次</span>
              <span>‧</span>
              <span>歷史錯題: <strong className="text-rose-400 font-bold">{missedList.length}</strong> 題</span>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-2.5 bg-stone-850/60 border-b border-stone-800 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTab('leaderboard')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                tab === 'leaderboard'
                  ? 'bg-amber-600 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:bg-stone-800 hover:text-stone-200'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>榮譽排行榜 ({leaderboard.length})</span>
            </button>
            <button
              onClick={() => setTab('wrongQuestions')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                tab === 'wrongQuestions'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-stone-400 hover:bg-stone-800 hover:text-stone-200'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>我的歷史錯題本 ({missedList.length})</span>
            </button>
            <button
              onClick={() => setTab('jsonView')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                tab === 'jsonView'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-stone-400 hover:bg-stone-800 hover:text-stone-200'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>JSON 統計與匯出</span>
            </button>
            <button
              onClick={() => setTab('cloudSync')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                tab === 'cloudSync'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-400 hover:bg-stone-800 hover:text-stone-200'
              }`}
            >
              <Cloud className="w-3.5 h-3.5" />
              <span>跨手機雲端同步</span>
              {firebaseStatus.isConnected && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJSON}
              className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-300 border border-stone-700 text-[11px] flex items-center gap-1 transition-colors"
              title="匯出統計 JSON 檔案"
            >
              <Download className="w-3 h-3 text-blue-400" />
              <span>下載 JSON</span>
            </button>

            <label className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-300 border border-stone-700 text-[11px] flex items-center gap-1 cursor-pointer transition-colors">
              <Upload className="w-3 h-3 text-emerald-400" />
              <span>匯入 JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 scrollbar-thin">
          {/* TAB 1: LEADERBOARD */}
          {tab === 'leaderboard' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800 flex items-center justify-between text-xs text-stone-400">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>計分規則：<strong>單選題答對 1 題 1 分，複選題答對 1 題 1.5 分</strong>，只計算答對題數並持續累積。</span>
                </div>
                <span className="font-mono text-stone-500">已登記學員：{leaderboard.length} 名</span>
              </div>

              {leaderboard.length === 0 ? (
                <div className="text-center py-16 text-stone-500">
                  <Award className="w-12 h-12 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">尚無任何測驗成績記錄</p>
                  <p className="text-xs text-stone-600 mt-1">請先進入小測驗或國軍正式考試模擬作答，完成後即可累積點數爭取上榜！</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-stone-800 bg-stone-950/40">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-stone-800 text-stone-400 font-mono text-[11px] bg-stone-900/80">
                        <th className="py-3 px-3.5">名次</th>
                        <th className="py-3 px-3.5">學員暱稱</th>
                        <th className="py-3 px-3.5 text-right">累積點數</th>
                        <th className="py-3 px-3.5 text-center">單選答對 (1分)</th>
                        <th className="py-3 px-3.5 text-center">複選答對 (1.5分)</th>
                        <th className="py-3 px-3.5 text-center">正式模擬合格</th>
                        <th className="py-3 px-3.5 text-center">歷史錯題數</th>
                        <th className="py-3 px-3.5 text-right">最後活動</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800/60">
                      {leaderboard.map((user, idx) => {
                        const isCurrent = user.nickname === currentNickname;
                        let rankBadge = (
                          <span className="font-mono font-bold text-stone-400">
                            #{idx + 1}
                          </span>
                        );
                        if (idx === 0) {
                          rankBadge = <span className="font-bold text-amber-300" title="第 1 名">🥇 冠軍</span>;
                        } else if (idx === 1) {
                          rankBadge = <span className="font-bold text-stone-300" title="第 2 名">🥈 亞軍</span>;
                        } else if (idx === 2) {
                          rankBadge = <span className="font-bold text-amber-600" title="第 3 名">🥉 季軍</span>;
                        }

                        return (
                          <tr
                            key={user.nickname}
                            className={`transition-colors ${
                              isCurrent
                                ? 'bg-amber-950/30 text-amber-200 font-medium'
                                : 'hover:bg-stone-850/60 text-stone-300'
                            }`}
                          >
                            <td className="py-3 px-3.5 font-semibold">{rankBadge}</td>
                            <td className="py-3 px-3.5">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-stone-100">{user.nickname}</span>
                                {isCurrent ? (
                                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono">
                                    當前
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => onSwitchNickname(user.nickname)}
                                    className="text-[10px] text-stone-500 hover:text-amber-400 underline ml-1"
                                    title="切換至此學員"
                                  >
                                    切換
                                  </button>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-3.5 text-right">
                              <span className="font-extrabold text-amber-400 font-mono text-base">
                                {user.totalPoints}
                              </span>
                              <span className="text-[10px] text-stone-500 ml-1">分</span>
                            </td>
                            <td className="py-3 px-3.5 text-center font-mono text-emerald-400">
                              {user.singleCorrectCount} 題
                            </td>
                            <td className="py-3 px-3.5 text-center font-mono text-cyan-400">
                              {user.multipleCorrectCount} 題
                            </td>
                            <td className="py-3 px-3.5 text-center font-mono">
                              <span className="text-stone-200">{user.formalExamsPassed}</span>
                              <span className="text-stone-500 text-[10px]">/{user.formalExamsTaken}</span>
                            </td>
                            <td className="py-3 px-3.5 text-center font-mono text-rose-400">
                              {user.totalWrongQuestionsCount} 題
                            </td>
                            <td className="py-3 px-3.5 text-right text-[11px] text-stone-500 font-mono">
                              {new Date(user.lastActiveAt).toLocaleDateString()}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WRONG QUESTIONS */}
          {tab === 'wrongQuestions' && (
            <div className="space-y-4">
              {/* Header with Search & Quick Practice */}
              <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-stone-800">
                <div className="flex items-center gap-2 flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-stone-500" />
                  <input
                    type="text"
                    placeholder="搜尋我的歷史錯題關鍵字或出處..."
                    value={wrongFilter}
                    onChange={(e) => setWrongFilter(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-rose-500"
                  />
                </div>

                {missedList.length > 0 && (
                  <button
                    onClick={handlePracticeAllWrong}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-rose-950/40 transition-all hover:scale-102"
                  >
                    <Flame className="w-4 h-4" />
                    <span>針對歷史錯題啟動特訓 ({missedList.length}題)</span>
                  </button>
                )}
              </div>

              {filteredMissedList.length === 0 ? (
                <div className="text-center py-16 text-stone-500">
                  <CheckCircle className="w-12 h-12 text-emerald-500/50 mx-auto mb-2" />
                  <p className="text-sm text-stone-300 font-bold">目前無任何錯題記錄！</p>
                  <p className="text-xs text-stone-500 mt-1">您完成小測驗或正式考試後，做錯的題目會自動記錄在此處，並統計每題累計答錯次數。</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredMissedList.map((item) => (
                    <div
                      key={item.key}
                      className="p-4 rounded-2xl bg-stone-950/70 border border-rose-900/40 hover:border-rose-700/60 transition-all space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 font-mono">
                            累計答錯 {item.missCount} 次
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700">
                            {item.type === 'single' ? '單選題' : '複選題'}
                          </span>
                          <span className="text-xs text-stone-400 font-mono">
                            編號 #{item.questionId} (難度: {item.difficulty})
                          </span>
                        </div>
                        <span className="text-[11px] text-stone-500 font-mono">
                          {item.source}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-stone-100 leading-relaxed">
                        {item.questionText}
                      </h4>

                      {/* Options & Correct Answer */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                        {item.options.map((opt, optIdx) => {
                          const isCorrect = item.correctAnswers.includes(optIdx);
                          return (
                            <div
                              key={optIdx}
                              className={`p-2 rounded-lg text-xs flex items-start gap-2 border ${
                                isCorrect
                                  ? 'bg-emerald-950/50 text-emerald-200 border-emerald-700/70 font-semibold'
                                  : 'bg-stone-900/60 text-stone-400 border-stone-800'
                              }`}
                            >
                              <span className="font-mono text-stone-500">({optIdx + 1})</span>
                              <span className="flex-1">{opt}</span>
                              {isCorrect && (
                                <span className="text-[10px] text-emerald-400 font-bold">
                                  ✓ 正解
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {item.explanation && (
                        <div className="text-xs text-amber-300/90 bg-stone-900 p-2.5 rounded-lg border border-stone-850">
                          {item.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: JSON VIEW & EXPORT */}
          {tab === 'jsonView' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-400">JSON 資料範圍：</span>
                  <div className="inline-flex rounded-lg bg-stone-950 p-1 border border-stone-800">
                    <button
                      onClick={() => setJsonMode('full')}
                      className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                        jsonMode === 'full'
                          ? 'bg-blue-600 text-white'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      全系統排行榜與資料庫
                    </button>
                    <button
                      onClick={() => setJsonMode('personal')}
                      className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                        jsonMode === 'personal'
                          ? 'bg-blue-600 text-white'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      當前學員 ({currentNickname}) 錯題與積分
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyJSON}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-amber-300 border border-stone-700 text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    {copiedJSON ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">已複製 JSON</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>一鍵複製 JSON</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleExportJSON}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>下載 .json 檔</span>
                  </button>
                </div>
              </div>

              <div className="relative">
                <pre className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-xs font-mono text-emerald-400/90 overflow-x-auto max-h-[50vh] scrollbar-thin leading-relaxed">
                  {activeJsonString}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: CLOUD SYNC SETTINGS & MULTI-DEVICE MANAGEMENT */}
          {tab === 'cloudSync' && (
            <div className="space-y-6">
              {/* Notification Banner */}
              {syncStatusMsg && (
                <div
                  className={`p-3.5 rounded-2xl border text-xs flex items-center justify-between gap-2 animate-in fade-in duration-200 ${
                    syncStatusMsg.type === 'success'
                      ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-200'
                      : syncStatusMsg.type === 'error'
                      ? 'bg-rose-950/70 border-rose-500/60 text-rose-200'
                      : 'bg-blue-950/70 border-blue-500/60 text-blue-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {syncStatusMsg.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                    {syncStatusMsg.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />}
                    {syncStatusMsg.type === 'info' && <RefreshCw className="w-4 h-4 text-blue-400 animate-spin flex-shrink-0" />}
                    <span>{syncStatusMsg.text}</span>
                  </div>
                  <button
                    onClick={() => setSyncStatusMsg(null)}
                    className="text-stone-400 hover:text-white p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Status Header Card */}
              <div className="rounded-2xl bg-stone-950 border border-stone-800 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-3 rounded-2xl border flex-shrink-0 ${
                      firebaseStatus.isConnected
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-stone-850 text-stone-400 border-stone-750'
                    }`}
                  >
                    <Cloud className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-stone-100">
                        {firebaseStatus.isConnected
                          ? 'Firebase 雲端資料庫：即時同步連線中'
                          : '跨手機連線狀態：目前為單機離線模式'}
                      </h4>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                          firebaseStatus.isConnected
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                            : 'bg-stone-850 text-stone-400 border-stone-700'
                        }`}
                      >
                        {firebaseStatus.isConnected ? 'LIVE ONLINE' : 'STANDALONE'}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                      {firebaseStatus.isConnected ? (
                        <>
                          全連弟兄只要在任何手機上交卷，積分與排行榜將全自動<strong>即時跨手機連線同步</strong>。
                          {firebaseStatus.projectId && (
                            <span className="ml-1 text-emerald-400/90 font-mono">
                              (專案: {firebaseStatus.projectId})
                            </span>
                          )}
                        </>
                      ) : (
                        '目前測驗紀錄僅儲存在這台手機的瀏覽器中。設定 Firebase 後即可實現全連手機即時互通！'
                      )}
                    </p>
                    {firebaseStatus.lastSync && (
                      <div className="text-[11px] text-stone-500 mt-1 font-mono">
                        最近雲端更新時間：{firebaseStatus.lastSync.toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
                  <button
                    onClick={handlePushLocalToCloud}
                    disabled={isSyncing}
                    className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md flex-1 md:flex-initial justify-center"
                    title="將當前手機所有學員累計點數推送到雲端"
                  >
                    <CloudUpload className="w-4 h-4" />
                    <span>{isSyncing ? '同步中...' : '上傳本機資料至雲端'}</span>
                  </button>
                </div>
              </div>

              {/* Free Tier Quotas & User Limits Explanation Card */}
              <div className="rounded-2xl bg-stone-900/90 border border-emerald-500/30 p-5 space-y-3.5 shadow-lg">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-stone-100 font-bold text-sm">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span>Firebase 免費額度上限與使用人數說明（Spark 免費方案）</span>
                  </div>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold font-mono">
                    100% 永久免費 ‧ 零超額扣款風險
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                  <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800">
                    <div className="text-[11px] text-stone-400">同時在線人數</div>
                    <div className="text-base font-extrabold text-emerald-400 font-mono mt-0.5">1,000,000</div>
                    <div className="text-[10px] text-stone-500 mt-0.5">高達百萬連線</div>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800">
                    <div className="text-[11px] text-stone-400">每日免費讀取</div>
                    <div className="text-base font-extrabold text-cyan-400 font-mono mt-0.5">50,000 次</div>
                    <div className="text-[10px] text-stone-500 mt-0.5">每天自動歸零</div>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800">
                    <div className="text-[11px] text-stone-400">每日免費寫入</div>
                    <div className="text-base font-extrabold text-amber-400 font-mono mt-0.5">20,000 次</div>
                    <div className="text-[10px] text-stone-500 mt-0.5">每天自動歸零</div>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800">
                    <div className="text-[11px] text-stone-400">雲端儲存空間</div>
                    <div className="text-base font-extrabold text-purple-400 font-mono mt-0.5">1 GiB</div>
                    <div className="text-[10px] text-stone-500 mt-0.5">可存破百萬筆</div>
                  </div>
                </div>

                <div className="text-xs text-stone-300 space-y-1.5 leading-relaxed bg-stone-950/50 p-3.5 rounded-xl border border-stone-800">
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">● 人數上限換算：</span>
                    <span className="text-stone-300">
                      Firebase 官方<strong>不限使用人數</strong>，而是計算讀寫次數。全連 120 弟兄就算每人每天測驗 10 次（1,200 次交卷），整天寫入量也才佔免費額度的 <strong>6%</strong>，部隊使用綽綽有餘！
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">● 系統防護機制：</span>
                    <span className="text-stone-300">
                      已啟用 <strong>Top 100 查詢上限保護</strong> 與本地快取，杜絕浪費讀取。達到當日上限時 Google 會自動保護暫停請求，<strong>絕不需綁定信用卡，完全零超支費用</strong>。
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">● 訪客模式 (Guest)：</span>
                    <span className="text-stone-300">
                      弟兄練習若不想輸入暱稱，可使用「訪客模式」直接做題，成績保留於本機瀏覽器，完全不消耗雲端資料庫額度！
                    </span>
                  </div>
                </div>
              </div>

              {/* Instructions and Firebase Configuration Form */}
              <div className="rounded-2xl bg-stone-850/60 border border-stone-800 p-5 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-stone-200 font-bold text-sm">
                    <Database className="w-4 h-4 text-amber-400" />
                    <span>Firebase 雲端連線設定（連長 / 幹部維護專區）</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowConfigEditor(!showConfigEditor)}
                    className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>{showConfigEditor ? '隱藏詳細設定' : '開啟詳細設定表單'}</span>
                  </button>
                </div>

                {/* Explanation steps */}
                <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-3 text-xs text-stone-300">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>如何在部隊建立完全免費的「全連即時同步排行榜」？（只需 1 分鐘）</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-stone-400 leading-relaxed pl-1">
                    <li>
                      使用 Google 帳號前往{' '}
                      <a
                        href="https://console.firebase.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-400 underline inline-flex items-center gap-0.5"
                      >
                        Firebase 控制台 <ExternalLink className="w-3 h-3 inline" />
                      </a>
                      ，點擊「新增專案」（完全免費，無須輸入信用卡）。
                    </li>
                    <li>
                      點擊左側選單的「<strong>Firestore Database</strong>」，點「建立資料庫」，位置選台灣 (asia-east1) 或預設即可。
                    </li>
                    <li>
                      將您建立的<strong>專案 ID (Project ID)</strong> 或網頁設定複製貼到底下，點擊「套用連線」，立刻生效！
                    </li>
                  </ol>
                </div>

                {/* Configuration Input Box */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      Firebase 專案代碼 (Project ID) 或完整設定 JSON：
                    </label>
                    <input
                      type="text"
                      placeholder="例如：pau-artillery-quiz 或貼上完整 Firebase Config..."
                      value={customProjectId}
                      onChange={(e) => {
                        setCustomProjectId(e.target.value);
                        if (!customConfigText.startsWith('{')) {
                          setCustomConfigText(e.target.value);
                        }
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-xs font-mono text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {showConfigEditor && (
                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">
                        完整 Web App Configuration JSON（選填，若有 apiKey / appId 可貼此）：
                      </label>
                      <textarea
                        rows={6}
                        placeholder={`{\n  "apiKey": "AIzaSy...",\n  "projectId": "pau-artillery-quiz",\n  "authDomain": "pau-artillery-quiz.firebaseapp.com"\n}`}
                        value={customConfigText}
                        onChange={(e) => setCustomConfigText(e.target.value)}
                        className="w-full p-3 rounded-xl bg-stone-950 border border-stone-700 text-xs font-mono text-emerald-400 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-1 flex-wrap">
                    <button
                      type="button"
                      onClick={handleSaveCustomConfig}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>套用並儲存設定</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleResetConfig}
                      className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-400 hover:text-stone-200 text-xs transition-colors"
                    >
                      <span>恢復預設（單機模式）</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
