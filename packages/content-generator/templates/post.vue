<template>
  <article class="post">
    <div :style="{ backgroundColor: 'var(--very-light-neutral)', padding: '36px' }">
      <h1 class="post__title">
        {{ post.title }}
      </h1>
      <p class="post__date">
        {{ createdAt }}
      </p>
    </div>
    <div>
      <main
        class="post__content"
        v-html="post.content"
      />
    </div>
  </article>
</template>

<style scoped>
  .post {
    margin-top: 24px;
  }

  .post__title {
    text-align: center;
    color: var(--violet);
    font-size: var(--font-very-large);
    margin-bottom: 8px;
  }
  
  .post__date {
    text-align: center;
    color: var(--slightly-dark-neutral);
    margin-top: 0;
  }

  .post__content {
    margin-top: 24px;
    margin-bottom: 36px; 
  } 
</style>

<style>
  .post__content {
    h2 {
      color: var(--violet);
      font-size: var(--font-large);
    }

    section {
      background-color: var(--very-light-neutral);
      padding: 36px;
      margin-top: 24px;
      margin-bottom: 0;
    }

    h3 {
      color: var(--violet);
      font-size: var(--font-slightly-large);
    }

    h4 {
      color: var(--violet);
    }

    p, h4 {
      font-size: var(--font-normal);
    }

    p {
      line-height: 1.5;
      text-align: justify;
    }

  }
</style>

<script setup lang="ts">
  import hljs from 'highlight.js';
  import { DateTime } from 'luxon';
  import type { Post } from 'utils/types';
  useSeoMeta({
    title: {{{ title }}},
    ogTitle: {{{ title }}},
    ogSiteName: 'Treaflet',
    description: {{{ summary }}},
    ogDescription: {{{ summary }}},
    ogImage: '/public/logos.jpeg',
    twitterCard: 'summary_large_image',
  });

  const post: Ref<Post> = ref({
    title: {{{ title }}},
    slug: {{{ slug }}},
    createdAt: {{{ createdAt }}},
    summary: {{{ summary }}},
    content: {{{ content }}},
    tags: {{{ tags }}},
  });

  const createdAt = ref(DateTime.fromISO(post.value.createdAt).toFormat('DDD'));
  onMounted(() => {
    const now = DateTime.now();
    const daysDiff = Math.floor(now.diff(DateTime.fromISO(post.value.createdAt), 'days').toObject().days!);
    if (daysDiff == 0) {
      createdAt.value = 'Today';
    } else if (daysDiff == 1) {
      createdAt.value = 'Yesterday';
    } else if (daysDiff <= 7) {
      createdAt.value =`${daysDiff} days ago`;
    }
  });
  
  onMounted(() => document.querySelectorAll('pre code').forEach((el) => hljs.highlightElement(el as HTMLElement)));
</script>
