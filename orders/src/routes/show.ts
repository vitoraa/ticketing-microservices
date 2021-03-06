import { NotAuthorizedError, NotFoundError, requireAuth } from '@vitoraatickets/common';
import express, { Request, Response } from 'express';
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  const userId = req.currentUser!.id;
  const order = await Order.findById(orderId).populate('ticket');

  if (!order) {
    throw new NotFoundError();
  }

  if (order.userId !== userId) {
    throw new NotAuthorizedError();
  }

  res.status(200).send(order);
});

export { router as showOrderRouter };