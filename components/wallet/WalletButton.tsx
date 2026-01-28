'use client'

import { Wallet, ConnectWallet, WalletDropdown, WalletDropdownDisconnect, WalletDropdownLink } from '@coinbase/onchainkit/wallet'
import { Identity, Avatar, Name, Address } from '@coinbase/onchainkit/identity'
import { useAccount } from 'wagmi'

export function WalletButton() {
  const { isConnected } = useAccount()

  return (
    <div className="wallet-button">
      <Wallet>
        {isConnected ? (
          <WalletDropdown className="wallet-dropdown">
            <Identity className="identity" hasCopyAddressOnClick>
              <Avatar className="avatar" />
              <Name />
              <Address />
            </Identity>
            <WalletDropdownLink href="/dashboard">Dashboard</WalletDropdownLink>
            <WalletDropdownLink href="/history">History</WalletDropdownLink>
            <WalletDropdownDisconnect />
          </WalletDropdown>
        ) : (
          <ConnectWallet className="connect-wallet bg-base-blue hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Connect Wallet
          </ConnectWallet>
        )}
      </Wallet>
    </div>
  )
}
