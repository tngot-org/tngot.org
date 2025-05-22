<script setup>
  const title = '加入我們';
  definePageMeta({
    title
  });
  useHead({
    title
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
          招募各組長期志工
        </h2>
      </template>

      <template #default>
        <p class="mb-4 text-gray-700">
          我們正在徵求各組長期志工，誠摯邀請您加入我們的行列。請詳閱以下參與條件：
        </p>

        <ul class="mb-4 list-disc pl-5">
          <li class="mb-3 text-gray-700">
            您為大專院校（含）以下學生，年齡不超過25歲（25歲以上僅可擔任顧問職務）
          </li>
          <li class="mb-3 text-gray-700">
            您能長期擔任職務，並保證有充裕時間參與線上或線下會議
          </li>
          <li class="mb-3 text-gray-700">
            您認同本團體理念，願與我們一起推動青年聲音
          </li>
        </ul>

        <!-- 更醒目的組織規章連結 -->
        <div class="my-6 flex items-center justify-center">
          <NuxtLink
            href="https://s.ouoc.dev/law"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center gap-2 rounded-lg border-2 border-purple-500 bg-purple-100 px-4 py-2 font-bold text-purple-600 transition-all hover:bg-purple-200 hover:shadow-md"
            @click="checkboxDisabled = false"
          >
            <Icon
              name="heroicons:document-text"
              class="text-xl transition-all group-hover:scale-110"
            />
            點我查看組織規章
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
            label="我滿足以上條件，並同意遵守組織規章"
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
          <span>請閱讀並上述所有條款，才能進行申請</span>
        </p>

        <UButton
          v-else
          size="lg"
          class="flex w-full items-center justify-center gap-2 border-2 border-purple-500 bg-purple-500 px-6 py-3 font-bold text-white hover:bg-purple-600 hover:shadow-md"
          to="https://forms.gle/QUzZqjyuJ6eb8e6L6"
          target="_blank"
        >
          <Icon name="heroicons:user-plus" class="text-xl" />
          申請加入
        </UButton>
      </template>
    </UCard>

    <ActionButtonsGroup />
  </div>
</template>
