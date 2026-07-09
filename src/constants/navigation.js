import {
  FaChartPie,
  FaCalendarAlt,
  FaFire,
  FaBullseye,
  FaHourglassHalf,
  FaTachometerAlt,
  FaTrophy,
  FaStickyNote,
  FaCog,
} from "react-icons/fa";

export const navigationItems = [
  { to: "/", label: "Dashboard", icon: FaTachometerAlt },
  { to: "/calendar", label: "Calendar", icon: FaCalendarAlt },
  { to: "/habits", label: "Habits", icon: FaFire },
  { to: "/goals", label: "Goals", icon: FaBullseye },
  { to: "/focus", label: "Focus Timer", icon: FaHourglassHalf },
  { to: "/analytics", label: "Analytics", icon: FaChartPie },
  { to: "/achievements", label: "Achievements", icon: FaTrophy },
  { to: "/notes", label: "Notes", icon: FaStickyNote },
  { to: "/settings", label: "Settings", icon: FaCog },
];
