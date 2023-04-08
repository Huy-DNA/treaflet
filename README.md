# Blogging In Hell - My blog app

First try at building a decent blog app (which means previous attempts were indecent LOL).

Deployed at: https://blogginginhell.netlify.app/

## Lessons learned from weird bugs encountered

* I shouldn't have tried to write the `ssg` module functionally.
* `String.prototype.replace(searchPattern, replacementText)` 

    * The second argument assumes that some character sequences have special meaning and this have wrecked havoc for 1 hour straight. All I wanted to do was simply replacing the substring that matches the `searchPattern` with `replacementText`. However, it produces some weird result I couldn't understand. As I found out later, some sequences in my `replacementText` have been transformed, leading to the weird result.
    * As a fix, I simply pass a callback that returns the string I intended to replace the pattern.
* Always use `style scoped` to prevent "style leak". If you want to pass a style to child components, use `:deep(<inner-selector>)`.
* Never use the css property `line-height < 0`.
* Always specify the format of date string for parsing. **(Costs me a day)**
* Use npmjs to search for a library before installing. **(Costs me an hour)**
* Never forget to pass `key` when using v-for.
* Avoid using top-level scripts as much as possible.
## To do list

* ~~The blog sort by date function currently doesn't work correctly on FireFox, causing hydration mismatch and the index page isn't working correctly -- while Chrome works fine.~~ The datetime parsing was causing problems - Because luxon expects the date string to be in another format, it returns `NaN` and unexpected behaviors ensue! It takes me one day OMG!
