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

## 貢獻指南

1. Fork 此專案
2. 建立您的功能分支 (`git switch -c feature/amazing-feature`)
3. 提交您的修改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 開啟 Pull Request

## 授權條款

本專案採用 MIT 授權 - 詳情請參閱 LICENSE 檔案。
