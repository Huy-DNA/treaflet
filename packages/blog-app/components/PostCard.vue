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
      <div>
        <span
          v-for="tag in props.post.tags"
          :key="tag.name"
        >
          {{ tag.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { DateTime } from 'luxon';
  import type { PostMeta } from '@/types';
  
  const props = defineProps<{
    post: PostMeta;
  }>();

  const createdAt = computed(() => {
    const now = DateTime.now();
    const daysDiff = Math.floor(now.diff(props.post.createdAt, 'days').toObject().days);
    if (daysDiff > 7) {
      return `${daysDiff} days ago`;
    }
    return props.post.createdAt.toFormat('DDD');
  });
</script>

<style scoped>
  .card {
    display: flex;
    justify-content: center;
    height: 160px;
    margin-left: 72px;
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
