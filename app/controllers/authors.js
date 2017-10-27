var express = require('express');
var router = express.Router();
var Author = require('../models/authors');

function createNew(req, res){
    var author= new Author();
    author.name = req.body.name;

    author.save(function(err, author){
        if(err) {
            res.send(err);
        }

        res.json({message: 'Author created'});
    });
}

function getList(req, res) {
    const end = parseInt(req.query._end || 10, 10);
    const skip = parseInt(req.query._start || 0, 10);
    const limit = end - skip;
    const sortValue =(req.query._order || 'desc').toLowerCase();
    let sortKey = req.query._sort || '_id';
    sortKey = sortKey === 'id' ? '_id' : sortKey;

    Author.find()
    .limit(limit)
    .skip(skip)
    .sort({ [sortKey]: sortValue })
    .exec()
    .then(authors => Author.count().exec()
        .then(count => res.set('X-Total-Count', count))
        .then(() => authors))
    .then(authors => res.json(authors));
}

function getAuthor(req, res){
    Author.findById(req.params.author_id, function(err, author) {
        if(err) {
            res.send(err);
        }

        res.json(author);
    });
}

function editAuthor(req, res) {
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
}

function removeAuthor(req, res){
    author.remove({_id: req.params.author_id}, function(err){
        if(err){
            res.send(err);
        }

        res.json({message: 'Author deleted'});
    });
}

router.route('/')
    .post(createNew)
    .get(getList);

router.route('/:author_id')
    .get(getAuthor)
    .put(editAuthor)
    .delete(removeAuthor);

module.exports = router;