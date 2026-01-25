'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { WalletConnect } from '@/components/wallet/WalletConnect'
import { PaymentConfirmation } from '@/components/utilities/PaymentConfirmation'
import Link from 'next/link'
import { ArrowLeft, Zap, Home } from 'lucide-react'
import { convertUgxToUsdc, validateMeterNumber, calculateElectricityUnits, mockPayment } from '@/lib/utils/payments'
import { formatUGX } from '@/lib/utils/format'
import { toast } from 'sonner'
import { Button } from '@/components/ui/Button'

export default function ElectricityPage() {
  const { isConnected } = useAccount()
  const [meterNumber, setMeterNumber] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [amount, setAmount] = useState('')
  const [errors, setErrors] = useState<{ meter?: string; amount?: string }>({})
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const validateForm = () => {
    const newErrors: { meter?: string; amount?: string } = {}

    if (!meterNumber) {
      newErrors.meter = 'Meter number is required'
    } else if (!validateMeterNumber(meterNumber)) {
      newErrors.meter = 'Meter number must be 11-13 digits'
    }

    if (!amount) {
      newErrors.amount = 'Amount is required'
    } else if (parseFloat(amount) < 5000) {
      newErrors.amount = 'Minimum amount is UGX 5,000'
    } else if (parseFloat(amount) > 1000000) {
      newErrors.amount = 'Maximum amount is UGX 1,000,000'
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
    setIsProcessing(true)
    try {
      const amountUsdc = convertUgxToUsdc(amount)
      const result = await mockPayment('electricity', {
        meterNumber,
        customerName,
        amount,
      }, amountUsdc)

      if (result.success) {
        toast.success(`Electricity payment successful! Token: ${result.token}`)
        setTimeout(() => {
          window.location.href = '/'
        }, 2000)
      } else {
        toast.error(result.error || 'Payment failed')
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
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
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Buy Electricity (UMEME)</h1>
                <p className="text-gray-600">Pay for prepaid electricity tokens</p>
              </div>
            </div>
            <WalletConnect />
          </header>

          <main className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">⚡</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Connect Your Wallet</h2>
              <p className="text-gray-600 mb-8">Connect your wallet to pay for electricity</p>
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
            <Link href="/utilities" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Buy Electricity (UMEME)</h1>
              <p className="text-gray-600">Pay for prepaid electricity tokens</p>
            </div>
          </div>
          <WalletConnect />
        </header>

        <main className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">UMEME Prepaid</h2>
                <p className="text-sm text-gray-600">Instant electricity tokens</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meter Number
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={meterNumber}
                    onChange={(e) => {
                      setMeterNumber(e.target.value.replace(/\D/g, ''))
                      if (e.target.value.length >= 11) {
                        setCustomerName('John Doe')
                      }
                    }}
                    placeholder="Enter 11-13 digit meter number"
                    maxLength={13}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                      errors.meter ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.meter && (
                  <p className="mt-1 text-sm text-red-600">{errors.meter}</p>
                )}
              </div>

              {customerName && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Customer Name:</p>
                  <p className="font-medium">{customerName}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (UGX)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount (minimum 5,000)"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                    errors.amount ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.amount && (
                  <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                )}
                {amount && parseFloat(amount) >= 5000 && (
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600">
                      Estimated Units: ~{calculateElectricityUnits(parseFloat(amount))} kWh
                    </p>
                    <p className="text-sm text-gray-600">
                      Cost: ~{convertUgxToUsdc(amount).toFixed(4)} USDC
                    </p>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
                disabled={!meterNumber || !amount || parseFloat(amount) < 5000}
              >
                Pay Electricity
              </Button>
            </form>
          </div>
        </main>

        {showConfirmation && (
          <PaymentConfirmation
            service="Electricity"
            details={{
              meterNumber,
              customerName,
              amount: formatUGX(amount),
              estimatedUnits: `${calculateElectricityUnits(parseFloat(amount))} kWh`,
            }}
            amountUsdc={convertUgxToUsdc(amount)}
            amountUgx={parseFloat(amount)}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            loading={isProcessing}
          />
        )}
      </div>
    </div>
  )
}
