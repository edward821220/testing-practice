import { screen, render } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { MemoryRouter } from "react-router";
import HomeRoute from "./HomeRoute";

const handler = [
  rest.get("/api/repositories", (req, res, ctx) => {
    const query = req.url.searchParams.get("q");
    console.log(query);
    return res(
      ctx.json({
        items: [
          { id: 1, full_name: "full name!" },
          { id: 2, full_name: "full name 2!" },
        ],
      })
    );
  }),
];

const server = setupServer(...handler);

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
