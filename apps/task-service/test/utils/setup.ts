import { ChargeDataRepository, DalService } from '@charge-data/dal';
import { Test, TestingModule } from '@nestjs/testing';
import { APIService } from '../../../task-service/src/api.service';
import { TaskService } from '../../src/task.service';
import { configuration } from '../../../config';

import { data } from './data';

class ApiServiceMock {
  openMapAPI() {
    return data;
  }
}

const providers = [
  TaskService,
  ChargeDataRepository,
  {
    provide: APIService,
    useClass: ApiServiceMock,
  },
  {
    provide: DalService,
    useFactory: async () => {
      const dalService = new DalService();
      await dalService.connect(`${configuration.databaseUrl}-test`);

      return dalService;
    },
  },
];

export const initializeTestModule = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers,
  }).compile();

  return module;
};
