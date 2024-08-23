import { model, Schema } from 'mongoose'

import { Draw, PackBalanceDocument } from '../../types/packBalance'
import { messageSigningDataSchema, ownerSchema } from './misc'

const drawSchema = new Schema<Draw>({
  cardTokenIds: {
    type: [{
      type: String,
      required: true,
      ref: 'Card',
    }],
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
})

const packBalanceSchema = new Schema<PackBalanceDocument>({
  tokenId: {
    type: String,
    required: true,
    ref: 'Pack',
  },
  draws: {
    type: [drawSchema],
    default: [],
  },
  openedDraws: {
    type: [drawSchema],
    default: [],
  },
  lockedDraws: {
    type: [drawSchema],
    default: [],
  },
  voucherSigningData: {
    type: messageSigningDataSchema,
  },
  voucherAmount: {
    type: Number,
    default: 0,
  },
  owner: {
    type: ownerSchema,
    require: true,
  },
  emptyBalance: {
    type: Number,
    default: 0,
  },
  lastDrawAt: {
    type: Date,
  },
})

packBalanceSchema.index({
  tokenId: 1,
  lastDrawAt: 1,
  'owner.starknetAddress': 1
})

export default model('PackBalance', packBalanceSchema, 'packBalances')
