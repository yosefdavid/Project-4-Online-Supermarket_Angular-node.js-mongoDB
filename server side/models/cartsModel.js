const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var carts_Schema = new Schema({
    userId: Number,
    cartDate: String,
    isOpen: Boolean
});


var cartsModel = mongoose.model('carts', carts_Schema);

module.exports = cartsModel;

