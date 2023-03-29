<template>
    <ul>
        <li v-for='postMeta in postMetas' :key='postMeta.id'>
            <PostBlock :postMeta='postMeta'/>
        </li>
    </ul>
</template>

<script setup lang='ts'>
    const { postMetas } = defineProps<{ postMetas: PostMeta[]}>()
</script>

<style lang='css'>
    li {
        list-style-type: none;
    }
</style>