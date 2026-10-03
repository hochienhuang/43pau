import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { ThemeBubbleGrid } from './components/ThemeBubbleGrid.tsx';
import { RecitationView } from './components/RecitationView.tsx';
import { QuizSection } from './components/QuizSection.tsx';
import { DocumentReader } from './components/DocumentReader.tsx';
import { CloudExplorer } from './components/CloudExplorer.tsx';
import { FlashcardsView } from './components/FlashcardsView.tsx';
import { SINGLE_QUESTIONS, MULTIPLE_QUESTIONS } from './data/questions.ts';
import { 
  Volume2, 
  CheckSquare, 
  Layers, 
  FolderKanban, 
  BookOpen, 
  Sparkles, 
  Download,
  RotateCw,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [activeRecitationId, setActiveRecitationId] = useState<string>('squad-formation');
  const [activeOperationId, setActiveOperationId] = useState<string>('gun-drill-duties');
  const [quizConfig, setQuizConfig] = useState<{
    type?: 'single' | 'multiple' | 'all';
    count?: number;
  }>({ type: 'all', count: 20 });

  const totalQuestions = SINGLE_QUESTIONS.length + MULTIPLE_QUESTIONS.length;

  const handleSelectRecitation = (recitationId: string) => {
    setActiveRecitationId(recitationId);
    setActiveTab('recitation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartQuiz = (options: { type: 'single' | 'multiple' | 'all'; count: number }) => {
    setQuizConfig(options);
    setActiveTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOperation = (opId: string) => {
    setActiveOperationId(opId);
    setActiveTab('operations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCloud = () => {
    setActiveTab('cloud');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedQuizzesCount={0}
        totalQuestions={totalQuestions}
      />

      {/* Secondary Quick Sub-Bar (When not on overview) */}
      {activeTab !== 'overview' && (
        <div className="bg-stone-900/90 border-b border-stone-800/80 px-4 py-2 text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('overview')}
                className="text-stone-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
              >
                <span>首頁主題方塊</span>
              </button>
              <span className="text-stone-600">/</span>
              <span className="text-stone-200 font-semibold">
                {activeTab === 'recitation' && '必修文字與語音背誦 (聽力練習)'}
                {activeTab === 'quiz' && 'M114A1手冊測考題庫小測驗'}
                {activeTab === 'flashcards' && 'Quizlet 記憶翻轉卡片模式'}
                {activeTab === 'operations' && '選看文件與故障排除手冊'}
                {activeTab === 'cloud' && '雲端資料夾分類與前端 JSON 匯出'}
              </span>
            </div>

            {/* Quick switcher tabs */}
            <div className="flex items-center gap-2">
              {activeTab === 'quiz' && (
                <button
                  onClick={() => setActiveTab('flashcards')}
                  className="px-2.5 py-1 rounded-md bg-stone-800 hover:bg-stone-700 text-amber-300 flex items-center gap-1 border border-stone-700 text-[11px]"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>切換至 Quizlet 翻轉卡片</span>
                </button>
              )}
              {activeTab === 'flashcards' && (
                <button
                  onClick={() => setActiveTab('quiz')}
                  className="px-2.5 py-1 rounded-md bg-stone-800 hover:bg-stone-700 text-amber-300 flex items-center gap-1 border border-stone-700 text-[11px]"
                >
                  <CheckSquare className="w-3 h-3" />
                  <span>切換至測驗評分模式</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'overview' && (
          <ThemeBubbleGrid
            onSelectRecitation={handleSelectRecitation}
            onStartQuiz={handleStartQuiz}
            onSelectOperation={handleSelectOperation}
            onOpenCloud={handleOpenCloud}
          />
        )}

        {activeTab === 'recitation' && (
          <RecitationView
            initialId={activeRecitationId}
            onNavigateToQuiz={() => handleStartQuiz({ type: 'all', count: 20 })}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizSection initialConfig={quizConfig} />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsView />
        )}

        {activeTab === 'operations' && (
          <DocumentReader initialId={activeOperationId} />
        )}

        {activeTab === 'cloud' && (
          <CloudExplorer />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 border-t border-stone-800 py-6 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-stone-400 font-medium">
              155公厘牽引榴彈砲 (M114A1) 砲操口令與準則測考系統
            </span>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>支援 GitHub Pages 靜態託管</span>
            <span>‧</span>
            <span>支援標準 JSON 前端調用</span>
            <span>‧</span>
            <span>包含語音合成與錯題檢討</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
