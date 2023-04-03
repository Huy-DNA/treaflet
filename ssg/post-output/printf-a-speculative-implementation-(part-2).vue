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
        <PostContent :summary="summary" :title="title" :created-at="createdAt" :modified-at="modifiedAt" :content="content"/>
    </div>
</template>

<script setup lang='ts'>
    import hljs from 'highlight.js'

    useHead({
        link: [
            {
                rel: 'stylesheet',
                href: "//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/rainbow.min.css",
            },
        ],
        script: [
                {
                    type: "text/javascript",
                    innerHTML: `MathJax = {
                                    tex: {
                                        inlineMath: [['$', '$']],
                                    }
                                };`
                },
                { 
                    hid: "MathJax-script", 
                    async: true, 
                    src:"https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js",
                },
            ],
        title: "printf - A speculative implementation (part 2)",
    })
    const summary = "In this post, I implement the non-variadic version of `printf` with a pre-preprocessor."
    const title = "printf - A speculative implementation (part 2)"
    const createdAt = "03/04/2023"
    const modifiedAt = "03/04/2023"
    const content = `<h2 id="printf---a-speculative-implementation-part-2">printf - A speculative implementation (part 2)</h2>
<p><em>Link to the previous post: <a href="/posts/printf-a-speculative-implementation">part 1</a></em></p>
<p>In the previous post, a diagram describing a <strong>pobssible</strong> high-level mechanism of calling <code>printf</code> has been discussed. I want to iterate that <strong>this is all my speculation</strong>. In this post, I will implement this approach.</p>
<h3 id="my-implementation-of-printf">My implementation of <code>printf</code></h3>
`

    onMounted(() => document.querySelectorAll('pre code').forEach((el) => hljs.highlightElement(el as HTMLElement)))
    
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

