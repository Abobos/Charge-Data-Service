import { ChargeDataRepository, DalService } from '@charge-data/dal';

import { ChargeDataService } from '../src/charge-data.service';

import { data } from './utils/data';
import { initializeTestModule } from './utils/setup';

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

  it('should retrieve open charge data and insert into the database', async () => {
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

  it('should not update open charge data in the database if there was no change in the data', async () => {
    await chargeDataRepository.insertMany(
      data.map((datum) => ({
        ocmId: datum.ID,
        addressInfo: datum.AddressInfo,
        operatorInfo: datum.OperatorInfo,
        statusType: datum.StatusType,
        connections: datum.Connections,
        lastChanged: new Date(datum.DateLastStatusUpdate),
      })),
    );

    data[0].DateLastStatusUpdate = '2023-05-04T13:53:00Z';
    data[0].StatusType = {
      ...data[0].StatusType,
      IsUserSelectable: false,
    };

    await chargeDataService.getChargeData();
    const response = await chargeDataRepository.findAll();

    expect(response[0].statusType).not.toStrictEqual(data[0].StatusType);
  });
});

afterAll(async () => {
  await dalService.disconnect();
});
