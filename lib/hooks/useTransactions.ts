'use client'

import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'
import { useMemo } from 'react'

interface Transaction {
  id: string
  hash: string
  type: 'sent' | 'received' | 'airtime' | 'data' | 'electricity' | 'school_fees'
  from: string
  to: string
  amount: string
  timestamp: number
  status: 'pending' | 'confirmed' | 'failed'
  description?: string
  gasUsed?: string
  gasPrice?: string
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    hash: '0x1234567890abcdef1234567890abcdef12345678',
    type: 'received',
    from: '0xabcdef1234567890abcdef1234567890abcdef12',
    to: '0x1234567890abcdef1234567890abcdef12345678',
    amount: '150.50',
    timestamp: Date.now() - 3600000,
    status: 'confirmed',
    description: 'Received from 0x...ef12',
    gasUsed: '21000',
    gasPrice: '20000000000',
  },
  {
    id: '2',
    hash: '0x2345678901bcdef1234567890bcdef12345678901',
    type: 'sent',
    from: '0x1234567890abcdef1234567890abcdef12345678',
    to: '0xbcdef1234567890bcdef1234567890bcdef12345',
    amount: '75.25',
    timestamp: Date.now() - 7200000,
    status: 'confirmed',
    description: 'Sent to 0x...2345',
    gasUsed: '21000',
    gasPrice: '20000000000',
  },
  {
    id: '3',
    hash: '0x3456789012cdef1234567890cdef123456789012',
    type: 'airtime',
    from: '0x1234567890abcdef1234567890abcdef12345678',
    to: '0x0000000000000000000000000000000000000000',
    amount: '5.00',
    timestamp: Date.now() - 86400000,
    status: 'confirmed',
    description: 'MTN Airtime - +256712345678',
    gasUsed: '50000',
    gasPrice: '20000000000',
  },
  {
    id: '4',
    hash: '0x4567890123def1234567890def12345678901234',
    type: 'data',
    from: '0x1234567890abcdef1234567890abcdef12345678',
    to: '0x0000000000000000000000000000000000000000',
    amount: '10.50',
    timestamp: Date.now() - 172800000,
    status: 'confirmed',
    description: 'Airtel Data - 2GB Bundle',
    gasUsed: '50000',
    gasPrice: '20000000000',
  },
  {
    id: '5',
    hash: '0x5678901234ef1234567890ef1234567890123456',
    type: 'electricity',
    from: '0x1234567890abcdef1234567890abcdef12345678',
    to: '0x0000000000000000000000000000000000000000',
    amount: '25.00',
    timestamp: Date.now() - 259200000,
    status: 'confirmed',
    description: 'UMEME - Meter #12345678901',
    gasUsed: '50000',
    gasPrice: '20000000000',
  },
  {
    id: '6',
    hash: '0x6789012345f0123456789f0123456789f01234567',
    type: 'school_fees',
    from: '0x1234567890abcdef1234567890abcdef12345678',
    to: '0x0000000000000000000000000000000000000000',
    amount: '500.00',
    timestamp: Date.now() - 345600000,
    status: 'confirmed',
    description: 'Makerere University - Semester 1',
    gasUsed: '50000',
    gasPrice: '20000000000',
  },
  {
    id: '7',
    hash: '0x7890123456g123456789g123456789g12345678',
    type: 'sent',
    from: '0x1234567890abcdef1234567890abcdef12345678',
    to: '0xg123456789g123456789g123456789g123456',
    amount: '100.00',
    timestamp: Date.now() - 300000,
    status: 'pending',
    description: 'Pending transaction',
    gasUsed: '21000',
    gasPrice: '25000000000',
  },
]

// Mock API function to fetch transactions
const fetchTransactions = async (address: string): Promise<Transaction[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Filter transactions for the current user
  return mockTransactions.filter(tx => 
    tx.from.toLowerCase() === address.toLowerCase() ||
    tx.to.toLowerCase() === address.toLowerCase()
  )
}

export function useTransactions(options?: {
  type?: 'sent' | 'received' | 'utilities'
  limit?: number
}) {
  const { address } = useAccount()

  const { data: transactions, isLoading, error, refetch } = useQuery({
    queryKey: ['transactions', address],
    queryFn: () => address ? fetchTransactions(address) : [],
    enabled: !!address,
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // 1 minute
  })

  const filteredTransactions = useMemo(() => {
    if (!transactions) return []

    let filtered = transactions

    // Filter by type
    if (options?.type === 'sent') {
      filtered = filtered.filter(tx => tx.type === 'sent')
    } else if (options?.type === 'received') {
      filtered = filtered.filter(tx => tx.type === 'received')
    } else if (options?.type === 'utilities') {
      filtered = filtered.filter(tx => ['airtime', 'data', 'electricity', 'school_fees'].includes(tx.type))
    }

    // Apply limit
    if (options?.limit) {
      filtered = filtered.slice(0, options.limit)
    }

    // Sort by timestamp (newest first)
    return filtered.sort((a, b) => b.timestamp - a.timestamp)
  }, [transactions, options])

  const stats = useMemo(() => {
    if (!transactions) return {
      totalTransactions: 0,
      sentCount: 0,
      receivedCount: 0,
      utilityCount: 0,
      totalSent: 0,
      totalReceived: 0,
    }

    const sent = transactions.filter(tx => tx.type === 'sent')
    const received = transactions.filter(tx => tx.type === 'received')
    const utilities = transactions.filter(tx => ['airtime', 'data', 'electricity', 'school_fees'].includes(tx.type))

    return {
      totalTransactions: transactions.length,
      sentCount: sent.length,
      receivedCount: received.length,
      utilityCount: utilities.length,
      totalSent: sent.reduce((sum, tx) => sum + parseFloat(tx.amount), 0),
      totalReceived: received.reduce((sum, tx) => sum + parseFloat(tx.amount), 0),
    }
  }, [transactions])

  return {
    transactions: filteredTransactions,
    isLoading,
    error,
    refetch,
    stats,
    allTransactions: transactions || [],
  }
}
