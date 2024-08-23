import { Document } from 'mongoose'

export interface StarknetTransactionOffchainData {
  createdAt: Date
  action: string
  involvedAddresses?: string[]
  [key: string]: any
}

export interface StarknetTransaction {
  hash: string
  events: Array<{
    key: string
    data: string[]
  }>
  l2ToL1Messages: Array<{
    fromAddress: string
    toAddress: string
    payload: string[]
  }>
  involvedAddresses: string[]
  fromAddress?: string
  status: string
  code?: string
  blockNumber?: number
  blockTimestamp?: Date
  actualFee?: string
  offchainData?: StarknetTransactionOffchainData
  index?: number
}

export interface StarknetTransactionDocument extends StarknetTransaction, Document {}
