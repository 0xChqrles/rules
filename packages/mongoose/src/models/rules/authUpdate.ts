import { Schema, model } from 'mongoose'

import { AuthUpdateDocument } from '../../types/authUpdate'

const authUpdateSchema = new Schema<AuthUpdateDocument>({
  initiatedByIP: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  initiatedAt: {
    type: Date,
    required: true,
    expires: 900,
  },
  token: {
    type: String,
    required: true,
  },
})

export default model('AuthUpdate', authUpdateSchema, 'authUpdates')
