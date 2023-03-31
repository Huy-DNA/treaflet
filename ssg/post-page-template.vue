<template>
    <PostContent :summary="summary" :title="title" :created-at="createdAt" :modified-at="modifiedAt" :content="content"/>
</template>

<script setup lang='ts'>
    useHead({
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
            ]
    })
    const summary = "#@#@post-summary"
    const title = "#@#@post-title"
    const createdAt = "#@#@post-created-at"
    const modifiedAt = "#@#@post-modified-at"
    const content = `#@#@post-content`
</script>