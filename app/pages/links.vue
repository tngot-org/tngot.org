<script setup>
  const title = '相關連結';
  definePageMeta({
    title
  });
  useHead({
    title
  });

  const links = [
    {
      url: 'https://tngot.org/',
      name: '官方網站',
      icon: 'i-heroicons-globe-alt'
    },
    {
      url: `https://discord.com/invite/${useRuntimeConfig().public.discordInviteCode}`,
      name: 'Discord',
      icon: 'i-skill-icons-discord'
    },
    {
      url: 'https://www.youtube.com/@tngot',
      name: 'Youtube',
      icon: 'i-logos-youtube-icon'
    },
    {
      url: 'https://www.threads.com/@tngot_org',
      name: 'Threads',
      icon: 'i-bi-threads-fill'
    },
    {
      url: 'https://www.instagram.com/tngot_org/',
      name: 'Instagram',
      icon: 'i-skill-icons-instagram'
    },
    {
      url: 'https://www.facebook.com/share/1AmEgzAmgb/',
      name: 'Facebook',
      icon: 'i-logos-facebook'
    },
    {
      url: 'mailto:tngotorg@gmail.com',
      name: 'Email 聯絡',
      icon: 'i-heroicons-envelope'
    },
    {
      url: 'https://github.com/tngot-org/tngot.org',
      name: 'GitHub',
      icon: 'i-skill-icons-github-dark'
    }
  ];
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-4">
    <!-- Introduction Section -->
    <section class="mx-auto my-6 w-11/12 text-center">
      <p class="text-start font-medium">
        歡迎來到「台灣未來的主人們」（TNGT）的連結一覽頁。透過以下連結，您可以快速了解我們的最新動態、加入社群討論，以及關注我們在各大平台的更新。
      </p>
    </section>

    <div class="mx-auto my-4 mb-8 grid w-11/12 max-w-2xl gap-6">
      <NuxtLink
        v-for="link in links"
        :key="link.name"
        :href="link.url"
        target="_blank"
        :class="[
          'font-huninn border-primary flex items-center justify-center rounded-lg border-2 p-6 text-xl font-bold no-underline transition-transform hover:-translate-y-1 hover:shadow-lg'
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
