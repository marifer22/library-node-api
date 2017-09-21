Library API
===========

Live demo
---------
https://stormy-plains-25521.herokuapp.com/books

Routes
------
**Books**
- `GET /books` list all the books
- `POST /books` create a new book
- `GET /books/:id` get a book by its id
- `PUT /books/:id` update an existing book
- `DELETE /books/:id` remove a specific book

**Authors**
- `GET /authors` list all the authors
- `POST /authors` create a new author
- `GET /authors/:id` get a author by its id
- `PUT /authors/:id` update an existing author
- `DELETE /authors/:id` remove a specific author

**Publishers**
- `GET /publishers` list all the publishers
- `POST /publishers` create a new publisher
- `GET /publishers/:id` get a publisher by its id
- `PUT /publishers/:id` update an existing publisher
- `DELETE /publishers/:id` remove a specific publisher

**Categories**
- `GET /categories` list all the categories
- `POST /categories` create a new category
- `GET /categories/:id` get a category by its id
- `PUT /categories/:id` update an existing category
- `DELETE /categories/:id` remove a specific category

Usage
----
Run `npm install` and then `node server.js`