import ms from 'ms'
import { constants } from 'starknet'

import { NetworkInfos } from '../types'

export enum StarknetNetworkName {
  MAINNET = constants.NetworkName.SN_MAIN as any,
  GOERLI = constants.NetworkName.SN_GOERLI as any,
}

export enum StarknetChainId {
  MAINNET = constants.StarknetChainId.SN_MAIN as any,
  GOERLI = constants.StarknetChainId.SN_GOERLI as any,
}

export enum EthereumChainId {
  MAINNET = 1,
  GOERLI = 5,
}

export const DEFAULT_NETWORK_NAME = StarknetNetworkName.GOERLI

export const SN_NETWORKS_INFOS: { [network in StarknetNetworkName]: NetworkInfos } = {
  [StarknetNetworkName. MAINNET]: {
    starknetChainId: StarknetChainId.MAINNET,
    ethereumChainId: EthereumChainId.MAINNET,
    blockTime: ms('2.5m'),
    maxBlockSyncingPerExecution: 1,
  },
  [StarknetNetworkName.GOERLI]: {
    starknetChainId: StarknetChainId.GOERLI,
    ethereumChainId: EthereumChainId.GOERLI,
    blockTime: ms('1m'),
    maxBlockSyncingPerExecution: 10,
  },
}
