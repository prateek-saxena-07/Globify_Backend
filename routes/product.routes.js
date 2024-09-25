import { createProduct, getAllProducts,getProduct} from "../controller/product.controller.js";
import express from 'express'

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);

export default router;