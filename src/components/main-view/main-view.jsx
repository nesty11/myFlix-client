import "./main-view.scss";
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://nvmyflix-06d7b8d88193.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie.id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name,
              Description: movie.Genre.Description,
            },
            Director: {
              Name: movie.Director.Name,
              Bio: movie.Director.Bio,
              Birth: movie.Director.Birth,
            },
            Featured: movie.Featured,
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <Row>
      {!user ? (
        <>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          <div className="text-center">Don't have an account yet? Sign up!</div>
          <SignupView />
        </>
      ) : selectedMovie ? (
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      ) : movies.length === 0 ? (
        <>
          <div>The list is empty!</div>
          <button
            className="logout-button"
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <div>
          {movies.map((movie) => {
            return (
              <MovieCard
                key={movie.Title}
                movieData={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            );
          })}
          <button
            className="logout-button"
            onClick={() => {
              setUser(null);
            }}
          >
            Logout
          </button>
        </div>
      )}
    </Row>
  );
};
