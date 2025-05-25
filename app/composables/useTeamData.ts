import type { TeamData, TeamCountResponse } from '~~/shared/types/team';

/**
 * 團隊數據管理 composable
 */
export const useTeamData = async () => {
  // 載入基本團隊資料
  const { data: teamData, status: teamDataStatus } =
    await useFetch<TeamData>('/api/team-basic');

  // 獲取團隊總人數
  const { status: countStatus, data: teamCountData } =
    useLazyFetch<TeamCountResponse>(
      'https://script.google.com/macros/s/AKfycbx1PCyuA_k2rBD4PxITVGe6atflFEAFRYNmxjgLXkpbQC7WS9aTXpRHPL18gmWZKBlOJQ/exec'
    );

  // 計算多重角色成員
  const multiRoleMembers = computed(() => {
    if (!teamData.value?.groups) return {};

    const memberCounts = new Map<string, number>();

    teamData.value.groups.forEach((group) => {
      group.members.forEach((member) => {
        memberCounts.set(member.name, (memberCounts.get(member.name) || 0) + 1);
      });
    });

    return Object.fromEntries(
      Array.from(memberCounts.entries())
        .filter(([_, count]) => count > 1)
        .map(([name]) => [name, true])
    );
  });

  // 團隊成員總數
  const totalMemberCount = computed(() => teamCountData.value?.members || 0);

  // 加載狀態
  const isTeamDataLoaded = computed(() => teamDataStatus.value === 'success');

  return {
    teamData,
    teamDataStatus,
    countStatus,
    multiRoleMembers,
    totalMemberCount,
    isTeamDataLoaded
  };
};
