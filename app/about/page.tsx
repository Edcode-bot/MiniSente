'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Shield, Zap, Users, Globe, Award, Mail, Twitter, Github } from 'lucide-react'

export default function AboutPage() {
  const team = [
    {
      name: 'MiniSente Team',
      role: 'Digital Money Innovators',
      avatar: '🚀',
      description: 'Building the future of digital payments in Africa',
    },
  ]

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'Built on Base blockchain with enterprise-grade security',
      color: 'from-primary-blue to-primary-teal',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Instant transactions with 2-second confirmation times',
      color: 'from-accent-orange to-accent-pink',
    },
    {
      icon: Users,
      title: 'User Focused',
      description: 'Designed for everyday Africans with simple, intuitive interface',
      color: 'from-accent-green to-primary-teal',
    },
    {
      icon: Globe,
      title: 'Global Standards',
      description: 'Built on open protocols and interoperable with the world',
      color: 'from-primary-violet to-primary-blue',
    },
  ]

  const stats = [
    { label: 'Transactions', value: '0', suffix: '+' },
    { label: 'Active Users', value: '0', suffix: '+' },
    { label: 'Countries', value: '1', suffix: '' },
    { label: 'Utilities', value: '4', suffix: '+' },
  ]

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            About MiniSente
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Empowering Africans with digital money solutions built on blockchain technology. 
            Simple, secure, and accessible financial services for everyone.
          </p>
        </motion.section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold gradient-text mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Mission */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="glass-morphism rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-300 mb-4">
                  MiniSente is on a mission to democratize access to digital financial services across Africa. 
                  We believe that everyone deserves access to modern, efficient, and affordable financial tools 
                  regardless of their location or economic status.
                </p>
                <p className="text-gray-300">
                  By leveraging blockchain technology and stablecoins like USDC, we're creating a financial 
                  ecosystem that's transparent, secure, and accessible to all Africans.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent-green rounded-full"></div>
                  <span className="text-gray-300">Lower transaction fees</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent-green rounded-full"></div>
                  <span className="text-gray-300">Instant settlement</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent-green rounded-full"></div>
                  <span className="text-gray-300">No bank account required</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent-green rounded-full"></div>
                  <span className="text-gray-300">24/7 availability</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="glass-morphism rounded-xl p-6 border border-white/20 card-hover"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${value.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-400">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Technology */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="glass-morphism rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6">Built on Modern Technology</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Blockchain Infrastructure</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Base Network for low fees and fast transactions</li>
                  <li>• USDC stablecoin for price stability</li>
                  <li>• Ethereum-compatible smart contracts</li>
                  <li>• Decentralized and censorship-resistant</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Security & Privacy</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Bank-grade encryption</li>
                  <li>• Non-custodial wallet control</li>
                  <li>• Transparent on-chain transactions</li>
                  <li>• Regular security audits</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Team */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-primary-violet via-primary-blue to-primary-teal rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                  {member.avatar}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-gray-400 mb-2">{member.role}</p>
                <p className="text-sm text-gray-500">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
          <p className="text-gray-400 mb-8">Have questions or feedback? We'd love to hear from you.</p>
          
          <div className="flex justify-center gap-4 mb-8">
            <a
              href="mailto:support@minisente.com"
              className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Mail className="w-5 h-5 text-white" />
            </a>
            <a
              href="https://twitter.com/minisente"
              className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Twitter className="w-5 h-5 text-white" />
            </a>
            <a
              href="https://github.com/minisente"
              className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Github className="w-5 h-5 text-white" />
            </a>
          </div>

          <Link
            href="/faq"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-blue to-primary-teal text-white rounded-lg hover:scale-105 transition-all duration-200"
          >
            View FAQ
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </motion.section>
      </main>
    </div>
  )
}
