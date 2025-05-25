<script setup lang="ts">
  const props = defineProps({
    member: {
      type: Object as () => TeamMember,
      required: true
    },
    groupId: {
      type: String,
      default: ''
    }
  });

  // 追蹤成員圖片是否有效
  const isMemberImageValid = ref(true);

  // 預先檢查圖片是否存在
  onMounted(() => {
    if (props.member.img) {
      const img = new Image();
      img.onload = () => {
        isMemberImageValid.value = true;
      };
      img.onerror = () => {
        isMemberImageValid.value = false;
      };
      img.src = props.member.img;
    }
  });

  /**
   * 計算成員是否為組長
   */
  const isLeader = computed(
    () => props.member.classes?.includes('leader') || false
  );

  /**
   * 計算成員頭像URL，提供預設值
   */
  const avatarUrl = computed(() =>
    props.member.img && isMemberImageValid.value
      ? props.member.img
      : '/images/avatar/TNGT.png'
  );

  /**
   * 計算成員替代文字
   */
  const avatarAlt = computed(() => props.member.alt || props.member.name);

  /**
   * 計算卡片樣式類 - 這裡合併陣列並移除空值
   */
  const cardClasses = computed(() =>
    [props.member.link ? 'has-link' : ''].filter(Boolean)
  );

  /**
   * 用於包裹內容 (NuxtLink 或 div) 的通用 Tailwind class
   * 此容器將填滿 UCard 主體並將其內容居中
   */
  const contentWrapperClass =
    'flex h-full w-full flex-col items-center justify-center';

  /**
   * 圖片加載錯誤處理函數 - 使用預設圖片
   */
  const handleImageError = (e: Event) => {
    const target = e.target as HTMLImageElement;
    target.src = '/images/avatar/TNGT.png';
  };
</script>

<template>
  <div class="group relative" :data-member-id="member.name">
    <div
      v-if="isLeader"
      class="leader-glow pointer-events-none absolute inset-[-5px] rounded-[13px]"
    />
    <UCard
      variant="outline"
      class="xs:px-2 relative z-10 overflow-visible px-6 transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg"
      :class="cardClasses"
      :ui="{
        root: 'py-0',
        body: 'p-2 sm:p-4 h-auto flex items-center justify-center'
      }"
      :data-group-id="groupId"
      role="article"
    >
      <!-- 有連結時使用 NuxtLink -->
      <NuxtLink
        v-if="member.link"
        :to="member.link"
        target="_blank"
        rel="noopener noreferrer"
        :external="true"
        :class="[contentWrapperClass, 'cursor-pointer']"
        :aria-label="`連結至 ${member.name} 的個人頁面`"
        role="article"
      >
        <img
          :src="avatarUrl"
          :alt="avatarAlt"
          class="mb-2 aspect-square h-20 w-20 shrink-0 rounded-full object-cover sm:h-24 sm:w-24"
          loading="lazy"
          @error="handleImageError"
        />
        <p
          :id="`member-name-${member.name}`"
          class="w-max text-center text-sm font-medium sm:text-base"
        >
          {{ member.name }}
        </p>
      </NuxtLink>

      <!-- 無連結時使用普通 div -->
      <div v-else :class="contentWrapperClass" role="article">
        <img
          :src="avatarUrl"
          :alt="avatarAlt"
          class="mb-2 aspect-square h-20 w-20 shrink-0 rounded-full object-cover sm:h-24 sm:w-24"
          loading="lazy"
          @error="handleImageError"
        />
        <p
          :id="`member-name-${member.name}`"
          class="w-max text-center text-sm font-medium sm:text-base"
        >
          {{ member.name }}
        </p>
      </div>
    </UCard>
  </div>
</template>

<style scoped>
  /* 組長光暈效果 */
  .leader-glow {
    border: 2px solid transparent;
    background: transparent;
    z-index: 1;
    transform: translateZ(0); /* 促進硬體加速 */
    animation: rgbGlow 3s ease-in-out infinite;
    will-change: box-shadow, border-color; /* 提示瀏覽器優化動畫性能 */
  }

  @keyframes rgbGlow {
    0%,
    100% {
      box-shadow: 0 0 7px 2px rgba(255, 0, 0, 0.65);
      border-color: rgba(255, 0, 0, 0.65);
    }
    33% {
      box-shadow: 0 0 7px 2px rgba(0, 255, 0, 0.65);
      border-color: rgba(0, 255, 0, 0.65);
    }
    66% {
      box-shadow: 0 0 7px 2px rgba(0, 0, 255, 0.65);
      border-color: rgba(0, 0, 255, 0.65);
    }
  }

  @keyframes primaryPulse {
    0%,
    100% {
      box-shadow: 0 0 8px 2px rgba(var(--color-primary-500), 0.5);
      opacity: 0.7;
    }
    50% {
      box-shadow: 0 0 12px 3px rgba(var(--color-primary-500), 0.3);
      opacity: 0.5;
    }
  }

  /* 優化圖片載入效果 */
  img {
    transition: opacity 0.3s ease-in-out;
    backface-visibility: hidden; /* 減少閃爍 */
  }
</style>
