<template>
  <div class="card" role="button">
    <div class="card__content">
      <NuxtLink :to="`/posts/${props.post.slug}`" :style="{ 'text-decoration': 'none' }">
        <h2 class="card__content__title">
          {{ props.post.title }}
        </h2>
      </NuxtLink>
      <p class="card__content__date">
        {{ createdAt }}
      </p>
      <p class="card__content__summary">
        {{ props.post.summary }}
      </p>
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
  line-height: 1.3;
  color: var(--dark-violet);
  text-decoration: none;
  font-size: var(--font-slightly-large);
  margin-top: 0;
  margin-bottom: 10px;
  text-align: justify;
}

.card__content__date {
  font-size: var(--font-slightly-small);
  color: var(--slightly-dark-neutral);
  margin-top: 0;
  margin-bottom: 16px;
}

.card__content__summary {
  font-size: var(--font-normal);
  text-align: justify;
}
</style>
