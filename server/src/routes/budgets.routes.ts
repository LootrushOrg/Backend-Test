import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { notImplemented } from '../middleware/not-implemented.js';

const router = Router();
router.use(authenticate);

// TODO: GET / — caller's budgets
router.get('/', notImplemented);

// TODO: POST / — { name, category, amount, startDate, period }
router.post('/', notImplemented);

export default router;
