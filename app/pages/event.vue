<script setup lang="ts">
  import type { EventData } from '~/types/event';

  const pageTitle = '活動目錄';
  definePageMeta({
    title: pageTitle
  });
  useHead({
    title: pageTitle
  });

  // 從 event.json 檔案中取得所有事件資料
  const { data: eventsData } =
    await useFetch<Array<{ id: string; detail: EventData }>>(
      '/data/event.json'
    );

  // 取得事件資料列表
  const eventItems = computed(() => {
    if (!eventsData.value) return [];
    return eventsData.value.map((event) => ({
      id: event.id,
      ...event.detail
    }));
  });
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-12">
    <div class="mb-12 flex flex-col gap-6">
      <template v-for="event in eventItems" :key="event.id">
        <EventCard :event="event" />
      </template>
    </div>

    <ActionButtonsGroup />
  </div>
</template>
