import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { notImplemented } from '../middleware/not-implemented.js';

const router = Router();
router.use(authenticate);

// TODO: GET /categories — distinct categories for the caller's transactions
router.get('/categories', notImplemented);

// TODO: GET / — query: category, startDate, endDate, limit
router.get('/', notImplemented);

export default router;
