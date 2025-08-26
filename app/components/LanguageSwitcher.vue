<script setup lang="ts">
  const { locale, locales } = useI18n();
  const switchLocalePath = useSwitchLocalePath();

  const availableLocales = computed(() =>
    locales.value.filter((i) => i.code !== locale.value)
  );

  const items = computed(() => [
    availableLocales.value.map((l) => ({
      label: l.name,
      to: switchLocalePath(l.code)
    }))
  ]);
</script>

<template>
  <UDropdownMenu :items="items">
    <UButton
      color="neutral"
      variant="outline"
      square
      icon="i-heroicons-language"
    />
  </UDropdownMenu>
</template>
