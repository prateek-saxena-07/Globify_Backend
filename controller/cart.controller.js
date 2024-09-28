import Cart from "../model/cart.model.js";
import Product from '../model/product.model.js';
import mongoose from "mongoose";

export const postCart = async (req, res) => {
    const { prodId, quantity } = req.body;
    //Validating ProductId and Quantity
    if (!prodId || !quantity)
    {
        return res.status(400).json({message:'Add all fields'})
    }
//validating Proper Product Id format in accordance to MongooseDB
    if (!mongoose.isValidObjectId(prodId)) {
        return res.status(400).json({ message: 'Invalid Product ID format.' });
    }

    try {
        const product = await Product.findById(prodId);
        if (!product || product.stock < quantity) {
            return res.status(404).json({ message: 'Invalid Product or insufficient Stock ' });
        }
       
        const cart = await Cart.findOne({ userId: req.user.id });
        //Adding Cart item to new User
        if (!cart) {
            const newCart = new Cart({ userId: req.user.id, items: [{ prodId, quantity }] });
            await newCart.save();
            return res.status(201).json(newCart);
        }
        //Adding CartItem to an existing user
        cart.items.push({ prodId, quantity });
        await cart.save();
        res.status(200).json(cart);
    }
    catch(err) {
       res.status(500).json({ message: `Error Adding Product to cart ${err}` });
    }
}

export const putCart = async (req, res) => {
     const { quantity } = req.body;

    // Validate if quantity is provided and is a valid number
    if (!Number.isInteger(quantity)) {
        return res.status(400).json({ success: false, message: 'Invalid quantity. Quantity must be a positive integer.' });
    }
    
    //Updating Cartitem for user
    try {
        const CartItem = await Cart.findOneAndUpdate(
            { userId: req.user.id, 'items.prodId': req.params.id },
            { $set: { 'items.$.quantity': req.body.quantity } },
            { new: true });
        if (!CartItem) {
            return res.status(400).json({ success: false, message: 'CartItem not Found' })
        }
        res.status(200).json({ success: true, data: CartItem });
        
    }
    catch (err) {
        res.status(500).json({ success: false, message: `Error Updating Cart:${err}` });
    }
}

export const deleteCart = async (req, res) => {
    try {
        const CartItemToBeDeleted =  await Cart.findOneAndUpdate(
            { userId: req.user.id },
            { $pull: { items: { prodId: req.params.id } } },
            { new: true }
        );
        if (!CartItemToBeDeleted)
        {
            return res.status(400).json({ success: false, message: `Cart item not Found` });
        }
        res.status(200).json({ success: true, message: `Cart item Removed` ,data:CartItemToBeDeleted });
    }
    catch (err) {
        res.status(500).json({ success: false, message: `Error Removing from Cart:${err}` });
    }
}