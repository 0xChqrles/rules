import JSBI from 'jsbi'

import { EthereumChainId, RulesAccount, StarknetChainId } from '../constants'

export * from './events'
export * from './messages'
export * from './api'

export type SupportedChainId = EthereumChainId | StarknetChainId

export interface NetworkInfos {
  starknetChainId: StarknetChainId
  ethereumChainId: EthereumChainId
  blockTime: number
  maxBlockSyncingPerExecution: number
}

export type AddressMap = { [chainId in SupportedChainId]?: string }

export type AccountMap = { [account in RulesAccount]: string | Array<string> }

export type AccountMaps = { [chainId in StarknetChainId]: AccountMap }

export type BigintIsh = number | string | JSBI

export interface RulesSdkOptions {
  alchemyApiKey?: string
  pks?: AccountMap
}

export interface Metadata {
  hash: Uint256
  multihashIdentifier: number
}

export interface FeltMetadata {
  hash: string
  multihashIdentifier: number
}

export interface IpfsHashWithNonce {
  ipfsHash: string
  nonce: number
}

export interface Uint256 {
  low: string
  high: string
}

export type ScarcityName = 'common' | 'platinium' | 'halloween' | 'holo' | 'live'

export interface Signature {
  r: string
  s: string,
}
