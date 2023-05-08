import { ChargeDataCollection } from './models/charge-data.model';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { ChargeDataRepository } from '@charge-data/dal';
import { Logger } from '@nestjs/common';
import { GetChargeDataArgs } from './dtos/get-charge.dto';
import { GraphQLError } from 'graphql';

@Resolver(() => ChargeDataCollection)
export class ChargeDataResolver {
  private readonly logger = new Logger(ChargeDataResolver.name);
  constructor(private chargeRespository: ChargeDataRepository) {}

  @Query(() => ChargeDataCollection, { name: 'GetChargeData' })
  async getChargeData(
    @Args() query: GetChargeDataArgs,
  ): Promise<ChargeDataCollection> {
    try {
      const { first, after } = query;

      const response = (await this.chargeRespository.retrieveChargeData(
        first,
        after,
      )) as ChargeDataCollection;

      return response;
    } catch (error) {
      this.logger.error(error.message, error.stack);

      throw new GraphQLError('Something went wrong!');
    }
  }
}
