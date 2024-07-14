import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/fetch_book/${bookId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch the book details");
        }
        const data = await response.json();
        setBook(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
      const updatedBook = {
        book_id: bookId,
        book_name: formData.get("book_name"),
        author: formData
          .get("author")
          .split(",")
          .map((author) => author.trim()), // Trim whitespace from each author
        publisher: formData.get("publisher"),
        publishDate: formData.get("publishDate"),
        price: parseInt(formData.get("price")), // Ensure price is an integer
        quantity: parseInt(formData.get("quantity")), // Ensure quantity is an integer
        description: formData.get("description"),
        pageCount: parseInt(formData.get("pageCount")), // Ensure pageCount is an integer
        categories: formData
          .get("categories")
          .split(",")
          .map((category) => category.trim()), // Trim whitespace from each category
        averageRating: parseFloat(formData.get("averageRating")), // Ensure averageRating is a float
        thumbnail: formData.get("thumbnail"),
        previewLink: formData.get("previewLink") || "", // Default to empty string if not provided
        language: formData.get("language"),
        is_issued: formData.get("is_issued") === "true", // Convert string to boolean
        return_date: formData.get("return_date") || "", // Handle optional field
        past_issuers: [], // Not updating past issuers
      };

    try {
      const response = await fetch(
        `http://localhost:8000/update_book/${bookId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBook),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the book");
      }

      navigate("/allbooks"); // Redirect to the books list page
    } catch (error) {
      setError(error.message);
    }
  };

  if (!book) return <p>Loading...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="book_id" value={book.book_id} />

        <div>
          <label className="block text-sm font-medium mb-1">Book Name</label>
          <input
            type="text"
            name="book_name"
            defaultValue={book.book_name}
            className="border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Authors (comma-separated)
          </label>
          <input
            type="text"
            name="author"
            defaultValue={book.author.join(",")}
            className="border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Publisher</label>
          <input
            type="text"
            name="publisher"
            defaultValue={book.publisher}
            className="border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Published Date
          </label>
          <input
            type="date"
            name="publishDate"
            defaultValue={book.publishDate}
            className="border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            step="0.01"
            name="price"
            defaultValue={book.price}
            className="border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            defaultValue={book.quantity}
            className="border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            defaultValue={book.description}
            className="border-gray-300 rounded-md p-2 w-full"
            rows="4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Page Count</label>
          <input
            type="number"
            name="pageCount"
            defaultValue={book.pageCount}
            className="border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Categories (comma-separated)
          </label>
          <input
            type="text"
            name="categories"
            defaultValue={book.categories.join(",")}
            className="border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Average Rating
          </label>
          <input
            type="number"
            step="0.1"
            name="averageRating"
            defaultValue={book.averageRating}
            className="border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Thumbnail URL
          </label>
          <input
            type="text"
            name="thumbnail"
            defaultValue={book.thumbnail}
            className="border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Preview Link</label>
          <input
            type="text"
            name="previwLink"
            defaultValue={book.previwLink}
            className="border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Language</label>
          <input
            type="text"
            name="language"
            defaultValue={book.language}
            className="border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Is Issued</label>
          <select
            name="is_issued"
            defaultValue={book.is_issued.toString()}
            className="border-gray-300 rounded-md p-2 w-full"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>

        {book.is_issued && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Return Date
            </label>
            <input
              type="date"
              name="return_date"
              defaultValue={book.return_date}
              className="border-gray-300 rounded-md p-2 w-full"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
