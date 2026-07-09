import { eachDayOfInterval, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subDays } from "date-fns";

export function getDayKey(date) {
  return format(date, "yyyy-MM-dd");
}

function getHabitCompletionCount(habits, dateKey) {
  return habits.filter((habit) => habit.completedDates.includes(dateKey)).length;
}

export function getAnalytics(habits, goals, focusSessions, achievements) {
  const today = new Date();
  const todayKey = getDayKey(today);
  const completedToday = habits.filter((habit) => habit.completedDates.includes(todayKey)).length;
  const completionRate = habits.length ? Math.round((completedToday / habits.length) * 100) : 0;

  const streakStart = subDays(today, 60);
  let currentStreak = 0;
  let cursor = today;

  while (true) {
    const cursorKey = getDayKey(cursor);
    const dayCount = getHabitCompletionCount(habits, cursorKey);

    if (dayCount === 0) {
      break;
    }

    currentStreak += 1;
    cursor = subDays(cursor, 1);

    if (cursor < streakStart) {
      break;
    }
  }

  const weekStart = startOfWeek(today);
  const weekEnd = endOfWeek(today);
  const thisWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const weeklyTrend = thisWeek.map((date) => {
    const dateKey = getDayKey(date);
    const total = habits.length;
    const completed = getHabitCompletionCount(habits, dateKey);
    return {
      day: format(date, "EEE"),
      completion: total ? Math.round((completed / total) * 100) : 0,
    };
  });

  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const thisMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const monthlyTrend = thisMonth.map((date) => {
    const dateKey = getDayKey(date);
    const completed = getHabitCompletionCount(habits, dateKey);
    return {
      day: format(date, "d"),
      completion: habits.length ? Math.round((completed / habits.length) * 100) : 0,
    };
  });

  const categoryPerformance = habits.reduce((acc, habit) => {
    const existing = acc.find((item) => item.category === habit.category);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ category: habit.category, count: 1 });
    }
    return acc;
  }, []);

  const completedGoals = goals.filter((goal) => goal.progress >= 100).length;
  const totalFocusMinutes = focusSessions.reduce((sum, session) => sum + session.duration, 0);
  const averageCompletion = habits.length
    ? Math.round(habits.reduce((sum, habit) => sum + (habit.completedDates.length > 0 ? 100 : 0), 0) / habits.length)
    : 0;
  const weeklyCompletion = weeklyTrend.reduce((sum, item) => sum + item.completion, 0) / weeklyTrend.length;
  const monthlyCompletion = monthlyTrend.reduce((sum, item) => sum + item.completion, 0) / monthlyTrend.length;
  const totalCompletedHabits = habits.reduce((sum, habit) => sum + habit.completedDates.length, 0);

  const productivityScore = Math.min(
    100,
    Math.round(completionRate * 0.35 + (goals.length ? (completedGoals / goals.length) * 100 * 0.25 : 0) + Math.min(100, (totalFocusMinutes / 1500) * 100 * 0.2) + Math.min(100, currentStreak * 2.5) + Math.min(100, weeklyCompletion * 0.2))
  );

  const insights = [
    completionRate >= 85 ? "You completed most of your habits this week — keep the streak alive." : "A small win today can create a bigger streak tomorrow.",
    currentStreak >= 7 ? "You are building a strong rhythm. Keep it going." : "You are only a few days away from an exciting streak milestone.",
    categoryPerformance[0] ? `You are strongest in ${categoryPerformance[0].category}.` : "Your habits are balanced and growing.",
  ];

  const unlockedAchievements = achievements.map((achievement) => {
    const unlocked =
      achievement.id === "streak-7"
        ? currentStreak >= achievement.requiredValue
        : achievement.id === "streak-30"
          ? currentStreak >= achievement.requiredValue
          : achievement.id === "habit-100"
            ? totalCompletedHabits >= achievement.requiredValue
            : achievement.id === "perfect-week"
              ? weeklyCompletion >= achievement.requiredValue
              : achievement.id === "focus-master"
                ? totalFocusMinutes >= achievement.requiredValue * 60
                : achievement.id === "goal-achiever"
                  ? completedGoals >= achievement.requiredValue
                  : achievement.id === "consistency-master"
                    ? weeklyCompletion >= achievement.requiredValue
                    : false;

    return { ...achievement, unlocked };
  });

  return {
    completedToday,
    completionRate,
    currentStreak,
    weeklyTrend,
    monthlyTrend,
    categoryPerformance,
    weeklyCompletion: Math.round(weeklyCompletion),
    monthlyCompletion: Math.round(monthlyCompletion),
    averageCompletion,
    totalCompletedHabits,
    completedGoals,
    totalFocusMinutes,
    productivityScore,
    insights,
    unlockedAchievements,
  };
}
