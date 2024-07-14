import React, { useEffect, useState } from 'react';
import BookCard from './BookCard'; // Replace with your actual path
import { Link, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// const books = [
//   {
//     "book_id": "b1",
//     "book_name": "The Great Gatsby",
//     "author": ["F. Scott Fitzgerald"],
//     "thumbnail": "https://images.unsplash.com/photo-1512820790803-83ca734da794",
//   },
//   {
//     "book_id": "b2",
//     "book_name": "1984",
//     "author": ["George Orwell"],
//     "thumbnail": "https://images.unsplash.com/photo-1512820790803-83ca734da794",
//   },
//   {
//     "book_id": "b3",
//     "book_name": "To Kill a Mockingbird",
//     "author": ["Harper Lee"],
//     "thumbnail": "https://images.unsplash.com/photo-1512820790803-83ca734da794",
//   },
//   {
//     "book_id": "b4",
//     "book_name": "The Catcher in the Rye",
//     "author": ["J.D. Salinger"],
//     "thumbnail": "https://images.unsplash.com/photo-1512820790803-83ca734da794",
//   },
//   {
//     "book_id": "b5",
//     "book_name": "Pride and Prejudice",
//     "author": ["Jane Austen"],
//     "thumbnail": "https://images.unsplash.com/photo-1512820790803-83ca734da794",
//   },
//   {
//     "book_id": "b6",
//     "book_name": "Pride and Prejudice",
//     "author": ["Jane Austen"],
//     "thumbnail": "https://images.unsplash.com/photo-1512820790803-83ca734da794",
//   },
//   {
//     "book_id": "b7",
//     "book_name": "Pride and Prejudice",
//     "author": ["Jane Austen"],
//     "thumbnail": "https://images.unsplash.com/photo-1512820790803-83ca734da794",
//   },
//   {
//     "book_id": "b8",
//     "book_name": "Pride and Prejudice",
//     "author": ["Jane Austen"],
//     "thumbnail": "https://images.unsplash.com/photo-1512820790803-83ca734da794",
//   },
// ];

const Home = () => {
  const [books, setBooks] = useState([]);
  const location = useLocation();
  var category = location.pathname.split("/")[1];
  if (category == "books") {
    category = "";
  }
  console.log(category);
  const [showAddBookButton, setShowAddBookButton] = useState(true); // New state to manage button visibility
  const [isOpen, setIsOpen] = useState(false);
  const [isbn, setIsbn] = useState("");
  const [quantity, setQuantity] = useState("");
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleAddBook = () => {
    // Add book logic here
    console.log(`ISBN: ${isbn}, Quantity: ${quantity}`);
    togglePopup();
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:8000/get_all_books"); // Adjust the URL if necessary
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        const filteredBooks = category
          ? data.filter((book) =>
              book.categories.some(
                (cat) => cat.toLowerCase() === category.toLowerCase()
              )
            )
          : data;
        setBooks(filteredBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);
  return (
    <div className="container mx-auto px-4">
      {showAddBookButton && (
        <div className="flex justify-end my-4">
          <button
            onClick={togglePopup}
            className="bg-blue-500 text-white px-12 py-2 rounded-xl mr-8"
          >
            Add Book
          </button>
        </div>
      )}
      <div className="flex flex-wrap -mx-2">
        {books.map((book) => (
          <div
            key={book.book_id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4"
          >
            <Link to={`/book/${book.book_id}`}>
              <BookCard book={book} />
            </Link>
          </div>
        ))}
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 transition-opacity duration-300">
          <div className="bg-white p-6 rounded-xl shadow-xl ml-[300px] transition-transform transform duration-300">
            <h2 className="text-xl mb-4">Add Book</h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="isbn"
              >
                ISBN Number
              </label>
              <input
                type="text"
                id="isbn"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="quantity"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={togglePopup}
                className="bg-gray-500 text-white px-4 py-2 rounded-xl mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBook}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;