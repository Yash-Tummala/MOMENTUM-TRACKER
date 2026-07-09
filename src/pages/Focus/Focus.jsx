import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import SectionCard from "../../components/Common/SectionCard";
import { useApp } from "../../context/useApp";
import { pageTransition } from "../../animations/presets";
import "./Focus.css";

const defaultDuration = 25 * 60;

function Focus() {
  const { analytics, addFocusSession } = useApp();
  const [timeLeft, setTimeLeft] = useState(defaultDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(interval);
          setIsRunning(false);
          setSessionCount((count) => count + 1);
          addFocusSession(25);
          return defaultDuration;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [addFocusSession, isRunning]);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }, [timeLeft]);

  const progress = Math.round(((defaultDuration - timeLeft) / defaultDuration) * 100);

  return (
    <motion.div className="focus-page" {...pageTransition}>
      <SectionCard title="Focus timer" subtitle="Deep work, counted with calm intention">
        <div className="focus-timer-card">
          <div className="focus-timer-card__display">
            <h2>{formattedTime}</h2>
            <div className="progress-bar">
              <div style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="focus-controls">
            <button className="button button--primary" onClick={() => setIsRunning(true)}>
              {isRunning ? "Working" : "Start"}
            </button>
            <button className="button button--ghost" onClick={() => setIsRunning(false)}>
              Pause
            </button>
            <button className="button button--ghost" onClick={() => {
              setIsRunning(false);
              setTimeLeft(defaultDuration);
            }}>
              Reset
            </button>
          </div>
        </div>
      </SectionCard>

      <div className="focus-grid">
        <SectionCard title="Today’s focus" subtitle="A single block is enough to create momentum">
          <div className="focus-metric">
            <strong>{Math.round(analytics.totalFocusMinutes / 60)}m</strong>
            <span>Focus minutes logged</span>
          </div>
        </SectionCard>
        <SectionCard title="Session count" subtitle="Every finished sprint counts">
          <div className="focus-metric">
            <strong>{sessionCount}</strong>
            <span>Completed sessions</span>
          </div>
        </SectionCard>
      </div>
    </motion.div>
  );
}

export default Focus;
