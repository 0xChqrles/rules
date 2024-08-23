import { EventKeys, OldEventKeys } from '../constants'

interface EventBase {
  key: EventKeys | OldEventKeys
}

// Transfers

export interface TransferSingleEvent extends EventBase {
  key: EventKeys.TRANSFER_SINGLE
  operator: string
  from: string
  to: string
  tokenId: string
  amount: bigint
  type: 'pack' | 'card'
}

export interface TransferEvent extends EventBase {
  key: EventKeys.TRANSFER
  from: string
  to: string
  value: string
  type: 'eth'
}

// Account

export interface SignerPublicKeyChangedEvent extends EventBase {
  key: EventKeys.SIGNER_PUBLIC_KEY_CHANGED
  newPublicKey: string
}

// Orders

export interface FulfillOrderEvent extends EventBase {
  key: EventKeys.FULLFILL_ORDER
  hash: string
  offerer: string
  offeree: string
  tokenId: string
  amount: number
  price: string
}

export interface CancelOrderEvent extends EventBase {
  key: EventKeys.CANCEL_ORDER
  hash: string
}

// events parser

export type ParsedEvent =
  | TransferSingleEvent
  | TransferSingleEvent[]
  | TransferEvent
  | SignerPublicKeyChangedEvent
  | FulfillOrderEvent
  | CancelOrderEvent

/**
 * Old events
 */

// Account

export interface AccountInitializedEvent extends EventBase {
  key: OldEventKeys.ACCOUNT_INITIALIZED
  signerPublicKey: string
  guardianPublicKey: string
}

// Offers

export interface OfferAcceptedEvent extends EventBase {
  key: OldEventKeys.OFFER_ACCEPTED
  tokenId: string
  buyer: string
}

export interface OfferCanceledEvent extends EventBase {
  key: OldEventKeys.OFFER_CANCELED
  tokenId: string
}

export interface OfferCreatedEvent extends EventBase {
  key: OldEventKeys.OFFER_CREATED
  tokenId: string
  seller: string
  price: string
}

// old events parser

export type ParsedOldEvent = AccountInitializedEvent | OfferAcceptedEvent | OfferCanceledEvent | OfferCreatedEvent

// parsed messages interfaces

// Withdraws

export interface WithdrawMessage {
  type: 'withdraw'
  l1Recipient: string
  amount: string
}

// messages parser

export type ParsedMessage = WithdrawMessage
