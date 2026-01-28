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
    return null // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-[#020617]">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#7C3AED]/20 via-[#3B82F6]/10 to-[#14B8A6]/20 pointer-events-none" />
      
      {/* Navbar */}
      <nav className="relative border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#7C3AED] to-[#14B8A6] rounded-lg flex items-center justify-center">
              <WalletIcon className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#7C3AED] via-[#3B82F6] to-[#14B8A6] bg-clip-text text-transparent">
              MiniSente
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#features" className="text-gray-300 hover:text-white transition hidden md:block">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition hidden md:block">
              How It Works
            </a>
            
            {!isConnected ? (
              <ConnectWallet key="connect-wallet" className="!bg-gradient-to-r !from-[#7C3AED] !via-[#3B82F6] !to-[#14B8A6] !px-6 !py-2.5 !rounded-xl !font-bold hover:scale-105 transition">
                <span className="text-white">Connect Wallet</span>
              </ConnectWallet>
            ) : (
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
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-20 md:py-32 text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-[#7C3AED]/20 border border-[#7C3AED]/30 rounded-full text-sm text-[#00D395]">
          ⚡ Powered by Base
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-[#7C3AED] via-[#3B82F6] to-[#14B8A6] bg-clip-text text-transparent">
            Digital Money
          </span>
          <br />
          <span className="text-white">for Africa</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
          Send USDC instantly, pay for airtime, electricity, and school fees.
          All on Base blockchain. Fast, cheap, and secure.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {!isConnected ? (
            <ConnectWallet key="hero-connect-wallet" className="!bg-gradient-to-r !from-[#7C3AED] !via-[#3B82F6] !to-[#14B8A6] !px-8 !py-4 !rounded-xl !font-bold !text-lg hover:scale-105 transition shadow-lg shadow-[#7C3AED]/50">
              <span className="text-white flex items-center gap-2">
                Get Started
                <ArrowRight size={20} />
              </span>
            </ConnectWallet>
          ) : (
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-gradient-to-r from-[#7C3AED] via-[#3B82F6] to-[#14B8A6] px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition shadow-lg shadow-[#7C3AED]/50 flex items-center gap-2"
            >
              Launch App
              <ArrowRight size={20} />
            </button>
          )}
          
          <a 
            href="#how-it-works"
            className="px-8 py-4 border-2 border-white/20 rounded-xl font-bold text-lg hover:bg-white/5 transition"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-400">
            Pay for real-world services with crypto
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Send,
              title: 'Send USDC',
              description: 'Instant transfers to any wallet address. Fast and cheap on Base.',
              gradient: 'from-[#7C3AED]/20 to-[#3B82F6]/20',
              border: 'border-[#7C3AED]/30',
            },
            {
              icon: Phone,
              title: 'Buy Airtime',
              description: 'Top up MTN and Airtel with USDC. No middlemen.',
              gradient: 'from-[#F59E0B]/20 to-[#EC4899]/20',
              border: 'border-[#F59E0B]/30',
            },
            {
              icon: Zap,
              title: 'Pay Bills',
              description: 'Electricity, water, and utilities. All on-chain.',
              gradient: 'from-[#10B981]/20 to-[#14B8A6]/20',
              border: 'border-[#10B981]/30',
            },
            {
              icon: GraduationCap,
              title: 'School Fees',
              description: 'Direct payments to institutions. Transparent and fast.',
              gradient: 'from-[#EC4899]/20 to-[#7C3AED]/20',
              border: 'border-[#EC4899]/30',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${feature.gradient} border ${feature.border} rounded-xl p-6 backdrop-blur-lg hover:scale-105 transition duration-300`}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            How It Works
          </h2>
          <p className="text-xl text-gray-400">
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
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 hover:bg-white/10 transition">
                <div className="text-6xl font-bold text-white/10 mb-4">{step.number}</div>
                <div className="w-12 h-12 bg-gradient-to-br from-[#7C3AED] to-[#14B8A6] rounded-lg flex items-center justify-center mb-4">
                  <step.icon className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#7C3AED] to-[#14B8A6]" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-[#7C3AED]/20 via-[#3B82F6]/20 to-[#14B8A6]/20 border border-[#7C3AED]/30 rounded-2xl p-12 text-center backdrop-blur-lg">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands using MiniSente to manage money on Base
          </p>
          
          {!isConnected ? (
            <ConnectWallet key="cta-connect-wallet" className="!bg-white !text-black !px-8 !py-4 !rounded-xl !font-bold !text-lg hover:scale-105 transition shadow-xl">
              <span className="flex items-center gap-2">
                Connect Wallet Now
                <ArrowRight size={20} />
              </span>
            </ConnectWallet>
          ) : (
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition shadow-xl flex items-center gap-2 mx-auto"
            >
              Go to Dashboard
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#7C3AED] to-[#14B8A6] rounded-lg" />
              <span className="font-bold text-white">MiniSente</span>
            </div>
            <div className="flex gap-6 text-gray-400">
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">Discord</a>
              <a href="#" className="hover:text-white transition">Docs</a>
            </div>
            <div className="text-gray-400 text-sm">
              © 2026 MiniSente. Built on Base.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
