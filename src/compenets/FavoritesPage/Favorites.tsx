import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Favorites.css";
import { ImStarFull } from "react-icons/im";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { useFavorites } from "../FavoritesContext";

interface User {
  id: number;
  login: string;
  avatar_url: string;
}

function Favorites() {

  const { favorites, updateFavorites } = useFavorites();
  const [favoriteUsers, setFavoriteUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchFavoriteUsers = async () => {
      try {
        const usersPromises = favorites.map(async (login) => { // Change variable name to login
          const response = await axios.get(
            `https://api.github.com/users/${login}` // Use login instead of userId
          );
          return response.data;
        });
        const users = await Promise.all(usersPromises);
        setFavoriteUsers(users);
      } catch (error) {
        console.error("Error fetching favorite users:", error);
      }
    };

    fetchFavoriteUsers();
  }, [favorites]);

  const handleUserClick = (userId: number) => {
    // Handle the user click, for example, log the user ID
    console.log("Clicked on user with ID:", userId);
  };

  return (
    <div className="theheader">
      <div className="user-search-container">
        <div className="search-input-container">
          <Link to="/">
            <IoMdArrowBack />
          </Link>
          <span className="static-text">Favorites</span>
          <ImStarFull />
        </div>
      </div>

      <div className="favorites-list">
        <ul>
          {favoriteUsers.map((user, index) => (
            <li key={index}>
              {/* Use Link to navigate to the user detail page */}
              <Link to={`/Detail/${user.login}`}>{/* Change to login */}
                <img src={user.avatar_url} alt={`${user.login}'s avatar`} />
                <p>{user.login}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Favorites;
