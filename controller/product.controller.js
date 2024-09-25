import Product from '../model/product.model.js'
// import mongoose from 'mongoose'

export const getAllProducts = async (req, res) => {
    try {
        const product = await Product.find();
        res.status(200).json(product);
    }
    catch (err)
    {
        res.status(500).json({ success: false, message: `Error:${err}` });
    }
}
export const createProduct = async (req, res) => {
    const { name, price, description, stock } = req.body;
    if (!name || !price || !stock)
    {
        return res.status(400).json({message:'Add all fields'})
    }
     const product = new Product({ name, price, description, stock });
    try {
       
        await product.save();
        res.status(201).json(product);
    }
    catch (err) {
        res.status(500).json({ message: 'Error Adding Product' });
    }
}

export const getProduct = async (req, res) => {
    const Id = req.params.id;
    try {
        const product = await Product.findById(Id);
        if (!product) {
            return res.status(400).json({ success: false, message: 'Product not Found' });

      
        }
          res.status(200).json({success:true,data:product})

        
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

