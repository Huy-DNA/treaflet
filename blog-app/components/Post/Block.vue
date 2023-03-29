<template>
    <div>
        <NuxtLink :to="`${getPostPageLink(postMeta)}`">{{ postMeta.title }}</NuxtLink>
        <p>{{ postMeta.summary }}</p>
    </div>
</template>

<script setup lang='ts'>
    const { postMeta } = defineProps<{ postMeta: PostMeta }>()
</script>