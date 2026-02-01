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
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  ArrowUpDown, 
  Smartphone, 
  Database, 
  Zap, 
  GraduationCap, 
  RefreshCw, 
  History,
  TrendingUp,
  Wallet as WalletIcon,
  Activity,
  ArrowRight,
} from 'lucide-react'

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
      title: 'Buy Airtime',
      description: 'Top up MTN & Airtel instantly',
      href: '/utilities/airtime',
      gradient: 'from-primary-500 to-primary-600',
    },
    {
      icon: Database,
      title: 'Data Bundles',
      description: 'Purchase data packages',
      href: '/utilities/data',
      gradient: 'from-secondary-400 to-secondary-500',
    },
    {
      icon: Zap,
      title: 'Pay Electricity',
      description: 'UMEME prepaid tokens',
      href: '/utilities/electricity',
      gradient: 'from-warning-400 to-warning-500',
    },
    {
      icon: GraduationCap,
      title: 'School Fees',
      description: 'Pay educational fees',
      href: '/utilities/school-fees',
      gradient: 'from-success-400 to-success-500',
    },
  ]

  const quickActions = [
    {
      icon: ArrowUpRight,
      title: 'Send',
      description: 'Transfer USDC',
      href: '/send',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50 dark:bg-primary-900/20',
    },
    {
      icon: ArrowDownLeft,
      title: 'Receive',
      description: 'Get USDC',
      href: '/receive',
      color: 'text-success-600',
      bgColor: 'bg-success-50 dark:bg-success-900/20',
    },
    {
      icon: ArrowUpDown,
      title: 'Swap',
      description: 'Exchange tokens',
      href: '/swap',
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-50 dark:bg-secondary-900/20',
    },
    {
      icon: History,
      title: 'History',
      description: 'View activity',
      href: '/history',
      color: 'text-neutral-600',
      bgColor: 'bg-neutral-50 dark:bg-neutral-800',
    },
  ]

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-soft-lg">
            <WalletIcon className="text-white" size={32} />
          </div>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            Welcome to MiniSente
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 mb-8">
            Connect your wallet to access digital money services on Base chain
          </p>
          <Wallet>
            <WalletDropdown>
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address />
              </Identity>
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Modern Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-soft">
                  <WalletIcon className="text-white" size={20} />
                </div>
                <span className="text-xl font-semibold text-neutral-900 dark:text-white">
                  MiniSente
                </span>
              </div>
              
              <div className="hidden md:flex items-center gap-1">
                <Link href="/dashboard" className="nav-pill nav-pill-active">
                  Dashboard
                </Link>
                <Link href="/send" className="nav-pill nav-pill-inactive">
                  Send
                </Link>
                <Link href="/receive" className="nav-pill nav-pill-inactive">
                  Receive
                </Link>
                <Link href="/swap" className="nav-pill nav-pill-inactive">
                  Swap
                </Link>
                <Link href="/utilities" className="nav-pill nav-pill-inactive">
                  Utilities
                </Link>
                <Link href="/history" className="nav-pill nav-pill-inactive">
                  History
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                <Activity size={16} />
                <span>Base Network</span>
              </div>
              <Wallet>
                <WalletDropdown className="shadow-soft-lg">
                  <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                    <Avatar />
                    <Name />
                    <Address />
                  </Identity>
                  <WalletDropdownLink href="/dashboard">Dashboard</WalletDropdownLink>
                  <WalletDropdownLink href="/history">History</WalletDropdownLink>
                  <WalletDropdownDisconnect />
                </WalletDropdown>
              </Wallet>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Balance Card */}
        <div className="mb-8">
          <div className="card p-8 bg-gradient-to-br from-primary-500 to-primary-600 text-white border-0 shadow-soft-lg">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-primary-100 text-sm font-medium mb-2">Total Balance</p>
                <div className="text-4xl font-bold mb-2">
                  {isLoading ? '...' : `${balance} USDC`}
                </div>
                <p className="text-primary-200">
                  ≈ {isLoading ? '...' : usdcToUgx(balance)}
                </p>
              </div>
              <button
                onClick={() => refetch()}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              >
                <RefreshCw size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-primary-100 text-sm mb-1">24h Change</p>
                <p className="text-lg font-semibold flex items-center gap-1">
                  <TrendingUp size={16} />
                  +0.00%
                </p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-primary-100 text-sm mb-1">Network</p>
                <p className="text-lg font-semibold">Base</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fund Card */}
        <div className="mb-8">
          <FundCard 
            className="w-full shadow-soft-lg"
            assetSymbol="USDC"
            country="UG"
          />
        </div>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="card card-hover card-interactive p-6 text-center group"
              >
                <div className={`w-12 h-12 ${action.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <action.icon className={action.color} size={24} />
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
                  {action.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  {action.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Utilities Grid */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
              Utilities
            </h2>
            <Link 
              href="/utilities"
              className="btn btn-ghost text-sm"
            >
              View All
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {actionCards.map((card) => {
              const Icon = card.icon
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="card card-hover card-interactive overflow-hidden group"
                >
                  <div className={`h-2 bg-gradient-to-r ${card.gradient}`} />
                  <div className="p-6">
                    <div className={`w-12 h-12 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                      {card.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
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
