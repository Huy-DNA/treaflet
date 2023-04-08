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
<p>In the previous post, I have shown a diagram describing a <strong>pobssible</strong> high-level mechanism of calling <code>printf</code>. I want to iterate that <strong>this is all my speculation</strong>. In this post, I will implement this approach.</p>
<p><img alt="C++ compiler magic" src="/printf/high-level-imp.svg"></p>
<p>The full code can be found on my github here: <a href="https://github.com/HuyDNA/nonvariadic-printf">HuyDNA/nonvariadic-printf</a></p>
<h3 id="api-used-in-this-implementation">API used in this implementation</h3>
<ul>
<li><code>align</code> from <code>&lt;memory&gt;</code></li>
</ul>
<pre><label>C++</label><code class="language-C++">    void* align( std::size_t alignment,
                 std::size_t size,
                 void*&amp; ptr,
                 std::size_t&amp; space );
</code></pre>
<p>We needn't care too much about the <code>size</code> and <code>space</code> parameter here. If <code>size</code> is set to <code>0</code> and <code>space</code> references a very large number, this function will align <code>ptr</code> by the specified <code>alignment</code>.</p>
<p>There's one pitfall: If <code>ptr</code> is already aligned, calling this function will set <code>ptr</code> to the next aligned address.</p>
<ul>
<li><code>fputs</code> from <code>&lt;cstdio&gt;</code></li>
</ul>
<pre><label>C++</label><code class="language-C++">    int fputs( const char* str, std::FILE* stream );
</code></pre>
<p>Write a null-terminated string to an output stream.</p>
<ul>
<li><code>fwrite</code> from <code>&lt;cstdio&gt;</code></li>
</ul>
<pre><label>C++</label><code class="language-C++">    std::size_t fwrite( const void* buffer, std::size_t size, std::size_t count, std::FILE* stream );
</code></pre>
<p>Write up to <code>count</code> binary objects from the given array buffer to the output stream stream.</p>
<ul>
<li><code>putchar</code> from <code>&lt;cstdio&gt;</code></li>
</ul>
<pre><label>C++</label><code class="language-C++">    int putchar( int ch );
</code></pre>
<p>Write a character <code>ch</code> to <code>stdout</code>.</p>
<h3 id="my-implementation-of-printf">My implementation of <code>printf</code></h3>
<p>My implementation of <code>printf</code> (called <code>my_printf</code>) is as follows.</p>
<pre><label>C++</label><code class="language-C++">#include &lt;cstdio&gt;
#include &lt;cstring&gt;
#include &lt;string&gt;
#include &lt;climits&gt;
#include &lt;stdexcept&gt;
#include &lt;memory&gt;
#include "my_printf.h"

void _my_printf_(const char* format, void* buffer) {
    void* p_last = buffer;

    const char* format_pos = format;
    int length = 0;

    for (int i = 0; format[i] != '\\0'; ++i) {
        if (format[i] != '%') {
            ++length;
        }
        else {
           fwrite((const void*) format_pos, length, sizeof(char),  stdout);
           format_pos += length + 2;
           length = 0;

           ++i;
           
           //The following line is to deal with a pitfall: std::align would return the next pointer if the pointer is already aligned
           p_last = (char*)p_last - 1; // Note this

           if (format[i] == '\\0') {
              putchar('%');
              break;
           }
           else if (format[i] == 'd') {
              if (!__realign(p_last, int))
                 throw std::runtime_error("Buffer overloaded");    

              int num = *(int*)p_last;
              fputs(std::to_string(num).c_str(), stdout);

              p_last = (int*)p_last + 1;
           }
           else if (format[i] == 'f') {
              if (!__realign(p_last, double))
                 throw std::runtime_error("Buffer overloaded");

              double num = *(double*)p_last;
              fputs(std::to_string(num).c_str(), stdout);

              p_last = (double*)p_last + 1;
           }
           else if (format[i] == 's') {
              if (!__realign(p_last, const char*))
                 throw std::runtime_error("Buffer overloaded");
              const char* s = *(const char**)p_last;
              fputs(s, stdout);

              p_last = (char**)p_last + 1;
           }
           else if (format[i] == 'p') {
              if (!__realign(p_last, const void*))
                 throw std::runtime_error("Buffer overloaded");

              const void* p = *(const void**)p_last;
              
              long long num = (std::size_t)p;

              fputs(std::to_string(num).c_str(), stdout); 
           }
           else {
              throw std::runtime_error("Unknown format specifier");
           }
        }
    }
    fwrite(format_pos, length, sizeof(char), stdout);
}
</code></pre>
<p>This strongly resembles the variadic version.</p>
<p>Notice how I have to move <code>p_last</code> back by <code>1</code> before calling <code>__realign</code>. Due to the pitfall mentioned above, this is to ensure that <code>p_last</code> points to the right address even if it's already aligned.</p>
<p>At first sight, the overwhelming amount of c-style casts (which perform similarly to <code>reinterpret_cast</code> in this case) may look intimidating. However, if you have wrapped your head around the example in the previous post, I think this should be digestible.</p>
<p>You can compile it to an object file.</p>
<pre><label>Bash</label><code class="language-Bash">g++ -o my-printf.o -c my-printf.cpp
</code></pre>
<h3 id="writing-a-pre-preprocessor-for-my-printf">Writing a pre-preprocessor for my-printf</h3>
<p>This is to simulate how a compiler could transform the client code before compiling.</p>
<p>In this section, I write a simple python script which make use of regex to detect calls to <code>my-printf</code> and add code that handles writing parameters to buffer in the client code.</p>
<pre><label>Python</label><code class="language-Python">import sys
import re

