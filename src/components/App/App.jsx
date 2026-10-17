import About from "../About/About.jsx";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import PokemonCatalog from "../PokemonCatalog/PokemonCatalog.jsx";
import PokemonDetails from "../PokemonDetails/PokemonDetails.jsx";
import SavedPokemon from "../SavedPokemon/SavedPokemon.jsx";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main />
              <About />
            </>
          }
        />
        <Route path="/pokemon" element={<PokemonCatalog />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
        <Route path="/saved-pokemon" element={<SavedPokemon />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
