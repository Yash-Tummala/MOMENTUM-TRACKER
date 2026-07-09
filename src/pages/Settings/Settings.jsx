import { motion } from "framer-motion";
import SectionCard from "../../components/Common/SectionCard";
import { useApp } from "../../context/useApp";
import { pageTransition } from "../../animations/presets";
import "./Settings.css";

function Settings() {
  const { settings, setTheme, setAccent, setNotifications, resetApp, importData } = useApp();

  const exportJson = () => {
    const payload = localStorage.getItem("momentum-app-state");
    const blob = new Blob([payload || "{}"], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "momentum-os.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportCsv = () => {
    const payload = JSON.parse(localStorage.getItem("momentum-app-state") || "{}");
    const habitRows = payload.habits || [];
    const csv = ["name,category,importance", ...habitRows.map((habit) => `${habit.name},${habit.category},${habit.importance}`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "momentum-habits.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        importData(data);
      } catch (error) {
        console.error("Import failed", error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <motion.div className="settings-page" {...pageTransition}>
      <SectionCard title="Preferences" subtitle="Tune the experience to match your routine">
        <div className="settings-section">
          <label>
            <span>Theme</span>
            <select value={settings.theme} onChange={(event) => setTheme(event.target.value)}>
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </label>
          <label>
            <span>Accent</span>
            <select value={settings.accent} onChange={(event) => setAccent(event.target.value)}>
              <option value="violet">Violet</option>
              <option value="teal">Teal</option>
              <option value="amber">Amber</option>
            </select>
          </label>
          <label className="toggle-row">
            <span>Notifications</span>
            <input type="checkbox" checked={settings.notifications} onChange={(event) => setNotifications(event.target.checked)} />
          </label>
        </div>
      </SectionCard>

      <SectionCard title="Data" subtitle="Keep your progress portable">
        <div className="settings-actions">
          <button className="button button--primary" onClick={exportJson}>Export JSON</button>
          <button className="button button--ghost" onClick={exportCsv}>Export CSV</button>
          <label className="button button--ghost import-button">
            Import JSON
            <input type="file" accept="application/json" onChange={handleImport} />
          </label>
        </div>
      </SectionCard>

      <SectionCard title="Reset" subtitle="Start fresh when your season changes">
        <button className="button button--ghost" onClick={resetApp}>Reset application</button>
      </SectionCard>
    </motion.div>
  );
}

export default Settings;
