## Coding Guide

### React

Use brackets around react render function's return statement even though it is optional. It helps readability when rendering a more complex or nested set of elements.

`class` in HTML is `className` in JSX.

Hyphens in HTML are replaced with camel cased names: e.g, `max-length` becomes `maxLength`, `border-collapse` becoomes `borderCollapse`, etc

JSX has shorthand for specifying pixel values: you can just use a number(`6`) instead of a string(`"6px"`)

Always use property validations when passing data from one component to another. Property validation is checked only in development mode, and a warning is shown in the console when any validation fails.

Use default property values when needed.

Use `this.props.children` to access nested components.