import React from 'react';
import BookCard from './BookCard'; // Replace with your actual path
import { Link } from 'react-router-dom';

const books = [
  {
    "book_id": "b1",
    "book_name": "The Great Gatsby",
    "author": ["F. Scott Fitzgerald"],
    "thumbnail": "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  },
  {
    "book_id": "b2",
    "book_name": "1984",
    "author": ["George Orwell"],
    "thumbnail": "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  },
  {
    "book_id": "b3",
    "book_name": "To Kill a Mockingbird",
    "author": ["Harper Lee"],
    "thumbnail": "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  },
  {
    "book_id": "b4",
    "book_name": "The Catcher in the Rye",
    "author": ["J.D. Salinger"],
    "thumbnail": "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  },
  {
    "book_id": "b5",
    "book_name": "Pride and Prejudice",
    "author": ["Jane Austen"],
    "thumbnail": "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  },
  {
    "book_id": "b5",
    "book_name": "Pride and Prejudice",
    "author": ["Jane Austen"],
    "thumbnail": "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  },
  {
    "book_id": "b5",
    "book_name": "Pride and Prejudice",
    "author": ["Jane Austen"],
    "thumbnail": "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  },
  {
    "book_id": "b5",
    "book_name": "Pride and Prejudice",
    "author": ["Jane Austen"],
    "thumbnail": "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  },
];

const Home = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap -mx-2">
        {books.map((book) => (
          <BookCard key={book.book_id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;
