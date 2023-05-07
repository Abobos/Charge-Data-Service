import axios from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import { configuration } from './config';
import { IOpenMapChargeData } from '@charge-data/dal';

@Injectable()
export class APIService {
  private readonly logger = new Logger(APIService.name);

  async openMapAPI() {
    const { data } = await axios.get<IOpenMapChargeData[]>(configuration.url, {
      timeout: Number(configuration.timeout),
      headers: {
        'X-API-Key': configuration.apiKey,
      },
    });

    return data;
  }
}
