# Blogging In Hell - My blog app

First try at building a decent blog app (which means previous attempts were indecent LOL)

## Lessons learned from weird bugs encountered

* I shouldn't have tried to write the `ssg` module functionally.
* `String.prototype.replace(searchPattern, replacementText)` 
    * The second argument assumes that some character sequences have special meaning and this have wrecked havoc for 1 hour straight. All I wanted to do was simply replacing the substring that matches the `searchPattern` with `replacementText`. However, it produces some weird result I couldn't understand. As I found out later, some sequences in my `replacementText` have been transformed, leading to the weird result.
    * As a fix, I simply pass a callback that returns the string I intended to replace the pattern.

## To do list