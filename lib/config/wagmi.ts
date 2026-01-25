import { createConfig, http } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

// Base mainnet configuration
const baseMainnet = {
  ...base,
  rpcUrls: {
    ...base.rpcUrls,
    default: {
      http: ['https://mainnet.base.org'],
    },
    public: {
      http: ['https://mainnet.base.org'],
    },
  },
}

export const wagmiConfig = createConfig({
  chains: [baseMainnet],
  connectors: [
    injected(),
    coinbaseWallet({
      appName: 'MiniSente',
      appLogoUrl: 'https://minisente.io/logo.png',
    }),
    ...(projectId ? [walletConnect({ projectId })] : []),
  ],
  transports: {
    [baseMainnet.id]: http(),
  },
})
