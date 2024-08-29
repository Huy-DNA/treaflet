<template>
  <div class='wrapper'>
    <nav class='header'>
      <div class='header__right-placeholder'>
        <font-awesome-icon :icon="faBars" />
      </div>
      <h1 class='header__brand-name'>
        Treaflet
      </h1>
      <div class='header__right-placeholder' />
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
    min-height: 100vh;
    background-color: var(--light-neutral);
  }

  .header {
    display: flex;
    padding-left: 36px;
    gap: 16px;
    font-size: var(--font-small);
    align-items: center;
    justify-content: center;
  }
  .header__left-placeholder {
    flex: 1;
    align-content: center;
  }
  .header__brand-name {
    flex: 10;
    text-align: center;
    color: var(--dark-neutral);
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
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faBars } from '@fortawesome/free-solid-svg-icons';
</script>
