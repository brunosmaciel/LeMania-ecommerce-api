import { Router } from 'express';
import Customer from '../controllers/Customer';

const router = new Router();

router.post('/', Customer.create);
router.get('/', Customer.index);// read
router.get('/:id', Customer.show);// read
router.put('/:id', Customer.update);// read
router.delete('/:id', Customer.delete);// read

export default router;
