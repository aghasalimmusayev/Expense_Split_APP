import express from 'express';
import { httpLogger, logger } from '@middlewares/logger';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { corsMiddleware } from '@middlewares/cors';
import { notFound } from '@middlewares/notFound.middleware';
import { errorHandler } from '@middlewares/errorHandler';
import router from '@routes/all.routes';
import { env } from '@utils/env';
config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(httpLogger)

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../../frontend')));

app.use('/api', router);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

app.use(notFound)
app.use(errorHandler)

app.listen(env.PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${env.PORT}`);
});
