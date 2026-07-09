import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useApp } from "../../context/useApp";
import { navigationItems } from "../../constants/navigation";
import "./Sidebar.css";

function Sidebar() {
  const { uiState, toggleSidebar } = useApp();

  return (
    <aside className={`sidebar ${uiState.sidebarCollapsed ? "sidebar--collapsed" : ""}`}>
      <div className="sidebar__brand">
        <div className="brand-icon">M</div>
        {!uiState.sidebarCollapsed ? (
          <div>
            <h2>Momentum OS</h2>
            <p>Personal productivity</p>
          </div>
        ) : null}
        <button className="icon-button" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>

      <nav className="sidebar__nav">
        {navigationItems.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `sidebar__link ${isActive ? "sidebar__link--active" : ""}`}>
            <Icon />
            {!uiState.sidebarCollapsed ? <span>{label}</span> : null}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;