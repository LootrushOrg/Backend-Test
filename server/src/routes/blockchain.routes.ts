import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { notImplemented } from '../middleware/not-implemented.js';

const router = Router();
router.use(authenticate);

// Bonus: GET /me — simulation hashes are fine (see docs/API.md)
router.get('/me', notImplemented);

export default router;
