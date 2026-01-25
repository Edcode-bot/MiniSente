'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAccount } from 'wagmi'
import { 
  Home, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Zap, 
  History, 
  Menu, 
  X,
  Wallet
} from 'lucide-react'
import { ConnectWallet } from '@/components/wallet/ConnectWallet'
import { formatAddress } from '@/lib/utils/format'

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/send', label: 'Send', icon: ArrowUpRight },
  { href: '/receive', label: 'Receive', icon: ArrowDownLeft },
  { href: '/utilities', label: 'Utilities', icon: Zap },
  { href: '/history', label: 'History', icon: History },
]

export function MobileNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { address, isConnected } = useAccount()

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  if (!isConnected) {
    return null
  }

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-bg-darker/95 backdrop-blur-lg border-t border-white/20 z-50">
        <div className="grid grid-cols-5 gap-1">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center py-2 px-1 transition-all ${
                  isActive
                    ? 'text-primary-blue'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <Menu className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-bg-darker/95 backdrop-blur-lg z-40 pt-16">
          <div className="flex flex-col h-full">
            {/* Wallet Status */}
            <div className="p-4 border-b border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-violet via-primary-blue to-primary-teal rounded-full flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Connected Wallet</p>
                  <p className="text-white font-mono text-sm">
                    {formatAddress(address!)}
                  </p>
                </div>
              </div>
              <ConnectWallet />
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-4">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleLinkClick}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-primary-blue/20 text-primary-blue'
                          : 'text-gray-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/20">
              <div className="text-center text-xs text-gray-400">
                <p>MiniSente v1.0.0</p>
                <p className="mt-1">Digital Money on Base</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
