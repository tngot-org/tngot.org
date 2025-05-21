<script setup lang="ts">
  import { animate, useMotionValue, useTransform, RowValue } from 'motion-v';

  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));
  let controls: ReturnType<typeof animate> | undefined;

  const { memberCount, isLoading, isError, isSuccess } =
    await useGetDiscordMembersCount();

  if (isSuccess.value) {
    controls = animate(count, memberCount.value as number, { duration: 1.5 });
  }

  onUnmounted(() => {
    controls?.stop();
  });
</script>

<template>
  <div>
    <template v-if="isLoading">
      <span>載入中...</span>
    </template>
    <template v-else-if="isError">
      <span>取得 Discord 成員數失敗</span>
    </template>
    <template v-else-if="isSuccess">
      <p>
        目前社群成員:
        <ClientOnly>
          <RowValue :value="rounded" />
          <template #fallback> 0 </template>
        </ClientOnly>
        人
      </p>
    </template>
  </div>
</template>
