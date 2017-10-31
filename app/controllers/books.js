var express = require('express');
var router = express.Router();

var isLoggedIn = require('../utils/is-logged-in');
var Book = require('../models/books');

function createNew(req, res) {
    var book = new Book();
    book.thumb = req.body.thumb;
    book.image = req.body.image;
    book.preview = req.body.preview;
    book.title = req.body.title;
    book.subtitle = req.body.subtitle;
    book.rank = req.body.rank;
    book.price = req.body.price;
    book.year = req.body.year;
    book.code = req.body.code;
    book.descriptionTitle = req.body.descriptionTitle;
    book.descriptionContent = req.body.descriptionContent;
    book.author= req.body.author;
    book.category= req.body.category;
    book.publisher= req.body.publisher;

    book.save(function(err) {
        if(err) {
            res.send(err);
        }

        res.json({message: 'Book created'});
    });
}

function getList(req, res){
    const end = parseInt(req.query._end || 10, 10);
    const skip = parseInt(req.query._start || 0, 10);
    const limit = end - skip;
    const sortValue = (req.query._order || 'desc').toLowerCase();
    let sortKey = req.query._sort || '_id';
    sortKey = sortKey === 'id' ? '_id' : sortKey;

    const filter = {};
    if(req.query.author) {
        filter.author = req.query.author;
    }
    if(req.query.category) {
        filter.category = req.query.category;
    }
    if(req.query.publisher) {
        filter.publisher = req.query.publisher;
    }

    Book.find(filter)
        .limit(limit)
        .skip(skip)
        .sort({ [sortKey]: sortValue })
        .exec()
        .then(books => Book.count(filter).exec()
            .then(count => res.set('X-Total-Count', count))
            .then(() => books))
        .then(books => res.json(books))
        .catch(err => res.send(err));
}

function getBook(req, res){
    Book.findById(req.params.book_id)
    .populate('author')
    .populate('publisher')
    .populate('category')
    .exec(function(err, book){
        if(err){
            res.send(err);
        }

        res.json(book);
    });
}

function editBook(req, res){
    Book.findById(req.params.book_id, function(err, book){
        if(err) {
            res.send(err);
        }

        book.thumb = req.body.thumb || book.thumb;
        book.image = req.body.image || book.image;
        book.preview = req.body.preview || book.preview;
        book.title = req.body.title || book.title;
        book.subtitle = req.body.subtitle || book.subtitle;
        book.rank = req.body.rank || book.rank;
        book.price = req.body.price || book.price;
        book.year = req.body.year || book.year;
        book.code = req.body.code || book.code;
        book.descriptionTitle = req.body.descriptionTitle || book.descriptionTitle;
        book.descriptionContent = req.body.descriptionContent || book.descriptionContent;
        book.author = req.body.author || book.author;
        book.publisher = req.body.publisher || book.publisher;
        book.category = req.body.category || book.category;

        book.save(function(err){
            if(err){
                res.send(err);
            }

            res.json({message: 'Book updated'})
        });
    });
}

function removeBook(req, res){
    Book.remove({_id: req.params.book_id}, function(err, book){
        if(err){
            res.send(err);
        }

        res.json({message: 'Book deleted'})
    });
}

router.route('/')
    .post(isLoggedIn, createNew)
    .get(getList);

router.route('/:book_id')
    .get(getBook)
    .put(isLoggedIn, editBook)
    .delete(isLoggedIn, removeBook);

module.exports = router;