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
import { ArrowLeft, Smartphone, ArrowRight, TrendingUp } from 'lucide-react'

export default function DepositPage() {
  const { address, isConnected } = useAccount()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [network, setNetwork] = useState<'MTN' | 'AIRTEL'>('MTN')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    if (!phoneNumber || !amount || parseFloat(amount) < 1000) {
      toast.error('Please fill all fields with valid amounts (min UGX 1,000)')
      return false
    }
    return true
  }

  const handleDeposit = async () => {
    if (!isConnected || !validateForm()) return

    setLoading(true)

    try {
      const response = await fetch('/api/deposit/mobile-money', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: address,
          phone: phoneNumber,
          amount: parseFloat(amount),
          network: network,
          email: email || `${address}@minisente.com`,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Deposit initiated! Please complete payment on your phone.')
        setPhoneNumber('')
        setAmount('')
        setEmail('')
      } else {
        toast.error(result.error || 'Deposit failed')
      }
    } catch (error: any) {
      console.error('Deposit error:', error)
      toast.error(error.message || 'Deposit failed')
    } finally {
      setLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-soft-lg">
            <TrendingUp className="text-white" size={32} />
          </div>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 mb-8">
            Connect your wallet to deposit funds
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
                <Link href="/dashboard" className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
                </Link>
                <div>
                  <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">Deposit Funds</h1>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">Add USDC via Mobile Money</p>
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
        {/* Info Card */}
        <div className="card p-6 mb-8 bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20 border-success-200 dark:border-success-800">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-success-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="text-white" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">How it works</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                1. Enter your mobile money details<br />
                2. Pay UGX via MTN/Airtel Mobile Money<br />
                3. Receive USDC in your wallet instantly<br />
                4. Exchange rate: 1 USDC = 3,800 UGX
              </p>
            </div>
          </div>
        </div>

        <div className="card p-8">
          <form onSubmit={(e) => { e.preventDefault(); handleDeposit(); }} className="space-y-8">
            {/* Network Selection */}
            <div>
              <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-4">
                Select Mobile Network
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setNetwork('MTN')}
                  className={`p-4 rounded-xl border-2 transition-all card-hover ${
                    network === 'MTN'
                      ? 'bg-yellow-500 text-white border-yellow-500'
                      : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                  }`}
                >
                  <div className="font-medium">MTN Mobile Money</div>
                </button>
                <button
                  type="button"
                  onClick={() => setNetwork('AIRTEL')}
                  className={`p-4 rounded-xl border-2 transition-all card-hover ${
                    network === 'AIRTEL'
                      ? 'bg-red-500 text-white border-red-500'
                      : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                  }`}
                >
                  <div className="font-medium">Airtel Money</div>
                </button>
              </div>
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+256700000000"
                  className="input pl-10"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                Email (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                Amount (UGX)
              </label>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[5000, 10000, 20000, 50000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt.toString())}
                    className={`py-2 px-4 rounded-lg border transition-all card-hover ${
                      amount === amt.toString()
                        ? 'bg-success text-white border-success'
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
              {amount && parseFloat(amount) > 0 && (
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                  You will receive: ~{(parseFloat(amount) / 3800).toFixed(4)} USDC
                </p>
              )}
            </div>

            {/* Deposit Button */}
            <button
              type="submit"
              disabled={loading || !phoneNumber || !amount}
              className="btn btn-primary w-full"
            >
              {loading ? 'Processing...' : 'Deposit USDC'}
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
