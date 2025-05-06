<script setup>
  definePageMeta({
    layout: 'home'
  });
</script>

<template>
  <div class="flex flex-col items-center text-center">
    <!-- 主標題區塊 -->
    <div
      class="mt-6 rounded-[10px] bg-transparent px-8 py-4 text-white shadow-lg backdrop-blur-sm"
    >
      <h1
        class="text-[3.5rem] font-extrabold text-white text-shadow-gray-800 text-shadow-lg"
      >
        台灣未來的主人們
      </h1>
      <p
        class="mt-2 text-[1.3rem] text-white text-shadow-gray-800 text-shadow-lg"
      >
        The Next Generation Taiwanese - TNGT
      </p>
    </div>

    <!-- 副標題區塊 -->
    <div
      class="mt-2 rounded-[10px] bg-transparent px-8 py-4 text-base leading-relaxed text-white shadow-lg backdrop-blur-md text-shadow-gray-500 text-shadow-md"
    >
      <p class="mt-2 text-base leading-relaxed">
        我們期望發展成為一個真正的公民團體；
        <br />
        用於代表青少年們參與大大小小的公共事務。
      </p>
      <p class="mt-2 text-base leading-relaxed">
        我們追求民主與自由，堅信青年力量能驅動社會進步；<br />
        關注民主、教育與性平等議題，凝聚學生聲音，打造屬於我們的聲音平台。
      </p>
    </div>

    <!-- Discord 按鈕 -->

    <UButton
      icon="skill-icons:discord"
      size="xl"
      to="/discord"
      class="relative mx-2.5 mt-20 overflow-hidden rounded-md bg-gradient-to-r from-[#7289da] to-[#99aab5] px-8 py-4 font-bold text-white shadow-lg transition-transform duration-300 hover:scale-110"
    >
      加入 Discord
      <div
        class="shiny-effect absolute top-0 -left-full h-full w-[200%] -skew-x-[45deg] transform bg-gradient-to-r from-white/20 to-transparent transition-all duration-500 group-hover:left-full"
      ></div>
    </UButton>

    <!-- 按鈕群組 -->
    <div class="mt-12 flex flex-wrap justify-center gap-4">
      <UButton
        size="xl"
        to="/about"
        icon="heroicons:information-circle"
        class="m-2 px-6 py-3 font-bold"
      >
        關於我們
      </UButton>
      <UButton
        size="xl"
        to="/team"
        icon="heroicons:user-group"
        class="m-2 px-6 py-3 font-bold"
      >
        工作團隊
      </UButton>
      <UButton
        size="xl"
        to="/events/"
        icon="heroicons:calendar"
        class="m-2 px-6 py-3 font-bold"
      >
        活動目錄
      </UButton>
      <UButton
        size="xl"
        to="/partner"
        icon="heroicons:building-storefront"
        class="m-2 px-6 py-3 font-bold"
      >
        合作夥伴
      </UButton>
      <UButton
        size="xl"
        to="/links"
        icon="heroicons:link"
        class="m-2 px-6 py-3 font-bold"
      >
        相關連結
      </UButton>
    </div>
  </div>
</template>

<style scoped>
  .shiny-effect {
    transition: left 0.5s;
  }

  .relative:hover .shiny-effect {
    left: 100%;
  }
</style>
