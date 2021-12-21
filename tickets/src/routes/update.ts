import { BadRequestError, NotAuthorizedError, NotFoundError, requireAuth, validateRequest } from '@vitoraatickets/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher';
import { Ticket } from '../models/ticket';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put('/api/tickets/:id',
  [body('title')
    .isString()
    .notEmpty()
    .withMessage('Title must be provided'),
  body('price')
    .isFloat({ gt: 0 })
    .notEmpty()
    .withMessage('Price must be provided')], validateRequest, requireAuth, async (req: Request, res: Response) => {
      const id = req.params.id;
      const ticket = await Ticket.findById(id);

      if (!ticket) {
        throw new NotFoundError();
      }

      if (ticket.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
      }

      if (ticket.orderId) {
        throw new BadRequestError('Cannot edit a reserved ticket');
      }

      ticket.set({
        title: req.body.title,
        price: req.body.price
      });

      await ticket.save();
      await new TicketUpdatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
        version: ticket.version
      });
      res.send(ticket);
    });

export { router as updateTicketRouter };