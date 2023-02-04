import { setupServer } from "msw/node";
import { rest } from "msw";

export function createServer(handlerConfig) {
  const handlers = handlerConfig.map((config) => {
    return rest[config.method || "get"](config.path, (req, res, ctx) => {
      return res(ctx.json(config.res(req, res, ctx)));
    });
  });
  const server = setupServer(...handlers);
  // 在所有測試之前執行
  beforeAll(() => {
    server.listen();
  });

  // 在每個測試後執行
  afterEach(() => {
    server.resetHandlers();
  });

  // 在所有測試之後執行
  afterAll(() => {
    server.close();
  });
}
