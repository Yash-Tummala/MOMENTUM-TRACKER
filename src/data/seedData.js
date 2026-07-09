import { v4 as uuid } from "uuid";

export const initialHabits = [
  {
    id: uuid(),
    name: "Morning Run",
    category: "Fitness",
    importance: "High",
    kind: "daily",
    color: "#8b5cf6",
    completedDates: [],
  },
  {
    id: uuid(),
    name: "Read 20 Pages",
    category: "Learning",
    importance: "Medium",
    kind: "daily",
    color: "#22c55e",
    completedDates: [],
  },
  {
    id: uuid(),
    name: "Deep Work Block",
    category: "Career",
    importance: "Critical",
    kind: "daily",
    color: "#ef4444",
    completedDates: [],
  },
  {
    id: uuid(),
    name: "Plan the Week",
    category: "Personal",
    importance: "Low",
    kind: "weekly",
    color: "#0ea5e9",
    completedDates: [],
  },
];

export const initialGoals = [
  {
    id: uuid(),
    title: "Launch a polished portfolio project",
    category: "Career",
    progress: 72,
    target: 100,
    dueDate: "2026-09-30",
    color: "#8b5cf6",
  },
  {
    id: uuid(),
    title: "Maintain a 30-day consistency streak",
    category: "Health",
    progress: 63,
    target: 100,
    dueDate: "2026-08-15",
    color: "#06b6d4",
  },
  {
    id: uuid(),
    title: "Read 12 books this year",
    category: "Learning",
    progress: 41,
    target: 100,
    dueDate: "2026-12-31",
    color: "#f59e0b",
  },
];

export const initialNotes = [
  {
    id: uuid(),
    title: "Design direction",
    content: "Keep the experience calm, focused, and rewarding.",
    pinned: true,
    color: "#8b5cf6",
    createdAt: new Date().toISOString(),
  },
  {
    id: uuid(),
    title: "Weekly review",
    content: "Celebrate wins, trim blockers, and prep tomorrow's focus area.",
    pinned: false,
    color: "#10b981",
    createdAt: new Date().toISOString(),
  },
];

export const initialEvents = [
  {
    id: uuid(),
    title: "Design review",
    date: "2026-07-10",
    type: "Focus",
  },
  {
    id: uuid(),
    title: "Portfolio polish",
    date: "2026-07-14",
    type: "Work",
  },
];

export const initialFocusSessions = [
  { id: uuid(), duration: 25, completedAt: new Date().toISOString() },
  { id: uuid(), duration: 50, completedAt: new Date().toISOString() },
];

export const initialAchievements = [
  {
    id: "streak-7",
    title: "7-Day Streak",
    description: "Stay consistent for a full week.",
    icon: "🔥",
    requiredValue: 7,
    unlocked: false,
  },
  {
    id: "streak-30",
    title: "30-Day Streak",
    description: "Make momentum your superpower.",
    icon: "⚡",
    requiredValue: 30,
    unlocked: false,
  },
  {
    id: "habit-100",
    title: "100 Completed Habits",
    description: "Turn intention into rhythm.",
    icon: "🎯",
    requiredValue: 100,
    unlocked: false,
  },
  {
    id: "perfect-week",
    title: "Perfect Week",
    description: "Complete every planned habit this week.",
    icon: "🌟",
    requiredValue: 100,
    unlocked: false,
  },
  {
    id: "focus-master",
    title: "Focus Master",
    description: "Accumulate 25 focus sessions.",
    icon: "🧠",
    requiredValue: 25,
    unlocked: false,
  },
  {
    id: "goal-achiever",
    title: "Goal Achiever",
    description: "Complete three goals with pride.",
    icon: "🏅",
    requiredValue: 3,
    unlocked: false,
  },
  {
    id: "consistency-master",
    title: "Consistency Master",
    description: "Keep your weekly completion above 85%.",
    icon: "🏆",
    requiredValue: 85,
    unlocked: false,
  },
];
