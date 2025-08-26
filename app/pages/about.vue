<script setup lang="ts">
  import { useIntersectionObserver } from '@vueuse/core';

  const { t, tm } = useI18n();
  const localePath = useLocalePath();

  // 為 v-for 創建 computed 屬性
  const issueItems = computed<I18nItem[]>(() => {
    return (tm('about.issues.items') as I18nItem[]) ?? [];
  });

  const issueTexts = computed(() =>
    issueItems.value.map(
      (item) => item.loc?.source ?? { title: '', content: '' }
    )
  );

  const goalItems = computed<I18nItem[]>(() => {
    return (tm('about.goals.items') as I18nItem[]) ?? [];
  });

  const goalTexts = computed(() =>
    goalItems.value.map((item) => ({
      title: item.title?.loc?.source ?? '',
      content: item.content?.loc?.source ?? ''
    }))
  );

  const sharedPageTitle = useState('page-title');
  onMounted(() => {
    console.log(goalItems.value);
    console.log(goalTexts.value);

    sharedPageTitle.value = t('about.title');

    const sections = ref<NodeListOf<HTMLElement>>();
    sections.value = document.querySelectorAll('.intro-section');
    sections.value.forEach((el, idx) => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      );
      useIntersectionObserver(
        el,
        ([entry]) => {
          if (entry?.isIntersecting) {
            if (prefersReducedMotion.matches) {
              el.classList.add('show');
            } else {
              setTimeout(() => el.classList.add('show'), idx * 150);
            }
          }
        },
        { threshold: 0.2 }
      );
    });
  });
</script>

<template>
  <div class="mx-8 my-12 max-w-3xl space-y-8 sm:mx-auto">
    <!-- 團體介紹 -->
    <UCard class="intro-section">
      <template #header>
        <div class="mb-2">
          <h2 class="after-line relative font-bold text-purple-600">
            {{ t('about.introduction.title') }}
          </h2>
        </div>
      </template>
      <p class="font-bold">{{ t('about.introduction.motivation') }}</p>
      <p class="my-4 leading-relaxed text-gray-600">
        {{ t('about.introduction.content') }}
      </p>
    </UCard>

    <!-- 我們的理念 -->
    <UCard class="intro-section">
      <template #header>
        <div class="mb-2">
          <h2 class="after-line relative text-3xl font-bold text-purple-600">
            {{ t('about.philosophy.title') }}
          </h2>
        </div>
      </template>
      <p class="leading-relaxed text-gray-600">
        {{ t('about.philosophy.content') }}
      </p>
    </UCard>

    <!-- 關注議題 -->
    <UCard class="intro-section">
      <template #header>
        <div class="mb-2">
          <h2 class="after-line relative text-3xl font-bold text-purple-600">
            {{ t('about.issues.title') }}
          </h2>
        </div>
      </template>
      <ul class="space-y-2 pl-5 text-gray-600">
        <li v-for="(text, index) in issueTexts" :key="index" class="issue-item">
          {{ text }}
        </li>
      </ul>
    </UCard>

    <!-- 訴求與目標 -->
    <UCard class="intro-section">
      <template #header>
        <div class="mb-2">
          <h2 class="after-line relative text-3xl font-bold text-purple-600">
            {{ t('about.goals.title') }}
          </h2>
        </div>
      </template>
      <ul class="space-y-4 text-gray-600">
        <li v-for="(text, index) in goalTexts" :key="index" class="issue-item">
          <strong>{{ text.title }}</strong>
          <br />
          {{ text.content }}
        </li>
      </ul>
    </UCard>

    <ActionButtonsGroup>
      <template #right>
        <UButton
          :to="localePath('/links')"
          color="info"
          variant="solid"
          size="xl"
          icon="ri-link-m"
          class="animate-pop-in p-4"
        >
          {{ t('about.contactUs') }}
        </UButton>
      </template>
    </ActionButtonsGroup>
  </div>
</template>

<style scoped>
  .animate-gradient-x {
    background-size: 400% 400%;
    animation: gradientBG 12s ease-out infinite;
  }

  @keyframes gradientBG {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .animate-fade-in-up {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s ease-out forwards;
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  h2 {
    position: relative;
  }

  .after-line::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -12px;
    width: 0;
    height: 3.5px;
    background: var(--ui-primary);
    transition: width 0.5s ease-out;
  }

  .intro-section {
    opacity: 0;
    transform: translateY(30px) scale(0.98);
    transition:
      opacity 0.6s ease-out,
      transform 0.6s ease-out;
  }

  .intro-section.show {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .intro-section.show .after-line::after {
    width: 40px;
  }

  @keyframes slideHighlight {
    to {
      left: 200%;
    }
  }

  .animate-pop-in {
    transform: scale(0.9);
    opacity: 0;
    animation: popIn 0.5s ease-out forwards;
    animation-delay: 0.3s;
  }

  @keyframes popIn {
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation: none !important;
      transition: none !important;
    }

    .intro-section {
      opacity: 1;
      transform: none;
    }

    .animate-fade-in-up,
    .animate-pop-in {
      opacity: 1;
      transform: none;
    }
  }
  .intro-section ul {
    list-style: disc inside;
    margin-bottom: 1rem;
    padding-left: 1rem;
  }
</style>
