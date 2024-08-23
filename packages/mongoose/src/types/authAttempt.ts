import { Document } from 'mongoose'

export interface AuthAttempts {
  initiatedByIP: string
  lastTryAt?: Date
  email: string
  count: number
}

export interface AuthAttemptsDocument extends AuthAttempts, Document {}
