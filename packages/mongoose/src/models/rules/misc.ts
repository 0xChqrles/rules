import { Schema } from 'mongoose'

import { OwnerDocument, SignatureDocument, MessageSigningDataDocument } from '../../types'

export const ownerSchema = new Schema<OwnerDocument>({
  starknetAddress: {
    type: String,
    required: true,
  },
  transferStarknetTransaction: {
    type: Schema.Types.ObjectId,
  },
})

export const signatureSchema = new Schema<SignatureDocument>({
  r: {
    type: String,
    required: true,
  },
  s: {
    type: String,
    required: true,
  },
})

export const messageSigningDataSchema = new Schema<MessageSigningDataDocument>({
  signature: {
    type: signatureSchema,
    require: true,
  },
  salt: {
    type: String,
    require: true,
  },
})
