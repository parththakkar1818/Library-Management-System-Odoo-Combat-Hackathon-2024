import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  const { book_id, book_name, author, thumbnail } = book;

  return (
    <div className="max-w-[256px] rounded-xl overflow-hidden shadow-lg mx-2 mb-6">
      <img src={thumbnail} alt={book_name} className="w-full" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{book_name}</div>
        <p className="text-gray-700 text-base">
          by {author.length > 0 ? author[0] : 'Unknown Author'}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
