<script setup lang="ts">
  import type { EventItem } from '~/types/event';

  // 取得路由參數
  const route = useRoute();
  const eventId = route.params.title as string;

  // 從 event.json 檔案中取得所有事件資料
  const { data: eventsData } = await useFetch<EventItem[]>('/data/event.json');

  // 根據路由參數找到對應的事件資料
  const eventDetail = computed(() => {
    if (!eventsData.value) return null;
    const event = eventsData.value.find((item) => item.id === eventId);
    return event ? event.detail : null;
  });

  // 當找不到事件資料時重定向到事件列表頁
  if (import.meta.client && !eventDetail.value) {
    navigateTo('/event');
  }

  // 設定頁面標題
  const pageTitle = computed(() =>
    eventDetail.value ? `${eventDetail.value.title}｜活動紀錄` : '活動紀錄'
  );

  // 創建一個共享的頁面標題狀態
  const sharedPageTitle = useState('page-title', () => '活動紀錄詳情');

  // 監聽 pageTitle 變化並更新共享狀態
  watch(
    pageTitle,
    (newTitle) => {
      sharedPageTitle.value = newTitle;
    },
    { immediate: true }
  );

  definePageMeta({
    title: '活動紀錄詳情'
  });

  useHead({
    title: pageTitle
  });

  // 取得輪播圖片列表
  const items = computed(() => eventDetail.value?.card?.image || []);
</script>

<template>
  <div class="mx-auto max-w-4xl px-12 py-12">
    <!-- 活動介紹區塊 -->
    <UCard
      v-if="eventDetail"
      class="mb-8 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
      :ui="{
        root: 'p-0',
        header: 'pt-8',
        body: 'px-8 py-8'
      }"
    >
      <template #header>
        <h2 class="text-primary text-3xl font-bold">
          {{ eventDetail.card.title }}
        </h2>
      </template>

      <p class="text-base">
        {{ eventDetail.card.description }}
      </p>
    </UCard>

    <h2
      class="border-primary text-primary mb-4 border-l-4 pl-3 text-3xl font-bold"
    >
      活動照片
    </h2>
    <!-- 輪播照片區塊 -->
    <section class="mb-20 sm:px-4 md:px-12">
      <UCarousel
        v-slot="{ item }"
        :items="items"
        loop
        arrows
        :autoplay="{ delay: 3000 }"
      >
        <img :src="item" class="rounded-lg" />
      </UCarousel>
    </section>

    <ActionButtonsGroup>
      <template #right>
        <UButton to="/event" icon="heroicons:arrow-left" size="xl" color="info">
          回到目錄
        </UButton>
      </template>
    </ActionButtonsGroup>
  </div>
</template>
