'use client'
import { useEffect, useState } from 'react'
import { getUserTransactions } from '@/lib/supabase/transactions'
import { useUser } from './useUser'

export function useTransactions() {
  const { user } = useUser()
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTransactions() {
      if (!user?.id) {
        setTransactions([])
        setLoading(false)
        return
      }

      try {
        const data = await getUserTransactions(user.id)
        setTransactions(data)
      } catch (error) {
        console.error('Error loading transactions:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTransactions()
  }, [user?.id])

  const refresh = async () => {
    if (user?.id) {
      const data = await getUserTransactions(user.id)
      setTransactions(data)
    }
  }

  return { transactions, loading, refresh }
}
