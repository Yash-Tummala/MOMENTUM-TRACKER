import { motion } from "framer-motion";
import "./SectionCard.css";

function SectionCard({ title, subtitle, action, children, className = "" }) {
  return (
    <motion.section
      className={`section-card ${className}`.trim()}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="section-card__header">
        <div>
          <h3>{title}</h3>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {action ? <div className="section-card__action">{action}</div> : null}
      </div>
      <div className="section-card__content">{children}</div>
    </motion.section>
  );
}

export default SectionCard;
