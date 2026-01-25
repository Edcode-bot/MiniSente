'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { formatAddress } from '@/lib/utils/format'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'
import { Loader2, Wallet, LogOut } from 'lucide-react'

export function ConnectButton() {
  const { address, isConnected, isConnecting } = useAccount()
  const { connect, connectors, error, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  const handleConnect = async () => {
    try {
      // Try MetaMask first, then fallback to other connectors
      const metamask = connectors.find(c => c.id === 'injected')
      if (metamask) {
        connect({ connector: metamask })
      } else if (connectors.length > 0) {
        connect({ connector: connectors[0] })
      }
    } catch (error) {
      toast.error('Failed to connect wallet')
      console.error('Connection error:', error)
    }
  }

  const handleDisconnect = () => {
    disconnect()
    toast.success('Wallet disconnected')
  }

  if (isConnecting || isPending) {
    return (
      <Button disabled className="flex items-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin" />
        Connecting...
      </Button>
    )
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="hidden sm:block text-sm font-mono bg-gray-100 px-3 py-2 rounded-lg">
          {formatAddress(address)}
        </div>
        <Button
          variant="outline"
          onClick={handleDisconnect}
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Disconnect</span>
        </Button>
      </div>
    )
  }

  return (
    <Button onClick={handleConnect} className="flex items-center gap-2">
      <Wallet className="w-4 h-4" />
      Connect Wallet
    </Button>
  )
}
