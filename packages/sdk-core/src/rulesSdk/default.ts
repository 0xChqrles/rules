import { AlchemyProvider, keccak256 } from 'ethers'
import {
  Account,
  BlockTag,
  Call,
  Calldata,
  ProviderInterface,
  RpcProvider,
  encode,
  num,
  stark,
  typedData,
  uint256,
} from 'starknet'

import { NetworkInfos, RulesSdkOptions, FullBlock, Uint256, Signature } from '../types'
import { RulesSdkInterface } from './interface'
import {
  ACCOUNTS,
  DUMMY_PK,
  ETH_ADDRESSES,
  ItemType,
  KASS_ADDRESSES,
  L1_KASS_TOKEN_BYTECODE_HASH,
  MARKETPLACE_ADDRESSES,
  RULES_TOKENS_ADDRESSES,
  RulesAccount,
  SN_NETWORKS_INFOS,
  StarknetNetworkName,
} from '../constants'
import { formatSignature } from '../utils/sign'
import { getDeploymentDataCalldata, getListingOrderCalldata, getSignatureCalldata, getVoucherCalldata } from '../utils/calldata'

export function buildAccount(
  provider: ProviderInterface,
  addresses: string | string[],
  pks: string | string[] = []
): Account[] {
  addresses = Array.isArray(addresses) ? addresses : [addresses]
  pks = Array.isArray(pks) ? pks : [pks]

  return addresses.map((address, index) => new Account(provider, address, pks[index] ?? DUMMY_PK, '1'))
}

function block_id(blockIdentifier: Parameters<ProviderInterface['getBlock']>[0]): any {
  if (typeof blockIdentifier === 'string' && num.isHex(blockIdentifier)) {
    return { block_hash: blockIdentifier }
  } else if (typeof blockIdentifier === 'bigint') {
    return { block_hash: num.toHex(blockIdentifier) }
  } else if (typeof blockIdentifier === 'number') {
    return { block_number: blockIdentifier }
  } else if (
    typeof blockIdentifier === 'string' &&
    Object.values(BlockTag).includes(blockIdentifier as BlockTag)
  ) {
    return blockIdentifier
  } else {
    // default
    return BlockTag.pending;
  }
}

export class ExtendedRpcProvider extends RpcProvider {
  public async getFullBlock(blockIdentifier: Parameters<ProviderInterface['getBlock']>[0]): Promise<FullBlock> {
    return this.fetchEndpoint('starknet_getBlockWithTxs', { block_id: block_id(blockIdentifier) }) as FullBlock
  }
}

export class RulesSdk implements RulesSdkInterface {

  readonly networkInfos: NetworkInfos

  readonly starknetAccounts!: { [name in RulesAccount]: Account[] }

  readonly alchemyProvider?: AlchemyProvider

  readonly starknet: ExtendedRpcProvider

  constructor(networkName: StarknetNetworkName, nodeUrl: string, options: RulesSdkOptions = {}) {
    this.networkInfos = SN_NETWORKS_INFOS[networkName]

    // starknet provider
    this.starknet = new ExtendedRpcProvider({ nodeUrl })

    // alchemy
    if (options.alchemyApiKey) {
      this.alchemyProvider = new AlchemyProvider(this.networkInfos.ethereumChainId, options.alchemyApiKey)
    }

    // built properties
    Object.defineProperties(this, {
      starknetAccounts: { enumerable: true, writable: false, value: {} },
    })

    // starknet accounts
    for (const rulesAccount of Object.keys(ACCOUNTS[this.networkInfos.starknetChainId]) as RulesAccount[]) {
      Object.defineProperty(this.starknetAccounts, rulesAccount, {
        enumerable: true,
        writable: false,
        value: buildAccount(
          this.starknet,
          ACCOUNTS[this.networkInfos.starknetChainId][rulesAccount],
          options.pks?.[rulesAccount]
        ),
      })
    }
  }

  public async signVoucherFor(receiver: string, tokenId: string, salt: string, amount: number = 1) {
    const data = {
      message: {
        receiver,
        tokenId: uint256.bnToUint256(tokenId),
        amount: {
          low: amount,
          high: 0,
        },
        salt,
      },
      domain: {
        name: "Rules",
        chainId: this.networkInfos.starknetChainId,
        version: "1.1",
      },
      types: {
        // IMPORTANT: Do not change StarkNetDomain to StarknetDomain
        StarkNetDomain: [
          { name: "name", type: "felt252" },
          { name: "chainId", type: "felt252" },
          { name: "version", type: "felt252" },
        ],
        Voucher: [
          { name: "receiver", type: "felt252" },
          { name: "tokenId", type: "u256" },
          { name: "amount", type: "u256" },
          { name: "salt", type: "felt252" },
        ],
        u256: [
          { name: 'low', type: 'felt252' },
          { name: 'high', type: 'felt252' },
        ],
      },
      primaryType: "Voucher",
    }

    const voucherSigner = this.starknetAccounts.VOUCHER_SIGNER[0]

    const signature = await voucherSigner.signMessage(data)

    return formatSignature(signature)
  }

