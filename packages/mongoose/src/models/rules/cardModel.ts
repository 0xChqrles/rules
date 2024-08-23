import { Schema, model } from 'mongoose'

import { CardModelDocument } from '../../types/cardModel'

const cardModelSchema = new Schema<CardModelDocument>({
  uid: {
    type: Number,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  artistName: {
    type: String,
    required: true,
  },
  salesCount: {
    type: Number,
    default: 0,
  },
  salesTotal: {
    type: String,
    default: '0x0'
  },
  youtubePreviewId: {
    type: String,
  },
  availableSerialNumbers: {
    type: [Number],
    default: [],
  },
  maxSupply: {
    type: Number,
  },

  gweiLowestAsk: {
    type: Number,
    default: 0,
  },
  lowestAsk: {
    type: String,
    default: '0x0',
  },

  gweiLowSerialLowestAsk: {
    type: Number,
    default: 0,
  },
  lowSerialLowestAsk: {
    type: String,
    default: '0x0',
  },

  season: {
    type: Number,
    required: true,
  },
  scarcityAbsoluteId: {
    type: Number,
    required: true,
  },
  scarcityId: {
    type: Number,
    required: true,
  },
})

cardModelSchema.index({
  gweiLowestAsk: 1,
  gweiLowSerialLowestAsk: 1,
})

export default model('CardModel', cardModelSchema, 'card-models')
