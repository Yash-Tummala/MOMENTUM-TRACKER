import { FaBars, FaBell, FaMoon, FaSun } from "react-icons/fa";
import { useApp } from "../../context/useApp";
import "./Header.css";

function Header() {
  const { settings, setTheme, uiState, setSearch, toggleSidebar } = useApp();

  return (
    <header className="header">
      <div className="header__left">
        <button className="icon-button" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <div>
          <h1>Momentum OS</h1>
          <p>Daily focus, visible progress</p>
        </div>
      </div>

      <div className="header__center">
        <input value={uiState.search} onChange={(event) => setSearch(event.target.value)} placeholder="Search notes and habits" />
      </div>

      <div className="header__actions">
        <button className="icon-button" onClick={() => setTheme(settings.theme === "dark" ? "light" : "dark")}>
          {settings.theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
        <button className="icon-button">
          <FaBell />
        </button>
        <div className="avatar">MY</div>
      </div>
    </header>
  );
}

export default Header;