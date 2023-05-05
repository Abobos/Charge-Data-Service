import { ChargeDataServiceRepository, DalService } from '@app/dal';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { ChargeDataService } from './charge-data.service';
import { ChargeDataTask } from './charge-data.task';

const dalService = new DalService();

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [
    ChargeDataService,
    ChargeDataTask,
    ChargeDataServiceRepository,
    {
      provide: DalService,
      useFactory: async () => {
        await dalService.connect();

        return dalService;
      },
    },
  ],
})
export class ChargeDataModule {}
