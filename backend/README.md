# PawPal Backend

## 第一次使用

進入 backend 資料夾：

```bash
cd backend
```

安裝套件：

```bash
npm install
```

建立環境變數檔案：

複製 `.env.example` 並重新命名為 `.env`：

```txt
.env
```

依照個人 PostgreSQL 設定修改 `.env`：

```env
PORT=3000
FRONTEND_ORIGIN=http://localhost:5173

DB_HOST=db.your-project-ref.supabase.co
DB_PORT=5432

DB_NAME=postgres

DB_USER=postgres
DB_PASSWORD=your_supabase_db_password

JWT_SECRET=your_jwt_secret
```

說明：

- `FRONTEND_ORIGIN`：前端本機開發網址，預設為 `http://localhost:5173`
- `DB_HOST`：Supabase 專案的資料庫主機名稱
- `DB_PORT`：Supabase PostgreSQL 連線埠，通常是 `5432`
- `DB_NAME`：Supabase PostgreSQL 資料庫名稱，通常是 `postgres`
- `DB_USER`：Supabase PostgreSQL 使用者名稱，通常是 `postgres`
- `DB_PASSWORD`：Supabase 資料庫密碼，請使用資料庫連線密碼，不是 `anon key`
- `JWT_SECRET`：後端用來簽發 JWT 的密鑰

注意：

- 本專案目前是使用 Node.js `pg` 套件直接連 Supabase 提供的 PostgreSQL。
- 這裡使用的是資料庫連線資訊，不是 Supabase 的 `Project URL`、`anon key` 或 `service_role key`。

---

## 建立資料庫

進入 backend 資料夾：

```bash
cd backend
```

確認 Supabase 專案已建立且 `.env` 設定正確後，執行：

```bash
npm run db:setup
```

此指令會自動依照外鍵依賴順序執行所有 `schema` 檔案，將資料表建立到 Supabase PostgreSQL。

若需要一併匯入 seed 資料，請執行：

```bash
npm run db:setup:seed
```

此指令會在建立 schema 後，再依序執行所有 `seed` 檔案。

注意：

- `db:setup:seed` 會將測試資料直接寫入 Supabase 資料庫。
- 若只是開發測試使用，測試完成後請記得清除測試資料，避免影響其他組員。
- 清除方式可擇一：
  - 在 Supabase / SQL Editor 手動執行 `TRUNCATE`。
  - 重新執行不帶 seed 的：

```bash
npm run db:setup
```

此做法會重建 schema，但不會重新匯入 seed 資料。

若增加新資料表，只要在 `setup-db.js` 的 `TABLES_IN_ORDER` 陣列加上表名即可，不用調整其他邏輯。

注意：每次執行都會清除現有資料並重建，請勿在正式環境使用。

---

## 啟動後端

```bash
npm run dev
```

成功啟動後會看到：

```txt
Server running on port 3000
```

---

## 測試是否成功

瀏覽器開啟：

```txt
http://localhost:3000
```

應顯示：

```json
{
  "message": "PawPal Backend Running"
}
```
