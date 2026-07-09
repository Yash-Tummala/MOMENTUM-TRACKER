export function deleteGoal(goals, goalId) {
  return goals.filter((goal) => goal.id !== goalId);
}
