import React from 'react';
import { Shield, BookOpen, Volume2, FolderKanban, CheckSquare, Layers, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  completedQuizzesCount: number;
  totalQuestions: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  completedQuizzesCount,
  totalQuestions
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 border-b border-stone-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div 
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/40 group-hover:scale-105 transition-transform">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-wide text-stone-100 group-hover:text-emerald-400 transition-colors">
                  155 榴砲訓練學習系統
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-mono">
                  M114A1
                </span>
              </div>
              <p className="text-xs text-stone-400 hidden sm:block">
                砲操口令聽力背誦 ‧ 操作手冊 103 題測考 ‧ 雲端分類匯出
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'overview'
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                  : 'text-stone-300 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>主題方塊</span>
            </button>

            <button
              onClick={() => setActiveTab('recitation')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'recitation'
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                  : 'text-stone-300 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>必修語音背誦</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                  : 'text-stone-300 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <CheckSquare className="w-4 h-4 text-amber-400" />
              <span>題庫小測驗</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-800">
                {totalQuestions}題
              </span>
            </button>

            <button
              onClick={() => setActiveTab('operations')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors hidden md:flex items-center gap-1.5 ${
                activeTab === 'operations'
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                  : 'text-stone-300 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>選看文件</span>
            </button>

            <button
              onClick={() => setActiveTab('cloud')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'cloud'
                  ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40'
                  : 'text-stone-300 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <FolderKanban className="w-4 h-4 text-blue-400" />
              <span className="hidden sm:inline">雲端資料夾</span>
              <span className="sm:hidden">雲端</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
