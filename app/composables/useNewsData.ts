import {
  type CategoryType,
  getCategoryLabel,
  getCategoryColor
} from '../types/category';
import type { NewsItem, RawNewsItem } from '../types/news';

// 新聞資料 Composable
export function useNewsData() {
  // 建立 useAsyncData 實例但不立即執行
  const {
    data: rawNewsData,
    pending: isLoading,
    error,
    status,
    refresh,
    execute
  } = useFetch<RawNewsItem[]>('/api/news', {
    key: 'news-data',
    immediate: false,
    default: () => []
  });

  // 轉換原始資料，將 category 字串轉為 CategoryType 枚舉
  const newsData = computed<NewsItem[]>(() => {
    if (!rawNewsData.value || rawNewsData.value.length === 0) {
      return [];
    }

    return rawNewsData.value.map((item) => ({
      ...item,
      category: item.category as CategoryType
    }));
  });

  async function fetchNewsData() {
    if (status.value !== 'idle') return;
    await execute();
  }

  /**
   * 返回排序後的新聞，依日期由新到舊排序
   */
  const getRecentNews = computed<NewsItem[]>(() => {
    if (!newsData.value || newsData.value.length === 0) {
      return [];
    }

    // 直接排序轉換後的資料
    return newsData.value.sort((a, b) => {
      const dateA = new Date(a.date.replace(/\//g, '-'));
      const dateB = new Date(b.date.replace(/\//g, '-'));
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
    // 直接使用排序後的資料，不再進行正規化處理
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
    fetchNewsData,
    // 核心資料與狀態
    core: {
      newsData,
      isLoading,
      error,
      refreshNewsData: refresh
    },
    // 分類相關
    category: {
      getCategoryLabel,
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
