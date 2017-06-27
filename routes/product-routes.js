const express = require('express');
const router = express.Router();
const ProductModel = require('../models/product-model.js');

router.get('/products', (req, res, next) => {
  ProductModel.find((err, productResults) => {
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

// STEP #1 of form submission for new product creation
router.get('/products/new', (req, res, next) => {
  res.render('product-views/new-product-view.ejs');
});

// STEP #2 of form submission for a new product creation
// < form method="post" action="/products">
//       |                      |
//       |        --------------
//       |       |
router.post('/products', (req, res, next) => {
 const theProduct = new ProductModel({
    name: req.body.productName,
    price: req.body.productPrice,
    imageUrl: req.body.productImageUrl,
    description: req.body.productDescription
  });
  theProduct.save((err) => {
    if (err) {
      next(err);
      return;
    }
    res.redirect('/products');
  });
});


router.get('/products/:myId/details', (req, res, next) => {
  //getting id from "/products/details?myId=<%= oneProduct._id %>"
  let id = req.params.myId;
  ProductModel.findById(
     id,                        //id to find in DB
    (err, theProduct) => {     //callback
      if (err) {
        next(err);
        return;
      }
      // res.locals.productDetails = theProduct;
      res.render('product-views/product-details-view.ejs',
      { productDetails: theProduct }
    );
    }
  );
});

//STEP #1 of product update: show the product before editing
router.get('/products/:myId/update', (req, res, next) => {
  let id = req.params.myId;
  ProductModel.findById(
    id,
    (err, theProduct) => {
      if (err) {
        next(err);
        return;
      }
      res.locals.productDetails = theProduct;
      res.render('product-views/edit-product-view.ejs');
    });
});

//STEP #2 of product update:
router.post('/products/:myId/update', (req, res, next) => {
  ProductModel.findByIdAndUpdate(
    req.params.myId,                        //1st argument: id of the documnet to update
    { name:       req.body.productName,    //2nd argument: object of feilds to update
      price:      req.body.productPrice,
      imageUrl:   req.body.productImageUrl,
      description:req.body.productDescription
    },
    (err, theProduct) => {                    //3rd argument: callback
      if (err) {
        next(err);
        return;
      }
      res.redirect('/products');
    }
  );
});

router.post('/products/:myId/delete', (req, res, next) => {
  ProductModel.findByIdAndRemove(
    req.params.myId,
    (err, theProduct) => {
      if (err) {
       next(err);
       return;
      }
      res.redirect('/products');
    }
  );
});




module.exports = router;
