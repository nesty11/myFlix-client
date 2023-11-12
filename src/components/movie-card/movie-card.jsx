import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movieData, user, token, setUser }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user && user.FavoriteMovies) {
      if (user.FavoriteMovies.includes(movieData._id)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }, [user, movieData]);

  const addFavoriteMovie = () => {
    fetch(
      `https://movieapi-2cmo.onrender.com/users/${user.Username}/movies/${movieData._id}`,
      { method: "POST", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to add favorite movie.");
        }
      })
      .then((responseUser) => {
        if (responseUser) {
          localStorage.setItem("user", JSON.stringify(responseUser));
          setUser(responseUser);
          setIsFavorite(true);
          console.log("Successfully added to favorites movies!");
        }
      })
      .catch((err) => {
        console.error(`Error adding favorite movie: ${err}`);
      });
  };

  const removeFavoriteMovie = () => {
    fetch(
      `https://movieapi-2cmo.onrender.com/users/${user.Username}/movies/${movieData._id}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to remove favorite movie.");
        }
      })
      .then((responseUser) => {
        if (responseUser) {
          localStorage.setItem("user", JSON.stringify(responseUser));
          setUser(responseUser);
          setIsFavorite(false);
          console.log("Successfully removed from favorites movies!");
        }
      })
      .catch((err) => {
        console.error(`Error removing favorite movie: ${err}`);
      });
  };

  return (
    <Card className="movie-cards-container">
      {/*   <Card.Img variant="top" src={movieData.image} /> */}
      <Card.Body className="d-flex flex-column align-items-center">
        <Card.Title className="text-center mb-3">{movieData.Title}</Card.Title>
        <Card.Text className="text-center mb-3">
          {movieData.Director.Name}
        </Card.Text>
        <Link to={`/movies/${encodeURIComponent(movieData.Title)}`}>
          <Button className="open-button" variant="link">
            Open
          </Button>
        </Link>
        {user ? (
          <div className="favorite-button">
            {isFavorite ? (
              <Button variant="danger" onClick={removeFavoriteMovie}>
                Remove from Favorites
              </Button>
            ) : (
              <Button variant="success" onClick={addFavoriteMovie}>
                Add to Favorites
              </Button>
            )}
          </div>
        ) : null}
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    _id: PropTypes.string,
    Title: PropTypes.string,
    Description: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
    }),
    Featured: PropTypes.bool,
    FavoriteMovies: PropTypes.array,
  }).isRequired,
  user: PropTypes.object,
  token: PropTypes.string,
  setUser: PropTypes.func,
};
