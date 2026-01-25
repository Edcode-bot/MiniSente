'use client'

import { useReadContract } from 'wagmi'
import { useEffect, useState } from 'react'
import { base } from 'wagmi/chains'

const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as const
const USDC_DECIMALS = 6

const USDC_ABI = [
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

export function useUSDCBalance(address?: string) {
  const [balance, setBalance] = useState<string>('0')
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now())

  const { data, isLoading, error, refetch } = useReadContract({
    address: USDC_ADDRESS,
    abi: USDC_ABI,
    functionName: 'balanceOf',
    args: address ? [address as `0x${string}`] : undefined,
    chainId: base.id,
    query: {
      enabled: !!address,
      refetchOnWindowFocus: false,
    },
  })

  useEffect(() => {
    if (data !== undefined) {
      const formattedBalance = (Number(data) / Math.pow(10, USDC_DECIMALS)).toFixed(2)
      setBalance(formattedBalance)
      setLastUpdate(Date.now())
    }
  }, [data])

  useEffect(() => {
    if (!address) return

    const interval = setInterval(() => {
      const now = Date.now()
      if (now - lastUpdate >= 10000) {
        refetch()
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [address, lastUpdate, refetch])

  return {
    balance,
    isLoading,
    error,
    refetch,
  }
}
