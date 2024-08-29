<template>
  <div class='wrapper'>
    <div class='wrapper__content'>
      <nav class='header'>
        <div class='header__right-placeholder'>
          <font-awesome-icon :icon="faBars"/>
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
  </div>
</template>

<style scoped>
  .wrapper::before {
    display: block;
    position: absolute;
    top: -500px;
    left: -500px;
    min-width: 2000vw;
    min-height: 2000vh;
    transform: rotate(45deg);
    background: repeat space 0% 0% / 100px url('~/assets/images/brand-logo.png'), var(--slightly-dark-neutral);
    content: "";
    z-index: -1;
  }
  .wrapper {
    min-height: 100vh; 
    position: relative;
    overflow: hidden;
  }
  .wrapper__content {
    background-color: var(--light-neutral);
    min-height: 100vh;
    margin-left: 5vw;
    margin-right: 5vw;
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
