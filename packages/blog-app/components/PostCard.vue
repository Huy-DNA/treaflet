<template>
  <div
    class="card"
    role="button"
  >
    <img
      class="card__thumbnail"
      :src="props.post.thumbnailUrl"
      :alt="props.post.summary"
    >
    <div class="card__content">
      <h2>{{ props.post.title }}</h2>
      <p>{{ createdAt }}</p>
      <p>{{ props.post.summary }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { PostMeta } from '@/types';
  
  const props = defineProps<{
    post: PostMeta;
  }>();

  const createdAt = computed(() => {
    return props.post.createdAt;
  });
</script>

<style scoped>
  .card {
    display: flex;
    justify-content: center;
    height: 160px;
    margin-left: 10vw;
    margin-right: 10vw;
    margin-top: 36px;
    gap: 24px;
  }

  .card:hover {
    cursor: pointer;
  }

  .card__thumbnail {
    flex: 1;
    object-fit: contain;
    background-color: var(--neutral);
  }

  .card__content {
    flex: 4;
  }
</style>
