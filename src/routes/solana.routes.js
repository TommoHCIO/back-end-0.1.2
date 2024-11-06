import { Router } from 'express';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { config } from '../config/index.js';

const router = Router();
const connection = new Connection(clusterApiUrl(config.solanaNetwork));

router.get('/balance/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const publicKey = new PublicKey(address);
    const balance = await connection.getBalance(publicKey);
    res.json({ balance: balance / 1e9 });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/account/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const publicKey = new PublicKey(address);
    const accountInfo = await connection.getAccountInfo(publicKey);
    res.json({ accountInfo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/recent-blocks', async (req, res) => {
  try {
    const blocks = await connection.getRecentBlockhash();
    res.json({ blocks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;