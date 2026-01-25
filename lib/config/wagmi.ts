import { createConfig, http } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID


export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    injected(),
    coinbaseWallet({ appName: 'MiniSente' }),
    walletConnect({ 
      projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || 'demo-project-id'
    }),
  ],
  transports: {
    [base.id]: http('https://mainnet.base.org'),
  },
})
