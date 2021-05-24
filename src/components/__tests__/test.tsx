import { render, screen } from "@testing-library/react";
import { TestText } from "../test";

test("text component should be valid", () => {
  render(<TestText />);
  expect(screen.getByText("Test Component is me!")).toBeInTheDocument();
});
