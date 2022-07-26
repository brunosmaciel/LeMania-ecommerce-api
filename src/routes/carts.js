import { Router } from 'express';
import Cart from '../controllers/Cart';

const router = new Router();

router.post('/', Cart.create);
router.get('/', Cart.index);
router.get('/:cartId', Cart.show);
router.put('/:cartId', Cart.update);

export default router;
