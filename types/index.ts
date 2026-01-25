// Transaction Types
export interface Transaction {
  id: string
  hash: string
  type: TransactionType
  from: string
  to: string
  amount: string
  timestamp: number
  status: TransactionStatus
  description?: string
  gasUsed?: string
  gasPrice?: string
}

export type TransactionType = 
  | 'sent'
  | 'received'
  | 'airtime'
  | 'data'
  | 'electricity'
  | 'school_fees'

export type TransactionStatus = 'pending' | 'confirmed' | 'failed'

// Utility Payment Types
export interface UtilityPayment {
  id: string
  type: UtilityType
  amount: number
  currency: 'UGX' | 'USDC'
  recipient: string
  description: string
  metadata: Record<string, any>
  status: PaymentStatus
  createdAt: number
  completedAt?: number
  transactionHash?: string
  reference?: string
}

export type UtilityType = 
  | 'airtime'
  | 'data'
  | 'electricity'
  | 'school_fees'

export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'

// User Types
export interface User {
  address: string
  ensName?: string
  avatar?: string
  joinedAt: number
  lastActiveAt: number
  preferences: UserPreferences
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  currency: 'UGX' | 'USDC'
  notifications: NotificationSettings
  privacy: PrivacySettings
}

export interface NotificationSettings {
  transactions: boolean
  payments: boolean
  priceAlerts: boolean
  marketing: boolean
}

export interface PrivacySettings {
  showBalance: boolean
  showTransactionHistory: boolean
  allowAnalytics: boolean
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Wallet Types
export interface WalletInfo {
  address: string
  chainId: number
  balance: string
  isConnected: boolean
}

export interface NetworkInfo {
  chainId: number
  name: string
  rpcUrl: string
  blockExplorerUrl: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
}

// Form Types
export interface SendFormData {
  recipient: string
  amount: string
}

export interface AirtimeFormData {
  carrier: 'MTN' | 'AIRTEL'
  phoneNumber: string
  amount: string
}

export interface DataFormData {
  carrier: 'MTN' | 'AIRTEL'
  phoneNumber: string
  bundle: {
    name: string
    price: number
    validity: string
  }
}

export interface ElectricityFormData {
  meterNumber: string
  customerName: string
  amount: string
}

export interface SchoolFeesFormData {
  school: string
  studentName: string
  studentId: string
  semester: string
  amount: string
  referenceNumber: string
}

// Component Props Types
export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'bordered' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

// Error Types
export interface AppError {
  code: string
  message: string
  details?: any
  timestamp: number
}

export interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: any
}

// Chart Types (for future analytics)
export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string[]
    borderColor?: string[]
  }[]
}

export interface TransactionStats {
  totalTransactions: number
  sentCount: number
  receivedCount: number
  utilityCount: number
  totalSent: number
  totalReceived: number
  averageTransaction: number
}

// Search and Filter Types
export interface TransactionFilters {
  type?: TransactionType
  status?: TransactionStatus
  dateRange?: {
    start: number
    end: number
  }
  amountRange?: {
    min: number
    max: number
  }
  searchTerm?: string
}

export interface SortOptions {
  field: 'timestamp' | 'amount' | 'status'
  direction: 'asc' | 'desc'
}

// Notification Types
export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: number
  read: boolean
  action?: {
    label: string
    href: string
  }
}

// Export all types for easy importing
export type {
  // Re-export commonly used types
  Transaction as ITransaction,
  UtilityPayment as IUtilityPayment,
  User as IUser,
  WalletInfo as IWalletInfo,
  ApiResponse as IApiResponse,
  ModalProps as IModalProps,
  CardProps as ICardProps,
}
