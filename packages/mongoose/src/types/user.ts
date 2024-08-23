import { Document, Types } from 'mongoose'
import { StarknetWallet } from './starknetWallet'

export interface OwnedCardModel {
  cardModelId: Types.ObjectId
  serialNumbers: number[]
}

export interface DeckCard {
  cardSlug: string
  cardIndex: number
}

export interface UserProfile {
  avatarId?: number
  certified: boolean
  admin?: boolean
  twitterUsername?: string
  instagramUsername?: string
  discordId?: string
  discordAvatar?: string
  guildAvatar?: string
  isDiscordVisible: boolean
}

export interface User {
  createdAt: Date
  username: string
  usernameLength: number
  slug: string
  email: string
  password: string
  paymentMethodFingerprints: string[]
  showcasedDeck: DeckCard[]
  refreshTokens: string[]
  profile: UserProfile
  ownedCardModels: OwnedCardModel[]
  acceptCommercialEmails: boolean
  searchedUserIds: Types.ObjectId[]
  cScoreSeason1: number
  cScoreSeason2: number
  twoFactorAuthSecret: string
  starknetWallet: StarknetWallet
  newcomer: boolean
  referentUserId?: Types.ObjectId
}

export interface UserDocument extends User, Document {}
export interface UserProfileDocument extends UserProfile, Document {}
