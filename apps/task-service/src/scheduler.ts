import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TaskService } from './task.service';

@Injectable()
export class Scheduler {
  private readonly logger = new Logger(Scheduler.name);

  constructor(private taskService: TaskService) {}

  @Cron('*/10 * * * * *')
  async handleCron() {
    this.logger.log('About to call charge data service');

    await this.taskService.getChargeData();
  }
}
