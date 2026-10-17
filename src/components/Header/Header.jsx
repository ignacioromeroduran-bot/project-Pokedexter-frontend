import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation.jsx";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <Link className="header__logo" to="/" aria-label="Pokedexter, inicio">
        Pokedexter
      </Link>
      <Navigation />
    </header>
  );
}

export default Header;
