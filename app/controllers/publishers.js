var express = require('express');
var router = express.Router();
var Publisher = require('../models/publishers');

router.route('/')
    .post(function(req, res){
        var publisher= new Publisher();
        publisher.name = req.body.name;

        publisher.save(function(err, pub){
            if(err) {
                res.send(err);
            }

            console.log(pub);

            res.json({message: 'Publisher created'});
        });
    })
    .get(function(req, res) {
        if(req.query.name) {
            Publisher.find({name: req.query.name}, function(err, publishers) {
                if(err){
                    res.send(err);
                }

                res.json(publishers);
            });
        }else{

            Publisher.find(function(err, publishers){
                if(err) {
                    res.send(err);
                }

                res.json(publishers);
            });
        }
    });

router.route('/:publisher_id')
    .get(function(req, res){
        Publisher.findById(req.params.publisher_id, function(err, publisher) {
            if(err) {
                res.send(err);
            }

            res.json(publisher);
        });
    })
    .put(function(req, res) {
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
    })
    .delete(function(req, res){
        Publisher.remove({_id: req.params.publisher_id}, function(err){
            if(err){
                res.send(err);
            }

            res.json({message: 'Publisher deleted'});
        });
    });

module.exports = router;