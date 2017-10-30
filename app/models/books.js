var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    thumb: {type: String, 
            required: true},
    image: {type: String, 
            required: true},
    preview: {type: String, 
            required: true},
    title: {type: String, 
            required: true},
    subtitle: {type: String, 
            required: true},
    rank: { type: Number, 
            min: 0, 
            max: 5, 
            default: 0},
    price: {type: Number, 
            required: true},
    year: {type: Number, 
            required: true},
    code: {type: String, 
            required: true},
    descriptionTitle: {type: String, 
                        required: true},
    descriptionContent: {type: String, 
                        required: true},
    author: {type: String, 
                ref: 'Author'},
    publisher: {type: String, 
                ref: 'Publisher'},
    category: {type: String, 
                ref: 'Category'}
});


module.exports = mongoose.model('Book', BookSchema);