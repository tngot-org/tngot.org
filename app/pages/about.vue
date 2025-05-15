<script setup>
  import { onMounted } from 'vue';

  definePageMeta({
    title: '關於我們'
  });

  onMounted(() => {
    observeSections();
  });

  function observeSections() {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );
    const observerOptions = { threshold: 0.2 };
    const sections = document.querySelectorAll('.intro-section');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          if (prefersReducedMotion.matches) {
            entry.target.classList.add('show');
          } else {
            setTimeout(() => entry.target.classList.add('show'), idx * 150);
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    sections.forEach((el) => observer.observe(el));
  }
</script>

<template>
  <div class="mx-8 my-12 max-w-3xl space-y-8 sm:mx-auto">
    <!-- 團體介紹 -->
    <UCard class="intro-section">
      <template #header>
        <div class="mb-2">
          <h2 class="after-line relative font-bold text-purple-600">
            團體介紹
          </h2>
        </div>
      </template>
      <p class="font-bold">成立社群的初衷：</p>
      <p class="my-4 leading-relaxed text-gray-600">
        在社群媒體上發表參與公民運動的心得後，卻遭遇「你才十八歲懂什麼」、「多讀點書吧」等冷嘲熱諷。我們不願被年齡束縛思考自由，也不滿意見表達被「大人」以經驗優勢打壓。看到許多年輕人同樣被惡意攻擊，我們決心凝聚這群關心國家未來的學生，打造屬於我們的聲音平台。
      </p>
    </UCard>

    <!-- 我們的理念 -->
    <UCard class="intro-section">
      <template #header>
        <div class="mb-2">
          <h2 class="after-line relative text-3xl font-bold text-purple-600">
            我們的理念
          </h2>
        </div>
      </template>
      <p class="leading-relaxed text-gray-600">
        我們追求民主與自由，堅信青年力量能驅動社會進步。
      </p>
    </UCard>

    <!-- 關注議題 -->
    <UCard class="intro-section">
      <template #header>
        <div class="mb-2">
          <h2 class="after-line relative text-3xl font-bold text-purple-600">
            關注議題
          </h2>
        </div>
      </template>
      <ul class="space-y-2 pl-5 text-gray-600">
        <li class="issue-item">反對極權專制</li>
        <li class="issue-item">維護民主價值</li>
        <li class="issue-item">教育多元與改革</li>
        <li class="issue-item">推動性別平等</li>
        <li class="issue-item">交通平權與行人安全</li>
      </ul>
    </UCard>

    <!-- 訴求與目標 -->
    <UCard class="intro-section">
      <template #header>
        <div class="mb-2">
          <h2 class="after-line relative text-3xl font-bold text-purple-600">
            訴求與目標
          </h2>
        </div>
      </template>
      <ul class="space-y-4 text-gray-600">
        <li>
          <strong>反對極權專制</strong><br />
          捍衛民主，讓人民真正作主，拒絕任何形式的獨裁統治。
        </li>
        <li>
          <strong>反侵略</strong><br />
          反對任何國家以非理性手段侵犯台灣主權，倡議加強國安法與反滲透法，以及全民防衛意識。
        </li>
        <li>
          <strong>宣傳民主自由、增進自我認同</strong><br />
          提升媒體素養，支持本土文化創作者，並推動自主且資安高的社群平台建設。
        </li>
        <li>
          <strong>強化校園性平教育</strong><br />
          加深師生對多元性別與性向的理解與尊重，建構友善校園環境。
        </li>
        <li>
          <strong>改革教育制度</strong><br />
          反對唯學歷論，鼓勵多元發展；加強私校監管與師資考核，並優化課程預算分配。
        </li>
        <li>
          <strong>捍衛交通平權，保障行人安全</strong><br />
          學校附近廣設人行道，改善交通號誌設計，並加強執法以保障行人優先權。
        </li>
      </ul>
    </UCard>

    <ActionButtonsGroup>
      <template #right>
        <UButton
          to="/links"
          color="info"
          variant="solid"
          size="xl"
          icon="ri-link-m"
          class="animate-pop-in p-4"
        >
          聯絡我們
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
