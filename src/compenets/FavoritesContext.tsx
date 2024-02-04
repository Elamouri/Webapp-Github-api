import React, { createContext, useContext, useState, ReactNode } from "react";

interface FavoritesContextProps {
  favorites: string[]; // Change the type to string[]
  updateFavorites: (newFavorites: string[]) => void; // Change the type to string[]
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<string[]>([]); // Change the type to string[]

  const updateFavorites = (newFavorites: string[]) => {
    setFavorites(newFavorites);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, updateFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
