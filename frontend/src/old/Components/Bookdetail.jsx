import React, { useState } from "react";

function Bookdetail() {
  const [isbn, setIsbn] = useState("");
  const [quantity, setQuantity] = useState(0);

  const [bookDetails, setBookDetails] = useState(null);
  const [error, setError] = useState("");

  const handleFetchBookDetails = async () => {
    const payload = {
      isbn: isbn,
      quantity: quantity,
    };
    try {
      const response = await fetch("http://localhost:8000/add_book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Book not found");
      }
      const data = await response.json();
      console.log(data)
      // setBookDetails(data);
      setError("");
    } catch (err) {
      setError("Book not found. Please check the ISBN and try again.");
      setBookDetails(null);
    }
  };

  return (
    <div className="App">
      <h1>Library Management System</h1>
      <input
        type="text"
        placeholder="Enter ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
      />
      <input
        type="int"
        placeholder="Enter Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button onClick={handleFetchBookDetails}>Add Books</button>
      {error && <p className="error">{error}</p>}
      {bookDetails && (
        <div className="book-details">
          <img src={bookDetails.thumbnail} alt={bookDetails.title} />
          <h2>{bookDetails.title}</h2>
          <p>
            <strong>Author(s):</strong> {bookDetails.authors.join(", ")}
          </p>
          <p>
            <strong>Publisher:</strong> {bookDetails.publisher}
          </p>
          <p>
            <strong>Published Date:</strong> {bookDetails.publishedDate}
          </p>
          <p>
            <strong>Page Count:</strong> {bookDetails.pageCount}
          </p>
          <p>
            <strong>Categories:</strong> {bookDetails.categories.join(", ")}
          </p>
          <p>
            <strong>Average Rating:</strong> {bookDetails.averageRating}
          </p>
          <p>
            <strong>Description:</strong> {bookDetails.description}
          </p>
          <a
            href={bookDetails.infoLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            More Info
          </a>
        </div>
      )}
    </div>
  );
}

export default Bookdetail;
