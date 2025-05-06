<template>
  <div class="background-carousel">
    <div
      ref="bg1"
      class="background-slideshow"
      :class="{ show: currentBg === 0 }"
    ></div>
    <div
      ref="bg2"
      class="background-slideshow"
      :class="{ show: currentBg === 1 }"
    ></div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';

  // 定義 props 以允許外部傳入自定義圖片和間隔時間
  const props = defineProps({
    images: {
      type: Array,
      required: true
    },
    interval: {
      type: Number,
      default: 5000 // 預設 5 秒切換一次
    }
  });

  // 當前顯示的背景索引（0 或 1，對應兩個背景元素）
  const currentBg = ref(0);
  // 參考兩個背景 DOM 元素
  const bg1 = ref(null);
  const bg2 = ref(null);

  // 目前的圖片索引
  let currentImageIndex = 0;
  // 計時器 ID
  let timer = null;

  // 改變背景圖片
  const changeBackground = () => {
    // 取得下一張要顯示的圖片
    currentImageIndex = (currentImageIndex + 1) % props.images.length;
    const nextImage = props.images[currentImageIndex];

    // 決定下一個要更新的背景元素（目前非顯示的那個）
    const nextBgIndex = currentBg.value === 0 ? 1 : 0;
    const nextBgElement = nextBgIndex === 0 ? bg1.value : bg2.value;

    // 設定下一個背景的圖片
    nextBgElement.style.backgroundImage = `url("${nextImage}")`;

    // 切換顯示狀態
    currentBg.value = nextBgIndex;
  };

  // 初始化輪播
  const initCarousel = () => {
    // 設置初始背景圖片
    bg1.value.style.backgroundImage = `url("${props.images[0]}")`;
    currentBg.value = 0;

    // 設置定時器自動切換背景
    timer = setInterval(changeBackground, props.interval);
  };

  // 組件掛載後初始化
  onMounted(() => {
    initCarousel();
  });

  // 組件卸載前清除定時器
  onBeforeUnmount(() => {
    if (timer) {
      clearInterval(timer);
    }
  });
</script>

<style scoped>
  .background-carousel {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .background-slideshow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 1s ease-in-out;
  }

  .background-slideshow.show {
    opacity: 1;
  }
</style>
