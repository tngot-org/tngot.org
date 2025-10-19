<script setup lang="ts">
  const { t } = useI18n();
  useHead({
    htmlAttrs: {
      lang: 'zh-Hant-TW'
    },
    title: t('meta.title'),
    titleTemplate: (titleChunk) => {
      return titleChunk
        ? `${titleChunk} | ${t('meta.title')}`
        : t('meta.title');
    },
    meta: [
      {
        name: 'description',
        content:
          '「台灣未來的主人們」是由青年發起的民主自主管平台，關注民主、教育、性平、交通等議題，凝聚學生聲音。'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon.png'
      }
    ]
  });

  useSeoMeta({
    title: '台灣未來的主人們 TNGT',
    description:
      '「台灣未來的主人們」是由青年發起的民主自主管平台，關注民主、教育、性平、交通等議題，凝聚學生聲音。',
    ogTitle: '台灣未來的主人們 TNGT',
    ogDescription:
      '「台灣未來的主人們」是由青年發起的民主自主管平台，關注民主、教育、性平、交通等議題，凝聚學生聲音。',
    ogImage: '/og_img/og_img.png',
    ogImageType: 'image/png',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogUrl: 'https://exp-tngot.zeabur.app',
    ogType: 'website',
    ogSiteName: '台灣未來的主人們',
    twitterCard: 'summary_large_image',
    twitterTitle: '台灣未來的主人們 TNGT',
    twitterDescription:
      '「台灣未來的主人們」是由青年發起的民主自主管平台，關注民主、教育、性平、交通等議題，凝聚學生聲音。',
    twitterImage: '/og_img/og_img.png',
    twitterImageAlt: '台灣未來的主人們 TNGT'
  });
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
