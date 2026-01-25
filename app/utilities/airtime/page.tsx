'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { ConnectWallet } from '@/components/wallet/ConnectWallet'
import { PaymentConfirmation } from '@/components/utilities/PaymentConfirmation'
import Link from 'next/link'
import { ArrowLeft, Phone, Smartphone } from 'lucide-react'
import { CARRIERS, AIRTIME_AMOUNTS } from '@/lib/config/constants'
import { convertUgxToUsdc, validatePhoneNumber, formatPhoneNumber } from '@/lib/utils/payments'
import { formatUGX } from '@/lib/utils/format'
import { toast } from 'sonner'
import { Button } from '@/components/ui/Button'
import { useUtilityPayment } from '@/hooks/useUtilityPayment'

export default function AirtimePage() {
  const { isConnected } = useAccount()
  const [selectedCarrier, setSelectedCarrier] = useState<'MTN' | 'AIRTEL' | null>(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [errors, setErrors] = useState<{ carrier?: string; phone?: string; amount?: string }>({})
  const [showConfirmation, setShowConfirmation] = useState(false)
  const { makePayment, isPending, isConfirming, success } = useUtilityPayment()

  const validateForm = () => {
    const newErrors: { carrier?: string; phone?: string; amount?: string } = {}

    if (!selectedCarrier) {
      newErrors.carrier = 'Please select a carrier'
    }

    if (!phoneNumber) {
      newErrors.phone = 'Phone number is required'
    } else if (!validatePhoneNumber(phoneNumber)) {
      newErrors.phone = 'Please enter a valid Ugandan phone number (10 digits starting with 0)'
    }

    if (!amount) {
      newErrors.amount = 'Amount is required'
    } else if (parseFloat(amount) < 1000) {
      newErrors.amount = 'Minimum amount is UGX 1,000'
    } else if (parseFloat(amount) > 500000) {
      newErrors.amount = 'Maximum amount is UGX 500,000'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setShowConfirmation(true)
    }
  }

  const handleConfirm = async () => {
    try {
      await makePayment({
        type: 'airtime',
        details: {
          carrier: selectedCarrier!,
          phoneNumber: formatPhoneNumber(phoneNumber),
          amount,
        },
      })
      
      if (success) {
        toast.success('Airtime purchased successfully!')
        setTimeout(() => {
          window.location.href = '/utilities'
        }, 2000)
      }
    } catch (error) {
      console.error('Payment error:', error)
    } finally {
      setShowConfirmation(false)
    }
  }

  const handleCancel = () => {
    setShowConfirmation(false)
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-bg-darker text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <header className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-4">
              <Link href="/utilities" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-4xl font-bold gradient-text mb-2">Buy Airtime</h1>
                <p className="text-gray-400">Top up your mobile phone</p>
              </div>
            </div>
            <ConnectWallet />
          </header>

          <main className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 bg-gradient-to-br from-accent-orange to-accent-pink rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-4">Connect Your Wallet</h2>
              <p className="text-gray-400 mb-8">Connect your wallet to buy airtime</p>
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
            <Link href="/utilities" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">Buy Airtime</h1>
              <p className="text-gray-400">Top up your mobile phone</p>
            </div>
          </div>
          <ConnectWallet />
        </header>

        <main className="max-w-2xl mx-auto">
          <div className="glass-morphism rounded-2xl p-8 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-white mb-4">
                  Select Carrier
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(CARRIERS).map(([key, carrier]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedCarrier(key as 'MTN' | 'AIRTEL')}
                      className={`p-4 rounded-xl border-2 transition-all card-hover ${
                        selectedCarrier === key
                          ? `${carrier.bgColor} border-transparent text-white glow-effect`
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <div className="text-2xl mb-2">{carrier.logo}</div>
                      <div className="font-medium">{carrier.name}</div>
                    </button>
                  ))}
                </div>
                {errors.carrier && (
                  <p className="mt-2 text-sm text-red-400">{errors.carrier}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="07xxxxxxxx"
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent transition-all ${
                      errors.phone ? 'border-red-500' : 'border-white/20'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Amount (UGX)
                </label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {AIRTIME_AMOUNTS.slice(0, 6).map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setAmount(amt.toString())}
                      className={`py-2 px-4 rounded-lg border transition-all card-hover ${
                        amount === amt.toString()
                          ? 'bg-gradient-to-r from-accent-orange to-accent-pink text-white border-transparent'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      {formatUGX(amt)}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter custom amount"
                  className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent transition-all ${
                    errors.amount ? 'border-red-500' : 'border-white/20'
                  }`}
                />
                {errors.amount && (
                  <p className="mt-1 text-sm text-red-400">{errors.amount}</p>
                )}
                {amount && parseFloat(amount) > 0 && (
                  <p className="mt-2 text-sm text-gray-400 neon-green">
                    Cost: ~{(convertUgxToUsdc(amount)).toFixed(4)} USDC
                  </p>
                )}
              </div>

              <Button
                type="submit"
                loading={isPending || isConfirming}
                className="w-full bg-gradient-to-r from-accent-orange to-accent-pink hover:scale-105 transition-all duration-200"
                disabled={!selectedCarrier || !phoneNumber || !amount}
              >
                {isPending || isConfirming ? 'Processing...' : 'Buy Airtime'}
              </Button>
            </form>
          </div>
        </main>

        {showConfirmation && (
          <PaymentConfirmation
            service="Airtime"
            details={{
              carrier: CARRIERS[selectedCarrier!].name,
              phone: formatPhoneNumber(phoneNumber),
              amount: formatUGX(amount),
            }}
            amountUsdc={convertUgxToUsdc(amount)}
            amountUgx={parseFloat(amount)}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            loading={isPending || isConfirming}
          />
        )}
      </div>
    </div>
  )
}
