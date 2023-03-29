<template>
    <NuxtLink :to="`/posts/${slug}`">{{ title }}</NuxtLink>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        props: {
            title: {
                type: String,
                required: true,
            },
            slug: {
                type: String,
                required: true,
            },
        },
    })
</script>