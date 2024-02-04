import React, { useState, useEffect } from "react";
import axios from "axios";
import { CiStar } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Home.css";

const GITHUB_API_URL = "https://api.github.com/search/users";

interface User {
  id: number;
  login: string;
  avatar_url: string;
}

interface HomeProps {
  updateFavorites: (newFavorites: string[]) => void;
}

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  favorites: string[];
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  setSearchTerm,
  favorites,
}) => (
  <div className="search-input-container">
    <span className="search-icon">
      <IoIosSearch />
    </span>
    <input
      type="text"
      placeholder="Search GitHub users"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-input"
    />

    <Link to="Favorites">
      <CiStar />
    </Link>
  </div>
);

interface UserCardProps {
  user: User;
  index: number;
  searchResults: User[];
  toggleFavorite: (login: string) => void; // Change the argument type
  isFavorite: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  index,
  searchResults,
  toggleFavorite,
  isFavorite,
}) => (
  <div
    key={user.id}
    className={`user-card${index !== searchResults.length - 1 ? " with-line" : ""}`}
  >
    <img src={user.avatar_url} alt={`${user.login}'s avatar`} />
    <p>{user.login}</p>
    <button className="icon_fov" onClick={() => toggleFavorite(user.login)}> {/* Change the argument */}
      {isFavorite ? <FaStar /> : <CiStar />}
    </button>
  </div>
);

const Home: React.FC<HomeProps> = ({ updateFavorites }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const clearFavorites = () => { /*dddddddddddddddddddd*/ 
    setFavorites([]);
  };
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    // Pass the updated favorites to the App component
    updateFavorites(favorites);
  }, [favorites, updateFavorites]);

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeoutId = setTimeout(() => {
      if (searchTerm.trim().length >= 3) {
        fetchData();
      } else {
        setSearchResults([]);
        setIsSearching(false);
      }
    }, 500);

    setSearchTimeout(timeoutId);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [searchTerm]);

  const fetchData = async () => {
    try {
      setIsSearching(true);
      const response = await axios.get(`${GITHUB_API_URL}?q=${searchTerm}`);
      setSearchResults(response.data.items);
    } catch (error) {
      console.error("Error searching users:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const toggleFavorite = (login: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(login)) {
        return prevFavorites.filter((name) => name !== login);
      } else {
        return [...prevFavorites, login];
      }
    });
  };

  return (
    <div className="theheader">
      <div className="user-search-container">
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} favorites={favorites} />
        {isSearching && <span>Searching...</span>}
      </div>
      {searchTerm.trim().length >= 3 && (
        <div className="cards">
          {searchResults.map((user: User, index) => (
            <UserCard
              key={user.id}
              user={user}
              index={index}
              searchResults={searchResults}
              toggleFavorite={toggleFavorite}
              isFavorite={favorites.includes(user.login)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
