import config from './config';
import logger from './utils/logger';
import { scheduleJobs } from './utils/scheduler';
import { connectWithMongoDb } from './utils/dbConnect';
import { createExpressApp } from './app';

async function startWebServer() {
    logger.info("Starting web server...");
    const expressApp:any = createExpressApp();
    let server=await expressApp.listen(config.PORT)
    logger.info(`Server is running on ${server.address().address}:${server.address().port}`);
    await connectWithMongoDb();
    scheduleJobs()
  }


  startWebServer() 