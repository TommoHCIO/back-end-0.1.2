import express from 'express';
import { config } from './config/index.js';
import { corsMiddleware } from './middleware/cors.js';
import { errorHandler } from './middleware/errorHandler.js';
import solanaRoutes from './routes/solana.routes.js';

const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: config.nodeEnv
  });
});

// Routes
app.use('/api', solanaRoutes);

// Error handling
app.use(errorHandler);

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Start server
const server = app.listen(config.port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${config.port} in ${config.nodeEnv} mode`);
  console.log(`🌐 CORS enabled for origin: ${config.corsOrigin}`);
  console.log(`⛓️ Connected to Solana ${config.solanaNetwork}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export default server;