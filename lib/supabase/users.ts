import { supabase } from './client'

export async function createOrUpdateUser(walletAddress: string, data?: {
  farcasterFid?: number
  phoneNumber?: string
  email?: string
}) {
  if (!supabase) {
    console.warn('Supabase not configured')
    return null
  }

  const { data: user, error } = await supabase
    .from('users')
    .upsert({
      wallet_address: walletAddress,
      farcaster_fid: data?.farcasterFid,
      phone_number: data?.phoneNumber,
      email: data?.email,
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return user
}

export async function getUserByAddress(walletAddress: string) {
  if (!supabase) {
    console.warn('Supabase not configured')
    return null
  }

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('wallet_address', walletAddress)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

export async function updateUserStats(walletAddress: string, stats: {
  totalSent?: number
  totalReceived?: number
}) {
  if (!supabase) {
    console.warn('Supabase not configured')
    return null
  }

  const { data, error } = await supabase
    .from('users')
    .update({
      total_sent: stats.totalSent,
      total_received: stats.totalReceived,
      updated_at: new Date().toISOString()
    })
    .eq('wallet_address', walletAddress)
    .select()
    .single()

  if (error) throw error
  return data
}
