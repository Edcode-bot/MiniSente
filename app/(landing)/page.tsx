'use client'

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
import Link from 'next/link'
import { ArrowRight, Zap, Shield, Globe, Smartphone, Database, GraduationCap } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-darker text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-base-darker via-base-dark to-base-darker">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-base-blue/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-base-green/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-base-blue/10 via-transparent to-transparent"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 sticky top-0 backdrop-blur-lg bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-base-blue to-base-green rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">MiniSente</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
              <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</Link>
              <Link href="#utilities" className="text-gray-300 hover:text-white transition-colors">Utilities</Link>
            </div>

            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard" 
                className="px-4 py-2 text-sm font-medium text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
              >
                Launch App
              </Link>
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

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Send Money.</span>
              <br />
              <span className="gradient-text">Pay Bills.</span>
              <br />
              <span className="text-white">All On-Chain.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              USDC payments on Base for everyday African needs. Fast, secure, and transparent digital money for everyone.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
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
            <Link 
              href="#features" 
              className="px-8 py-4 text-lg font-medium text-white border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
            >
              Learn More
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass-morphism p-6 rounded-2xl">
              <div className="text-3xl font-bold gradient-text mb-2">$0.00</div>
              <div className="text-gray-400">Transaction Fees</div>
            </div>
            <div className="glass-morphism p-6 rounded-2xl">
              <div className="text-3xl font-bold gradient-text mb-2">&lt;2s</div>
              <div className="text-gray-400">Average Transaction Time</div>
            </div>
            <div className="glass-morphism p-6 rounded-2xl">
              <div className="text-3xl font-bold gradient-text mb-2">100%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need for modern digital payments in Africa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-morphism p-8 rounded-2xl card-hover group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-violet to-primary-blue rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Send USDC</h3>
              <p className="text-gray-400">Instant transfers to any wallet address with minimal fees</p>
            </div>

            <div className="glass-morphism p-8 rounded-2xl card-hover group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-blue to-primary-teal rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Buy Airtime</h3>
              <p className="text-gray-400">MTN & Airtel top-ups with crypto instantly</p>
            </div>

            <div className="glass-morphism p-8 rounded-2xl card-hover group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-teal to-accent-green rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Pay Bills</h3>
              <p className="text-gray-400">Electricity and utilities on-chain with transparency</p>
            </div>

            <div className="glass-morphism p-8 rounded-2xl card-hover group">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-green to-accent-pink rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">School Fees</h3>
              <p className="text-gray-400">Direct payments to educational institutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get started with MiniSente in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-violet to-primary-blue rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white">
                1
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h3>
              <p className="text-gray-400">Connect MetaMask, Coinbase Wallet, or any Web3 wallet</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-blue to-primary-teal rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white">
                2
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Load USDC</h3>
              <p className="text-gray-400">Add USDC to your wallet or convert from mobile money</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-teal to-accent-green rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white">
                3
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Pay for Anything</h3>
              <p className="text-gray-400">Send money, pay bills, buy airtime - all on-chain</p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Utilities */}
      <section id="utilities" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Supported Utilities</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Pay for everyday services with crypto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-morphism p-6 rounded-2xl border border-accent-orange/20">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-lg font-bold text-white mb-2">MTN Airtime</h3>
              <p className="text-gray-400 text-sm">Instant top-ups for MTN Uganda</p>
            </div>

            <div className="glass-morphism p-6 rounded-2xl border border-accent-blue/20">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-lg font-bold text-white mb-2">Airtel Airtime</h3>
              <p className="text-gray-400 text-sm">Quick recharges for Airtel Uganda</p>
            </div>

            <div className="glass-morphism p-6 rounded-2xl border border-accent-green/20">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-bold text-white mb-2">UMEME</h3>
              <p className="text-gray-400 text-sm">Pay for electricity tokens instantly</p>
            </div>

            <div className="glass-morphism p-6 rounded-2xl border border-accent-pink/20">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-lg font-bold text-white mb-2">School Fees</h3>
              <p className="text-gray-400 text-sm">Direct payments to educational institutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-base-blue to-base-green rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">MiniSente</span>
              </div>
              <p className="text-gray-400">Digital money for Africa, powered by Base</p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="#utilities" className="hover:text-white transition-colors">Utilities</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MiniSente. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
