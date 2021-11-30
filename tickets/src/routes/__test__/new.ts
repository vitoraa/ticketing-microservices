import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@vitoraatickets/common'
import { body } from 'express-validator';

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
  ], validateRequest, (req: Request, res: Response) => {
    res.send({});
  });

export { router as createTicketRouter };