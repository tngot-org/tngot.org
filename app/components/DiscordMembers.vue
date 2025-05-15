<script setup lang="ts">
  import { animate, useMotionValue, useTransform, RowValue } from 'motion-v';

  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));
  let controls: ReturnType<typeof animate> | undefined;

  const { status, data } = await useGetDiscordMembersCount();
  if (status) {
    controls = animate(count, data.value as number, { duration: 1.5 });
  }

  onUnmounted(() => {
    controls?.stop();
  });
</script>

<template>
  <div v-if="status">
    <p>
      目前社群成員:
      <span v-if="status">
        <RowValue :value="rounded" />
      </span>
      <!-- 避免 hydration -->
      <span v-else>0</span>
      人
    </p>
  </div>

  <div v-else />
</template>
