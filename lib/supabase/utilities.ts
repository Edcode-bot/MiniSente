import { supabase } from './client'

export async function saveUtilityPayment(data: {
  transactionId: string
  userId: string
  serviceProvider: string
  serviceType: 'airtime' | 'data' | 'electricity' | 'school_fees'
  recipientNumber?: string
  recipientName?: string
  amountUgx: number
  amountUsdc: number
  referenceNumber: string
}) {
  if (!supabase) {
    console.warn('Supabase not configured')
    return null
  }

  const { data: payment, error } = await supabase
    .from('utility_payments')
    .insert(data)
    .select()
    .single()

  if (error) throw error
  return payment
}

export async function updateUtilityPaymentStatus(
  referenceNumber: string,
  status: 'completed' | 'failed',
  token?: string,
  errorMessage?: string
) {
  if (!supabase) {
    console.warn('Supabase not configured')
    return null
  }

  const { data, error } = await supabase
    .from('utility_payments')
    .update({
      status,
      token,
      error_message: errorMessage,
      completed_at: status === 'completed' ? new Date().toISOString() : null
    })
    .eq('reference_number', referenceNumber)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUserUtilityPayments(userId: string, limit = 20) {
  if (!supabase) {
    console.warn('Supabase not configured')
    return []
  }

  const { data, error } = await supabase
    .from('utility_payments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

export async function getUtilityPaymentByReference(referenceNumber: string) {
  if (!supabase) {
    console.warn('Supabase not configured')
    return null
  }

  const { data, error } = await supabase
    .from('utility_payments')
    .select('*')
    .eq('reference_number', referenceNumber)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}
