import { Request, Response } from 'express';

/** Wired routes return this until you implement them. The UI treats it as a failed request. */
export function notImplemented(_req: Request, res: Response): void {
  res.status(501).json({
    error: 'Not implemented',
    code: 'NOT_IMPLEMENTED',
  });
}
