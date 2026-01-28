'use client'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { createOrUpdateUser, getUserByAddress } from '@/lib/supabase/users'

export function useUser() {
  const { address, isConnected } = useAccount()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      if (!address) {
        setUser(null)
        setLoading(false)
        return
      }

      try {
        let userData = await getUserByAddress(address)
        if (!userData) {
          userData = await createOrUpdateUser(address)
        }
        setUser(userData)
      } catch (error) {
        console.error('Error loading user:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [address, isConnected])

  return { user, loading }
}
