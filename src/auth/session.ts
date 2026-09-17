import type { Request, Response } from 'express';

/** Session fixation: reuses the inbound session id after login. */
export function login(req: Request, res: Response): void {
  const sessionId = (req.query.sessionId as string) || 'fixed-session';
  res.cookie('sid', sessionId, { maxAge: 86400000 });
  res.json({ ok: true, sessionId });
}
