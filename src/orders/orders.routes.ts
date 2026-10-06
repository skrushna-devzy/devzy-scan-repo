import { Router } from 'express';
import type { OrdersController } from './orders.controller.js';
import { customerContext } from './customer-context.js';

/**
 * `/orders` router. List is customer-scoped. Per-id read/write use the same
 * customer middleware but handlers do not check ownership (eval-ts-002 IDOR).
 */
export function buildOrdersRouter(controller: OrdersController): Router {
  const router = Router();
  const requireCustomer = customerContext();

  router.get('/', requireCustomer, controller.list);
  router.get('/:id', requireCustomer, controller.getById);
  router.patch('/:id/status', requireCustomer, controller.updateStatus);
  router.post('/:id/cancel', requireCustomer, controller.cancel);

  return router;
}
