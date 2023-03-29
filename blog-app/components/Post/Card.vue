<template>
    <div class='card' @click='handleCardClick'>
        <div class='thumbnail' :style='cssVars'/>
        <h3 class='title'>{{ postMeta.title }}</h3>
        <p class='post-time'> Posted on: {{ extractDate(postMeta.createdAt) }}</p>
        <p class='summary'>{{ postMeta.summary }}</p>
    </div>
</template>

<script setup lang='ts'>
    const { postMeta } = defineProps<{ postMeta: PostMeta }>()

    const cssVars = computed(() => ({
        '--image-url': `url(${getPostThumbnailUrl(postMeta)})`,
    }))
    
    function handleCardClick() {
        useRouter().push(getPostPageLink(postMeta))
    }
</script>

<style lang='scss' scoped>
    img {
        width: 100%;
        height: 50%;
    }

    div.card {
        background-color: $light-black;
        -webkit-transition: background-color 0.3s ease-out;
        -moz-transition: background-color 0.3s ease-out;
        -o-transition: background-color 0.3s ease-out;
        transition: background-color 0.3s ease-out;

        margin: 0 0 0 0;
        margin-left: auto;
        margin-right: auto;

        border: $grey solid 2px;
        border-radius: 10px;

        display: flex;
        flex-direction: column;
        align-items: stretch;
        overflow: hidden;
        text-overflow: ellipsis;
        
        height: 600px;
        max-width: 340px;
    }

    div.card:hover { 
        background-color: $light-blue;
        border-color: $light-blue;
    }

    div.thumbnail {
        background-image: var(--image-url);
        background-size: cover;
        background-position: center center;
        width: 100%;
        height: 300px;
    }

    h3.title {
        margin: 10px 15px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color: $blue;
    }

    p.post-time {
        margin: 5px 15px;
        color: $silver;
    }

    p.summary {
        margin: 5px 15px;
        color: $white;
        line-height: 1.5;
    }
</style>