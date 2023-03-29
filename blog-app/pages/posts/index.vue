<template>
    <div>
        <PostList :post-metas='postMetas'/>
    </div>
</template>

<script setup lang='ts'>
    const postMetas = getPostMetas(true, comparePostTitle)
</script>
