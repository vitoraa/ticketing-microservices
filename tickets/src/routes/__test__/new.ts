import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@vitoraatickets/common'
import { body } from 'express-validator';

const router = express.Router();

router.post('/api/tickets', requireAuth,
  [body('title')
    .isString()
    .notEmpty()
  ], validateRequest, (req: Request, res: Response) => {
    res.send({});
  });

export { router as createTicketRouter };