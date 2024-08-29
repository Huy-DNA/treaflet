<template>
  <div>
    <nav class='header'>
      <p>Blogging In Hell</p>
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
    justify-items: center;
  }
  .content {
  }
  .footer {
  }
</style>
