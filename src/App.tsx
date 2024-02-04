import React from "react";
import Home from "./compenets/Home/Home";
import { FavoritesProvider, useFavorites } from "./compenets/FavoritesContext";
function App() {
  const { favorites, updateFavorites } = useFavorites();
  return <Home updateFavorites={updateFavorites} />;

}

export default App;
