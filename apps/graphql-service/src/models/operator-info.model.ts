import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AddressInfo } from './address-info.model';

@ObjectType()
export class OperatorInfo {
  @Field({ nullable: true })
  WebsiteURL?: string;

  @Field({ nullable: true })
  Comments?: string;

  @Field({ nullable: true })
  PhonePrimaryContact?: string;

  @Field({ nullable: true })
  PhoneSecondaryContact?: string;

  @Field({ nullable: true })
  IsPrivateIndividual?: boolean;

  @Field({ nullable: true })
  AddressInfo?: AddressInfo;

  @Field({ nullable: true })
  BookingURL: string;

  @Field({ nullable: true })
  ContactEmail?: string;

  @Field({ nullable: true })
  FaultReportEmail?: string;

  @Field({ nullable: true })
  IsRestrictedEdit?: boolean;

  @Field(() => Int)
  ID: number;

  @Field()
  Title: string;
}
