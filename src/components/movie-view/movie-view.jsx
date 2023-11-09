import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies, user }) => {
  const { movieTitle } = useParams();
  const movie = movies.find((m) => m.Title === movieTitle);
  if (!movie) {
    return <div>Movie not found.</div>;
  }

  return (
    <div>
      <h1>{movie.Title}</h1>
      <p>{movie.Description}</p>
      <div>
        <h2>Details:</h2>
        <ul>
          <li>
            <strong>Genre:</strong> {movie.Genre.Name}
          </li>
          <li>
            <strong>Director:</strong> {movie.Director.Name}
          </li>
          <li>
            <strong>Director's Bio:</strong> {movie.Director.Bio}
          </li>
          <li>
            <strong>Director's Birth:</strong> {movie.Director.Birth}
          </li>
        </ul>
      </div>
      {movie.Featured && <div>Featured Movie</div>}
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};
