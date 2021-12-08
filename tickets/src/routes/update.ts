import { NotAuthorizedError, NotFoundError, requireAuth, validateRequest } from '@vitoraatickets/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';

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

      res.send(ticket);
    });

export { router as updateTicketRouter };