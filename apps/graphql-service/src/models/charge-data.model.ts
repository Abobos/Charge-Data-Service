import { Field, ObjectType } from '@nestjs/graphql';
import { AddressInfo } from './address-info.model';
import { OperatorInfo } from './operator-info.model';
import { StatusType } from './status-type.model';
import { Connection } from './connection.model';
import { Paginated } from './pagination.model';

@ObjectType()
export class ChargeData {
  @Field()
  id: string;

  @Field(() => StatusType, { nullable: true })
  statusType?: StatusType;

  @Field(() => AddressInfo, { nullable: true })
  addressInfo?: AddressInfo;

  @Field(() => OperatorInfo, { nullable: true })
  operatorInfo?: OperatorInfo;

  @Field(() => [Connection], { nullable: true })
  connections?: Connection[];
}

@ObjectType()
export class ChargeDataCollection extends Paginated(ChargeData) {}
