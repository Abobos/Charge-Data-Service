import { ChargeDataRepository, DalService } from '@charge-data/dal';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { APIService } from './api.service';

import { TaskService } from './task.service';
import { Scheduler } from './scheduler';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [
    APIService,
    TaskService,
    Scheduler,
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
export class TaskModule {}
