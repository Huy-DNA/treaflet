<template>
    <div>
        <p class='post-title'><NuxtLink :to="`${getPostPageLink(postMeta)}`">{{ postMeta.title }}</NuxtLink></p>
        <p class='post-summary'><i>{{ postMeta.summary }}</i></p>
    </div>
</template>

<script setup lang='ts'>
    const { postMeta } = defineProps<{ postMeta: PostMeta }>()
</script>

<style lang='scss' scope>
    p.post-title::before {
        content: '$';
        margin-right: 10px;
        color: $purple;
    }

    p.post-summary {
        margin-left: 20px;
        margin-top: 0px;
        padding-top: 0px;
        line-height: 0;
    }
</style>