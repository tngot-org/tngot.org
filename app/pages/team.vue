<script setup>
  definePageMeta({
    title: '工作團隊'
  });

  // 從 JSON 檔案載入團隊資料
  const { data: teamData } = await useFetch('/api/team');

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
    () => teamData.value?.totalMemberCount || 0
  );
</script>

<template>
  <div class="px-4 py-12">
    <!-- 團隊組別區塊 -->
    <template v-if="teamData">
      <UCard v-for="group in teamData.groups" :key="group.id" class="mb-12">
        <template #header>
          <h2
            class="border-primary text-primary mb-4 border-l-4 pl-3 text-2xl font-bold"
          >
            {{ group.name }}
          </h2>
        </template>

        <div
          class="xs:grid-cols-2 grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
        >
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
          目前我們的團隊共有
          {{ teamData.fetchFailed ? '超過30' : teamMemberCounts }}
          名工作人員，其中部分成員選擇不公開展示。
        </p>
      </UCard>
    </template>

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
          申請加入長期志工
        </UButton>
      </template>
    </ActionButtonsGroup>
  </div>
</template>
