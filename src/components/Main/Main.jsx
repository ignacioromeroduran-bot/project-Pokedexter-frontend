import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";

function Main() {
  const [pokemonName, setPokemonName] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const name = pokemonName.trim().toLowerCase();
    if (name) {
      navigate(`/pokemon/${encodeURIComponent(name)}`);
    }
  }

  return (
    <main className="main" id="main">
      <section className="main__intro" aria-labelledby="main-title">
        <p className="main__eyebrow">Tu aventura comienza aquí</p>
        <h1 id="main-title">Explora el mundo Pokémon</h1>
        <p>
          Encuentra tu Pokémon favorito y descubre sus características.
        </p>
        <form className="main__search" onSubmit={handleSubmit}>
          <label className="main__search-label" htmlFor="pokemon-search">
            Busca por nombre
          </label>
          <div className="main__search-controls">
            <input
              id="pokemon-search"
              className="main__search-input"
              type="search"
              value={pokemonName}
              onChange={(event) => setPokemonName(event.target.value)}
              placeholder="Por ejemplo, pikachu"
              autoComplete="off"
              required
            />
            <button className="main__search-button" type="submit">
              Buscar
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Main;
