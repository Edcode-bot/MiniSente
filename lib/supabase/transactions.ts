import { supabase } from './client'

export async function saveTransaction(data: {
  userId: string
  txHash: string
  type: 'send' | 'receive' | 'utility' | 'swap'
  amount: number
  currency?: string
  fromAddress?: string
  toAddress?: string
  serviceType?: string
  metadata?: any
}) {
  if (!supabase) {
    console.warn('Supabase not configured')
    return null
  }

  const { data: transaction, error } = await supabase
    .from('transactions')
    .insert({
      user_id: data.userId,
      tx_hash: data.txHash,
      type: data.type,
      amount: data.amount,
      currency: data.currency || 'USDC',
      from_address: data.fromAddress,
      to_address: data.toAddress,
      service_type: data.serviceType,
      metadata: data.metadata,
      status: 'pending'
    })
    .select()
    .single()

  if (error) throw error
  return transaction
}

export async function updateTransactionStatus(
  txHash: string,
  status: 'confirmed' | 'failed',
  errorMessage?: string
) {
  if (!supabase) {
    console.warn('Supabase not configured')
    return null
  }

  const { data, error } = await supabase
    .from('transactions')
    .update({
      status,
      error_message: errorMessage,
      updated_at: new Date().toISOString()
    })
    .eq('tx_hash', txHash)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUserTransactions(userId: string, limit = 50) {
  if (!supabase) {
    console.warn('Supabase not configured')
    return []
  }

  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

export async function getTransactionByHash(txHash: string) {
  if (!supabase) {
    console.warn('Supabase not configured')
    return null
  }

  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('tx_hash', txHash)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}
