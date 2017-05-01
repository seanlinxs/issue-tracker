## Coding Guide

### React

Use brackets around react render function's return statement even though it is optional. It helps readability when rendering a more complex or nested set of elements.

`class` in HTML is `className` in JSX.

Hyphens in HTML are replaced with camel cased names: e.g, `max-length` becomes `maxLength`, `border-collapse` becoomes `borderCollapse`, etc

JSX has shorthand for specifying pixel values: you can just use a number(`6`) instead of a string(`"6px"`)

Always use property validations when passing data from one component to another. Property validation is checked only in development mode, and a warning is shown in the console when any validation fails.

Use default property values when needed.

Use `this.props.children` to access nested components. Which is alternative way to pass data from one component to another. You can pass formatted HTML contents instead of plain string in this way.

React does not call a `toString()` automatically on objects, because it expects all objects as children of components to be React components if they are not strings.

React treats the component as a simple state machine. Whenever the state changes, it triggers a rerender of the component and the view automatically changes. The way to inform React of a state change is by using the `setState()` method. This method takes in an object, and the top-level properties are ***merged*** into the existing state. Within the component, you can access the properties via the `this.state` variable. The initialization of the state is done in the constructor.