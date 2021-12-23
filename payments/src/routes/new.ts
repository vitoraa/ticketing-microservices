import { requireAuth, validateRequest } from '@vitoraatickets/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';

const router = express.Router();

router.post('/api/payments', requireAuth,
  [
    body('token').not().isEmpty(),
    body('orderId').not().isEmpty()
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    res.send({});
  });

export { router as createChargeRouter };