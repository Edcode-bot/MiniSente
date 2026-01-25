import { UGX_TO_USD_RATE } from '@/lib/config/constants'

export const convertUgxToUsdc = (ugx: string | number): number => {
  const num = typeof ugx === 'string' ? parseFloat(ugx) : ugx
  if (isNaN(num) || num <= 0) return 0
  return num / UGX_TO_USD_RATE
}

export const convertUsdcToUgx = (usdc: string | number): number => {
  const num = typeof usdc === 'string' ? parseFloat(usdc) : usdc
  if (isNaN(num) || num <= 0) return 0
  return num * UGX_TO_USD_RATE
}

export const generateReference = (prefix: string = 'MS'): string => {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `${prefix}${timestamp}${random}`.toUpperCase()
}

export const generateElectricityToken = (): string => {
  const digits = '0123456789'
  let token = ''
  for (let i = 0; i < 20; i++) {
    if (i > 0 && i % 4 === 0) token += '-'
    token += digits.charAt(Math.floor(Math.random() * digits.length))
  }
  return token
}

export const generateReceiptNumber = (): string => {
  return 'RCP' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase()
}

export const validatePhoneNumber = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length === 10 && cleaned.startsWith('0')
}

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    return '+256' + cleaned.substring(1)
  }
  return phone
}

export const validateMeterNumber = (meter: string): boolean => {
  const cleaned = meter.replace(/\D/g, '')
  return cleaned.length >= 11 && cleaned.length <= 13
}

export const calculateElectricityUnits = (amount: number): number => {
  const ratePerUnit = 800
  return Math.floor(amount / ratePerUnit)
}

export interface MockPaymentResult {
  success: boolean
  reference?: string
  token?: string
  receiptNumber?: string
  error?: string
  transactionHash?: string
}

export const mockPayment = async (
  service: string,
  details: Record<string, any>,
  amountUsdc: number
): Promise<MockPaymentResult> => {
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  const success = Math.random() > 0.1
  
  if (!success) {
    return {
      success: false,
      error: 'Payment failed. Please try again.',
    }
  }
  
  const result: MockPaymentResult = {
    success: true,
    reference: generateReference(service.substring(0, 3).toUpperCase()),
    transactionHash: '0x' + Math.random().toString(36).substring(2, 66),
  }
  
  if (service === 'electricity') {
    result.token = generateElectricityToken()
  }
  
  if (service === 'school-fees') {
    result.receiptNumber = generateReceiptNumber()
  }
  
  console.log('Mock payment processed:', {
    service,
    details,
    amountUsdc,
    result,
  })
  
  return result
}
