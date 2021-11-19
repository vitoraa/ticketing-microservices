import express from 'express';
import jwt from 'jsonwebtoken';
import { environment } from '../environment';

const router = express.Router();

router.get('/api/users/current_user', (req, res) => {
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }

  try {
    const payLoad = jwt.verify(req.session.jwt, environment.jwt_key);
    return res.send({ currentUser: payLoad });
  } catch (error) {
    return res.send({ currentUser: null });
  }

});

export { router as currentUserRouter };