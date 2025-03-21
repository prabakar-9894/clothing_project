import express from "express";
import mongoose, { Types } from 'mongoose';
import Cart from "../models/CartModel.js"; 


const CartRouter = express.Router();

// Get all cart items
CartRouter.get('/api/carts', async (req, res) => {
  try {
    const cartPro = await Cart.find();
    res.json(cartPro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new product to the cart
CartRouter.post('/api/carts', async (req, res) => {
  try {
    const { userId, ProductId, Image, Name, Quantity, PricePerUnit } = req.body;

    if (!userId || !ProductId || !Image || !Name || !Quantity || !PricePerUnit) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const Price = PricePerUnit * Quantity;
    const cartsProduct = new Cart({ userId, ProductId, Image, Name, Quantity, Price, PricePerUnit });
    await cartsProduct.save();
    res.status(201).json({ message: 'Carts Product added successfully', cartsProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error adding Carts product', error });
  }
});




// Update cart item quantity
CartRouter.put('/api/carts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid cart ID' });
    }
    if (!Quantity || Quantity < 1) {
      return res.status(400).json({ message: 'Invalid quantity value' });
    }

    const cart = await Cart.findById(id);
    if (!cart) {
      // return res.status(404).json({ message: 'Cart item not found' });
      return res.status(404).json({ message: 'Cart item not found' });
    }

    const updatedPrice = cart.PricePerUnit * Quantity;
    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      { Quantity, Price: updatedPrice },
      { new: true }
    );

    res.json({ success: true, updatedCart });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



CartRouter.delete('/api/carts/:id', async (req, res) => {
  try {
      console.log('Deleting cart with ID:', req.params.id);

      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
          console.error('Invalid cart ID:', id);
          return res.status(400).json({ message: 'Invalid cart ID' });
      }

      const deletedCart = await Cart.findByIdAndDelete(id);
      if (!deletedCart) {
          console.error('Cart item not found:', id);
          return res.status(404).json({ message: 'Cart item not found' });
      }

      console.log('Successfully deleted cart:', deletedCart);
      res.status(200).json({ message: 'Cart item deleted successfully' });
  } catch (error) {
      console.error('Error deleting cart:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


export default CartRouter;