'use client'

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
import { FundCard } from '@coinbase/onchainkit/fund'
import { useUSDCBalance } from '@/hooks/useUSDCBalance'
import Link from 'next/link'
import { ArrowUpRight, ArrowDownLeft, ArrowUpDown, Smartphone, Database, Zap, GraduationCap, RefreshCw, History } from 'lucide-react'

export default function Dashboard() {
  const { address, isConnected } = useAccount()
  const { balance, isLoading, refetch } = useUSDCBalance(address)

  const usdcToUgx = (usdc: string) => {
    const amount = parseFloat(usdc) * 3800
    return amount.toLocaleString('en-UG', { style: 'currency', currency: 'UGX' })
  }

  const actionCards = [
    {
      icon: Smartphone,
      emoji: '📱',
      title: 'Airtime',
      description: 'Buy airtime for MTN & Airtel',
      href: '/utilities/airtime',
      color: 'from-base-blue to-base-blue',
      borderColor: 'border-base-blue/20',
    },
    {
      icon: Database,
      emoji: '📊',
      title: 'Data',
      description: 'Purchase data bundles',
      href: '/utilities/data',
      color: 'from-base-green to-base-green',
      borderColor: 'border-base-green/20',
    },
    {
      icon: Zap,
      emoji: '⚡',
      title: 'Electricity',
      description: 'Pay UMEME prepaid',
      href: '/utilities/electricity',
      color: 'from-base-blue to-base-green',
      borderColor: 'border-base-blue/20',
    },
    {
      icon: GraduationCap,
      emoji: '🎓',
      title: 'School Fees',
      description: 'Pay school fees',
      href: '/utilities/school-fees',
      color: 'from-base-green to-base-blue',
      borderColor: 'border-base-green/20',
    },
    {
      icon: ArrowUpDown,
      emoji: '🔄',
      title: 'Swap',
      description: 'Exchange tokens',
      href: '/swap',
      color: 'from-base-blue to-base-green',
      borderColor: 'border-base-blue/20',
    },
  ]

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-bg-darker text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-violet via-primary-blue to-primary-teal rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">💰</span>
          </div>
          <h2 className="text-2xl font-semibold text-white mb-4">
            Welcome to MiniSente
          </h2>
          <p className="text-gray-400 mb-8">
            Connect your wallet to access digital money services on Base chain
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
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-darker text-white">
      {/* Navigation */}
      <nav className="sticky top-0 backdrop-blur-lg bg-white/5 border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-violet via-primary-blue to-primary-teal rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">MiniSente</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="/dashboard" className="text-white font-medium">Dashboard</Link>
              <Link href="/send" className="text-gray-300 hover:text-white transition-colors">Send</Link>
              <Link href="/receive" className="text-gray-300 hover:text-white transition-colors">Receive</Link>
              <Link href="/swap" className="text-gray-300 hover:text-white transition-colors">Swap</Link>
              <Link href="/utilities" className="text-gray-300 hover:text-white transition-colors">Utilities</Link>
              <Link href="/history" className="text-gray-300 hover:text-white transition-colors">History</Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm font-mono bg-white/10 px-3 py-1 rounded-lg border border-white/20">
                {address?.slice(0, 6)}...{address?.slice(-4)}
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
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Balance and Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Balance Card */}
          <div className="lg:col-span-2">
            <div className="glass-morphism rounded-2xl p-8 border border-white/20 glow-effect">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg text-gray-400 mb-2">Total Balance</h2>
                  <div className="text-4xl font-bold gradient-text">
                    {isLoading ? '...' : balance} USDC
                  </div>
                  <p className="text-gray-400 mt-2">
                    ≈ {isLoading ? '...' : usdcToUgx(balance)}
                  </p>
                </div>
                <button
                  onClick={() => refetch()}
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  disabled={isLoading}
                >
                  <RefreshCw className={`w-5 h-5 text-white ${isLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">24h Change</p>
                  <p className="text-lg font-semibold text-green-400">+0.00%</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Network</p>
                  <p className="text-lg font-semibold text-primary-blue">Base</p>
                </div>
              </div>
            </div>
          </div>

          {/* Identity and Fund Card */}
          <div className="space-y-6">
            <div className="glass-morphism rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Your Identity</h3>
              <Identity className="identity" hasCopyAddressOnClick>
                <Avatar className="avatar w-12 h-12 rounded-full" />
                <Name className="text-white font-medium" />
                <Address className="text-gray-400 text-sm" />
              </Identity>
            </div>
            
            <FundCard 
              className="w-full"
              country="US"
              assetSymbol="USDC"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">Quick Actions</h2>
            <Link href="/history" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
              View All
              <History className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Link href="/send" className="glass-morphism p-6 rounded-2xl border border-white/20 hover:border-primary-blue/50 transition-all duration-200 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-violet to-primary-blue rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ArrowUpRight className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Send</h3>
              <p className="text-sm text-gray-400">Transfer USDC</p>
            </Link>

            <Link href="/receive" className="glass-morphism p-6 rounded-2xl border border-white/20 hover:border-accent-green/50 transition-all duration-200 group">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-green to-primary-teal rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ArrowDownLeft className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Receive</h3>
              <p className="text-sm text-gray-400">Get QR code</p>
            </Link>

            <Link href="/utilities" className="glass-morphism p-6 rounded-2xl border border-white/20 hover:border-accent-orange/50 transition-all duration-200 group">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-orange to-accent-pink rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Utilities</h3>
              <p className="text-sm text-gray-400">Pay bills</p>
            </Link>

            <Link href="/swap" className="glass-morphism p-6 rounded-2xl border border-white/20 hover:border-primary-violet/50 transition-all duration-200 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-violet to-primary-blue rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ArrowUpDown className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Swap</h3>
              <p className="text-sm text-gray-400">Exchange tokens</p>
            </Link>

            <Link href="/history" className="glass-morphism p-6 rounded-2xl border border-white/20 hover:border-primary-blue/50 transition-all duration-200 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-violet to-primary-blue rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <History className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">History</h3>
              <p className="text-sm text-gray-400">View transactions</p>
            </Link>
          </div>
        </section>

        {/* Utilities */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">Utilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {actionCards.map((card) => {
              const Icon = card.icon
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group block"
                >
                  <div className={`glass-morphism rounded-2xl p-8 border ${card.borderColor} hover:border-white/50 transition-all duration-200 card-hover`}>
                    <div className={`w-16 h-16 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <span className="text-2xl">{card.emoji}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {card.title}
                    </h3>
                    <p className="text-gray-400">
                      {card.description}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
