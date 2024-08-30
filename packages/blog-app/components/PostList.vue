<template>
  <div class="wrapper">
    <PostCard v-for="post in props.posts" :key="post.slug" :post="post" />
  </div>
</template>

<script setup lang="ts">
  import type { PostCollection } from '@/types';

  const props = defineProps<{
    posts: PostCollection;
  }>();
</script>

<style scoped>
  .wrapper {
    margin-top: 56px;
  }
</style>