printfPattern = re.compile(r"my_printf\\s*\\(([^,;()]*)((?:,[^,;()]*)*)\\)\\s*;", re.MULTILINE | re.DOTALL)
def printfSubstitute(match):
    def getWriteParamString(param):
        return f"""
            p_last = (char*)p_last - 1; // avoid the std::align pitfall
            __realign(p_last, decltype({param} + 0));
            *(decltype({param} + 0)*)p_last = {param};
            p_last = (decltype({param} + 0)*)p_last + 1;
        """

    statement = match.group(0)
    print("Detected: " + statement)

    formatString = match.group(1)
    params = match.group(2).split(',')[1:]

    paramWriteStatements = ''.join([getWriteParamString(param) for param in params])

    return f"""{{
        void* __internal_buffer = malloc(10000);
        void* p_last = __internal_buffer;

        {paramWriteStatements}

        _my_printf_({formatString}, __internal_buffer);

        free(__internal_buffer);
    }}
    """

if __name__ == '__main__':
    if len(sys.argv) &lt; 2:
        exit("Error: At least one source file should be applied.")

    sourceNameList = sys.argv[1:]
    for sourceName in sourceNameList:
        sourceContent = ""
        with open(sourceName, 'r') as sourceFile:
            sourceContent = sourceFile.read()
            sourceContent = printfPattern.sub(printfSubstitute, sourceContent)
        
        with open(f"{sourceName[:-4]}.output.cpp", 'w') as sourceFile:
            sourceFile.write(sourceContent)
</code></pre>
<p>I name the script <code>pre-preprocessor.py</code> and it accepts input source files as arguments. As a result, it then transforms the source files and write the intermediate outputs to files with the extension <code>.output.cpp</code>.</p>
<p>For example, if you have file named <code>main.cpp</code>, you can run</p>
<pre><label>Bash</label><code class="language-Bash">    python3 pre-preprocessor.py main.cpp
</code></pre>
<p>You will notice a <code>main.output.cpp</code> file has been created -- inspect the file and you will see what the script does!</p>
<p>You should notice that the code injected is very similar to the example in the previous post.</p>
<p>After feeding the source code to the script, you can finally compile the generated code.</p>
<pre><label>Bash</label><code class="language-Bash">    g++ -o main main.output.cpp my-printf.o
</code></pre>
<p>Additionally, in the repo I have prepared a <code>Makefile</code> for you. You can follow the steps in there to see how it plays out.</p>
<h3 id="does-the-real-compiler-really-go-through-all-these-hassle-to-get-printf-to-run-">Does the real compiler really go through all these hassle to get <code>printf</code> to run !?</h3>
<p>You couble be now understandably wondering why <code>printf</code> get all these special treatment. Well -- actually, I think it's the variadic (<code>...</code>) functions that get the special treatment, not just <code>printf</code>. The laid-out scheme in these two posts lend itself well to any variadic functions.</p>
<p>That is, there's probably an internal buffer to where the parameters are written to. The macro <code>va_arg</code> is probably used to interpret the bytes of this internal buffer as some type &amp; and move the internal <code>p_last</code> pointer.</p>
<p>In conclusion, implementations of variadic functions may vary, but one thing for sure is there's no magic in this like anything else in the world of computers &amp; programming languages.</p>
<p>I hope that you have already come up with a scheme for handling variadic functions of your own by now!</p>
<p>See you in another post.</p>
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

