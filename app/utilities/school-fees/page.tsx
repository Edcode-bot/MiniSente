'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { WalletConnect } from '@/components/wallet/WalletConnect'
import { PaymentConfirmation } from '@/components/utilities/PaymentConfirmation'
import Link from 'next/link'
import { ArrowLeft, GraduationCap } from 'lucide-react'
import { SCHOOLS } from '@/lib/config/constants'
import { convertUgxToUsdc, generateReference, mockPayment } from '@/lib/utils/payments'
import { formatUGX } from '@/lib/utils/format'
import { toast } from 'sonner'
import { Button } from '@/components/ui/Button'

export default function SchoolFeesPage() {
  const { isConnected } = useAccount()
  const [selectedSchool, setSelectedSchool] = useState('')
  const [customSchool, setCustomSchool] = useState('')
  const [studentName, setStudentName] = useState('')
  const [studentId, setStudentId] = useState('')
  const [semester, setSemester] = useState('')
  const [amount, setAmount] = useState('')
  const [referenceNumber, setReferenceNumber] = useState('')
  const [errors, setErrors] = useState<{ school?: string; studentName?: string; studentId?: string; semester?: string; amount?: string }>({})
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    setReferenceNumber(generateReference('SCH'))
  }, [])

  const validateForm = () => {
    const newErrors: { school?: string; studentName?: string; studentId?: string; semester?: string; amount?: string } = {}

    if (!selectedSchool && !customSchool) {
      newErrors.school = 'Please select or enter a school name'
    }

    if (!studentName.trim()) {
      newErrors.studentName = 'Student name is required'
    }

    if (!studentId.trim()) {
      newErrors.studentId = 'Student ID/Registration number is required'
    }

    if (!semester.trim()) {
      newErrors.semester = 'Term/Semester is required'
    }

    if (!amount) {
      newErrors.amount = 'Amount is required'
    } else if (parseFloat(amount) < 10000) {
      newErrors.amount = 'Minimum amount is UGX 10,000'
    } else if (parseFloat(amount) > 10000000) {
      newErrors.amount = 'Maximum amount is UGX 10,000,000'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setShowConfirmation(true)
    }
  }

  const handleConfirm = async () => {
    setIsProcessing(true)
    try {
      const amountUsdc = convertUgxToUsdc(amount)
      const result = await mockPayment('school-fees', {
        school: selectedSchool || customSchool,
        studentName,
        studentId,
        semester,
        referenceNumber,
        amount,
      }, amountUsdc)

      if (result.success) {
        toast.success(`School fees paid successfully! Receipt: ${result.receiptNumber}`)
        setTimeout(() => {
          window.location.href = '/'
        }, 2000)
      } else {
        toast.error(result.error || 'Payment failed')
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
      setShowConfirmation(false)
    }
  }

  const handleCancel = () => {
    setShowConfirmation(false)
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <header className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-4">
              <Link href="/utilities" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Pay School Fees</h1>
                <p className="text-gray-600">Secure education payments</p>
              </div>
            </div>
            <WalletConnect />
          </header>

          <main className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🎓</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Connect Your Wallet</h2>
              <p className="text-gray-600 mb-8">Connect your wallet to pay school fees</p>
              <WalletConnect />
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <Link href="/utilities" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Pay School Fees</h1>
              <p className="text-gray-600">Secure education payments</p>
            </div>
          </div>
          <WalletConnect />
        </header>

        <main className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Education Payment</h2>
                <p className="text-sm text-gray-600">Fast and secure school fee payments</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School
                </label>
                <select
                  value={selectedSchool}
                  onChange={(e) => {
                    setSelectedSchool(e.target.value)
                    setCustomSchool('')
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.school ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a school</option>
                  {SCHOOLS.map((school) => (
                    <option key={school} value={school}>
                      {school}
                    </option>
                  ))}
                  <option value="custom">Custom School</option>
                </select>
                {selectedSchool === 'custom' && (
                  <input
                    type="text"
                    value={customSchool}
                    onChange={(e) => setCustomSchool(e.target.value)}
                    placeholder="Enter school name"
                    className="w-full mt-3 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                )}
                {errors.school && (
                  <p className="mt-1 text-sm text-red-600">{errors.school}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Name
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter student name"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.studentName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.studentName && (
                    <p className="mt-1 text-sm text-red-600">{errors.studentName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student ID/Registration
                  </label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Enter student ID"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.studentId ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.studentId && (
                    <p className="mt-1 text-sm text-red-600">{errors.studentId}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Term/Semester
                  </label>
                  <input
                    type="text"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    placeholder="e.g., Term 1, Semester 2"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.semester ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.semester && (
                    <p className="mt-1 text-sm text-red-600">{errors.semester}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (UGX)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.amount ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.amount && (
                    <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                  )}
                  {amount && parseFloat(amount) > 0 && (
                    <p className="mt-2 text-sm text-gray-600">
                      Cost: ~{convertUgxToUsdc(amount).toFixed(4)} USDC
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Reference Number:</p>
                <p className="font-mono font-semibold">{referenceNumber}</p>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                disabled={(!selectedSchool && !customSchool) || !studentName || !studentId || !semester || !amount}
              >
                Pay Fees
              </Button>
            </form>
          </div>
        </main>

        {showConfirmation && (
          <PaymentConfirmation
            service="School Fees"
            details={{
              school: selectedSchool || customSchool,
              studentName,
              studentId,
              semester,
              referenceNumber,
              amount: formatUGX(amount),
            }}
            amountUsdc={convertUgxToUsdc(amount)}
            amountUgx={parseFloat(amount)}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            loading={isProcessing}
          />
        )}
      </div>
    </div>
  )
}
