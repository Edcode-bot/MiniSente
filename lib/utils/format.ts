export const formatAddress = (address: string): string => {
  if (!address || address.length < 10) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export const formatUSDC = (amount: string | number): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  if (isNaN(num)) return '0.00'
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + ' USDC'
}

export const formatUGX = (amount: string | number): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  if (isNaN(num)) return 'UGX 0'
  return 'UGX ' + num.toLocaleString('en-UG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

export const usdcToUgx = (usdc: string | number): number => {
  const num = typeof usdc === 'string' ? parseFloat(usdc) : usdc
  if (isNaN(num)) return 0
  return num * 3800
}

export const ugxToUsdc = (ugx: string | number): number => {
  const num = typeof ugx === 'string' ? parseFloat(ugx) : ugx
  if (isNaN(num)) return 0
  return num / 3800
}

export const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleString()
}

export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

export const truncateMiddle = (str: string, startLength: number = 6, endLength: number = 4): string => {
  if (!str || str.length <= startLength + endLength) return str
  return `${str.slice(0, startLength)}...${str.slice(-endLength)}`
}
