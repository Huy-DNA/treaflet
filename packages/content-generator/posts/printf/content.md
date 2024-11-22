<section>

## Introduction
Yesterday (31/03/2023), my professor asked my class a simple question: "How can `printf` accept a variable number of parameters?". Well, the first thing that came to my mind was a concept called _variadic function_ in C. But even then, how does variadic and the magical ellipsis (`...`) really work? Till that point, I had not really thought much about those three magical dots and it was pretty much a black box to me.

As far as I know, in assembly languages, passing a variable number of parameters is totally normal -- you save the parameters in memory, pass to the function a pointer and something to mark those parameters (because in assembly, there are no concept of _type_, just byte and byte). I couldn't totally resolve the problem in my head before the class ended. It haunted me all throughout the bus ride to my brother's house, to the point that my bus almost ran past my bus stop. Fortunately, I was able to break the magic and come up with a way to do this.

At the time I write this post, I still haven't looked into how variadic functions & `printf` really work in C/C++, so this is just my speculation! (Hence the name of the post)

I want to strongly emphasize that: **This is wholy my speculation, to show that's there's no magic in this, not to explain how the real `printf` works**.

</section>
<section>

## Goals

* Devise a way to pass and process a variable number of parameters to `printf`. It isn't in this post's scope to be concerned with the underlying IO operation.

* The implementation must be able to accept a variable number of parameters _at runtime_.

  What do I mean by this? 
  
  In C++, there are some powerful compile-time features such as template & parameter pack which strongly resemble variadic functions.  **However**, implementations using those features do not accept a variable number of parameters _at runtime_, they just create that illusion. It's outside of the scope of this post to fully explain this, but the take-away note is that when you compile those implementations, the compiled code can only accept a finite number of parameters!

</section>
<section>

## A short-and-sweet knowledge refresher

### Function call

What really happens behind a function call like this?

```C++
void f(int, int);
...
f(10, 20);
```

The third line could be translated to MIPS like this:

```MIPS
# may store the current $a0, $a1

li $a0, 10
li $a1, 20
jal <f_address>

# retrieve the old $a0, $a1
```

However, this isn't the only way of passing parameters. In fact, with this scheme, you can only pass a limited number of fixed-size (the size of a word) parameters.

Another way to do this is to write the parameters into a contiguous buffer in memory and pass the address of the buffer plus the number of parameters to the function, like this:

```MIPS
la $a0, <buffer_address>

li $t0, 10
sw $t0, 0($a0)

li $t0, 20
sw $t0, 4($a0)

li $a1, 2

jal <f_address>

```

That's all! But are we missing something here?

