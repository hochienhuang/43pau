import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Copy, 
  Check, 
  ChevronRight, 
  AlertTriangle, 
  Wrench, 
  Layers, 
  ShieldAlert,
  FileText
} from 'lucide-react';
import { OPERATIONS_DATA, OperationSection } from '../data/operations.ts';

interface DocumentReaderProps {
  initialId?: string;
}

export const DocumentReader: React.FC<DocumentReaderProps> = ({ initialId }) => {
  const [selectedId, setSelectedId] = useState<string>(initialId || OPERATIONS_DATA[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', '砲操動作', '收砲操作', '故障排除', '基本諸元與安全'];

  const filteredDocs = OPERATIONS_DATA.filter(doc => {
    const matchesCat = activeCategory === 'all' || doc.category === activeCategory;
    const matchesQuery = !searchQuery || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const activeDoc = OPERATIONS_DATA.find(d => d.id === selectedId) || OPERATIONS_DATA[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeDoc.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Sidebar List */}
      <div className="lg:col-span-4 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="搜尋手冊關鍵字..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 placeholder-stone-500"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-stone-700 text-white'
                  : 'bg-stone-850 text-stone-400 hover:text-stone-200'
              }`}
            >
              {cat === 'all' ? '全部' : cat}
            </button>
          ))}
        </div>

        {/* Document Items List */}
        <div className="space-y-2">
          {filteredDocs.map((doc) => {
            const isSelected = doc.id === activeDoc.id;
            return (
              <div
                key={doc.id}
                onClick={() => setSelectedId(doc.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-md'
                    : 'bg-stone-900 border-stone-800 text-stone-300 hover:bg-stone-850 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] px-2 py-0.5 rounded bg-stone-800 text-emerald-400 border border-stone-700">
                    {doc.tag}
                  </span>
                  <span className="text-[11px] text-stone-400">{doc.category}</span>
                </div>
                <h4 className="font-bold text-sm text-stone-100 mb-1">
                  {doc.title}
                </h4>
                <p className="text-xs text-stone-400 line-clamp-2">
                  {doc.summary}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Document Content */}
      <div className="lg:col-span-8">
        <div className="rounded-2xl bg-stone-900 border border-stone-800 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-stone-850 border-b border-stone-800 flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                  {activeDoc.category}
                </span>
                <span className="text-xs text-stone-400 font-mono">選看研讀文件</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-100">
                {activeDoc.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 mt-1">
                {activeDoc.summary}
              </p>
            </div>

            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-medium border border-stone-700 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '已複製內容' : '複製文字'}</span>
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            <div className="p-5 sm:p-7 rounded-xl bg-stone-950/60 border border-stone-800/80 leading-relaxed text-stone-200 font-sans text-sm sm:text-base whitespace-pre-line">
              {activeDoc.content}
            </div>

            {/* Subsections if available */}
            {activeDoc.subsections && activeDoc.subsections.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-stone-800">
                {activeDoc.subsections.map((sub, sIdx) => (
                  <div key={sIdx} className="p-4 rounded-xl bg-stone-850/60 border border-stone-800">
                    <h4 className="text-sm font-bold text-amber-300 mb-2.5 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>{sub.subtitle}</span>
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
                      {sub.items.map((it, itIdx) => (
                        <li key={itIdx} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold mt-0.5">•</span>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
