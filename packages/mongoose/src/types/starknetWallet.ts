import { Document } from 'mongoose'

export interface RulesPrivateKey {
  encryptedPrivateKey: string
  iv: string
  salt: string
}

export interface StarknetWallet {
  address: string
  oldAddress?: string

  rulesPrivateKey?: RulesPrivateKey

  publicKey: string
  currentPublicKey: string
  currentOldPublicKey?: string

  maintenance: boolean

  deployed: boolean
}

export interface StarknetWalletDocument extends StarknetWallet, Document {}
