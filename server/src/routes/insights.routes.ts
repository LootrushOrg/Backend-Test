import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { notImplemented } from '../middleware/not-implemented.js';

const router = Router();
router.use(authenticate);

// TODO: GET /monthly — spend vs budget for the current month (positive spend totals)
router.get('/monthly', notImplemented);

export default router;
