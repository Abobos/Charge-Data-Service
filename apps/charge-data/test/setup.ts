import { ChargeDataRepository, DalService } from '@charge-data/dal';
import { Test, TestingModule } from '@nestjs/testing';
import { APIService } from '../src/api.service';
import { ChargeDataService } from '../src/charge-data.service';
import { data } from './data';

class ApiServiceMock {
  openMapAPI() {
    return data;
  }
}
const ApiServiceProvider = {
  provide: APIService,
  useClass: ApiServiceMock,
};

export const initializeTestModule = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ChargeDataService,
      ApiServiceProvider,
      ChargeDataRepository,
      {
        provide: DalService,
        useFactory: async () => {
          const dalService = new DalService();
          await dalService.connect('mongodb://localhost:27017/ChargeData-test');

          return dalService;
        },
      },
    ],
  }).compile();

  return module;
};
