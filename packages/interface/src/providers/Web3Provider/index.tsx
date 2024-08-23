import { argent, braavos, StarknetConfig, starkscan, useInjectedConnectors } from '@starknet-react/core'
import { useQueryClient } from '@tanstack/react-query'
import { nethermindRpcProviders, SUPPORTED_STARKNET_NETWORKS } from 'src/constants/networks'
import { ArgentMobileConnector } from 'starknetkit/argentMobile'
import { WebWalletConnector } from 'starknetkit/webwallet'

// STARKNET

export function StarknetProvider({ children }: React.PropsWithChildren) {
  const { connectors: injected } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: 'always',
  })

  const connectors = [
    ...injected,
    new WebWalletConnector({ url: 'https://web.argent.xyz' }),
    new ArgentMobileConnector(),
  ]

  const queryClient = useQueryClient()

  return (
    <StarknetConfig
      queryClient={queryClient}
      connectors={connectors}
      chains={SUPPORTED_STARKNET_NETWORKS}
      provider={nethermindRpcProviders}
      explorer={starkscan}
      autoConnect
    >
      {children}
    </StarknetConfig>
  )
}