  public async computeListingOrderHash(offerer: string, tokenId: string, amount: number, price: string, salt?: string) {
    const data = {
      message: {
        offerItem: {
          token: RULES_TOKENS_ADDRESSES[this.networkInfos.starknetChainId],
          identifier: uint256.bnToUint256(tokenId),
          amount: uint256.bnToUint256(amount),
          itemType: ItemType.ERC_1155,
        },
        considerationItem: {
          token: ETH_ADDRESSES[this.networkInfos.starknetChainId],
          identifier: uint256.bnToUint256(0),
          amount: uint256.bnToUint256(price),
          itemType: ItemType.ERC_20,
        },
        endTime: 0,
        salt: salt ?? stark.randomAddress(),
      },
      domain: {
        name: "Rules Marketplace",
        chainId: this.networkInfos.starknetChainId,
        version: "1.0",
      },
      types: {
        // IMPORTANT: Do not change StarkNetDomain to StarknetDomain
        StarkNetDomain: [
          { name: "name", type: "felt252" },
          { name: "chainId", type: "felt252" },
          { name: "version", type: "felt252" },
        ],
        Order: [
          { name: "offerItem", type: "Item" },
          { name: "considerationItem", type: "Item" },
          { name: "endTime", type: "felt252" },
          { name: "salt", type: "felt252" },
        ],
        Item: [
          { name: "token", type: "felt252" },
          { name: "identifier", type: "u256" },
          { name: "amount", type: "u256" },
          { name: "itemType", type: "felt252" },
        ],
        u256: [
          { name: 'low', type: 'felt252' },
          { name: 'high', type: 'felt252' },
        ],
      },
      primaryType: "Order",
    }

    return typedData.getMessageHash(data, offerer)
  }

  /**
   * Calls
   */

  public getVoucherRedeemCall(
    receiver: string,
    tokenId: Uint256 | string,
    amount: number,
    salt: string,
    signature: Signature
  ): Call {
    return {
      contractAddress: RULES_TOKENS_ADDRESSES[this.networkInfos.starknetChainId],
      entrypoint: 'redeem_voucher',
      calldata: [
        ...getVoucherCalldata(receiver, tokenId, amount, salt),
        ...getSignatureCalldata(signature),
      ],
    }
  }

  public getVoucherRedeemToCall(
    receiver: string,
    to: string,
    tokenId: Uint256 | string,
    amount: number,
    salt: string,
    signature: Signature
  ): Call {
    return {
      contractAddress: RULES_TOKENS_ADDRESSES[this.networkInfos.starknetChainId],
      entrypoint: 'redeem_voucher_to',
      calldata: [
        { to },
        ...getVoucherCalldata(receiver, tokenId, amount, salt),
        ...getSignatureCalldata(signature),
      ],
    }
  }

  public getOrderCancelationCall(
    tokenId: Uint256 | string,
    amount: number,
    price: string,
    salt: string,
    signature: Signature
  ): Call {
    return {
      contractAddress: MARKETPLACE_ADDRESSES[this.networkInfos.starknetChainId],
      entrypoint: 'cancel_order',
      calldata: [
        ...getListingOrderCalldata(this.networkInfos.starknetChainId, tokenId, amount, price, salt),
        ...getSignatureCalldata(signature),
      ],
    }
  }

  public getOrderFulfillCall(
    offerer: string,
    tokenId: Uint256 | string,
    amount: number,
    price: string,
    salt: string,
    signature: Signature
  ): Call {
    return {
      contractAddress: MARKETPLACE_ADDRESSES[this.networkInfos.starknetChainId],
      entrypoint: 'fulfill_order',
      calldata: [
        { offerer },
        ...getListingOrderCalldata(this.networkInfos.starknetChainId, tokenId, amount, price, salt),
        ...getSignatureCalldata(signature),
      ],
    }
  }

  public getVoucherReedemAndOrderFulfillCall(
    offerer: string,

    tokenId: Uint256 | string,
    amount: number,
    price: string,

    voucherSalt: string,
    voucherSignature: Signature,

    orderSalt: string,
    orderSignature: Signature,

    offererDeploymentCalldata?: Calldata
  ): Call {
    return {
      contractAddress: MARKETPLACE_ADDRESSES[this.networkInfos.starknetChainId],
      entrypoint: 'fulfill_order_with_voucher',
      calldata: [
        ...getVoucherCalldata(offerer, tokenId, amount, voucherSalt),
        ...getSignatureCalldata(voucherSignature),

        ...getListingOrderCalldata(this.networkInfos.starknetChainId, tokenId, amount, price, orderSalt),
        ...getSignatureCalldata(orderSignature),

        ...getDeploymentDataCalldata(offererDeploymentCalldata),
      ],
    }
  }

  /**
   * KASS
   */

  public computeL1KassTokenAddress(l2TokenAddress: string) {
    const l1KassAddress = encode.removeHexPrefix(KASS_ADDRESSES[this.networkInfos.ethereumChainId]).padStart(0x28, '0')

    l2TokenAddress = encode.removeHexPrefix(l2TokenAddress).padStart(0x40, '0')

    const l1KassTokenBytecodeHash = encode
      .removeHexPrefix(L1_KASS_TOKEN_BYTECODE_HASH[this.networkInfos.ethereumChainId])
      .padStart(0x40, '0')

    const res = keccak256(`0xff${l1KassAddress}${l2TokenAddress}${l1KassTokenBytecodeHash}`)

    return encode.addHexPrefix(res.substring(res.length - 0x28))
  }
}
