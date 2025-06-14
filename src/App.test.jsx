// App.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import axios from "axios";

jest.mock("axios");

// Mock ResizeObserver
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

test("calculates and displays NPV results", async () => {
  axios.post.mockResolvedValueOnce({
    data: [
      { rate: 1.0, npv: 280.0 },
      { rate: 1.25, npv: 270.0 }
    ]
  });

  render(<App />);

  fireEvent.change(screen.getByLabelText(/Cash Flows/i), {
    target: { value: "100" },
  });

  fireEvent.click(screen.getByText("Add Cash Flow"));
  fireEvent.click(screen.getByText("Calculate"));

  await waitFor(() => {
    expect(screen.getByText("1.00")).toBeInTheDocument();
    expect(screen.getByText("280.00")).toBeInTheDocument();
  });
});
