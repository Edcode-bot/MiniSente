'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { base } from 'wagmi/chains'
import { ERC20_ABI } from '@/lib/abis/erc20'
import { toast } from 'sonner'

const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as const
const USDC_DECIMALS = 6

interface SendUSDCParams {
  recipient: string
  amount: string
}

export function useSendUSDC() {
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

  const sendUSDC = async ({ recipient, amount }: SendUSDCParams) => {
    try {
      setIsPending(true)
      setTxHash(null)

      // Validate recipient address
      if (!recipient.startsWith('0x') || recipient.length !== 42) {
        throw new Error('Invalid recipient address')
      }

      // Convert amount to wei (USDC has 6 decimals)
      const amountInWei = (parseFloat(amount) * Math.pow(10, USDC_DECIMALS)).toString()

      // Send transaction
      writeContract({
        address: USDC_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'transfer',
        args: [recipient as `0x${string}`, BigInt(amountInWei)],
        chainId: base.id,
      })

      toast.success('Transaction sent! Waiting for confirmation...')
      setIsConfirming(true)

    } catch (error) {
      console.error('Send USDC error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to send USDC')
      setIsPending(false)
      setIsConfirming(false)
    }
  }

  // Handle transaction hash from writeContract
  useState(() => {
    if (writeError) {
      toast.error('Transaction failed: ' + writeError.message)
      setIsPending(false)
      setIsConfirming(false)
    }
  })

  // Handle transaction receipt
  useState(() => {
    if (receipt) {
      setIsConfirming(false)
      setIsPending(false)
      toast.success('Transaction confirmed!')
    }
    if (receiptError) {
      toast.error('Transaction failed: ' + receiptError.message)
      setIsConfirming(false)
      setIsPending(false)
    }
  })

  return {
    sendUSDC,
    isPending: isPending || isReceiptLoading,
    isConfirming,
    receipt,
    txHash,
    error: writeError || receiptError,
  }
}
