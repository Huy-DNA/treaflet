<template>
  <div>
    <nav class='header'>
      <BrandLogo :width="imageSize('normal')" />
      <h1>
        Treaflet
      </h1>
    </nav>
    <section class='content'>
      <slot />
    </section>
    <footer class='footer'>
    </footer>
  </div>
</template>

<style scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content {
  }
  .footer {
  }
</style>

<script setup lang="ts">
  import { imageSize } from '@/style-guide';
</script>
