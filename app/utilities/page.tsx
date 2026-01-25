'use client'

import { useAccount } from 'wagmi'
import { WalletConnect } from '@/components/wallet/WalletConnect'
import Link from 'next/link'
import { ArrowLeft, Smartphone, Database, Zap, GraduationCap } from 'lucide-react'

export default function UtilitiesPage() {
  const { isConnected } = useAccount()

  const services = [
    {
      name: 'Airtime',
      description: 'Buy airtime for MTN & Airtel',
      href: '/utilities/airtime',
      icon: Smartphone,
      emoji: '📱',
      color: 'from-orange-400 to-yellow-500',
      bgColor: 'bg-gradient-to-br from-orange-400 to-yellow-500',
    },
    {
      name: 'Data',
      description: 'Purchase data bundles',
      href: '/utilities/data',
      icon: Database,
      emoji: '📊',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-400 to-blue-600',
    },
    {
      name: 'Electricity',
      description: 'Pay UMEME prepaid',
      href: '/utilities/electricity',
      icon: Zap,
      emoji: '⚡',
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
    },
    {
      name: 'School Fees',
      description: 'Pay school fees',
      href: '/utilities/school-fees',
      icon: GraduationCap,
      emoji: '🎓',
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-400 to-purple-600',
    },
  ]

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <header className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Pay Bills & Services</h1>
                <p className="text-gray-600">Quick and easy payments for everyday services</p>
              </div>
            </div>
            <WalletConnect />
          </header>

          <main className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">💳</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Connect Your Wallet
              </h2>
              <p className="text-gray-600 mb-8">
                Connect your wallet to access payment services
              </p>
              <WalletConnect />
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Pay Bills & Services</h1>
              <p className="text-gray-600">Quick and easy payments for everyday services</p>
            </div>
          </div>
          <WalletConnect />
        </header>

        <main>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Link
                  key={service.name}
                  href={service.href}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 p-8 border border-gray-100 hover:border-gray-200 h-full">
                    <div className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform`}>
                      <span className="text-3xl">{service.emoji}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {service.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                      <span>Pay Now</span>
                      <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}
