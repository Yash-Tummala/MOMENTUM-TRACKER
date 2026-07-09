import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  FaBolt,
  FaCalendarCheck,
  FaClock,
  FaFire,
  FaStar,
  FaTrophy,
} from "react-icons/fa";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ProgressRing from "../../components/Common/ProgressRing";
import SectionCard from "../../components/Common/SectionCard";
import { useApp } from "../../context/useApp";
import { pageTransition } from "../../animations/presets";
import { getDayKey } from "../../utils/analytics";
import "./Dashboard.css";

function Dashboard() {
  const { appState, analytics, toggleHabitCompletion } = useApp();
  const greeting = new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 18 ? "Good afternoon" : "Good evening";

  return (
    <motion.div className="dashboard-page" {...pageTransition}>
      <SectionCard
        title={`${greeting}, Maya`}
        subtitle={`${format(new Date(), "EEEE, MMMM d")} • Momentum is looking strong`}
        action={<span className="pill">Live focus mode</span>}
        className="hero-card"
      >
        <div className="hero-card__content">
          <div>
            <h2>Turn daily effort into visible momentum.</h2>
            <p>
              Track habits, goals, focus sessions, and wins in one calm workspace built for high-performance routines.
            </p>
            <div className="hero-card__actions">
              <button className="button button--primary">Start focus session</button>
              <button className="button button--ghost">Review goals</button>
            </div>
          </div>
          <div className="hero-card__metrics">
            <div>
              <FaFire />
              <strong>{analytics.currentStreak} day streak</strong>
            </div>
            <div>
              <FaTrophy />
              <strong>{analytics.productivityScore} productivity score</strong>
            </div>
          </div>
        </div>
      </SectionCard>

      <div className="stats-grid">
        <SectionCard title="Habits today" subtitle="Completed now" className="metric-card">
          <div className="metric-card__main">
            <FaCalendarCheck />
            <strong>{analytics.completedToday}/{appState.habits.length}</strong>
          </div>
        </SectionCard>
        <SectionCard title="Focus minutes" subtitle="This week" className="metric-card">
          <div className="metric-card__main">
            <FaClock />
            <strong>{Math.round(analytics.totalFocusMinutes / 60)}m</strong>
          </div>
        </SectionCard>
        <SectionCard title="Weekly completion" subtitle="Consistency" className="metric-card">
          <div className="metric-card__main">
            <FaBolt />
            <strong>{analytics.weeklyCompletion}%</strong>
          </div>
        </SectionCard>
        <SectionCard title="XP runway" subtitle="Momentum points" className="metric-card">
          <div className="metric-card__main">
            <FaStar />
            <strong>{analytics.totalCompletedHabits * 10}</strong>
          </div>
        </SectionCard>
      </div>

      <div className="dashboard-grid">
        <SectionCard title="Today’s habit pulse" subtitle="Tap to mark progress">
          <div className="habit-list">
            {appState.habits.map((habit) => {
              const isCompleted = habit.completedDates.includes(getDayKey(new Date()));
              return (
                <button key={habit.id} className={`habit-row ${isCompleted ? "habit-row--done" : ""}`} onClick={() => toggleHabitCompletion(habit.id)}>
                  <span className="habit-row__meta">
                    <span className="habit-dot" style={{ backgroundColor: habit.color }} />
                    <span>
                      <strong>{habit.name}</strong>
                      <small>{habit.category}</small>
                    </span>
                  </span>
                  <span className="habit-row__state">{isCompleted ? "Done" : "Pending"}</span>
                </button>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard title="Weekly momentum" subtitle="Progress trend">
          <div className="chart-card">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={analytics.weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="completion" fill="var(--accent)" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <div className="dashboard-grid dashboard-grid--bottom">
        <SectionCard title="Goal focus" subtitle="Current priorities">
          <div className="goal-stack">
            {appState.goals.map((goal) => (
              <div key={goal.id} className="goal-row">
                <div className="goal-row__top">
                  <strong>{goal.title}</strong>
                  <span>{goal.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div style={{ width: `${goal.progress}%`, background: goal.color }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Productivity score" subtitle="Your current outlook">
          <div className="score-card">
            <ProgressRing value={analytics.productivityScore} />
            <div className="score-card__insights">
              {analytics.insights.map((insight) => (
                <div key={insight} className="insight-pill">
                  {insight}
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>
    </motion.div>
  );
}

export default Dashboard;