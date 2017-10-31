var express = require('express');
var router = express.Router();

var isLoggedIn = require('../utils/is-logged-in');
var Publisher = require('../models/publishers');

function createNew(req, res){
    var publisher= new Publisher();
    publisher.name = req.body.name;

    publisher.save(function(err, pub){
        if(err) {
            res.send(err);
        }

        console.log(pub);

        res.json({message: 'Publisher created'});
    });
}

function getList(req, res) {
    const end = parseInt(req.query._end || 10, 10);
    const skip = parseInt(req.query._start || 0, 10);
    const limit = end - skip;
    const sortValue =(req.query._order || 'desc').toLowerCase();
    let sortKey = req.query._sort || '_id';
    sortKey = sortKey === 'id' ? '_id' : sortKey;
    
    Publisher.find()
        .limit(limit)
        .skip(skip)
        .sort({ [sortKey]: sortValue })
        .exec()
        .then(publisher => Publisher.count().exec()
            .then(count => res.set('X-Total-Count', count))
            .then(() => publisher))
        .then(publisher => res.json(publisher))
        .catch(err => res.send(err));
}

function getPublisher(req, res){
    Publisher.findById(req.params.publisher_id, function(err, publisher) {
        if(err) {
            res.send(err);
        }

        res.json(publisher);
    });
}

function editPublisher(req, res) {
    Publisher.findById(req.params.publisher_id, function(err, publisher) {
        if(err) {
            res.send(err);
        }

        publisher.name= req.body.name;
        publisher.save(function(err){
            if(err){
                res.send(err);
            }

            res.json({message: 'Publisher updated'});
        });
    });
}

function removePublisher(req, res){
    Publisher.remove({_id: req.params.publisher_id}, function(err){
        if(err){
            res.send(err);
        }

        res.json({message: 'Publisher deleted'});
    });
}

router.route('/')
    .post(isLoggedIn, createNew)
    .get(getList);

router.route('/:publisher_id')
    .get(getPublisher)
    .put(isLoggedIn, editPublisher)
    .delete(isLoggedIn, removePublisher);

module.exports = router;