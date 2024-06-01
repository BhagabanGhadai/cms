import Joi from 'joi';

export const schema = Joi.object().keys({
  NODE_ENV: Joi.string().valid("development", "production", "test").default("development"),
  MONGO_URI: Joi.string().required().description('Mongo DB url'),
  PORT: Joi.number().min(1000).default(8000),
  CSV_URL:Joi.string().required().description('goole doc url to read the csv file')
}).unknown()
