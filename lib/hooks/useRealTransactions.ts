'use client'

import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'
import { base } from 'wagmi/chains'
import { formatAddress, formatUSDC, formatTimestamp } from '@/lib/utils/format'
import { BLOCK_EXPLORER_URL } from '@/lib/config/constants'

interface Transaction {
  hash: string
  blockNumber: string
  timestamp: number
  from: string
  to: string
  value: string
  gas: string
  gasPrice: string
  isError: boolean
  status: 'success' | 'pending' | 'failed'
}

// Fetch transactions from Base Etherscan API
const fetchTransactions = async (address: string): Promise<Transaction[]> => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY
    const url = `https://api-sepolia.basescan.org/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${apiKey}`
    
    const response = await fetch(url)
    const data = await response.json()
    
    if (data.status === '0' && data.result) {
      return data.result.map((tx: any) => ({
        hash: tx.hash,
        blockNumber: tx.blockNumber,
        timestamp: parseInt(tx.timeStamp) * 1000,
        from: tx.from,
        to: tx.to.toLowerCase(),
        value: tx.value,
        gas: tx.gas,
        gasPrice: tx.gasPrice,
        isError: tx.isError === '1',
        status: tx.isError === '1' ? 'failed' : tx.txreceipt_status === '1' ? 'success' : 'pending',
      }))
    }
    
    return []
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return []
  }
}

export function useRealTransactions() {
  const { address, isConnected } = useAccount()

  const { data: transactions, isLoading, error, refetch } = useQuery({
    queryKey: ['transactions', address],
    queryFn: () => address ? fetchTransactions(address) : [],
    enabled: !!address && !!process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 15000,
  })

  const sentTransactions = transactions?.filter(tx => 
    tx.from.toLowerCase() === address?.toLowerCase()
  ) || []

  const receivedTransactions = transactions?.filter(tx => 
    tx.to.toLowerCase() === address?.toLowerCase()
  ) || []

  const utilityTransactions = transactions?.filter(tx => 
    tx.to.toLowerCase() === '0x742d35cc6634c0532925a3b844bc9e7595f0beb'.toLowerCase()
  ) || []

  return {
    transactions: transactions || [],
    sentTransactions,
    receivedTransactions,
    utilityTransactions,
    isLoading,
    error,
    refetch,
    isConnected,
  }
}
