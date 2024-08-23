import { Document, Types } from 'mongoose'

export enum PackType {
  STARTER = 'STARTER',
  QUANTITY_LIMITED = 'QUANTITY_LIMITED',
  TIME_LIMITED = 'TIME_LIMITED',
  ROOKIE = 'ROOKIE',
}

export interface PackedCardModel {
  cardModelId: Types.ObjectId
  quantity: number
  drawnQuantity: number
}

export interface PackBase {
  name: string
  slug: string
  description: string
  cardsPerPack: number
  tokenId: string
  season: number
}

export interface BuyablePackExtension {
  price: number
  maxQuantityPerUser: number
  supply: number
}

export interface PackBaseDocument extends PackBase, Document {}

// STARTER PACK

export interface StarterPackExtension extends BuyablePackExtension {
  type: PackType.STARTER
}

export interface StarterPack extends PackBase, StarterPackExtension {}
export interface StarterPackExtensionDocument extends StarterPackExtension, Document {}
export interface StarterPackDocument extends StarterPack, Document {}

// QUANTITY LIMITED PACK

export interface QuantityLimitedPackExtension extends BuyablePackExtension {
  type: PackType.QUANTITY_LIMITED
  packedCardModels: PackedCardModel[]
  maxSupply: number
  maxBuyableSupply: number
  releaseDate: Date
}

export interface QuantityLimitedPack extends PackBase, QuantityLimitedPackExtension {}
export interface QuantityLimitedPackExtensionDocument extends QuantityLimitedPackExtension, Document {}
export interface QuantityLimitedPackDocument extends QuantityLimitedPack, Document {}

// TIME LIMITED PACK

export interface TimeLimitedPackExtension extends BuyablePackExtension {
  type: PackType.TIME_LIMITED
  releaseDate: Date
  soldoutDate: Date
  cardModelIds: Types.ObjectId[]
}

export interface TimeLimitedPack extends PackBase, TimeLimitedPackExtension {}
export interface TimeLimitedPackExtensionDocument extends TimeLimitedPackExtension, Document {}
export interface TimeLimitedPackDocument extends TimeLimitedPack, Document {}

// ROOKIE PACK

export interface RookiePackExtension {
  type: PackType.ROOKIE
}

export interface RookiePack extends PackBase, RookiePackExtension {}
export interface RookiePackExtensionDocument extends RookiePackExtension, Document {}
export interface RookiePackDocument extends RookiePack, Document {}

// GLOBAL INTERFACE

export type BuyablePack = StarterPack | QuantityLimitedPack | TimeLimitedPack
export type BuyablePackDocument = BuyablePack & Document

export type Pack = BuyablePack | RookiePack
export type PackDocument = Pack & Document
