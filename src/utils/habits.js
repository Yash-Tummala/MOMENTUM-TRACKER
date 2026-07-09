export function deleteHabit(habits, habitId) {
  return habits.filter((habit) => habit.id !== habitId);
}
