import { Schema, model } from 'mongoose'

import { CardDocument } from '../../types/card'
import { ownerSchema, messageSigningDataSchema } from './misc'

const cardSchema = new Schema<CardDocument>({
  tokenId: {
    type: String,
    required: true,
    index: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  cardModelId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'CardModel',
    index: true,
  },
  serialNumber: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  owner: {
    type: ownerSchema,
  },
  voucherSigningData: {
    type: messageSigningDataSchema,
  },

  artistName: {
    type: String,
    required: true,
  },

  ownedSince: {
    type: Date,
  },

  season: {
    type: Number,
    required: true,
  },
  scarcityAbsoluteId: {
    type: Number,
    required: true,
  },

  gweiLastPrice: {
    type: Number,
    default: 0,
  },
  lastPrice: {
    type: String,
    default: '0x0',
  }
})

cardSchema.index({ slug: 1, cardModelId: 1, tokenId: 1, 'owner.starknetAddress': 1 })

export default model('Card', cardSchema, 'cards')
