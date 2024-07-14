from fastapi import FastAPI, HTTPException, Body
from pymongo import MongoClient
from bson import ObjectId
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date
from fastapi.middleware.cors import CORSMiddleware
import requests
import uuid 
from datetime import date, timedelta
from datetime import datetime
import random


app = FastAPI()

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client['Library']
user_admin_info_collection = db['user_admin_info']
books_collection = db['books']

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace with the list of allowed origins if you know them
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Custom JSON encoder to handle ObjectId
# class CustomJSONEncoder(json.JSONEncoder):
#     def default(self, obj):
#         if isinstance(obj, ObjectId):
#             return str(obj)
#         return super().default(obj)

# Define Pydantic models


        
class Book(BaseModel):
    book_id: str = ""
    book_name: str = ""
    author: List[str] = []
    publisher: str = ""
    publishDate: str = ""
    price: int = 0
    quantity: int = 0
    description: str = ""
    pageCount: int = 0
    categories: List[str] = []
    averageRating: float = 0.0
    thumbnail: str = ""
    previewLink: str = ""
    language: str = ""
    is_issued: bool = False
    return_date: str = ""
    past_issuers: List["PastIssuer"] = []

class UserAdminInfo(BaseModel):
    user_id: str
    name: str
    mobile_number: str
    current_books: List[Book]
    past_books: List[Book]
    is_librarian: int

class PastIssuer(BaseModel):
    user: UserAdminInfo
    issue_date: date
    

class AddBookRequest(BaseModel):
    isbn: str
    quantity: int

class UserBorrowedBookModel(BaseModel):
    book_id: str
    user_id: str

class UserIDRequest(BaseModel):
    user_id: str


    

Book.update_forward_refs()
PastIssuer.update_forward_refs()


def fetch_book_details(isbn: str) -> Book:
    url = f"https://www.googleapis.com/books/v1/volumes?q=isbn:{isbn}"
    response = requests.get(url)
    data = response.json()
    
    if "items" not in data:
        raise HTTPException(status_code=404, detail="Book not found in Google Books API")
    
    book_info = data['items'][0]['volumeInfo']
    sale_info = data['items'][0]['saleInfo']
    price = sale_info.get("listPrice", {}).get("amount", "Price not available")

    # # Extract industry identifiers
    # isbn_10 = next((id['identifier'] for id in book_info.get('industryIdentifiers', []) if id['type'] == 'ISBN_10'), None)
    # isbn_13 = next((id['identifier'] for id in book_info.get('industryIdentifiers', []) if id['type'] == 'ISBN_13'), None)
    
    # Extract relevant details
    book_details = Book(
        book_id=str(uuid.uuid4()), 
        book_name=book_info.get("title", ""), 
        author=book_info.get("authors", []),  
        publisher=book_info.get("publisher", ""), 
        publishDate=book_info.get("publishedDate", ""),  
        price=book_info.get("price", 0) if isinstance(book_info.get("price"), int) else 0,  
        quantity=book_info.get("quantity", 0),  
        description=book_info.get("description", ""),  
        pageCount=book_info.get("pageCount", 0),  
        categories=book_info.get("categories", []),   
        thumbnail=book_info.get("imageLinks", {}).get("thumbnail", ""), 
        previewLink=book_info.get("previewLink", ""),  
        language=book_info.get("language", ""),  
        is_issued=book_info.get("is_issued", False),  
        return_date=book_info.get("returnDate", ""),  
        past_issuers=book_info.get("pastIssuers", [])  
    )
    return book_details

# Endpoints
# Endpoint to fetch book details by ISBN
@app.get("/fetch_book_by_isbn/{isbn}", response_model=Book)
async def fetch_book_by_isbn(isbn: str):
    book_details = fetch_book_details(isbn)
    return book_details

# Helper function to convert MongoDB document to dict
def doc_to_dict(doc):
    return {k: str(v) if isinstance(v, ObjectId) else v for k, v in doc.items()}

@app.get("/")
async def hello():
    return {"Hello": "World"}


@app.post("/add_user_admin_info/")
async def add_user_admin_info(user_info: UserAdminInfo):

    collection = db["user_admin_info"]
    result = collection.insert_one(user_info.dict())
    if result.inserted_id:
        return {"message": "User admin info added successfully", "user_id": str(result.inserted_id)}
    raise HTTPException(status_code=400, detail="Failed to add user admin info")

@app.post("/add_book")
async def add_book(request: AddBookRequest):
    book_data = fetch_book_details(request.isbn)
    if not book_data:
        raise HTTPException(status_code=404, detail="Book not found")
    
    # Prepare the book details for MongoDB insertion
    book_dict = book_data.dict(by_alias=True)
    book_dict['quantity'] = request.quantity
    book_dict['is_issued'] = False
    book_dict['return_date'] = None
    book_dict['past_issuers'] = []
    
    result = books_collection.insert_one(book_dict)
    return {"inserted_id": str(result.inserted_id)}

