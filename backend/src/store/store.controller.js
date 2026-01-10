// backend/src/store/store.controller.ts
import express from 'express';
import { selectBestAd } from '../trading/ad.ai';

const router = express.Router();

// POST /api/store/select-best-ad
router.post('/select-best-ad', async (req, res) => {
  try {
    const { userBehavior } = req.body;

    if (!userBehavior) {
      return res.status(400).json({ error: 'Missing userBehavior' });
    }

    // Call your AI logic safely
    const bestAd = selectBestAd(userBehavior);

    return res.json(bestAd);
  } catch (err) {
    console.error('Failed to select best ad:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;