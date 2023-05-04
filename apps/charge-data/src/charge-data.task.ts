import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ChargeDataService } from './charge-data.service';

@Injectable()
export class ChargeDataTask {
  private readonly logger = new Logger(ChargeDataTask.name);

  constructor(private chargeDataService: ChargeDataService) {}

  @Cron('45 * * * * *')
  async handleCron() {
    this.logger.log('About to call charge data service');

    this.chargeDataService.getChargeDataAPI();
  }
}
