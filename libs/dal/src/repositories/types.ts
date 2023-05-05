export interface IOpenMapChargeData {
  DataProvider: DataProvider;
  OperatorInfo: OperatorInfo;
  UsageType: UsageType;
  StatusType: StatusType;
  SubmissionStatus: SubmissionStatus;
  UserComments: UserComment[];
  PercentageSimilarity: any;
  MediaItems: MediaItem[];
  IsRecentlyVerified: boolean;
  DateLastVerified: string;
  ID: number;
  UUID: string;
  ParentChargePointID: any;
  DataProviderID: number;
  DataProvidersReference: any;
  OperatorID: number;
  OperatorsReference: any;
  UsageTypeID: number;
  UsageCost: any;
  AddressInfo: AddressInfo;
  Connections: Connection[];
  NumberOfPoints: number;
  GeneralComments: any;
  DatePlanned: any;
  DateLastConfirmed: any;
  StatusTypeID: number;
  DateLastStatusUpdate: string;
  MetadataValues: any;
  DataQualityLevel: number;
  DateCreated: string;
  SubmissionStatusTypeID: number;
}

interface DataProvider {
  WebsiteURL: string;
  Comments: any;
  DataProviderStatusType: DataProviderStatusType;
  IsRestrictedEdit: boolean;
  IsOpenDataLicensed: boolean;
  IsApprovedImport: boolean;
  License: string;
  DateLastImported: any;
  ID: number;
  Title: string;
}

interface DataProviderStatusType {
  IsProviderEnabled: boolean;
  ID: number;
  Title: string;
}

interface OperatorInfo {
  WebsiteURL: any;
  Comments: any;
  PhonePrimaryContact: any;
  PhoneSecondaryContact: any;
  IsPrivateIndividual: any;
  AddressInfo: any;
  BookingURL: any;
  ContactEmail: any;
  FaultReportEmail: any;
  IsRestrictedEdit: any;
  ID: number;
  Title: string;
}

interface UsageType {
  IsPayAtLocation: any;
  IsMembershipRequired: any;
  IsAccessKeyRequired: any;
  ID: number;
  Title: string;
}

interface StatusType {
  IsOperational: boolean;
  IsUserSelectable: boolean;
  ID: number;
  Title: string;
}

interface SubmissionStatus {
  IsLive: boolean;
  ID: number;
  Title: string;
}

interface UserComment {
  ID: number;
  ChargePointID: number;
  CommentTypeID: number;
  CommentType: CommentType;
  UserName: string;
  Comment: string;
  Rating: any;
  RelatedURL: string;
  DateCreated: string;
  User: User;
  CheckinStatusTypeID: number;
  CheckinStatusType: CheckinStatusType;
  IsActionedByEditor: boolean;
}

interface CommentType {
  ID: number;
  Title: string;
}

interface User {
  ID: number;
  IdentityProvider: any;
  Identifier: any;
  CurrentSessionToken: any;
  Username: string;
  Profile: any;
  Location: any;
  WebsiteURL: any;
  ReputationPoints: number;
  Permissions: any;
  PermissionsRequested: any;
  DateCreated: any;
  DateLastLogin: any;
  IsProfilePublic: any;
  IsEmergencyChargingProvider: any;
  IsPublicChargingProvider: any;
  Latitude: any;
  Longitude: any;
  EmailAddress: any;
  EmailHash: any;
  ProfileImageURL: string;
  IsCurrentSessionTokenValid: any;
  APIKey: any;
  SyncedSettings: any;
}

interface CheckinStatusType {
  IsPositive: boolean;
  IsAutomatedCheckin: boolean;
  ID: number;
  Title: string;
}

interface MediaItem {
  ID: number;
  ChargePointID: number;
  ItemURL: string;
  ItemThumbnailURL: string;
  Comment: string;
  IsEnabled: boolean;
  IsVideo: boolean;
  IsFeaturedItem: boolean;
  IsExternalResource: boolean;
  MetadataValue: any;
  User: User2;
  DateCreated: string;
}

interface User2 {
  ID: number;
  IdentityProvider: any;
  Identifier: any;
  CurrentSessionToken: any;
  Username: string;
  Profile: any;
  Location: any;
  WebsiteURL: any;
  ReputationPoints: number;
  Permissions: any;
  PermissionsRequested: any;
  DateCreated: any;
  DateLastLogin: any;
  IsProfilePublic: any;
  IsEmergencyChargingProvider: any;
  IsPublicChargingProvider: any;
  Latitude: any;
  Longitude: any;
  EmailAddress: any;
  EmailHash: any;
  ProfileImageURL: string;
  IsCurrentSessionTokenValid: any;
  APIKey: any;
  SyncedSettings: any;
}

interface AddressInfo {
  ID: number;
  Title: string;
  AddressLine1: string;
  AddressLine2: any;
  Town: string;
  StateOrProvince: string;
  Postcode: any;
  CountryID: number;
  Country: Country;
  Latitude: number;
  Longitude: number;
  ContactTelephone1: any;
  ContactTelephone2: any;
  ContactEmail: any;
  AccessComments: any;
  RelatedURL: string;
  Distance: any;
  DistanceUnit: number;
}

interface Country {
  ISOCode: string;
  ContinentCode: string;
  ID: number;
  Title: string;
}

interface Connection {
  ID: number;
  ConnectionTypeID: number;
  ConnectionType: ConnectionType;
  Reference: any;
  StatusTypeID: any;
  StatusType: any;
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

interface ConnectionType {
  FormalName: string;
  IsDiscontinued: boolean;
  IsObsolete: boolean;
  ID: number;
  Title: string;
}

interface Level {
  Comments: string;
  IsFastChargeCapable: boolean;
  ID: number;
  Title: string;
}

interface CurrentType {
  Description: string;
  ID: number;
  Title: string;
}

export interface ChargeData {
  operatorInfo: OperatorInfo;
  statusType: StatusType;
  addressInfo: AddressInfo;
  connections: Connection[];
  ocmId: number;
  lastChanged: Date;
}
export interface IChargeData extends ChargeData {
  _id: string;
}
