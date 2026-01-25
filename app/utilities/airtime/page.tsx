'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@/components/wallet/ConnectButton'
import { PaymentConfirmation } from '@/components/utilities/PaymentConfirmation'
import Link from 'next/link'
import { ArrowLeft, Phone } from 'lucide-react'
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <header className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-4">
              <Link href="/utilities" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Buy Airtime</h1>
                <p className="text-gray-600">Top up your mobile phone</p>
              </div>
            </div>
            <ConnectButton />
          </header>

          <main className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">📱</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Connect Your Wallet</h2>
              <p className="text-gray-600 mb-8">Connect your wallet to buy airtime</p>
              <ConnectButton />
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
            <Link href="/utilities" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Buy Airtime</h1>
              <p className="text-gray-600">Top up your mobile phone</p>
            </div>
          </div>
          <ConnectButton />
        </header>

        <main className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Select Carrier
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(CARRIERS).map(([key, carrier]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedCarrier(key as 'MTN' | 'AIRTEL')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedCarrier === key
                          ? `${carrier.bgColor} border-transparent text-white`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{carrier.logo}</div>
                      <div className="font-medium">{carrier.name}</div>
                    </button>
                  ))}
                </div>
                {errors.carrier && (
                  <p className="mt-2 text-sm text-red-600">{errors.carrier}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="07xxxxxxxx"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (UGX)
                </label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {AIRTIME_AMOUNTS.slice(0, 6).map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setAmount(amt.toString())}
                      className={`py-2 px-4 rounded-lg border transition-colors ${
                        amount === amt.toString()
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'border-gray-200 hover:border-gray-300'
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
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.amount ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.amount && (
                  <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                )}
                {amount && parseFloat(amount) > 0 && (
                  <p className="mt-2 text-sm text-gray-600">
                    Cost: ~{(convertUgxToUsdc(amount)).toFixed(4)} USDC
                  </p>
                )}
              </div>

              <Button
                type="submit"
                loading={isPending || isConfirming}
                className="w-full"
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
