<template>
  <div class='wrapper'>
    <nav class='header'>
      <BrandLogo width="huge" class='header__brand-logo' />
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
    min-height: 100vh;
    background-color: var(--slightly-dark-neutral);
  }

  .header {
    display: flex;
    padding-left: 24px;
    gap: 16px;
    font-size: var(--font-small);
    align-items: center;
    justify-content: center;
    background-color: var(--violet);
  }
  .header__brand-logo {
    flex: 1;
  }
  .header__brand-name {
    flex: 10;
    text-align: center;
    color: var(--light-neutral);
  }
  .header__right-placeholder {
    flex: 1;
  }

  .content {
  }

  .footer {
  }
</style>
