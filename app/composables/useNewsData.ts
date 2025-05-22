// 文章分類枚舉
export enum CategoryType {
  WEBSITE_UPDATE = 'website-update',
  EVENT_PROMOTION = 'event-promotion'
}

// 分類顏色類型
export type CategoryColor =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'warning'
  | 'success';

// 相關連結介面
export interface LinkInfo {
  label?: string; // 連結文字，如果沒有提供則預設為「相關連結」
  url: string; // 連結網址
}

// 定義新聞項目介面
export interface NewsItem {
  title: string;
  date: string;
  category: CategoryType;
  department: string;
  link?: LinkInfo; // 選填的相關連結欄位
}

// API 回傳的新聞資料介面
interface ApiNewsItem {
  title: string;
  date: string;
  category: string;
  department: string;
  link?: LinkInfo; // 選填的相關連結欄位
}

interface ApiNewsResponse {
  items: ApiNewsItem[];
}

// 定義分類對照表介面
export interface CategoryDictionary {
  [key: string]: string;
}

// 定義分類顏色對照表介面
export interface CategoryColorMap {
  [key: string]: CategoryColor;
}

// 新聞資料 Composable
export async function useNewsData() {
  // 分類中文名稱對照表
  const categoryLabels: CategoryDictionary = {
    [CategoryType.WEBSITE_UPDATE]: '網站更新',
    [CategoryType.EVENT_PROMOTION]: '活動宣傳'
  };

  // 分類顏色對照表
  const categoryColors: CategoryColorMap = {
    [CategoryType.WEBSITE_UPDATE]: 'info',
    [CategoryType.EVENT_PROMOTION]: 'primary'
  };

  /**
   * 取得分類對應的顏色
   */
  const getCategoryColor = (category: CategoryType): CategoryColor => {
    return categoryColors[category] || 'primary';
  };

  // 建立 useAsyncData 實例但不立即執行
  const {
    data: newsData,
    pending: isLoading,
    error,
    refresh,
    execute
  } = useFetch<ApiNewsResponse>(() => '/api/news', {
    key: 'news-data',
    immediate: false
  });

  const newsItems = computed(() => {
    if (!newsData.value?.items) return [];

    return newsData.value.items.map((item) => ({
      ...item,
      category: item.category as CategoryType
    }));
  });

  /**
   * 返回排序後的新聞，依日期由新到舊排序
   */
  const getRecentNews = computed(() => {
    // 確保只排序一次
    const items = newsItems.value;
    if (!items.length) return [];

    // 不建立新陣列，減少不必要的記憶體使用
    return [...items].sort((a, b) => {
      // 將日期字符串轉換為統一格式
      const dateA = new Date(a.date.replace(/\//g, '-'));
      const dateB = new Date(b.date.replace(/\//g, '-'));
      // 排序：由新到舊
      return dateB.getTime() - dateA.getTime();
    });
  });

  // 分頁設置
  const newsPerPage = 5;
  const currentPage = ref(1);

  // 取得分頁後的新聞資料
  const paginatedNews = computed(() => {
    const startIndex = (currentPage.value - 1) * newsPerPage;
    const endIndex = startIndex + newsPerPage;
    return getRecentNews.value.slice(startIndex, endIndex);
  });

  // 判斷分頁按鈕是否禁用
  const isPrevPageDisabled = computed(() => currentPage.value === 1);
  const isNextPageDisabled = computed(() => {
    const startIndex = currentPage.value * newsPerPage;
    return startIndex >= getRecentNews.value.length;
  });

  // 頁面導航函數
  const goToPrevPage = () => {
    if (!isPrevPageDisabled.value) {
      currentPage.value--;
    }
  };

  const goToNextPage = () => {
    if (!isNextPageDisabled.value) {
      currentPage.value++;
    }
  };

  // 按照功能分組返回，增加 fetchNewsData 方法
  return {
    // 核心資料與狀態
    core: {
      newsItems,
      isLoading,
      error,
      refreshNewsData: refresh,
      fetchNewsData: execute // 導出 execute 函數用於手動獲取數據
    },
    // 分類相關
    category: {
      categoryLabels,
      getCategoryColor
    },
    // 排序相關
    sorting: {
      getRecentNews
    },
    // 分頁相關
    pagination: {
      paginatedNews,
      currentPage,
      isPrevPageDisabled,
      isNextPageDisabled,
      goToPrevPage,
      goToNextPage
    }
  };
}
