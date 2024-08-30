<template>
  <div class="wrapper">
    <SearchWidget />
    <PostList
      :posts="posts"
    />
  </div>
</template>

<script setup lang="ts">
  import posts from 'public/posts';
</script>

<style scoped>
</style>
