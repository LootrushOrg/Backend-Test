import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { authenticate } from '../middleware/auth.middleware.js';
import { AppError } from '../middleware/error.middleware.js';
import { env } from '../config/env.js';
import { users } from '../store.js';

const router = Router();

function publicUser(user: (typeof users)[number]) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };
}

function signToken(user: (typeof users)[number]) {
  return jwt.sign(
    { userId: user.id, role: user.role },
    env.jwt.secret,
    { expiresIn: env.jwt.expiresIn as jwt.SignOptions['expiresIn'] }
  );
}

function sandboxLogin(_req: import('express').Request, res: import('express').Response, next: import('express').NextFunction) {
  try {
    if (!env.demoLogin) {
      throw new AppError(403, 'Sandbox login is disabled', 'FORBIDDEN');
    }
    const user = users.find((u) => u.role === 'user') ?? users[0];
    if (!user) throw new AppError(500, 'Sandbox user missing', 'NO_USER');
    res.json({ accessToken: signToken(user), user: publicUser(user) });
  } catch (err) {
    next(err);
  }
}

router.post('/demo-login', sandboxLogin);
/** @deprecated use POST /demo-login */
router.post('/interview-login', sandboxLogin);

router.get('/me', authenticate, (req, res, next) => {
  try {
    const user = users.find((u) => u.id === req.user!.userId);
    if (!user) throw new AppError(401, 'User not found', 'UNAUTHORIZED');
    res.json(publicUser(user));
  } catch (err) {
    next(err);
  }
});

export default router;
