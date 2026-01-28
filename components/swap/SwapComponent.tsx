'use client'

import { useState } from 'react'
import { Swap } from '@coinbase/onchainkit/swap'

export function OnchainSwap() {
  const [amount, setAmount] = useState('')

  return (
    <div className="glass-morphism rounded-xl p-6 border border-white/20">
      <h3 className="text-xl font-bold text-white mb-4">Swap Tokens</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Amount (USDC)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          />
        </div>

        <Swap
          className="w-full px-6 py-3 bg-gradient-to-r from-primary-violet via-primary-blue to-primary-teal text-white rounded-lg hover:scale-105 transition-all duration-200 font-medium"
        >
          Swap
        </Swap>
      </div>
    </div>
  )
}
