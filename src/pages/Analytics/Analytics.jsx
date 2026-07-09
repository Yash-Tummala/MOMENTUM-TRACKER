import { motion } from "framer-motion";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import SectionCard from "../../components/Common/SectionCard";
import { useApp } from "../../context/useApp";
import { pageTransition } from "../../animations/presets";
import "./Analytics.css";

function Analytics() {
  const { analytics } = useApp();

  return (
    <motion.div className="analytics-page" {...pageTransition}>
      <SectionCard title="Analytics" subtitle="A living view of what is compounding">
        <div className="analytics-metrics">
          <div className="analytics-metric">
            <strong>{analytics.productivityScore}</strong>
            <span>Productivity score</span>
          </div>
          <div className="analytics-metric">
            <strong>{analytics.currentStreak}</strong>
            <span>Current streak</span>
          </div>
          <div className="analytics-metric">
            <strong>{analytics.weeklyCompletion}%</strong>
            <span>Weekly completion</span>
          </div>
          <div className="analytics-metric">
            <strong>{analytics.totalCompletedHabits}</strong>
            <span>Completed habits</span>
          </div>
        </div>
      </SectionCard>

      <div className="analytics-grid">
        <SectionCard title="Weekly completion" subtitle="Consistency trend">
          <div className="chart-card">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={analytics.weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.18)" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="completion" fill="var(--accent)" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Category performance" subtitle="Where effort is concentrated">
          <div className="chart-card">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={analytics.categoryPerformance} dataKey="count" nameKey="category" innerRadius={60} outerRadius={85} fill="var(--accent)" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Monthly progress" subtitle="Longer view of your rhythm">
        <div className="chart-card">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={analytics.monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.16)" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="completion" stroke="var(--accent)" fill="rgba(139, 92, 246, 0.2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </motion.div>
  );
}

export default Analytics;
