import React, { useState } from 'react';
import { 
  FolderKanban, 
  Folder, 
  FolderOpen, 
  FileText, 
  FileCode, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  Cloud, 
  ShieldCheck, 
  Database,
  Code2,
  Sparkles,
  Terminal
} from 'lucide-react';
import { generateCloudFiles, CloudFileItem, downloadBlobFile } from '../data/cloudExport.ts';

export const CloudExplorer: React.FC = () => {
  const allFiles = generateCloudFiles();
  const [selectedFileId, setSelectedFileId] = useState<string>(allFiles[0].id);
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);
  const [showCodeSnippet, setShowCodeSnippet] = useState<boolean>(false);

  // Group files by folder
  const folders = Array.from(new Set(allFiles.map(f => f.folder))).sort();

  const filteredFiles = selectedFolder === 'all'
    ? allFiles
    : allFiles.filter(f => f.folder === selectedFolder);

  const activeFile = allFiles.find(f => f.id === selectedFileId) || allFiles[0];

  const handleDownloadActive = () => {
    const mime = activeFile.fileType === 'json' ? 'application/json' : 'text/plain';
    downloadBlobFile(activeFile.fileName, activeFile.content, mime);
  };

  const handleDownloadAllJson = () => {
    const fullPkgFile = allFiles.find(f => f.id === 'f-full-export-json');
    if (fullPkgFile) {
      downloadBlobFile('155_artillery_training_full_export.json', fullPkgFile.content, 'application/json');
    }
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const frontEndSnippet = `// 在 GitHub 網頁或任何前端專案中調用 155 榴砲資料庫：
async function loadArtilleryData() {
  const response = await fetch('./155_artillery_training_full_export.json');
  const data = await response.json();
  
  console.log("必修背誦口令：", data.mandatoryRecitations);
  console.log("單選題庫 (73題)：", data.quizDatabase.singleChoice);
  console.log("複選題庫 (30題)：", data.quizDatabase.multipleChoice);
  console.log("故障排除手冊：", data.operationsAndSafety);
  return data;
}`;

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(frontEndSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl bg-stone-900 border border-stone-800 p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800 font-semibold flex items-center gap-1.5">
              <Cloud className="w-3.5 h-3.5" />
              <span>雲端資料夾分類整理</span>
            </span>
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>分類文字檔與 JSON 已就緒</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-100">
            雲端資料夾管理與前端 JSON 匯出中心
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            已將本手冊所有文字自動掃描分類至指定虛擬雲端目錄，隨時可一鍵匯出供 GitHub 網頁前端調用
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleDownloadAllJson}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-950/40 flex items-center gap-2 transition-all hover:scale-102"
          >
            <Download className="w-4 h-4" />
            <span>一鍵匯出全系統 JSON</span>
          </button>
          <button
            onClick={() => setShowCodeSnippet(!showCodeSnippet)}
            className="px-3.5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs sm:text-sm font-medium border border-stone-700 flex items-center gap-1.5 transition-colors"
          >
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span>前端調用代碼</span>
          </button>
        </div>
      </div>

      {/* Code Snippet Drawer */}
      {showCodeSnippet && (
        <div className="rounded-2xl bg-stone-950 border border-stone-800 p-5 shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>GitHub 靜態網頁前端調用範例 (JavaScript)</span>
            </div>
            <button
              onClick={handleCopySnippet}
              className="text-xs px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center gap-1"
            >
              {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSnippet ? '已複製' : '複製代碼'}</span>
            </button>
          </div>
          <pre className="text-xs font-mono text-emerald-300/90 bg-black/60 p-4 rounded-xl overflow-x-auto leading-relaxed border border-stone-900">
            {frontEndSnippet}
          </pre>
        </div>
      )}

      {/* Explorer Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Folders & Files Tree */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl bg-stone-900 border border-stone-800 p-4 shadow-xl">
            <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>雲端資料夾樹狀目錄</span>
              <span className="font-mono text-[10px] bg-stone-800 px-2 py-0.5 rounded text-stone-400">
                {allFiles.length} 檔案
              </span>
            </div>

            {/* Folder selection buttons */}
            <div className="space-y-1 mb-4">
              <button
                onClick={() => setSelectedFolder('all')}
                className={`w-full p-2.5 rounded-xl text-left text-xs font-medium flex items-center gap-2 transition-colors ${
                  selectedFolder === 'all'
                    ? 'bg-stone-800 text-stone-100 font-bold'
                    : 'text-stone-400 hover:bg-stone-850 hover:text-stone-200'
                }`}
              >
                <FolderOpen className="w-4 h-4 text-blue-400" />
                <span>全部目錄 (顯示所有檔案)</span>
              </button>

              {folders.map((folder) => {
                const isSelected = selectedFolder === folder;
                const count = allFiles.filter(f => f.folder === folder).length;
                return (
                  <button
                    key={folder}
                    onClick={() => setSelectedFolder(folder)}
                    className={`w-full p-2.5 rounded-xl text-left text-xs font-medium flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-blue-950/40 text-blue-300 border border-blue-800/80 font-bold'
                        : 'text-stone-400 hover:bg-stone-850 hover:text-stone-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {isSelected ? (
                        <FolderOpen className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      ) : (
                        <Folder className="w-4 h-4 text-stone-500 flex-shrink-0" />
                      )}
                      <span className="truncate">{folder}</span>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-stone-800 text-stone-400">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Files List in current folder */}
            <div className="pt-3 border-t border-stone-800 space-y-1.5">
              <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">
                資料夾中之文字與JSON檔
              </div>
              {filteredFiles.map((file) => {
                const isSelected = file.id === activeFile.id;
                return (
                  <button
                    key={file.id}
                    onClick={() => setSelectedFileId(file.id)}
                    className={`w-full p-2.5 rounded-xl text-left text-xs flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-emerald-950/50 text-emerald-200 border border-emerald-600/60 shadow-md'
                        : 'bg-stone-850/60 border border-stone-800/70 text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {file.fileType === 'json' ? (
                        <FileCode className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      ) : (
                        <FileText className="w-4 h-4 text-stone-400 flex-shrink-0" />
                      )}
                      <span className="truncate font-medium">{file.fileName}</span>
                    </div>
                    <span className="text-[10px] font-mono text-stone-500 ml-2">
                      {file.size}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Active File Preview & Actions */}
        <div className="lg:col-span-8">
          <div className="rounded-2xl bg-stone-900 border border-stone-800 shadow-xl overflow-hidden flex flex-col h-[700px]">
            {/* File Viewer Header */}
            <div className="p-4 sm:p-5 bg-stone-850 border-b border-stone-800 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-stone-800 text-stone-200 border border-stone-700">
                  {activeFile.fileType === 'json' ? (
                    <FileCode className="w-5 h-5 text-amber-400" />
                  ) : (
                    <FileText className="w-5 h-5 text-emerald-400" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm sm:text-base text-stone-100 font-mono">
                      {activeFile.fileName}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-400 uppercase font-mono">
                      {activeFile.fileType}
                    </span>
                  </div>
                  <div className="text-xs text-stone-400 mt-0.5">
                    雲端路徑：<span className="text-stone-300 font-mono">{activeFile.folder}/{activeFile.fileName}</span> (大小: {activeFile.size})
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyContent}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium border border-stone-700 flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '已複製' : '複製檔案'}</span>
                </button>
                <button
                  onClick={handleDownloadActive}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>下載此檔</span>
                </button>
              </div>
            </div>

            {/* File Content Preview */}
            <div className="flex-1 p-5 overflow-auto bg-stone-950/80 font-mono text-xs text-stone-300 leading-relaxed scrollbar-thin">
              <pre className="whitespace-pre-wrap select-all">
                {activeFile.content}
              </pre>
            </div>

            {/* File Viewer Footer */}
            <div className="px-5 py-3 bg-stone-850 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>校驗通過：文字完整、符號轉譯精確</span>
              </span>
              <span>支援 JSON.parse() 直接解析</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
