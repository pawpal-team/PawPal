# PawPal Contributing Guide

本文件整理目前 PawPal 專案的開發與協作規範，包含前後端技術棧、檔案結構、命名方式、Git 流程與 API 約定。提交程式碼前，請先確認異動符合以下原則。

## 1. 專案結構

本專案採前後端分離：

- `src/`
  - Vue 3 + Vite 前端
- `backend/`
  - Express + PostgreSQL 後端

常見目錄用途如下：

- `src/components/`
  - 前端元件
- `src/views/`
  - 前端頁面
- `src/stores/`
  - Pinia 狀態管理
- `src/api/`
  - 前端 API 請求集中管理
- `backend/src/routes/`
  - 後端路由
- `backend/src/controllers/`
  - Controller，負責 HTTP request / response
- `backend/src/middlewares/`
  - 共用中介層，例如驗證、JWT 驗證、錯誤前置處理
- `backend/src/services/`
  - 資料存取與商業邏輯
- `backend/src/schemas/`
  - Zod 驗證 schema
- `backend/test/`
  - Node test 測試檔
- `backend/database/schema/`
  - 資料表 schema
- `backend/database/seeds/`
  - 測試 / 初始資料

## 2. 技術棧

### 前端

- Vue 3
- Vite
- Vue Router
- Pinia
- Tailwind CSS
- Axios

### 後端

- Node.js
- Express
- PostgreSQL
- `pg`
- Zod
- JWT
- bcryptjs

## 3. 啟動方式

### 前端

```bash
npm install
npm run dev
```

### 後端

```bash
cd backend
npm install
npm run dev
```

### 建立資料庫

```bash
cd backend
npm run db:setup
```

若需要同時匯入 seed：

```bash
npm run db:setup:seed
```

## 4. 環境變數

### 前端

請於專案根目錄建立 `.env`：

```env
VITE_API_BASE_URL=http://localhost:3000
```

### 後端

請於 `backend/.env` 設定：

```env
PORT=3000
FRONTEND_ORIGIN=http://localhost:5173
DB_HOST=...
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=...
JWT_SECRET=...
```

注意事項：

- 不要提交 `.env`
- 新增環境變數時，請同步更新 `.env.example`

## 5. API 規範

### 路由前綴

目前所有後端 API 統一使用：

```txt
/api/v1
```

例如：

- `/api/v1/auth/register`
- `/api/v1/auth/login`
- `/api/v1/users/me`
- `/api/v1/pets`

### 前端請求位置

所有前端 API 請求必須集中放在：

- `src/api/`

禁止在元件內直接散落撰寫 Axios / fetch 請求。

### 後端分層原則

- `routes`：只負責定義 endpoint 與 middleware
- `middlewares`：處理可重用的請求前置邏輯，例如 JWT 驗證、Zod 驗證、共用攔截
- `controllers`：只負責處理 request / response
- `services`：負責資料查詢與業務邏輯
- `schemas`：負責 request 驗證

### 驗證規則

- 後端 request body / params / query 驗證優先使用 Zod
- 可預期的輸入錯誤應回傳 4xx，不應直接落成 500
- 回給使用者的錯誤訊息以中文為主，避免中英混用

## 6. 命名規範

### 前端元件

- 使用 `PascalCase`
- 例如：
  - `LoginForm.vue`
  - `DashboardSidebar.vue`

### JavaScript 變數與函式

- 使用 `camelCase`
- 例如：
  - `isLoggedIn`
  - `handleSubmit`
  - `createPetController`

### 檔名

- Vue 元件：`PascalCase.vue`
- 一般 JS 模組：
  - 依現有檔案風格維持一致
  - 若所在資料夾已採 snake_case，請沿用該風格
- 後端檔名統一使用 `snake_case`
  - 資源名稱使用複數
  - 用途後綴使用單數
  - route：`xxx.route.js`
  - controller：`xxx.controller.js`
  - service：`xxx.service.js`
  - schema：`xxx.schema.js`
- 若為多單字資源名稱，請使用底線連接，並保留複數資源名稱
  - 例如：
    - `medical_records.route.js`
    - `growth_records.schema.js`
    - `calendar_events.controller.js`

### CSS / class 命名

- 以 Tailwind utility class 為主
- 若需自訂 class，使用 `kebab-case`

## 7. Git 規範

