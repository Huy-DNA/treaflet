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
        title: "Trait implementation in Rust & how inheritance differs from interfaces",
    })
    const summary = "This post discusses about how inheritance and interface are two entirely different mechanism, how Trait in Rust is an implementation of the interface abstraction & how Trait object is implemented"
    const title = "Trait implementation in Rust & how inheritance differs from interfaces"
    const createdAt = "02/09/2024"
    const modifiedAt = "02/09/2024"
    const content = `<h1 id="writing-for-a-friends-inquiry-about-traits-in-rust">Writing for a Friend's Inquiry About Traits in Rust</h1>
<p>Originally a Facebook post <a href="https://www.facebook.com/photo/?fbid=1419295315340360&amp;set=a.1076876269582268&amp;notif_id=1707374922510581&amp;notif_t=feedback_reaction_generic&amp;ref=notif">here</a></p>
<p>Recently, a friend of mine (It's you, <a href="https://www.facebook.com/quannhg">Nguyễn Hồng Quân</a> 🫵) asked a question like this: "I don't understand why Rust calls its interfaces 'traits'?"</p>
<p>With my limited knowledge and perhaps not complete accuracy, let me attempt to answer!</p>
<h2 id="distinguishing-inheritance-and-interfaces">Distinguishing Inheritance and Interfaces</h2>
<p>Many of us have worked with languages like C++, Java, and JavaScript, and we've likely encountered inheritance, right?</p>
<p>Take 5 minutes to think about the relationship between inheritance and interfaces:</p>
<p>5️⃣ 4️⃣ 3️⃣ 2️⃣ 1️⃣</p>
<p>In traditional object-oriented programming languages, such as C++ and Java, there seems to be a tight connection between inheritance and interfaces through constructs like this in C++:</p>
<pre><label>C++</label><code class="language-C++">class A : public B {
}
</code></pre>
<p>Here, class <code>A</code> both inherits from <code>B</code> (for code reuse) and can replace <code>B</code> in situations where an object of type B is desired because <code>A</code> can do what <code>B</code> does (subtyping/interface). In Java, these two mechanisms are somewhat separated (with a dedicated interface definition), but fundamentally, it remains the same.</p>
<p>This might lead us to believe that inheritance and interfaces are closely tied as a common operational mechanism.</p>
<p>However, that's not entirely true! On page 295 [1], there's a note about the difference between inheritance and subtyping:</p>
<ul>
<li>"The concept of subtype has to do with the possibility of using an object in another context. It is a relation between the interfaces of two classes."</li>
<li>"The concept of inheritance has to do with the possibility of reusing the code that manipulates an object. It is a relation between the implementations of two classes."</li>
</ul>
<p>In reality, the purpose of inheritance is primarily code reuse. However, in traditional OOP languages like C++, Java, and Python, during code reuse, they allow subtyping as well!</p>
<p>So, here, let's consider an interface as a collection of abilities for an object. Type <code>A</code> is a subtype of type <code>B</code> if <code>A</code>'s interface contains <code>B</code>'s interface.</p>
<h2 id="trait">Trait</h2>
<p>Returning to the question: "Why is an interface in Rust called a 'trait'?"</p>
<p>More precisely, a trait is a mechanism for implementing an interface. By implementing a trait for a type, an object of that type gains the abilities defined by that trait and can be used in specific contexts.</p>
<p>In C++ and Java, a class can also be seen as a mechanism for implementing an interface.</p>
<p>In reference [3], there's a passage that goes like this:</p>
<p>"[…] we increasingly see the rise of 'class-less' interface abstractions cropping up across many languages: protocols (Swift), traits (Rust), interfaces (Go), concepts (C++), and contracts (Go)."</p>
<h2 id="trait-implementation">Trait Implementation</h2>
<p>This section is the most interesting part, and I've been curious about how traits are actually implemented in Rust. How does it differ from using vtables in languages like C++ and (possibly) Java?</p>
<p>One notable distinction between traits in Rust and interfaces in C++ or Java is as follows:</p>
<p>In C++ and Java, when declaring a class, we must specify whether it extends another class or implements an interface. This decision is fixed and cannot be changed by subsequent code.
In Rust, you can independently declare a trait and implement it for any struct, including those from external libraries. Essentially, a struct can magically acquire multiple traits (or extend interfaces).
So, how are traits actually implemented? Using vtables directly is not the answer. Vtables in objects assume that the set of methods for that object will never change.</p>
<p>While pondering this, I've come up with a possible implementation approach.</p>
<p>Let's consider the following Rust snippet:</p>
<pre><label>rust</label><code class="language-rust">
use std::fmt::Display;

fn print_ln(t: &amp;dyn Display) {
    println!("{}", t);
}

fn main() {
    let i = 10;
    let di = &amp;i as &amp;dyn Display;
    print_ln(di);
}
</code></pre>
<p>Now, what is the essence of <code>&amp;dyn Display</code>? Semantically, it's a reference to an object that implements the Display trait. So, what lies beneath?</p>
<p>I believe it's an object containing two pointers:</p>
<ul>
<li>A pointer to the original object (data pointer).</li>
<li>A pointer to the trait implementation of that type (method table pointer).</li>
</ul>
<p>When declaring <code>di</code>, the compiler adds code to transform <code>&amp;i</code> into the object structure I described above.</p>
<p>In the <code>print_ln</code> function, when calling <code>println!</code>, the second pointer of <code>t</code> is used to find the appropriate method and then that method is passed the first pointer of <code>t</code>.</p>
<p>In summary, it's somewhat like this, and upon searching, I found a diagram in [4] that closely resembles my mental model.</p>
<h2 id="references">References:</h2>
<p>[1]: Maurizio Gabbrielli, Simone Martini - Programming Languages:
Principles and Paradigms Second Edition - Springer</p>
<p>[2]: Benjamin C. Pierce - Types and Programming Languages-The MIT Press (2002)</p>
<p>[3]: <a href="https://pling.jondgoodwin.com/post/disinheriting-abstract-classes/?fbclid=IwAR1Wy14x-fZdBm4M7wjJXhWaYfJTTYKEIryashixihRiPkOD3iEs3xqMRog">JonGoodwind's blog</a></p>
<p>[4]: <a href="https://oswalt.dev/2021/06/polymorphism-in-rust/">Oswalt's blog</a></p>
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

