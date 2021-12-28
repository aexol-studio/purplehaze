export const HtmlSkeletonStatic = ({
  body,
  cssName,
  scriptName,
  data,
  head = '',
  hydrate,
}: {
  body: string;
  data?: any;
  cssName?: string;
  scriptName: string;
  head?: string;
  hydrate?: boolean;
}) => `<!DOCTYPE html><html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${
        cssName
          ? `<link rel="stylesheet" type="text/css" media="screen" href="./${cssName}"/>`
          : ''
      }
      ${`<script type="module" src="./${scriptName}"></script>`}${
  data
    ? `<script type="module">
        import { hydrate } from "./${scriptName}";
        hydrate(${JSON.stringify(data)})
      </script>`
    : ''
}${head ? `\n${head}` : ''}
    </head>
    <body>
      ${body}
    </body>
  </html>`;