### Branch 命名

請依工作類型加上前綴：

- `feat/...`
- `fix/...`
- `refactor/...`
- `docs/...`
- `chore/...`

範例：

- `feat/member-logout`
- `fix/mobile-sidebar-auth-state`
- `refactor/api-v1-prefix`

### Commit Message

請遵循 Conventional Commits：

- `feat:`
- `fix:`
- `refactor:`
- `docs:`
- `test:`
- `chore:`

範例：

- `feat: 建立會員登出功能`
- `fix: 修正登入後手機與平板仍顯示 public sidebar`
- `refactor: 將 API 路由前綴統一調整為 /api/v1`

### Pull Request

PR 說明建議包含：

- 功能說明
- 異動內容
- 測試方式

若有影響前後端串接，請明確說明：

- API 是否變更
- 環境變數是否變更
- 是否需要更新 seed / schema

## 8. 測試規範

### 前端

目前至少需確認：

- `npm run build` 可通過

### 後端

請執行：

```bash
cd backend
npm test
```

若有新增或修改：

- route
- controller
- service
- schema

請優先補上對應測試。

## 9. UI 與互動原則

### 視覺一致性

- 既有頁面以延續目前設計語言為優先
- 顯示給使用者的文字與錯誤訊息優先使用繁體中文
- 灰色文字或次要操作在滑鼠懸停時，優先使用 `hover:text-brand-orange`，避免同一頁混用過多不同 hover 色值

### 版面與容器

- 頁面主要內容區維持 `px-4` 起手，依既有版面再往上擴充 `md:px-8`、`lg:px-10`
- 共用內容容器優先使用：
  - `max-w-[1024px] mx-auto px-4`
  - 或既有首頁區塊常用的 `max-w-5xl mx-auto px-4`
- 若為置中的小型功能卡片或表單，優先延續現有 `w-full max-w-[360px]`

### Auth 表單規格

- Login / Register / Forgot Password 這類 auth 表單卡片應優先沿用：
  - `rounded-[18px]`
  - `bg-white`
  - `px-8 py-7`
  - `shadow-[0_10px_35px_rgba(31,41,55,0.16)]`
- auth 表單輸入框應優先沿用：
  - `h-11 w-full rounded-xl`
  - `bg-[#F3F4F8]`
  - `px-4`
  - `text-[14px] font-medium text-brand-navy`
  - `placeholder:text-brand-gray/50`
  - `focus:ring-2 focus:ring-brand-blue`

### 按鈕樣式

- 主要 CTA 盡量維持兩套主色系統：
  - 藍色主按鈕：登入、確認、送出
  - 橘色主按鈕：註冊、搜尋附近醫院、建立 / 新增類操作
- 圓角主按鈕優先使用：
  - `rounded-xl`：表單送出按鈕
  - `rounded-full`：header / sidebar / 浮動 CTA
- 多個頁面共用的主按鈕請盡量沿用既有陰影與 hover 邏輯，不要每個頁面各自定義一套

### 圓角與卡片

- 輸入框與小型控制元件優先使用 `rounded-xl`
- 一般資訊卡片優先使用 `rounded-2xl`
- pill / tab / 篩選器 / 圓形 CTA 優先使用 `rounded-full`

### Sidebar / Header Pattern

- 手機 / 平板 sidebar 以右側抽屜式結構為主，搭配遮罩與右上角關閉按鈕
- Public 與 Member 版本的 sidebar 若結構相同，應優先共用互動模式與間距節奏
- 已登入 / 未登入狀態切換時，header 與 sidebar 必須以真實 auth state 為準，不可只依頁面外觀或 variant 判斷

### 響應式設計

- 響應式需至少確認手機、平板、桌機
- 目前專案廣泛使用 `md` 與 `lg` 斷點，新增頁面時請先對齊既有頁面寫法，不要隨意自創 breakpoint 規則
- 若同一功能在平板與桌機採相同視覺，可沿用既有 `md` 後再補 `lg` 微調的方式處理

## 10. 協作原則

- 不要任意改動與本次任務無關的檔案
- 若需調整共用規格，請先在 issue / PR 中說明影響範圍
- 若是結構性修改，請同步更新文件與測試
- 若是 breaking change，請在 PR 額外標註

如發現本文件與專案現況不一致，請一併提出修正。
