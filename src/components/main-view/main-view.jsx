import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Star Wars: Revenge of the Sith",
      Description:
        "Three years into the Clone Wars, Obi-Wan pursues a new threat, while Anakin is lured by Chancellor Palpatine into a sinister plot to rule the galaxy.",
      Genre: "Action",
      image: "https://www.themoviedb.org/t/p/original/nduFqlQF4cAFJ3OIfrpsISDvoxq.jpg",
      director: "George Lucas",
    },
    {
      id: 2,
      title: "Dungeons & Dragons: Honor Among Thieves",
      Description:
        "A charming thief and a band of unlikely adventurers embark on an epic quest to retrieve a lost relic, but things go dangerously awry when they run afoul of the wrong people.",
      Genre: "Fantasy",
      image: "https://www.themoviedb.org/t/p/original/tzUrEepcNv20YrS2jlBY4B6sMZX.jpg",
      director: "John Francis Daley",
    },
    {
      id: 3,
      title: "Princess Mononoke",
      Description:
        "On a journey to find the cure for a Tatarigami's curse, Ashitaka finds himself in the middle of a war between the forest gods and Tatara, a mining colony. In this quest he also meets San, the Mononoke Hime.",
      Genre: "Adventure",
      image: "https://www.themoviedb.org/t/p/original/58LcltHMRBICiavCzpAcI2YQvhQ.jpg",
      director: "Hayao Miyazaki",
    },
    {
      id: 4,
      title: "Spider-Man: No Way Home",
      Description:
        "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.",
      Genre: "Action",
      image: "https://www.themoviedb.org/t/p/original/uJYYizSuA9Y3DCs0qS4qWvHfZg4.jpg",
      director: "Jon Watts",
    },
    {
      id: 5,
      title: "Spider-Man: Across The Spider-Verse",
      Description:
        "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.",
      Genre: "Animation",
      image: "https://www.themoviedb.org/t/p/original/zknrogDlwcmaz3yHkA3yEhy005t.jpg",
      director: "Joaquim Dos Santos",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
  return (
    <div>
      {movies.map((movie) => {
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />;
      })}
    </div>
  );
};
