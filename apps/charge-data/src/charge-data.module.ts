import { ChargeDataRepository, DalService } from '@charge-data/dal';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { APIService } from './api.service';

import { ChargeDataService } from './charge-data.service';
import { ChargeDataTask } from './charge-data.task';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [
    APIService,
    ChargeDataService,
    ChargeDataTask,
    ChargeDataRepository,
    {
      provide: DalService,
      useFactory: async () => {
        const dalService = new DalService();
        await dalService.connect();

        return dalService;
      },
    },
  ],
})
export class ChargeDataModule {}
