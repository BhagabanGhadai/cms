import cron from 'node-cron';
import { processCSV } from './csvParser';
import config from '../config';
import logger from './logger';

export const scheduleJobs = () => {
    cron.schedule('0 10,17 * * *', async () => {
        try {
            logger.info('Starting CSV processing job');
            await processCSV(config.CSV_URL);
        } catch (error) {
            logger.error('Error during CSV processing job:', error);
        }
    });
};
