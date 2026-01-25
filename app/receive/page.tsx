'use client'

import { useAccount } from 'wagmi'
import { ConnectWallet } from '@/components/wallet/ConnectWallet'
import { QRCode } from '@/components/receive/QRCode'
import { TransactionList } from '@/components/transactions/TransactionList'
import Link from 'next/link'
import { ArrowLeft, Copy, Share2, ArrowDownLeft } from 'lucide-react'
import { formatAddress } from '@/lib/utils/format'
import { toast } from 'sonner'

export default function ReceivePage() {
  const { address, isConnected } = useAccount()

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast.success('Address copied to clipboard')
    }
  }

  const handleShareAddress = async () => {
    if (address) {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'My MiniSente Address',
            text: `Send USDC to: ${address}`,
            url: `https://basescan.org/address/${address}`,
          })
        } catch (error) {
          console.log('Error sharing:', error)
        }
      } else {
        navigator.clipboard.writeText(address)
        toast.success('Address copied to clipboard')
      }
    }
  }

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
                <h1 className="text-4xl font-bold gradient-text mb-2">Receive USDC</h1>
                <p className="text-gray-400">Get your wallet address and QR code</p>
              </div>
            </div>
            <ConnectWallet />
          </header>

          <main className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-violet via-primary-blue to-primary-teal rounded-full flex items-center justify-center mx-auto mb-6">
                <ArrowDownLeft className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Connect Your Wallet
              </h2>
              <p className="text-gray-400 mb-8">
                Connect your wallet to receive USDC payments
              </p>
              <ConnectWallet />
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
              <h1 className="text-4xl font-bold gradient-text mb-2">Receive USDC</h1>
              <p className="text-gray-400">Get your wallet address and QR code</p>
            </div>
          </div>
          <ConnectWallet />
        </header>

        <main className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="glass-morphism rounded-2xl p-8 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-6">Your Wallet Address</h2>
              
              <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
                <p className="text-sm text-gray-400 mb-2">Full Address:</p>
                <p className="font-mono text-sm break-all text-white">{address}</p>
              </div>

              <div className="flex gap-4 mb-8">
                <button
                  onClick={handleCopyAddress}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary-blue to-primary-teal text-white rounded-lg hover:scale-105 transition-all duration-200"
                >
                  <Copy className="w-4 h-4" />
                  Copy Address
                </button>
                <button
                  onClick={handleShareAddress}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary-violet to-primary-blue text-white rounded-lg hover:scale-105 transition-all duration-200"
                >
                  <Share2 className="w-4 h-4" />
                  Share Address
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-400 mb-4">Scan QR Code</p>
                <div className="inline-block p-4 bg-white rounded-2xl">
                  <QRCode address={address!} />
                </div>
              </div>
            </div>

            <div className="glass-morphism rounded-2xl p-8 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-6">Recent Transactions</h2>
              <TransactionList address={address!} limit={5} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
