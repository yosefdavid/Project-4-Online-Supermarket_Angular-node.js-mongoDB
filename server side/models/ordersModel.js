const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var orders_Schema = new Schema({
    userId: Number,
    cartId: String,
    totalPrice: Number,
    city: String,
    street: String,
    deliveryDate: String,
    orderDate: String,
    creditCard: Number
});


var ordersModel = mongoose.model('orders', orders_Schema);

module.exports = ordersModel;

