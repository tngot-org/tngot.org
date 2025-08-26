<script setup>
  definePageMeta({
    layout: 'home'
  });

  useHead({
    title: ''
  });

  const { t } = useI18n();
  const localePath = useLocalePath();

  const buttons = computed(() => [
    {
      to: localePath('/about'),
      icon: 'heroicons:information-circle',
      text: t('nav.about')
    },
    {
      to: localePath('/team'),
      icon: 'heroicons:user-group',
      text: t('nav.team')
    },
    {
      to: localePath('/news'),
      icon: 'heroicons:newspaper',
      text: t('nav.news')
    },
    {
      to: localePath('/event/'),
      icon: 'heroicons:calendar',
      text: t('nav.events')
    },
    {
      to: localePath('/partner'),
      icon: 'heroicons:globe-asia-australia',
      text: t('nav.partners')
    },
    { to: localePath('/links'), icon: 'heroicons:link', text: t('nav.links') }
  ]);
</script>

<template>
  <div class="flex flex-col items-center text-center">
    <!-- 主標題區塊 -->
    <div
      class="mt-6 rounded-[10px] bg-transparent px-8 py-2 text-white shadow-lg backdrop-blur-sm md:py-4"
    >
      <h1
        class="font-huninn text-2xl font-extrabold text-white text-shadow-gray-800 text-shadow-md sm:text-3xl md:text-4xl"
      >
        {{ t('home.title') }}
      </h1>
      <p
        class="mt-1 text-[1rem] text-white text-shadow-gray-800 text-shadow-md sm:text-[1.75rem] md:mt-2 md:text-[2rem]"
      >
        {{ t('home.subtitle') }}
      </p>
    </div>

    <!-- 副標題區塊 -->
    <div
      class="text-md mt-2 rounded-[10px] bg-transparent px-4 py-2 leading-relaxed break-keep text-white shadow-lg backdrop-blur-md text-shadow-gray-500 text-shadow-md sm:mx-4 sm:text-2xl"
    >
      <p class="mt-1 leading-relaxed md:mt-2">
        {{ t('home.description1') }} <br />
        {{ t('home.description2') }} <br />
        {{ t('home.description3') }} <br />
        {{ t('home.description4') }}
      </p>
      <!-- <p class="mt-1 leading-relaxed md:mt-2">
        {{ t('home.description2') }}
      </p> -->
    </div>

    <!-- Discord 成員數量 -->
    <DiscordMembers
      class="my-4 mb-12 text-xl font-bold text-white text-shadow-gray-800 text-shadow-md md:text-2xl 2xl:text-3xl"
    />

    <!-- 按鈕群組 (回饋表單與 Discord) -->
    <div class="flex flex-col gap-4 sm:flex-row sm:gap-6">
      <!-- 回饋表單按鈕 -->
      <!-- <UButton
        icon="simple-icons:googleforms"
        size="lg"
        to="https://forms.gle/N3W1y1dts7vpzH6v9"
        target="_blank"
        class="feedback-button relative overflow-hidden rounded-md bg-[#7246BE] px-6 py-4 text-lg font-bold transition-transform duration-300 hover:scale-105"
        :ui="{
          base: 'lg:px-7 lg:py-5 lg:text-xl ',
          leadingIcon: 'lg:p-3'
        }"
      >
        {{ t('home.feedbackForm') }}
        <div
          class="shiny-effect absolute top-0 -left-full h-full w-[200%] -skew-x-[45deg] transform bg-gradient-to-r from-white/20 to-transparent transition-all duration-500 group-hover:left-full"
        />
      </UButton> -->

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
        {{ t('home.joinDiscord') }}
        <div
          class="shiny-effect absolute top-0 -left-full h-full w-[200%] -skew-x-[45deg] transform bg-gradient-to-r from-white/20 to-transparent transition-all duration-500 group-hover:left-full"
        />
      </UButton>
    </div>

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

  /* 強制覆蓋 UButton 的 hover 樣式，確保背景色不變 */
  .feedback-button {
    background-color: #7246be !important;
  }

  .feedback-button:hover {
    background-color: #7246be !important;
    opacity: 1 !important;
  }

  /* 覆蓋可能的 Nuxt UI 樣式 */
  :deep(.feedback-button) {
    background-color: #7246be !important;
  }

  :deep(.feedback-button:hover) {
    background-color: #7246be !important;
    opacity: 1 !important;
  }
</style>
