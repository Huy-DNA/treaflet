<template>
    <span>
        <slot/>
    </span>
</template>

<style lang='scss' scoped>
    span {
        font-size: 15px;
        background-color: $grey;
        border: $grey solid 5px;
        border-radius: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>