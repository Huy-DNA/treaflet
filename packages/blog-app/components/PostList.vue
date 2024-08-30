<template>
  <div class="wrapper">
    <PostCard v-for="post in props.posts.slice(0, postLength)" :key="post.slug" :post="post" />
  </div>
</template>

<script setup lang="ts">
  import type { PostCollection } from '@/types';
  const POSTS_PER_SCROLL = 4;

  const props = defineProps<{
    posts: PostCollection;
  }>();


  const postLength = ref(POSTS_PER_SCROLL);

  const scrollEndEventListener = ref<null | ReturnType<typeof addEventListener>>(null);
  onMounted(() => {
    scrollEndEventListener.value = document.addEventListener('scroll', () => {
      if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight) {
        postLength.value += 4;
      }
    });
  });
  onUnmounted(() => document.removeEventListener('scroll', scrollEndEventListener.value));
</script>

<style scoped>
  .wrapper {
    margin-top: 56px;
  }
</style>
