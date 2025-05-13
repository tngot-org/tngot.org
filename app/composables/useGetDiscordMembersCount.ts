interface DiscordInviteResponse {
  approximate_member_count: number;
}

export default async function () {
  const inviteCode = useRuntimeConfig().public.discordInviteCode;

  const url = `https://discord.com/api/v9/invites/${inviteCode}?with_counts=true&with_expiration=true&with_permissions=true`;

  const { data, error } = await useFetch<DiscordInviteResponse>(url);

  const memberCount = computed(
    () => data.value?.approximate_member_count ?? null
  );

  return {
    status: error.value ? false : true,
    data: memberCount
  };
}
