// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AppProvider } from "../../context/AppProvider";
import Dashboard from "./Dashboard";

function renderDashboard(initialPath = "/dashboard") {
  return render(
    <AppProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/focus" element={<div>Focus Page</div>} />
          <Route path="/goals" element={<div>Goals Page</div>} />
        </Routes>
      </MemoryRouter>
    </AppProvider>
  );
}

describe("Dashboard actions", () => {
  it("navigates to the focus page when the CTA is clicked", async () => {
    const user = userEvent.setup();
    renderDashboard();

    await user.click(screen.getByRole("button", { name: /start focus session/i }));

    expect(screen.getByText("Focus Page")).toBeTruthy();
  });

  it("navigates to the goals page when the CTA is clicked", async () => {
    const user = userEvent.setup();
    renderDashboard();

    await user.click(screen.getByRole("button", { name: /review goals/i }));

    expect(screen.getByText("Goals Page")).toBeTruthy();
  });
});
