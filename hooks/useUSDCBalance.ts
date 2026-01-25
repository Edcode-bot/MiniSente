'use client'

import { useReadContract } from 'wagmi'
import { useEffect, useState } from 'react'
import { base } from 'wagmi/chains'
import { ERC20_ABI } from '@/lib/abis/erc20'

const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as const
const USDC_DECIMALS = 6

export function useUSDCBalance(address?: string) {
  const [balance, setBalance] = useState<string>('0')
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now())

  const { data, isLoading, error, refetch } = useReadContract({
    address: USDC_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address as `0x${string}`] : undefined,
    chainId: base.id,
    query: {
      enabled: !!address,
      refetchOnWindowFocus: false,
      refetchInterval: 10000, // Refetch every 10 seconds
    },
  })

  useEffect(() => {
    if (data !== undefined) {
      const formattedBalance = (Number(data) / Math.pow(10, USDC_DECIMALS)).toFixed(2)
      setBalance(formattedBalance)
      setLastUpdate(Date.now())
    }
  }, [data])

  return {
    balance,
    isLoading,
    error,
    refetch,
    formattedBalance: parseFloat(balance).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
  }
}
