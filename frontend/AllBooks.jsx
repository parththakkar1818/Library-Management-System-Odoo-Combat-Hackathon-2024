import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:8000/get_all_books");
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        console.log(data);
        setBooks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        const response = await fetch(
          `http://localhost:8000/delete_book/${bookId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete the book");
        }
        setBooks(books.filter((book) => book.book_id !== bookId));
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <div
            key={book.book_id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={book.thumbnail}
              alt={book.book_name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{book.book_name}</h2>
              <p className="text-gray-600 mb-2">By {book.author.join(", ")}</p>
              <p className="text-gray-800 mb-2">{book.publisher}</p>
              <p className="text-gray-600 mb-2">{book.pageCount} pages</p>
              <p className="text-gray-600 mb-2">{book.language}</p>
              <p className="text-gray-800 mb-2">₹{book.price}</p>
              <p className="text-gray-600 text-sm mb-4">{book.description}</p>
              <a
                href={book.previewLink}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Preview
              </a>
              <div className="flex mt-4 space-x-2">
                <Link
                  to={`/update_book/${book.book_id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(book.book_id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
