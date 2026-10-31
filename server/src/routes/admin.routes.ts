import { Router } from 'express';
import { authenticate, requireAdmin } from '../middleware/auth.middleware.js';
import { notImplemented } from '../middleware/not-implemented.js';

const router = Router();
router.use(authenticate, requireAdmin);

// TODO: GET /users
router.get('/users', notImplemented);

// TODO: GET /loans — include user summary
router.get('/loans', notImplemented);

// TODO: POST /loans/:loanId/status — { action }
router.post('/loans/:loanId/status', notImplemented);

// Bonus
router.get('/risk-scores', notImplemented);
router.get('/fraud-alerts', notImplemented);
router.get('/audit-logs', notImplemented);

export default router;
