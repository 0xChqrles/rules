import { Calldata, hash, uint256 } from 'starknet'

import { Signature, Uint256 } from '../types'
import { ACCOUNT_CLASS_HASH, ETH_ADDRESSES, ItemType, RULES_TOKENS_ADDRESSES, StarknetChainId } from '../constants'

export function getVoucherCalldata(
  receiver: string,
  tokenId: Uint256 | string,
  amount: number,
  salt: string,
) {
  const u256TokenId = typeof tokenId === 'string' ? uint256.bnToUint256(tokenId) : tokenId

  return [
    { receiver },

    { tokenIdLow: u256TokenId.low },
    { tokenIdHigh: u256TokenId.high },

    { amountLow: amount },
    { amountHigh: 0 },

    { salt },
  ]
}

export function getListingOrderCalldata(
  chainId: StarknetChainId,
  tokenId: Uint256 | string,
  amount: number,
  price: string,
  salt: string,
) {
  const u256TokenId = typeof tokenId === 'string' ? uint256.bnToUint256(tokenId) : tokenId

  const offerItem = [
    { type: ItemType.ERC_1155 },

    { token: RULES_TOKENS_ADDRESSES[chainId] },

    { tokenIdLow: u256TokenId.low },
    { tokenIdHigh: u256TokenId.high },

    { amountLow: amount },
    { amountHigh: 0 },
  ]

  const considerationItem = [
    { type: ItemType.ERC_20 },

    { token: ETH_ADDRESSES[chainId] },

    { amountLow: price },
    { amountHigh: 0 },
  ]

  return [
    ...offerItem,
    ...considerationItem,

    { endTime: 0 },

    { salt },
  ]
}

export function getDeploymentDataCalldata(deploymentCalldata?: Calldata) {
  if (!deploymentCalldata) return [0, 0, 0, 0]

  const calldataHash = hash.computeHashOnElements(deploymentCalldata);

  return [
    { publicKey: deploymentCalldata[0] },
    { classHash: ACCOUNT_CLASS_HASH },
    { calldataHash },
    { deployer: 0 },
  ]
}

export function getSignatureCalldata(signature: Signature) {
  return [
    { voucherSignatureLen: 2 },
    { voucherSignatureR: signature.r },
    { voucherSignatureS: signature.s },
  ]
}
