'use client'

import { useAccount } from 'wagmi'
import { WalletConnect } from '@/components/wallet/WalletConnect'
import { SendForm } from '@/components/send/SendForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function SendPage() {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <header className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Send USDC</h1>
                <p className="text-gray-600">Transfer USDC to any address</p>
              </div>
            </div>
            <WalletConnect />
          </header>

          <main className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">💸</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Connect Your Wallet
              </h2>
              <p className="text-gray-600 mb-8">
                Connect your wallet to send USDC to any address on Base
              </p>
              <WalletConnect />
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Send USDC</h1>
              <p className="text-gray-600">Transfer USDC to any address</p>
            </div>
          </div>
          <WalletConnect />
        </header>

        <main className="max-w-2xl mx-auto">
          <SendForm />
        </main>
      </div>
    </div>
  )
}
