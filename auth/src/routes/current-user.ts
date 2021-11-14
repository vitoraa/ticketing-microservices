import express from 'express';

const router = express.Router();

router.get('/api/current_user', (req, res) => {
  res.send({
    currentUser: 'teste',
  });
});

export { router as currentUserRouter };