## printf - A speculative implementation (part 2)

_Link to the previous post: [part 1](/posts/printf-a-speculative-implementation)_

In the previous post, I have shown a diagram describing a **pobssible** high-level mechanism of calling `printf`. I want to iterate that **this is all my speculation**. In this post, I will implement this approach.

![C++ compiler magic](/printf/high-level-imp.svg)

The full code can be found on my github here: [HuyDNA/nonvariadic-printf](https://github.com/HuyDNA/nonvariadic-printf)

### API used in this implementation

* `align` from `<memory>`

```C++
    void* align( std::size_t alignment,
                 std::size_t size,
                 void*& ptr,
                 std::size_t& space );
```

We needn't care too much about the `size` and `space` parameter here. If `size` is set to `0` and `space` references a very large number, this function will align `ptr` by the specified `alignment`.

There's one pitfall: If `ptr` is already aligned, calling this function will set `ptr` to the next aligned address.

* `fputs` from `<cstdio>`

```C++
    int fputs( const char* str, std::FILE* stream );
```

Write a null-terminated string to an output stream.

* `fwrite` from `<cstdio>`

```C++
    std::size_t fwrite( const void* buffer, std::size_t size, std::size_t count, std::FILE* stream );
```

Write up to `count` binary objects from the given array buffer to the output stream stream.

* `putchar` from `<cstdio>`

```C++
    int putchar( int ch );
```

Write a character `ch` to `stdout`.

### My implementation of `printf`

My implementation of `printf` (called `my_printf`) is as follows.

```C++
#include <cstdio>
#include <cstring>
#include <string>
#include <climits>
#include <stdexcept>
#include <memory>
#include "my_printf.h"

void _my_printf_(const char* format, void* buffer) {
    void* p_last = buffer;

    const char* format_pos = format;
    int length = 0;

    for (int i = 0; format[i] != '\0'; ++i) {
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

           if (format[i] == '\0') {
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
```

This strongly resembles the variadic version.

Notice how I have to move `p_last` back by `1` before calling `__realign`. Due to the pitfall mentioned above, this is to ensure that `p_last` points to the right address even if it's already aligned.

At first sight, the overwhelming amount of c-style casts (which perform similarly to `reinterpret_cast` in this case) may look intimidating. However, if you have wrapped your head around the example in the previous post, I think this should be digestible.

You can compile it to an object file.

```Bash
g++ -o my-printf.o -c my-printf.cpp
```

### Writing a pre-preprocessor for my-printf

This is to simulate how a compiler could transform the client code before compiling.

In this section, I write a simple python script which make use of regex to detect calls to `my-printf` and add code that handles writing parameters to buffer in the client code.

```Python
import sys
import re

printfPattern = re.compile(r"my_printf\s*\(([^,;()]*)((?:,[^,;()]*)*)\)\s*;", re.MULTILINE | re.DOTALL)
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
    if len(sys.argv) < 2:
        exit("Error: At least one source file should be applied.")

    sourceNameList = sys.argv[1:]
    for sourceName in sourceNameList:
        sourceContent = ""
        with open(sourceName, 'r') as sourceFile:
            sourceContent = sourceFile.read()
            sourceContent = printfPattern.sub(printfSubstitute, sourceContent)
        
        with open(f"{sourceName[:-4]}.output.cpp", 'w') as sourceFile:
            sourceFile.write(sourceContent)
```

I name the script `pre-preprocessor.py` and it accepts input source files as arguments. As a result, it then transforms the source files and write the intermediate outputs to files with the extension `.output.cpp`.

For example, if you have file named `main.cpp`, you can run

```Bash
    python3 pre-preprocessor.py main.cpp
```

You will notice a `main.output.cpp` file has been created -- inspect the file and you will see what the script does!

You should notice that the code injected is very similar to the example in the previous post.

After feeding the source code to the script, you can finally compile the generated code.

```Bash
    g++ -o main main.output.cpp my-printf.o
```

Additionally, in the repo I have prepared a `Makefile` for you. You can follow the steps in there to see how it plays out.

### Does the real compiler really go through all these hassle to get `printf` to run !?

You couble be now understandably wondering why `printf` get all these special treatment. Well -- actually, I think it's the variadic (`...`) functions that get the special treatment, not just `printf`. The laid-out scheme in these two posts lend itself well to any variadic functions.

That is, there's probably an internal buffer to where the parameters are written to. The macro `va_arg` is probably used to interpret the bytes of this internal buffer as some type & and move the internal `p_last` pointer.

In conclusion, implementations of variadic functions may vary, but one thing for sure is there's no magic in this like anything else in the world of computers & programming languages.

I hope that you have already come up with a scheme for handling variadic functions of your own by now!

See you in another post.