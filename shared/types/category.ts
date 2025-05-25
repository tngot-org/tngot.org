// 分類顏色類型
export type CategoryColor =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'warning'
  | 'success';

// 文章分類枚舉
export enum CategoryType {
  WEBSITE_UPDATE = 'website-update',
  EVENT_PROMOTION = 'event-promotion'
}

// 定義分類資訊介面
export interface CategoryInfo {
  label: string;
  color: CategoryColor;
}

// 分類資訊對照表（包含中文名稱和顏色）
export const categoryInfo: Record<CategoryType, CategoryInfo> = {
  [CategoryType.WEBSITE_UPDATE]: {
    label: '網站更新',
    color: 'info'
  },
  [CategoryType.EVENT_PROMOTION]: {
    label: '活動宣傳',
    color: 'primary'
  }
};

// 取得分類對應的顏色
export const getCategoryColor = (category: CategoryType): CategoryColor => {
  return categoryInfo[category].color || 'primary';
};

// 取得分類對應的標籤
export const getCategoryLabel = (category: CategoryType): string => {
  return categoryInfo[category].label || '';
};
