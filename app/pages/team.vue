<script setup lang="ts">
  const title = '工作團隊';

  definePageMeta({ title });
  useHead({ title });

  // 直接載入團隊資料
  const { data: teamData, status: teamDataStatus } =
    await useLazyFetch<TeamData>('/api/team');

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
            總人數
          </h2>
        </template>

        <p>
          <span>目前我們的團隊共有</span>
          <span v-if="teamDataStatus === 'pending'"> ... </span>
          <span v-else-if="teamDataStatus === 'success'">
            {{ ` ${totalMemberCount} ` }}
          </span>
          <span v-else>超過 30 </span>
          <span>名工作人員，其中部分成員選擇不公開展示。</span>
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
