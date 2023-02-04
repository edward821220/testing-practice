import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RepositoriesListItem from "./RepositoriesListItem";

// jest.mock("../tree/FileIcon", () => {
//   return () => {
//     return "FileIcon Component";
//   };
// });

const renderComponents = () => {
  const repository = {
    full_name: "facebook/react",
    language: "JavaScript",
    description: "A js library",
    owner: { login: "facebook" },
    name: "react",
    html_url: "https://github.com/facebook/react",
  };
  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );
  return { repository };
};

// const pause = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, 100);
//   });
// };

test("shows a file icon with appropriate icon", async () => {
  renderComponents();
  const icon = await screen.findByRole("img", { name: "JavaScript" });

  expect(icon).toHaveClass("js-icon");
});

test("shows a link to the code editor page", async () => {
  const { repository } = renderComponents();
  await screen.findByRole("img", { name: "JavaScript" });
  const link = await screen.findByRole("link", {
    name: new RegExp(repository.owner.login),
  });

  expect(link).toHaveAttribute("href", `/repositories/${repository.full_name}`);
});
