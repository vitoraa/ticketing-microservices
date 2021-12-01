import { NotFoundError, requireAuth } from '@vitoraatickets/common';
import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.put('/api/tickets/:id', requireAuth, async (req: Request, res: Response) => {
  const id = req.params.id;
  const ticket = await Ticket.findById(id);

  if (!ticket) {
    throw new NotFoundError();
  }
});

export { router as updateTicketRouter };