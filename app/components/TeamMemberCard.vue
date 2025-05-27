<script setup lang="ts">
  const props = defineProps({
    member: {
      type: Object as () => TeamMember,
      required: true
    },
    groupId: {
      type: String,
      default: ''
    },
    isPrimaryLeader: {
      type: Boolean,
      default: false
    },
    isDeputyLeader: {
      type: Boolean,
      default: false
    }
  });

  /**
   * 計算成員是否為組長或副組長
   */
  const isLeader = computed(
    () => props.isPrimaryLeader || props.isDeputyLeader
  );

  /**
   * 計算成員頭像URL，提供預設值
   */
  const avatarUrl = props.member.avatar;

  /**
   * 計算成員替代文字
   */
  const avatarAlt = computed(() => props.member.name);

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
</script>

<template>
  <div class="group relative" :data-member-id="member.name">
    <div
      v-if="isLeader"
      class="leader-glow pointer-events-none absolute inset-[-5px] rounded-[13px]"
    />
    <UCard
      variant="outline"
      class="xs:px-2 relative z-10 w-32 overflow-visible px-6 transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg sm:w-36"
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
        <NuxtImg
          :src="avatarUrl"
          :alt="avatarAlt"
          class="mb-2 aspect-square h-20 w-20 shrink-0 rounded-full object-cover sm:h-24 sm:w-24"
          loading="lazy"
          placeholder="/images/avatar/TNGT.png"
        />
        <UTooltip :text="member.name" :delay-duration="0">
          <p
            :id="`member-name-${member.name}`"
            class="member-name w-full px-1 text-center text-sm font-medium sm:text-base"
          >
            {{ member.name }}
          </p>
        </UTooltip>
      </NuxtLink>

      <!-- 無連結時使用普通 div -->
      <div v-else :class="contentWrapperClass" role="article">
        <NuxtImg
          :src="avatarUrl"
          :alt="avatarAlt"
          class="mb-2 aspect-square h-20 w-20 shrink-0 rounded-full object-cover sm:h-24 sm:w-24"
          loading="lazy"
          placeholder="/images/avatar/TNGT.png"
        />
        <UTooltip :text="member.name" :delay-duration="0">
          <p
            :id="`member-name-${member.name}`"
            class="member-name w-full px-1 text-center text-sm font-medium sm:text-base"
          >
            {{ member.name }}
          </p>
        </UTooltip>
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

  /* 成員姓名樣式 */
  .member-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* 移除 NuxtLink 的焦點邊框 */
  a {
    outline: none;
  }
</style>
