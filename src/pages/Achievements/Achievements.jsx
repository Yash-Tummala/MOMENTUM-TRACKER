import { motion } from "framer-motion";
import ReactConfetti from "react-confetti";
import SectionCard from "../../components/Common/SectionCard";
import { useApp } from "../../context/useApp";
import { pageTransition } from "../../animations/presets";
import "./Achievements.css";

function Achievements() {
  const { analytics } = useApp();
  const unlockedCount = analytics.unlockedAchievements.filter((achievement) => achievement.unlocked).length;

  return (
    <motion.div className="achievements-page" {...pageTransition}>
      {unlockedCount > 0 ? <ReactConfetti recycle={false} numberOfPieces={180} /> : null}
      <SectionCard title="Achievements" subtitle="Celebrate your strongest streaks and habits">
        <div className="achievement-grid">
          {analytics.unlockedAchievements.map((achievement) => (
            <div key={achievement.id} className={`achievement-card ${achievement.unlocked ? "achievement-card--unlocked" : ""}`}>
              <div className="achievement-card__icon">{achievement.icon}</div>
              <div>
                <h4>{achievement.title}</h4>
                <p>{achievement.description}</p>
              </div>
              <span className="achievement-card__status">{achievement.unlocked ? "Unlocked" : "Locked"}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </motion.div>
  );
}

export default Achievements;
