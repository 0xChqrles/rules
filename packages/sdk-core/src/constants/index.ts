export * from './addresses'
export * from './networks'

import JSBI from 'jsbi'
import { constructSameEthereumAddressMap } from './addresses'

export const MaxUint256 = JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')

export enum ScarcityName {
  COMMON = 'common',

  PLATINIUM = 'platinium',
  HALLOWEEN = 'halloween',

  HOLOGRAPHIC = 'holo',

  LIVE = 'live',
}

export const Seasons: {
  [key: number]: Array<{
    name: ScarcityName,
    maxSupply?: number
    maxLowSerial: number
    cScoreCoeff?: number
  }>
} = {
  [1]: [
    {
      name: ScarcityName.COMMON,
      maxLowSerial: 100,
    },
    {
      name: ScarcityName.PLATINIUM,
      maxSupply: 350,
      maxLowSerial: 20,
      cScoreCoeff: 10,
    },
    {
      name: ScarcityName.HALLOWEEN,
      maxSupply: 2175,
      maxLowSerial: 100,
      cScoreCoeff: 2.5,
    },
  ],
  [2]: [
    {
      name: ScarcityName.COMMON,
      maxLowSerial: 100,
    },
    {
      name: ScarcityName.HOLOGRAPHIC,
      maxSupply: 350,
      maxLowSerial: 20,
      cScoreCoeff: 10,
    },
    {
      name: ScarcityName.LIVE,
      maxLowSerial: 0,
      cScoreCoeff: 15,
    },
  ],
}

export const CURRENT_SEASON = Object.keys(Seasons).map((season) => +season).sort((a, b) => b - a)[0]

// Signer escape

export const MINIMUM_ETH_BALANCE_TO_ESCAPE_SIGNER = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(15)) // 0.001 ETH
export const ESCAPE_SECURITY_PERIOD = 3 * 24 * 60 * 60 // 3 days

// tx actions

export enum StarknetTransactionAction {
  ACCOUNT_DEPLOYMENT = 'account-deployment',
  PACKS_DELIVERY = 'packs-delivery',
  PACKS_OPENING_PREPARATION = 'packs-opening-preparation',
  PACKS_OPENING = 'packs-opening',
  WALLET_UPGRADE = 'wallet-upgrade',
  SIGNER_ESCAPE_TRIGGERED = 'signer-escape-triggered',
  SIGNER_ESCAPED = 'signer-escaped',
  WITHDRAW = 'withdraw',
  CARD_TRANSFER = 'card-transfer',
  OFFER_CREATION = 'offer-creation',
  OFFER_CANCELLATION = 'offer-cancellation',
  OFFER_ACCEPTANCE = 'offer-acceptance',
  LIVE_REWARDS_DELIVERY = 'live-rewards-delivery',
}

// C-Score

export const C_SCORE_GLOBAL_MULTIPLICATOR = 1_000

// IPFS

export const CAIRO_FIELD_PRIME_CID = 'QmNssyH6oBvgZBcS7pB8v7hUbBx2ntxfd5NdBY6kyFtHje' // 0x1220 - CAIRO_FIELD_PRIME

// EVENTS

export enum EventKeys {
  TRANSFER_SINGLE = '0x182d859c0807ba9db63baf8b9d9fdbfeb885d820be6e206b9dab626d995c433', // TransferSingle
  TRANSFER_BATCH = '0x2563683c757f3abe19c4b7237e2285d8993417ddffe0b54a19eb212ea574b08', // TransferBatch

  SIGNER_ESCAPED = '0x3be5f03402711c65afe7d36fb0d16b3de28b1cd9b499ede52294d0f7ffd28f', // SignerEscaped
  SIGNER_PUBLIC_KEY_CHANGED = '0x13b83cdd8835621a1642174f11f8c47f6d2a97ea48342ef6e956af32cc89bee', // SignerPublicKeyChanged

  FULLFILL_ORDER = '0x377cbc684ca4dbfb21e6b0171e1753221b0bc29d43dd82a782039fd43f2e856', // FulfillOrder
  CANCEL_ORDER = '0xb792a85dbf71e2d3655418ca28e9946996c536760c97837abc48e81d429f79', // CancelOrder

  TRANSFER = '0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9', //Transfer
}

export enum OldEventKeys {
  SIGNER_ESCAPE_TRIGGERED = '0x2707ca142d3372814b637f70df7ac4bf96aaea1ca79a385e0925dd420380164', // SignerEscapeTriggered

  ACCOUNT_INITIALIZED = '0x00d876503fb434f7517a7b4ae8d0d5fba27e2fa7b1a9f200deb935316f46fcc3', // AccountInitialized
  ACCOUNT_UPGRADED = '0x2b2db2ed38136ca6c54b95187166f98ea84503db8768617a558705b508fec82', // AccountUpgraded

  OFFER_CREATED = '0x3dfc158c05b32ed2ffabe664bf6edb241c38aa671d19165307582cde75743b6', // OfferCreated
  OFFER_CANCELED = '0x1a9f66f1b6840fc35aa5f06c683218c264c71b435dd5be19d94729df4532482', // OfferCanceled
  OFFER_ACCEPTED = '0x309058ad25cd782e894bb5ed51758424e0fcfaf9b0e2996dec721837242fd4d', // OfferAccepted
}

export const WITHDRAW_MESSAGE = '0x0'

// PKS

export const DUMMY_PK = '0xB00B135'

// Class hashes

export const ACCOUNT_CLASS_HASH = '0x1c644efdf255bffbac0bc7915e969edac4c0bcae5f162dc47382c2fd4fff4ab'
export const RULES_TOKENS_CLASS_HASH = '0xf85df4e02c745d0239d9bcdb5676f30b07dea78c9a0fcec265c39a93ae8516'
export const MARKETPLACE_CLASS_HASH = '0x1c8d23cfc53b188e7f584ff179bc11ac25158c64bd2af9b906f7acd6f52f414'

export enum ItemType {
  NATIVE,
  ERC_20,
  ERC_712,
  ERC_1155,
}

// KASS

export const L1_KASS_TOKEN_BYTECODE_HASH =
  constructSameEthereumAddressMap('0x946bb0b5e0c21d31122c0eada2759f3f3f2d5dd41f36050206f5e1348e0401e')
