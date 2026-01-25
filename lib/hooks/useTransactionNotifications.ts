'use client'

import { useEffect, useState } from 'react'
import { useWaitForTransactionReceipt } from 'wagmi'
import { toast } from 'sonner'
import { BLOCK_EXPLORER_URL } from '@/lib/config/constants'

interface TransactionNotification {
  hash: string
  status: 'pending' | 'confirmed' | 'failed'
  message: string
  timestamp: number
}

export function useTransactionNotifications() {
  const [notifications, setNotifications] = useState<TransactionNotification[]>([])

  const showTransactionNotification = (hash: string, status: 'pending' | 'confirmed' | 'failed') => {
    const notification: TransactionNotification = {
      hash,
      status,
      message: getTransactionMessage(status, hash),
      timestamp: Date.now(),
    }

    setNotifications(prev => [notification, ...prev.slice(0, 4)]) // Keep last 5 notifications

    // Show toast notification
    if (status === 'pending') {
      toast.info('Transaction submitted', {
        description: 'Waiting for confirmation...',
        action: {
          label: 'View on Basescan',
          onClick: () => window.open(`${BLOCK_EXPLORER_URL}/tx/${hash}`, '_blank'),
        },
      })
    } else if (status === 'confirmed') {
      toast.success('Transaction confirmed!', {
        description: 'Your transaction was successful',
        action: {
          label: 'View on Basescan',
          onClick: () => window.open(`${BLOCK_EXPLORER_URL}/tx/${hash}`, '_blank'),
        },
      })
    } else if (status === 'failed') {
      toast.error('Transaction failed', {
        description: 'Please try again',
        action: {
          label: 'View on Basescan',
          onClick: () => window.open(`${BLOCK_EXPLORER_URL}/tx/${hash}`, '_blank'),
        },
      })
    }
  }

  const listenForTransaction = (hash: string) => {
    showTransactionNotification(hash, 'pending')

    // Listen for transaction receipt
    const { data: receipt } = useWaitForTransactionReceipt({
      hash: hash as `0x${string}`,
      pollingInterval: 1000,
    })

    useEffect(() => {
      if (receipt) {
        if (receipt.status === 'success') {
          showTransactionNotification(hash, 'confirmed')
        } else {
          showTransactionNotification(hash, 'failed')
        }
      }
    }, [receipt, hash])
  }

  return {
    notifications,
    showTransactionNotification,
    listenForTransaction,
  }
}

function getTransactionMessage(status: 'pending' | 'confirmed' | 'failed', hash: string): string {
  switch (status) {
    case 'pending':
      return `Transaction ${hash.slice(0, 6)}...${hash.slice(-4)} is being processed`
    case 'confirmed':
      return `Transaction ${hash.slice(0, 6)}...${hash.slice(-4)} confirmed successfully`
    case 'failed':
      return `Transaction ${hash.slice(0, 6)}...${hash.slice(-4)} failed`
    default:
      return 'Transaction status updated'
  }
}
