
## Introduction
Yesterday (31/03/2023), my professor asked my class a simple question: "How can `printf` accept a variable number of parameters?". Well, the first thing that came to my mind was a concept called _variadic function_ in C. But even then, how does variadic and the magical ellipsis (`...`) really work? Till that point, I had not really thought much about those three magical dots and it was pretty much a black box to me.

As far as I know, in assembly languages, passing a variable number of parameters is totally normal -- you save the parameters in memory, pass to the function a pointer and something to mark those parameters (because in assembly, there are no concept of _type_, just byte and byte). I couldn't totally resolve the problem in my head before the class ended. It haunted me all throughout the bus ride to my brother's house, to the point that my bus almost ran past my bus stop. Fortunately, I was able to break the magic and come up with a way to do this.

At the time I write this post, I still haven't looked into how variadic functions & `printf` really work in C/C++, so this is just my speculation! (Hence the name of the post)

I want to strongly emphasize that: **This is wholy my speculation, to show that's there's no magic in this, not to explain how the real `printf` works**.

## Goals

* Devise a way to pass and process a variable number of parameters to `printf`. It isn't in this post's scope to be concerned with the underlying IO operation.

* The implementation must be able to accept a variable number of parameters _at runtime_.

  What do I mean by this? 
  
  In C++, there are some powerful compile-time features such as template & parameter pack which strongly resemble variadic functions.  **However**, implementations using those features do not accept a variable number of parameters _at runtime_, they just create that illusion. It's outside of the scope of this post to fully explain this, but the take-away note is that when you compile those implementations, the compiled code can only accept a finite number of parameters!

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
* We know how to pass variable parameters in MIPS, but how can we do it in C/C++? The answer is the ellipsis `...`. However, this is still too high an abstraction barrier. We'll explore further down this barrier.

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

![C compiler magic](/printf/c++-compiler.svg)

Of course, with this, some additional statements have to be prepended to write the parameters to a predefined buffer. Nevertheless, this is perfectly fine.

The only issue we have to address now is how to locate the parameters in the buffer.

As stated, because of the concept of "data type", this isn't immediately solved by passing a length parameter. The buffer passed to the function is no more than a raw array of bytes! We need information about the type of each parameter _at runtime_.

How can!? Many higher-level language does comprehensively support runtime type information (with more overhead than C obviously). With C++, this is limited. With C (which I don't know much of), as far as I know, doesn't natively support runtime type information. So I'll let you think a little bit.

...

...

Have you come up with a plan? It turns out to be pretty simple. Just look at the first parameter -- the `format` string. It already encodes type information for us, namely `%s`, `%d`, `%p`... Each type information comes with its size-in-byte information. These are sufficient to locate the parameters in the buffer in an almost straightforward way (just don't forget about **data alignment** though).

It's funny how we don't even need to pass a length parameter, just the buffer address is enough!

### My implementation from a high-level view

Let's make the above idea a little more concrete.

![high level implementation of the above idea](/printf/high-level-imp.svg)

* The yellow box refers to the client (user) _source code_.
* The blue box refers to the compiled code (`printf` is distributed in compiled binary).

The above diagram shows what could happen behind the scene when the client code call `printf`. The compiler can inspect the client code and alter it accordingly before passing on to `printf`. 

Notice that the compiler can't do anything inside `printf` as it's already compiled. In other word, this scheme is feasible even when `printf` is compiled and the compiler can not see its source code. This contrasts with parameter pack & template where the compiler needs to (kind of) duplicate a function's source code.

### It's real code now \*\*_elipsis_\*\*

For simplicity, I only support 4 format specifiers, that is:

* `%d`: an `int` goes into this.
* `%s`: a `const char*` goes into this.
* `%f`: a `double` goes into this (`float` is automatically promoted to `double` when passed through variadic). In non-variadic version, we have to handle this ourselves.
* `%p`: a `const void*` pointer goes into this. The pointer is printed out in decimal.

#### The highly abstract variadic version

The variadic-version of C++ code is as follows. Notice that there is some abstraction here -- the `va_list`, `v_start`, `va_arg` and `va_end` macros (however, safely implementing this is still a tedious task).

```C++
#include <cstdlib>
#include <string>
#include <cstdarg>
#include <cstring>
#include <cstdio>

void variadic_printf(const char* format, ...) {
   va_list args;
   va_start(args, format);

   const char* format_pos = format;
   int length = 0;
   for (int i = 0; format[i] != '\0'; ++i) {
       if (format[i] != '%')
           length += 1;
       else {
           fwrite((const void*) format_pos, length, sizeof(char), stdout);
           format_pos += length + 2;
           length = 0;

           ++i;
           if (format[i] == '\0') {
               fputs("Warning: trailing spurious trailing %", stderr);
               putchar('%');
               break;
           }
           else if (format[i] == 'd') {
               int num = va_arg(args, int);
               fputs(std::to_string(num).c_str(), stdout);
           }
           else if (format[i] == 'f') {
               double num = va_arg(args, double);
               fputs(std::to_string(num).c_str(), stdout); 
           }
           else if (format[i] == 's') {
               const char* s = va_arg(args, char*);
               fputs(s, stdout); 
           }
           else if (format[i] == 'p') {
               long long p = (long long)va_arg(args, void*);
               fputs(std::to_string(p).c_str(), stdout);
           }
           else {
               fputs("Warning: Unknown format specifier, ignore", stderr);
           }
       }
   }

   fwrite(format_pos, length, sizeof(char), stdout);

   va_end(args);
}
```

#### The non-variadic version

I want to prove in this section that the schema in the above diagram can really work. Therefore, I want to:
* Build an additional preprocessor that process the client source code before calling the gnu compiler.
* Write a non-variadic `printf` function and compiled it.
* Write some example client code calling my `printf` implementation, hand it to my preprocessor before compiling. It should work and look identical to the real `printf` from the client code's point of view.

As the post is already long now, I'll leave this to another post.

Farewell!