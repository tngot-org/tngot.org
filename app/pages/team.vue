<script setup>
  const title = '工作團隊';
  definePageMeta({
    title
  });
  useHead({
    title
  });

  // 從 JSON 檔案載入基本團隊資料（快速顯示）
  const { data: teamData, status: statusBasicInfo } =
    await useFetch('/api/team-basic');

  // 非同步載入團隊總人數資料（不阻塞頁面渲染）
  const { status, data: teamCountData } = useLazyFetch('/api/team-count');

  // 計算有多少成員在多個組別中
  const multiRoleMembers = computed(() => {
    if (!teamData.value) return {};

    const memberCounts = {};
    teamData.value.groups.forEach((group) => {
      group.members.forEach((member) => {
        memberCounts[member.name] = (memberCounts[member.name] || 0) + 1;
      });
    });

    return Object.fromEntries(
      Object.entries(memberCounts)
        .filter(([_, count]) => count > 1)
        .map(([name]) => [name, true])
    );
  });

  // 計算團隊成員總數 (從 API 獲取，包含未公開展示的成員)
  const teamMemberCounts = computed(
    () => teamCountData.value?.totalMemberCount || 0
  );
</script>

<template>
  <div class="px-4 py-12">
    <!-- 團隊組別區塊 -->
    <template v-if="statusBasicInfo === 'success'">
      <UCard v-for="group in teamData.groups" :key="group.id" class="mb-12">
        <template #header>
          <h2
            class="border-primary text-primary mb-4 border-l-4 pl-3 text-2xl font-bold"
          >
            {{ group.name }}
          </h2>
        </template>

        <div class="flex flex-wrap items-center justify-start gap-8">
          <TeamMemberCard
            v-for="member in group.members"
            :key="`${group.id}-${member.name}`"
            :member="member"
            :group-id="group.id"
            :is-multi-role="multiRoleMembers[member.name]"
          />
        </div>
      </UCard>

      <!-- 總人數區塊 -->
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
          <span v-if="status === 'pending'"> ... </span>
          <span v-else-if="status === 'success'">
            {{ ` ${teamMemberCounts} ` }}
          </span>
          <span v-else>超過 30 </span>
          <span>名工作人員，其中部分成員選擇不公開展示。</span>
        </p>
      </UCard>
    </template>
    <template v-else>
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
