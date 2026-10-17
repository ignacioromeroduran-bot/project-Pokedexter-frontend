import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation" aria-label="Navegación principal">
      <NavLink to="/">Inicio</NavLink>
      <NavLink to="/pokemon">Pokédex</NavLink>
      <NavLink to="/saved-pokemon">Pokémon guardados</NavLink>
    </nav>
  );
}

export default Navigation;
