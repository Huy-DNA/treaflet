<template>
    <div class='card' @click='handleCardClick'>
        <div class='thumbnail' :style='cssVars'/>
        <h3 class='title'>{{ postMeta.title }}</h3>
        <p class='post-time'> Posted on: {{ postMeta.createdAt }}</p>
        <p class='summary'>{{ postMeta.summary }}</p>
        <div class='tagbar'> 
            <Pill v-for='tag in postMeta.tag'>{{ tag }}</Pill>
        </div>
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
        
        height: 600px;
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
    }
    
    div.tagbar {
        margin: 15px 15px 15px 15px;
        display: flex;
        flex-flow: row nowrap;
        overflow: hidden;
        gap: 5px;
    }
    div.card {
        width: 85vw;
    }

    @media(min-width: 420px) {
        div.card {
            width: 70vw;
        }
    }

    @media(min-width: 600px) {
        div.card {
            max-width: 350px;
        }
    }

</style>