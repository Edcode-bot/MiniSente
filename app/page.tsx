'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'
import { 
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet'
import { 
  Identity,
  Avatar,
  Name,
  Address,
} from '@coinbase/onchainkit/identity'
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Globe,
  Phone,
  Smartphone,
  GraduationCap,
  Send,
  Wallet as WalletIcon,
  Sparkles,
  CheckCircle,
} from 'lucide-react'

export default function LandingPage() {
  const router = useRouter()
  const { isConnected, address } = useAccount()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isConnected && address) {
      router.push('/dashboard')
    }
  }, [isConnected, address, router])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-100/20 via-transparent to-transparent dark:from-primary-900/10" />
      </div>
      
      {/* Modern Pill Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
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
                <a href="#features" className="nav-pill nav-pill-inactive">
                  Features
                </a>
                <a href="#how-it-works" className="nav-pill nav-pill-inactive">
                  How It Works
                </a>
                <a href="#security" className="nav-pill nav-pill-inactive">
                  Security
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {!isConnected ? (
                <ConnectWallet className="btn btn-primary">
                  <span className="flex items-center gap-2">
                    Connect Wallet
                    <ArrowRight size={16} />
                  </span>
                </ConnectWallet>
              ) : (
                <Wallet>
                  <WalletDropdown className="shadow-soft-lg">
                    <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                      <Avatar />
                      <Name />
                      <Address />
                    </Identity>
                    <WalletDropdownDisconnect />
                  </WalletDropdown>
                </Wallet>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/20 rounded-full text-sm text-primary-700 dark:text-primary-300 mb-8 animate-in">
            <Sparkles size={16} />
            <span>Powered by Base Blockchain</span>
          </div>
          
          {/* Hero Text */}
          <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
            Digital Money
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-400">
              for Africa
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Send USDC instantly, pay for airtime, electricity, and school fees. 
            All on Base blockchain. Fast, cheap, and secure.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {!isConnected ? (
              <ConnectWallet className="btn btn-primary text-lg px-8 py-4 shadow-soft-lg">
                <span className="flex items-center gap-2">
                  Get Started
                  <ArrowRight size={20} />
                </span>
              </ConnectWallet>
            ) : (
              <button
                onClick={() => router.push('/dashboard')}
                className="btn btn-primary text-lg px-8 py-4 shadow-soft-lg"
              >
                <span className="flex items-center gap-2">
                  Launch App
                  <ArrowRight size={20} />
                </span>
              </button>
            )}
            
            <a 
              href="#how-it-works"
              className="btn btn-outline text-lg px-8 py-4"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Pay for real-world services with crypto, built for the African market
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Send,
              title: 'Send USDC',
              description: 'Instant transfers to any wallet address. Fast and cheap on Base.',
              gradient: 'from-primary-500 to-primary-600',
            },
            {
              icon: Phone,
              title: 'Buy Airtime',
              description: 'Top up MTN and Airtel with USDC. No middlemen, instant delivery.',
              gradient: 'from-secondary-400 to-secondary-500',
            },
            {
              icon: Zap,
              title: 'Pay Bills',
              description: 'Electricity, water, and utilities. All on-chain, all secure.',
              gradient: 'from-warning-400 to-warning-500',
            },
            {
              icon: GraduationCap,
              title: 'School Fees',
              description: 'Direct payments to institutions. Transparent and fast.',
              gradient: 'from-success-400 to-success-500',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="card card-hover card-interactive p-6 group"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <feature.icon className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-300">
            Get started in 3 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              number: '01',
              title: 'Connect Wallet',
              description: 'Use your Coinbase Wallet or create a new Smart Wallet with just a passkey.',
              icon: WalletIcon,
            },
            {
              number: '02',
              title: 'Add USDC',
              description: 'Deposit from Coinbase, buy with card, or convert from mobile money.',
              icon: Smartphone,
            },
            {
              number: '03',
              title: 'Pay Anything',
              description: 'Send to friends, buy airtime, pay bills. All with USDC on Base.',
              icon: Zap,
            },
          ].map((step, i) => (
            <div key={i} className="relative">
              <div className="card p-8 h-full">
                <div className="text-6xl font-bold text-primary-200 dark:text-primary-800 mb-4">
                  {step.number}
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-4">
                  <step.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary-200 to-primary-300 dark:from-primary-700 dark:to-primary-600" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            Built for Security
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-300">
            Your money is protected by industry-leading security
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Shield,
              title: 'Bank-Grade Security',
              description: 'Military-grade encryption and multi-signature protection.',
            },
            {
              icon: Globe,
              title: 'Base Blockchain',
              description: 'Built on Coinbase\'s L2 network for speed and low fees.',
            },
            {
              icon: CheckCircle,
              title: 'Audited Smart Contracts',
              description: 'All contracts audited by leading security firms.',
            },
          ].map((security, i) => (
            <div key={i} className="card p-6">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-xl flex items-center justify-center mb-4">
                <security.icon className="text-primary-600 dark:text-primary-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                {security.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                {security.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="card p-12 text-center bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/10 dark:to-secondary-900/10 border-primary-200 dark:border-primary-800">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
            Join thousands using MiniSente to manage money on Base blockchain
          </p>
          
          {!isConnected ? (
            <ConnectWallet className="btn btn-primary text-lg px-8 py-4 shadow-soft-lg">
              <span className="flex items-center gap-2">
                Connect Wallet Now
                <ArrowRight size={20} />
              </span>
            </ConnectWallet>
          ) : (
            <button
              onClick={() => router.push('/dashboard')}
              className="btn btn-primary text-lg px-8 py-4 shadow-soft-lg"
            >
              <span className="flex items-center gap-2">
                Go to Dashboard
                <ArrowRight size={20} />
              </span>
            </button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                <WalletIcon className="text-white" size={16} />
              </div>
              <span className="font-semibold text-neutral-900 dark:text-white">MiniSente</span>
            </div>
            
            <div className="flex gap-8 text-sm">
              <a href="#" className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Twitter
              </a>
              <a href="#" className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Discord
              </a>
              <a href="#" className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Docs
              </a>
            </div>
            
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              © 2026 MiniSente. Built on Base.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
