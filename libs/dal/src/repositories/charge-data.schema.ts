import { randomUUID } from 'crypto';
import { model, Schema } from 'mongoose';
import { IChargeData } from './types';

const ChargeDataSchema = new Schema<IChargeData>({
  _id: { type: Schema.Types.String, default: randomUUID() },
  statusType: { type: Schema.Types.Mixed },
  operationInfo: { type: Schema.Types.Mixed },
  connections: { type: Schema.Types.Mixed },
  addressInfo: { type: Schema.Types.Mixed },
});

export const ChargeDataModel = model<IChargeData>(
  'ChargeData',
  ChargeDataSchema,
);
