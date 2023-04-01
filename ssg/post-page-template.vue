<template>
    <PostContent :summary="summary" :title="title" :created-at="createdAt" :modified-at="modifiedAt" :content="content"/>
</template>

<script setup lang='ts'>
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
                {
                    src: "//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js",
                },
                {
                    type: 'text/javascript',
                    innerHTML: "hljs.highlightAll()",
                },
            ],
        title: "#@#@post-title",
    })
    const summary = "#@#@post-summary"
    const title = "#@#@post-title"
    const createdAt = "#@#@post-created-at"
    const modifiedAt = "#@#@post-modified-at"
    const content = `#@#@post-content`
</script>