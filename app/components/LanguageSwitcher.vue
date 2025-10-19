<script setup lang="ts">
  const { locale, locales } = useI18n();
  const switchLocalePath = useSwitchLocalePath();

  const availableLocales = computed(() =>
    locales.value.filter((i) => i.code !== locale.value)
  );

  const items = computed(() => [
    availableLocales.value.map((l) => ({
      label: l.name,
      to: switchLocalePath(l.code),
      variant: 'solid',
      class:
        'transition duration-300 font-huninn font-bold !text-white text-xl py-2 px-3 hover:bg-primary-400 rounded-md'
    }))
  ]);
</script>

<template>
  <UDropdownMenu
    :items="items"
    class="language-switcher"
    :ui="{
      content:
        'bg-primary-500 shadow-lg rounded-lg p-1 min-w-[120px] font-bold text-white'
    }"
  >
    <UButton
      color="primary"
      variant="solid"
      square
      icon="i-heroicons-language"
      class="cursor-pointer"
    />
  </UDropdownMenu>
</template>
