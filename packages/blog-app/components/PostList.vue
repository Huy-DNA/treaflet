<template>
  <div class="wrapper">
    <PostCard v-for="post in props.posts.slice(0, postLength)" :key="post.slug" :post="post" />
  </div>
</template>

<script setup lang="ts">
  import type { PostCollection } from '@/types';
  const props = defineProps<{
    posts: PostCollection;
  }>();

  const POSTS_PER_SCROLL = 4;
  const postLength = ref(POSTS_PER_SCROLL);

  const scrollEndEventListener = ref<null | ReturnType<typeof addEventListener>>(null);
  onMounted(() => {
    let lastScrollY = 0;
    scrollEndEventListener.value = document.addEventListener('scroll', () => {
      if (lastScrollY > window.scrollY) {
        lastScrollY = window.scrollY;
        return;
      }
      lastScrollY = window.scrollY;
      if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight) {
        loadPosts();
      }
    });
  });
  onUnmounted(() => document.removeEventListener('scroll', scrollEndEventListener.value));

  function loadPosts () {
    if (props.posts.length >= postLength.value) {
      return;
    }
    document.body.style.cursor = 'wait';
    setTimeout(() => {
      postLength.value += 4;
      document.body.style.cursor = 'auto';
    }, 1000)
  }
</script>

<style scoped>
</style>
