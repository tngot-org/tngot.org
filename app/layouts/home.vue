<script setup>
  const images = [
    '/images/backgrounds/1.jpg',
    '/images/backgrounds/2.jpg',
    '/images/backgrounds/3.jpg',
    '/images/backgrounds/4.jpg',
    '/images/backgrounds/5.jpg'
  ];
</script>

<template>
  <div class="relative flex min-h-screen w-full flex-col overflow-hidden">
    <BackgroundCarousel :images :interval="5000" />

    <!-- 內容區塊，相對於背景層 -->
    <main class="relative z-10 flex-grow">
      <slot />
    </main>

    <!-- Footer 放在內容區外，確保不會被背景覆蓋 -->
    <Footer
      class="relative z-20 text-white"
      style="text-shadow: 0 0 5px rgba(0, 0, 0, 0.6)"
    />
  </div>
</template>
