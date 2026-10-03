import { RECITATIONS } from './recitations.ts';
import { SINGLE_QUESTIONS, MULTIPLE_QUESTIONS } from './questions.ts';
import { OPERATIONS_DATA } from './operations.ts';

export interface CloudFileItem {
  id: string;
  folder: string;
  fileName: string;
  fileType: 'txt' | 'json' | 'md';
  size: string;
  title: string;
  description: string;
  isMandatory: boolean;
  content: string;
}

export const generateCloudFiles = (): CloudFileItem[] => {
  const files: CloudFileItem[] = [];

  // 1. 必修背誦與語音
  const squad = RECITATIONS.find(r => r.id === 'squad-formation')!;
  files.push({
    id: 'f-rec-squad',
    folder: '01_必修背誦與語音',
    fileName: '01_班之編成_文字與語音腳本.txt',
    fileType: 'txt',
    size: `${(squad.fullText.length * 2) / 1000} KB`,
    title: squad.title,
    description: squad.description,
    isMandatory: true,
    content: `【班之編成 (背誦口令全文)】\n\n${squad.fullText}\n\n【重點摘要與各砲手編號】\n${squad.keyPoints.join('\n')}\n\n【語音聆聽指引】\n${squad.audioTips}`
  });

  const firing = RECITATIONS.find(r => r.id === 'firing-mission')!;
  files.push({
    id: 'f-rec-firing',
    folder: '01_必修背誦與語音',
    fileName: '02_射擊任務_文字與語音腳本.txt',
    fileType: 'txt',
    size: `${(firing.fullText.length * 2) / 1000} KB`,
    title: firing.title,
    description: firing.description,
    isMandatory: true,
    content: `【射擊任務 (背誦口令全文)】\n\n${firing.fullText}\n\n【覆誦要領】\n${firing.keyPoints.join('\n')}`
  });

  // 2. 器材操作口令
  const dir = RECITATIONS.find(r => r.id === 'direction-setting')!;
  files.push({
    id: 'f-op-dir',
    folder: '02_器材操作口令',
    fileName: '01_方向裝定口令.txt',
    fileType: 'txt',
    size: '1.2 KB',
    title: dir.title,
    description: dir.description,
    isMandatory: true,
    content: `【155公厘榴彈砲 方向裝定 操作口令】\n\n${dir.fullText}\n\n重點：${dir.keyPoints.join('；')}`
  });

  const elev = RECITATIONS.find(r => r.id === 'elevation-setting')!;
  files.push({
    id: 'f-op-elev',
    folder: '02_器材操作口令',
    fileName: '02_射角裝定口令.txt',
    fileType: 'txt',
    size: '1.1 KB',
    title: elev.title,
    description: elev.description,
    isMandatory: true,
    content: `【155公厘榴彈砲 射角裝定 操作口令】\n\n${elev.fullText}\n\n重點：${elev.keyPoints.join('；')}`
  });

  const fuze = RECITATIONS.find(r => r.id === 'fuze-setting')!;
  files.push({
    id: 'f-op-fuze',
    folder: '02_器材操作口令',
    fileName: '03_信管規裝定口令.txt',
    fileType: 'txt',
    size: '1.8 KB',
    title: fuze.title,
    description: fuze.description,
    isMandatory: true,
    content: `【155公厘榴彈砲 信管規裝定 操作口令】\n\n${fuze.fullText}\n\n重點檢查步驟：\n${fuze.keyPoints.join('\n')}`
  });

  const extraOps = RECITATIONS.filter(r => ['emergency-collimator-adjustment', 'residual-collimator-adjustment', 'quadrant-setting'].includes(r.id));
  files.push({
    id: 'f-op-extras',
    folder: '02_器材操作口令',
    fileName: '04_標桿修正與象限儀操作口令.txt',
    fileType: 'txt',
    size: '2.5 KB',
    title: '標桿應急、標桿餘裕與象限儀口令',
    description: '器材操作選看延伸進階口令',
    isMandatory: false,
    content: extraOps.map(op => `=== ${op.title} ===\n${op.fullText}\n`).join('\n\n')
  });

  // 3. M114A1操作手冊測考題庫
  files.push({
    id: 'f-quiz-single-json',
    folder: '03_M114A1操作手冊測考題庫',
    fileName: '單選題_73題完整題庫.json',
    fileType: 'json',
    size: '34.2 KB',
    title: 'M114A1操作手冊單選題題庫 (73題)',
    description: '標準單選題題庫包含難中易三級難度、正確解答與手冊頁碼出處',
    isMandatory: true,
    content: JSON.stringify(SINGLE_QUESTIONS, null, 2)
  });

  files.push({
    id: 'f-quiz-multi-json',
    folder: '03_M114A1操作手冊測考題庫',
    fileName: '複選題_30題完整題庫.json',
    fileType: 'json',
    size: '18.6 KB',
    title: 'M114A1操作手冊複選題題庫 (30題)',
    description: '標準複選題題庫包含難中易三級難度、複數正確解答與出處',
    isMandatory: true,
    content: JSON.stringify(MULTIPLE_QUESTIONS, null, 2)
  });

  files.push({
    id: 'f-quiz-all-json',
    folder: '03_M114A1操作手冊測考題庫',
    fileName: '全題庫_103題_整合格式.json',
    fileType: 'json',
    size: '52.8 KB',
    title: 'M114A1操作手冊全題庫 (103題整合版)',
    description: '包含全部73題單選及30題複選之完整題庫，適合直接前端匯入',
    isMandatory: true,
    content: JSON.stringify({
      title: '陸軍砲兵準則測考「M114A1牽引式155公厘榴彈砲操作手冊(士兵)」題庫',
      totalCount: SINGLE_QUESTIONS.length + MULTIPLE_QUESTIONS.length,
      singleChoiceCount: SINGLE_QUESTIONS.length,
      multipleChoiceCount: MULTIPLE_QUESTIONS.length,
      singleChoice: SINGLE_QUESTIONS,
      multipleChoice: MULTIPLE_QUESTIONS
    }, null, 2)
  });

  // 4. 砲操動作與用砲收砲
  OPERATIONS_DATA.filter(o => o.category === '砲操動作' || o.category === '收砲操作').forEach(op => {
    files.push({
      id: `f-op-${op.id}`,
      folder: '04_砲操動作與用砲收砲',
      fileName: `${op.title.replace(/[\s\/:*?"<>|]/g, '_')}.txt`,
      fileType: 'txt',
      size: `${(op.content.length * 2) / 1000} KB`,
      title: op.title,
      description: op.summary,
      isMandatory: false,
      content: `【${op.title}】\n\n${op.content}`
    });
  });

  // 5. 故障排除與安全規定
  OPERATIONS_DATA.filter(o => o.category === '故障排除' || o.category === '基本諸元與安全').forEach(op => {
    files.push({
      id: `f-saf-${op.id}`,
      folder: '05_故障排除與安全規定',
      fileName: `${op.title.replace(/[\s\/:*?"<>|]/g, '_')}.txt`,
      fileType: 'txt',
      size: `${(op.content.length * 2) / 1000} KB`,
      title: op.title,
      description: op.summary,
      isMandatory: false,
      content: `【${op.title}】\n\n${op.content}`
    });
  });

  // 6. 完整整合大封裝 (便於 GitHub 網頁前端直接調用)
  const fullExportPackage = {
    metadata: {
      appName: '155榴砲訓練與測考學習系統 (M114A1題庫與口令背誦)',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      sourceDocs: [
        '155榴砲砲操口令 (班之編成、射擊任務)',
        '155公厘榴彈砲器材操作口令 (方向裝定、射角裝定、信管規裝定等)',
        '陸軍砲兵準則測考「M114A1牽引式155公厘榴彈砲操作手冊(士兵)」題庫 (單選73題, 複選30題, 共103題)',
        '155公厘以上牽引砲實彈射擊故障排除 (不發火處置、退彈程序、機件故障)',
        '155榴砲操口令 M1A2版 (收砲反順序操作)',
        'M-155榴砲基本諸元與安全規定'
      ]
    },
    mandatoryRecitations: RECITATIONS.filter(r => r.category === 'mandatory'),
    allRecitations: RECITATIONS,
    quizDatabase: {
      totalQuestions: SINGLE_QUESTIONS.length + MULTIPLE_QUESTIONS.length,
      singleChoiceCount: SINGLE_QUESTIONS.length,
      multipleChoiceCount: MULTIPLE_QUESTIONS.length,
      singleChoice: SINGLE_QUESTIONS,
      multipleChoice: MULTIPLE_QUESTIONS
    },
    operationsAndSafety: OPERATIONS_DATA
  };

  files.push({
    id: 'f-full-export-json',
    folder: '00_系統全資料前端調用包',
    fileName: '155_artillery_training_full_export.json',
    fileType: 'json',
    size: '98.5 KB',
    title: '全系統整合 JSON 資料包 (供前端/GitHub調用)',
    description: '包含所有口令、題庫103題、故障排除手冊與諸元之完整 JSON，隨取即用',
    isMandatory: true,
    content: JSON.stringify(fullExportPackage, null, 2)
  });

  return files;
};

export const downloadBlobFile = (filename: string, content: string, mimeType = 'text/plain;charset=utf-8') => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
