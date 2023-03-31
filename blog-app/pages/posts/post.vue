<template>
    <div>
        <TopButton v-if='shouldShowTopButton' class='top-button'/>
        <Breadcrumb>
            <ul>
                <li><NuxtLink to='/'>Home</NuxtLink></li>
                <li><NuxtLink to='/posts/'>Posts</NuxtLink></li>
                <li><NuxtLink to='#'>Current post</NuxtLink></li>
            </ul>
        </Breadcrumb>
        <NuxtPage/>
    </div>
</template>

<script setup lang='ts'>
    const shouldShowTopButton = ref<boolean>(false);

    const handleScroll = () => {
        if (window.scrollY > 0)
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

