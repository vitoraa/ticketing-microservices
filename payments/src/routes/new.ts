import { requireAuth, validateRequest } from '@vitoraatickets/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Order } from '../models/order';

const router = express.Router();

router.post('/api/payments', requireAuth,
  [
    body('token').not().isEmpty(),
    body('orderId').not().isEmpty()
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.body.orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    res.send({});
  });

export { router as createChargeRouter };