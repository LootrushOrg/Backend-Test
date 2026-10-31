import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { notImplemented } from '../middleware/not-implemented.js';

const router = Router();
router.use(authenticate);

// Bonus — not called by the current UI
router.post('/', notImplemented);

export default router;
