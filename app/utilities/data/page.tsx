'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@/components/wallet/ConnectButton'
import { PaymentConfirmation } from '@/components/utilities/PaymentConfirmation'
import Link from 'next/link'
import { ArrowLeft, Wifi } from 'lucide-react'
import { CARRIERS, DATA_BUNDLES } from '@/lib/config/constants'
import { convertUgxToUsdc, validatePhoneNumber, formatPhoneNumber } from '@/lib/utils/payments'
import { formatUGX } from '@/lib/utils/format'
import { toast } from 'sonner'
import { Button } from '@/components/ui/Button'
import { useUtilityPayment } from '@/hooks/useUtilityPayment'

export default function DataPage() {
  const { isConnected } = useAccount()
  const [selectedCarrier, setSelectedCarrier] = useState<'MTN' | 'AIRTEL' | null>(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [selectedBundle, setSelectedBundle] = useState<(typeof DATA_BUNDLES)[number] | null>(null)
  const [errors, setErrors] = useState<{ carrier?: string; phone?: string; bundle?: string }>({})
  const [showConfirmation, setShowConfirmation] = useState(false)
  const { makePayment, isPending, isConfirming, success } = useUtilityPayment()

  const validateForm = () => {
    const newErrors: { carrier?: string; phone?: string; bundle?: string } = {}

    if (!selectedCarrier) {
      newErrors.carrier = 'Please select a carrier'
    }

    if (!phoneNumber) {
      newErrors.phone = 'Phone number is required'
    } else if (!validatePhoneNumber(phoneNumber)) {
      newErrors.phone = 'Please enter a valid Ugandan phone number (10 digits starting with 0)'
    }

    if (!selectedBundle) {
      newErrors.bundle = 'Please select a data bundle'
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
        type: 'data',
        details: {
          carrier: selectedCarrier!,
          phoneNumber: formatPhoneNumber(phoneNumber),
          bundle: selectedBundle!.name,
          amount: selectedBundle!.price.toString(),
        },
      })
      
      if (success) {
        toast.success('Data bundle purchased successfully!')
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
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Buy Data Bundle</h1>
                <p className="text-gray-600">Stay connected with mobile data</p>
              </div>
            </div>
            <ConnectButton />
          </header>

          <main className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">📊</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Connect Your Wallet</h2>
              <p className="text-gray-600 mb-8">Connect your wallet to buy data bundles</p>
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
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Buy Data Bundle</h1>
              <p className="text-gray-600">Stay connected with mobile data</p>
            </div>
          </div>
          <ConnectButton />
        </header>

        <main className="max-w-4xl mx-auto">
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
                  <Wifi className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
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
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Select Data Bundle
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {DATA_BUNDLES.map((bundle) => (
                    <button
                      key={bundle.name}
                      type="button"
                      onClick={() => setSelectedBundle(bundle)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        selectedBundle?.name === bundle.name
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold text-lg text-gray-900 mb-1">
                        {bundle.name}
                      </div>
                      <div className="text-gray-600 text-sm mb-2">
                        {bundle.validity}
                      </div>
                      <div className="font-bold text-blue-600">
                        {formatUGX(bundle.price)}
                      </div>
                    </button>
                  ))}
                </div>
                {errors.bundle && (
                  <p className="mt-2 text-sm text-red-600">{errors.bundle}</p>
                )}
              </div>

              {selectedBundle && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Selected Bundle:</span>
                    <span className="font-semibold">{selectedBundle.name}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Validity:</span>
                    <span>{selectedBundle.validity}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Cost:</span>
                    <div className="text-right">
                      <div className="font-semibold">{formatUGX(selectedBundle.price)}</div>
                      <div className="text-sm text-gray-500">
                        ~{convertUgxToUsdc(selectedBundle.price).toFixed(4)} USDC
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                loading={isPending || isConfirming}
                className="w-full"
                disabled={!selectedCarrier || !phoneNumber || !selectedBundle}
              >
                {isPending || isConfirming ? 'Processing...' : 'Purchase Bundle'}
              </Button>
            </form>
          </div>
        </main>

        {showConfirmation && (
          <PaymentConfirmation
            service="Data Bundle"
            details={{
              carrier: CARRIERS[selectedCarrier!].name,
              phone: formatPhoneNumber(phoneNumber),
              bundle: `${selectedBundle!.name} (${selectedBundle!.validity})`,
              amount: formatUGX(selectedBundle!.price),
            }}
            amountUsdc={convertUgxToUsdc(selectedBundle!.price)}
            amountUgx={selectedBundle!.price}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            loading={isPending || isConfirming}
          />
        )}
      </div>
    </div>
  )
}
