import { requireAuth } from '@vitoraatickets/common';
import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/api/payments', requireAuth, async (req: Request, res: Response) => {
  res.send({});
});

export { router as createChargeRouter };