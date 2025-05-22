<script setup>
  const title = '合作夥伴';
  definePageMeta({
    title
  });
  useHead({
    title
  });

  // 合作夥伴資料
  const partners = [
    {
      img: 'https://i.imgur.com/BWi6MGx.jpeg',
      name: 'OuO Community',
      paras: [
        '一個多元的學生程式社群，致力於促進學生之間的技術交流與合作，並提供資源與支持來幫助學生實現他們的創新想法。',
        'OuO Community 是一個基於 Discord 的程式設計社群，提供程式討論、機器人客製化服務等，並歡迎所有程度的開發者加入。',
        '社群提供創意交流和成長環境，並有專業團隊及合作廠商支援，透過 Discord 和 Email 皆可聯繫。'
      ],
      link: 'https://ouoc.dev/'
    },
    {
      img: 'https://i.imgur.com/ebWDTs6.png',
      name: '易碎品編年史',
      paras: [
        '提升國際社會對中國人權狀況的關注，透過多媒體內容與行動倡議，推動更公平與正義的世界。',
        '易碎君，本名梁啟駿，因在網路上創作諷刺中國政府的作品，15歲時遭香港警方調查，其後被迫離開香港前往美國尋求政治庇護。',
        '流亡美國期間，他持續參與反共活動，並協助其他香港年輕人逃離香港，尋求政治庇護，例如協助阿龍前往加拿大。',
        '目前易碎君已開始就讀大學，並計劃繼續透過大翻譯運動等方式，提升國際社會對中國人權狀況的關注。'
      ],
      link: 'https://www.youtube.com/@FragileItemsChronicle'
    }
  ];
</script>

<template>
  <div class="m-8 max-w-6xl space-y-8 sm:mx-auto sm:px-8">
    <!-- 合作夥伴列表 -->
    <div
      v-for="partner in partners"
      :key="partner.name"
      class="flex flex-row items-center rounded-lg bg-white p-8 shadow-md transition-all hover:scale-[1.008] hover:transform hover:shadow-lg"
    >
      <img
        :src="partner.img"
        :alt="partner.name"
        class="mr-8 h-[150px] w-[150px] object-contain"
      />
      <div class="flex-1">
        <p>
          <strong class="text-primary font-bold">{{ partner.name }}</strong>
        </p>
        <p
          v-for="(para, idx) in partner.paras"
          :key="idx"
          class="text-base leading-relaxed text-gray-500"
        >
          {{ para }}
        </p>
        <div class="mt-4">
          <UButton
            :to="partner.link"
            target="_blank"
            color="primary"
            variant="outline"
            class="inline-flex items-center"
          >
            了解更多
            <span class="underline"> {{ partner.name }} </span>
            資訊
            <span class="ml-1">→</span>
          </UButton>
        </div>
      </div>
    </div>

    <ActionButtonsGroup />
  </div>
</template>

<style scoped>
  /* 任何可能需要的特定樣式 */
</style>
