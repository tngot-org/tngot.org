<script setup>
  const year = new Date().getFullYear();
  const { t } = useI18n();
</script>

<template>
  <footer class="relative z-10 mt-auto p-4 text-center text-sm font-bold">
    <p>
      {{ t('footer.copyright') }} &copy; {{ year }}
      {{ t('footer.organization') }} |
      {{ t('footer.license') }}
    </p>
  </footer>
</template>
