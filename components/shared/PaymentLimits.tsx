'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useUSDCBalance } from '@/hooks/useUSDCBalance'
import { formatUSDC } from '@/lib/utils/format'
import { AlertTriangle, TrendingUp } from 'lucide-react'

interface PaymentLimits {
  daily: number
  weekly: number
  monthly: number
  currentDaily: number
  currentWeekly: number
  currentMonthly: number
}

export function PaymentLimits() {
  const { address } = useAccount()
  const { balance } = useUSDCBalance(address)
  const [limits, setLimits] = useState<PaymentLimits>({
    daily: 1000,
    weekly: 5000,
    monthly: 20000,
    currentDaily: 0,
    currentWeekly: 0,
    currentMonthly: 0,
  })

  useEffect(() => {
    // Load limits from localStorage
    const savedLimits = localStorage.getItem('minisente-limits')
    if (savedLimits) {
      try {
        setLimits(JSON.parse(savedLimits))
      } catch (error) {
        console.error('Failed to load limits:', error)
      }
    }

    // Load current usage from localStorage (in a real app, this would come from backend)
    const savedUsage = localStorage.getItem('minisente-usage')
    if (savedUsage) {
      try {
        const usage = JSON.parse(savedUsage)
        const now = Date.now()
        const dayStart = new Date(now).setHours(0, 0, 0, 0)
        const weekStart = new Date(now - (new Date(now).getDay() * 24 * 60 * 60 * 1000)).setHours(0, 0, 0, 0)
        const monthStart = new Date(new Date(now).getFullYear(), new Date(now).getMonth(), 1).setHours(0, 0, 0, 0)

        setLimits(prev => ({
          ...prev,
          currentDaily: usage.daily?.filter((tx: any) => tx.timestamp >= dayStart).reduce((sum: number, tx: any) => sum + tx.amount, 0) || 0,
          currentWeekly: usage.weekly?.filter((tx: any) => tx.timestamp >= weekStart).reduce((sum: number, tx: any) => sum + tx.amount, 0) || 0,
          currentMonthly: usage.monthly?.filter((tx: any) => tx.timestamp >= monthStart).reduce((sum: number, tx: any) => sum + tx.amount, 0) || 0,
        }))
      } catch (error) {
        console.error('Failed to load usage:', error)
      }
    }
  }, [])

  const getProgressPercentage = (current: number, limit: number) => {
    return Math.min((current / limit) * 100, 100)
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500'
    if (percentage >= 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getLimitStatus = (current: number, limit: number) => {
    const percentage = (current / limit) * 100
    if (percentage >= 90) return { status: 'critical', color: 'text-red-400', icon: AlertTriangle }
    if (percentage >= 70) return { status: 'warning', color: 'text-yellow-400', icon: TrendingUp }
    return { status: 'normal', color: 'text-green-400', icon: null }
  }

  if (!address) {
    return null
  }

  return (
    <div className="glass-morphism rounded-xl p-6 border border-white/20">
      <h3 className="text-lg font-semibold text-white mb-6">Payment Limits</h3>

      <div className="space-y-6">
        {/* Daily Limit */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Daily Limit</span>
            <span className="text-sm text-white font-medium">
              {formatUSDC(limits.currentDaily)} / {formatUSDC(limits.daily)}
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${getProgressColor(getProgressPercentage(limits.currentDaily, limits.daily))}`}
              style={{ width: `${getProgressPercentage(limits.currentDaily, limits.daily)}%` }}
            />
          </div>
          {getLimitStatus(limits.currentDaily, limits.daily).status === 'critical' && (
            <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Daily limit almost reached
            </p>
          )}
        </div>

        {/* Weekly Limit */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Weekly Limit</span>
            <span className="text-sm text-white font-medium">
              {formatUSDC(limits.currentWeekly)} / {formatUSDC(limits.weekly)}
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${getProgressColor(getProgressPercentage(limits.currentWeekly, limits.weekly))}`}
              style={{ width: `${getProgressPercentage(limits.currentWeekly, limits.weekly)}%` }}
            />
          </div>
          {getLimitStatus(limits.currentWeekly, limits.weekly).status === 'warning' && (
            <p className="text-xs text-yellow-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Weekly limit warning
            </p>
          )}
        </div>

        {/* Monthly Limit */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Monthly Limit</span>
            <span className="text-sm text-white font-medium">
              {formatUSDC(limits.currentMonthly)} / {formatUSDC(limits.monthly)}
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${getProgressColor(getProgressPercentage(limits.currentMonthly, limits.monthly))}`}
              style={{ width: `${getProgressPercentage(limits.currentMonthly, limits.monthly)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">Available Balance</span>
          <span className="text-white font-medium">{formatUSDC(balance)}</span>
        </div>
        <div className="flex items-center justify-between text-xs mt-1">
          <span className="text-gray-400">Remaining Daily</span>
          <span className="text-accent-green font-medium">
            {formatUSDC(Math.max(0, limits.daily - limits.currentDaily))}
          </span>
        </div>
      </div>

      <div className="mt-4 text-center">
        <button className="text-xs text-primary-blue hover:text-primary-teal transition-colors">
          Request Higher Limits
        </button>
      </div>
    </div>
  )
}
