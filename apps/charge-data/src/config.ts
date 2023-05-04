import * as dotenv from 'dotenv';

dotenv.config();

export const configurations = {
  apiKey: process.env.open_map_api_key,
  url: process.env.open_map_api_url,
  timeout: process.env.timeout,
};
