import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Preloader from "../Preloader/Preloader.jsx";
import { fetchPokemonList, getPokemonArtwork } from "../../utils/pokemonApi.js";
import "./PokemonCatalog.css";

function PokemonCatalog() {
  const [pokemon, setPokemon] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadPokemon() {
      try {
        const results = await fetchPokemonList({ signal: controller.signal });
        setPokemon(results);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(requestError.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadPokemon();
    return () => controller.abort();
  }, []);

  const filteredPokemon = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return pokemon.filter((item) => item.name.includes(normalizedQuery));
  }, [pokemon, query]);

  return (
    <main className="catalog">
      <section className="catalog__content" aria-labelledby="catalog-title">
        <p className="catalog__eyebrow">Pokédex</p>
        <h1 className="catalog__title" id="catalog-title">
          Descubre Pokémon
        </h1>
        <p className="catalog__description">
          Explora la primera selección y abre una ficha para ver sus datos.
        </p>
        <label className="catalog__search-label" htmlFor="catalog-search">
          Filtrar por nombre
        </label>
        <input
          className="catalog__search"
          id="catalog-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar Pokémon"
        />

        {loading && <Preloader label="Cargando Pokémon..." />}
        {!loading && error && (
          <p className="catalog__message" role="alert">
            {error} Comprueba tu conexión e inténtalo de nuevo.
          </p>
        )}
        {!loading && !error && filteredPokemon.length === 0 && (
          <p className="catalog__message" role="status">
            No se encontraron Pokémon con ese nombre.
          </p>
        )}
        {!loading && !error && filteredPokemon.length > 0 && (
          <ul className="catalog__grid">
            {filteredPokemon.map(({ id, name }) => (
              <li className="catalog__item" key={id}>
                <Link className="pokemon-card" to={`/pokemon/${name}`}>
                  <img
                    className="pokemon-card__image"
                    src={getPokemonArtwork(id)}
                    alt=""
                    loading="lazy"
                  />
                  <span className="pokemon-card__number">
                    N.º {String(id).padStart(3, "0")}
                  </span>
                  <span className="pokemon-card__name">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default PokemonCatalog;
