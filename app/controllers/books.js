var express = require('express');
var router = express.Router();
var Book = require('../models/books');

router.route('/')
    .post(function(req, res) {
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

        book.save(function(err) {
            if(err) {
                res.send(err);
            }

            res.json({message: 'Book created'});
        });
    })
    .get(function(req, res){
        Book.find(function (err, books) {
            if(err) {
                res.set('X-Total-Count', 50);
                res.send(err);
            }

            res.json(books);
        });
    });

router.route('/:book_id')
    .get(function(req, res){
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
    })
    .put(function(req, res){
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
    })
    .delete(function(req, res){
        Book.remove({_id: req.params.book_id}, function(err, book){
            if(err){
                res.send(err);
            }

            res.json({message: 'Book deleted'})
        });
    });

module.exports = router;