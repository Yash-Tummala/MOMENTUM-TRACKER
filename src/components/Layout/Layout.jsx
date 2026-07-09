import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import "./Layout.css";

function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-container">
        <Header />
        <main className="content">{children}</main>
      </div>
    </div>
  );
}

export default Layout;