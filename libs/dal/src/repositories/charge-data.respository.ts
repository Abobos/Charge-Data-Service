import { ChargeDataModel } from './charge-data.schema';

import { ChargeData } from './types';

export class ChargeDataRepository {
  private model = ChargeDataModel;

  async upsert(payload: ChargeData[]) {
    const documentsCount = await this.model.countDocuments();

    if (documentsCount === 0) {
      await this.insertMany(payload);

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

  async findAll() {
    return this.model.find();
  }

  async insertMany(payload: ChargeData[]) {
    await this.model.insertMany(payload);
  }
}
