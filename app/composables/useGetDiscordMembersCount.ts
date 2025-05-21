interface DiscordInviteResponse {
  approximate_member_count: number;
}

export default async function useGetDiscordMembersCount() {
  const memberCount = useState<number | null>(
    'discord-member-count',
    () => null
  );

  const inviteCode = useRuntimeConfig().public.discordInviteCode;
  const url = `https://discord.com/api/v9/invites/${inviteCode}?with_counts=true&with_expiration=true&with_permissions=true`;

  const { data, error, pending } = await useFetch<DiscordInviteResponse>(url, {
    key: 'discord-member-count',
    cache: 'reload'
  });

  memberCount.value = data.value?.approximate_member_count ?? null;

  const isLoading = computed(() => pending.value);
  const isError = computed(() => !!error.value);
  const isSuccess = computed(
    () => !pending.value && !error.value && memberCount.value !== null
  );

  return {
    memberCount,
    isLoading,
    isError,
    isSuccess
  };
}
