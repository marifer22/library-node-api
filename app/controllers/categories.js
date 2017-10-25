var express = require('express');
var router = express.Router();
var Category = require('../models/categories');

router.route('/')
    .post(function(req, res){
        var category= new Category();
        category.name = req.body.name;

        category.save(function(err, category){
            if(err) {
                res.send(err);
            }

            res.json({message: 'Category created'});
        });
    })
    .get(function(req, res) {
        if(req.query.name) {
            Category.find({name: req.query.name}, function(err, categories) {
                if(err){
                    res.send(err);
                }

                res.set('X-Total-Count', 50);
                res.json(categories);
            });
        }else{
            Category.find(function(err, categories){
                if(err) {
                    res.send(err);
                }

                res.json(categories);
            });
        }
    });

router.route('/:category_id')
    .get(function(req, res){
        Category.findById(req.params.category_id, function(err, category) {
            if(err) {
                res.send(err);
            }

            res.json(category);
        });
    })
    .put(function(req, res) {
        Category.findById(req.params.category_id, function(err, category) {
            if(err) {
                res.send(err);
            }

            category.name= req.body.name;
            category.save(function(err){
                if(err){
                    res.send(err);
                }

                res.json({message: 'Category updated'});
            });
        });
    })
    .delete(function(req, res){
        category.remove({_id: req.params.category_id}, function(err){
            if(err){
                res.send(err);
            }

            res.json({message: 'Category deleted'});
        });
    });

module.exports = router;