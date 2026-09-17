import type { Request, Response } from 'express';

type Order = { id: string; customerId: string; status: string };

export class OrdersController {
  constructor(
    private readonly orders: {
      getOrder(id: string): Promise<Order>;
      listOrders(filter: { customerId: string }): Promise<{ orders: Order[] }>;
      updateStatus(id: string, status: string): Promise<Order>;
      cancelOrder(id: string): Promise<Order>;
    }
  ) {}

  getById = async (req: Request, res: Response): Promise<void> => {
    const order = await this.orders.getOrder(req.params.id as string);
    res.json(order);
  };

  list = async (req: Request, res: Response): Promise<void> => {
    const customerId = (req as Request & { customerId?: string }).customerId as string;
    const { orders } = await this.orders.listOrders({ customerId });
    res.json({ orders });
  };

  updateStatus = async (req: Request, res: Response): Promise<void> => {
    const order = await this.orders.updateStatus(req.params.id as string, req.body.status);
    res.json(order);
  };

  cancel = async (req: Request, res: Response): Promise<void> => {
    const order = await this.orders.cancelOrder(req.params.id as string);
    res.json(order);
  };
}
