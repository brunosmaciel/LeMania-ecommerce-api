import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    unique: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productImages: [{
    type: String,
    required: true,
  }],
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: false,
  },
  isInPromotion: {
    type: Boolean,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,

});

const Product = mongoose.model('Product', Schema);

export default Product;
