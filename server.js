import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRouter from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js'

dotenv.config();

const app = new express();
app.use(express.json());
app.use('/products',productRouter);
app.use('/cart', cartRouter);

const PORT=5100
app.listen(PORT, () =>
{   
    console.log(`Server Started at ${PORT}`);
    connectDB();
})