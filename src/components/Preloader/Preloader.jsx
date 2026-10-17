import "./Preloader.css";

function Preloader({ label = "Cargando..." }) {
  return (
    <div className="preloader" role="status" aria-live="polite">
      <span className="preloader__spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export default Preloader;
