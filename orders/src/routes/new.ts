import { BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest } from '@vitoraatickets/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { Ticket } from '../models/ticket';

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

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

  const isReserved = await ticket.isReserved();

  if (isReserved) {
    throw new BadRequestError('Ticket is already reserved');
  }

  const expiration = new Date();
  expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

  res.send({});
});

export { router as newOrderRouter };