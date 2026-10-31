import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { notImplemented } from '../middleware/not-implemented.js';

const router = Router();
router.use(authenticate);

// TODO: GET / — accounts owned by req.user
router.get('/', notImplemented);

// TODO: GET /link/config — demo institutions (see docs/API.md)
router.get('/link/config', notImplemented);

// TODO: POST /link/token — optional Plaid-style token; UI ignores failure
router.post('/link/token', notImplemented);

// TODO: POST /link — { institutionId } create account + seed mock transactions
router.post('/link', notImplemented);

// TODO: POST /:id/sync — refresh an owned account
router.post('/:id/sync', notImplemented);

export default router;
