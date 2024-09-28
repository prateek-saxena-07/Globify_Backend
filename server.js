import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRouter from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js';
import authRouter from './routes/auth.routes.js';

//Entry Point File For the Server
dotenv.config();

const PORT=process.env.PORT||5100
const app = new express();

//For Parsing Json
app.use(express.json());
//Routes
app.use('/products',productRouter);
app.use('/cart', cartRouter);
app.use('/auth', authRouter);


app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
    //Establishing Connection To the Database
    connectDB();
});