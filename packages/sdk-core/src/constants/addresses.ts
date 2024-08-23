import { AccountMaps, AddressMap, SupportedChainId } from '../types'
import { StarknetChainId, EthereumChainId } from './networks'

// Contracts

function constructSameAddressMap(address: string, chainIds: SupportedChainId[]) {
  return chainIds.reduce<Record<SupportedChainId, string>>((acc, chainId) => {
    acc[chainId] = address
    return acc
  }, {} as any)
}

export const constructSameEthereumAddressMap = (address: string) =>
  constructSameAddressMap(address, Object.values(EthereumChainId) as EthereumChainId[])

export const constructSameStarknetAddressMap = (address: string) =>
  constructSameAddressMap(address, Object.values(StarknetChainId) as StarknetChainId[])

/* Kass contract Addresses */
export const KASS_ADDRESSES = {
  ...constructSameEthereumAddressMap('0x60f708e94b4da70727102f0a6f2aefb7a1ee0dfe'),
  ...constructSameStarknetAddressMap('0xdead'),
}

/* Rules */
export const RULES_TOKENS_ADDRESSES = {
  [StarknetChainId.GOERLI]: '0x5f5c553e2bfb3ac1cd11a286fb6bc1deb286b97b17f9d61a1793c1d956827c4',
  [StarknetChainId.MAINNET]: '0x5b456031650c1de9eec123d3e7d06a684d321a346d4a7cac9fd86c2b77cf70f',
}

/* Starknet ETH */
export const ETH_ADDRESSES = {
  [StarknetChainId.GOERLI]: '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
  [StarknetChainId.MAINNET]: '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
}

/* Starknet STRK */
export const STRK_ADDRESSES = {
  [StarknetChainId.GOERLI]: '0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
  [StarknetChainId.MAINNET]: '0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
}

/* Marketplace */
export const MARKETPLACE_ADDRESSES = {
  [StarknetChainId.GOERLI]: '0x59a79044f8a816a4bd6c5cdd992fbeb26b81747fb8de4cb6ec021f8b6858d6d',
  [StarknetChainId.MAINNET]: '0x1fea6c39f413ee5a5d81704e4fc45d814c86711947b2973f8df2a733d6d9937',
}

/* Starkgate contract addresses */
export const STARKGATE_ADDRESSES = {
  ...constructSameStarknetAddressMap('0x73314940630fd6dcda0d772d4c972c4e0a9946bef9dabf4ef84eda8ef542b82'),
  [EthereumChainId.GOERLI]: '0xc3511006C04EF1d78af4C8E0e74Ec18A6E64Ff9e',
  [EthereumChainId.MAINNET]: '0xae0Ee0A63A2cE6BaeEFFE56e7714FB4EFE48D419',
}

/* Multicall */
export const MULTICALL_ADDRESSES: AddressMap = {
  [StarknetChainId.GOERLI]: '0x042a12c5a641619a6c58e623d5735273cdfb0e13df72c4bacb4e188892034bd6',
  [StarknetChainId.MAINNET]: '0x0740a7a14618bb7e4688d10059bc42104d22c315bb647130630c77d3b6d3ee50',
  [EthereumChainId.GOERLI]: '0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e',
  [EthereumChainId.MAINNET]: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
}

/* UCD */
export const UCD_ADDRESSES: AddressMap = {
  [StarknetChainId.GOERLI]: '0x041a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf',
  [StarknetChainId.MAINNET]: '0x041a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf',
}

/* Tax reserve */
export const TAX_RESERVE_ADDRESSES: AddressMap = {
  [StarknetChainId.GOERLI]: '0x7c936b2c29e54b1aa24e1f33f36d1b2ce3c7755f87a5a837c924fc56bde7d86',
  [StarknetChainId.MAINNET]: '0x5abca3aa491806315a8cadebee93a8a167a4c0ac1a56b924429a891970e0b8d',
}

/* Accounts */
export enum RulesAccount {
  VOUCHER_SIGNER = 'VOUCHER_SIGNER',
}

export const ACCOUNTS: AccountMaps = {
  [StarknetChainId.MAINNET]: {
    [RulesAccount.VOUCHER_SIGNER]: '0x4b5cab01f7e6e59df39c14a3f3436c721554f719e42618fd4e69e4a605d39ef',
  },
  [StarknetChainId.GOERLI]: {
    [RulesAccount.VOUCHER_SIGNER]: '0x666cd8bd54848d52fac2bba6391a5b6abed75ddad2c113c1746ffa9fd541d8b',
  },
}
