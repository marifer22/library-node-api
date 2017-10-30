var express = require('express');
var router = express.Router();
var Category = require('../models/categories');

function createNew(req, res){
    var category= new Category();
    category.name = req.body.name;

    category.save(function(err, category){
        if(err) {
            res.send(err);
        }

        res.json({message: 'Category created'});
    });
}

function getList(req, res) {
    const end = parseInt(req.query._end || 10, 10);
    const skip = parseInt(req.query._start || 0, 10);
    const limit = end - skip;
    const sortValue =(req.query._order || 'desc').toLowerCase();
    let sortKey = req.query._sort || '_id';
    sortKey = sortKey === 'id' ? '_id' : sortKey;
    
    Category.find()
        .limit(limit)
        .skip(skip)
        .sort({ [sortKey]: sortValue })
        .exec()
        .then(categories => Category.count().exec()
            .then(count => res.set('X-Total-Count', count))
            .then(() => categories))
        .then(categories => res.json(categories))
        .catch(err => res.send(err));
}

function getCategory(req, res){
    Category.findById(req.params.category_id, function(err, category) {
        if(err) {
            res.send(err);
        }

        res.json(category);
    });
}

function editCategory(req, res) {
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
}

function removeCategory(req, res){
    category.remove({_id: req.params.category_id}, function(err){
        if(err){
            res.send(err);
        }

        res.json({message: 'Category deleted'});
    });
}

router.route('/')
    .post(createNew)
    .get(getList);

router.route('/:category_id')
    .get(getCategory)
    .put(editCategory)
    .delete(removeCategory);

module.exports = router;