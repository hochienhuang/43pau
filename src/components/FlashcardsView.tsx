import React, { useState } from 'react';
import { 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  Shuffle, 
  Eye, 
  BookOpen,
  Volume2
} from 'lucide-react';
import { SINGLE_QUESTIONS, MULTIPLE_QUESTIONS, Question } from '../data/questions.ts';
import { SpeechHelper } from '../utils/speech.ts';

export const FlashcardsView: React.FC = () => {
  const allQuestions = [...SINGLE_QUESTIONS, ...MULTIPLE_QUESTIONS];
  const [cardList, setCardList] = useState<Question[]>(allQuestions);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [learnedSet, setLearnedSet] = useState<Set<number>>(new Set());
  const [reviewSet, setReviewSet] = useState<Set<number>>(new Set());
  const [filterType, setFilterType] = useState<'all' | 'single' | 'multiple'>('all');

  const handleShuffle = () => {
    const shuffled = [...cardList].sort(() => Math.random() - 0.5);
    setCardList(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleFilterChange = (type: 'all' | 'single' | 'multiple') => {
    setFilterType(type);
    let filtered = allQuestions;
    if (type === 'single') filtered = SINGLE_QUESTIONS;
    if (type === 'multiple') filtered = MULTIPLE_QUESTIONS;
    setCardList(filtered);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const currentQ = cardList[currentIndex] || cardList[0];

  const handleNext = () => {
    if (currentIndex < cardList.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleMarkLearned = () => {
    setLearnedSet(prev => new Set(prev).add(currentQ.id));
    setReviewSet(prev => {
      const next = new Set(prev);
      next.delete(currentQ.id);
      return next;
    });
    handleNext();
  };

  const handleMarkReview = () => {
    setReviewSet(prev => new Set(prev).add(currentQ.id));
    setLearnedSet(prev => {
      const next = new Set(prev);
      next.delete(currentQ.id);
      return next;
    });
    handleNext();
  };

  const handleVoiceSpeak = () => {
    const text = isFlipped
      ? `答案是：${currentQ.correctAnswers.map(idx => currentQ.options[idx]).join('，')}。${currentQ.explanation || ''}`
      : `${currentQ.question}。選項有：${currentQ.options.join('，')}`;
    SpeechHelper.speak(text, { rate: 1.0 });
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Top Filter and Controls */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-stone-900 border border-stone-800 p-4 rounded-2xl">
        <div className="flex items-center gap-2">
          {(['all', 'single', 'multiple'] as const).map(type => (
            <button
              key={type}
              onClick={() => handleFilterChange(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterType === type
                  ? 'bg-amber-600 text-stone-950 font-bold'
                  : 'bg-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              {type === 'all' ? '全部題庫' : type === 'single' ? '單選題 (73)' : '複選題 (30)'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="p-2 rounded-lg bg-stone-850 hover:bg-stone-800 text-stone-300 border border-stone-700 text-xs flex items-center gap-1.5 transition-colors"
            title="隨機洗牌"
          >
            <Shuffle className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">隨機洗牌</span>
          </button>
          <button
            onClick={handleVoiceSpeak}
            className="p-2 rounded-lg bg-stone-850 hover:bg-stone-800 text-stone-300 border border-stone-700 text-xs flex items-center gap-1.5 transition-colors"
            title="語音朗讀此卡片"
          >
            <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
          </button>
        </div>
      </div>

      {/* 3D Quizlet Flipcard */}
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className="cursor-pointer select-none perspective-1000 min-h-[380px] sm:min-h-[420px] rounded-3xl bg-gradient-to-br from-stone-900 to-stone-850 border-2 border-stone-800 hover:border-amber-500/60 p-6 sm:p-10 shadow-2xl transition-all duration-300 flex flex-col justify-between relative group"
      >
        {/* Card Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-400 border border-stone-700">
              {currentQ.type === 'single' ? '單選題' : '複選題'}
            </span>
            <span className="text-xs text-stone-500 font-mono">
              難度：{currentQ.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-stone-400">
            <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500 text-amber-400" />
            <span>點擊卡片翻轉查看答案</span>
          </div>
        </div>

        {/* Card Center Content */}
        <div className="py-6 text-center sm:text-left">
          {!isFlipped ? (
            <div className="space-y-4">
              <div className="text-xs text-stone-500 font-mono">
                出處：{currentQ.source}
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-stone-100 leading-relaxed">
                {currentQ.question}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left mt-4">
                {currentQ.options.map((opt, i) => (
                  <div key={i} className="p-3 rounded-xl bg-stone-800/60 border border-stone-800 text-xs sm:text-sm text-stone-300">
                    <span className="font-mono text-amber-400 mr-2 font-bold">({i + 1})</span>
                    <span>{opt}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 inline-block">
                ✓ 正確解答
              </span>
              <div className="space-y-2 mt-2">
                {currentQ.correctAnswers.map((ansIdx) => (
                  <div key={ansIdx} className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-600/70 text-sm sm:text-base font-bold text-emerald-200 text-left">
                    <span className="font-mono text-amber-300 mr-2">({ansIdx + 1})</span>
                    <span>{currentQ.options[ansIdx]}</span>
                  </div>
                ))}
              </div>

              {currentQ.explanation && (
                <div className="mt-4 p-4 rounded-xl bg-stone-900 border border-stone-800 text-left text-xs sm:text-sm text-stone-300">
                  <span className="font-bold text-amber-400">【詳解說明】</span>
                  <p className="mt-1 leading-relaxed">{currentQ.explanation}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="flex items-center justify-between text-xs text-stone-500 pt-4 border-t border-stone-800">
          <span>卡片序號：{currentIndex + 1} / {cardList.length}</span>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400">已學會: {learnedSet.size}</span>
            <span className="text-rose-400">需複習: {reviewSet.size}</span>
          </div>
        </div>
      </div>

      {/* Navigation & Learning Actions */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-3 rounded-xl bg-stone-850 hover:bg-stone-800 text-stone-300 disabled:opacity-30 border border-stone-800 flex items-center gap-1.5 text-xs sm:text-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>上一張</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleMarkReview}
            className="px-4 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/80 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors"
          >
            <XCircle className="w-4 h-4" />
            <span>還在記 (加入複習)</span>
          </button>
          <button
            onClick={handleMarkLearned}
            className="px-4 py-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800/80 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
            <span>已熟記</span>
          </button>
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === cardList.length - 1}
          className="p-3 rounded-xl bg-stone-850 hover:bg-stone-800 text-stone-300 disabled:opacity-30 border border-stone-800 flex items-center gap-1.5 text-xs sm:text-sm transition-colors"
        >
          <span>下一張</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
