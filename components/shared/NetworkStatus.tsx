'use client'

import { useAccount, useChainId, useSwitchChain } from 'wagmi'
import { base } from 'wagmi/chains'
import { AlertTriangle, CheckCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export function NetworkStatus() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { switchChain, isPending } = useSwitchChain()

  const isCorrectNetwork = chainId === base.id

  const handleSwitchNetwork = async () => {
    try {
      await switchChain({ chainId: base.id })
      toast.success('Switched to Base Network')
    } catch (error) {
      toast.error('Failed to switch network')
    }
  }

  if (!isConnected || !address) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      {isPending ? (
        <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded-full">
          <Loader2 className="w-3 h-3 text-yellow-400 animate-spin" />
          <span className="text-xs text-yellow-400">Switching...</span>
        </div>
      ) : isCorrectNetwork ? (
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full">
          <CheckCircle className="w-3 h-3 text-green-400" />
          <span className="text-xs text-green-400">Base</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/50 rounded-full">
            <AlertTriangle className="w-3 h-3 text-red-400" />
            <span className="text-xs text-red-400">Wrong Network</span>
          </div>
          <button
            onClick={handleSwitchNetwork}
            className="text-xs px-3 py-1 bg-gradient-to-r from-primary-blue to-primary-teal text-white rounded-full hover:scale-105 transition-all duration-200"
          >
            Switch to Base
          </button>
        </div>
      )}
    </div>
  )
}
