import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getPokemonArtwork,
  getSavedPokemon,
  removeSavedPokemon,
} from "../../utils/pokemonApi.js";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import "./SavedPokemon.css";

function SavedPokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      setPokemon(getSavedPokemon());
    } catch {
      setError("No se pudieron leer los Pokémon guardados de este navegador.");
    }
  }, []);

  function handleRemove() {
    if (!selectedPokemon) return;

    try {
      setPokemon(removeSavedPokemon(selectedPokemon.id));
      setSelectedPokemon(null);
    } catch {
      setError("No se pudo quitar el Pokémon. Inténtalo de nuevo.");
    }
  }

  return (
    <main className="saved-pokemon">
      <header className="saved-pokemon__header">
        <p className="saved-pokemon__eyebrow">Tu colección</p>
        <h1 className="saved-pokemon__title">Pokémon guardados</h1>
        <p className="saved-pokemon__summary">
          Tienes{" "}
          <strong>
            {pokemon.length} Pokémon guardado{pokemon.length === 1 ? "" : "s"}
          </strong>{" "}
          en tu colección.
        </p>
      </header>

      {error && (
        <p className="saved-pokemon__message" role="alert">
          {error}
        </p>
      )}
      {!error && pokemon.length === 0 && (
        <section className="saved-pokemon__empty" aria-labelledby="empty-title">
          <h2 id="empty-title">Tu colección está vacía</h2>
          <p>Guarda Pokémon desde sus fichas para tenerlos siempre a mano.</p>
          <Link className="saved-pokemon__browse" to="/pokemon">
            Explorar la Pokédex
          </Link>
        </section>
      )}
      {pokemon.length > 0 && (
        <ul className="saved-pokemon__grid">
          {pokemon.map((item) => (
            <li className="saved-pokemon__item" key={item.id}>
              <article className="saved-card">
                <Link className="saved-card__details" to={`/pokemon/${item.name}`}>
                  <img
                    className="saved-card__image"
                    src={getPokemonArtwork(item.id)}
                    alt=""
                    loading="lazy"
                  />
                  <span className="saved-card__number">
                    N.º {String(item.id).padStart(3, "0")}
                  </span>
                  <span className="saved-card__name">
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                  </span>
                </Link>
                <button
                  className="saved-card__remove"
                  type="button"
                  onClick={() => setSelectedPokemon(item)}
                  aria-label={`Quitar a ${item.name} de guardados`}
                >
                  Quitar
                </button>
              </article>
            </li>
          ))}
        </ul>
      )}

      <PopupWithForm
        isOpen={Boolean(selectedPokemon)}
        title="Quitar de tu colección"
        onClose={() => setSelectedPokemon(null)}
        onSubmit={handleRemove}
        submitLabel="Quitar Pokémon"
      >
        <p className="saved-pokemon__confirm">
          ¿Quieres quitar{" "}
          <strong>
            {selectedPokemon?.name
              ? selectedPokemon.name.charAt(0).toUpperCase() +
                selectedPokemon.name.slice(1)
              : ""}
          </strong>{" "}
          de tus Pokémon guardados?
        </p>
      </PopupWithForm>
    </main>
  );
}

export default SavedPokemon;
