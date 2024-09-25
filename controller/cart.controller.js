import mongoose from "mongoose";
import Cart from "../model/cart.model.js";
import Product from '../model/product.model.js';

export const postCart = async (req, res) => {
    const { prodId, quantity } = req.body;
     console.log("Request Body:", req.body);
    if (!prodId || !quantity)
    {
        return res.status(400).json({message:'Add all fields'})
    }
   
    try {
        const product = await Product.findById(prodId);
        if (!product)
        {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (quantity > product.stock)
        {
            return res.status(400).json({ message: 'Requested quantity exceeds stock' });
        }
        const cartItem = new Cart({ prodId: prodId, quantity: quantity });

        await cartItem.save();
        res.status(201).json({message:'Product Added to cart',data:cartItem})
    }
    catch(err) {
       res.status(500).json({ message: `Error Adding Product to cart ${err}` });
    }
}

export const putCart = async (req, res) => {
    const Id = req.params.id;
    try {
        const CartItem = await Cart.findByIdAndUpdate(Id, req.body, {
            new: true,
            runValidator: true,
        });
        if (!CartItem) {
            return res.status(400).json({ success: false, message: 'CartItem not Found' })
        }
        res.status(200).json({ success: true, data: CartItem });
        
    }
    catch (err) {
        res.status(500).json({ success: false, message: `Error:${err}` });
    }
}

export const deleteCart = async (req, res) => {
    const Id = req.params.id;
    try {
        const CartItemToBeDeleted = await Cart.findByIdAndDelete(Id);
        if (!CartItemToBeDeleted)
        {
            return res.status(400).json({ success: false, message: `Cart item not Found` });
        }
        res.status(200).json({ success: true, message: `Cart item Removed` ,data:CartItemToBeDeleted });
    }
    catch (err) {
        res.status(500).json({ success: false, message: `Error:${err}` });
    }
}