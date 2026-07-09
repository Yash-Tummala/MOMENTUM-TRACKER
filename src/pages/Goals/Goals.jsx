import { useState } from "react";
import { motion } from "framer-motion";
import SectionCard from "../../components/Common/SectionCard";
import { useApp } from "../../context/useApp";
import { pageTransition } from "../../animations/presets";
import "./Goals.css";

function Goals() {
  const { appState, updateGoalProgress, addGoal } = useApp();
  const [form, setForm] = useState({ title: "", category: "Career", dueDate: "", color: "#8b5cf6" });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.title.trim()) {
      return;
    }

    addGoal({
      title: form.title.trim(),
      category: form.category,
      dueDate: form.dueDate,
      color: form.color,
    });
    setForm({ title: "", category: "Career", dueDate: "", color: "#8b5cf6" });
  };

  return (
    <motion.div className="goals-page" {...pageTransition}>
      <SectionCard title="Goals" subtitle="Shape the next 90 days with intention">
        <div className="goal-list">
          {appState.goals.map((goal) => (
            <div key={goal.id} className="goal-card">
              <div className="goal-card__header">
                <div>
                  <h4>{goal.title}</h4>
                  <p>{goal.category} • due {goal.dueDate || "soon"}</p>
                </div>
                <span className="pill" style={{ background: `${goal.color}22`, color: goal.color }}>
                  {goal.progress}%
                </span>
              </div>
              <div className="progress-bar">
                <div style={{ width: `${goal.progress}%`, background: goal.color }} />
              </div>
              <div className="goal-card__footer">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={goal.progress}
                  onChange={(event) => updateGoalProgress(goal.id, Number(event.target.value))}
                />
                <button className="button button--ghost" onClick={() => updateGoalProgress(goal.id, Math.min(100, goal.progress + 10))}>
                  Advance +10%
                </button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Add a goal" subtitle="Translate ambition into weekly momentum">
        <form className="goal-form" onSubmit={handleSubmit}>
          <input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder="Goal title" />
          <select value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}>
            <option value="Career">Career</option>
            <option value="Health">Health</option>
            <option value="Learning">Learning</option>
            <option value="Personal">Personal</option>
          </select>
          <input type="date" value={form.dueDate} onChange={(event) => setForm((current) => ({ ...current, dueDate: event.target.value }))} />
          <input type="color" value={form.color} onChange={(event) => setForm((current) => ({ ...current, color: event.target.value }))} />
          <button className="button button--primary" type="submit">
            Add goal
          </button>
        </form>
      </SectionCard>
    </motion.div>
  );
}

export default Goals;
