<template>
    <div>
        <Pill v-for='tag in tags' :key='tag'>{{ tag }}</Pill>
    </div>
</template>

<script setup lang='ts'>
    const { tags } = defineProps<{tags : string[]}>()
</script>

<style lang='scss' scoped> 
    div {
        margin: 15px 15px 15px 15px;
        display: flex;
        flex-flow: row nowrap;
        overflow: hidden;
        gap: 5px;
    }
</style>