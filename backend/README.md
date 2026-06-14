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

DB_HOST=localhost
DB_PORT=5432

DB_NAME=pawpal_db

DB_USER=postgres
DB_PASSWORD=your_password
```

說明：

- `FRONTEND_ORIGIN`：前端本機開發網址，預設為 `http://localhost:5173`
- `DB_USER`：PostgreSQL 使用者名稱，預設通常是 `postgres`
- `DB_PASSWORD`：你的 PostgreSQL 密碼

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
