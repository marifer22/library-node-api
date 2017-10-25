var express = require('express');
var router = express.Router();
var Author = require('../models/authors');

router.route('/')
    .post(function(req, res){
        var author= new Author();
        author.name = req.body.name;

        author.save(function(err, author){
            if(err) {
                res.send(err);
            }

            res.json({message: 'Author created'});
        });
    })
    .get(function(req, res) {
        if(req.query.name) {
            Author.find({name: req.query.name}, function(err, authors) {
                if(err){
                    res.send(err);
                }

                res.set('X-Total-Count', 50);
                res.json(authors);
            });
        }else{
            Author.find(function(err, authors){
                if(err) {
                    res.send(err);
                }

                res.json(authors);
            });
        }
    });

router.route('/:author_id')
    .get(function(req, res){
        Author.findById(req.params.author_id, function(err, author) {
            if(err) {
                res.send(err);
            }

            res.json(author);
        });
    })
    .put(function(req, res) {
        Author.findById(req.params.author_id, function(err, author) {
            if(err) {
                res.send(err);
            }

            author.name= req.body.name;
            author.save(function(err){
                if(err){
                    res.send(err);
                }

                res.json({message: 'Author updated'});
            });
        });
    })
    .delete(function(req, res){
        author.remove({_id: req.params.author_id}, function(err){
            if(err){
                res.send(err);
            }

            res.json({message: 'Author deleted'});
        });
    });

module.exports = router;