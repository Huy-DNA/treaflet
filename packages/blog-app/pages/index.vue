<template>
  <div class="wrapper">
    <section class="post-section">
      <SearchWidget :style="{ marginBottom: '48px' }" @search="onSearch" />
      <PostList :posts="posts" />
    </section>
  </div>
</template>

<script setup lang="ts">
import Fuse from 'fuse.js';
import _posts from 'public/posts';

useSeoMeta({
  title: 'Treaflet - Homepage',
  ogTitle: 'Treaflet - Trifling computer blogging',
  ogSiteName: 'Treaflet',
  description: 'A blog about anything computer-related',
  ogDescription: 'A blog about anything computer-related',
  ogImage: '/public/logos.jpeg',
  twitterCard: 'summary_large_image',
});

const posts = ref(_posts);
const fusedPosts = new Fuse(_posts, { isCaseSensitive: false, keys: ['title', 'summary'] })

function onSearch(text: string) {
  if (text) {
    posts.value = fusedPosts.search(text).map(({ item }) => item);
  } else {
    posts.value = _posts;
  }
}
</script>

<style scoped>
.post-section {
  margin-top: 24px;
  background-color: var(--very-light-neutral);
  padding-top: 36px;
  padding-bottom: 36px;
}
</style>
