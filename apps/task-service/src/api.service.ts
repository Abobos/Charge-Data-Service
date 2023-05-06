import axios from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import { configurations } from './config';
import { IOpenMapChargeData } from '@charge-data/dal';

@Injectable()
export class APIService {
  private readonly logger = new Logger(APIService.name);

  async openMapAPI() {
    const { data } = await axios.get<IOpenMapChargeData[]>(configurations.url, {
      timeout: Number(configurations.timeout),
      headers: {
        'X-API-Key': configurations.apiKey,
      },
    });

    return data;
  }
}
