import express from 'express';
import { requireAuth } from '@vitoraatickets/common'

const router = express.Router();

router.post('/api/tickets', requireAuth, (req, res) => {
  res.send({});
});

export { router as createTicketRouter };