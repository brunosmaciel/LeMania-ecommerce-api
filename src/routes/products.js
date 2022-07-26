import { Router } from 'express';
import Product from '../controllers/Product';
import isAdmin from '../middlewares/isAdmin';

const router = new Router();

router.post('/', isAdmin, Product.create);
router.get('/', Product.index);
router.get('/:id', Product.show);
router.put('/:id', isAdmin, Product.update);
router.delete('/:id', isAdmin, Product.delete);

export default router;
