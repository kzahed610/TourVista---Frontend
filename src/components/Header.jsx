import  { Link, NavLink } from 'react-router-dom';
import './Header.css'
import ThemeToggle from "./ThemeToggle";
import useTheme from "../hooks/useTheme";
import logo from '../assets/TourVistaLogo.png';

function Header() {
  const [isLightMode, setIsLightMode] = useTheme(false);

  return (
    <header className="header-container">
      <div className="header-content">
        <nav className="header-nav">
          <NavLink to="/" className={({ isActive }) =>
             isActive ? "nav-link active-link" : "nav-link"
          }>
            Home
          </NavLink>


        </nav>
        <div className="header-logo-container">
          <img src={logo} alt="TourVista Logo" className="header-logo" />
        </div>
        <div className="header-actions">
        <Link to="/login" className="header-signup-btn">
          Sign In / Up
        </Link>
          <ThemeToggle isLightMode={isLightMode} setIsLightMode={setIsLightMode} />
        </div>
      </div>
    </header>
  );
}

export default Header;