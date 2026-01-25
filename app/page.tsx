'use client'

import { useAccount } from 'wagmi'
import { WalletConnect } from '@/components/wallet/WalletConnect'
import { useUSDCBalance } from '@/hooks/useUSDCBalance'
import Link from 'next/link'
import { Smartphone, Database, Zap, GraduationCap } from 'lucide-react'

export default function Dashboard() {
  const { address, isConnected } = useAccount()
  const { balance, isLoading } = useUSDCBalance(address)

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
      href: '/airtime',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Database,
      emoji: '📊',
      title: 'Data',
      description: 'Purchase data bundles',
      href: '/data',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Zap,
      emoji: '⚡',
      title: 'Electricity',
      description: 'Pay UMEME prepaid',
      href: '/electricity',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: GraduationCap,
      emoji: '🎓',
      title: 'School Fees',
      description: 'Pay school fees',
      href: '/school-fees',
      color: 'from-purple-500 to-purple-600',
    },
  ]

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <header className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">MiniSente</h1>
              <p className="text-gray-600">Digital Money on Base</p>
            </div>
            <WalletConnect />
          </header>

          <main className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">💰</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Welcome to MiniSente
              </h2>
              <p className="text-gray-600 mb-8">
                Connect your wallet to access digital money services on Base chain
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
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">MiniSente</h1>
            <p className="text-gray-600">Digital Money on Base</p>
          </div>
          <WalletConnect />
        </header>

        <main>
          <section className="mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Balance</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">USDC Balance</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {isLoading ? '...' : balance}
                    </span>
                    <span className="text-lg text-gray-600">USDC</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">UGX Equivalent</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-green-600">
                      {isLoading ? '...' : usdcToUgx(balance)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {actionCards.map((card) => {
                const Icon = card.icon
                return (
                  <Link
                    key={card.title}
                    href={card.href}
                    className="group block"
                  >
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 p-6 border border-gray-100 hover:border-gray-200">
                      <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                        <span className="text-xl">{card.emoji}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {card.title}
                      </h3>
                      <p className="text-sm text-gray-600">
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
    </div>
  )
}
