import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";

const UserBooks = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const userId = user? user.id : "";
  console.log(user,userId);
  const [currentBooks, setCurrentBooks] = useState([]);

  useEffect(() => {
    const fetchCurrentBooks = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/user_current_books",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCurrentBooks(data.current_books);
      } catch (error) {
        console.error("There was an error fetching the current books!", error);
      }
    };

    if (userId) {
      fetchCurrentBooks();
    }
  }, [userId]);
  // Calculate fine for the books
  const calculateFine = (returnDate) => {
    const now = new Date();
    const returnDateObj = new Date(returnDate);
    const daysOverdue = Math.max(
      0,
      Math.ceil((now - returnDateObj) / (1000 * 60 * 60 * 24))
    );
    return daysOverdue * 10; // Fine of 10 USD per day overdue
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Books</h1>

      <h2 className="text-xl font-semibold mb-2">Current Books</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Book Name</th>
            <th className="py-2 px-4 border-b">Author</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Categories</th>
            <th className="py-2 px-4 border-b">Thumbnail</th>
            <th className="py-2 px-4 border-b">Preview Link</th>
            <th className="py-2 px-4 border-b">Issue Date</th>
            <th className="py-2 px-4 border-b">Return Date</th>
            <th className="py-2 px-4 border-b">Fine</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{book.book_name}</td>
              <td className="py-2 px-4 border-b">{book.author}</td>
              
              <td className="py-2 px-4 border-b">{book.price} </td>
              <td className="py-2 px-4 border-b">
                {book.categories.join(", ")}
              </td>
              <td className="py-2 px-4 border-b">
                <img
                  src={book.thumbnail}
                  alt={book.book_name}
                  className="w-24 h-36 object-cover rounded-lg"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <a
                  href={book.previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Preview
                </a>
              </td>
              <td className="py-2 px-4 border-b">
                {new Date(book.issue_date).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b">
                {new Date(book.return_date).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b">
                {calculateFine(book.return_date)} 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserBooks;
