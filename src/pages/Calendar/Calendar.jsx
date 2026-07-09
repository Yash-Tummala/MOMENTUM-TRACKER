import { useMemo, useState } from "react";
import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, startOfMonth, startOfWeek, subMonths } from "date-fns";
import { motion } from "framer-motion";
import SectionCard from "../../components/Common/SectionCard";
import { useApp } from "../../context/useApp";
import { pageTransition } from "../../animations/presets";
import "./Calendar.css";

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function CalendarPage() {
  const { appState, uiState, setSelectedMonth } = useApp();
  const selectedMonth = useMemo(() => new Date(uiState.selectedMonth), [uiState.selectedMonth]);
  const [selectedDay, setSelectedDay] = useState(new Date());

  const monthStart = startOfMonth(selectedMonth);
  const monthEnd = endOfMonth(selectedMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const eventsForDay = appState.events.filter((event) => event.date === format(selectedDay, "yyyy-MM-dd"));

  return (
    <motion.div className="calendar-page" {...pageTransition}>
      <SectionCard title="Calendar" subtitle="See your momentum across the month">
        <div className="calendar-toolbar">
          <div className="month-controls">
            <button onClick={() => setSelectedMonth(subMonths(selectedMonth, 1).toISOString())}>←</button>
            <h3>{format(selectedMonth, "MMMM yyyy")}</h3>
            <button onClick={() => setSelectedMonth(addMonths(selectedMonth, 1).toISOString())}>→</button>
          </div>
          <span className="pill">{appState.events.length} upcoming events</span>
        </div>

        <div className="calendar-grid">
          {weekdayLabels.map((label) => (
            <div key={label} className="calendar-day-label">
              {label}
            </div>
          ))}
          {calendarDays.map((day) => {
            const isInMonth = day.getMonth() === selectedMonth.getMonth();
            const isSelected = isSameDay(day, selectedDay);
            return (
              <button key={day.toISOString()} className={`calendar-cell ${isInMonth ? "" : "calendar-cell--muted"} ${isSelected ? "calendar-cell--selected" : ""}`} onClick={() => setSelectedDay(day)}>
                <span>{format(day, "d")}</span>
                {appState.events.some((event) => event.date === format(day, "yyyy-MM-dd")) ? <span className="calendar-dot" /> : null}
              </button>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard title={`Agenda • ${format(selectedDay, "MMM d")}`} subtitle="Today's focus and commitments">
        {eventsForDay.length ? (
          <div className="agenda-list">
            {eventsForDay.map((event) => (
              <div key={event.id} className="agenda-item">
                <strong>{event.title}</strong>
                <span>{event.type}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">No events scheduled for this day. Add one in the next sprint.</p>
        )}
      </SectionCard>
    </motion.div>
  );
}

export default CalendarPage;
