import axios from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import { configurations } from './config';

@Injectable()
export class ChargeDataService {
  private readonly logger = new Logger(ChargeDataService.name);

  async getChargeDataAPI() {
    this.logger.log('Retrieves open charge map data');

    try {
      await axios.get(configurations.url, {
        timeout: Number(configurations.timeout),
        headers: {
          'X-API-Key': configurations.apiKey,
        },
      });
    } catch (error) {
      this.logger.error('An error occurred', error.message);
    }
  }
}
