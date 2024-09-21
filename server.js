import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

const app = new express();

app.listen(5100, () =>
{   
    console.log('Server Started at 5100');
    connectDB();
})