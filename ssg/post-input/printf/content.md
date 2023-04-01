
## Introduction
Yesterday (31/03/2023), my professor asked my class a simple question: "How can `printf` accept a variable number of parameters?". Well, the first thing that came to my mind was a concept called _variadic function_ in C. But even then, how does variadic and the magical ellipsis (`...`) really work??? Till that point, I had not really thought much about those three magical dots and it was pretty much a black box to me.

As far as I know, in assembly languages, passing a variable number of parameters is totally normal -- you save the parameters in memory, pass a pointer and something to mark those parameters (because in assembly, there are no concept of _type_, just byte and byte) to the function, that's all. I couldn't totally resolve the problem in my head before the class ended and it haunted me all throughout the bus ride to my brother's house (to the point that my bus almost ran past my bus stop). Luckily, I was able to break the magic & come up with a way to do this.

This maybe the first post in the series about `printf` or variadic functions? -- I have not really decided yet! At the time I write this post, I still haven't looked into how variadic functions & `printf` really work in C/C++, so this is just my speculation! (Hence the name of the post)

It's often (or sadly, used to be) my habit to guess how something works before looking them up.

## Languages in this post
I use C to write both a variadic and a non-variadic version. MIPS is also used to better illustrate the underlying working here.

## Goals

* Devise a way to pass and process a variable number of parameters to `printf`. It isn't in this post's scope to be concerned with the underlying IO operation, so I'll just be using the `write` system call API. I could have used `printf`, but that is hypothetical!

* The implementation must be able to accept a variable number of parameters _at runtime_.

  What do I mean by this? In C++, there are some powerful compile-time features such as template & parameter pack which strongly resemble variadic functions.  **However**, implementations using those features do not accept a variable number of parameters _at runtime_, they just create that illusion. It's outside of the scope of this post to fully explain this, but the take-away note is that when you compile those implementations, the compiled code can only accept a finite number of parameters!

## A short-and-sweet knowledge refresher

### MIPS assembly
Kindly note that MIPS is in the big-endian camp.

We'll make heavy use of these following three MIPS basic (or basic type of) instructions:

* Load instructions:
```MIPS
lw rt, im(rs)   # rt is assigned the word starting from rs + im
lh rt, im(rs)   # rt is assigned the half word starting from rs + im
lb rt, im(rs)   # rt is assigned the byte at rs + im
```

* Store instructions:
```MIPS
sw rt, im(rs)   # rt is stored as a word at the address starting from rs + im
sh rt, im(rs)   # rt is stored as a half word (the lower half) at the address starting from rs + im
sb rt, im(rs)   # rt's lowest byte is stored at rs + im
```

* Jump and link instruction: `jal address`

Jump to an address whose the highest 4 bits are taken from the `PC` and the lowest 28 bits are the `address` value shifted left by 2 bit (this is also known as pseudo-indirect addressing).

One thing to note about load & store instructions is that `im + rs` must be aligned, i.e, a word address must start at an address that is divisible by the word size and a byte's address can be anywhere. Another final note is that these load & store instructions each have an unsigned equivalence.

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

Well, because these two choices of parameter passing differ in the parameters passed to the function, the function itself needs to know that what scheme is used in order to interpret the parameters correctly. Thus, the parameter-receiving code of the first `f` and the second `f` should be different. Whether to use the former or the latter is established by the coder (of MIPS) or the compiler (in high-level languages) as part of what is called the [Calling convention](https://en.wikipedia.org/wiki/Calling_convention).

So, we are done with passing parameters right? Well, no! There still remains two problems:

* In higher-level languages, there are concepts of data types. Data types can be of various words (or bytes) in size. The latter scheme shown above only works because we treat each parameter as a word, therefore, only the address of the buffer and the number of parameters suffice to locate all the parameters. However, functions like `printf` accept variable parameters of **variable types**, those information alone is not sufficient.
* We know how to pass variable parameters in MIPS, but how can we do it in C/C++? The answer is the ellipsis `...`, but I want to get deeper than this.

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
Well, let's first talk from C's perspective: How does C process this statement?

My initial-and-only guess is that it involves some compiler magic (maybe macro or something more than that). Precisely, some transformation happens:

![C compiler magic](/printf/c-compiler.svg)

Of course, with this, some additional statements have to be prepended to write the parameters to a predefined buffer. Nevertheless, this is perfectly fine.

The only issue we have to address now is how to locate the parameters in the buffer.

As stated, because of the concept of "data type", this isn't immediately solved by passing a length parameter. The buffer passed to the function is no more than a raw array of bytes! We need information about the type of each parameter _at runtime_.

How can!? Many higher-level language does comprehensively support runtime type information (with more overhead than C obviously). With C++, this is limited. With C (which I don't know much of), as far as I know, doesn't natively support runtime type information. So I'll let you think a little bit.

...

...

Have you come up with a plan? It turns out to be pretty simple. Just look at the first parameter -- the `format` string. It already encodes type information for us, namely `%s`, `%d`, `%p`... Each type information comes with its size-in-byte information. These are sufficient to locate the parameters in the buffer in an almost straightforward way (just don't forget about **data alignment** though).

It's funny how we don't even need to pass a length parameter, just the buffer address is enough!

### Let's implement -- From a high-level view


### It's real code now \*\*_elipsis_\*\*