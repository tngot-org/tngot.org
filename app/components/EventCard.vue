<script setup lang="ts">
  // 定義一個單個事件對象作為 props
  defineProps<{
    event: EventData;
  }>();
</script>

<template>
  <NuxtLink :to="event.link" class="text-inherit no-underline">
    <UCard
      class="font-huninn rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
      :ui="{
        root: 'p-0',
        body: 'px-6 py-6 sm:py-6'
      }"
    >
      <div class="flex items-start justify-between">
        <div>
          <h2
            class="text-primary mb-3 flex items-center gap-2 text-2xl font-bold"
          >
            <UIcon
              :name="event.icon || 'ri-calendar-event-line'"
              class="text-primary"
            />
            {{ event.title }}
          </h2>
          <p class="mb-4 leading-relaxed text-gray-600">
            {{ event.info }}
          </p>

          <div class="flex flex-wrap items-center gap-3 text-sm">
            <UBadge
              v-if="event.date"
              class="flex items-center gap-1 font-bold"
              color="info"
              variant="soft"
            >
              <UIcon name="ri-calendar-line" />
              <span>{{ event.date }}</span>
            </UBadge>

            <UBadge
              v-if="event.type"
              variant="soft"
              class="flex items-center font-bold"
              :ui="{ base: ['gap-0'] }"
            >
              <UIcon name="ri-hashtag" />
              <span>{{ event.type }}</span>
            </UBadge>
          </div>
        </div>
      </div>
    </UCard>
  </NuxtLink>
</template>
