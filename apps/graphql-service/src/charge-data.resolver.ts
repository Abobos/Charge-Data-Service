import { ChargeData, ChargeDataCollection } from './models/charge-data.model';
import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { ChargeDataRepository } from '@charge-data/dal';

@Resolver(() => ChargeData)
export class ChargeDataResolver {
  constructor(private chargeRespository: ChargeDataRepository) {}

  @Query(() => ChargeDataCollection, { name: 'GetChargeData' })
  async getChargeData(
    @Args({ name: 'first', type: () => Int, defaultValue: 10 }) first: number,
    @Args({ name: 'after', nullable: true }) after: string,
  ) {
    const response = await this.chargeRespository.getChargeData(first, after);

    return response;
  }
}
