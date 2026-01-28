'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { ArrowUpRight, ArrowDownLeft, Smartphone, Database, Zap, GraduationCap, ExternalLink } from 'lucide-react'
import { formatAddress, formatUSDC, formatTimestamp } from '@/lib/utils/format'
import { BLOCK_EXPLORER_URL } from '@/lib/config/constants'
import { useTransactions } from '@/lib/hooks/useTransactions'

interface ActivityItem {
  hash: string
  type: 'sent' | 'received' | 'airtime' | 'data' | 'electricity' | 'school_fees'
  amount: string
  timestamp: number
  status: 'success' | 'pending' | 'failed'
  description?: string
}

export function RecentActivity() {
  const { address } = useAccount()
  const { transactions } = useTransactions()
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([])

  useEffect(() => {
    if (!address || !transactions.length) return

    const activity: ActivityItem[] = transactions.slice(0, 5).map((tx) => {
      const isFromUser = tx.from_address?.toLowerCase() === address.toLowerCase()
      const isToTreasury = tx.to_address?.toLowerCase() === '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'.toLowerCase()
      
      let type: ActivityItem['type']
      let description = ''

      if (isToTreasury && isFromUser) {
        type = 'airtime'
        description = 'Utility payment'
      } else if (isToTreasury && !isFromUser) {
        type = 'data'
        description = 'Utility payment'
      } else if (isFromUser) {
        type = 'sent'
        description = `To ${formatAddress(tx.to_address || '')}`
      } else {
        type = 'received'
        description = `From ${formatAddress(tx.from_address || '')}`
      }

      return {
        hash: tx.tx_hash,
        type,
        amount: tx.amount.toString(),
        timestamp: new Date(tx.created_at).getTime(),
        status: tx.status === 'confirmed' ? 'success' : tx.status === 'failed' ? 'failed' : 'pending',
        description,
      }
    })

    setRecentActivity(activity)
  }, [address, transactions])

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'sent':
        return <ArrowUpRight className="w-4 h-4 text-red-400" />
      case 'received':
        return <ArrowDownLeft className="w-4 h-4 text-green-400" />
      case 'airtime':
        return <Smartphone className="w-4 h-4 text-accent-orange" />
      case 'data':
        return <Database className="w-4 h-4 text-primary-blue" />
      case 'electricity':
        return <Zap className="w-4 h-4 text-accent-green" />
      case 'school_fees':
        return <GraduationCap className="w-4 h-4 text-accent-pink" />
      default:
        return <ArrowUpRight className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: ActivityItem['status']) => {
    switch (status) {
      case 'success':
        return 'text-green-400'
      case 'pending':
        return 'text-yellow-400'
      case 'failed':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  if (!address) {
    return (
      <div className="glass-morphism rounded-xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <p className="text-gray-400 text-center py-8">Connect your wallet to see recent activity</p>
      </div>
    )
  }

  if (recentActivity.length === 0) {
    return (
      <div className="glass-morphism rounded-xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <p className="text-gray-400 text-center py-8">No recent transactions</p>
      </div>
    )
  }

  return (
    <div className="glass-morphism rounded-xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        <span className="text-sm text-gray-400">Last 5 transactions</span>
      </div>

      <div className="space-y-4">
        {recentActivity.map((activity) => (
          <div
            key={activity.hash}
            className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                {getActivityIcon(activity.type)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white capitalize">
                    {activity.type.replace('_', ' ')}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{activity.description}</p>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1">
                <span className={`font-semibold ${
                  activity.type === 'sent' || ['airtime', 'data', 'electricity', 'school_fees'].includes(activity.type)
                    ? 'text-red-400'
                    : 'text-green-400'
                }`}>
                  {activity.type === 'sent' || ['airtime', 'data', 'electricity', 'school_fees'].includes(activity.type) ? '-' : '+'}
                  {formatUSDC(activity.amount)}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {formatTimestamp(activity.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <a
          href="/history"
          className="flex items-center justify-center gap-2 text-sm text-primary-blue hover:text-primary-teal transition-colors"
        >
          View all transactions
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}
