'use client'

import { Wallet } from '@coinbase/onchainkit/wallet'

export function OnchainWallet() {
  return (
    <Wallet className="px-6 py-3 bg-gradient-to-r from-primary-violet via-primary-blue to-primary-teal text-white rounded-lg hover:scale-105 transition-all duration-200 font-medium">
      Connect Wallet
    </Wallet>
  )
}
