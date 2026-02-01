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
import { useUSDCBalance } from '@/hooks/useUSDCBalance'
import { toast } from 'sonner'
import Link from 'next/link'
import { ArrowLeft, Smartphone, ArrowRight, ArrowDownLeft } from 'lucide-react'

export default function WithdrawPage() {
  const { address, isConnected } = useAccount()
  const { balance, isLoading } = useUSDCBalance(address)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [amountUsdc, setAmountUsdc] = useState('')
  const [network, setNetwork] = useState<'MTN' | 'AIRTEL'>('MTN')
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    if (!phoneNumber || !amountUsdc || parseFloat(amountUsdc) <= 0) {
      toast.error('Please fill all fields with valid amounts')
      return false
    }
    if (parseFloat(amountUsdc) > parseFloat(balance || '0')) {
      toast.error('Insufficient balance')
      return false
    }
    return true
  }

  const handleWithdraw = async () => {
    if (!isConnected || !validateForm()) return

    setLoading(true)

    try {
      const response = await fetch('/api/withdraw/mobile-money', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: address,
          phone: phoneNumber,
          amountUsdc: parseFloat(amountUsdc),
          network: network,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast.success(`Withdrawal initiated! You will receive UGX ${result.amount_ugx.toLocaleString()} shortly.`)
        setPhoneNumber('')
        setAmountUsdc('')
      } else {
        toast.error(result.error || 'Withdrawal failed')
      }
    } catch (error: any) {
      console.error('Withdrawal error:', error)
      toast.error(error.message || 'Withdrawal failed')
    } finally {
      setLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-warning-500 to-warning-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-soft-lg">
            <ArrowDownLeft className="text-white" size={32} />
          </div>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 mb-8">
            Connect your wallet to withdraw funds
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
                  <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">Withdraw Funds</h1>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">Convert USDC to Mobile Money</p>
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
        {/* Balance Card */}
        <div className="card p-6 mb-8 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-800">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-1">Available Balance</p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {isLoading ? '...' : `${balance} USDC`}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <ArrowDownLeft className="text-white" size={20} />
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="card p-6 mb-8 bg-gradient-to-br from-warning-50 to-warning-100 dark:from-warning-900/20 dark:to-warning-800/20 border-warning-200 dark:border-warning-800">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-warning-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <ArrowDownLeft className="text-white" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Withdrawal Process</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                1. Enter withdrawal amount in USDC<br />
                2. Select mobile network and phone number<br />
                3. USDC will be locked and converted to UGX<br />
                4. Receive UGX via Mobile Money (1 USDC = 3,800 UGX)
              </p>
            </div>
          </div>
        </div>

        <div className="card p-8">
          <form onSubmit={(e) => { e.preventDefault(); handleWithdraw(); }} className="space-y-8">
            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                Amount (USDC)
              </label>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[1, 5, 10, 25].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmountUsdc(amt.toString())}
                    className={`py-2 px-4 rounded-lg border transition-all card-hover ${
                      amountUsdc === amt.toString()
                        ? 'bg-warning text-white border-warning'
                        : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                    }`}
                  >
                    {amt} USDC
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={amountUsdc}
                onChange={(e) => setAmountUsdc(e.target.value)}
                placeholder="Enter USDC amount"
                step="0.01"
                className="input"
              />
              {amountUsdc && parseFloat(amountUsdc) > 0 && (
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                  You will receive: UGX {(parseFloat(amountUsdc) * 3800).toLocaleString()}
                </p>
              )}
            </div>

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

            {/* Withdraw Button */}
            <button
              type="submit"
              disabled={loading || !phoneNumber || !amountUsdc || parseFloat(amountUsdc) > parseFloat(balance || '0')}
              className="btn btn-primary w-full"
            >
              {loading ? 'Processing...' : 'Withdraw to Mobile Money'}
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
