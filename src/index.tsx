import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Favorites from "./compenets/FavoritesPage/Favorites";
import Detail from "./compenets/DetailPage/Detail";
import { FavoritesProvider } from "./compenets/FavoritesContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    ),
  },
  {
    path: "Favorites",
    element: (
      <FavoritesProvider>
        <Favorites />
      </FavoritesProvider>
    ),
  },
  {
    path: "Detail/:id",
    element: <Detail />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);
