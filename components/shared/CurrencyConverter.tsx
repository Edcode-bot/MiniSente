'use client'

import { useState } from 'react'
import { ArrowUpDown } from 'lucide-react'

interface CurrencyConverterProps {
  amount: string
  onAmountChange?: (amount: string) => void
  className?: string
}

export function CurrencyConverter({ amount, onAmountChange, className = '' }: CurrencyConverterProps) {
  const [isUSDC, setIsUSDC] = useState(true)
  const [convertedAmount, setConvertedAmount] = useState('')

  const EXCHANGE_RATE = 3800 // 1 USDC = 3800 UGX

  const convertAmount = (value: string, fromUSDC: boolean) => {
    const numValue = parseFloat(value) || 0
    if (fromUSDC) {
      return (numValue * EXCHANGE_RATE).toLocaleString('en-UG', { 
        style: 'currency', 
        currency: 'UGX',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
    } else {
      return (numValue / EXCHANGE_RATE).toFixed(4)
    }
  }

  const handleToggle = () => {
    setIsUSDC(!isUSDC)
    if (amount) {
      const newConverted = convertAmount(amount, !isUSDC)
      setConvertedAmount(newConverted)
    }
  }

  const handleAmountChange = (value: string) => {
    if (onAmountChange) {
      onAmountChange(value)
    }
    if (value) {
      const converted = convertAmount(value, isUSDC)
      setConvertedAmount(converted)
    } else {
      setConvertedAmount('')
    }
  }

  return (
    <div className={`glass-morphism rounded-xl p-6 border border-white/20 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Currency Converter</h3>
        <button
          onClick={handleToggle}
          className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
        >
          <ArrowUpDown className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            {isUSDC ? 'USDC Amount' : 'UGX Amount'}
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder={isUSDC ? '0.00' : '0'}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
              {isUSDC ? 'USDC' : 'UGX'}
            </div>
          </div>
        </div>

        {amount && convertedAmount && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              {isUSDC ? 'UGX Equivalent' : 'USDC Equivalent'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={convertedAmount}
                readOnly
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
                {isUSDC ? 'UGX' : 'USDC'}
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Exchange Rate</span>
            <span className="text-white font-medium">1 USDC = {EXCHANGE_RATE.toLocaleString()} UGX</span>
          </div>
        </div>
      </div>
    </div>
  )
}
