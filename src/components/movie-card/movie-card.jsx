import PropTypes from "prop-types";

export const MovieCard = ({ movieData, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movieData);
      }}
    >
      {movieData.Title}
    </div>
  );
};

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
    Director: PropTypes.shape({
      Bio: PropTypes.string,
      Birth: PropTypes.string
    }),
    Featured: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};