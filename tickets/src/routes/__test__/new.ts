import express from 'express';

const router = express.Router();

router.post('/api/tickets', (req, res) => {
  res.send({});
});

export { router as newTicketRouter };