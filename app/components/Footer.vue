<script setup>
  const year = new Date().getFullYear();
</script>

<template>
  <footer
    class="relative z-10 mt-auto py-4 text-center text-sm"
    :style="footerStyle"
  >
    <p>
      &copy; {{ year }} The Next Generation Taiwanese - TNGT. All rights
      reserved.
    </p>
  </footer>
</template>
