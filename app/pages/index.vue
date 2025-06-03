<script setup>
  definePageMeta({
    layout: 'home'
  });

  useHead({
    title: ''
  });

  const buttons = [
    { to: '/about', icon: 'heroicons:information-circle', text: '關於我們' },
    { to: '/team', icon: 'heroicons:user-group', text: '工作團隊' },
    { to: '/news', icon: 'heroicons:newspaper', text: '最新消息' },
    { to: '/event/', icon: 'heroicons:calendar', text: '活動目錄' },
    { to: '/partner', icon: 'heroicons:building-storefront', text: '合作夥伴' },
    { to: '/links', icon: 'heroicons:link', text: '相關連結' }
  ];
</script>

<template>
  <div class="flex flex-col items-center text-center">
    <!-- 主標題區塊 -->
    <div
      class="mt-6 rounded-[10px] bg-transparent px-4 py-2 text-white shadow-lg backdrop-blur-sm md:px-8 md:py-4"
    >
      <h1
        class="text-[2rem] font-extrabold text-white text-shadow-gray-800 text-shadow-md sm:text-[2.5rem] md:text-[3.5rem]"
      >
        台灣未來的主人們
      </h1>
      <p
        class="mt-1 text-[1rem] text-white text-shadow-gray-800 text-shadow-md sm:text-[1.75rem] md:mt-2 md:text-[2rem]"
      >
        The Next Generation Taiwanese - TNGT
      </p>
    </div>

    <!-- 副標題區塊 -->
    <div
      class="text-md mt-2 rounded-[10px] bg-transparent px-4 py-2 leading-relaxed break-keep text-white shadow-lg backdrop-blur-md text-shadow-gray-500 text-shadow-md sm:mx-4 sm:text-2xl"
    >
      <p class="mt-1 leading-relaxed md:mt-2">
        我們期望發展成為一個真正的公民團體；
        <br />
        用於代表青少年們參與大大小小的公共事務。
      </p>
      <p class="mt-1 leading-relaxed md:mt-2">
        我們追求民主與自由，堅信青年力量能驅動社會進步；<br />
        關注民主、教育與性平等議題，凝聚學生聲音，打造屬於我們的聲音平台。
      </p>
    </div>

    <!-- Discord 成員數量 -->
    <DiscordMembers
      class="my-4 text-xl font-bold text-white text-shadow-gray-800 text-shadow-md md:text-2xl 2xl:text-3xl"
    />

    <!-- Discord 按鈕 -->
    <UButton
      icon="ic:baseline-discord"
      size="lg"
      :to="`https://discord.com/invite/${useRuntimeConfig().public.discordInviteCode}`"
      target="_blank"
      class="relative overflow-hidden rounded-md bg-gradient-to-r from-[#7289da] to-[#99aab5] px-6 py-4 text-lg font-bold transition-transform duration-300 hover:scale-105"
      :ui="{
        base: 'lg:px-7 lg:py-5 lg:text-xl',
        leadingIcon: 'lg:p-3'
      }"
    >
      加入 Discord
      <div
        class="shiny-effect absolute top-0 -left-full h-full w-[200%] -skew-x-[45deg] transform bg-gradient-to-r from-white/20 to-transparent transition-all duration-500 group-hover:left-full"
      />
    </UButton>

    <!-- 按鈕群組 -->
    <div
      class="mt-12 inline-grid grid-cols-2 gap-6 p-6 sm:grid-cols-3 md:mt-12 xl:grid-cols-6"
    >
      <UButton
        v-for="button in buttons"
        :key="button.to"
        :to="button.to"
        :icon="button.icon"
        size="lg"
        class="px-3 py-2.5 text-lg font-bold"
        :ui="{
          base: 'lg:px-5 lg:py-4 lg:text-lg',
          leadingIcon: 'lg:p-3'
        }"
      >
        {{ button.text }}
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
