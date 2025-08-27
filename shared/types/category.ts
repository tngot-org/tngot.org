import { useI18n } from 'vue-i18n';

// 分類顏色類型
export type CategoryColor =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'warning'
  | 'success';

// 文章分類枚舉
export enum CategoryType {
  WEBSITE_UPDATE = 'website_update',
  EVENT_PROMOTION = 'event_promotion'
}

// 定義分類資訊介面
export interface CategoryInfo {
  color: CategoryColor;
}

// 分類顏色對照表
export const categoryInfo: Record<CategoryType, CategoryInfo> = {
  [CategoryType.WEBSITE_UPDATE]: {
    color: 'info'
  },
  [CategoryType.EVENT_PROMOTION]: {
    color: 'primary'
  }
};

// 取得分類對應的顏色
export const getCategoryColor = (category: CategoryType): CategoryColor => {
  return categoryInfo[category].color || 'primary';
};

// 取得分類對應的標籤
export const getCategoryLabel = (category: CategoryType): string => {
  const { t } = useI18n();
  return t(`news.categories.${category}`) || '';
};
