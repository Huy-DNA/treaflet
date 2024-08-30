<template>
  <div class="wrapper">
    <PostCard v-for="post in posts" :key="post.slug" :post="post" />
  </div>
</template>

<script setup lang="ts">
  import posts from 'public/posts';
</script>
