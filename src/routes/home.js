import { Router } from 'express';
import Home from '../controllers/Home';

const router = new Router();

router.get('/', Home.index);

export default router;
