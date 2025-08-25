<script setup lang="ts">
  import { animate, useMotionValue, useTransform, RowValue } from 'motion-v';

  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));

  const { memberCount, hasError, refresh } = useGetDiscordMembersCount();

  let controls: ReturnType<typeof animate> | undefined;

  // 每次進入都重新取得數據
  onMounted(async () => {
    await refresh();
  });

  // 監聽 memberCount 變化，有數據時開始動畫
  watch(
    memberCount,
    (newCount) => {
      if (newCount && !hasError.value) {
        // 停止之前的動畫
        controls?.stop();
        // 重置計數器
        count.set(0);
        // 開始新動畫
        controls = animate(count, newCount, { duration: 1.8 });
      }
    },
    { immediate: true }
  );

  onUnmounted(() => {
    controls?.stop();
  });

  const { t } = useI18n();
</script>

<template>
  <!-- 有錯誤時隱藏整個元件 -->
  <div v-if="!hasError">
    <p>
      {{ t('home.discordMembers') }}
      <ClientOnly>
        <RowValue :value="rounded" />
        <template #fallback> 0 </template>
      </ClientOnly>
      人
    </p>
  </div>
</template>
