<script setup lang="ts">
  const { t } = useI18n();

  definePageMeta({
    title: 'news.title'
  });

  useHead({
    title: () => t('news.title')
  });

  const sharedPageTitle = useState('page-title');
  onMounted(() => {
    sharedPageTitle.value = t('news.title');
  });

  const { fetchNewsData } = useNewsData();
  await fetchNewsData();

  // 從各個分組中獲取需要的資訊
  const newsData = useNewsData();

  // 從核心分組獲取載入狀態和錯誤資訊
  const { isLoading, error } = newsData.core;

  // 從分頁分組獲取分頁相關資訊和功能
  const {
    paginatedNews,
    isPrevPageDisabled,
    isNextPageDisabled,
    goToPrevPage,
    goToNextPage
  } = newsData.pagination;
</script>

<template>
  <!-- 新聞列表區塊 -->
  <div class="mx-auto max-w-4xl px-4 py-12">
    <!-- 載入中顯示 -->
    <ClientOnly>
      <UCard v-if="isLoading" class="mb-8 py-8 text-center">
        <div class="flex justify-center">
          <UIcon
            name="i-heroicons-arrow-path"
            class="text-primary h-8 w-8 animate-spin"
          />
        </div>
        <p class="mt-4 text-xl font-medium text-gray-500">載入新聞資料中...</p>
      </UCard>

      <!-- 錯誤顯示 -->
      <UCard v-else-if="error" class="mb-8 bg-red-50 py-8 text-center">
        <p class="text-xl font-medium text-red-500">{{ error }}</p>
      </UCard>

      <!-- 沒有新聞時顯示提示 -->
      <UCard
        v-else-if="paginatedNews.length === 0"
        class="mb-8 py-8 text-center"
      >
        <p class="text-xl font-medium text-gray-500">{{ t('news.no_news') }}</p>
      </UCard>

      <!-- 有新聞時顯示列表 -->
      <template v-else>
        <NewsCard
          v-for="(item, index) in paginatedNews"
          :key="index"
          :news-item="item"
        />
      </template>

      <template #fallback>
        <UCard class="mb-8 py-8 text-center">
          <div class="flex justify-center">
            <UIcon
              name="i-heroicons-arrow-path"
              class="text-primary h-8 w-8 animate-spin"
            />
          </div>
          <p class="mt-4 text-xl font-medium text-gray-500">
            載入新聞資料中...
          </p>
        </UCard>
      </template>
    </ClientOnly>

    <!-- 分頁按鈕 -->
    <ClientOnly>
      <div
        v-if="!isLoading && !error && paginatedNews.length > 0"
        class="mt-8 flex justify-center gap-4"
      >
        <UButton
          color="secondary"
          :disabled="isPrevPageDisabled"
          :class="{ hidden: isPrevPageDisabled }"
          @click="goToPrevPage"
        >
          上一頁
        </UButton>
        <UButton
          color="secondary"
          :disabled="isNextPageDisabled"
          :class="{ hidden: isNextPageDisabled }"
          @click="goToNextPage"
        >
          下一頁
        </UButton>
      </div>
    </ClientOnly>

    <ActionButtonsGroup />
  </div>
</template>
