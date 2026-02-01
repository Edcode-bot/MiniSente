'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { 
  Wallet, 
  WalletDropdown, 
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet'
import {
  Address,
  Avatar,
  Name,
  Identity,
} from '@coinbase/onchainkit/identity'
import { toast } from 'sonner'
import Link from 'next/link'
import { ArrowLeft, Phone, Smartphone, ArrowRight } from 'lucide-react'

export default function AirtimePage() {
  const { address, isConnected } = useAccount()
  const [selectedCarrier, setSelectedCarrier] = useState<'MTN' | 'AIRTEL'>('MTN')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    if (!phoneNumber || !amount || parseFloat(amount) < 1000) {
      toast.error('Please fill all fields with valid amounts (min UGX 1,000)')
      return false
    }
    return true
  }

  const handlePurchase = async () => {
    if (!isConnected || !validateForm()) return

    setLoading(true)

    try {
      // Mock implementation for now
      toast.success('Airtime purchase coming soon!')
      setPhoneNumber('')
      setAmount('')
    } catch (error: any) {
      console.error('Purchase error:', error)
      toast.error(error.message || 'Purchase failed')
    } finally {
      setLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-soft-lg">
            <Smartphone className="text-white" size={32} />
          </div>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 mb-8">
            Connect your wallet to buy airtime
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
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <Link href="/utilities" className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
                </Link>
                <div>
                  <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">Buy Airtime</h1>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">Top up your mobile phone</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
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
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-8">
        <div className="card p-8">
          <form onSubmit={(e) => { e.preventDefault(); handlePurchase(); }} className="space-y-8">
            {/* Carrier Selection */}
            <div>
              <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-4">
                Select Carrier
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedCarrier('MTN')}
                  className={`p-4 rounded-xl border-2 transition-all card-hover ${
                    selectedCarrier === 'MTN'
                      ? 'bg-yellow-500 text-white border-yellow-500'
                      : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                  }`}
                >
                  <div className="font-medium">MTN</div>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCarrier('AIRTEL')}
                  className={`p-4 rounded-xl border-2 transition-all card-hover ${
                    selectedCarrier === 'AIRTEL'
                      ? 'bg-red-500 text-white border-red-500'
                      : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                  }`}
                >
                  <div className="font-medium">Airtel</div>
                </button>
              </div>
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+256700000000"
                  className="input pl-10"
                />
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                Amount (UGX)
              </label>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[1000, 2000, 5000, 10000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt.toString())}
                    className={`py-2 px-4 rounded-lg border transition-all card-hover ${
                      amount === amt.toString()
                        ? 'bg-primary text-white border-primary'
                        : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                    }`}
                  >
                    {amt.toLocaleString()}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter custom amount"
                className="input"
              />
            </div>

            {/* Purchase Button */}
            <button
              type="submit"
              disabled={loading || !phoneNumber || !amount}
              className="btn btn-primary w-full"
            >
              {loading ? 'Processing...' : 'Buy Airtime'}
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
