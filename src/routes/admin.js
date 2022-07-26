import { Router } from 'express';
import Admin from '../controllers/Admin';

const router = new Router();

router.get('/:id', Admin.show);
router.post('/', Admin.create);
router.put('/:id', Admin.update);
router.delete('/:id', Admin.delete);
router.post('/token', Admin.getToken);

export default router;
