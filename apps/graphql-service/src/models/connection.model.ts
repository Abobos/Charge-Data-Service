import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { StatusType } from './status-type.model';

@ObjectType()
class ConnectionType {
  @Field(() => Int)
  ID: number;

  @Field()
  Title: string;

  @Field()
  FormalName: string;

  @Field()
  IsDiscontinued: boolean;

  @Field()
  IsObsolete: boolean;
}

@ObjectType()
class Level {
  @Field()
  Comments: string;

  @Field()
  IsFastChargeCapable: boolean;

  @Field()
  ID: number;

  @Field()
  Title: string;
}

@ObjectType()
class CurrentType {
  @Field()
  Description: string;

  @Field()
  ID: number;

  @Field()
  Title: string;
}

@ObjectType()
export class Connection {
  @Field(() => Int)
  ID: number;

  @Field(() => Int)
  ConnectionTypeID: number;

  @Field()
  ConnectionType: ConnectionType;

  @Field()
  Reference?: string;

  @Field(() => Int, { nullable: true })
  StatusTypeID?: number;

  @Field({ nullable: true })
  StatusType?: StatusType;

  @Field()
  LevelID: number;

  @Field()
  Level: Level;

  @Field({ nullable: true })
  Amps?: string;

  @Field({ nullable: true })
  Voltage?: string;

  @Field(() => Float)
  PowerKW: number;

  @Field(() => Int)
  CurrentTypeID: number;

  @Field()
  CurrentType: CurrentType;

  @Field(() => Float)
  Quantity: number;

  @Field({ nullable: true })
  Comments?: string;
}
