import { Document } from 'mongoose'

export interface CardModel {
  uid: number
  slug: string
  season: number
  scarcityId: number
  artistName: string
  salesCount: number
  salesTotal: string
  youtubePreviewId?: string
  availableSerialNumbers: number[]
  maxSupply?: number

  scarcityAbsoluteId: number

  gweiLowestAsk: number
  lowestAsk: string

  gweiLowSerialLowestAsk: number
  lowSerialLowestAsk: string
}

export interface CardModelDocument extends CardModel, Document {}
