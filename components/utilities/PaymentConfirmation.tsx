'use client'

import { X, Loader2 } from 'lucide-react'
import { formatUSDC, formatUGX } from '@/lib/utils/format'
import { Button } from '@/components/ui/Button'

interface PaymentConfirmationProps {
  service: string
  details: Record<string, any>
  amountUsdc: number
  amountUgx: number
  onConfirm: () => void
  onCancel: () => void
  loading?: boolean
}

export function PaymentConfirmation({
  service,
  details,
  amountUsdc,
  amountUgx,
  onConfirm,
  onCancel,
  loading = false,
}: PaymentConfirmationProps) {
  const renderDetails = () => {
    return Object.entries(details).map(([key, value]) => {
      if (key === 'amount') return null
      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
      return (
        <div key={key} className="flex justify-between">
          <span className="text-gray-600">{label}:</span>
          <span className="font-medium">{value}</span>
        </div>
      )
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          disabled={loading}
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Confirm Payment</h3>
          <p className="text-gray-600">Review your payment details before confirming</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-gray-900">{service}</span>
            <span className="text-sm text-gray-500">Payment Summary</span>
          </div>

          <div className="space-y-3 mb-4">
            {renderDetails()}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Amount (UGX):</span>
              <span className="font-bold text-lg">{formatUGX(amountUgx)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount (USDC):</span>
              <span className="font-bold text-lg text-blue-600">{formatUSDC(amountUsdc)}</span>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>Important:</strong> This transaction will be processed on the Base blockchain and cannot be reversed once confirmed.
          </p>
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            loading={loading}
            className="flex-1"
          >
            {loading ? 'Processing...' : 'Confirm Payment'}
          </Button>
        </div>
      </div>
    </div>
  )
}
