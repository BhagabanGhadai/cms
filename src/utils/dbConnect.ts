import mongoose from "mongoose";
import env from '../config/index'
import logger from "./logger";
import config from "../config/index";

export const connectWithMongoDb = async () => {
    const MONGODB_URI = config.MONGODB_URI;
  
    logger.info("Connecting to MongoDB...");
    mongoose.connection.once("open", () => {
      logger.info("MongoDB connection is open");
    });
    mongoose.connection.on("error", (error) => {
      logger.error("MongoDB connection error", error);
    });
  
    await mongoose.connect(env.MONGO_URI, {
      autoIndex: true,
      autoCreate: true,
    });
    logger.info("Connected to MongoDB");
  };
  
export const disconnectWithMongoDb = async () => {
    logger.info("Disconnecting from MongoDB...");
    await mongoose.disconnect();
    logger.info("Disconnected from MongoDB");
  };