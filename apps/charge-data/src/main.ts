import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ChargeDataModule } from './charge-data.module';

async function bootstrap() {
  const app = await NestFactory.create(ChargeDataModule);
  await app.listen(4000);

  Logger.log(`App listening to port ${await app.getUrl()}`);
}
bootstrap();
