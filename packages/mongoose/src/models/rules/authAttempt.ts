import { Schema, model } from 'mongoose'

import { AuthAttemptsDocument } from '../../types/authAttempt'

const authAttemptsSchema = new Schema<AuthAttemptsDocument>({
  initiatedByIP: {
    type: String,
    required: true,
  },
  lastTryAt: {
    type: Date,
    expires: 3_600, // 1h
  },
  email: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
})

export default model('AuthAttempts', authAttemptsSchema, 'authAttempts')
