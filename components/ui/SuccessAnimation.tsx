'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface SuccessAnimationProps {
  show: boolean
  message?: string
  subMessage?: string
  onClose?: () => void
  duration?: number
}

export function SuccessAnimation({ show, message = 'Success!', subMessage, onClose, duration = 3000 }: SuccessAnimationProps) {
  const [isVisible, setIsVisible] = useState(show)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      if (duration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false)
          onClose?.()
        }, duration)
        return () => clearTimeout(timer)
      }
    }
  }, [show, duration, onClose])

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="glass-morphism rounded-2xl p-8 border border-white/20 max-w-sm mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
                className="w-20 h-20 bg-gradient-to-br from-accent-green to-primary-teal rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-white mb-2">{message}</h3>
                {subMessage && (
                  <p className="text-gray-400">{subMessage}</p>
                )}
              </motion.div>

              {duration === 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  onClick={handleClose}
                  className="mt-6 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface ConfettiProps {
  trigger: boolean
}

export function Confetti({ trigger }: ConfettiProps) {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100 - 100,
    color: ['#7C3AED', '#3B82F6', '#14B8A6', '#10B981', '#EC4899', '#F59E0B'][Math.floor(Math.random() * 6)],
    size: Math.random() * 6 + 2,
    duration: Math.random() * 2 + 1,
  }))

  return (
    <AnimatePresence>
      {trigger && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ 
                x: `${particle.x}%`, 
                y: `${particle.y}%`,
                opacity: 1,
                scale: 0,
              }}
              animate={{
                y: '100vh',
                opacity: 0,
                scale: 1,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: particle.duration,
                ease: 'easeOut',
              }}
              className="absolute"
              style={{
                backgroundColor: particle.color,
                width: particle.size,
                height: particle.size,
                borderRadius: '50%',
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}

interface CheckmarkAnimationProps {
  show: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function CheckmarkAnimation({ show, size = 'md', className = '' }: CheckmarkAnimationProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className={`${sizeClasses[size]} bg-gradient-to-br from-accent-green to-primary-teal rounded-full flex items-center justify-center ${className}`}
        >
          <motion.svg
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-1/2 h-1/2"
          >
            <motion.path d="M20 6L9 17l-5-5" />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
