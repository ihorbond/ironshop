//SEED FILE is a JS that saves things to your database when you run it
const Product = require('../models/product-model.js');
//connect to db again since seed.js is separate from app.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ironshop');

const productInfoArray = [
  {
    name: 'Phone Case',
    price: 9.99,
    imageUrl: 'https://media.giphy.com/media/j3jj0fu5wqktq/giphy.gif',
    description: 'Protects your phone'
  },
  {
    name: 'Bean Bag',
    price: 25,
    imageUrl: 'https://media.giphy.com/media/FCACuwkULerp6/giphy.gif',
    description: 'So comfortable you can fall on it'
  },
  {
    name: 'Box of Tissues',
    price: 4.99,
    imageUrl: 'https://media.giphy.com/media/DwDBOl8W7f3UI/giphy.gif',
    description: 'Everyday purpose tissues'
  },
  {
    name: 'Yoga Mat',
    price: 29.99,
    imageUrl: 'http://i.imgur.com/XtpFrW7.jpg',
    description: 'Keeps your knees safe, slip proof, sweat proof. Top of the line',
  },
  {
    name: '20" monitor',
    price: 249.99,
    imageUrl: 'http://i.imgur.com/5ICGeY0.jpg',
    description: 'Large enough for even the heaviest gamer. Crisp, fresh, no dead pixels guarantee',
  },
  {
    name: 'Soylent',
    price: 54.99,
    imageUrl: 'http://media.gq.com/photos/57c6f39209f7003c4afd2c4d/3:2/w_800/drink_gallery5.546e2142f4c6.jpg',
    description: 'You never have to leave your computer! All you can eat nutrition!',
  }
];

Product.create (
  productInfoArray,          //array of product info objects
  (err, productResults) => { //callback!
     if (err) {
       console.log("Database error");
       return;
     }
     productResults.forEach((oneProd) => {
       console.log('New Product!' + oneProd.name);
     });
  mongoose.connection.close();
  }
);
