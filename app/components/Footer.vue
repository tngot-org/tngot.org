<script setup>
import { computed } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: '#fff',
  },
  shadow: {
    type: String,
    default: 'rgba(0, 0, 0, 0.6)',
  },
});

const year = new Date().getFullYear();

const footerStyle = computed(() => ({
  textShadow: `0 0 5px ${props.shadow}`,
  backgroundColor: props.backgroundColor,
  color: props.color,
}));
</script>

<template>
  <footer
    class="mt-auto py-4 text-sm relative z-10 text-center"
    :style="footerStyle"
  >
    <p>
      &copy; {{ year }} The Next Generation Taiwanese - TNGT. All rights
      reserved.
    </p>
  </footer>
</template>
