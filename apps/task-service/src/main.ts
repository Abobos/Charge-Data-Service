import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TaskModule } from './task.module';

async function bootstrap() {
  const app = await NestFactory.create(TaskModule);
  await app.listen(4000);

  Logger.log(`App listening to port ${await app.getUrl()}`);
}
bootstrap();
