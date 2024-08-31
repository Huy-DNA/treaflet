<template>
  <div class="wrapper">
    <div class="wrapper__content">
      <nav
        class="header"
        role="banner"
      >
        <NuxtLink
          class="header__brand-name"
          to="/"
          role="button"
        >
          <BrandLogo width="large" />
          Treaflet
        </NuxtLink>
      </nav>
      <section
        class="content"
        role="article"
      >
        <slot />
      </section>
      <footer class="footer">
      </footer>
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    min-height: 100vh; 
  }

  .wrapper__content {
    min-height: 100vh;
  }

  .header {
    gap: 24px;
    padding-top: 24px;
    padding-left: 36px;
  }
  .header__brand-name {
    display: flex;
    align-items: center;
    justify-content: left;
    font-weight: bold;
    text-decoration: none;
    text-align: left;
    gap: 10px;
    font-size: var(--font-slightly-large);
    color: var(--dark-neutral);
  }
  
  .content {
    margin-top: 36px;
  }

  .footer {
  }
</style>

<script setup lang="ts">
  import { fontSize } from '@/style-guide';
</script>
