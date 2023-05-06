import { ChargeDataModel } from './charge-data.schema';

import { ChargeData } from './types';

export class ChargeDataRepository {
  private model = ChargeDataModel;

  async upsert(payload: ChargeData[]) {
    const documentsCount = await this.getTotalCount();

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

  async getChargeData(first: number, after: string) {
    let results = await this.model
      .find({ ...(after && { _id: { $gt: after } }) })
      .limit(first + 1);

    const hasNextPage = results.length === first + 1;

    results = hasNextPage ? results.slice(0, -1) : results;

    const edges = results.map(
      ({ id, statusType, connections, operatorInfo, addressInfo }) => ({
        cursor: id as string,
        node: {
          id: id as string,
          statusType,
          connections,
          operatorInfo,
          addressInfo,
        },
      }),
    );

    const totalCount = await this.getTotalCount();

    return {
      edges,
      totalCount,
      pageInfo: {
        hasNextPage,
      },
    };
  }

  private async getTotalCount() {
    return this.model.countDocuments();
  }
}
