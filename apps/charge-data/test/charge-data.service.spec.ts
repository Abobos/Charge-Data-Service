import { ChargeDataRepository, DalService } from '@app/dal';

import { ChargeDataService } from '../src/charge-data.service';

import { data } from './data';
import { initializeTestModule } from './setup';

let chargeDataService: ChargeDataService;
let dalService: DalService;
let chargeDataRepository: ChargeDataRepository;

beforeAll(async () => {
  const module = await initializeTestModule();

  chargeDataService = module.get<ChargeDataService>(ChargeDataService);
  dalService = module.get<DalService>(DalService);
  chargeDataRepository = module.get<ChargeDataRepository>(ChargeDataRepository);
});

describe('ChargeDataService', () => {
  it('should be defined', () => {
    expect(ChargeDataService).toBeDefined();
  });

  beforeEach(async () => {
    await dalService.destroy();
  });

  it('should insert retrieve open charge data and insert into the database', async () => {
    await chargeDataService.getChargeData();
    const response = await chargeDataRepository.findAll();

    for (let i = 0; i < data.length; i += 1) {
      expect(response[i].statusType).toStrictEqual(data[i].StatusType);
      expect(response[i].operatorInfo).toStrictEqual(data[i].OperatorInfo);
      expect(response[i].connections).toStrictEqual(data[i].Connections);
      expect(response[i].addressInfo).toStrictEqual(data[i].AddressInfo);
    }
  });

  it('should update open charge data in the database if there was a changed in the data', async () => {
    data[0].DateLastStatusUpdate = '2023-05-04T13:56:00Z';
    data[0].StatusType = {
      ...data[0].StatusType,
      IsOperational: false,
    };

    await chargeDataService.getChargeData();
    const response = await chargeDataRepository.findAll();

    expect(response[0].statusType).toStrictEqual(data[0].StatusType);
  });
});

afterAll(async () => {
  await dalService.disconnect();
});
