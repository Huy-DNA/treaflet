<template>
  <div class='wrapper'>
    <nav class='header'>
      <BrandLogo :width="imageSize('very-large')" class='header__brand-logo' />
      <h1 class='header__brand-name'>
        Treaflet
      </h1>
      <span class='header__right-placeholder' />
    </nav>
    <section class='content'>
      <slot />
    </section>
    <footer class='footer'>
    </footer>
  </div>
</template>

<style scoped>
  .wrapper {
    margin: 16px;
    margin-left: 36px;
  }

  .header {
    display: flex;
    gap: 16px;
    font-size: 24px;
    align-items: center;
    justify-content: center;
  }
  .header__brand-logo {
    flex: 1;
  }
  .header__brand-name {
    flex: 10;
    text-align: center;
  }
  .header__right-placeholder {
    flex: 1;
  }

  .content {
  }

  .footer {
  }
</style>

<script setup lang="ts">
  import { imageSize } from '@/style-guide';
</script>
