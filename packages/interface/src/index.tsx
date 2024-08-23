import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import { QueryProvider } from './providers/QueryProvider'
import { StarknetProvider } from './providers/Web3Provider'
import ThemeProvider, { ThemedGlobalStyle } from './theme'

// eslint-disable-next-line @typescript-eslint/no-var-requires
window.Buffer = window.Buffer || require('buffer').Buffer

const container = document.getElementById('root')
if (!container) throw 'Undefined #root container'

const root = createRoot(container)
root.render(
  <QueryProvider>
    <StarknetProvider>
      <ThemeProvider>
        <ThemedGlobalStyle />

        <App />
      </ThemeProvider>
    </StarknetProvider>
  </QueryProvider>,
)
