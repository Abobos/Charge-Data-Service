import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ChargeDataService {
  private readonly logger = new Logger(ChargeDataService.name);

  getChargeDataAPI() {
    this.logger.log('Retrieves open charge map data');
  }
}
