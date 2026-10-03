import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  Sparkles, 
  BookOpen, 
  Layers, 
  Mic, 
  ChevronRight,
  ListOrdered,
  Users
} from 'lucide-react';
import { RECITATIONS, RecitationItem } from '../data/recitations.ts';
import { SpeechHelper } from '../utils/speech.ts';

interface RecitationViewProps {
  initialId?: string;
  onNavigateToQuiz?: () => void;
}

export const RecitationView: React.FC<RecitationViewProps> = ({
  initialId = 'squad-formation',
  onNavigateToQuiz
}) => {
  const [selectedId, setSelectedId] = useState<string>(initialId);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const [isClozeMode, setIsClozeMode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTabMode, setActiveTabMode] = useState<'text' | 'roles' | 'steps'>('text');

  const activeRecitation = RECITATIONS.find(r => r.id === selectedId) || RECITATIONS[0];

  useEffect(() => {
    if (initialId) {
      setSelectedId(initialId);
      handleStop();
    }
  }, [initialId]);

  // Clean up speech on unmount or item change
  useEffect(() => {
    return () => {
      SpeechHelper.stop();
    };
  }, [selectedId]);

  const handlePlayFull = () => {
    if (isPaused) {
      SpeechHelper.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    const textToSpeak = activeRecitation.steps && activeRecitation.steps.length > 0
      ? activeRecitation.steps.map(s => s.voiceText).join('。 ')
      : activeRecitation.fullText;

    setIsPlaying(true);
    setIsPaused(false);
    setActiveStepIndex(-1);

    SpeechHelper.speak(textToSpeak, {
      rate: playbackRate,
      onEnd: () => {
        setIsPlaying(false);
        setIsPaused(false);
        setActiveStepIndex(-1);
      },
      onError: () => {
        setIsPlaying(false);
        setIsPaused(false);
        setActiveStepIndex(-1);
      }
    });
  };

  const handlePlayStep = (index: number) => {
    if (!activeRecitation.steps || !activeRecitation.steps[index]) return;
    SpeechHelper.stop();
    setActiveStepIndex(index);
    setIsPlaying(true);
    setIsPaused(false);

    SpeechHelper.speak(activeRecitation.steps[index].voiceText, {
      rate: playbackRate,
      onEnd: () => {
        setIsPlaying(false);
        setIsPaused(false);
      },
      onError: () => {
        setIsPlaying(false);
        setIsPaused(false);
      }
    });
  };

  const handlePause = () => {
    SpeechHelper.pause();
    setIsPaused(true);
  };

  const handleStop = () => {
    SpeechHelper.stop();
    setIsPlaying(false);
    setIsPaused(false);
    setActiveStepIndex(-1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeRecitation.fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper for cloze (memory) mode
  const renderClozeText = (text: string) => {
    if (!isClozeMode) return text;
    // Replace key keywords with blanks
    return text.replace(
      /(向中看齊|向前看|向後轉|向前三步走|砲後|集合|報數|任務賦予|發射手|裝填手|信管測合手|藥包裝填|底火|裝藥選定|標桿設置手|彈種選定|副砲長|瞄準手|射擊任務|榴彈|方向修正量|方向|時間|射角|全保險|水準氣泡|標桿左緣|打動方向機|打動高低機|信管規|逆時針旋轉|聞卡聲)/g,
      ' [ ___ ] '
    );
  };

  return (
    <div className="space-y-6">
      {/* Category Pills Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {RECITATIONS.map((item) => {
          const isSelected = item.id === selectedId;
          const isMandatory = item.category === 'mandatory';
          return (
            <button
              key={item.id}
              onClick={() => {
                handleStop();
                setSelectedId(item.id);
              }}
              className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 ring-2 ring-emerald-400'
                  : 'bg-stone-900 text-stone-300 border border-stone-800 hover:bg-stone-850 hover:text-white'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isMandatory ? 'bg-amber-400' : 'bg-stone-500'}`} />
              <span>{item.title}</span>
              {isMandatory && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">
                  必修
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Recitation Card */}
      <div className="rounded-2xl bg-stone-900 border border-stone-800 shadow-xl overflow-hidden">
        {/* Card Header & Audio Control Bar */}
        <div className="p-5 sm:p-6 bg-stone-850 border-b border-stone-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                {activeRecitation.subCategory}
              </span>
              <span className="text-xs text-stone-400">{activeRecitation.category === 'mandatory' ? '必修項目' : '選看延伸'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-100 flex items-center gap-2">
              <Volume2 className="w-6 h-6 text-emerald-400" />
              <span>{activeRecitation.title}</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              {activeRecitation.description}
            </p>
          </div>

          {/* Voice Player Controls */}
          <div className="flex items-center flex-wrap gap-2 bg-stone-900 p-2.5 rounded-xl border border-stone-800">
            {/* Play/Pause Buttons */}
            {!isPlaying ? (
              <button
                onClick={handlePlayFull}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-md transition-colors"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>播放朗讀</span>
              </button>
            ) : isPaused ? (
              <button
                onClick={handlePlayFull}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-md transition-colors"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>繼續朗讀</span>
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-medium text-xs shadow-md transition-colors"
              >
                <Pause className="w-4 h-4" />
                <span>暫停</span>
              </button>
            )}

            <button
              onClick={handleStop}
              disabled={!isPlaying && !isPaused}
              className="p-2 rounded-lg bg-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-700 disabled:opacity-40 transition-colors"
              title="停止播放"
            >
              <Square className="w-4 h-4" />
            </button>

            {/* Playback Rate Slider */}
            <div className="flex items-center gap-1.5 px-2 border-l border-stone-800">
              <span className="text-[11px] text-stone-400 font-mono">語速:</span>
              {[0.8, 1.0, 1.2].map((rate) => (
                <button
                  key={rate}
                  onClick={() => {
                    setPlaybackRate(rate);
                    if (isPlaying) {
                      handleStop();
                    }
                  }}
                  className={`text-xs px-2 py-1 rounded font-mono transition-colors ${
                    playbackRate === rate
                      ? 'bg-stone-700 text-emerald-400 font-bold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>

            {/* Cloze Mode Toggle */}
            <button
              onClick={() => setIsClozeMode(!isClozeMode)}
              className={`p-2 rounded-lg text-xs flex items-center gap-1 transition-colors ${
                isClozeMode
                  ? 'bg-purple-900/60 text-purple-300 border border-purple-700'
                  : 'bg-stone-800 text-stone-400 hover:text-stone-200'
              }`}
              title="切換默背挖空考驗模式"
            >
              {isClozeMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="hidden sm:inline font-medium">默背自測</span>
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-700 transition-colors"
              title="複製口令全文"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* View Mode Tabs (Full Text vs Step Breakdown vs Roles) */}
        <div className="px-6 py-2.5 bg-stone-850/50 border-b border-stone-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTabMode('text')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                activeTabMode === 'text'
                  ? 'bg-stone-700 text-stone-100'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              口令全文 (背誦)
            </button>
            {activeRecitation.steps && (
              <button
                onClick={() => setActiveTabMode('steps')}
                className={`px-3 py-1 rounded-md font-medium transition-colors flex items-center gap-1 ${
                  activeTabMode === 'steps'
                    ? 'bg-stone-700 text-stone-100'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <ListOrdered className="w-3.5 h-3.5" />
                <span>分段練習 ({activeRecitation.steps.length}動)</span>
              </button>
            )}
            {activeRecitation.roles && (
              <button
                onClick={() => setActiveTabMode('roles')}
                className={`px-3 py-1 rounded-md font-medium transition-colors flex items-center gap-1 ${
                  activeTabMode === 'roles'
                    ? 'bg-stone-700 text-stone-100'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>各砲手角色分配</span>
              </button>
            )}
          </div>

          <div className="text-[11px] text-stone-400 hidden sm:block">
            {isClozeMode ? '🔒 默背模式已開啟：關鍵詞已替換為空格' : '💡 點擊「分段練習」可逐句聆聽發音'}
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6">
          {activeTabMode === 'text' && (
            <div className="space-y-4">
              <div className="p-5 sm:p-7 rounded-xl bg-stone-950/70 border border-stone-800/80 leading-loose text-stone-200 font-sans text-base sm:text-lg whitespace-pre-line tracking-wide selection:bg-emerald-600 selection:text-white">
                {renderClozeText(activeRecitation.fullText)}
              </div>

              {/* Recitation Tips */}
              <div className="p-4 rounded-xl bg-stone-850 border border-stone-800 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  <span className="font-semibold text-emerald-300">聽力背誦要訣：</span> {activeRecitation.audioTips}
                </div>
              </div>
            </div>
          )}

          {activeTabMode === 'steps' && activeRecitation.steps && (
            <div className="space-y-4">
              {activeRecitation.steps.map((step, idx) => {
                const isStepActive = activeStepIndex === idx && isPlaying;
                return (
                  <div
                    key={step.stepNum}
                    className={`p-4 sm:p-5 rounded-xl border transition-all ${
                      isStepActive
                        ? 'bg-emerald-950/30 border-emerald-500/60 shadow-lg shadow-emerald-950/30'
                        : 'bg-stone-850/60 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-stone-800 text-stone-300 text-xs font-bold flex items-center justify-center border border-stone-700">
                          {step.stepNum}
                        </span>
                        <h4 className="font-bold text-stone-200 text-sm sm:text-base">
                          {step.title}
                        </h4>
                      </div>
                      <button
                        onClick={() => handlePlayStep(idx)}
                        className="px-3 py-1 rounded-lg bg-stone-800 hover:bg-emerald-600 text-stone-300 hover:text-white text-xs font-medium flex items-center gap-1 transition-colors"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>聆聽本段</span>
                      </button>
                    </div>

                    <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                      {renderClozeText(step.text)}
                    </p>

                    {step.note && (
                      <div className="mt-2.5 text-xs text-amber-400/90 flex items-center gap-1.5">
                        <span className="font-semibold">【動作要領】</span>
                        <span>{step.note}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTabMode === 'roles' && activeRecitation.roles && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeRecitation.roles.map((r, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-stone-850/80 border border-stone-800">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-stone-800 text-emerald-400 border border-stone-700">
                        {r.role}
                      </span>
                      {r.actionNote && (
                        <span className="text-[11px] text-amber-400 font-mono">
                          {r.actionNote}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                      {renderClozeText(r.text)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Keypoints Checklist */}
          <div className="mt-6 pt-5 border-t border-stone-800">
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
              核心要點速記檢核
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeRecitation.keyPoints.map((pt, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-950/40 border border-stone-850 text-xs sm:text-sm text-stone-300">
                  <div className="w-4 h-4 rounded-full bg-emerald-600/30 text-emerald-400 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">
                    ✓
                  </div>
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="px-6 py-4 bg-stone-850 border-t border-stone-800 flex items-center justify-between flex-wrap gap-3">
          <div className="text-xs text-stone-400">
            熟練度背誦標準：能無停頓、準確覆誦並配合規定身段手勢動作。
          </div>
          {onNavigateToQuiz && (
            <button
              onClick={onNavigateToQuiz}
              className="text-xs px-3.5 py-1.5 rounded-lg bg-amber-600/20 text-amber-300 border border-amber-500/40 hover:bg-amber-600 hover:text-stone-950 font-semibold transition-colors flex items-center gap-1"
            >
              <span>前往手冊題庫小測驗</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
