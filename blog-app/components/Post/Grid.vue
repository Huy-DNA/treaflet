<template>
    <ul>
        <li v-for='postMeta in postMetas' :key='postMeta.id'>
            <PostCard :post-meta='postMeta'/>
        </li>
    </ul>
</template>

<script setup lang='ts'>
    const { postMetas } = defineProps<{ postMetas: PostMeta[] }>()
</script>

<style lang='scss' scoped>
    ul {
        padding: 0 0 0 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
        gap: 30px;
        justify-content: center;
        list-style-type: none;
    }

    li {
        padding: 0 0 0 0;
    }
</style>
