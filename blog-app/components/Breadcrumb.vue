<template>
    <div class='wrapper'>
        <slot/>
    </div>
</template>

<style lang='scss' scoped>
    .wrapper:deep(ul) {
        list-style-type: none;
        background-color: $grey;
        border-radius: 10px;
        padding: 10px 10px 10px 10px;
    }

    .wrapper:deep(ul li) {
        display: inline;
    }

    .wrapper:deep(ul li + li::before) {
        content: '\00a0/\00a0';
    }
</style>