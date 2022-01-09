export const browserHtml = (scriptModule: string) => `
<html>
  <head>
    <script type="module">${scriptModule}</script>
  </head>
  <body></body>
</html>

`;
