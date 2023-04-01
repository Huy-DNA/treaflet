<template>
    <PostContent :summary="summary" :title="title" :created-at="createdAt" :modified-at="modifiedAt" :content="content"/>
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
        title: "printf - A speculative implementation",
    })
    const summary = "This post mainly concerns itself with the problem of functions accepting a variable number of parameters. There's a catch though!"
    const title = "printf - A speculative implementation"
    const createdAt = "01/04/2023"
    const modifiedAt = "01/04/2023"
    const content = `<h2 id="introduction">Introduction</h2>
<p>Yesterday (31/03/2023), my professor asked my class a simple question: "How can <code>printf</code> accept a variable number of parameters?". Well, the first thing that came to my mind was a concept called <em>variadic function</em> in C. But even then, how does variadic and the magical ellipsis (<code>...</code>) really work??? Till that point, I had not really thought much about those three magical dots and it was pretty much a black box to me.</p>
<p>As far as I know, in assembly languages, passing a variable number of parameters is totally normal -- you save the parameters in memory, pass a pointer and something to mark those parameters (because in assembly, there are no concept of <em>type</em>, just byte and byte) to the function, that's all. I couldn't totally resolve the problem in my head before the class ended and it haunted me all throughout the bus ride to my brother's house (to the point that my bus almost ran past my bus stop). Luckily, I was able to break the magic &amp; come up with a way to do this.</p>
<p>This maybe the first post in the series about <code>printf</code> or variadic functions? -- I have not really decided yet! At the time I write this post, I still haven't looked into how variadic functions &amp; <code>printf</code> really work in C/C++, so this is just my speculation! (Hence the name of the post)</p>
<p>It's often (or sadly, used to be) my habit to guess how something works before looking them up.</p>
<h2 id="languages-in-this-post">Languages in this post</h2>
<p>I use C to write both a variadic and a non-variadic version. MIPS is also used to better illustrate the underlying working here.</p>
<h2 id="goals">Goals</h2>
<ul>
<li><p>Devise a way to pass and process a variable number of parameters to <code>printf</code>. It isn't in this post's scope to be concerned with the underlying IO operation, so I'll just be using the <code>write</code> system call API. I could have used <code>printf</code>, but that is hypothetical!</p>
</li>
<li><p>The implementation must be able to accept a variable number of parameters <em>at runtime</em>.</p>
<p>What do I mean by this? In C++, there are some powerful compile-time features such as template &amp; parameter pack which strongly resemble variadic functions.  <strong>However</strong>, implementations using those features do not accept a variable number of parameters <em>at runtime</em>, they just create that illusion. It's outside of the scope of this post to fully explain this, but the take-away note is that when you compile those implementations, the compiled code can only accept a finite number of parameters!</p>
</li>
</ul>
<h2 id="a-short-and-sweet-knowledge-refresher">A short-and-sweet knowledge refresher</h2>
<h3 id="mips-assembly">MIPS assembly</h3>
<p>Kindly note that MIPS is in the big-endian camp.</p>
<p>We'll make heavy use of these following three MIPS basic (or basic type of) instructions:</p>
<ul>
<li>Load instructions:</li>
</ul>
<pre><label>MIPS</label><code class="language-MIPS">lw rt, im(rs)   # rt is assigned the word starting from rs + im
lh rt, im(rs)   # rt is assigned the half word starting from rs + im
lb rt, im(rs)   # rt is assigned the byte at rs + im
</code></pre>
<ul>
<li>Store instructions:</li>
</ul>
<pre><label>MIPS</label><code class="language-MIPS">sw rt, im(rs)   # rt is stored as a word at the address starting from rs + im
sh rt, im(rs)   # rt is stored as a half word (the lower half) at the address starting from rs + im
sb rt, im(rs)   # rt's lowest byte is stored at rs + im
</code></pre>
<ul>
<li>Jump and link instruction: <code>jal address</code></li>
</ul>
<p>Jump to an address whose the highest 4 bits are taken from the <code>PC</code> and the lowest 28 bits are the <code>address</code> value shifted left by 2 bit (this is also known as pseudo-indirect addressing).</p>
<p>One thing to note about load &amp; store instructions is that <code>im + rs</code> must be aligned, i.e, a word address must start at an address that is divisible by the word size and a byte's address can be anywhere. Another final note is that these load &amp; store instructions each have an unsigned equivalence.</p>
<h3 id="function-call">Function call</h3>
<p>What really happens behind a function call like this?</p>
<pre><label>C++</label><code class="language-C++">void f(int, int);
...
f(10, 20);
</code></pre>
<p>The third line could be translated to MIPS like this:</p>
<pre><label>MIPS</label><code class="language-MIPS"># may store the current \$a0, \$a1

li \$a0, 10
li \$a1, 20
jal &lt;f_address&gt;

# retrieve the old \$a0, \$a1
</code></pre>
<p>However, this isn't the only way of passing parameters. In fact, with this scheme, you can only pass a limited number of fixed-size (the size of a word) parameters.</p>
<p>Another way to do this is to write the parameters into a contiguous buffer in memory and pass the address of the buffer plus the number of parameters to the function, like this:</p>
<pre><label>MIPS</label><code class="language-MIPS">
la \$a0, &lt;buffer_address&gt;

li \$t0, 10
sw \$t0, 0(\$a0)

li \$t0, 20
sw \$t0, 4(\$a0)

li \$a1, 2

jal &lt;f_address&gt;
</code></pre>
<p>That's all! But are we missing something here?</p>
<p>Well, because these two choices of parameter passing differ in the parameters passed to the function, the function itself needs to know that what scheme is used in order to interpret the parameters correctly. Thus, the parameter-receiving code of the first <code>f</code> and the second <code>f</code> should be different. Whether to use the former or the latter is established by the coder (of MIPS) or the compiler (in high-level languages) as part of what is called the <a href="https://en.wikipedia.org/wiki/Calling_convention">Calling convention</a>.</p>
<p>So, we are done with passing parameters right? Well, no! There still remains two problems:</p>
<ul>
<li>In higher-level languages, there are concepts of data types. Data types can be of various words (or bytes) in size. The latter scheme shown above only works because we treat each parameter as a word, therefore, only the address of the buffer and the number of parameters suffice to locate all the parameters. However, functions like <code>printf</code> accept variable parameters of <strong>variable types</strong>, those information alone is not sufficient.</li>
<li>We know how to pass variable parameters in MIPS, but how can we do it in C/C++? The answer is the ellipsis <code>...</code>, but I want to get deeper than this.</li>
</ul>
<h2 id="lets-get-dirty">Let's get dirty!</h2>
<h3 id="printf-api">printf API</h3>
<p>Here's the API for <code>printf</code> specified in <a href="https://cplusplus.com/reference/cstdio/printf/">cplusplus</a>:</p>
<pre><label>C++</label><code class="language-C++">int printf(const char* format, ...);
</code></pre>
<ul>
<li><code>printf</code> accepts a variable number of parameters (hence the ellipsis), but must be at least 1.</li>
<li><code>printf</code> accepts a format string as the first argument.</li>
<li><code>printf</code> returns an <code>int</code> but we may not worry about it here.</li>
</ul>
<h3 id="now-how-do-we-pass-the-parameters">Now how do we pass the parameters!?</h3>
<p>Well, let's first talk from C's perspective: How does C process this statement?</p>
<p>My initial-and-only guess is that it involves some compiler magic (maybe macro or something more than that). Precisely, some transformation happens:</p>
<p><img alt="C compiler magic" src="/printf/c-compiler.svg"></p>
<p>Of course, with this, some additional statements have to be prepended to write the parameters to a predefined buffer. Nevertheless, this is perfectly fine.</p>
<p>The only issue we have to address now is how to locate the parameters in the buffer.</p>
<p>As stated, because of the concept of "data type", this isn't immediately solved by passing a length parameter. The buffer passed to the function is no more than a raw array of bytes! We need information about the type of each parameter <em>at runtime</em>.</p>
<p>How can!? Many higher-level language does comprehensively support runtime type information (with more overhead than C obviously). With C++, this is limited. With C (which I don't know much of), as far as I know, doesn't natively support runtime type information. So I'll let you think a little bit.</p>
<p>...</p>
<p>...</p>
<p>Have you come up with a plan? It turns out to be pretty simple. Just look at the first parameter -- the <code>format</code> string. It already encodes type information for us, namely <code>%s</code>, <code>%d</code>, <code>%p</code>... Each type information comes with its size-in-byte information. These are sufficient to locate the parameters in the buffer in an almost straightforward way (just don't forget about <strong>data alignment</strong> though).</p>
<p>It's funny how we don't even need to pass a length parameter, just the buffer address is enough!</p>
<h3 id="lets-implement----from-a-high-level-view">Let's implement -- From a high-level view</h3>
<h3 id="its-real-code-now-elipsis">It's real code now **<em>elipsis</em>**</h3>
`

    onMounted(() => document.querySelectorAll('pre code').forEach((el) => hljs.highlightElement(el as HTMLElement)))

</script>