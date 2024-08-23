import { Schema, model } from 'mongoose'

import { EmailVerificationDocument } from '../../types/emailVerification'

const emailVerificationSchema = new Schema<EmailVerificationDocument>({
  initiatedByIP: {
    type: String,
    required: true,
  },
  initiatedAt: {
    type: Date,
    required: true,
    expires: 900,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  verificationCode: {
    type: String,
    required: true,
  },
  attemptsCount: {
    type: Number,
    default: 0,
  },
})

export default model('EmailVerification', emailVerificationSchema, 'emailVerifications')
