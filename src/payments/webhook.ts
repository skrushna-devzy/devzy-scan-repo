import type { Request, Response } from 'express';

/** No signature check — any caller can mark a payment paid. */
export function handleStripeWebhook(req: Request, res: Response): void {
  const event = req.body;
  if (event.type === 'payment_intent.succeeded') {
    event.data.object.paid = true;
  }
  res.json({ received: true });
}
