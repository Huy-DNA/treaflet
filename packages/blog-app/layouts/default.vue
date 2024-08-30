<template>
  <div class='wrapper'>
    <div class='wrapper__content'>
      <nav class='header'>
        <h1 class='header__brand-name'>
          <font-awesome-icon :icon="faBars" :width="fontSize('small')" />
          Treaflet
        </h1>
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
    top: -1000vw;
    left: -1000vw;
    min-width: 2000vw;
    min-height: 2000vh;
    transform: rotate(45deg);
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
    margin-left: 0.5vw;
    margin-right: 0.5vw;
  }

  .header {
    padding-top: 24px;
    padding-left: 36px;
  }
  .header__brand-name {
    display: flex;
    align-items: center;
    justify-content: left;
    flex: 10;
    text-align: left;
    gap: 16px;
    font-size: var(--font-normal);
    color: var(--dark-neutral);
  }

  .content {
  }

  .footer {
  }

  @media only screen and (min-width: 600px) {
    .wrapper::before {
      background: repeat space 0% 0% / 100px url('~/assets/images/brand-logo.png'), var(--slightly-dark-neutral);
    }
    .wrapper__content {
      margin-left: 3vw;
      margin-right: 3vw;
    }
  }
</style>

<script setup lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faBars } from '@fortawesome/free-solid-svg-icons';
  import { fontSize } from '@/style-guide'
</script>
