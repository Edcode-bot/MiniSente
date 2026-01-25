'use client'

import { useState, useMemo } from 'react'
import { useAccount } from 'wagmi'
import { ArrowUpRight, ArrowDownLeft, ExternalLink, Search, Download, Filter } from 'lucide-react'
import { formatAddress, formatUSDC, formatTimestamp } from '@/lib/utils/format'
import { BLOCK_EXPLORER_URL } from '@/lib/config/constants'
import { Button } from '@/components/ui/Button'
import { useRealTransactions } from '@/lib/hooks/useRealTransactions'
import { toast } from 'sonner'

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
  },
  {
    id: '5',
    hash: '0x5678901234ef1234567890ef1234567890123456',
    type: 'electricity',
    from: '0x1234567890abcdef1234567890abcdef12345678',
    to: '0x0000000000000000000000000000000000000000000',
    amount: '25.00',
    timestamp: Date.now() - 259200000,
    status: 'confirmed',
    description: 'UMEME - Meter #12345678901',
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
  },
]

export default function HistoryPage() {
  const { address, isConnected } = useAccount()
  const [filter, setFilter] = useState<'all' | 'sent' | 'received' | 'utilities'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Use real transactions if available, fallback to mock
  const realTx = useRealTransactions()
  const transactions = realTx.transactions.length > 0 ? realTx.transactions.map((tx: any) => {
    const isTreasury = tx.to.toLowerCase() === '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'.toLowerCase()
    const isFromUser = tx.from.toLowerCase() === address?.toLowerCase()
    
    let type: Transaction['type']
    if (isTreasury && isFromUser) {
      type = 'airtime'
    } else if (isTreasury && !isFromUser) {
      type = 'data'
    } else if (isFromUser) {
      type = 'sent'
    } else {
      type = 'received'
    }
    
    let description: string
    if (isTreasury && isFromUser) {
      description = 'Airtime Purchase'
    } else if (isTreasury && !isFromUser) {
      description = 'Data Bundle Purchase'
    } else if (isFromUser) {
      description = 'USDC Transfer'
    } else {
      description = 'USDC Received'
    }
    
    return {
      id: tx.hash,
      hash: tx.hash,
      type,
      from: tx.from,
      to: tx.to,
      amount: (parseFloat(tx.value) / 1e6).toFixed(2),
      timestamp: tx.timestamp,
      status: tx.status,
      description,
    }
  }) : mockTransactions

  const filteredTransactions = useMemo(() => {
    let filtered = transactions

    // Filter by type
    if (filter === 'sent') {
      filtered = filtered.filter(tx => tx.type === 'sent')
    } else if (filter === 'received') {
      filtered = filtered.filter(tx => tx.type === 'received')
    } else if (filter === 'utilities') {
      filtered = filtered.filter(tx => ['airtime', 'data', 'electricity', 'school_fees'].includes(tx.type))
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(tx =>
        tx.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.amount.includes(searchTerm)
      )
    }

    return filtered
  }, [transactions, filter, searchTerm])

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredTransactions.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredTransactions, currentPage])

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'sent':
        return <ArrowUpRight className="w-4 h-4 text-red-600" />
      case 'received':
        return <ArrowDownLeft className="w-4 h-4 text-green-600" />
      case 'airtime':
        return <span className="text-lg">📱</span>
      case 'data':
        return <span className="text-lg">📊</span>
      case 'electricity':
        return <span className="text-lg">⚡</span>
      case 'school_fees':
        return <span className="text-lg">🎓</span>
      default:
        return <span className="text-lg">💰</span>
    }
  }

  const getStatusBadge = (status: Transaction['status']) => {
    const styles = {
      confirmed: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      failed: 'bg-red-100 text-red-700',
    }
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const exportToCSV = () => {
    const headers = ['Date', 'Type', 'Description', 'Amount', 'Status', 'Transaction Hash']
    const rows = filteredTransactions.map(tx => [
      formatTimestamp(tx.timestamp),
      tx.type,
      tx.description || '',
      tx.amount,
      tx.status,
      tx.hash,
    ])

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `minisente-transactions-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">📋</span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Connect Your Wallet</h2>
          <p className="text-gray-600 mb-8">Connect your wallet to view transaction history</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Transaction History</h1>
          <p className="text-gray-600">View and manage your transaction history</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Filter Tabs */}
            <div className="flex gap-2">
              {(['all', 'sent', 'received', 'utilities'] as const).map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === filterType
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Export Button */}
            <Button
              variant="outline"
              onClick={exportToCSV}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {paginatedTransactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search terms' : 'Your transactions will appear here'}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatTimestamp(transaction.timestamp)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {getTransactionIcon(transaction.type)}
                            <span className="text-sm font-medium text-gray-900 capitalize">
                              {transaction.type.replace('_', ' ')}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {transaction.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`font-semibold ${
                            transaction.type === 'sent' || ['airtime', 'data', 'electricity', 'school_fees'].includes(transaction.type)
                              ? 'text-red-600'
                              : 'text-green-600'
                          }`}>
                            {transaction.type === 'sent' || ['airtime', 'data', 'electricity', 'school_fees'].includes(transaction.type) ? '-' : '+'}
                            {formatUSDC(transaction.amount)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(transaction.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a
                            href={`${BLOCK_EXPLORER_URL}/tx/${transaction.hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
