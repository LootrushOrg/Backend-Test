import { Router } from 'express';
import { authenticate, requireAdmin } from '../middleware/auth.middleware.js';
import { notImplemented } from '../middleware/not-implemented.js';

const router = Router();
router.use(authenticate);

// TODO: GET /me — { status, autoApprove, submission }
router.get('/me', notImplemented);

// TODO: POST /submit — create submission; honor KYC_AUTO_APPROVE
router.post('/submit', notImplemented);

// TODO: GET /admin — all submissions (admin)
router.get('/admin', requireAdmin, notImplemented);

// TODO: POST /admin/:id/review — { action: approve | reject }
router.post('/admin/:id/review', requireAdmin, notImplemented);

export default router;
