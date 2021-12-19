import { NotFoundError, OrderStatus, requireAuth } from '@vitoraatickets/common';
import express, { Request, Response } from 'express';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';
import { Order } from '../models/order';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.delete('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  const userId = req.currentUser!.id;
  const order = await Order.findOne({ userId, id: orderId }).populate('ticket');

  if (!order) {
    throw new NotFoundError();
  }

  order.status = OrderStatus.Cancelled;
  await order.save();

  await new OrderCancelledPublisher(natsWrapper.client).publish({
    id: order.id,
    ticket: {
      id: order.ticket.id
    }
  });

  res.send(order);
});

export { router as deleteOrderRouter };