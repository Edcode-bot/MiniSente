'use client'

import { useState } from 'react'
import { Transaction } from '@coinbase/onchainkit/transaction'
import { useAccount } from 'wagmi'

export function OnchainSend() {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const { address } = useAccount()

  const calls = recipient && amount ? [
    {
      to: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as `0x${string}`, // USDC on Base
      data: ('0xa9059cbb' + // transfer function selector
            recipient.slice(2).padStart(64, '0') + // address (32 bytes)
            (parseFloat(amount) * 1e6).toString(16).padStart(64, '0')) as `0x${string}` // amount (32 bytes, USDC has 6 decimals)
    }
  ] : []

  return (
    <div className="glass-morphism rounded-xl p-6 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6">Send USDC</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Recipient Address
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Amount (USDC)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
          />
        </div>

        <Transaction
          calls={calls}
          className="w-full px-6 py-3 bg-gradient-to-r from-primary-violet via-primary-blue to-primary-teal text-white rounded-lg hover:scale-105 transition-all duration-200 font-medium disabled:opacity-50"
        >
          Send USDC
        </Transaction>
      </div>
    </div>
  )
}
