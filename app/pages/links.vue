<script setup>
  const { t } = useI18n();

  definePageMeta({
    title: 'links.title'
  });

  useHead({
    title: () => t('links.title')
  });

  const sharedPageTitle = useState('page-title');
  onMounted(() => {
    sharedPageTitle.value = t('links.title');
  });

  const links = [
    {
      url: 'https://tngot.org/',
      name: t('links.links_name.website'),
      icon: 'i-heroicons-globe-alt'
    },
    {
      url: `https://discord.com/invite/${useRuntimeConfig().public.discordInviteCode}`,
      name: t('links.links_name.discord'),
      icon: 'i-skill-icons-discord'
    },
    {
      url: 'https://www.youtube.com/@tngot',
      name: t('links.links_name.youtube'),
      icon: 'i-logos-youtube-icon'
    },
    {
      url: 'https://www.threads.com/@tngot_org',
      name: t('links.links_name.threads'),
      icon: 'i-bi-threads-fill'
    },
    {
      url: 'https://www.instagram.com/tngot_org/',
      name: t('links.links_name.instagram'),
      icon: 'i-skill-icons-instagram'
    },
    // > Facebook 帳號失效，隱藏連結
    // {
    //   url: 'https://www.facebook.com/share/1AmEgzAmgb/',
    //   name: 'Facebook',
    //   icon: 'i-logos-facebook'
    // },
    {
      url: 'mailto:tngotorg@gmail.com',
      name: t('links.links_name.email'),
      icon: 'i-heroicons-solid-envelope'
    },
    {
      url: 'https://github.com/tngot-org/tngot.org',
      name: t('links.links_name.github'),
      icon: 'i-skill-icons-github-dark'
    }
  ];
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-4">
    <!-- Introduction Section -->
    <section class="mx-auto my-6 w-11/12 text-center">
      <p class="text-center font-medium">
        {{ t('links.description') }}
      </p>
    </section>

    <div class="mx-auto my-16 grid w-11/12 max-w-2xl gap-8">
      <NuxtLink
        v-for="link in links"
        :key="link.name"
        :href="link.url"
        target="_blank"
        :class="[
          'font-huninn border-primary flex items-center justify-center rounded-lg border-2 p-6 text-xl font-bold no-underline transition-all hover:-translate-y-0.5 hover:shadow-lg'
        ]"
      >
        <div class="align-center flex w-40">
          <UIcon :name="link.icon" class="h-6 w-6 self-center" />

          <span class="w-32 text-center">{{ link.name }}</span>
        </div>
      </NuxtLink>
    </div>

    <ActionButtonsGroup />
  </div>
</template>
