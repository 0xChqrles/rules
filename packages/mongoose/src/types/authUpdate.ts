import { Document, Types } from 'mongoose'

export interface AuthUpdate {
  initiatedByIP: string
  userId: Types.ObjectId
  initiatedAt: Date
  token: string
}

export interface AuthUpdateDocument extends AuthUpdate, Document {}
