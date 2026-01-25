'use client'

import { motion } from 'framer-motion'

interface LoadingSkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'card'
  lines?: number
  width?: string
  height?: string
}

export function LoadingSkeleton({ 
  className = '', 
  variant = 'rectangular', 
  lines = 1, 
  width, 
  height 
}: LoadingSkeletonProps) {
  const baseClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'rounded-2xl',
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <motion.div
            key={i}
            className={`h-4 ${baseClasses.text} bg-white/10`}
            style={{ 
              width: i === lines - 1 ? '60%' : '100%',
            }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <motion.div
      className={`${baseClasses[variant]} bg-white/10 ${className}`}
      style={{ width, height }}
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  )
}

export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`glass-morphism rounded-xl p-6 border border-white/20 ${className}`}>
      <div className="space-y-4">
        <LoadingSkeleton variant="circular" width="40px" height="40px" />
        <div className="space-y-2">
          <LoadingSkeleton variant="text" height="20px" />
          <LoadingSkeleton variant="text" height="16px" />
        </div>
        <LoadingSkeleton variant="rectangular" height="40px" />
      </div>
    </div>
  )
}

export function TransactionSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 ${className}`}>
      <div className="flex items-center gap-3">
        <LoadingSkeleton variant="circular" width="32px" height="32px" />
        <div className="space-y-1">
          <LoadingSkeleton variant="text" width="100px" height="16px" />
          <LoadingSkeleton variant="text" width="150px" height="12px" />
        </div>
      </div>
      <div className="text-right space-y-1">
        <LoadingSkeleton variant="text" width="80px" height="16px" />
        <LoadingSkeleton variant="text" width="60px" height="12px" />
      </div>
    </div>
  )
}

export function TableSkeleton({ rows = 5, className = '' }: { rows?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {/* Header */}
      <div className="flex gap-4 pb-2 border-b border-white/10">
        {Array.from({ length: 4 }).map((_, i) => (
          <LoadingSkeleton key={i} variant="text" height="16px" className="flex-1" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <TransactionSkeleton key={i} />
      ))}
    </div>
  )
}

export function ListSkeleton({ items = 3, className = '' }: { items?: number; className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: items }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}

export function StatsSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="glass-morphism rounded-xl p-6 border border-white/20">
          <LoadingSkeleton variant="text" height="16px" className="mb-2" />
          <LoadingSkeleton variant="text" height="32px" className="mb-4" />
          <LoadingSkeleton variant="text" height="12px" width="60%" />
        </div>
      ))}
    </div>
  )
}

export function FormSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="space-y-2">
        <LoadingSkeleton variant="text" height="16px" width="100px" />
        <LoadingSkeleton variant="rectangular" height="48px" />
      </div>
      <div className="space-y-2">
        <LoadingSkeleton variant="text" height="16px" width="120px" />
        <LoadingSkeleton variant="rectangular" height="48px" />
      </div>
      <LoadingSkeleton variant="rectangular" height="48px" />
    </div>
  )
}
