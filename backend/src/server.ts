import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import groupRoute from './routes/group.routes';
import expenseRoute from './routes/expense.routes';
import settlementRoute from './routes/settlement.routes';
import staticRoute from './routes/static.route';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const logger = pino({ level: 'info' });
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(pinoHttp({ logger }));

// Serve static frontend files
// app.use(express.static(path.join(__dirname, '../../frontend')));

// API Routes buraya əlavə edin
app.use('/api', groupRoute);
app.use('/api', expenseRoute);
app.use('/api', settlementRoute);
app.use('/api', staticRoute);

//! Serve frontend for all other routes(helelik commente aldiq)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../frontend/index.html'));
// });

app.get('/', (req, res) => { //! muveqqeti test ucun
  res.send("YENI_APP")
})

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
