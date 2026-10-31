import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { notImplemented } from '../middleware/not-implemented.js';

const router = Router();
router.use(authenticate);

// TODO: GET /eligibility — score from user finances; persist LoanEligibilityResult
router.get('/eligibility', notImplemented);

// TODO: GET / — caller's loan applications
router.get('/', notImplemented);

// TODO: POST /apply — { amount, termMonths }; require verified KYC + approve + limit
router.post('/apply', notImplemented);

export default router;
