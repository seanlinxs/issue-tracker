# Coding Guide

Use brackets around react render function's return statement even though it is optional. It helps readability when rendering a more complex or nested set of elements.

`class` in HTML is `className` in JSX.

Hyphens in HTML are replaced with camel cased names: e.g, `max-length` becomes `maxLength`, `border-collapse` becoomes `borderCollapse`, etc

JSX has shorthand for specifying pixel values: you can just use a number(`6`) instead of a string(`"6px"`)