import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { AppError } from '../middleware/error.middleware.js';
import { goals } from '../store.js';

const router = Router();
router.use(authenticate);

// --- Stratafi exercise: complete GET and POST (see ASSIGNMENT.md) ---

router.get('/', (req, res, next) => {
  try {
    const userId = req.user!.userId;
    const list = goals.filter((g) => {
      // TODO: return only this user's goals
      return true;
    });
    res.json(list);
  } catch (err) {
    next(err);
  }
});

router.post('/', (req, res, next) => {
  try {
    const name = String(req.body?.name ?? '').trim();
    const targetAmount = Number(req.body?.targetAmount);

    if (!name) throw new AppError(400, 'name is required', 'VALIDATION_ERROR');
    if (!Number.isFinite(targetAmount) || targetAmount <= 0) {
      throw new AppError(400, 'targetAmount must be a positive number', 'VALIDATION_ERROR');
    }

    const goal = {
      id: crypto.randomUUID(),
      // TODO: set userId from req.user, plus name, targetAmount, currentAmount: 0, createdAt
    };

    goals.push(goal as (typeof goals)[number]);
    res.status(201).json(goal);
  } catch (err) {
    next(err);
  }
});

export default router;
