import { NotFoundError, requireAuth, validateRequest } from '@vitoraatickets/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';
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

  res.send({});
});

export { router as newOrderRouter };