<template>
    <header>
        <GithubCorner github-link='https://github.com/HuyDNA/'/>
        <h1>
            <span class='blue'>Blogging...</span>
            <span>In</span>
            <i class='pink-red'>He</i>
            <span class='pink-red'>//</span>
        </h1>
    </header>
</template>

<style lang='scss' scoped>
    header {
        border-bottom: 5px solid $silver;
        margin-bottom: 30px;
    }

    h1 {
        font-family: 'Lato', sans-serif;
        font-size: 50px;
        justify-content: center;
        display: flex;
    }

    .blue {
        color: $blue;
    }

    .pink-red {
        color: $pink-red;
    }

</style>