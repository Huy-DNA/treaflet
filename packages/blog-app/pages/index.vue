<template>
  <div class="wrapper">
    <PostList :posts="posts" />
  </div>
</template>

<script setup lang="ts">
  import posts from 'public/posts.ts';
</script>

<style scoped>
</style>
