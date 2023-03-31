<template>
    <div>
        <Breadcrumb>
            <ul>
                <li><NuxtLink to='/'>Home</NuxtLink></li>
                <li><NuxtLink to='#'>Posts</NuxtLink></li>
            </ul>
        </Breadcrumb>
        <h2>Post list</h2>
        <PostList :post-metas='postMetas' class='post-list'/>
    </div>
</template>

<script setup lang='ts'>
    const postMetas = getPostMetas(true, comparePostTitle)
</script>

<style lang='scss' scoped>
    h2 {
        color: $green;
        margin-left: 5vw;
    }

    .post-list {
        margin-left: 5vw;
    }
</style>