Because these two choices of parameter passing differ in the parameters passed to the function, the function itself needs to know that what scheme is used in order to interpret the parameters correctly. Thus, the parameter-interpreting code of the first `f` and the second `f` should be different. Whether to use the former or the latter is established by the coder (of MIPS) or the compiler (in high-level languages) as part of what is called the [Calling convention](https://en.wikipedia.org/wiki/Calling_convention).

So, we are done with passing parameters right? Well, no! There still remains two problems:

* In higher-level languages, there is the concept of data types. Data types can be of various words (or bytes) in size. The latter scheme only works because we treat each parameter as a word. Therefore, only the address of the buffer and the number of parameters suffice to locate all the parameters. However, functions like `printf` accept a varying number parameters of **data types**. Hence the length information alone is not sufficient.
* We know how to pass variable parameters in MIPS, but how can we do it in C/C++? The answer is the ellipsis (`...`). However, this is still too high an abstraction barrier. We'll explore further down this barrier.

</section>
<section>

## Let's get dirty!

### printf API

Here's the API for `printf` specified in [cplusplus](https://cplusplus.com/reference/cstdio/printf/):

```C++
int printf(const char* format, ...);
```

* `printf` accepts a variable number of parameters (hence the ellipsis), but must be at least 1.
* `printf` accepts a format string as the first argument.
* `printf` returns an `int` but we may not worry about it here.

### Now how do we pass the parameters!?
Well, let's first talk from C++'s perspective: How does C++ process this statement?

My initial-and-only guess is that it involves some compiler magic (maybe macro or something more than that). Precisely, some transformation happens:

![C++ compiler magic](/printf/c++-compiler.svg)

Of course, with this, some additional statements have to be prepended to write the parameters to a predefined buffer. Nevertheless, this is perfectly fine.

The only issue we have to address now is how to locate the parameters in the buffer.

As stated, because of the concept of "data type", this isn't immediately solved by passing a length parameter. The buffer passed to the function is no more than a raw array of bytes! We need information about the type of each parameter _at runtime_. Many higher-level language does comprehensively support runtime type information, with a whole lot more overhead. With C++, this is limited. So I'll let you think a little bit...

Have you come up with a plan? It turns out to be pretty simple. Just look at the first parameter -- the `format` string. It already encodes the type information for us, namely `%s`, `%d`, `%p`... Each type information comes with its size-in-byte information. These are sufficient to locate the parameters in the buffer in an almost straightforward way. However, be aware of the problem of **data alignment**.

It's funny how we don't even need to pass a length parameter, just the buffer address is enough.

### My implementation from a high-level view

Let's make the above idea a little more concrete.

![high level implementation of the above idea](/printf/high-level-imp.svg)

* The yellow box refers to the client (user) _source code_.
* The blue box refers to the compiled code (`printf` is distributed in compiled binary).

The above diagram shows what could happen behind the scene when the client code call `printf`. The compiler can inspect the client code and alter it accordingly before passing on to `printf`. 

Notice that the compiler can't do anything inside `printf` as it's already compiled. In other word, this scheme is feasible even when `printf` is compiled and the compiler can not see its source code. This contrasts with parameter pack & template where the compiler needs to (kind of) duplicate a function's source code.

If the idea still evades you even after looking at the above diagram, let's walk through an example.

Example settings: Assume that we are working with a 64-bit computer, and:

* The memory is byte addressable.
* A word is 64-bit in size.
* An `int` and `float` is 4 bytes.
* A `double` is 8 bytes.
* A `pointer` type is 8 bytes.

Now we take on the role of the compiler. When inspecting the client code, we see this:

```C++
printf("%s%d%f", "Hello World!", 86, 86.2003);
```

Using the idea we have, we translate it to this:

```C++
{
    void* __internal_buffer = malloc(_BUFFER_SIZE);

    void* p_last = __internal_buffer;

    // realign_pointer(p_last)
    *(const char **)p_last = "Hello World";
    p_last = (char**)p_last + 1;

    // realign_int(p_last)
    *(int *)p_last = 86;
    p_last = (int*)p_last + 1;

    // realign_floating(p_last)
    *(double *)p_last = (double)86.2003;
    p_last = (double*)p_last + 1;


    printf_real("%s%d%f", __internal_buffer);


    free(__internal_buffer);
}
```

A block is introduced here to avoid visible effects on the client code (namespace pollution).

The following pictures illustrate how the above program would run step-by-step (little-endian assumed):

* Buffer allocation:

```C++
void* __internal_buffer = malloc(_BUFFER_SIZE);
```

![Illustration of Buffer Allocation](/printf/buffer-allocation.svg)

* Initialize `p_last`:
```C++
void* p_last = __internal_buffer;
```
![Illustration of p_last initialization](/printf/initialize-p_last.svg)

* Write `const char*` to buffer

C++ has assured that any memory allocated using malloc is aligned such that it can be be used for any data types (See [StackOverflow](https://stackoverflow.com/questions/8752546/how-does-malloc-understand-alignment)). Therefore, the first align operation is actually redundant.

We reinterpret the `void *` `p_last` to `const char**`, which means we now see `p_last` as the address of a `const char*`. Therefore, we can do this:

```C++
*(const char**)p_last = "Hello World!";
```

We do not write the string directly but rather a pointer to it because the string can take up an arbitrary space on the buffer - the size information is not there! The pointer only occupy a fixed space and in this case it's taking 8 bytes. After this, `p_last` is moved to the right 8 bytes.

![Illustration of Write const char*](/printf/write-const-char-p.svg)

```C++
p_last = (char**)p_last + 1;
```

* Write `int` to buffer

An `int` has a size of 4 bytes as assumed. Because `p_last` is `__internal_buffer + 8` and `__internal_buffer` is divisible by `8` (due to it being aligned to any data types), `p_last` now certainly is divisible by `4` - which means it's already aligned to `int`. No realignment is required here.

Similarly, we reinterpret `p_last` as an address to an `int` and write `86` to that address:

```C++
*(int *)p_last = 86;
p_last = (int*)p_last + 1; 
```

![Illustration of Write int](/printf/write-int.svg)

* Write a floating-point to buffer.

While `float` and `double` is in different format and have different sizes, we can support both of them by casting the floating-point to a `double` before writing. We can now be reassured that the being-written value here is a `double`.

A `double` is 8-bytes, however, `p_last` now is divisible by `4` but not by `8`. We must realign `p_last` before writing.

```C++
// realign_double(p_last) does something like the following
p_last = (char*)p_last + 4;
```
![Illustration of Realign double](/printf/align-double.svg)

Then we proceed as normal:

```C++
*(double *)p_last = (double)86.2003;
p_last = (double *)p_last + 1;
```

![Illustration of Write double](/printf/write-double.svg)

Now we have written all parameters to the buffer. We can pass the buffer to `real_printf`.

```C++
real_printf("%s%d%f", __internal_buffer);
```

The compiled `printf` would use the information encoded in the format string to scan the buffer in a manner similar to as when we write the buffer.

After exitting the function, we deallocate the buffer.

```C++
free(__internal_buffer);
```

### Implementation - PoC

I want to prove in this section that the schema in the above diagram can really work.

Here's the PoC: [nonvariadic-printf](https://github.com/Huy-DNA/nonvariadic-printf)

What I did:
* Write a non-variadic `printf` function and compile it.
  There's a compiler wrapper-version of `printf` that looks variadic to users, we'll call it (`printf_var`). Users can supply `printf_var` any number of arguments.
* Build an additional preprocessor (in Python code) that processes the client source code before calling the `g++` compiler.
  What it does is basically detecting uses of `prinf_var` & replace its call by a block of code containing: the prolog, non-variadic `printf` call, the epilog.

</section>