@app.get("/get_all_books")
async def get_all_books():
    books = books_collection.find()
    return [doc_to_dict(book) for book in books]

@app.put("/update_book/{book_id}")
async def update_book(book_id: str, book: Book):
    result = books_collection.update_one({"book_id": book_id}, {"$set": book.dict(by_alias=True)})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Book not found")
    return {"updated_count": result.modified_count}

@app.delete("/delete_book/{book_id}")
async def delete_book(book_id: str):
    result = books_collection.delete_one({"book_id": book_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Book not found")
    return {"deleted_count": result.deleted_count}

@app.get("/fetch_book/{book_id}")
async def fetch_book(book_id: str):
    book = books_collection.find_one({"book_id": book_id})
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return doc_to_dict(book)

# Endpoint to update a specific book by its ID
@app.put("/update_book/{book_id}")
async def update_book(book_id: str, book: Book):
    result = books_collection.update_one({"book_id": book_id}, {"$set": book.dict(exclude_unset=True)})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Book not found or no changes made")
    return {"updated_count": result.modified_count}


@app.post("/user_borrowed")
async def user_borrowed(request: UserBorrowedBookModel):
    # Fetch the book from the database
    print(request.book_id)
    book = books_collection.find_one({"book_id": request.book_id})
    print(book)
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    if book['quantity'] == 0:
        raise HTTPException(status_code=404, detail="Book not available")

    # Set the issue date to today's date and calculate the return date as 10 days from the current date
    issue_date = datetime.now()
    return_date = issue_date + timedelta(days=10)
    print(issue_date)

    # Fetch the user from the database
    user = user_admin_info_collection.find_one({"user_id": request.user_id})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    # Update book quantity and append to past_issuers
    book['quantity'] -= 1
    book['past_issuers'].append({
        "user_id": request.user_id,
        "issue_date": issue_date,
        "return_date": return_date
    })

    # Update the book in the database
    result = books_collection.update_one(
        {"book_id": request.book_id},
        {"$set": {"quantity": book['quantity'], "past_issuers": book['past_issuers']}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=500, detail="Failed to update book information")

    # Update the user's current books
    update_result = user_admin_info_collection.update_one(
        {"user_id": request.user_id},
        {"$push": {"current_books": {"book_id": request.book_id, "issue_date": issue_date, "return_date": return_date}}}
    )
    if update_result.modified_count == 0:
        raise HTTPException(status_code=500, detail="Failed to update user information")

    return {"message": "Book borrowed successfully", "updated_book_quantity": book['quantity']}
    

@app.post("/user_current_books")
async def get_user_books(request: UserIDRequest):
    # Fetch the user from the database
    user = user_admin_info_collection.find_one({"user_id": request.user_id})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    # Extract the current books from the user's document
    current_books = user.get("current_books", [])
    current_books_details = []

    for book in current_books:
        book_details = books_collection.find_one({"book_id": book["book_id"]})
        if book_details:
            # Convert ObjectId to string for JSON serialization
            book_details['_id'] = str(book_details['_id'])
            current_books_details.append({
                "book_id": book_details["book_id"],
                "book_name": book_details["book_name"],
                "author": book_details["author"],
                "publisher": book_details["publisher"],
                "publishDate": book_details["publishDate"],
                "price": book_details["price"],
                "quantity": book_details["quantity"],
                "description": book_details["description"],
                "pageCount": book_details["pageCount"],
                "categories": book_details["categories"],
                "averageRating": book_details["averageRating"],
                "thumbnail": book_details["thumbnail"],
                "previewLink": book_details["previewLink"],
                "language": book_details["language"],
                "issue_date": book["issue_date"],
                "return_date": book["return_date"]
            })
        else:
            print(f"Book with ID {book['book_id']} not found")

    return {"current_books": current_books_details}

def serialize_books(books):
    """Convert MongoDB book documents to JSON serializable format."""
    return [
        {
            "book_id": book.get("book_id"),
            "book_name": book.get("book_name"),
            "thumbnail": book.get("thumbnail"),
            "categories": book.get("categories"),
            "previewlink": book.get("previewLink"),
        }
        for book in books
    ]

@app.get("/get_trending_newarrivals")
async def get_trending_newarrivals():
    # Fetch all books from the collection
    books = list(books_collection.find({}, {"_id": 0}))  # Exclude the `_id` field
    
    # Ensure there are enough books in the collection
    if len(books) < 5:
        raise ValueError("Not enough books available in the collection.")
    
    # Convert the book documents to JSON serializable format
    serialized_books = serialize_books(books)
    
    # Get the 5 most recent books for new arrivals
    new_arrivals_books = serialized_books[:5]  # Assuming the latest books are the first 5 entries

    # Get 5 random books for trending
    trending_books = random.sample(serialized_books, 5)  # Randomly select 5 books from the whole data
    
    return {
        "new_arrivals": new_arrivals_books,
        "trending_books": trending_books
    }



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
