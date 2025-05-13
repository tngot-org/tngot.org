<script setup>
  const route = useRoute();
  const title = computed(() => {
    return route.meta.title || '';
  });
  const subtitle = computed(() => {
    return route.meta.subtitle || 'The Next Generation Taiwanese - TNGT';
  });
</script>

<template>
  <div class="flex min-h-screen flex-col bg-gray-100">
    <header
      class="animate-gradient-x bg-primary relative overflow-hidden py-14 text-center text-white"
    >
      <div class="animate-fade-in-up">
        <h1 class="mb-8 text-5xl font-bold">
          {{ title }}
        </h1>
        <p class="text-xl font-bold">
          {{ subtitle }}
        </p>
      </div>
    </header>

    <main class="flex-grow">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<style scoped>
  .animate-gradient-x {
    background-size: 400% 400%;
    animation: gradientBG 12s ease-out infinite;
  }

  @keyframes gradientBG {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .animate-fade-in-up {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s ease-out forwards;
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation: none !important;
      transition: none !important;
    }

    .animate-fade-in-up {
      opacity: 1;
      transform: none;
    }
  }
</style>
