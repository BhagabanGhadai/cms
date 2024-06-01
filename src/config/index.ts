import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { schema } from './config.schema';
import logger from '../utils/logger';

interface ConfigType {
  [key: string]: any;
}

class Config {
  private static instance: Config;
  public config: ConfigType;

  private constructor() {
    logger.info("Loading and validating config for the first time...");
    this.config = this.loadAndValidateConfig();
    logger.info("Config loaded and validated");
  }

  private loadAndValidateConfig(): ConfigType {
    const environment = process.env.NODE_ENV || "development";

    // 1. Load environment file from one level up and using __dirname
    const envFile = `.env.${environment}`;
    const envPath = path.join(__dirname, "../..", envFile);
    if (!fs.existsSync(envPath)) {
      throw new Error(`Environment file not found: ${envPath}`);
    }
    dotenv.config({ path: envPath });

    const finalConfig: ConfigType = {};
    for (const key in schema.describe().keys) {
      if (Object.prototype.hasOwnProperty.call(process.env, key)) {
        finalConfig[key] = process.env[key]; // Prioritize environment variables
      }
    }

    const { error, value: validatedConfig } = schema.prefs({ errors: { label: 'key' } }).validate(finalConfig);
    if (error) {
      const missingProperties = error.details.map((detail) => detail.path[0]);
      throw new Error(
        `Config validation error: missing properties ${missingProperties}`,
      );
    }
    return validatedConfig;
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }
}

export default Config.getInstance().config;
