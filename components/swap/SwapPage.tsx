'use client'

import { OnchainSwap } from '@/components/swap/SwapComponent'
import { OnchainWallet } from '@/components/wallet/OnchainWallet'
import { useAccount } from 'wagmi'
import Link from 'next/link'
import { ArrowLeft, ArrowUpDown } from 'lucide-react'

export default function SwapPage() {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-bg-darker text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <header className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard"
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-4xl font-bold gradient-text mb-2">Swap Tokens</h1>
                <p className="text-gray-400">Exchange USDC, USDT, and ETH</p>
              </div>
            </div>
            <OnchainWallet />
          </header>

          <main className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-violet via-primary-blue to-primary-teal rounded-full flex items-center justify-center mx-auto mb-6">
                <ArrowUpDown className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Connect Your Wallet
              </h2>
              <p className="text-gray-400 mb-8">
                Connect your wallet to swap tokens on Base
              </p>
              <OnchainWallet />
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-darker text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">Swap Tokens</h1>
              <p className="text-gray-400">Exchange USDC, USDT, and ETH</p>
            </div>
          </div>
          <OnchainWallet />
        </header>

        <main className="max-w-2xl mx-auto">
          <OnchainSwap />
        </main>
      </div>
    </div>
  )
}
