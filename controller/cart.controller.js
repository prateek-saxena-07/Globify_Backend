import mongoose from "mongoose";
import Cart from "../model/cart.model.js";

export const postCart = async (req, res) => {
    const { name, quantity } = req.body;
    if (!name || !quantity)
    {
        return res.status(400).json({message:'Add all fields'})
    }
    const cartItem = new Cart({ name, quantity });
    try {
        
        await cartItem.save();
        res.status(201).json({message:'Product Added to cart',data:cartItem})
    }
    catch(err) {
       res.status(500).json({ message: 'Error Adding Product to cart' });
    }
}

// export const putCart = async (req, res) => {
    
// }

// export const deleteCart = async (req, res) => {
    
// }