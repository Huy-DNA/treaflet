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
          <BrandLogo width="huge" />
          Treaflet
        </NuxtLink>
      </nav>
      <main
        class="content"
        role="article"
      >
        <slot />
      </main>
      <footer class="footer">
      </footer>
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    min-height: 100vh; 
    padding-bottom: 24px;
    background-color: var(--gray);    
  }

  .wrapper__content {
    min-height: 100vh;
    margin-right: auto;
    margin-left: auto;
    width: 800px;
  }

  .header {
    gap: 24px;
    padding-top: 24px;
    padding-bottom: 24px;
    padding-left: 36px;
    background: var(--very-light-neutral);
  }
  .header__brand-name {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    text-decoration: none;
    text-align: left;
    gap: 10px;
    font-size: var(--font-huge);
    color: var(--dark-neutral);
  }
</style>
