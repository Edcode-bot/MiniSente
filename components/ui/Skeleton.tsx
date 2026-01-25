interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  lines?: number
}

export function Skeleton({ 
  className = '', 
  variant = 'text',
  width,
  height,
  lines = 1
}: SkeletonProps) {
  const baseClasses = 'skeleton'
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded',
  }

  const style = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'text' ? '1rem' : undefined),
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {[...Array(lines)].map((_, i) => (
          <div
            key={i}
            className={`${baseClasses} ${variantClasses[variant]}`}
            style={{
              width: i === lines - 1 ? '70%' : '100%',
              height: height || '1rem',
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  )
}

// Card Skeleton Component
export function CardSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="space-y-4">
        <Skeleton variant="text" width="60%" height="1.5rem" />
        <Skeleton variant="text" lines={lines} />
        <div className="flex justify-between items-center pt-4">
          <Skeleton variant="circular" width="2rem" height="2rem" />
          <Skeleton variant="text" width="30%" />
        </div>
      </div>
    </div>
  )
}

// Transaction List Skeleton
export function TransactionListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-4">
            <Skeleton variant="circular" width="2.5rem" height="2.5rem" />
            <div className="flex-1 space-y-2">
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="60%" height="0.875rem" />
            </div>
            <div className="text-right space-y-1">
              <Skeleton variant="text" width="4rem" />
              <Skeleton variant="text" width="3rem" height="0.75rem" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Table Skeleton
export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {[...Array(columns)].map((_, i) => (
              <th key={i} className="px-6 py-3">
                <Skeleton variant="text" height="0.875rem" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(columns)].map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  <Skeleton 
                    variant="text" 
                    height="0.875rem"
                    width={colIndex === 0 ? '70%' : '50%'}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
