'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { base } from 'wagmi/chains'
import { useUSDCBalance } from '@/hooks/useUSDCBalance'
import { ERC20_ABI } from '@/lib/abis/erc20'
import { formatAddress, formatUSDC, formatUGX, usdcToUgx, isValidAddress } from '@/lib/utils/format'
import { BLOCK_EXPLORER_URL } from '@/lib/config/constants'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'
import { Loader2, ExternalLink, CheckCircle } from 'lucide-react'

const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as const

export function SendForm() {
  const { address } = useAccount()
  const { balance, isLoading: balanceLoading } = useUSDCBalance(address)
  const { writeContract, isPending: writePending, data: hash } = useWriteContract()
  const { isLoading: confirmLoading, isSuccess: confirmed } = useWaitForTransactionReceipt({
    hash,
    chainId: base.id,
  })

  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [errors, setErrors] = useState<{ recipient?: string; amount?: string }>({})
  const [showConfirmation, setShowConfirmation] = useState(false)

  const validateForm = () => {
    const newErrors: { recipient?: string; amount?: string } = {}

    if (!recipient) {
      newErrors.recipient = 'Recipient address is required'
    } else if (!isValidAddress(recipient)) {
      newErrors.recipient = 'Invalid address format'
    } else if (recipient.toLowerCase() === address?.toLowerCase()) {
      newErrors.recipient = 'Cannot send to your own address'
    }

    if (!amount) {
      newErrors.amount = 'Amount is required'
    } else if (parseFloat(amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0'
    } else if (parseFloat(amount) > parseFloat(balance)) {
      newErrors.amount = 'Insufficient balance'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleMaxClick = () => {
    setAmount(balance)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setShowConfirmation(true)
    }
  }

  const handleConfirm = () => {
    try {
      const amountInWei = BigInt(Math.floor(parseFloat(amount) * 1e6))
      
      writeContract({
        address: USDC_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'transfer',
        args: [recipient as `0x${string}`, amountInWei],
        chainId: base.id,
      })

      setShowConfirmation(false)
      toast.success('Transaction submitted!')
    } catch (error) {
      toast.error('Failed to send transaction')
      console.error('Send error:', error)
    }
  }

  const handleCancel = () => {
    setShowConfirmation(false)
  }

  if (confirmed && hash) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Transaction Sent!</h2>
        <p className="text-gray-600 mb-6">
          Successfully sent {formatUSDC(amount)} to {formatAddress(recipient)}
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-2">Transaction Hash:</p>
          <div className="flex items-center justify-center gap-2">
            <span className="font-mono text-sm">{formatAddress(hash)}</span>
            <a
              href={`${BLOCK_EXPLORER_URL}/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
        <Button onClick={() => window.location.href = '/'} className="w-full">
          Back to Dashboard
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Send USDC</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipient Address
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x1234...5678"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.recipient ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.recipient && (
            <p className="mt-1 text-sm text-red-600">{errors.recipient}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount (USDC)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.amount ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              onClick={handleMaxClick}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Max
            </button>
          </div>
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
          )}
          <div className="mt-2 text-sm text-gray-600">
            Available: {formatUSDC(balance)}
            {amount && parseFloat(amount) > 0 && (
              <span className="ml-4">
                ≈ {formatUGX(usdcToUgx(amount))}
              </span>
            )}
          </div>
        </div>

        <Button
          type="submit"
          loading={writePending || confirmLoading}
          className="w-full"
        >
          {writePending || confirmLoading ? 'Sending...' : 'Send USDC'}
        </Button>
      </form>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Transaction</h3>
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm text-gray-600">To:</p>
                <p className="font-mono">{formatAddress(recipient)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Amount:</p>
                <p className="font-semibold">{formatUSDC(amount)}</p>
                <p className="text-sm text-gray-600">{formatUGX(usdcToUgx(amount))}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                loading={writePending}
                className="flex-1"
              >
                Confirm Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
