## Coding Guide

### React

Use brackets around react render function's return statement even though it is optional. It helps readability when rendering a more complex or nested set of elements.

`class` in HTML is `className` in JSX.

Hyphens in HTML are replaced with camel cased names: e.g., `max-length` becomes `maxLength`, `border-collapse` becoomes `borderCollapse`, etc

JSX has shorthand for specifying pixel values: you can just use a number(`6`) instead of a string(`"6px"`)

Always use property validations when passing data from one component to another. Property validation is checked only in development mode, and a warning is shown in the console when any validation fails.

Use default property values when needed.

Use `this.props.children` to access nested components. Which is alternative way to pass data from one component to another. You can pass formatted HTML contents instead of plain string in this way.

React does not call a `toString()` automatically on objects, because it expects all objects as children of components to be React components if they are not strings.

React treats the component as a simple state machine. Whenever the state changes, it triggers a rerender of the component and the view automatically changes. The way to inform React of a state change is by using the `setState()` method. This method takes in an object, and the top-level properties are ***merged*** into the existing state. Within the component, you can access the properties via the `this.state` variable. The initialization of the state is done in the constructor.

Split the application into components and subcomponents. Decide on the granularity just as you would for splitting functions and objects. The component should be self-contained with minimal and logical interfaces to the parent. If it is doing too many things, just like for functions, it should probably be split into multiple components, so that it follows the Single Responsibility principle (that is, every component should be responsible for one and only one thing). If you are passing in too many `props` to a component, it is an indication that either the component needs to be split, or it need not exist; the parent itself could do the job.

### Express

Multiple routes can be set up to match different URLs and patterns. The router does not try to find a best match; instead, it tries to match all routes in the order in which they are installed. The ***first*** match is used.

`req.query`: This holds a parsed query string. It's an object with keys as the query string parameters and values as the query string values. Multiple keys with the same name are converted to arrays, and keys with a square bracket notation result in nested objects (e.g., `order[status]=closed` can be accessed as `req.query.order.status`).

`req.body`: This contains the body of the request, valid for `POST`, `PUT`, and `PATCH` requests. Note that the body is not available (`req.body` will be undefined) unless a middleware is installed to read and optionally interpret or parse the body.