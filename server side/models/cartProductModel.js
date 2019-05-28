const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var cartProduct_Schema = new Schema({
    productId: String,
    quantity: Number,
    totalPrice:Number,
    cartId:String,
});


var cartProductModel = mongoose.model('cartProduct', cartProduct_Schema);

module.exports = cartProductModel;

