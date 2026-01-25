'use client'

import { motion } from 'framer-motion'
import { Loader2, RefreshCw } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`${sizeClasses[size]} ${className}`}
    >
      <Loader2 className="w-full h-full text-primary-blue" />
    </motion.div>
  )
}

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string
  height?: string
}

export function Skeleton({ className = '', variant = 'rectangular', width, height }: SkeletonProps) {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  }

  return (
    <motion.div
      className={`bg-white/10 ${variantClasses[variant]} ${className}`}
      style={{ width, height }}
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  )
}

interface LoadingCardProps {
  children?: React.ReactNode
  className?: string
}

export function LoadingCard({ children, className = '' }: LoadingCardProps) {
  return (
    <motion.div
      className={`glass-morphism rounded-xl p-6 border border-white/20 ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="lg" />
      </div>
      {children && (
        <div className="mt-4 text-center text-gray-400">
          {children}
        </div>
      )}
    </motion.div>
  )
}

interface LoadingButtonProps {
  children: React.ReactNode
  loading?: boolean
  className?: string
  disabled?: boolean
}

export function LoadingButton({ children, loading = false, className = '', disabled = false }: LoadingButtonProps) {
  return (
    <motion.button
      className={`relative overflow-hidden ${className}`}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.05 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
    >
      {loading && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary-violet via-primary-blue to-primary-teal opacity-20"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      )}
      <div className="flex items-center justify-center gap-2">
        {loading && <LoadingSpinner size="sm" />}
        <span className={loading ? 'opacity-70' : ''}>{children}</span>
      </div>
    </motion.button>
  )
}

interface PageLoadingProps {
  message?: string
}

export function PageLoading({ message = 'Loading...' }: PageLoadingProps) {
  return (
    <div className="min-h-screen bg-bg-darker flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-primary-violet via-primary-blue to-primary-teal rounded-full flex items-center justify-center mx-auto mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <RefreshCw className="w-8 h-8 text-white" />
          </motion.div>
        </div>
        <p className="text-gray-400">{message}</p>
      </motion.div>
    </div>
  )
}

interface PulseLoaderProps {
  className?: string
}

export function PulseLoader({ className = '' }: PulseLoaderProps) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-primary-blue rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  )
}
