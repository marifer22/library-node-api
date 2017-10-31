// BASE SET UP
// ========================================================
require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');

var credentials = process.env.CREDENTIALS;

mongoose.connect('mongodb://'+credentials+'@ds139985.mlab.com:39985/node-proyect1');

var booksRoutes = require('./app/controllers/books');
var authorsRoutes = require('./app/controllers/authors');
var publishersRoutes = require('./app/controllers/publishers');
var categoriesRoutes = require('./app/controllers/categories');
var accountRoutes = require('./app/controllers/account');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  exposedHeaders: ['X-Total-Count']
}));
app.use(cookieParser());
app.use(expressSession({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false
  }
}));
app.use(passport.initialize());
app.use(passport.session());

var port = process.env.PORT || 8080;

// REGISTER OUR ROUTES
// ========================================================
app.use('/books', booksRoutes);
app.use('/authors', authorsRoutes);
app.use('/publishers', publishersRoutes);
app.use('/categories', categoriesRoutes);
app.use('/account', accountRoutes);

var Account = require('./app/models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// START THE SERVER
// =========================================================

app.listen(port);
console.log('Magic happens on port ' + port);