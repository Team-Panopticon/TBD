import { rest, setupWorker } from 'msw';

// 2. Describe network behavior with request handlers.
const worker = setupWorker(
  rest.get('http://127.0.0.1:5001/to-be-determined-8620e/us-central1/v1/', (req, res, ctx) => {
    return res(
      ctx.status(202, 'Mocked status'),
      ctx.json({
        message: 'Mocked response JSON body',
      }),
    );
  }),
);

worker.start();
