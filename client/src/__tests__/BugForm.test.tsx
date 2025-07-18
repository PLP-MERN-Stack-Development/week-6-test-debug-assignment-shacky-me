import { render, screen, fireEvent } from "@testing-library/react";
import BugForm from "../components/BugForm";

test("renders form and submits with title", () => {
  const onSubmit = jest.fn();
  render(<BugForm onSubmit={onSubmit} />);

  const input = screen.getByPlaceholderText(/bug title/i);
  const button = screen.getByRole("button", { name: /report bug/i });

  fireEvent.change(input, { target: { value: "Test Bug" } });
  fireEvent.click(button);

  expect(onSubmit).toHaveBeenCalledWith(
    expect.objectContaining({ title: "Test Bug" })
  );
});
