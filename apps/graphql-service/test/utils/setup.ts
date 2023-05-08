import { DalService } from '@charge-data/dal';
import { Test, TestingModule } from '@nestjs/testing';
import { configuration } from '../../../config';
import { AppModule } from '../../src/app.module';

export const initializeTestingModule = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(DalService)
    .useFactory({
      factory: async () => {
        const dalService = new DalService();

        await dalService.connect(`${configuration.databaseUrl}-test`);

        return dalService;
      },
    })
    .compile();

  return moduleFixture;
};
