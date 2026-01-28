'use client'

import { Identity } from '@coinbase/onchainkit/identity'
import { useAccount } from 'wagmi'

export function OnchainIdentity() {
  const { address } = useAccount()

  if (!address) return null

  return (
    <div className="glass-morphism rounded-xl p-6 border border-white/20">
      <h3 className="text-xl font-bold text-white mb-4">Your Identity</h3>
      
      <Identity 
        address={address}
        className="space-y-4"
        hasCopyAddressOnClick
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-violet via-primary-blue to-primary-teal rounded-full flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
          <div>
            <div className="text-lg font-medium text-white">Connected Wallet</div>
            <div className="text-sm text-gray-400">{address.slice(0, 6)}...{address.slice(-4)}</div>
          </div>
        </div>
      </Identity>
    </div>
  )
}
