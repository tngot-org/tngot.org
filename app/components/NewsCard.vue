<script setup lang="ts">
  defineProps<{
    newsItem: NewsItem;
  }>();
</script>

<template>
  <UCard
    class="font-jf-open mb-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
    :ui="{
      root: 'p-0',
      body: 'px-6 py-4 sm:py-4'
    }"
  >
    <div class="flex flex-col gap-4 sm:flex-row">
      <!-- 日期和分類 -->
      <div
        class="flex flex-col items-center justify-center gap-2 sm:py-2 sm:pr-4"
      >
        <p class="text-xl font-medium text-gray-900">{{ newsItem.date }}</p>
        <UBadge
          :color="getCategoryColor(newsItem.category)"
          size="lg"
          class="rounded-lg text-lg"
        >
          {{ getCategoryLabel(newsItem.category) || '未分類' }}
        </UBadge>
      </div>

      <!-- 垂直分隔線 -->
      <div class="mx-2 my-4 hidden h-auto self-stretch sm:block">
        <div class="h-full w-px rounded-full bg-gray-200"></div>
      </div>

      <!-- 標題和部門 -->
      <div class="ml-2 flex flex-col justify-center gap-2">
        <h2 class="m-0 p-0 text-2xl font-bold text-gray-900">
          {{ newsItem.title }}
        </h2>
        <p class="m-0 p-0 text-lg font-bold text-gray-500">
          {{ newsItem.department }}
        </p>
        <!-- 如果有相關連結，則顯示連結按鈕 -->
        <NuxtLink
          v-if="newsItem.link"
          :to="newsItem.link.url"
          target="_blank"
          class="inline-flex w-fit items-center rounded-md bg-blue-50 px-2 py-1 font-medium text-blue-600 transition-all duration-300 hover:bg-blue-100 hover:text-blue-700 hover:no-underline"
        >
          <UIcon name="i-heroicons-link" class="mr-1" />
          {{ newsItem.link.label || '相關連結' }}
        </NuxtLink>
      </div>
    </div>
  </UCard>
</template>
