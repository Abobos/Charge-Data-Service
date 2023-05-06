import { Injectable, Logger } from '@nestjs/common';
import { ChargeDataRepository } from '@charge-data/dal';
import { APIService } from './api.service';

@Injectable()
export class ChargeDataService {
  private readonly logger = new Logger(ChargeDataService.name);

  constructor(
    private readonly chargeDataRepository: ChargeDataRepository,
    private readonly apiService: APIService,
  ) {}

  async getChargeData() {
    this.logger.log('About to retrieve open charge map API data');

    try {
      const data = await this.apiService.openMapAPI();

      const mapData = data.map((datum) => ({
        ocmId: datum.ID,
        addressInfo: datum.AddressInfo,
        operatorInfo: datum.OperatorInfo,
        statusType: datum.StatusType,
        connections: datum.Connections,
        lastChanged: new Date(datum.DateLastStatusUpdate),
      }));

      await this.chargeDataRepository.upsert(mapData);

      this.logger.log('done retrieving open charge map API data');
    } catch (error) {
      this.logger.error('An error occurred', error.message);
    }
  }
}
