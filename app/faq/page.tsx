'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ChevronDown, HelpCircle, MessageCircle, Mail } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  {
    question: "What is MiniSente?",
    answer: "MiniSente is a digital wallet application that allows you to send, receive, and spend USDC (a stablecoin) on the Base blockchain. It's designed specifically for Africans to make everyday payments like airtime, data bundles, electricity bills, and school fees.",
    category: "General"
  },
  {
    question: "What is USDC?",
    answer: "USDC is a fully collateralized US dollar stablecoin. 1 USDC always equals 1 US dollar. It's designed to maintain a stable value, making it perfect for everyday transactions without the volatility of other cryptocurrencies.",
    category: "General"
  },
  {
    question: "What is Base?",
    answer: "Base is a secure, low-cost, and developer-friendly Ethereum Layer 2 network built by Coinbase. It offers fast transactions (2-second block times) and very low fees, making it ideal for everyday payments.",
    category: "Technology"
  },
  {
    question: "How do I get started with MiniSente?",
    answer: "Getting started is easy: 1) Download a compatible wallet like MetaMask or Coinbase Wallet, 2) Connect your wallet to MiniSente, 3) Add USDC to your wallet, and 4) Start sending, receiving, or paying for utilities.",
    category: "Getting Started"
  },
  {
    question: "Where can I get USDC?",
    answer: "You can get USDC from: 1) Cryptocurrency exchanges (Binance, Coinbase, etc.), 2) Peer-to-peer platforms, 3) On-ramp services that accept mobile money, or 4) Receive it from someone who already has USDC.",
    category: "Getting Started"
  },
  {
    question: "What utilities can I pay for?",
    answer: "Currently, you can pay for: 1) MTN and Airtel airtime, 2) Data bundles for both carriers, 3) UMEME electricity tokens, and 4) School fees to participating institutions. We're constantly adding more utility providers.",
    category: "Utilities"
  },
  {
    question: "How do utility payments work?",
    answer: "When you pay for utilities, you send USDC to our treasury address. We then process the payment with the utility provider and credit your account or deliver the service (airtime, data, electricity token, etc.).",
    category: "Utilities"
  },
  {
    question: "Are my transactions private?",
    answer: "Transactions on Base are public and can be viewed on block explorers, but your identity is protected by your wallet address. We don't store personal information beyond what's necessary for utility payments.",
    category: "Security"
  },
  {
    question: "Is MiniSente safe to use?",
    answer: "Yes, MiniSente is built on secure blockchain technology. We use industry-standard security practices, non-custodial wallets (you control your funds), and regular security audits. However, always keep your private keys safe and never share them.",
    category: "Security"
  },
  {
    question: "What happens if I lose access to my wallet?",
    answer: "If you lose access to your wallet, you may lose access to your funds. Always keep your private key or recovery phrase safe and secure. We recommend writing it down and storing it in multiple secure locations.",
    category: "Security"
  },
  {
    question: "What are the fees?",
    answer: "Transaction fees on Base are very low (typically less than $0.01). Utility payments may have small service fees depending on the provider. We always show you the total cost before you confirm any transaction.",
    category: "Fees"
  },
  {
    question: "How fast are transactions?",
    answer: "Transactions on Base are confirmed in about 2 seconds. Utility payments are usually processed within 1-5 minutes after confirmation, depending on the provider.",
    category: "Fees"
  },
  {
    question: "Can I use MiniSente outside Uganda?",
    answer: "MiniSente is primarily designed for the Ugandan market, but you can use it from anywhere in the world. However, utility payments are currently limited to participating providers in Uganda.",
    category: "General"
  },
  {
    question: "What if a transaction fails?",
    answer: "If a transaction fails, the funds remain in your wallet. Network fees are only charged for successful transactions. You can try again or contact support if you continue to experience issues.",
    category: "Troubleshooting"
  },
  {
    question: "How do I contact support?",
    answer: "You can reach our support team through: 1) Email: support@minisente.com, 2) Twitter: @minisente, 3) Discord community, or 4) In-app support chat. We typically respond within 24 hours.",
    category: "Support"
  }
]

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['All', ...Array.from(new Set(faqData.map(item => item.category)))]

  const filteredFAQ = faqData.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedItems(newExpanded)
  }

  return (
    <div className="min-h-screen bg-bg-darker text-white">
      {/* Navigation */}
      <nav className="sticky top-0 backdrop-blur-lg bg-white/5 border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link 
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-primary-violet via-primary-blue to-primary-teal rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-400">
            Everything you need to know about MiniSente
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
            />
            <HelpCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-primary-blue to-primary-teal text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {filteredFAQ.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="glass-morphism rounded-xl border border-white/20 overflow-hidden"
            >
              <button
                onClick={() => toggleExpanded(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex-1 pr-4">
                  <h3 className="text-lg font-medium text-white mb-1">{item.question}</h3>
                  <span className="text-xs text-gray-400">{item.category}</span>
                </div>
                <motion.div
                  animate={{ rotate: expandedItems.has(index) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {expandedItems.has(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredFAQ.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">No questions found</h3>
            <p className="text-gray-400">Try adjusting your search or category filter</p>
          </motion.div>
        )}

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="glass-morphism rounded-xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Still have questions?</h2>
            <p className="text-gray-400 mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="mailto:support@minisente.com"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-blue to-primary-teal text-white rounded-lg hover:scale-105 transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
                Email Support
              </a>
              <a
                href="https://twitter.com/minisente"
                className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Twitter
              </a>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
