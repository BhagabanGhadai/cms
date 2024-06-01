import axios from 'axios';
import csvParser from 'csv-parser';
import { CaseModel } from '../models/caseMode';
import logger from './logger';

export const processCSV = async (url: string): Promise<void> => {
    try {
        const response = await axios.get(url, { responseType: 'stream' });

        const csvData: string[] = [];
        response.data.pipe(csvParser())
            .on('data', (data: any) => {
                csvData.push(data);
            })
            .on('end', async() => {
                await CaseModel.insertMany(csvData,{ ordered: false })
                logger.info('CSV file successfully processed');
            });
    } catch (error) {
        console.error('Error fetching CSV:', error);
    }
};
