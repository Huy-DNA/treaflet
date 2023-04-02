<template>
    <button @click.prevent='handleTopButtonClick'>
        <i class="fa-solid fa-arrow-up"> </i> 
    </button>
</template>

<script setup lang='ts'>
    const handleTopButtonClick = () => document.documentElement.scrollTop = document.body.scrollTop = 0;
</script>

<style lang='scss' scoped>
    button {
        font-size: 25px;
        height: 50px;
        width: 50px;
        border-radius: 25px;
        border: $blue;
        background-color: $blue;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button:hover {
        background-color: $dark-cyan;
        -webkit-transition: background-color 0.1s ease-out;
        -moz-transition: background-color 0.1s ease-out;
        -o-transition: background-color 0.1s ease-out;
        transition: background-color 0.1s ease-out;
        
        cursor: pointer;
    }
</style>