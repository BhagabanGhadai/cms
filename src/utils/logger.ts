import { createLogger, format, transports } from 'winston';

const LOG_DIR = 'logs';

class LogManager {
  private static instance: LogManager;
  public logger;

  private constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json(),
        format((info) => {
          return info;
        })()
      ),
      transports: [
        new transports.File({
          filename: `${LOG_DIR}/error.log`,
          level: 'error',
        }),
        new transports.File({ filename: `${LOG_DIR}/combined.log` }),
      ],
    });

    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
        })
      );
    }
  }

  public static getInstance(): LogManager {
    if (!LogManager.instance) {
      LogManager.instance = new LogManager();
    }

    return LogManager.instance;
  }

  public getLogger() {
    return this.logger;
  }
}

export default LogManager.getInstance().getLogger();
