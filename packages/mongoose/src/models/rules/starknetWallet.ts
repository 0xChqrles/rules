import { Schema } from 'mongoose'
import { RulesPrivateKey, StarknetWalletDocument } from '../../types/starknetWallet'

const rulesPrivateKeySchema = new Schema<RulesPrivateKey>({
  encryptedPrivateKey: {
    type: String,
    required: true,
  },
  iv: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
})

const starknetWalletSchema = new Schema<StarknetWalletDocument>({
  address: {
    type: String,
    required: true,
    index: true,
  },
  oldAddress: {
    type: String,
  },

  rulesPrivateKey: {
    type: rulesPrivateKeySchema,
    required: false,
  },

  publicKey: {
    type: String,
    required: true,
  },
  currentPublicKey: {
    type: String,
    required: true,
  },
  currentOldPublicKey: {
    type: String,
  },

  maintenance: {
    type: Boolean,
    default: false,
  },

  deployed: {
    type: Boolean,
    default: false,
  },
})

starknetWalletSchema.index({ address: 1 })

export { starknetWalletSchema }
