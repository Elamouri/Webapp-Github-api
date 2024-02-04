import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./Detail.css"; 

interface UserDetails {
  id: number;
  login: string;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  bio: string; // assuming bio is available in the response
}

function Detail() {
  const { id } = useParams<{ id: string }>();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${id}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Error fetching user details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  return (
    <div className="center-container">
      <h2>User Details</h2>
      {loading ? (
        <p>Loading user details...</p>
      ) : error ? (
        <p>{error}</p>
      ) : userDetails ? (
        <div>
          <img
            src={userDetails.avatar_url}
            alt={`${userDetails.login}'s avatar`}
          />
          <p>ID: {userDetails.id}</p>
          <p>Login: {userDetails.login}</p>
          <p>Followers: {userDetails.followers}</p>
          <p>Following: {userDetails.following}</p>
          <p>Public Repositories: {userDetails.public_repos}</p>
          <p>Bio: {userDetails.bio}</p>
        </div>
      ) : (
        <p>User details not found</p>
      )}

      <div>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}

export default Detail;
