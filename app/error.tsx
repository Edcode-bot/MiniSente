'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
        
        <p className="text-gray-600 mb-8">
          We're sorry, but something unexpected happened. Please try again or contact support if the problem persists.
        </p>

        {error.digest && (
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-600 mb-2">Error ID:</p>
            <p className="font-mono text-xs text-gray-800">{error.digest}</p>
          </div>
        )}

        <div className="space-y-4">
          <Button
            onClick={reset}
            className="w-full flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
          
          <Link href="/">
            <Button variant="outline" className="w-full">
              Go to Dashboard
            </Button>
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Need help?</p>
          <div className="space-y-1">
            <Link href="/support" className="text-sm text-blue-600 hover:text-blue-700 block">
              Contact Support
            </Link>
            <Link href="/faq" className="text-sm text-blue-600 hover:text-blue-700 block">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
