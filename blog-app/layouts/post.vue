<template>
    <TopButton v-if='shouldShowTopButton' class='top-button'/>
    <slot/>
</template>

<script setup lang='ts'>
    const shouldShowTopButton = ref<boolean>(false);

    const handleScroll = () => {
        if (window.scrollY > 100)
            shouldShowTopButton.value = true;
        else
            shouldShowTopButton.value = false;
    }

    onMounted(() => {
        window.addEventListener("scroll", handleScroll);
    })

    onUnmounted(() => {
        window.removeEventListener("scroll", handleScroll);
    })

</script>

<style lang='scss' scoped>
    .top-button {
        position: fixed;
        z-index: 1;
    }

    .top-button {
        right: 6.5vw;
        bottom: 6.5vw;
    }

    @media(min-width: 700px) {
        .top-button {
            right: 3vw;
            bottom: 3vw;
        }
    }
</style>

