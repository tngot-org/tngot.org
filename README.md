# tngot.org

## 開發指引

### 環境需求

- Node.js 22+
- pnpm 10+

### 初次配置環境

```bash
# 安裝相依套件
pnpm install
```

### 啟動開發伺服器

```bash
# 開發模式
pnpm dev
```

### 程式碼檢查與格式化

```bash
# 執行 ESLint 檢查
pnpm lint

# 自動修復 ESLint 問題
pnpm lint:fix
```

### 建置專案

```bash
# 建置生產環境版本
pnpm build

# 在本地預覽生產環境版本
pnpm preview
```

### "最新消息" (/news) 的文章清單維護

文章資料位於 `public/data/news.json` 檔案中，以 JSON 格式儲存。

#### 新增文章

要新增新的文章項目，請在 `news.json` 檔案的 `items` 陣列中新增物件，包含以下欄位：

```json
{
  "title": "文章標題",
  "date": "yyyy/MM/dd",
  "category": "分類 (詳見注意事項)",
  "department": "組別 (詳見注意事項)",
  "link": {
    "label": "連結文字（選填）",
    "url": "https://相關連結網址"
  }
}
```

#### 注意事項

- 包含 category, department，以及頁面渲染代表色的可使用項，請於 /app/types/category.ts 內進行維護
- 請確保日期格式為 `yyyy/MM/dd`

> 以上皆會自動以 vitest 與 nuxi build 檢查錯誤

### "活動記錄" (/event) 的文章清單維護

文章資料位於 `public/data/event.json` 檔案中，以 JSON 格式儲存。

#### 新增活動

要新增新的活動項目，請在 `event.json` 檔案的陣列中新增物件，包含以下欄位：

```json
[
  {
    "id": "419",
    "detail": {
      "title": "419 反共大遊行",
      "info": "2025年4月19日下午，台北市凱達格蘭大道...",
      "link": "/events/419",
      "date": "2025/04/19",
      "type": "遊行集會",
      "card": {
        "title": "「拒絕統戰，守護台灣」大會",
        "description": "「拒絕統戰，守護台灣」大會，又稱419大遊行，是2025年4月19日下午在台灣台北市凱達格蘭大道的大型集會遊行。該活動訴求為反對中國共產黨滲透及統戰、守護台灣的民主自由。",
        "image": ["/images/events/419/1.jpg", "/images/events/419/2.jpg"]
      }
    }
  }
  // ...
]
```

#### 注意事項

- `id`: 活動的唯一識別碼，請確保不重複
- `date`: 請確保日期格式為 `yyyy/MM/dd`
- `image`: 圖片路徑，請確保圖片已存在於 `public/images/events/{id}` 資料夾中

> 以上皆會自動以 vitest 與 nuxi build 檢查錯誤

## 貢獻指南

1. Fork 此專案
2. 建立您的功能分支 (`git switch -c feature/amazing-feature`)
3. 提交您的修改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 開啟 Pull Request

## 授權條款

本專案採用 MIT 授權 - 詳情請參閱 LICENSE 檔案。
