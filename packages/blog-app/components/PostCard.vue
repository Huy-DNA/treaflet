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
      <h2>
        <NuxtLink
          class="card__content__title"
          :to="`/posts/${props.post.slug}`"
        >
          {{ props.post.title }}
        </NuxtLink>
      </h2>
      <p class="card__content__date">
        {{ createdAt }}
      </p>
      <div class="card__taglist">
        Topics:
        <span
          v-if="props.post.tags.length === 0"
          :style="{ color: 'var(--slightly-dark-neutral)' }"
        >
          Not found
        </span>
        <span
          v-for="(tag, idx) in props.post.tags"
          :key="tag.name"
        >
          <NuxtLink class="card__taglist__tag">
            {{ tag.name }} {{ idx !== props.post.tags.length - 1 ? ',' : '' }}
          </NuxtLink>
        </span>
      </div>
      <p class="card__content__summary">
        {{ props.post.summary }}
      </p>
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
    const daysDiff = Math.floor(now.diff(props.post.createdAt, 'days').toObject().days!);
    if (daysDiff == 0) {
      return 'Today';
    }
    if (daysDiff == 1) {
      return 'Yesterday';
    }
    if (daysDiff <= 7) {
      return `${daysDiff} days ago`;
    }
    return props.post.createdAt.toFormat('DDD');
  });
</script>

<style scoped>
  .card {
    display: flex;
    justify-content: center;
    height: 220px;
    margin-left: 8vw;
    margin-right: 8vw;
    margin-top: 45px;
    margin-bottom: 45px;
    gap: max(2vw, 36px);
  }
 
  .card__thumbnail {
    flex: 1;
    object-fit: contain;
    background-color: var(--neutral);
  }
  .card__thumbnail:hover {
    cursor: pointer;
  }

  .card__content {
    flex: 3;
    display: flex;
    flex-flow: column nowrap;
  }

  .card__content__title {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: var(--font-slightly-large);
    margin-top: 0;
    margin-bottom: 8px;
  }
  .card__content__title:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  .card__content__date {
    font-size: var(--font-small);
    color: var(--slightly-dark-neutral);
    margin-top: 0;
    margin-bottom: 8px;
  }

  .card__taglist {
    display: flex;
    flex-flow: row nowrap;
    gap: 6px;
  }
  .card__taglist__tag:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  .card__content__summary {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: var(--font-normal)
  }
</style>
