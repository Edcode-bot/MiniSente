'use client'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Wallet } from 'lucide-react'
import { toast } from 'sonner'

export function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <div className="text-sm font-mono bg-white/10 px-3 py-1 rounded-lg border border-white/20">
          {address.slice(0, 6)}...{address.slice(-4)}
        </div>
        <button 
          onClick={() => disconnect()}
          className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector })}
          disabled={isPending}
          className="px-6 py-3 bg-gradient-to-r from-violet-600 via-blue-500 to-teal-400 rounded-xl font-bold hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Wallet className="w-4 h-4" />
          Connect {connector.name}
        </button>
      ))}
    </div>
  )
}
