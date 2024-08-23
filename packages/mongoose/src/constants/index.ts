export const MIN_SEASON = 1
export const MIN_CARDS_PER_PACK = 1
export const MIN_PRICE = 0.01
export const MIN_PACK_CARD_MODEL_QUANTITY = 1
export const MAX_CARDS_PER_PACK = 10
export const MIN_PACK_MAX_SUPPLY = 0

export const RULES_DATABASE_COLLECTION_NAMES = ['users']

export enum SettingKey {
  LAST_ETHEREUM_BLOCK_NUMBER = 'last-ethereum-block-number',

  LAST_STARKNET_L1_BLOCK_NUMBER = 'last-l1-block-number',
  LAST_STARKNET_L2_BLOCK_NUMBER = 'last-l2-block-number',
  LAST_STARKNET_L2_BLOCK_HASH = 'last-l2-block-hash',
  LAST_STARKNET_PENDING_TX_HASHES = 'last-pending-block-transactions-hashes',
  LAST_STARKNET_L1_TX_HASHES = 'last-l1-block-transactions-hashes',
}

export const NumberSettings = {
  [SettingKey.LAST_ETHEREUM_BLOCK_NUMBER]: true,
  [SettingKey.LAST_STARKNET_L1_BLOCK_NUMBER]: true,
  [SettingKey.LAST_STARKNET_L2_BLOCK_NUMBER]: true,
}

export const StringSettings = {
  [SettingKey.LAST_STARKNET_L2_BLOCK_HASH]: true,
  [SettingKey.LAST_STARKNET_PENDING_TX_HASHES]: true,
  [SettingKey.LAST_STARKNET_L1_TX_HASHES]: true,
}
