<script setup>
  const year = new Date().getFullYear();
</script>

<template>
  <footer
    class="relative z-10 mt-auto p-4 text-center text-sm font-bold"
    style="text-shadow: 0 0 5px rgba(0, 0, 0, 0.6)"
  >
    <p>
      版權所有 &copy; {{ year }} 台灣未來的主人們 <br />
      The Next Generation Taiwanese | MIT License
    </p>
  </footer>
</template>
