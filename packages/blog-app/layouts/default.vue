<template>
  <div>
    <nav class='header'>
      <h1>Treaflet</h1>
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
