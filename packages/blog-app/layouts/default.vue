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
    margin-left: 0.5vw;
    margin-right: 0.5vw;
  }

  .header {
    position: sticky;
    padding-top: 24px;
    padding-left: 36px;
  }
  .header__brand-name {
    display: flex;
    align-items: center;
    justify-content: left;
    font-weight: bold;
    text-decoration: none;
    flex: 10;
    text-align: left;
    gap: 10px;
    font-size: var(--font-slightly-large);
    color: var(--dark-neutral);
  }

  .content {
  }

  .footer {
  }
</style>

<script setup lang="ts">
  import { fontSize } from '@/style-guide'
</script>
