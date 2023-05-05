import axios from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import { configurations } from './config';
import { ChargeDataServiceRepository, IChargeData } from '@app/dal';

@Injectable()
export class ChargeDataService {
  private readonly logger = new Logger(ChargeDataService.name);

  constructor(
    private readonly chargeDataRepository: ChargeDataServiceRepository,
  ) {}

  async getChargeData() {
    this.logger.log('About to retrieve open charge map API data');

    try {
      const { data } = await axios.get(configurations.url, {
        timeout: Number(configurations.timeout),
        headers: {
          'X-API-Key': configurations.apiKey,
        },
      });

      const mapData = data.map((datum: Record<string, unknown>) => ({
        ocmId: datum.ID,
        addressInfo: datum.AddressInfo,
        operationInfo: datum.OperatorInfo,
        statusType: datum.StatusType,
        connections: datum.Connections,
        lastChanged: datum.DateLastStatusUpdate,
      })) as IChargeData[];

      await this.chargeDataRepository.updateChargeData(mapData);

      this.logger.log('done retrieving open charge map API data');
    } catch (error) {
      this.logger.error('An error occurred', error.message);
    }
  }
}
