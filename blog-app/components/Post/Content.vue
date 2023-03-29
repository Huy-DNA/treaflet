<template>
    <div>
        <div class='post-header'>
            <h2>{{ title }}</h2>
            <p>Created At: {{ createdAt }}. Modified At: {{ modifiedAt }}</p>
        </div>
        <p class='post-summary'>{{ summary }}</p>
        <div class='post-body' v-html='content'/>
    </div>
</template>

<script setup lang='ts'>
    const { title, createdAt, modifiedAt, summary, content } = defineProps<{
        title: string,
        createdAt: string,
        modifiedAt: string,
        summary: string,
        content: string,
    }>()
</script>

<style lang="scss" scoped>
    .post-header h2 {
        color: $green;
        font-size: 3em;
    }
    
    .post-summary {
        padding: 10px;
        background-color: $silver;
        border-radius: 5px;
        font-style: italic;
    }
</style>