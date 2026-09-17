import type { NextFunction, Request, Response } from 'express';

export function customerContext() {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const customerId = req.header('x-customer-id')?.trim();
    if (!customerId) {
      throw new Error('Missing customer context');
    }
    (req as Request & { customerId?: string }).customerId = customerId;
    next();
  };
}
