export interface OperatorInfo {
  WebsiteURL: string;
  Comments: any;
  PhonePrimaryContact: string;
  PhoneSecondaryContact: any;
  IsPrivateIndividual: boolean;
  AddressInfo: any;
  BookingURL: any;
  ContactEmail: any;
  FaultReportEmail: any;
  IsRestrictedEdit: boolean;
  ID: number;
  Title: string;
}

export interface AddressInfo {
  ID: number;
  Title: string;
  AddressLine1: string;
  AddressLine2: string;
  Town: any;
  StateOrProvince: string;
  Postcode: string;
  CountryID: number;
  Country: Country;
  Latitude: number;
  Longitude: number;
  ContactTelephone1: any;
  ContactTelephone2: any;
  ContactEmail: any;
  AccessComments: any;
  RelatedURL: any;
  Distance: any;
  DistanceUnit: number;
}

export interface Country {
  ISOCode: string;
  ContinentCode: string;
  ID: number;
  Title: string;
}

export interface Connection {
  ID: number;
  ConnectionTypeID: number;
  ConnectionType: ConnectionType;
  Reference: any;
  StatusTypeID: number;
  StatusType: StatusType;
  LevelID: number;
  Level: Level;
  Amps: any;
  Voltage: any;
  PowerKW: number;
  CurrentTypeID: number;
  CurrentType: CurrentType;
  Quantity: number;
  Comments: any;
}

export interface ConnectionType {
  FormalName: string;
  IsDiscontinued: boolean;
  IsObsolete: boolean;
  ID: number;
  Title: string;
}

export interface StatusType {
  IsOperational: boolean;
  IsUserSelectable: boolean;
  ID: number;
  Title: string;
}

export interface Level {
  Comments: string;
  IsFastChargeCapable: boolean;
  ID: number;
  Title: string;
}

export interface CurrentType {
  Description: string;
  ID: number;
  Title: string;
}

export interface ChargeData {
  operationInfo: OperatorInfo;
  statusType: StatusType;
  addressInfo: AddressInfo;
  connections: Connection[];
}
export interface IChargeData extends ChargeData {
  _id: string;
}
