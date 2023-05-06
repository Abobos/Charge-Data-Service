import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class StatusType {
  @Field()
  IsOperational: boolean;

  @Field()
  IsUserSelectable: boolean;

  @Field(() => Int)
  ID: number;

  @Field(() => String)
  Title: string;
}
