'use client'

import { useAccount } from 'wagmi'
import { WalletConnect } from '@/components/wallet/WalletConnect'
import { QRCode } from '@/components/receive/QRCode'
import { TransactionList } from '@/components/transactions/TransactionList'
import Link from 'next/link'
import { ArrowLeft, Copy, Share2 } from 'lucide-react'
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
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Receive USDC</h1>
                <p className="text-gray-600">Get your wallet address and QR code</p>
              </div>
            </div>
            <WalletConnect />
          </header>

          <main className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">📥</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Connect Your Wallet
              </h2>
              <p className="text-gray-600 mb-8">
                Connect your wallet to receive USDC payments
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
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Receive USDC</h1>
              <p className="text-gray-600">Get your wallet address and QR code</p>
            </div>
          </div>
          <WalletConnect />
        </header>

        <main className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Your Wallet Address</h2>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-2">Full Address:</p>
                <p className="font-mono text-sm break-all">{address}</p>
              </div>

              <div className="flex gap-4 mb-8">
                <button
                  onClick={handleCopyAddress}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy Address
                </button>
                <button
                  onClick={handleShareAddress}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share Address
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">Scan QR Code</p>
                <QRCode address={address!} />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Transactions</h2>
              <TransactionList address={address!} limit={5} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
