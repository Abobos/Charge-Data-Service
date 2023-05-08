import { ChargeDataRepository, DalService } from '@charge-data/dal';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { data } from './utils/data';
import { initializeTestingModule } from './utils/setup';

describe('Graphql Service (e2e)', () => {
  let app: INestApplication;
  let chargeDataRepository: ChargeDataRepository;
  let dalService: DalService;

  beforeAll(async () => {
    const module = await initializeTestingModule();

    chargeDataRepository =
      module.get<ChargeDataRepository>(ChargeDataRepository);
    dalService = module.get<DalService>(DalService);

    app = module.createNestApplication();
    await app.init();

    await dalService.destroy();
  });

  afterAll(async () => {
    await dalService.disconnect();
    await app.close();
  });

  it('should return a open map data from our database', async () => {
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

    const query = `query {
      GetChargeData(first: 4) {
        edges {
          cursor
          node {
            statusType {
              ID
            }
            operatorInfo {
              PhonePrimaryContact
              IsPrivateIndividual
            }
            addressInfo {
              AddressLine1
              AddressLine2
              Town
            }
            id
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    const responseData = response.body.data.GetChargeData;
    const edge = responseData.edges[0];

    expect(edge.node.id).toBeDefined();
    expect(edge.node.statusType).toStrictEqual({
      ID: 50,
    });
    expect(edge.node.operatorInfo).toStrictEqual({
      PhonePrimaryContact: null,
      IsPrivateIndividual: null,
    });
    expect(edge.node.addressInfo).toStrictEqual({
      AddressLine1: 'Largo Giambellino 3',
      AddressLine2: null,
      Town: 'Reggio Emilia',
    });

    expect(responseData.pageInfo.hasNextPage).toBeFalsy();
  });
});
