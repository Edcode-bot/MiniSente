'use client'
import { 
  Transaction, 
  TransactionButton,
  TransactionSponsor,
  TransactionStatus,
  TransactionStatusLabel,
  TransactionStatusAction,
} from '@coinbase/onchainkit/transaction';
import { useState } from 'react';
import { parseUnits, encodeFunctionData, parseAbi } from 'viem';
import { 
  Wallet, 
  WalletDropdown, 
  WalletDropdownLink, 
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet'
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function SendPage() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

  const calls = recipient && amount ? [{
    to: USDC_ADDRESS as `0x${string}`,
    data: encodeFunctionData({
      abi: parseAbi(['function transfer(address to, uint256 amount)']),
      functionName: 'transfer',
      args: [recipient as `0x${string}`, parseUnits(amount, 6)],
    }),
  }] : [];

  return (
    <div className="min-h-screen bg-bg-darker text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">Send USDC</h1>
              <p className="text-gray-400">Transfer USDC to any address</p>
            </div>
          </div>
          <Wallet>
            <WalletDropdown>
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address />
                <EthBalance />
              </Identity>
              <WalletDropdownLink icon="wallet" href="https://keys.coinbase.com">
                Wallet
              </WalletDropdownLink>
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
        </header>

        <main className="max-w-2xl mx-auto">
          <div className="glass-morphism rounded-2xl p-8 border border-white/20">
            <div className="space-y-6">
              <div className="mb-4">
                <label className="block mb-2 text-gray-400">Recipient Address</label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-4 py-3 bg-gray-900 rounded-lg text-white placeholder-gray-500"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-gray-400">Amount (USDC)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3 bg-gray-900 rounded-lg text-white placeholder-gray-500"
                />
              </div>

              <Transaction
                chainId={8453}
                calls={calls}
              >
                <TransactionButton className="w-full py-3 bg-gradient-to-r from-base-blue to-base-green rounded-xl font-bold text-white" />
                <TransactionStatus>
                  <TransactionStatusLabel />
                  <TransactionStatusAction />
                </TransactionStatus>
              </Transaction>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
