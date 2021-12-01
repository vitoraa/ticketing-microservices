import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@vitoraatickets/common'
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.post('/api/tickets', requireAuth,
  [body('title')
    .isString()
    .notEmpty()
    .withMessage('Title must be provided'),
  body('price')
    .isFloat({ gt: 0 })
    .notEmpty()
    .withMessage('Price must be provided')
  ], validateRequest, async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = Ticket.build({ title, price, userId: req.currentUser!.id });
    await ticket.save();
    res.status(201).send(ticket);
  });

export { router as createTicketRouter };