import express from 'express';
import { postCart} from '../controller/cart.controller.js';

const router = express.Router();

router.post('/',postCart);
// router.put('/:id',putCart );
// router.delete('/:id', deleteCart);

export default router;