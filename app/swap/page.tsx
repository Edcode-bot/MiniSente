'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { 
  Wallet, 
  WalletDropdown, 
  WalletDropdownLink, 
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet'
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity'
import { Swap } from '@coinbase/onchainkit/swap'
import Link from 'next/link'
import { ArrowLeft, ArrowUpDown } from 'lucide-react'

export default function SwapPage() {
  const { isConnected } = useAccount()
  const [amount, setAmount] = useState('')

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
                <p className="text-gray-400">Exchange USDC ↔ USDT on Base</p>
              </div>
            </div>
            <Wallet>
            <WalletDropdown>
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address />
                <EthBalance />
              </Identity>
              <WalletDropdownLink icon="wallet" href="https://keys.coinbase.com">
                Wallet
              </WalletDropdownLink>
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
          </header>

          <main className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 bg-gradient-to-br from-base-blue to-base-green rounded-full flex items-center justify-center mx-auto mb-6">
                <ArrowUpDown className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Connect Your Wallet
              </h2>
              <p className="text-gray-400 mb-8">
                Connect your wallet to swap tokens on Base
              </p>
              <Wallet>
            <WalletDropdown>
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address />
                <EthBalance />
              </Identity>
              <WalletDropdownLink icon="wallet" href="https://keys.coinbase.com">
                Wallet
              </WalletDropdownLink>
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
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
              <p className="text-gray-400">Exchange USDC ↔ USDT on Base</p>
            </div>
          </div>
          <Wallet>
            <WalletDropdown>
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address />
                <EthBalance />
              </Identity>
              <WalletDropdownLink icon="wallet" href="https://keys.coinbase.com">
                Wallet
              </WalletDropdownLink>
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
        </header>

        <main className="max-w-2xl mx-auto">
          <div className="glass-morphism rounded-2xl p-8 border border-white/20">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Amount (USDC)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-base-blue focus:border-transparent"
                />
              </div>

              <Swap className="w-full">
                <button className="w-full bg-base-blue hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Swap
                </button>
              </Swap>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
