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

  const emits = defineEmits<{
    (e: 'scrollEnd'): void
  }>();

  const scrollEndEventListener = ref<null | ReturnType<typeof addEventListener>>(null);
  onMounted(() => {
    scrollEndEventListener.value = document.addEventListener('scroll', () => {
      if (window.scrollY === window.innerHeight) {
        emits('scrollEnd');
      }
    });
  })
  onUnmounted(() => document.removeEventListener('scroll', scrollEndEventListener.value));
</script>

<style scoped>
  .wrapper {
    margin-top: 56px;
  }
</style>
