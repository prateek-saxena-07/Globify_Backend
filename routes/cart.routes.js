import express from 'express';
import { postCart, putCart, deleteCart } from '../controller/cart.controller.js';
import authMiddleWare from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/',authMiddleWare,postCart);
router.put('/:id',authMiddleWare,putCart );
router.delete('/:id',authMiddleWare, deleteCart);

export default router;