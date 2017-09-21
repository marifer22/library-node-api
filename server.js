// BASE SET UP
// ========================================================

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var credentials = process.env.CREDENTIALS;

mongoose.connect('mongodb://'+credentials+'@ds139985.mlab.com:39985/node-proyect1');

var booksRoutes = require('./app/controllers/books');
var authorsRoutes = require('./app/controllers/authors');
var publishersRoutes = require('./app/controllers/publishers');
var categoriesRoutes = require('./app/controllers/categories');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// REGISTER OUR ROUTES
// ========================================================
app.use('/books', booksRoutes);
app.use('/authors', authorsRoutes);
app.use('/publishers', publishersRoutes);
app.use('/categories', categoriesRoutes);

// START THE SERVER
// =========================================================

app.listen(port);
console.log('Magic happens on port ' + port);