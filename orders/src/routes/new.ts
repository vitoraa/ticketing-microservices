import { BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest } from '@vitoraatickets/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { Order } from '../models/order';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.post('/api/orders', requireAuth, [
  body('ticketId')
    .not()
    .isEmpty()
    .withMessage('TicketId must be provided')
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
], validateRequest, async (req: Request, res: Response) => {
  const { ticketId } = req.body;
  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw new NotFoundError();
  }

  const existingOrder = await Order.findOne({
    ticket: ticket,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete
      ]
    }
  });

  if (existingOrder) {
    throw new BadRequestError();
  }

  res.send({});
});

export { router as newOrderRouter };