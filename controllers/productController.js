const Product = require('../models/productModel');
const mongoose= require("mongoose")
const ObjectId = require("mongodb").ObjectId
const productController = {
  // Create a new product
  createProduct: async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a specific product by ID
  getProductById: async (req, res) => {
    try {
      const product = await Product.find({_id: (req.params.id)});
     
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a product by ID
  updateProductById: async (req, res) => {
    const allowedUpdates = ['name', 'description', 'price'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates' });
    }

    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
},

  // Delete a product by ID
  deleteProductById: async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Add variant to a product
  addVariantToProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      product.variants.push(req.body);
      await product.save();

      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update variant of a product by variant ID
  updateVariantById: async (req, res) => {
    const allowedUpdates = ['name', 'sku', 'additionalCost', 'stockCount'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ error: 'Invalid updates' });
    }

    try {
      const product = await Product.findOne({ 'variants._id': req.params.variantId });

      if (!product) {
        return res.status(404).json({ error: 'Variant not found' });
      }

      const variant = product.variants.id(req.params.variantId);

      updates.forEach(update => {
        variant[update] = req.body[update];
      });

      await product.save();

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete variant of a product by variant ID
  deleteVariantById: async (req, res) => {
    try {
      const product = await Product.findOne({ 'variants._id': req.params.variantId });

      if (!product) {
        return res.status(404).json({ error: 'Variant not found' });
      }

      product.variants.id(req.params.variantId).remove();
      await product.save();

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
 searchProducts : async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const searchRegex = new RegExp(query, 'i');
    const products = await Product.find({
      $or: [
        { name: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
        { 'variants.name': { $regex: searchRegex } },
      ],
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
},
};



module.exports = productController;
