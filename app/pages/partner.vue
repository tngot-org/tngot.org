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
  <div class="m-4 max-w-6xl space-y-6 sm:m-8 sm:mx-auto sm:space-y-8 sm:px-8">
    <!-- 合作夥伴列表 -->
    <div
      v-for="partner in partners"
      :key="partner.name"
      class="flex flex-col rounded-lg bg-white p-4 shadow-md transition-all hover:scale-[1.008] hover:transform hover:shadow-lg md:flex-row md:items-center md:p-8"
    >
      <img
        :src="partner.img"
        :alt="partner.name"
        class="mb-4 h-[120px] w-[120px] self-center object-contain md:mr-8 md:mb-0 md:h-[150px] md:w-[150px] md:self-auto"
      />
      <div class="flex-1">
        <p>
          <strong class="text-primary font-bold">{{ partner.name }}</strong>
        </p>
        <p
          v-for="(para, idx) in partner.paras"
          :key="idx"
          class="text-sm leading-relaxed text-gray-500 sm:text-base"
        >
          {{ para }}
        </p>
        <div class="mt-4">
          <UButton
            :to="partner.link"
            target="_blank"
            color="primary"
            variant="outline"
            class="inline-flex w-full items-center justify-center text-sm sm:w-auto sm:text-base"
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
