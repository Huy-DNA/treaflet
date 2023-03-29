<template>
    <div>
        <div class='headline'>
            <h2>
                Latest Posts
                <span class='pagination'>
                    <button :disabled="page <= firstPage" @click="page--">Back</button>
                    <button :disabled="page >= lastPage" @click="page++">Next</button>
                </span>
            </h2>
            <p class='grey'>Read some freshly-baked posts</p>
        </div>
        <PostGrid :post-metas='postMetasOnPage'/>
    </div>
</template>

<script setup lang='ts'>
    const postMetas = getPostMetas(true, comparePostCreationDate)

    const pageSize = 8
    const page = ref(1)
 
    const firstPage = 1
    const lastPage = Math.max(Math.ceil(postMetas.length / pageSize), 1)

    const postMetasOnPage = computed<PostMeta[]>(() => {
        const firstPost = (page.value - 1) * pageSize
        const lastPost = page.value * pageSize

        return postMetas.slice(firstPost, lastPost)
    })
</script>

<style lang='scss' scoped>
    .grey {
        color: $grey;
    }

    .headline {
        background-color: $black;

        margin-top: 0px;
        margin-bottom: 40px;

        padding-top: 10px;
        padding-bottom: 10px;
        
        line-height: 0.5;
        position: sticky;
        top: 0px;
    }
    
    .headline .pagination {
        font-size: 1rem;
    }

    .pagination button {
        border: 0;
        border-radius: 5px;
        margin-left: 5px;
        margin-right: 5px;
    }
    .pagination button[disabled] {
        border: 1.5px solid $pink-red;
        background-color: transparent;
        color: $white;
    }

    .pagination button[active] {
        background-color: $white;
        color: $black;
    }

    .pagination button[active]:hover {
        background-color: $silver;
    }
</style>