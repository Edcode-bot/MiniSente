'use client'

import { FundCard } from '@coinbase/onchainkit/fund'

export function OnchainFundCard() {
  return (
    <div className="glass-morphism rounded-xl p-6 border border-white/20">
      <h3 className="text-xl font-bold text-white mb-4">Add Funds</h3>
      <p className="text-gray-400 mb-6">
        Purchase USDC directly with your credit card or bank transfer
      </p>
      
      <FundCard 
        assetSymbol="USDC"
        country="US"
        className="w-full"
        headerText="Buy USDC"
        buttonText="Buy Now"
      />
    </div>
  )
}
