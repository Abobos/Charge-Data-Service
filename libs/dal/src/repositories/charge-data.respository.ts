import { ChargeDataModel } from './charge-data.schema';

import { ChargeData, ChargeDataEntity } from './types';

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

  async findAll(): Promise<ChargeDataEntity[]> {
    const results = await this.model.find();

    return this.mapEntities(results);
  }

  async insertMany(payload: ChargeData[]) {
    await this.model.insertMany(payload);
  }

  async getChargeData(first: number, after: string) {
    const results = await this.model
      .find({ ...(after && { ocmId: { $lt: Number(after) } }) })
      .limit(first + 1)
      .sort({ ocmId: 'desc' });

    let mappedResult = this.mapEntities(results);

    const hasNextPage = results.length === first + 1;
    mappedResult = hasNextPage ? results.slice(0, -1) : results;

    const edges = mappedResult.map(
      ({ _id, statusType, connections, operatorInfo, addressInfo, ocmId }) => ({
        cursor: ocmId.toString(),
        node: {
          id: _id,
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
        hasPreviousPage: Boolean(after),
        hasNextPage,
      },
    };
  }

  private async getTotalCount() {
    return this.model.countDocuments();
  }

  private mapEntities(data: any[]): ChargeDataEntity[] {
    return data.map((data) => data.toObject());
  }
}
