import { useMemo, useState } from "react";
import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, startOfMonth, startOfWeek, subMonths } from "date-fns";
import { motion } from "framer-motion";
import SectionCard from "../../components/Common/SectionCard";
import { useApp } from "../../context/useApp";
import { pageTransition } from "../../animations/presets";
import { getDayKey } from "../../utils/analytics";
import "./Habits.css";

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const categories = ["All", "Health", "Learning", "Career", "Fitness", "Finance", "Reading", "Personal"];

function Habits() {
  const { appState, uiState, analytics, toggleHabitCompletion, addHabit, setSelectedCategory, setSelectedMonth } = useApp();
  const [form, setForm] = useState({ name: "", category: "Health", importance: "Medium", kind: "daily" });

  const selectedMonth = useMemo(() => new Date(uiState.selectedMonth), [uiState.selectedMonth]);
  const monthStart = startOfMonth(selectedMonth);
  const monthEnd = endOfMonth(selectedMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const visibleHabits = appState.habits.filter((habit) => uiState.selectedCategory === "All" || habit.category === uiState.selectedCategory);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name.trim()) {
      return;
    }

    addHabit({
      name: form.name.trim(),
      category: form.category,
      importance: form.importance,
      kind: form.kind,
      color: ["#8b5cf6", "#22c55e", "#ef4444", "#0ea5e9"][Math.floor(Math.random() * 4)],
    });
    setForm({ name: "", category: "Health", importance: "Medium", kind: "daily" });
  };

  return (
    <motion.div className="habits-page" {...pageTransition}>
      <SectionCard title="Habit tracker" subtitle="Matrix-style consistency with a premium feel">
        <div className="habit-toolbar">
          <div className="month-controls">
            <button onClick={() => setSelectedMonth(subMonths(selectedMonth, 1).toISOString())}>←</button>
            <h3>{format(selectedMonth, "MMMM yyyy")}</h3>
            <button onClick={() => setSelectedMonth(addMonths(selectedMonth, 1).toISOString())}>→</button>
          </div>
          <div className="filter-row">
            <select value={uiState.selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <span className="pill">{analytics.completionRate}% completion</span>
          </div>
        </div>

        <div className="habit-grid">
          <div className="habit-grid__header">
            <span className="habit-grid__label">Habit</span>
            {weekdayLabels.map((label) => (
              <span key={label} className="habit-grid__day-label">
                {label}
              </span>
            ))}
          </div>

          {visibleHabits.map((habit) => (
            <div key={habit.id} className="habit-grid__row">
              <div className="habit-grid__habit">
                <span className="habit-dot" style={{ backgroundColor: habit.color }} />
                <div>
                  <strong>{habit.name}</strong>
                  <small>{habit.category}</small>
                </div>
              </div>
              {calendarDays.map((day) => {
                const dateKey = getDayKey(day);
                const isCompleted = habit.completedDates.includes(dateKey);
                const isCurrentMonth = day.getMonth() === selectedMonth.getMonth();
                const isToday = isSameDay(day, new Date());
                return (
                  <button
                    key={`${habit.id}-${dateKey}`}
                    className={`day-cell ${isCompleted ? "day-cell--done" : ""} ${!isCurrentMonth ? "day-cell--muted" : ""} ${isToday ? "day-cell--today" : ""}`}
                    onClick={() => toggleHabitCompletion(habit.id, dateKey)}
                  >
                    {format(day, "d")}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Add a habit" subtitle="Create a focused routine for the next phase">
        <form className="habit-form" onSubmit={handleSubmit}>
          <input
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            placeholder="Habit name"
          />
          <select value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}>
            {categories.filter((item) => item !== "All").map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select value={form.importance} onChange={(event) => setForm((current) => ({ ...current, importance: event.target.value }))}>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select value={form.kind} onChange={(event) => setForm((current) => ({ ...current, kind: event.target.value }))}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
          <button className="button button--primary" type="submit">
            Add habit
          </button>
        </form>
      </SectionCard>
    </motion.div>
  );
}

export default Habits;
