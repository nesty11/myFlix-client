import { useState } from "react";
import { BookCard } from "../movie-card/movie-card";

export const MainView = () => {
  const [books, setBooks] = useState([
    { id: 1, title: "Movie1" },
    { id: 2, title: "Movie2" },
    { id: 3, title: "Movie3" },
    { id: 4, title: "Movie4" },
    { id: 5, title: "Movie5" },
  ]);

  if (books.length === 0) {
    return <div>The list is empty!</div>;
  }
    return (
      <div>
        {books.map((book) => {
          <BookCard key={book.id} bookData={book} />
        })}
      </div>
    );
};
