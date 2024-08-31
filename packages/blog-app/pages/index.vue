<template>
  <div class="wrapper">
    <SearchWidget @search="onSearch" />
    <PostList
      :posts="posts"
    />
  </div>
</template>

<script setup lang="ts">
  import Fuse from 'fuse.js';
  import _posts from 'public/posts';

  const posts = ref(_posts);
  const fusedPosts = new Fuse(_posts, { isCaseSensitive: false, keys: ['title', 'summary'] })

  function onSearch (text: string) {
    if (text) {
      posts.value = fusedPosts.search(text).map(({ item }) => item);
    } else {
      posts.value = _posts;
    }
  }
</script>

<style scoped>
</style>
