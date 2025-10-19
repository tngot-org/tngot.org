<template>
  <div class="flex w-full justify-center gap-8">
    <slot name="left"></slot>
    <UButton
      :to="localePath('/')"
      variant="soft"
      size="xl"
      icon="ri-home-4-line"
      class="animate-pop-in p-4"
    >
      {{ t('nav.home') }}
    </UButton>
    <slot name="right"></slot>
  </div>
</template>

<script setup>
  const { t } = useI18n();
  const localePath = useLocalePath();
</script>
