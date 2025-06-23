# assignment-3-library_management_app

Documentation:

setup:
# install:
1. npm init -y
2. npm i -D typescript
3. npm i express mongoose

# Folder structure:
I create a src folder as a main folder. src folder under create 2 file app.ts and server.ts and I also create a folder app. app folder under nesessary folder example models, interfaces, controllers.

# API details:
 I create two contollers like 1. book.controller.ts and
                            2. borrow_book.controller.ts

 # For Book :
 1. Api endpoint: 
      '/api/books/'

2. Method: 
 like Get, POST, PUT, DELETE 
 # Details :
 * Get Method: 'api/books' can get all books easily by filtering with sorting and limit.
     response:
     {
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "_id": "64f123abc4567890def12345",
      "title": "The Theory of Everything",
      "author": "Stephen Hawking",
      "genre": "SCIENCE",
      "isbn": "9780553380163",
      "description": "An overview of cosmology and black holes.",
      "copies": 5,
      "available": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    }
    {...}
  ]
}
 * POST Method : 'api/books/create-book'  can create book .
       {
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
 * PUT Method:  'api/books/:bookId' can update book.
      {
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 50,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-20T08:30:00.000Z"
  }
}
 * DELETE Method : 'api/books/:bookId' can delete book
   {
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
  
# For Borrow Book:
1. Api endpoint: 
   'api/borrow'

2. Method:
 like Get, POST,
  #Details: 
  * GET Method: 'api/books' can get all borrow books

{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
   
  * POST Method:  'api/borrow/create-borrow-book' can create a borrow book
      Request:
  {
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}

   
