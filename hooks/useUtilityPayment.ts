'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { base } from 'wagmi/chains'
import { ERC20_ABI } from '@/lib/abis/erc20'
import { toast } from 'sonner'

const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as const
const TREASURY_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb' as const
const USDC_DECIMALS = 6

interface UtilityPaymentParams {
  type: 'airtime' | 'data' | 'electricity' | 'school_fees'
  details: {
    carrier?: string
    phoneNumber?: string
    meterNumber?: string
    customerName?: string
    school?: string
    studentName?: string
    studentId?: string
    semester?: string
    bundle?: string
    amount: string
  }
}

export function useUtilityPayment() {
  const [isPending, setIsPending] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null)

  const { writeContract, error: writeError } = useWriteContract()

  const { 
    data: receipt, 
    isLoading: isReceiptLoading, 
    error: receiptError 
  } = useWaitForTransactionReceipt({
    hash: txHash!,
    chainId: base.id,
  })

  const makePayment = async ({ type, details }: UtilityPaymentParams) => {
    try {
      setIsPending(true)
      setTxHash(null)

      // Validate amount
      const amount = parseFloat(details.amount)
      if (amount <= 0) {
        throw new Error('Amount must be greater than 0')
      }

      // Convert amount to wei (USDC has 6 decimals)
      const amountInWei = BigInt(Math.floor(amount * Math.pow(10, USDC_DECIMALS)))

      // Send USDC to treasury address
      writeContract({
        address: USDC_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'transfer',
        args: [TREASURY_ADDRESS, amountInWei],
        chainId: base.id,
      })

      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} payment submitted!`)
      setIsConfirming(true)

    } catch (error) {
      console.error('Utility payment error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to process payment')
      setIsPending(false)
      setIsConfirming(false)
    }
  }

  // Handle transaction hash from writeContract
  useState(() => {
    if (writeError) {
      toast.error('Payment failed: ' + writeError.message)
      setIsPending(false)
      setIsConfirming(false)
    }
  })

  // Handle transaction receipt
  useState(() => {
    if (receipt) {
      setIsConfirming(false)
      setIsPending(false)
      
      // Generate mock success data based on payment type
      const mockData = generateMockSuccessData()
      toast.success('Payment completed successfully!')
      
      // Return success data for the component to handle
      return mockData
    }
    if (receiptError) {
      toast.error('Payment failed: ' + receiptError.message)
      setIsConfirming(false)
      setIsPending(false)
    }
  })

  const generateMockSuccessData = () => {
    const token = Math.random().toString(36).substring(2, 10).toUpperCase()
    const receipt = 'RCPT-' + Date.now().toString()
    
    return {
      token,
      receipt,
      timestamp: Date.now(),
    }
  }

  return {
    makePayment,
    isPending: isPending || isReceiptLoading,
    isConfirming,
    receipt,
    txHash,
    error: writeError || receiptError,
    success: !!receipt,
  }
}
