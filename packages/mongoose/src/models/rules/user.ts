import { Schema, model } from 'mongoose'

import { UserProfileDocument, UserDocument } from '../../types/user'
import { starknetWalletSchema } from './starknetWallet'

const userProfileSchema = new Schema<UserProfileDocument>({
  avatarId: Number,
  certified: {
    type: Boolean,
    required: true,
  },
  admin: Boolean,
  twitterUsername: String,
  instagramUsername: String,
  discordId: String,
  discordAvatar: String,
  guildAvatar: String,
  isDiscordVisible: {
    type: Boolean,
    default: true,
  },
})

const userSchema = new Schema<UserDocument>({
  createdAt: {
    type: Date,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  usernameLength: {
    type: Number,
    require: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  paymentMethodFingerprints: {
    type: [String],
    default: [],
    required: true,
  },
  refreshTokens: {
    type: [String],
    default: [],
    required: true,
  },
  showcasedDeck: {
    type: [{
      cardSlug: {
        type: String,
        required: true,
      },
      cardIndex: {
        type: Number,
        required: true,
      },
    }],
    default: [],
    validate: {
      validator: (array: any[]) => array.length <= 5,
      message: '{PATH} exceeds the limit of 5',
    },
    required: true,
  },
  profile: {
    type: userProfileSchema,
    required: true
  },
  starknetWallet: {
    type: starknetWalletSchema,
    required: true
  },
  acceptCommercialEmails: {
    type: Boolean,
    required: true,
  },
  searchedUserIds: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    default: [],
  },
  cScoreSeason1: {
    type: Number,
    default: 0,
  },
  cScoreSeason2: {
    type: Number,
    default: 0,
  },
  twoFactorAuthSecret: {
    type: String,
  },
  ownedCardModels: {
    type: [{
      cardModelId: {
        type: Schema.Types.ObjectId,
        ref: 'CardModel',
        required: true,
      },
      serialNumbers: {
        type: [Number],
        default: [],
      },
    }],
    default: [],
  },
  newcomer: {
    type: Boolean,
    default: false,
  },

  referentUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
})

userSchema.index({
  slug: 1,
  email: 1,
  paymentMethodFingerprints: 1,
  'profile.certified': 1,
  cScoreSeason1: 1,
  cScoreSeason2: 1,
})

export default model('User', userSchema, 'users')
