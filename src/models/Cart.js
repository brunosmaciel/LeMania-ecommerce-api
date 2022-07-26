import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  products: {
    type: mongoose.Schema.Types.Array,
    require: true,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    unique: true,
  },
}, {
  versionKey: false,

});

const Cart = mongoose.model('Cart', Schema);

export default Cart;
