import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import HomeRoute from "./HomeRoute";
import { createServer } from "../test/server";

createServer([
  {
    path: "/api/repositories",
    res: (req) => {
      const language = req.url.searchParams.get("q").split("language:")[1];
      return {
        items: [
          { id: 1, full_name: `${language}_one` },
          { id: 2, full_name: `${language}_two` },
        ],
      };
    },
  },
]);

// const handler = [
//   rest.get("/api/repositories", (req, res, ctx) => {
//     const language = req.url.searchParams.get("q").split("language:")[1];
//     return res(
//       ctx.json({
//         items: [
//           { id: 1, full_name: `${language}_one` },
//           { id: 2, full_name: `${language}_two` },
//         ],
//       })
//     );
//   }),
// ];

// const server = setupServer(...handler);

// // 在所有測試之前執行
// beforeAll(() => {
//   server.listen();
// });

// // 在每個測試後執行
// afterEach(() => {
//   server.resetHandlers();
// });

// // 在所有測試之後執行
// afterAll(() => {
//   server.close();
// });

test("render two links for each language.", async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );
  const languages = [
    "javascript",
    "typescript",
    "java",
    "rust",
    "go",
    "python",
  ];
  for (let language of languages) {
    const link = await screen.findAllByRole("link", {
      name: new RegExp(`${language}_`),
    });
    expect(link).toHaveLength(2);
    expect(link[0]).toHaveTextContent(`${language}_one`);
    expect(link[1]).toHaveTextContent(`${language}_two`);
    expect(link[0]).toHaveAttribute("href", `/repositories/${language}_one`);
    expect(link[1]).toHaveAttribute("href", `/repositories/${language}_two`);
  }
});
