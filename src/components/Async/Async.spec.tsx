import { render, screen, waitFor } from "@testing-library/react"
import { Async } from ".";

test("it renders correctly", async() => {
  render(<Async/>);

  expect(screen.getByText("Hello World!")).toBeInTheDocument();

  await waitFor(() => {
    return expect(screen.getByText("button")).toBeInTheDocument();
  }, { 
    timeout: 3000
  });

  await waitFor(() => {
    return expect(screen.queryByText("button")).not.toBeInTheDocument();
  }, { 
    timeout: 4000
  });
});