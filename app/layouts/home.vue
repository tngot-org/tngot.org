<script setup>
  // 設置頁面 head 資訊
  useHead({
    title: '台灣未來的主人們 TNGT',
    meta: [
      { charset: 'UTF-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      {
        name: 'description',
        content:
          '「台灣未來的主人們」是由青年發起的民主自主管平台，關注民主、教育、性平、交通等議題，凝聚學生聲音。'
      },
      { name: 'theme-color', content: '#BE5BFF' },
      { property: 'og:title', content: '台灣未來的主人們 TNGT' },
      {
        property: 'og:description',
        content:
          '「台灣未來的主人們」是由青年發起的民主自主管平台，關注民主、教育、性平、交通等議題，凝聚學生聲音。'
      },
      { property: 'og:url', content: 'https://tngot.org' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: '台灣未來的主人們 TNGT' },
      {
        name: 'twitter:description',
        content:
          '「台灣未來的主人們」是由青年發起的民主自主管平台，關注民主、教育、性平、交通等議題，凝聚學生聲音。'
      }
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/logo/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/logo/android-chrome-192x192.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        href: '/logo/android-chrome-512x512.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon.ico'
      }
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: '台灣未來的主人們',
          alternateName: '台灣未來的主人們',
          url: 'https://tngot.org/'
        })
      }
    ]
  });

  const images = [
    '/images/backgrounds/1.jpg',
    '/images/backgrounds/2.jpg',
    '/images/backgrounds/3.jpg',
    '/images/backgrounds/4.jpg',
    '/images/backgrounds/5.jpg'
  ];
</script>

<template>
  <div class="relative flex min-h-screen w-full flex-col overflow-hidden">
    <BackgroundCarousel :images :interval="5000" />

    <!-- 內容區塊，相對於背景層 -->
    <main class="relative z-10 flex-grow">
      <slot />
    </main>

    <!-- Footer 放在內容區外，確保不會被背景覆蓋 -->
    <Footer
      class="relative z-20 text-white"
      style="text-shadow: 0 0 5px rgba(0, 0, 0, 0.6)"
    />
  </div>
</template>
