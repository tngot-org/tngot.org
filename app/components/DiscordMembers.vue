<script setup lang="ts">
  import gsap from 'gsap';

  const tweened = reactive({
    number: 0
  });

  const { status, data } = await useGetDiscordMembersCount();

  if (status) {
    gsap.to(tweened, {
      duration: 1.5, // 動畫持續時間(秒)
      number: data.value,
      ease: 'power1.out' // 使用緩出效果，讓動畫看起來更自然
    });
  }
</script>

<template>
  <div v-if="status">
    <p>
      目前社群成員:
      {{ tweened.number.toFixed(0) }}
      人
    </p>
  </div>
  <div v-else />
</template>
