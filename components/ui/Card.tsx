import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  variant?: 'default' | 'bordered' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
}

export function Card({ 
  children, 
  variant = 'default', 
  padding = 'md', 
  className = '' 
}: CardProps) {
  const variantClasses = {
    default: 'bg-white',
    bordered: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg',
  }

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const baseClasses = 'rounded-xl'
  const classes = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`

  return (
    <div className={classes}>
      {children}
    </div>
  )
}
