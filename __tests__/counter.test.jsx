//__tests__/counter.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // for matchers like "toBeInTheDocument"
import CounterComponent from "../components/counter/CounterComponent"; // Adjust path based on your folder structure

describe("CounterComponent", () => {
  // Kas renderdab CounterComponent'i
  it("renders the counter component", () => {
    render(<CounterComponent />);

    const heading = screen.getByText(/counter component/i);
    expect(heading).toBeInTheDocument();
  });

  // Kas nupp lisab 1
  it("increments count when button is clicked", () => {
    render(<CounterComponent />);

    const incrementButton = screen.getByTestId("increment-button");
    const countDisplay = screen.getByTestId("count-display");

    // Kas algul on 0
    expect(countDisplay).toHaveTextContent("Count: 0");

    // *Click*
    fireEvent.click(incrementButton);

    // Kas pärast click'i on 1
    expect(countDisplay).toHaveTextContent("Count: 1");
  });
});