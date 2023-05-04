import * as dotenv from 'dotenv';
import { Connection, ConnectOptions } from 'mongoose';
import * as mongoose from 'mongoose';

dotenv.config();

export class DalService {
  connection: Connection;

  async connect(
    url: string = process.env.database_url,
    config: ConnectOptions = {},
  ) {
    const baseConfig: ConnectOptions = {
      maxPoolSize: 700,
      minPoolSize: process.env.NODE_ENV === 'production' ? 200 : 10,
    };

    const instance = await mongoose.connect(url, {
      ...baseConfig,
      ...config,
    });

    this.connection = instance.connection;

    return this.connection;
  }

  isConnected(): boolean {
    return this.connection && this.connection.readyState === 1;
  }

  async disconnect() {
    await mongoose.disconnect();
  }
}
