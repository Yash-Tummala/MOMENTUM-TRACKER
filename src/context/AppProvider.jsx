import { useEffect, useMemo } from "react";
import { v4 as uuid } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { initialAchievements, initialEvents, initialFocusSessions, initialGoals, initialHabits, initialNotes } from "../data/seedData";
import { getAnalytics, getDayKey } from "../utils/analytics";
import { deleteGoal } from "../utils/goals";
import { deleteHabit } from "../utils/habits";
import { AppContext } from "./AppContext";

export function AppProvider({ children }) {
  const [appState, setAppState] = useLocalStorage("momentum-app-state", {
    habits: initialHabits,
    goals: initialGoals,
    notes: initialNotes,
    events: initialEvents,
    focusSessions: initialFocusSessions,
    achievements: initialAchievements,
  });

  const [uiState, setUiState] = useLocalStorage("momentum-ui-state", {
    selectedMonth: new Date().toISOString(),
    selectedCategory: "All",
    search: "",
    sidebarCollapsed: false,
  });

  const [settings, setSettings] = useLocalStorage("momentum-settings", {
    theme: "dark",
    accent: "violet",
    notifications: true,
  });

  const analytics = useMemo(
    () => getAnalytics(appState.habits, appState.goals, appState.focusSessions, appState.achievements),
    [appState.habits, appState.goals, appState.focusSessions, appState.achievements]
  );

  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme;
    document.documentElement.style.setProperty("--accent", settings.accent === "violet" ? "#8b5cf6" : settings.accent === "teal" ? "#06b6d4" : "#f59e0b");
  }, [settings.theme, settings.accent]);

  const toggleHabitCompletion = (habitId, dateKey = getDayKey(new Date())) => {
    setAppState((current) => ({
      ...current,
      habits: current.habits.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              completedDates: habit.completedDates.includes(dateKey)
                ? habit.completedDates.filter((entry) => entry !== dateKey)
                : [...habit.completedDates, dateKey],
            }
          : habit
      ),
    }));
  };

  const addHabit = (habitInput) => {
    setAppState((current) => ({
      ...current,
      habits: [
        ...current.habits,
        {
          id: uuid(),
          completedDates: [],
          ...habitInput,
        },
      ],
    }));
  };

  const removeHabit = (habitId) => {
    setAppState((current) => ({
      ...current,
      habits: deleteHabit(current.habits, habitId),
    }));
  };

  const updateGoalProgress = (goalId, progress) => {
    setAppState((current) => ({
      ...current,
      goals: current.goals.map((goal) => (goal.id === goalId ? { ...goal, progress: Math.min(100, Math.max(0, progress)) } : goal)),
    }));
  };

  const addGoal = (goalInput) => {
    setAppState((current) => ({
      ...current,
      goals: [...current.goals, { id: uuid(), progress: 0, ...goalInput }],
    }));
  };

  const removeGoal = (goalId) => {
    setAppState((current) => ({
      ...current,
      goals: deleteGoal(current.goals, goalId),
    }));
  };

  const addNote = (noteInput) => {
    setAppState((current) => ({
      ...current,
      notes: [{ id: uuid(), createdAt: new Date().toISOString(), ...noteInput }, ...current.notes],
    }));
  };

  const updateNote = (noteId, updates) => {
    setAppState((current) => ({
      ...current,
      notes: current.notes.map((note) => (note.id === noteId ? { ...note, ...updates } : note)),
    }));
  };

  const deleteNote = (noteId) => {
    setAppState((current) => ({
      ...current,
      notes: current.notes.filter((note) => note.id !== noteId),
    }));
  };

  const addFocusSession = (duration) => {
    setAppState((current) => ({
      ...current,
      focusSessions: [...current.focusSessions, { id: uuid(), duration, completedAt: new Date().toISOString() }],
    }));
  };

  const setTheme = (theme) => setSettings((current) => ({ ...current, theme }));
  const setAccent = (accent) => setSettings((current) => ({ ...current, accent }));
  const setNotifications = (notifications) => setSettings((current) => ({ ...current, notifications }));
  const setSelectedMonth = (selectedMonth) => setUiState((current) => ({ ...current, selectedMonth }));
  const setSearch = (search) => setUiState((current) => ({ ...current, search }));
  const setSelectedCategory = (selectedCategory) => setUiState((current) => ({ ...current, selectedCategory }));
  const toggleSidebar = () => setUiState((current) => ({ ...current, sidebarCollapsed: !current.sidebarCollapsed }));

  const resetApp = () => {
    const confirmed = window.confirm("This will erase your current progress and restore the starter data. Continue?");
    if (!confirmed) {
      return;
    }

    setAppState({
      habits: initialHabits,
      goals: initialGoals,
      notes: initialNotes,
      events: initialEvents,
      focusSessions: initialFocusSessions,
      achievements: initialAchievements,
    });
    setUiState({
      selectedMonth: new Date().toISOString(),
      selectedCategory: "All",
      search: "",
      sidebarCollapsed: false,
    });
    setSettings({ theme: "dark", accent: "violet", notifications: true });
  };

  const importData = (data) => {
    setAppState({
      habits: data.habits || initialHabits,
      goals: data.goals || initialGoals,
      notes: data.notes || initialNotes,
      events: data.events || initialEvents,
      focusSessions: data.focusSessions || initialFocusSessions,
      achievements: data.achievements || initialAchievements,
    });
  };

  const value = useMemo(
    () => ({
      appState,
      uiState,
      settings,
      analytics,
      toggleHabitCompletion,
      addHabit,
      removeHabit,
      updateGoalProgress,
      addGoal,
      removeGoal,
      addNote,
      updateNote,
      deleteNote,
      addFocusSession,
      setTheme,
      setAccent,
      setNotifications,
      setSelectedMonth,
      setSearch,
      setSelectedCategory,
      toggleSidebar,
      resetApp,
      importData,
    }),
    [appState, uiState, settings, analytics]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
