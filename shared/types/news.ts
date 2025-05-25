// 連結資訊介面
export interface LinkInfo {
  label: string;
  url: string;
}

// 定義新聞項目基本結構
export interface NewsItemBase {
  title: string;
  date: string;
  department: string;
  link?: LinkInfo;
}

// 定義原始新聞項目的介面 (從API獲取)
export interface RawNewsItem extends NewsItemBase {
  category: string;
}

// 定義轉換後的新聞項目介面
export interface NewsItem extends NewsItemBase {
  category: CategoryType;
}
