<template>
    <div class='post-content'>
        <div class='post-header'>
            <h2>{{ title }}</h2>
            <div class='date-block'>
                <p class='blue'>Created At</p><p>:</p><p>{{ createdAt }} </p>
                <p class='pink-red'>Modified At</p><p>:</p><p>{{ modifiedAt }}</p>
            </div>
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

<style lang="scss">
    .blue {
        color: $blue;
    }

    .pink-red {
        color: $pink-red;
    }

    .post-content {
        padding-left: 5vw;
        padding-right: 5vw;
    }

    h2 {
        color: $green;
    }
    .post-header h2 {
        color: $green;
        font-size: 3em;
        margin-bottom: 10px;
    }
    
    .post-summary {
        padding: 10px;
        background-color: $silver;
        border-radius: 5px;
        font-style: italic;
    }

    .date-block {
        display: grid;
        grid-template-columns: 110px 10px 1fr;
        row-gap: 0;
        line-height: 0;
    }
</style>