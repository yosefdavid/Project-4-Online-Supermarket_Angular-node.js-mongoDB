const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var products_Schema = new Schema({
    productName: String,
    categoryId: String,
    price:Number,
    image:String
});




var productsModel = mongoose.model('products', products_Schema);

module.exports = productsModel;

