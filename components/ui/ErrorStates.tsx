'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, WifiOff, ServerCrash, X } from 'lucide-react'
import { ReactNode } from 'react'

interface ErrorStateProps {
  title: string
  description: string
  icon?: ReactNode
  action?: {
    label: string
    onClick: () => void
  }
  onDismiss?: () => void
  className?: string
}

export function ErrorState({ title, description, icon, action, onDismiss, className = '' }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`glass-morphism rounded-xl p-6 border border-red-500/20 ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {icon || (
            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <p className="text-sm text-gray-400 mb-4">{description}</p>
          
          {action && (
            <button
              onClick={action.onClick}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              {action.label}
            </button>
          )}
        </div>

        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
    </motion.div>
  )
}

export function NetworkError({ onRetry }: { onRetry: () => void }) {
  return (
    <ErrorState
      title="Network Error"
      description="Unable to connect to the network. Please check your connection and try again."
      icon={
        <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
          <WifiOff className="w-5 h-5 text-red-400" />
        </div>
      }
      action={{
        label: "Retry",
        onClick: onRetry,
      }}
    />
  )
}

export function ServerError({ onRetry }: { onRetry: () => void }) {
  return (
    <ErrorState
      title="Server Error"
      description="Something went wrong on our end. We're working to fix it."
      icon={
        <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
          <ServerCrash className="w-5 h-5 text-red-400" />
        </div>
      }
      action={{
        label: "Try Again",
        onClick: onRetry,
      }}
    />
  )
}

export function WalletError({ onRetry }: { onRetry: () => void }) {
  return (
    <ErrorState
      title="Wallet Connection Error"
      description="Failed to connect to your wallet. Please make sure your wallet is unlocked and try again."
      icon={
        <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-red-400" />
        </div>
      }
      action={{
        label: "Reconnect Wallet",
        onClick: onRetry,
      }}
    />
  )
}

export function InsufficientBalanceError({ onRetry }: { onRetry: () => void }) {
  return (
    <ErrorState
      title="Insufficient Balance"
      description="You don't have enough USDC to complete this transaction. Please add more funds to your wallet."
      icon={
        <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
        </div>
      }
      action={{
        label: "Add Funds",
        onClick: onRetry,
      }}
    />
  )
}

export function TransactionError({ onRetry }: { onRetry: () => void }) {
  return (
    <ErrorState
      title="Transaction Failed"
      description="Your transaction could not be completed. Please try again or contact support if the issue persists."
      icon={
        <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-red-400" />
        </div>
      }
      action={{
        label: "Try Again",
        onClick: onRetry,
      }}
    />
  )
}

export function ValidationError({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 flex items-center gap-3"
    >
      <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
      <p className="text-sm text-red-400">{message}</p>
      <button
        onClick={onDismiss}
        className="ml-auto p-1 hover:bg-red-500/20 rounded transition-colors"
      >
        <X className="w-3 h-3 text-red-400" />
      </button>
    </motion.div>
  )
}

interface ErrorBoundaryFallbackProps {
  error: Error
  resetError: () => void
}

export function ErrorBoundaryFallback({ error, resetError }: ErrorBoundaryFallbackProps) {
  return (
    <div className="min-h-screen bg-bg-darker flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-morphism rounded-2xl p-8 border border-red-500/20 max-w-md w-full text-center"
      >
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
        <p className="text-gray-400 mb-6">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        
        <button
          onClick={resetError}
          className="px-6 py-3 bg-gradient-to-r from-primary-blue to-primary-teal text-white rounded-lg hover:scale-105 transition-all duration-200"
        >
          Try Again
        </button>
      </motion.div>
    </div>
  )
}
