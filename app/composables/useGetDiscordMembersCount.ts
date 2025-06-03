interface DiscordInviteResponse {
  approximate_member_count: number;
}

export default function useGetDiscordMembersCount() {
  const inviteCode = useRuntimeConfig().public.discordInviteCode;
  const url = `https://discord.com/api/v9/invites/${inviteCode}?with_counts=true&with_expiration=true&with_permissions=true`;

  const { data, error, refresh } = useFetch<DiscordInviteResponse>(url, {
    server: false, // 只在客戶端執行，不阻塞 SSR
    default: () => ({}) as DiscordInviteResponse
  });

  const memberCount = computed(
    () => data.value?.approximate_member_count ?? null
  );
  const hasError = computed(() => !!error.value);

  return {
    memberCount,
    hasError,
    refresh
  };
}
