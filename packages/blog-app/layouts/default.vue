<template>
  <div class="wrapper">
    <div class="wrapper__content">
      <nav
        class="header"
        role="banner"
      >
        <a
          class="header__brand-name"
          href="/"
          role="button"
        >
          <BrandLogo width="slightly-large" />
          Treaflet
        </a>
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
    background-color: var(--neutral);
  }

  .wrapper__content {
    background-color: var(--light-neutral);
    min-height: 100vh;
    margin-left: 0.5vw;
    margin-right: 0.5vw;
    box-shadow: 0px 0px 5px var(--slightly-dark-neutral);
  }
  @media only screen and (min-width: 600px) {
    .wrapper__content {
      margin-left: 3vw;
      margin-right: 3vw;
    }
  }

  .header {
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
    font-size: var(--font-normal);
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
