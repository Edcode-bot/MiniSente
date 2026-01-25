import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">💰</span>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">MiniSente</h1>
        
        <div className="flex items-center justify-center gap-3">
          <LoadingSpinner size="lg" />
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    </div>
  )
}
