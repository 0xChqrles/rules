import { Document } from 'mongoose'

import { MessageSigningData, Owner } from './misc'

export interface Draw {
  cardTokenIds: string[]
  createdAt: Date
}

export interface PackBalance {
  draws: Draw[]
  lockedDraws: Draw[]
  openedDraws: Draw[]
  voucherSigningData: MessageSigningData
  voucherAmount: number
  tokenId: string
  owner: Owner
  emptyBalance: number
  lastDrawAt?: Date
}

export interface PackBalanceDocument extends PackBalance, Document {}
