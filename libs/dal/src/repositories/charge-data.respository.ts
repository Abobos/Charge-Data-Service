import { ChargeDataModel } from './charge-data.schema';
import { ChargeData } from './types';

export class ChargeDataServiceRepository {
  private model = ChargeDataModel;

  async insertMany(data: ChargeData[]) {
    await this.model.insertMany(data);
  }
}
