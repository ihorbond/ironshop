const express = require('express');
const router = express.Router();
const Product = require('../models/product-model.js');

router.get('/products', (req, res, next) => {
  Product.find((err, productResults) => {
    if (err) {
      //use next(err) to skip to the ERROR PAGE
      next(err);
      return;
    }
    res.render('product-views/products-list-view.ejs', {
      productsAndStuff: productResults
    });
  });
});

module.exports = router;
