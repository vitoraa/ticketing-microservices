import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/api/payments', async (req: Request, res: Response) => {
  res.send({});
});

export { router as createChargeRouter };