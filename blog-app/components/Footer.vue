<template>
    <footer>
        <p class='title'><span class='blue'>Blogging...</span>In<span class='pink-red'><i>He</i>//</span></p>
        <p>Made with <span class='pink-red'>love</span> ❤️ and extreme <span class='blue'>pain</span> 🥹 </p>
        <div class='icon-tray'>
            <a href='mailto:huydo862003@gmail.com' target='_blank' rel='noreferrer noopener' class='fa fa-envelope' aria-hidden='true'></a>
            <a href='https://github.com/HuyDNA' target='_blank' rel='noreferrer noopener' class='fa-brands fa-github'></a>
            <a href='https://www.facebook.com/zzzpiggybankzzz/' target='_blank' rel='noreferrer noopener' class='fa-brands fa-facebook-f'></a>
        </div>
    </footer>
</template>

<style lang='scss' scoped>
    .blue {
        color: $blue;
    }

    .pink-red {
        color: $pink-red;
    }

    footer {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    p.title {
        font-size: 30px;
        margin-bottom: 2px;
    }

    footer {
        background-color: $light-black;
        color: $white;
        margin-top: 100px;
        margin-bottom: 0px;
        padding: 30px 20px 30px 30px;
    }

    .github-icon {
        fill: $white;
        height: 2em;
    }

    div.icon-tray {
        font-size: 30px;
        display: flex;
        gap: 10px;
    }

    .icon-tray a {
        text-decoration: none;
    }
</style>