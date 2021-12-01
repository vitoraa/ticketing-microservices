import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@vitoraatickets/common'
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  res.status(404).send();
});

export { router as createTicketRouter };