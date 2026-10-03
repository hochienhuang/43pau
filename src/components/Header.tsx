import React, { useState } from 'react';
import { 
  Shield, 
  BookOpen, 
  Volume2, 
  FolderKanban, 
  CheckSquare, 
  Layers, 
  Sparkles,
  Github,
  HelpCircle,
  X,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

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
  const [showDeployModal, setShowDeployModal] = useState<boolean>(false);

  return (
    <>
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

              {/* GitHub Pages Deploy Helper Button */}
              <button
                onClick={() => setShowDeployModal(true)}
                className="px-2.5 py-1.5 rounded-md bg-stone-800 hover:bg-stone-750 text-amber-300 hover:text-amber-200 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 ml-1 transition-all"
                title="GitHub 部署與上線修復指引"
              >
                <Github className="w-3.5 h-3.5" />
                <span className="hidden md:inline">GitHub 上線設定</span>
                <span className="md:hidden">上線</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* GitHub Deployment Helper Modal */}
      {showDeployModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-stone-900 border border-stone-700 rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowDeployModal(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-lg bg-stone-800 hover:bg-stone-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Github className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-100">
                  GitHub Pages 網址「動不了」修復教學
                </h3>
                <p className="text-xs text-stone-400">
                  為什麼上傳後網頁不能動？如何 30 秒設定讓它正常運行？
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-stone-800 pt-4">
              {/* Reason */}
              <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-900/60 text-rose-200 flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">問題原因：</span>
                  瀏覽器無法直接執行未編譯的 TypeScript/React 源碼（原始專案中的 <code className="text-stone-300 bg-stone-900 px-1 py-0.5 rounded">index.html</code> 指向了 <code className="text-stone-300 bg-stone-900 px-1 py-0.5 rounded">/src/main.tsx</code>），且 GitHub Pages 網址路徑是子目錄。
                </div>
              </div>

              {/* Solution 1: Recommended */}
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-300 text-sm flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>方法一（最推薦）：設定 GitHub Pages 來源為 /docs</span>
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-900 text-emerald-200 font-mono">
                    已自動編譯完成
                  </span>
                </div>
                <p className="text-stone-300 text-xs">
                  我們已經在您的專案中建置了已編譯完成的 <code className="text-emerald-300 bg-stone-950 px-1.5 py-0.5 rounded">docs/</code> 資料夾（內含可直接執行的 HTML、CSS、JS）。
                </p>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-stone-200 bg-stone-950/60 p-3 rounded-lg border border-stone-800 font-sans">
                  <li>把此專案 push 上傳到您的 GitHub 倉庫。</li>
                  <li>到 GitHub 倉庫頁面，點選上方的 <strong>Settings</strong>（設定）。</li>
                  <li>在左側選單點選 <strong>Pages</strong>。</li>
                  <li>
                    在 <strong>Build and deployment</strong> 的 <strong>Branch</strong>：
                    <br />
                    • 分支選 <span className="text-amber-300 font-bold">main</span>（或 master）
                    <br />
                    • 右邊資料夾請選 <span className="text-emerald-400 font-bold">/docs</span>（千萬不要選 /root）
                  </li>
                  <li>點擊 <strong>Save</strong>，等待 30 秒至 1 分鐘重新整理，網頁就能正常使用！</li>
                </ol>
              </div>

              {/* Solution 2: GitHub Actions */}
              <div className="p-4 rounded-xl bg-stone-850 border border-stone-800 space-y-2">
                <div className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>方法二（全自動）：使用 GitHub Actions 雲端自動建置</span>
                </div>
                <p className="text-xs text-stone-400">
                  專案中已內建 <code className="text-stone-200 bg-stone-900 px-1 py-0.5 rounded">.github/workflows/deploy.yml</code> 自動部署腳本。
                </p>
                <div className="text-xs text-stone-300 bg-stone-950/60 p-3 rounded-lg border border-stone-800">
                  在 GitHub 倉庫的 <strong>Settings</strong> &gt; <strong>Pages</strong> 中，將 <strong>Source</strong> 切換為 <strong>GitHub Actions</strong> 即可。每次 push 雲端都會自動幫您編譯並更新網頁！
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDeployModal(false)}
                className="px-5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors"
              >
                我知道了，關閉說明
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
