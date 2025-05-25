<template>
  <UCard class="mb-12">
    <template #header>
      <h2
        class="border-primary text-primary border-l-4 pl-3 text-2xl font-bold"
      >
        工作團隊
      </h2>
    </template>
    <USkeleton class="mb-4 h-8 w-1/3" />
    <div class="flex flex-wrap items-center gap-3">
      <USkeleton v-for="n in 6" :key="n" class="h-48 w-[200px]" />
    </div>
  </UCard>
</template>
