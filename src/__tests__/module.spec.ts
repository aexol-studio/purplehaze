import { sendAndReceiveCode } from '@/transform/module';
import { mock } from '@/__tests__/__mocks__';
import WebSocket from 'ws';
describe('module.ts tests', () => {
  it('Sends and receive bundle info from websocket', async (done) => {
    const ws = new WebSocket.Server({ port: mock.config.websocketPort });
    ws.on('connection', (w) => {
      w.on('message', (message) => {
        const m = JSON.parse(message.toString());
        if (m.type === 'initial' && m.operationId) {
          w.send(
            JSON.stringify({
              type: 'rendered',
              operationId: m.operationId,
              result: {
                body: 'Hello',
                script: 'world',
              },
            }),
          );
        }
      });
      w.on('close', () => done());
    });

    const dryadResult = await sendAndReceiveCode('code', mock.config);
    expect(dryadResult).toBeTruthy();
    ws.close();
  });
});
