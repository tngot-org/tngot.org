<script setup lang="ts">
  const { t } = useI18n();

  definePageMeta({
    title: 'team.title'
  });

  useHead({
    title: () => t('team.title')
  });

  const { data: teamData, status: teamDataStatus } =
    await useLazyFetch<TeamData>('/api/team', {
      cache: 'force-cache'
    });

  // 團隊成員總數
  const totalMemberCount = computed(() => teamData.value?.totalMembers || 0);

  // 加載狀態
  const isTeamDataLoaded = computed(() => teamDataStatus.value === 'success');
</script>

<template>
  <div class="px-4 py-12">
    <!-- 主要內容 -->
    <template v-if="isTeamDataLoaded">
      <!-- 團隊組別 -->
      <TeamGroupCard
        v-for="group in teamData?.groups"
        :key="group.id"
        :group="group"
      />

      <!-- 總人數統計 -->
      <UCard class="mb-12">
        <template #header>
          <h2
            class="border-primary text-primary border-l-4 pl-3 text-2xl font-bold"
          >
            {{ t('team.totalMembers') }}
          </h2>
        </template>

        <p>
          <span>{{ t('team.memberCount.current') }}</span>
          <span v-if="teamDataStatus === 'pending'"> ... </span>
          <span v-else-if="teamDataStatus === 'success'">
            {{ ` ${totalMemberCount} ` }}
          </span>
          <span v-else>{{ t('team.memberCount.fallback') }} </span>
          <span>{{ t('team.memberCount.total') }}</span>
        </p>
      </UCard>
    </template>

    <!-- 載入中骨架屏 -->
    <TeamLoadingSkeleton v-else />

    <!-- 操作按鈕 -->
    <ActionButtonsGroup>
      <template #right>
        <UButton
          to="/join"
          color="info"
          variant="solid"
          size="xl"
          icon="ri-link-m"
          class="animate-pop-in p-4"
        >
          申請加入長期志工
        </UButton>
      </template>
    </ActionButtonsGroup>
  </div>
</template>
