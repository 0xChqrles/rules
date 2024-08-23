import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Query Client

const queryClient = new QueryClient()

export function QueryProvider({ children }: React.PropsWithChildren) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
