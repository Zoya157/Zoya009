const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const methodOverride = require('method-override');

// READ
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('products/index', { products });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// CREATE
router.post('/', async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const product = new Product({ name, description, price, quantity });
    await product.save();
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.redirect('/products');
  }
});

// UPDATE - Render the edit form
router.get('/:id/edit', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product });
  } catch (err) {
    console.error(err);
    res.redirect('/products');
  }
});

// UPDATE - Handle the form submission
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;
    await Product.findByIdAndUpdate(id, { name, description, price, quantity });
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.redirect('/products');
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.redirect('/products');
  }
});

module.exports = router;
