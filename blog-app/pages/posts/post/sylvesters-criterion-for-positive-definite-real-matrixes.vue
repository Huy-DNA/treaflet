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
                    src: "//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/languages/mipsasm.min.js",
                },
                {
                    type: 'text/javascript',
                    innerHTML: "hljs.highlightAll()",
                },
            ],
        title: "Sylvester's criterion for positive-definite real matrixes",
    })
    const summary = "An elementary proof to Sylvester's criterion. Some rantings bonus."
    const title = "Sylvester's criterion for positive-definite real matrixes"
    const createdAt = "20/07/2022"
    const modifiedAt = "29/03/2023"
    const content = `<h2 id="introduction">Introduction</h2>
<p>Sometimes, I still have flashbacks of the time we had to learn Linear Algebra and Calculus at university. They were not necessarily hard but they really did give me kind of a struggle. The problem I had was the way they were taught, kinda like "Here we apply this.... and boom! Problem solved" with no further explanations as to why it worked. It just worked! This made me SUPER frustrated as I have always needed to know how something works before actually make it work.</p>
<p>As for Linear Algebra, this was a whole new area for me. At first, topics like Gaussian elimination, determinant, vector space or orthogonal matrix did not really give me a hard time. I did stumble here and there but overall I could prove most relevant mathematical results easily. However, the last few topics such as eigenvalues and quadratic forms were incredibly hard. The mathematical results were kinda unintuitive. At some time, I gave up and just learned the results by heart and how to apply it anyways. I did look up some of the proofs but apparently, this did not satisfy me.</p>
<p>For now is the summertime, I've decided to revisit some of the results to try to prove them. This is the first of them! And it's inspired by one proof I came across to a different theorem a long time ago. If my memory serves me right, I think that theorem was:</p>
<blockquote>
<p>Proves that symmetric matrices are always orthogonally diagonalizable.</p>
</blockquote>
<p>The theorem I'm about to prove has to do with quadratic form of symmetric matrices. Let's dive in!!!</p>
<p><em>Final remark. (editted at 29/03/2022)</em> Looking back at this reminds me of the old glorious time where I got a good hold of Math. I don't know, if I'm to review all the Math knowledge now, I may still be as good. It's just that, there are a lot of things going on right now and I can't just indulge myself in this anymore. Well, this will always be a reminder that I used to live a much simpler life than the one I'm living through now.</p>
<h2 id="notations">Notations</h2>
<ul>
<li>\$M_n\$ The set of all square matrices of size \$n \\times n\$.</li>
<li>\$\\Delta_i\$ The upper left \$i\$-by-\$i\$ corner of a given matrix \$\\boldsymbol{A}\$.</li>
</ul>
<h2 id="prerequisite-knowledge">Prerequisite knowledge</h2>
<p><em>Definition 1.</em> Given a symmetric matrix \$\\boldsymbol{A} \\in M_n\$. The quadratic form of \$\\boldsymbol{A}\$ is \$Q(\\boldsymbol{x}) = \\boldsymbol{x}^T\\boldsymbol{A}\\boldsymbol{x}\$, with \$\\boldsymbol{x} \\in \\mathbb{R}^n\$.</p>
<p><em>Definition 2.</em> Given a symmetric matrix \$\\boldsymbol{A} \\in M_n\$, then \$\\boldsymbol{A}\$ is said to be positive-definite if and only if its quadratic form \$Q(\\boldsymbol{x}) &gt; 0\$ for all non-zero \$\\boldsymbol{x} \\in \\mathbb{R}^n\$.</p>
<p>As we can see, the quadratic form of a symmetric matrix \$\\boldsymbol{A}\$ is actually \$Q(\\boldsymbol{x}) = P(x_1, x_2, \\cdots, x_n) = \\displaystyle \\sum_{1 \\le i &lt; j \\le n} 2a_{ij}\\times x_ix_j = \\displaystyle \\sum_{i = 1}^n a_{ii}\\times x_i^2\$. Therefore, a symmetric matrix is positive-definite if and only if \$P(x_1, x_2, \\cdots, x_n)\$ for all real number \$x_1, x_2, \\cdots, x_n\$.</p>
<p><em>Theorem 1.</em> Given a matrix \$\\boldsymbol{A} \\in M_n\$. Then \$\\boldsymbol{A}\$ is orthogonally diagnonalizable if and only if \$\\boldsymbol{A}\$ is symmetric.</p>
<p><em>Theorem 2.</em> A symmetric matrix \$\\boldsymbol{A} \\in M_n\$ if positive-definite if and only if all of its eigenvalues are positive.</p>
<p>It can be easily seen that <em>Theorem 1.</em> is actually a stronger result than the one I mentioned earlier. I will use these two theorems in my proof.</p>
<h2 id="sylvesters-criterion">Sylvester's criterion</h2>
<p>Sylvester's criterion
 gives a necessary and sufficient criterion
 for a symmetric \$\\boldsymbol{A}\$ to be positive-definite.</p>
<p><em>Sylvester's criterion.</em> Given a symmetric \$\\boldsymbol{A} \\in M_n\$. Then \$\\boldsymbol{A}\$ is positive-definite if and only if \$|\\Delta_i| &gt; 0\$ for all \$i = \\overline{1, n}\$.</p>
<h2 id="proof">Proof</h2>
<ul>
<li>Sylvester's criterion is sufficient for a symmetric matrix \$\\boldsymbol{A}\$ to be positive-definite (i).</li>
</ul>
<p><em>Proof.</em> Prove by induction on the size of \$\\boldsymbol{A}\$.</p>
<p>Base step. It's trivial to prove the case where \$\\boldsymbol{A} \\in M_1\$.</p>
<p>Induction step. Assume that statement (i) is already true where \$\\boldsymbol{A} \\in M_n\$.<br>Now that \$\\boldsymbol{A} \\in M_{n+1}\$, \$\\boldsymbol{A}\$ can be written as \$\\begin{pmatrix}\\boldsymbol{A'} &amp; \\boldsymbol{u} \\\\ \\boldsymbol{u}^T &amp; x\\end{pmatrix}\$, where \$\\boldsymbol{A'} \\in M_n\$ is a symmetric matrix and \$\\boldsymbol{u} \\in \\mathbb{R}^n\$.<br>Then \$\\boldsymbol{A'}\$ is positive-definite and according to <em>Theorem 1.</em> can be written as \$\\boldsymbol{A'} = \\boldsymbol{P}\\boldsymbol{D}\\boldsymbol{P}^{T}\$ where  \$\\boldsymbol{D}\$ is a diagonal matrix.</p>
<p>Moreover, all entries in \$\\boldsymbol{D}\$ must be positive, as can be easily inferred from <em>Theorem 2.</em> (1)  </p>
<p>Because \$\\boldsymbol{P}\$ is nonsingular, there exists a vector \$\\boldsymbol{v} \\in \\mathbb{R}^n\$ such that \$ \\boldsymbol{u} = \\boldsymbol{P}\\boldsymbol{v}\$.<br>Therefore, \$\\boldsymbol{A} = \\begin{pmatrix}\\boldsymbol{P}\\boldsymbol{D}\\boldsymbol{P}^T &amp; \\boldsymbol{P}\\boldsymbol{v} \\\\ \\boldsymbol{v}^T\\boldsymbol{P^T} &amp; x \\end{pmatrix}= \\begin{pmatrix}\\boldsymbol{P} &amp; 0 \\\\ 0 &amp; 1 \\end{pmatrix} \\begin{pmatrix}\\boldsymbol{D} &amp; \\boldsymbol{v} \\\\ \\boldsymbol{v}^T &amp; x\\end{pmatrix} \\begin{pmatrix}\\boldsymbol{P}^T &amp; 0 \\\\ 0 &amp; 1\\end{pmatrix} = \\boldsymbol{Q}\\begin{pmatrix}\\boldsymbol{D} &amp; \\boldsymbol{v} \\\\ \\boldsymbol{v}^T &amp; x\\end{pmatrix}\\boldsymbol{Q}^T\$<br>where \$\\boldsymbol{Q} = \\begin{pmatrix}\\boldsymbol{P} &amp; 0 \\\\ 0 &amp; 1 \\end{pmatrix}\$.</p>
<p>From this we have, \$|\\Delta_{n+1}| = |\\boldsymbol{A}| = |\\boldsymbol{Q}|^2\\begin{vmatrix}\\boldsymbol{D} &amp; \\boldsymbol{v} \\\\ \\boldsymbol{v}^T &amp; x\\end{vmatrix}\$.<br>And because \$|\\Delta_{n+1}|&gt; 0\$, \$\\begin{vmatrix}\\boldsymbol{D} &amp; \\boldsymbol{v} \\\\ \\boldsymbol{v}^T &amp; x\\end{vmatrix} &gt; 0\$.</p>
<p>We can set \$\\boldsymbol{B} = \\begin{pmatrix} \\boldsymbol{D} &amp; \\boldsymbol{v} \\\\ \\boldsymbol{v}^T &amp; x \\end{pmatrix}\$. Notice that \$\\boldsymbol{Q}\$ is an orthogonal matrix as \$\\boldsymbol{Q}\\boldsymbol{Q}^T = \\boldsymbol{I}\$. Then because \$\\boldsymbol{A} = \\boldsymbol{Q}\\boldsymbol{B}\\boldsymbol{Q}^T = \\boldsymbol{Q}\\boldsymbol{B}\\boldsymbol{Q}^{-1} \$, \$\\boldsymbol{A}\$ is similar to \$\\boldsymbol{B}\$. As a result, \$\\boldsymbol{A}\$ and \$\\boldsymbol{B}\$ share the same eigenvalue set.</p>
<p>Therefore, it's sufficient to show that \$\\boldsymbol{B}\$ is positive-definite. If \$\\boldsymbol{B}\$ really is, all of \$\\boldsymbol{B}\$'s eigenvalues - which are also \$\\boldsymbol{A}\$'s - would be positive. Then, according to <em>Theorem 2.</em>, \$\\boldsymbol{A}\$ is positive-definite.</p>
<p>Suppose that the entries on \$\\boldsymbol{D}\$'s diagonal are \$d_1, d_2, \\cdots, d_n\$ and \$\\boldsymbol{v}=\\begin{pmatrix}v_1 \\ v_2 \\ \\vdots \\ v_n\\end{pmatrix}\$.</p>
<p>From (1), we must have \$d_i &gt; 0\$ for \$i=\\overline{1, n}\$.</p>
<p>By induction, we can prove: \$|\\boldsymbol{B}| = xd_1d_2\\cdots d_n - \\displaystyle\\sum_{i_1 &lt; i_2 &lt; \\cdots &lt; i_{n-1}} d_{i_1}d_{i_2}\\cdots d_{i_{n-1}}v_{i_n}^2\$.</p>
<p>Therefore, \$xd_1d_2\\cdots d_n - \\displaystyle\\sum_{i_1 &lt; i_2 &lt; \\cdots &lt; i_{n-1}} d_{i_1}d_{i_2}\\cdots d_{i_{n-1}}v_{i_n}^2 &gt; 0\$.</p>
<p>Or, \$x - \\displaystyle\\sum_{i} \\frac{v_{i}^2}{d_i} &gt; 0 \\iff x &gt; \\displaystyle\\sum_{i} \\frac{v_{i}^2}{d_i} &gt; 0\$.</p>
<p>Thus, \$x\$ must be positive (2).</p>
<p>Moreover, we can infer that \$x &gt; \\displaystyle\\frac{v_{i}^2}{d_i}\$ for \$i=\\overline{1,n}\$ (3).</p>
<p>Now, we're ready to prove that \$\\boldsymbol{B}\$ is positive definite.</p>
<p>Note that the quadratic form of \$\\boldsymbol{B}\$ is \$Q(y_1, y_2, \\cdots, y_n, y_{n+1}) = \\displaystyle xy_{n+1}^2 + \\sum_{1 \\le i \\le n} d_iy_i^2 + y_{n+1}\\sum_{1 \\le i \\le n} 2v_iy_i = x(y_{n+1} + \\sum_{1 \\le i \\le n} \\frac{v_i}{x}y_i)^2 + \\sum_{1 \\le i \\le n}(d_i - \\frac{v_i^2}{x})y_i^2\$.</p>
<p>Because \$x &gt; 0\$ (from (2)) and \$d_i &gt; \\displaystyle \\frac{v_i^2}{x}\$ for \$i=\\overline{1,n}\$ (from (3)), \$Q(y_1, y_2, \\cdots, y_n, y_{n+1}) &gt; 0\$ for any real values of \$y_1, y_2, \\cdots, y_{n+1}\$ except when they are simultaneously zero.</p>
<p>According to the definition of positive-definite matrix, \$\\boldsymbol{B}\$ must be positive-definite.</p>
<p>It follows that \$\\boldsymbol{A}\$ must be positive-definite. We're now done with the induction step and can safely conclude that (i) is true for any size of \$\\boldsymbol{A}\$.</p>
<ul>
<li>Sylvester's criterion
 is necessary for a symmetric matrix \$\\boldsymbol{A}\$ to be positive-definite (ii).</li>
</ul>
<p>Prove by induction on the size of \$\\boldsymbol{A}\$.</p>
<p>Base step. It's trivial to prove the case where \$\\boldsymbol{A} \\in M_1\$.</p>
<p>Induction step. Assume that (1) is already true for the case where \$\\boldsymbol{A} \\in M_n\$.</p>
<p>Now that \$\\boldsymbol{A} \\in M_{n+1}\$ and we have \$\\boldsymbol{A}\$ is positive-definite.</p>
<p>The quadratic form of \$\\boldsymbol{A}\$ is \$Q(x_1, x_2, \\cdots, x_{n+1}) = \\displaystyle x_{n+1}\\sum_{1 \\le i \\le n + 1} a_{i(n+1)}x_i +(\\sum_{1 \\le i \\le j \\le n}a_{ij}x_ix_j)\$.</p>
<p>We can fix \$x_{n+1} = 0\$, then \$Q'(x_1, x_2, \\cdots, x_n) = \\sum_{1 \\le i \\le j \\le n}a_{ij}x_ix_j\$.</p>
<p>Because \$\\boldsymbol{A}\$ is positive-definite, \$Q(x_1, x_2, \\cdots, x_n, 0) = Q'(x_1, x_2, \\cdots, x_n)\$ must be positive for all real values of \$x_1, x_2, \\cdots, x_n\$ except when they are simultaneously zero.</p>
<p>Suppose \$\\boldsymbol{A'} = \\Delta_n(\\boldsymbol{A})\$, the quadratic form of \$\\boldsymbol{A'}\$ is exactly \$Q'(x_1, x_2, \\cdots, x_n)\$. Consequently, \$\\boldsymbol{A'}\$ must be postive-definite.</p>
<p>Therefore, \$|\\Delta_i(\\boldsymbol{A})| = |\\Delta_i(\\boldsymbol{A}')| &gt; 0\$ for all \$i \\le n\$ (since (ii) already holds true for all symmetric matrix \$\\boldsymbol{A} \\in M_n\$).</p>
<p>All there's left to do is to prove that \$|\\Delta_{n+1}(\\boldsymbol{A})| = |\\boldsymbol{A}| &gt; 0\$.</p>
<p>This is actually simple, from <em>Theorem 1.</em>, we know that \$\\boldsymbol{A}\$ is always orthogonally diagonalizable. Therefore, there's some \$\\boldsymbol{P}\$ such that \$\\boldsymbol{A} = \\boldsymbol{P}^{-1}\\boldsymbol{D}\\boldsymbol{P} = \\boldsymbol{P}^{T}\\boldsymbol{D}\\boldsymbol{P}\$. Consequently, \$|\\boldsymbol{A}| = |\\boldsymbol{D}|\$.</p>
<p>Moreover, because \$\\boldsymbol{A}\$ is positive-definite, \$\\boldsymbol{D}\$ can be easily proved to be positive-definite (Hint: use the above result \$\\boldsymbol{A}= \\boldsymbol{P}^{T}\\boldsymbol{D}\\boldsymbol{P}\$).</p>
<p>We can conclude that \$|D| &gt; 0\$, so \$|A| &gt; 0\$. We're now done with the induction step and it follows that (ii) must be true for all size of \$\\boldsymbol{A}\$.</p>
`
</script>