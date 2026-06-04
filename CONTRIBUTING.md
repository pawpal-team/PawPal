# 專案開發規範指引 (Project Development Guidelines)

本文件定義了本專案的框架、命名、Git 流程以及 API 管理等核心規範，請所有開發人員務必遵循，以維持程式碼的一品質與團隊協作效率。

---

## 🛠 框架與技術棧 (Framework & Tech Stack)

* **前端框架：** Vue.js
* **樣式處理：** CSS
* **網路請求：** Axios

---

## 🏷 命名規範 (Naming Conventions)

### 1. 元件命名 (Component Naming)
* **規範：** 統一使用 **PascalCase** (大駝峰命名法)。
* **範例：**
    * `UserCard.vue`
    * `NavbarMenu.vue`
    * `ProductList.vue`

### 2. 變數命名 (Variable Naming)
* **規範：** 統一使用 **camelCase** (小駝峰命名法)。
* **範例：**
    * `userName`
    * `isLoading`
    * `productList`

### 3. CSS Class 命名 (CSS Class Naming)
* **規範：** 統一使用 **kebab-case** (短橫線連接法)。
* **範例：**
    * `.product-card`
    * `.navbar-menu`
    * `.login-form`

---

## 🌿 Git 🚀 與 Commit 規範

### 1. 分支命名規範 (Branch Naming)
依據功能類型使用特定前綴，並以 `kebab-case` 命名功能名稱：
* **新功能開發：** `feature/功能名稱` (例：`feature/login`, `feature/cart-page`)
* **Bug 修復：** `fix/問題名稱` (例：`fix/navbar-bug`)

### 2. Commit 訊息規範 (Commit Message)
* 請遵循標準的 **Conventional Commits** 規範。
* **參考文件：** [CodeLove Commit 規範指引](https://codelove.tw/@tony/post/ga9Epa)

---

## 🌐 API 管理規範 (API Management)

* **集中管理：** 所有 Axios 請求與 API 呼叫，必須統一分類並放置於專案根目錄的 `api` (或 `API`) 資料夾中，嚴禁在元件內直接散落編寫獨立的 Axios 請求。

---

## 🎨 UI 規範 (UI Standards)

* **UI 規範項目：**
  * **字體設定：**
    * 繁中：`Chiron GoRound TC`、`Noto Sans Traditional Chinese`
    * 英文：`Fredoka`
  * 字體大小:
  * 顏色:
  * 間距:
* **目前狀態：** 暫定 (後續更新補上)。

---

## 📅 團隊協作與會議 (Meetings)

* **站立會議 (Daily Standup)：** 每次會議均需落實會議記錄，並更新於團隊共享文件中。