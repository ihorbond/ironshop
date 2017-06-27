const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myProductSchema = new Schema ({
   name: {type: String},
   price: {type: Number, default: 1},
   imageUrl: {type: String, default: '/images/product.gif'},
   description: {type: String}
});

const ProductModel = mongoose.model('Product', myProductSchema);
//Product is a collection. Product -> products -> db.products.find()

module.exports = ProductModel;
