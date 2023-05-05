import { ChargeDataModel } from './charge-data.schema';
import { IChargeData } from './types';

export class ChargeDataServiceRepository {
  private model = ChargeDataModel;

  async updateChargeData(payload: IChargeData[]) {
    const documentsCount = await this.model.countDocuments();

    if (documentsCount === 0) {
      await this.model.insertMany(payload);

      return;
    }

    const promises = payload.map(async (entry) => {
      const filter = {
        ocmId: entry.ocmId,
        lastChanged: {
          $lt: new Date(entry.lastChanged),
        },
      };

      return this.model.findOneAndUpdate(filter, entry);
    });

    await Promise.all(promises);
  }
}
