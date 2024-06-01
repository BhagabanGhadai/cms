import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from './utils/logger';
import caseRoutes from './routes/caseRoutes';

export const createExpressApp = () => {
  const expressApp = express();
  expressApp.use(helmet());
  expressApp.use(express.urlencoded({ extended: true }));
  expressApp.use(express.json());
  expressApp.use(cors())
  expressApp.use('/cases', caseRoutes);
  
    expressApp.use((req, res, next) => {
      // Log an info message for each incoming request
      logger.info(`${req.method} ${req.originalUrl}`);
      next();
    });
    return expressApp
}

