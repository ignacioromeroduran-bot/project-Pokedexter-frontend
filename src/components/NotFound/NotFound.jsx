import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <main className="not-found">
      <p className="not-found__code">404</p>
      <h1 className="not-found__title">No se ha encontrado nada</h1>
      <p className="not-found__description">
        La página que buscas no existe o ha cambiado de dirección.
      </p>
      <Link className="not-found__link" to="/">
        Volver al inicio
      </Link>
    </main>
  );
}

export default NotFound;
