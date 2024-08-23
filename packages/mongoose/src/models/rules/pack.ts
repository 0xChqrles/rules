import { model, Schema, SchemaDefinition, SchemaDefinitionType } from 'mongoose'
import { PackDocument } from '@rulesorg/mongoose-rules'

import {
  BuyablePackExtension,
  PackedCardModel,
  PackType,
  QuantityLimitedPackExtensionDocument,
  RookiePackExtensionDocument,
  StarterPackExtensionDocument,
  TimeLimitedPackExtensionDocument,
} from '../../types/pack'
import {
  MAX_CARDS_PER_PACK,
  MIN_CARDS_PER_PACK,
  MIN_PACK_CARD_MODEL_QUANTITY,
  MIN_PACK_MAX_SUPPLY,
  MIN_PRICE,
  MIN_SEASON,
} from '../../constants'

const packedCardModelSchema = new Schema<PackedCardModel>({
  cardModelId: {
    type: Schema.Types.ObjectId,
    ref: 'CardModel',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: MIN_PACK_CARD_MODEL_QUANTITY,
  },
  drawnQuantity: {
    type: Number,
    default: 0,
    min: 0,
  },
})

const buyablePackSchemaDefinition: SchemaDefinition<SchemaDefinitionType<BuyablePackExtension>> = {
  price: {
    type: Number,
    required: true,
    min: MIN_PRICE,
  },
  maxQuantityPerUser: {
    type: Number,
    required: true,
  },
  supply: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
}

const packSchema = new Schema<PackDocument>({
  starknetTokenId: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  cardsPerPack: {
    type: Number,
    required: true,
    min: MIN_CARDS_PER_PACK,
    max: MAX_CARDS_PER_PACK,
  },
  tokenId: {
    type: String,
    required: true,
    unique: true,
  },
  season: {
    type: Number,
    min: MIN_SEASON,
    required: true,
  },
}, { discriminatorKey: 'type' })

packSchema.index({
  slug: 1,
  tokenId: 1,
})

const packs = model('Pack', packSchema, 'packs')

// BUYABLE PACK

const buyablePackSchema = packSchema.add(buyablePackSchemaDefinition)

export const buyablePacks = model('Pack', buyablePackSchema, 'packs')

// STARTER PACK

const starterPackExtensionSchema = new Schema<StarterPackExtensionDocument>({
  ...buyablePackSchemaDefinition,
})

export const starterPacks = packs.discriminator(PackType.STARTER, starterPackExtensionSchema)

// QUANTITY LIMITED

const quantityLimitedPackExtensionSchema = new Schema<QuantityLimitedPackExtensionDocument>({
  packedCardModels: {
    type: [packedCardModelSchema],
    required: true,
  },
  maxSupply: {
    type: Number,
    min: MIN_PACK_MAX_SUPPLY,
    required: true,
  },
  maxBuyableSupply: {
    type: Number,
    min: MIN_PACK_MAX_SUPPLY,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  ...buyablePackSchemaDefinition,
})

export const quantityLimitedPacks = packs.discriminator(PackType.QUANTITY_LIMITED, quantityLimitedPackExtensionSchema)

// QUANTITY LIMITED

const timeLimitedPackExtensionSchema = new Schema<TimeLimitedPackExtensionDocument>({
  cardModelIds: {
    type: [Schema.Types.ObjectId],
    ref: 'CardModel',
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  soldoutDate: {
    type: Date,
    required: true,
  },
  ...buyablePackSchemaDefinition,
})

export const timeLimitedPacks = packs.discriminator(PackType.TIME_LIMITED, timeLimitedPackExtensionSchema)

// ROOKIE PACK

const rookiePackExtensionSchema = new Schema<RookiePackExtensionDocument>({})

export const rookiePacks = packs.discriminator(PackType.ROOKIE, rookiePackExtensionSchema)

// DEFAULT EXPORT

export default { packs, buyablePacks, starterPacks, quantityLimitedPacks, timeLimitedPacks, rookiePacks }
