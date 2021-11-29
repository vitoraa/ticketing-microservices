import { currentUser } from '@vitoraatickets/common';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/users/current_user', currentUser, (req: Request, res: Response) => {
  res.send({ currentUser: null });
});


export { router as currentUserRouter };