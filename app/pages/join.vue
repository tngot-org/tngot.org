<script setup>
  const { t } = useI18n();

  definePageMeta({
    title: 'join.title'
  });

  useHead({
    title: () => t('join.title')
  });

  const sharedPageTitle = useState('page-title');
  onMounted(() => {
    sharedPageTitle.value = t('join.title');
  });

  const isAgreed = ref(false); // 新增勾選同意的狀態
  const checkboxDisabled = ref(true); // 控制 checkbox 是否可用
</script>

<template>
  <div class="p-8">
    <UCard
      class="mb-12"
      :ui="{
        body: 'text-base'
      }"
    >
      <template #header>
        <h2
          class="mb-4 border-l-4 border-purple-500 pl-2 text-3xl font-bold text-purple-500"
        >
          {{ t('join.long_term_volunteers') }}
        </h2>
      </template>

      <template #default>
        <p class="mb-4 text-gray-700">
          {{ t('join.condition_title') }}
        </p>

        <ul class="mb-4 list-disc pl-5">
          <li class="mb-3 text-gray-700">
            {{ t('join.conditions.age') }}
          </li>
          <li class="mb-3 text-gray-700">
            {{ t('join.conditions.commitment') }}
          </li>
          <li class="mb-3 text-gray-700">
            {{ t('join.conditions.agreement') }}
          </li>
        </ul>

        <!-- 更醒目的組織規章連結 -->
        <div class="my-6 flex items-center justify-center">
          <NuxtLink
            href="https://hackmd.io/@TNGT/bylaws"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center gap-2 rounded-lg border-2 border-purple-500 bg-purple-100 px-4 py-2 font-bold text-purple-600 transition-all hover:bg-purple-200 hover:shadow-md"
            @click="checkboxDisabled = false"
          >
            <Icon
              name="heroicons:document-text"
              class="text-xl transition-all"
            />
            {{ t('join.bylaws') }}
            <Icon
              name="heroicons:arrow-top-right-on-square"
              class="text-lg transition-all group-hover:translate-x-1"
            />
          </NuxtLink>
        </div>

        <!-- 勾選同意 -->
        <div class="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-3">
          <UCheckbox
            v-model="isAgreed"
            :label="t('join.agree_bylaws')"
            :disabled="checkboxDisabled"
          />
        </div>

        <p
          v-if="!isAgreed"
          class="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 font-bold text-amber-600"
        >
          <Icon
            name="heroicons:exclamation-triangle"
            class="flex-shrink-0 text-xl"
          />
          <span>{{ t('join.please_read_bylaws') }}</span>
        </p>

        <UButton
          v-else
          size="lg"
          class="flex w-full items-center justify-center gap-2 border-2 border-purple-500 bg-purple-500 px-6 py-3 font-bold text-white hover:bg-purple-600 hover:shadow-md"
          to="https://discord.gg/bzHqVSzBxA"
          target="_blank"
        >
          <Icon name="heroicons:user-plus" class="text-xl" />
          {{ t('join.join_btn') }}
        </UButton>
      </template>
    </UCard>

    <ActionButtonsGroup />
  </div>
</template>
