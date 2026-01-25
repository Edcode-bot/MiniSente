'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ArrowRight, ExternalLink, Share2 } from 'lucide-react'
import { ReactNode } from 'react'

interface SuccessStateProps {
  title: string
  description: string
  icon?: ReactNode
  action?: {
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary'
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function SuccessState({ title, description, icon, action, secondaryAction, className = '' }: SuccessStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`glass-morphism rounded-xl p-6 border border-green-500/20 ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {icon || (
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <p className="text-sm text-gray-400 mb-4">{description}</p>
          
          <div className="flex gap-3">
            {action && (
              <button
                onClick={action.onClick}
                className={`px-4 py-2 rounded-lg hover:scale-105 transition-all duration-200 flex items-center gap-2 ${
                  action.variant === 'secondary'
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                }`}
              >
                {action.label}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            
            {secondaryAction && (
              <button
                onClick={secondaryAction.onClick}
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                {secondaryAction.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function TransactionSuccess({ 
  hash, 
  amount, 
  recipient, 
  onViewOnExplorer,
  onShare 
}: { 
  hash: string
  amount: string
  recipient: string
  onViewOnExplorer: () => void
  onShare: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-morphism rounded-2xl p-8 border border-green-500/20 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle className="w-10 h-10 text-white" />
      </motion.div>
      
      <h2 className="text-2xl font-bold text-white mb-2">Transaction Successful!</h2>
      <p className="text-gray-400 mb-6">Your payment has been processed successfully</p>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
          <span className="text-gray-400">Amount</span>
          <span className="text-white font-medium">{amount} USDC</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
          <span className="text-gray-400">To</span>
          <span className="text-white font-mono text-sm">{recipient}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
          <span className="text-gray-400">Transaction</span>
          <span className="text-primary-blue font-mono text-sm">{hash.slice(0, 8)}...{hash.slice(-6)}</span>
        </div>
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={onViewOnExplorer}
          className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-blue to-primary-teal text-white rounded-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          View on Explorer
        </button>
        <button
          onClick={onShare}
          className="px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}

export function PaymentSuccess({ 
  type, 
  details, 
  amount, 
  onNewPayment 
}: { 
  type: string
  details: Record<string, any>
  amount: string
  onNewPayment: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-morphism rounded-2xl p-8 border border-green-500/20 text-center max-w-md mx-auto"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-8 h-8 text-white" />
      </div>
      
      <h2 className="text-2xl font-bold text-white mb-2 capitalize">{type} Payment Successful!</h2>
      <p className="text-gray-400 mb-6">Your payment has been completed</p>
      
      <div className="space-y-2 mb-6">
        {Object.entries(details).map(([key, value]) => (
          <div key={key} className="flex justify-between text-sm">
            <span className="text-gray-400 capitalize">{key.replace(/_/g, ' ')}</span>
            <span className="text-white">{value}</span>
          </div>
        ))}
        <div className="flex justify-between text-sm pt-2 border-t border-white/10">
          <span className="text-gray-400">Amount Paid</span>
          <span className="text-green-400 font-medium">{amount}</span>
        </div>
      </div>
      
      <button
        onClick={onNewPayment}
        className="w-full px-6 py-3 bg-gradient-to-r from-primary-blue to-primary-teal text-white rounded-lg hover:scale-105 transition-all duration-200"
      >
        Make Another Payment
      </button>
    </motion.div>
  )
}

export function CelebrationSuccess({ title, message, onContinue }: { title: string; message: string; onContinue: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="glass-morphism rounded-2xl p-8 border border-green-500/20 max-w-md mx-4 text-center"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
        <p className="text-gray-400 mb-8">{message}</p>
        
        <button
          onClick={onContinue}
          className="px-8 py-3 bg-gradient-to-r from-primary-blue to-primary-teal text-white rounded-lg hover:scale-105 transition-all duration-200"
        >
          Continue
        </button>
      </motion.div>
    </motion.div>
  )
}
