<script setup lang="ts">
  const { t, locale } = useI18n();

  definePageMeta({
    title: 'nav.events'
  });

  useHead({
    title: () => t('nav.events')
  });

  // 讓重新回到目錄時重置 title
  const sharedPageTitle = useState('page-title');
  onMounted(() => {
    sharedPageTitle.value = t('nav.events');
  });

  // 從 API 端點取得所有事件資料
  const { data: eventsData } = await useFetch<EventItem[]>('/api/events', {
    params: {
      locale: locale.value
    }
  });

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
