import { AlchemyProvider } from 'ethers'
import { Account, RpcProvider } from 'starknet'

import { RulesAccount } from '../constants'
import { NetworkInfos } from '../types'

export abstract class RulesSdkInterface {

  readonly networkInfos!: NetworkInfos

  readonly starknetAccounts!: { [name in RulesAccount]: Account[] }

  readonly alchemyProvider?: AlchemyProvider

  readonly starknet!: RpcProvider
}
