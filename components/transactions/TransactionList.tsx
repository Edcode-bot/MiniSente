'use client'

import { useState, useEffect } from 'react'
import { ArrowUpRight, ArrowDownLeft, ExternalLink, Loader2 } from 'lucide-react'
import { formatAddress, formatUSDC, formatTimestamp } from '@/lib/utils/format'
import { BLOCK_EXPLORER_URL } from '@/lib/config/constants'

interface Transaction {
  hash: string
  type: 'sent' | 'received'
  from: string
  to: string
  amount: string
  timestamp: number
  status: 'pending' | 'confirmed' | 'failed'
}

interface TransactionListProps {
  address: string
  limit?: number
}

export function TransactionList({ address, limit = 10 }: TransactionListProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true)
      
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const mockTransactions: Transaction[] = [
        {
          hash: '0x1234567890abcdef1234567890abcdef12345678',
          type: 'received',
          from: '0xabcdef1234567890abcdef1234567890abcdef12',
          to: address,
          amount: '150.50',
          timestamp: Date.now() - 3600000,
          status: 'confirmed',
        },
        {
          hash: '0x2345678901bcdef1234567890bcdef12345678901',
          type: 'sent',
          from: address,
          to: '0xbcdef1234567890bcdef1234567890bcdef12345',
          amount: '75.25',
          timestamp: Date.now() - 7200000,
          status: 'confirmed',
        },
        {
          hash: '0x3456789012cdef1234567890cdef123456789012',
          type: 'received',
          from: '0xcdef1234567890cdef1234567890cdef12345678',
          to: address,
          amount: '200.00',
          timestamp: Date.now() - 86400000,
          status: 'confirmed',
        },
        {
          hash: '0x4567890123def1234567890def12345678901234',
          type: 'sent',
          from: address,
          to: '0xdef1234567890def1234567890def1234567890',
          amount: '50.00',
          timestamp: Date.now() - 172800000,
          status: 'confirmed',
        },
        {
          hash: '0x5678901234ef1234567890ef1234567890123456',
          type: 'received',
          from: '0xef1234567890ef1234567890ef1234567890123',
          to: address,
          amount: '125.75',
          timestamp: Date.now() - 259200000,
          status: 'confirmed',
        },
      ]

      setTransactions(mockTransactions.slice(0, limit))
      setIsLoading(false)
    }

    if (address) {
      fetchTransactions()
    }
  }, [address, limit])

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(limit)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📋</span>
        </div>
        <p className="text-gray-600">No transactions yet</p>
        <p className="text-sm text-gray-500 mt-2">Your transaction history will appear here</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {transactions.map((tx) => (
        <div
          key={tx.hash}
          className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            tx.type === 'sent' ? 'bg-red-100' : 'bg-green-100'
          }`}>
            {tx.type === 'sent' ? (
              <ArrowUpRight className="w-5 h-5 text-red-600" />
            ) : (
              <ArrowDownLeft className="w-5 h-5 text-green-600" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`font-medium ${
                tx.type === 'sent' ? 'text-red-600' : 'text-green-600'
              }`}>
                {tx.type === 'sent' ? 'Sent' : 'Received'}
              </span>
              <span className="text-sm text-gray-500">
                {formatTimestamp(tx.timestamp)}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              {tx.type === 'sent' ? 'To: ' : 'From: '}
              <span className="font-mono">
                {formatAddress(tx.type === 'sent' ? tx.to : tx.from)}
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className={`font-semibold ${
              tx.type === 'sent' ? 'text-red-600' : 'text-green-600'
            }`}>
              {tx.type === 'sent' ? '-' : '+'}{formatUSDC(tx.amount)}
            </div>
            <div className="flex items-center gap-1 justify-end">
              <span className={`text-xs px-2 py-1 rounded-full ${
                tx.status === 'confirmed' 
                  ? 'bg-green-100 text-green-700'
                  : tx.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {tx.status}
              </span>
              <a
                href={`${BLOCK_EXPLORER_URL}/tx/${tx.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
