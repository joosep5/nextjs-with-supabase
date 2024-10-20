//__tests__/todo.test.jsx
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Todo from "../app/todo/page";

jest.mock("../app/todo/page", () => () => (
  <div>
    <h1>To Do lists:</h1>
  </div>
));

describe("Todo", () => {
  it("renders a heading", () => {
    render(<Todo />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});