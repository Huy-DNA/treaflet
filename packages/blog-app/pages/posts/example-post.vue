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

    pre label {
      display: block;
      background-color: var(--neutral);
      padding: 6px 6px 6px 8px;
      font-family: 'Courier New', Courier, monospace;
    }

    code span, code {
      font-family: 'Courier New', Courier, monospace !important;
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
    title: 'Example post',
    ogTitle: 'Example post',
    ogSiteName: 'Treaflet',
    description: 'This is an example post',
    ogDescription: 'This is an example post',
    ogImage: '/public/logos.jpeg',
    twitterCard: 'summary_large_image',
  });

  const post: Ref<Post> = ref({
    title: 'This is an example post',
    slug: 'example-post',
    createdAt: DateTime.utc(2024, 9, 2).toISO()!,
    summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    content: `
<section>
<h2>What is Lorem Ipsum?</h2>
<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
</section><section>
<h2>Why do we use it?</h2>
<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
</section><section>
<h2>Where does it come from?</h2>
<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p><p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
</section><section>
<h2>Where can I get some?</h2>
<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
</section>
    `,
    tags: [{ name: 'fun-fact' }],
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
