import express from 'express';
import jwt from 'jsonwebtoken';
import { environment } from '../environment';
import { currentUser } from '../middlewares/current-user';

const router = express.Router();

router.get('/api/users/current_user', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };