import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  solanaNetwork: process.env.SOLANA_NETWORK || 'devnet',
  corsOrigin: process.env.CORS_ORIGIN || '*'
};