import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  fetchPokemon,
  getPokemonArtwork,
  getSavedPokemon,
  savePokemon as savePokemonToStorage,
  removeSavedPokemon,
} from "../../utils/pokemonApi.js";
import Preloader from "../Preloader/Preloader.jsx";
import "./PokemonDetails.css";

function PokemonDetails() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadPokemon() {
      setPokemon(null);
      setError("");
      setLoading(true);

      try {
        const result = await fetchPokemon(name, controller.signal);
        setPokemon(result);
        setIsSaved(
          getSavedPokemon().some((savedPokemon) => savedPokemon.id === result.id),
        );
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          if (requestError.message.includes("(404)")) {
            setError(
              "No encontramos ese Pokémon. Revisa el nombre e inténtalo de nuevo.",
            );
          } else if (requestError instanceof SyntaxError) {
            setError("No se pudieron leer los Pokémon guardados.");
          } else {
            setError(requestError.message);
          }
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadPokemon();
    return () => controller.abort();
  }, [name]);

  function handleToggleSaved() {
    if (!pokemon) return;

    setSaveError("");
    try {
      if (isSaved) {
        removeSavedPokemon(pokemon.id);
        setIsSaved(false);
      } else {
        savePokemonToStorage(pokemon);
        setIsSaved(true);
      }
    } catch (storageError) {
      setSaveError(storageError.message);
    }
  }

  return (
    <main className="pokemon-details">
      <Link className="pokemon-details__back" to="/pokemon">
        ← Volver a la Pokédex
      </Link>
      {loading && <Preloader label="Cargando datos del Pokémon..." />}
      {!loading && error && (
        <section className="pokemon-details__message" role="alert">
          <h1>No se encontró el Pokémon</h1>
          <p>{error}</p>
          <Link to="/pokemon">Explorar la Pokédex</Link>
        </section>
      )}
      {!loading && pokemon && (
        <article className="pokemon-profile">
          <div className="pokemon-profile__visual">
            <img
              className="pokemon-profile__image"
              src={getPokemonArtwork(pokemon.id)}
              alt={`Ilustración de ${pokemon.name}`}
            />
          </div>
          <div className="pokemon-profile__content">
            <p className="pokemon-profile__number">
              N.º {String(pokemon.id).padStart(3, "0")}
            </p>
            <h1 className="pokemon-profile__title">
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h1>
            <button
              className="pokemon-profile__save"
              type="button"
              onClick={handleToggleSaved}
              aria-pressed={isSaved}
            >
              {isSaved ? "Quitar de guardados" : "Guardar Pokémon"}
            </button>
            {saveError && (
              <p className="pokemon-profile__error" role="alert">
                {saveError}
              </p>
            )}
            <ul className="pokemon-profile__types" aria-label="Tipos">
              {pokemon.types.map(({ type }) => (
                <li className="pokemon-profile__type" key={type.name}>
                  {type.name}
                </li>
              ))}
            </ul>
            <dl className="pokemon-profile__facts">
              <div>
                <dt>Altura</dt>
                <dd>{(pokemon.height / 10).toFixed(1)} m</dd>
              </div>
              <div>
                <dt>Peso</dt>
                <dd>{(pokemon.weight / 10).toFixed(1)} kg</dd>
              </div>
              <div>
                <dt>Experiencia base</dt>
                <dd>{pokemon.base_experience ?? "—"}</dd>
              </div>
            </dl>
            <h2 className="pokemon-profile__subtitle">Estadísticas</h2>
            <ul className="pokemon-profile__stats">
              {pokemon.stats.map(({ base_stat: value, stat }) => (
                <li className="pokemon-profile__stat" key={stat.name}>
                  <span>{stat.name.replace("-", " ")}</span>
                  <span className="pokemon-profile__stat-value">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      )}
    </main>
  );
}

export default PokemonDetails;
