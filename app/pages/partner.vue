<script setup lang="ts">
  import type { I18nItem } from '../../shared/types/i18n';

  const { t, tm } = useI18n();

  definePageMeta({
    title: 'partners.title'
  });

  useHead({
    title: () => t('partners.title')
  });

  const sharedPageTitle = useState('page-title');
  onMounted(() => {
    sharedPageTitle.value = t('partners.title');
  });

  // 為 v-for 創建 computed 屬性
  const partnerItems = computed<I18nItem[]>(() => {
    return (tm('partners.list') as I18nItem[]) ?? [];
  });

  const partners = computed(() =>
    partnerItems.value.map((item) => ({
      img: item.img?.loc?.source ?? '',
      name: item.name?.loc?.source ?? '',
      paras: item.paras?.map((para: I18nItem) => para.loc?.source ?? '') ?? [],
      link: item.link?.loc?.source ?? '#'
    }))
  );
</script>

<template>
  <div class="m-4 max-w-6xl space-y-6 sm:m-8 sm:mx-auto sm:space-y-8 sm:px-8">
    <!-- 合作夥伴列表 -->
    <div
      v-for="partner in partners"
      :key="partner.name"
      class="flex flex-col rounded-lg bg-white p-4 shadow-md transition-all duration-300 hover:scale-[1.005] hover:shadow-lg md:flex-row md:items-center md:p-8"
    >
      <img
        :src="partner.img"
        :alt="partner.name"
        class="mb-4 h-[120px] w-[120px] self-center rounded-xl object-contain md:mr-8 md:mb-0 md:h-[150px] md:w-[150px] md:self-auto"
      />
      <div class="flex-1">
        <p>
          <strong class="text-primary text-lg font-bold">{{
            partner.name
          }}</strong>
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
            {{ t('partners.link.1') }}
            <span class="underline"> {{ partner.name }} </span>
            {{ t('partners.link.2') }}
            <span class="ml-1">→</span>
          </UButton>
        </div>
      </div>
    </div>

    <ActionButtonsGroup />
  </div>
</template>
