'use client'
import { OnchainKitProvider } from '@coinbase/onchainkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { base } from 'viem/chains'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '@/lib/config/wagmi'
import { Toaster } from 'sonner'
import { ReactNode, useState } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={base}
        >
          {children}
          <Toaster position="top-right" />
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
