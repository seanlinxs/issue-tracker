## JS Notes

`var` and `let`

`ReferenceError`, `undefined` and `null`

`falsy` and `truthy`

`for in` and `for of`

`switch`

Never skip the `catch` block when using promises. If you do so, any runtime error within any of the blocks will not be caught and will be silently ignored. If you don't have a catch block, you may fail to "catch" errors in your code, even those such as a typo in one of the variable names.

`import`

`path.resolve`

`eslint`

`for..in` loops iterate over the entire prototype chain, which is virtually never what you want. Use `Object.{keys,values,entries}`, and iterate over the resulting array.