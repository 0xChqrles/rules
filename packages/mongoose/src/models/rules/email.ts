import { Schema, model } from 'mongoose'

import { EmailDocument, EmailTemplate } from '../../types/email'

const emailSchema = new Schema<EmailDocument>({
  to: {
    required: true,
    type: String,
  },
  sentAt: Date,
  template: {
    require: true,
    enum: EmailTemplate,
    type: String,
  },
  variables: {
    type: {},
    default: {},
  },
})

export default model('Email', emailSchema, 'emails')
