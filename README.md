## TNGT 官網

台灣未來的主人們
The Next Generation Taiwanese - TNGT

## Tech Stack

- **Web Framework**: Nuxt 3
- **UI Framework**: Nuxt UI
- **CSS Framework**: Tailwind CSS
- **Testing**: Vitest
- **Linting**: ESLint
- **Formatter**: Prettier

## 開發指引

### 環境需求

- Node.js 22+
- pnpm 10+

### 初次配置環境

```bash
# 安裝相依套件
pnpm install
```

### 開發指令

```bash
# 啟動開發伺服器
pnpm dev

# 建置生產環境版本
pnpm build

# 靜態生成
pnpm generate

# 在本地預覽生產環境版本
pnpm preview

# 完整測試、建置、預覽流程
pnpm rePreview
```

### 程式碼品質

```bash
# 執行 ESLint 檢查
pnpm lint

# 自動修復 ESLint 問題
pnpm lint:fix

# 執行測試
pnpm test
```

### "最新消息" (/news) 的文章清單維護

文章資料位於 `server/assets/news.json` 檔案中，以 JSON 格式儲存。

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

- 包含 category, department，以及頁面渲染代表色的可使用項，請於 `shared/types/category.ts` 內進行維護
- 請確保日期格式為 `yyyy/MM/dd`
- 資料會透過 `/server/api/news.ts` API 路由提供給前端使用

> 以上皆會自動以 vitest 與 nuxi build 檢查錯誤

### "活動記錄" (/event) 的文章清單維護

文章資料位於 `server/assets/event.json` 檔案中，以 JSON 格式儲存。

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
      "date": "2025-04-19",
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
- `date`: 請確保日期格式為 `yyyy-MM-dd` (ISO 8601 格式)
- `image`: 圖片路徑，請確保圖片已存在於 `public/images/events/{id}` 資料夾中
- 資料會透過 `/server/api/event.ts` API 路由提供給前端使用
- 活動詳細頁面透過 `pages/events/[title].vue` 動態路由展示

> 以上皆會自動以 vitest 與 nuxi build 檢查錯誤

## 專案結構

```
tngot/
├── .husky/                 # Git hooks 配置
├── .vscode/                # VS Code 設定檔
├── app/                    # Nuxt 應用核心檔案
│   ├── assets/             # 資源檔案 (CSS)
│   ├── components/         # Vue ¶
│   ├── composables/        # 組合式函數
│   ├── layouts/            # 佈局模板
│   ├── pages/              # 頁面路由
│   │   └── events/         # 活動詳細頁面 (動態路由)
│   ├── test/               # 測試檔案
│   ├── utils/              # 工具函數
│   ├── app.config.ts       # 應用配置
│   └── app.vue             # 根元件
├── public/                 # 靜態資源
│   ├── fonts/              # 字體檔案
│   ├── images/             # 圖片資源
│   │   ├── avatar/         # 頭像圖片
│   │   ├── backgrounds/    # 背景圖片
│   │   └── events/         # 活動相關圖片
│   ├── logo/               # 網站 Logo
│   ├── og_img/             # Open Graph 圖片
│   ├── favicon.ico         # 網站圖標
│   ├── favicon.png         # 網站圖標
│   └── robots.txt          # SEO 爬蟲設定
├── server/                 # 伺服器端檔案
│   ├── api/                # API 路由
│   ├── assets/             # 伺服器資料檔案
│   └── tsconfig.json       # TypeScript 配置
└── shared/                 # 共享類型定義
    └── types/              # TypeScript 類型檔案
```

## 貢獻指南

1. Fork 此專案
2. 建立您的功能分支 (`git switch -c feature/amazing-feature`)
3. 提交您的修改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 開啟 Pull Request

## 授權條款

本專案採用 MIT 授權 - 詳情請參閱 LICENSE 檔案。
