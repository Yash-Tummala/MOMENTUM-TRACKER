import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { AppProvider } from "./context/AppProvider";
import Dashboard from "./pages/Dashboard/Dashboard";
import CalendarPage from "./pages/Calendar/Calendar";
import Habits from "./pages/Habits/Habits";
import Goals from "./pages/Goals/Goals";
import Analytics from "./pages/Analytics/Analytics";
import Achievements from "./pages/Achievements/Achievements";
import Focus from "./pages/Focus/Focus";
import Notes from "./pages/Notes/Notes";
import Settings from "./pages/Settings/Settings";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/focus" element={<Focus />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;