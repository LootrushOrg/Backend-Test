import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { notImplemented } from '../middleware/not-implemented.js';

const router = Router();
router.use(authenticate);

// Bonus: persist CoachMessage rows; OpenAI if configured, else a local fallback
router.get('/history', notImplemented);
router.post('/chat', notImplemented);
router.delete('/history', notImplemented);

export default router;
