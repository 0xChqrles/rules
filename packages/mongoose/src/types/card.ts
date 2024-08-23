import { Document, Types } from 'mongoose'

import { Owner, MessageSigningData } from './misc'

export interface Card {
  slug: string
  cardModelId: Types.ObjectId
  serialNumber: number
  createdAt: Date
  tokenId: string
  owner?: Owner
  voucherSigningData?: MessageSigningData

  artistName: string

  ownedSince?: Date

  season: number
  scarcityAbsoluteId: number

  lastPrice: string
  gweiLastPrice: number
}

export interface CardDocument extends Card, Document {}
