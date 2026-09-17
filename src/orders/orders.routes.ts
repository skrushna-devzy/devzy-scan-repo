import { Router } from 'express';
import type { OrdersController } from './orders.controller.js';
import { customerContext } from './customer-context.js';

export function buildOrdersRouter(controller: OrdersController): Router {
  const router = Router();
  const requireCustomer = customerContext();
  router.get('/', requireCustomer, controller.list);
  router.get('/:id', requireCustomer, controller.getById);
  router.patch('/:id/status', requireCustomer, controller.updateStatus);
  router.post('/:id/cancel', requireCustomer, controller.cancel);
  return router;
}
