<template>
  <div class="flex w-full justify-center gap-8">
    <slot name="left"></slot>
    <UButton
      to="/"
      variant="soft"
      size="xl"
      icon="ri-home-4-line"
      class="animate-pop-in p-4"
    >
      返回首頁
    </UButton>
    <slot name="right"></slot>
  </div>
</template>
