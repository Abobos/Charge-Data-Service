import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
class Country {
  @Field()
  ISOCode: string;

  @Field()
  ContinentCode: string;

  @Field(() => Int)
  ID: number;

  @Field()
  Title: string;
}

@ObjectType()
export class AddressInfo {
  @Field(() => Int)
  ID: number;

  @Field()
  Title: string;

  @Field({ nullable: true })
  AddressLine1: string;

  @Field({ nullable: true })
  AddressLine2: string;

  @Field()
  Town: string;

  @Field({ nullable: true })
  StateOrProvince: string;

  @Field()
  Postcode: string;

  @Field()
  CountryID: number;

  @Field()
  Country: Country;

  @Field(() => Float)
  Latitude: number;

  @Field(() => Float)
  Longitude: number;

  @Field({ nullable: true })
  ContactTelephone1: string;

  @Field({ nullable: true })
  ContactTelephone2: string;

  @Field()
  ContactEmail: string;

  @Field({ nullable: true })
  AccessComments: string;

  @Field()
  RelatedURL: string;

  @Field(() => Float)
  Distance: number;

  @Field(() => Float, { nullable: true })
  DistanceUnit: number;
}
