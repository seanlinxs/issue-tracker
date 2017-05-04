export default function template(body, initialState) {
  return `<!DOCTYPE HTML>
<html>

  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Issue Tracker</title>
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css" />
    <style>
      .panel-title a {
        display: block;
        width: 100%;
        cursor: pointer;
      }
    </style>
  </head>

  <body>
    <div id="contents">${body}</div>
    <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>
    <script src="/vendor.bundle.js"></script>
    <script src="/app.bundle.js"></script>
  </body>

</html>
`;
}
