import { describe, expect, it } from "vitest";
import { deleteGoal } from "./goals";

describe("deleteGoal", () => {
  it("removes the selected goal without affecting the others", () => {
    const goals = [
      { id: "goal-1", title: "Launch product", progress: 40 },
      { id: "goal-2", title: "Read 12 books", progress: 70 },
    ];

    const result = deleteGoal(goals, "goal-1");

    expect(result).toEqual([{ id: "goal-2", title: "Read 12 books", progress: 70 }]);
  });
});
