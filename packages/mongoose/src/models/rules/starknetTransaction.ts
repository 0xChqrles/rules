import { Schema, model } from 'mongoose'

import { StarknetTransactionDocument } from '../../types/starknetTransaction'

const starknetTransactionSchema = new Schema<StarknetTransactionDocument>({
  hash: {
    type: String,
    required: true,
    unique: true,
  },
  events: {
    type: [{
      key: {
        type: String,
        required: true,
      },
      data: {
        type: [String],
        required: true,
      },
    }],
    default: [],
  },
  l2ToL1Messages: {
    type: [{
      fromAddress: {
        type: String,
        required: true,
      },
      toAddress: {
        type: String,
        required: true,
      },
      payload: {
        type: [String],
        required: true,
      },
    }],
    default: [],
  },
  involvedAddresses: {
    type: [String],
    default: [],
  },
  fromAddress: {
    type: String,
  },
  status: {
    type: String,
    default: 'RECEIVED',
  },
  code: {
    type: String,
  },
  blockNumber: {
    type: Number,
  },
  blockTimestamp: {
    type: Date,
  },
  actualFee: {
    type: String,
  },
  offchainData: {
    type: {},
  },
  index: {
    type: Number,
    unique: true,
    sparse: true,
  }
})

starknetTransactionSchema.index({
  _id: -1,
  hash: 1,
  index: 1,
  fromAddress: 1,
  status: 1,
  blockTimestamp: 1,
  blockNumber: 1,
  'offchainData.action': 1,
  'offchainData.amount': 1,
  'offchainData.l1Recipient': 1,
  'offchainData.consumerHash': 1,
  'offchainData.createdAt': 1,
})

export default model('StarknetTransaction', starknetTransactionSchema, 'starknetTransactions')
