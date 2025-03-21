import mongoose, { Types } from 'mongoose';


  // Define Cart Schema
const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  ProductId: { type: Types.ObjectId, required: true },
  Image: { type: String, required: true },
  Name: { type: String, required: true },
  Quantity: { type: Number, required: true },
  Price: { type: Number, required: true },
  PricePerUnit: { type: Number, required: true } // Added this field for price calculation
});

const Cart = mongoose.model('Carts', cartSchema);

export default Cart;

