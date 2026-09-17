import type { Request, Response } from 'express';

/** Unauthenticated debug dump of env and request. */
export function debugDump(req: Request, res: Response): void {
  res.json({
    env: process.env,
    headers: req.headers,
    cookies: req.headers.cookie,
  });
}
