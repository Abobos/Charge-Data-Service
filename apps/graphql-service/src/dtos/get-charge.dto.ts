import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class GetChargeDataArgs {
  @Field(() => Int, { defaultValue: 10 })
  first: number;

  @Field({ nullable: true })
  after: string;
}
