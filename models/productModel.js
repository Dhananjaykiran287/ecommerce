const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  name: { type: String,  },
  sku: { type: String,  },
  additionalCost: { type: Number, default: 0 },
  stockCount: { type: Number, default: 0 },
});

const productSchema = new mongoose.Schema({
  name: { type: String,  },
  description: { type: String,  },
  price: { type: Number,  },
  variants: [variantSchema],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
