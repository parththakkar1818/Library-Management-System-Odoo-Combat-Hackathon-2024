import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { notifyError,notifySuccess } from "./Notification";


const BookDetail = () => {
  const params = useParams();
  const book_id = params.status; // Corrected the parameter to match URL structure
  const [book, setBook] = useState(null);
  const { isLoaded, isSignedIn, user } = useUser();
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setUserId(user.id); // Update userId only if the user is available
    }
  }, [user]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/fetch_book/${book_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBook();
  }, [book_id]);

  const handleBorrowBook = async () => {
    try {
      const response = await fetch("http://localhost:8000/user_borrowed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ book_id, user_id: userId }), // Sending both book_id and user_id
      });

      if (!response.ok) {
        notifyError("Failed to borrow book");
        throw new Error("Failed to borrow book");
      }

      const data = await response.json();
      notifySuccess("Book Borrowed Successfully");
      navigate("/");
      
    } catch (error) {
      console.error("Error borrowing the book:", error);
      alert("Failed to borrow the book. Please try again.");
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 flex">
        <div className="w-1/2">
          <img
            src={book.thumbnail}
            alt={book.book_name}
            className="w-full h-full object-cover rounded"
          />
        </div>
        <div className="w-1/2 pl-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{book.book_name}</h1>
            <p className="text-gray-700 mb-2">
              <strong>Author:</strong> {book.author.join(", ")}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Publisher:</strong> {book.publisher}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Published Date:</strong> {book.publishDate}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>ISBN:</strong> {book.book_id}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Page Count:</strong> {book.pageCount}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Categories:</strong> {book.categories.join(", ")}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Language:</strong> {book.language}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Average Rating:</strong> {book.averageRating}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Price:</strong> ${book.price}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Description:</strong> {book.description}
            </p>
          </div>
          <button
            onClick={handleBorrowBook}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition"
          >
            Borrow Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
