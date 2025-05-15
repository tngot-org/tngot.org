interface DiscordInviteResponse {
  approximate_member_count: number;
}

export default async function () {
  const memberCount = useState<number | null>(
    'discord-member-count',
    () => null
  );
  const status = useState<boolean>('discord-status', () => false);

  const inviteCode = useRuntimeConfig().public.discordInviteCode;
  const url = `https://discord.com/api/v9/invites/${inviteCode}?with_counts=true&with_expiration=true&with_permissions=true`;

  const { data, error } = await useFetch<DiscordInviteResponse>(url, {
    key: 'discord-member-count',
    cache: 'reload'
  });

  if (data.value) {
    memberCount.value = data.value.approximate_member_count ?? null;
    status.value = !error.value;
  }

  return {
    status,
    data: memberCount
  };
}
