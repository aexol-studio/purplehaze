const ws = new WebSocket('ws://127.0.0.1:{{WEBSOCKET_PORT}}');

const renderReactSSG = async (component) => {
  const ReactDOM = await import('https://cdn.skypack.dev/react-dom');
  const renderBody = document.createElement('div');
  ReactDOM.render(component, renderBody);
  return renderBody.innerHTML;
};

const validateRenderedOutput = async (output) => {
  if (typeof output === 'object') {
    const React = await import('https://cdn.skypack.dev/react');
    const ReactDOM = await import('https://cdn.skypack.dev/react-dom');
    const bodyIsReact = React.isValidElement(output);
    if (!bodyIsReact) {
      throw new Error('Returned SSG is an unknown object');
    }
    return {
      output: await renderReactSSG(output),
      hydrate: true,
    };
  }
  return { output };
};

const composeRenderResult = async (result) => {
  const [bodyOutput, headOutput] = await Promise.all([
    validateRenderedOutput(result.body || ''),
    validateRenderedOutput(result.head || ''),
  ]);
  return {
    ...result,
    body: bodyOutput.output,
    hydrate: bodyOutput.hydrate,
    head: headOutput.output,
  };
};

const renderEvent = async (operationId, result) => {
  return {
    type: 'rendered',
    result: await composeRenderResult(result),
    operationId,
  };
};

ws.onmessage = async (ev) => {
  const { code, type, operationId, name } = JSON.parse(ev.data);
  if (type === 'initial' && operationId) {
    try {
      const c = await import(`./${code}`);
      if (c.default || c.pages) {
        const data = c.data && (await c.data());
        let pages = c.pages ? await c.pages(data) : '';
        if (pages && Array.isArray(pages) && pages.length > 0) {
          pages = await Promise.all(
            pages.map(async (p) => {
              if (!p.body && !c.default) {
                throw new Error(
                  'Dynamic page generation needs either `body` assigned to each page object or export default function consuming page data.',
                );
              }
              let b = p.body;
              if (!b) {
                return composeRenderResult({
                  ...p,
                  body: await c.default(p.data),
                });
              }
              return composeRenderResult({
                ...p,
                body: b,
              });
            }),
          );
          ws.send(
            JSON.stringify({
              type: 'rendered',
              result: {
                body: '',
                data,
                head: '',
                pages,
              },
              operationId,
            }),
          );
          return;
        }
        let body = c.default ? await c.default(data) : '';
        let head = c.head ? await c.head() : '';
        ws.send(
          JSON.stringify(
            await renderEvent(operationId, {
              body,
              data,
              pages: '',
              head,
            }),
          ),
        );
      } else {
        ws.send(
          JSON.stringify({
            type: 'module',
            result: {
              body: '',
              head: '',
            },
            operationId,
          }),
        );
      }
    } catch (e) {
      ws.send(
        JSON.stringify({
          type: 'error',
          error: JSON.stringify(e, Object.getOwnPropertyNames(e)),
          operationId,
        }),
      );
    }
  }
};
