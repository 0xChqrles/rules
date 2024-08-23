import { Document } from 'mongoose'

export interface EmailVerification {
  initiatedByIP: string
  initiatedAt: Date
  username: string
  email: string
  verificationCode: string
  attemptsCount: number
}

export interface EmailVerificationDocument extends EmailVerification, Document {}
