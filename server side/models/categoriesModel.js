const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var categories_Schema = new Schema({
    categoryName: String
});


var categoriesModel = mongoose.model('categories', categories_Schema);

module.exports = categoriesModel;

