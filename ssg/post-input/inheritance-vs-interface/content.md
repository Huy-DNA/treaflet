# Writing for a Friend's Inquiry About Traits in Rust
Originally a Facebook post [here](https://www.facebook.com/photo/?fbid=1419295315340360&set=a.1076876269582268&notif_id=1707374922510581&notif_t=feedback_reaction_generic&ref=notif)

Recently, a friend of mine (It's you, [Nguyễn Hồng Quân](https://www.facebook.com/quannhg) 🫵) asked a question like this: "I don't understand why Rust calls its interfaces 'traits'?"

With my limited knowledge and perhaps not complete accuracy, let me attempt to answer!

## Distinguishing Inheritance and Interfaces

Many of us have worked with languages like C++, Java, and JavaScript, and we've likely encountered inheritance, right?

Take 5 minutes to think about the relationship between inheritance and interfaces:

5️⃣ 4️⃣ 3️⃣ 2️⃣ 1️⃣

In traditional object-oriented programming languages, such as C++ and Java, there seems to be a tight connection between inheritance and interfaces through constructs like this in C++:

```C++
class A : public B {
}
```

Here, class `A` both inherits from `B` (for code reuse) and can replace `B` in situations where an object of type B is desired because `A` can do what `B` does (subtyping/interface). In Java, these two mechanisms are somewhat separated (with a dedicated interface definition), but fundamentally, it remains the same.

This might lead us to believe that inheritance and interfaces are closely tied as a common operational mechanism.

However, that's not entirely true! On page 295 [1], there's a note about the difference between inheritance and subtyping:

* "The concept of subtype has to do with the possibility of using an object in another context. It is a relation between the interfaces of two classes."
* "The concept of inheritance has to do with the possibility of reusing the code that manipulates an object. It is a relation between the implementations of two classes."

In reality, the purpose of inheritance is primarily code reuse. However, in traditional OOP languages like C++, Java, and Python, during code reuse, they allow subtyping as well!

So, here, let's consider an interface as a collection of abilities for an object. Type `A` is a subtype of type `B` if `A`'s interface contains `B`'s interface.

## Trait

Returning to the question: "Why is an interface in Rust called a 'trait'?"

More precisely, a trait is a mechanism for implementing an interface. By implementing a trait for a type, an object of that type gains the abilities defined by that trait and can be used in specific contexts.

In C++ and Java, a class can also be seen as a mechanism for implementing an interface.

In reference [3], there's a passage that goes like this:

"[…] we increasingly see the rise of 'class-less' interface abstractions cropping up across many languages: protocols (Swift), traits (Rust), interfaces (Go), concepts (C++), and contracts (Go)."

## Trait Implementation

This section is the most interesting part, and I've been curious about how traits are actually implemented in Rust. How does it differ from using vtables in languages like C++ and (possibly) Java?

One notable distinction between traits in Rust and interfaces in C++ or Java is as follows:

In C++ and Java, when declaring a class, we must specify whether it extends another class or implements an interface. This decision is fixed and cannot be changed by subsequent code.
In Rust, you can independently declare a trait and implement it for any struct, including those from external libraries. Essentially, a struct can magically acquire multiple traits (or extend interfaces).
So, how are traits actually implemented? Using vtables directly is not the answer. Vtables in objects assume that the set of methods for that object will never change.

While pondering this, I've come up with a possible implementation approach.

Let's consider the following Rust snippet:

```rust

use std::fmt::Display;

fn print_ln(t: &dyn Display) {
    println!("{}", t);
}

fn main() {
    let i = 10;
    let di = &i as &dyn Display;
    print_ln(di);
}
```

Now, what is the essence of `&dyn Display`? Semantically, it's a reference to an object that implements the Display trait. So, what lies beneath?

I believe it's an object containing two pointers:

* A pointer to the original object (data pointer).
* A pointer to the trait implementation of that type (method table pointer).

When declaring `di`, the compiler adds code to transform `&i` into the object structure I described above.

In the `print_ln` function, when calling `println!`, the second pointer of `t` is used to find the appropriate method and then that method is passed the first pointer of `t`.

In summary, it's somewhat like this, and upon searching, I found a diagram in [4] that closely resembles my mental model.

## References:

[1]: Maurizio Gabbrielli, Simone Martini - Programming Languages:
Principles and Paradigms Second Edition - Springer

[2]: Benjamin C. Pierce - Types and Programming Languages-The MIT Press (2002)

[3]: [JonGoodwind's blog](https://pling.jondgoodwin.com/post/disinheriting-abstract-classes/?fbclid=IwAR1Wy14x-fZdBm4M7wjJXhWaYfJTTYKEIryashixihRiPkOD3iEs3xqMRog)

[4]: [Oswalt's blog](https://oswalt.dev/2021/06/polymorphism-in-rust/)