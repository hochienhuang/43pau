# 155公厘牽引榴彈砲 (M114A1) 砲操口令背誦與測考系統

## 專案介紹
本專案為 155 公厘榴彈砲（M114A1）標準操作手冊、砲操口令聽力背誦與 103 題士兵測考題庫之互動學習系統。
支援 GitHub Pages 靜態網站快速託管部署。

---

## ⚡ 為什麼 GitHub Pages 網址「動不了」或顯示空白？
如果您直接將本專案原始碼上傳到 GitHub，並在 Settings > Pages 中使用根目錄 `/` 部署，網頁會因為以下原因無法動作：
1. **瀏覽器無法直接執行 `.tsx` 檔案**：原始碼中的 `index.html` 引用了 `/src/main.tsx`，這是開發時的源碼，必須經過 Vite 編譯轉成瀏覽器能執行的 `.js` 檔。
2. **路徑問題**：GitHub Pages 通常位於子目錄 `https://帳號.github.io/倉庫名/`，若未指定相對路徑 `./` 會找不到 CSS 與 JS。

---

## 🚀 三種讓 GitHub 網址立刻正常運作的方法（任選一種）：

### 方法 A（最推薦，一鍵設定完成）：使用 `/docs` 資料夾發布
專案內已經為您編譯好包含完整網頁檔案的 `docs/` 資料夾（內含 `docs/index.html` 與 `docs/assets/`）。
1. 將專案的所有檔案 push 上傳到您的 GitHub 倉庫。
2. 開啟您的 GitHub 倉庫，點選上方的 **Settings**（設定）。
3. 點選左側選單的 **Pages**。
4. 在 **Build and deployment** 下方的 **Branch**：
   - 分支選擇：`main`（或 `master`）
   - 資料夾選擇：**`/docs`**（不要選 `/ (root)`）
5. 點擊 **Save**（儲存）。
6. 等待 30 秒至 1 分鐘，重新整理 GitHub Pages 網址，網頁即可完美流暢運作！

---

### 方法 B（現代官方自動化）：使用 GitHub Actions 自動編譯
專案內已包含 `.github/workflows/deploy.yml` 自動部署腳本。
1. 將專案 push 到 GitHub。
2. 進入倉庫的 **Settings** > **Pages**。
3. 在 **Source** 下拉選單中選擇 **GitHub Actions**。
4. GitHub 將會自動在背景執行 `npm run build` 並自動將編譯後的網頁發布到 GitHub Pages。

---

### 方法 C（本機手動編譯）：
若您在本機修改了程式碼，可執行：
```bash
npm install
npm run build
cp -r dist/* docs/
git add docs/
git commit -m "Update docs for GitHub Pages"
git push
```

---

## 系統核心功能
- **必修背誦語音聽力**：
  1. 班之編成（背誦與角色賦予）
  2. 射擊任務（諸元下達、覆誦與發射放口令）
  3. 155器材操作口令：方向裝定、射角裝定、信管規裝定（含標桿修正與象限儀）
  - 支援 Web Speech API 語音朗讀、速度微調、分段逐句聆聽與默背挖空考驗模式。
- **M114A1操作手冊測考題庫（Quizlet 模式）**：
  - 完整收錄 73 題單選題 + 30 題複選題（共 103 題）。
  - 選項順序隨機打亂、題數自由選取（5/10/20/50/全做）。
  - 即時評分與成績單，並在下方提供錯題檢討、標準答案與準則頁次解析。
  - 支援「僅重測錯題」與「3D 翻轉卡片模式」。
- **選看文件閱讀**：砲操各砲手職責、用砲階段指揮、收砲反順序操作（M1A2版）、實彈射擊故障排除（不發火/退彈）及基本諸元。
- **雲端資料夾分類整理與 JSON 匯出**：提供一鍵下載全系統 JSON 及單檔下載。
