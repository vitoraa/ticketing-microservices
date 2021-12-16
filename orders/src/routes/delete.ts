import { requireAuth } from '@vitoraatickets/common';
import express, { Request, Response } from 'express';

const router = express.Router();

router.delete('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {
  res.send({});
});

export { router as deleteOrderRouter };