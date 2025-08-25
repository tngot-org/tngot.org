<template>
  <div class="flex gap-2">
    <UButton
      v-for="lang in availableLocales"
      :key="lang.code"
      size="lg"
      :variant="currentLanguage === lang.code ? 'solid' : 'outline'"
      class="cursor-pointer px-3 py-2.5 text-lg font-bold"
      :ui="{
        base: 'lg:px-5 lg:py-1 lg:text-lg rounded-2xl'
      }"
      @click="switchLanguage(lang.code)"
    >
      {{ lang.name }}
    </UButton>
  </div>
</template>

<script setup>
  const { locale, setLocale, locales } = useI18n();
  const localePath = useLocalePath();
  const router = useRouter();
  const route = useRoute();

  const currentLanguage = computed(() => locale.value);

  const availableLocales = computed(() => locales.value);

  const switchLanguage = async (langCode) => {
    // 獲取當前路徑的本地化版本
    const currentPath = route.path;
    // 切換語言
    await setLocale(langCode);
    // 導航到對應語言的路徑
    await router.push(localePath(currentPath, langCode));
  };
</script>
