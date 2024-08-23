import { Document } from 'mongoose'

export enum EmailTemplate {
  PACK_RECEPTION = 'pack-reception',
  PACK_OPENING_READY = 'pack-opening-ready',
  PACK_CARDS_RECEPTION = 'pack-cards-reception',
  CARD_RECEPTION = 'card-reception',
  CARD_SOLD = 'card-sold',
  TIME_LIMITED_PACK_PURCHASE = 'TIME_LIMITED_PACK_PURCHASE'
}

export interface Email {
  to: string
  sentAt?: Date
  template: EmailTemplate
  variables: { [key: string]: string }
}

export interface EmailDocument extends Email, Document {}
