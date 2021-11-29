import express from 'express';
import { currentUser } from '@vitoraatickets/common';

const router = express.Router();

router.get('/api/users/current_user', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };