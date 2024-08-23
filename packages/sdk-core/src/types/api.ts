import { MessageToL1, Event, TransactionType } from 'starknet'

export interface FullMessageToL1 extends MessageToL1 {
  from_address: string
}

export interface TransactionReceipt {
  events?: Array<Event>
  l2_to_l1_messages?: Array<FullMessageToL1>
  transaction_hash?: string
  actual_fee?: string
  transaction_index?: number
}

export interface Transaction {
  sender_address?: string
  transaction_hash?: string
  type?: TransactionType
  contract_address?: string
  class_hash?: string
}

export interface FullBlock {
  status?: string
  transaction_receipts?: Array<TransactionReceipt>
  block_number?: number
  parent_block_hash?: string
  block_hash?: string
  transactions?: Array<Transaction>
  gas_price?: string
  timestamp?: number
}
