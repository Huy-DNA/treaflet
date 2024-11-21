<template>
  <div class="card" role="button">
    <div class="card__content">
      <h2 class="card__content__title">
        {{ props.post.title }}
      </h2>
      <p class="card__content__date">
        {{ createdAt }}
      </p>
      <p class="card__content__summary">
        {{ props.post.summary }}
      </p>
      <NuxtLink :to="`/posts/${props.post.slug}`">
        See more
      </NuxtLink>

    </div>
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon';
import type { PostMeta } from 'utils/types';

const props = defineProps({
  post: {
    type: Object as PropType<PostMeta>,
    required: true,
  }
});

const createdAt = ref(DateTime.fromISO(props.post.createdAt).toFormat('DDD'));
onMounted(() => {
  const now = DateTime.now();
  const daysDiff = Math.floor(now.diff(DateTime.fromISO(props.post.createdAt), 'days').toObject().days!);
  if (daysDiff == 0) {
    createdAt.value = 'Today';
  } else if (daysDiff == 1) {
    createdAt.value = 'Yesterday';
  } else if (daysDiff <= 7) {
    createdAt.value = `${daysDiff} days ago`;
  }
});
</script>

<style scoped>
.card {
  padding-left: 24px;
  padding-right: 24px;
  margin-bottom: 48px;
}

.card__content__title {
  color: var(--dark-neutral);
  text-decoration: none;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: var(--font-slightly-large);
  margin-top: 0;
  margin-bottom: 6px;
}

.card__content__date {
  font-size: var(--font-slightly-small);
  color: var(--slightly-dark-neutral);
  margin-top: 0;
  margin-bottom: 16px;
}

.card__content__summary {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: var(--font-normal);
}
</style>
