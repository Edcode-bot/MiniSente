'use client'

import { OnchainKitProvider } from '@coinbase/onchainkit'
import { base } from 'wagmi/chains'

export function OnchainKitProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <OnchainKitProvider
      chain={base}
      projectId={process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID}
    >
      {children}
    </OnchainKitProvider>
  )
}
