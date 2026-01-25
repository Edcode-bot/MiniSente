export const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as const
export const TREASURY_ADDRESS = '0x1234567890123456789012345678901234567890' as const
export const UGX_TO_USD_RATE = 3800

export const CARRIERS = {
  MTN: {
    name: 'MTN Uganda',
    color: 'yellow',
    bgColor: 'bg-yellow-500',
    hoverColor: 'hover:bg-yellow-600',
    logo: '📡',
  },
  AIRTEL: {
    name: 'Airtel Uganda',
    color: 'red',
    bgColor: 'bg-red-500',
    hoverColor: 'hover:bg-red-600',
    logo: '📱',
  },
} as const

export const SCHOOLS = [
  'Makerere University',
  'Kampala International University',
  'Nakawa Vocational Institute',
  'King\'s College Buddo',
  'St. Mary\'s College Kisubi',
  'Uganda Christian University',
] as const

export const DATA_BUNDLES = [
  { name: '500MB', price: 2000, validity: '1 day' },
  { name: '1GB', price: 4000, validity: '3 days' },
  { name: '2GB', price: 7500, validity: '7 days' },
  { name: '5GB', price: 15000, validity: '30 days' },
  { name: '10GB', price: 25000, validity: '30 days' },
] as const

export const AIRTIME_AMOUNTS = [1000, 2000, 5000, 10000, 20000, 50000] as const

export const TRANSACTION_TYPES = {
  SENT: 'sent',
  RECEIVED: 'received',
  AIRTIME: 'airtime',
  DATA: 'data',
  ELECTRICITY: 'electricity',
  SCHOOL_FEES: 'school_fees',
} as const

export const BLOCK_EXPLORER_URL = 'https://basescan.org'

export const USDC_ABI = [
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const
