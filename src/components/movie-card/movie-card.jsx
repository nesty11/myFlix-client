import "./movie-card.scss";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movieData, onMovieClick }) => {
  return (
    <Card className="card">
      <Card.Img variant="top" src={movieData.image} />
      <Card.Body className="d-flex flex-column align-items-center">
        <Card.Title className="text-center mb-3">{movieData.title}</Card.Title>
        <Card.Text className="text-center mb-3">{movieData.director}</Card.Text>
        <Button
          className="open-button"
          onClick={() => onMovieClick(movieData)}
          variant="link"
        >
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Bio: PropTypes.string,
      Birth: PropTypes.string,
    }),
    Featured: PropTypes.bool,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
