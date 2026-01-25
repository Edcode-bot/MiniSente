# MiniSente - Digital Money on Base

MiniSente is a modern digital wallet application built on the Base blockchain, designed specifically for the Ugandan market. It enables users to send, receive, and spend USDC for everyday utilities like airtime, data bundles, electricity, and school fees.

## 🚀 Features

### Core Wallet Functionality
- **Send & Receive USDC** - Transfer digital money instantly on Base
- **Transaction History** - Complete transaction tracking and management
- **QR Code Support** - Generate and scan QR codes for easy payments
- **Multi-wallet Support** - Connect with MetaMask, Coinbase Wallet, and more

### Utility Payments
- **Airtime** - Buy airtime for MTN and Airtel Uganda
- **Data Bundles** - Purchase mobile data packages
- **Electricity** - Pay UMEME prepaid electricity bills
- **School Fees** - Pay tuition fees to educational institutions

### User Experience
- **Modern UI** - Clean, intuitive interface with Tailwind CSS
- **Mobile Responsive** - Works seamlessly on all devices
- **Real-time Updates** - Live balance and transaction updates
- **Error Handling** - Comprehensive error boundaries and user feedback

## 🛠 Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Blockchain**: Base Mainnet, Wagmi, Viem
- **State Management**: React Query (TanStack Query)
- **Notifications**: Sonner
- **Icons**: Lucide React
- **QR Codes**: qrcode library

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- A Web3 wallet (MetaMask, Coinbase Wallet, etc.)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Edcode-bot/MiniSente.git
cd MiniSente
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Copy the environment template:

```bash
cp .env.example .env.local
```

Update `.env.local` with your configuration:

```env
# Base Chain Configuration
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key_here
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here

# Environment
NODE_ENV=development

# Base Network RPC (Optional)
BASE_RPC_URL=https://mainnet.base.org
```

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Usage

### Connecting Your Wallet
1. Click "Connect Wallet" in the navigation bar
2. Choose your preferred wallet provider
3. Approve the connection request
4. You're ready to use MiniSente!

### Sending USDC
1. Navigate to the "Send" page
2. Enter the recipient's wallet address
3. Specify the amount in USDC
4. Review and confirm the transaction

### Paying Utilities
1. Go to "Utilities" and select your desired service
2. Fill in the required information (phone number, meter number, etc.)
3. Choose the amount/service package
4. Confirm the payment

### Viewing History
1. Visit the "History" page
2. Use filters to find specific transactions
3. Export your transaction history as CSV

## 🏗 Project Structure

```
minisente/
├── app/                    # Next.js app directory
│   ├── send/              # Send USDC page
│   ├── receive/           # Receive USDC page
│   ├── utilities/         # Utility payments
│   ├── history/           # Transaction history
│   ├── error.tsx          # Error boundary
│   ├── loading.tsx        # Loading state
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── ui/               # Reusable UI components
│   ├── wallet/           # Wallet-related components
│   ├── send/             # Send functionality
│   ├── receive/          # Receive functionality
│   ├── transactions/     # Transaction components
│   └── utilities/        # Utility payment components
├── lib/                   # Utility libraries
│   ├── config/           # Configuration files
│   ├── hooks/            # Custom React hooks
│   └── utils/            # Utility functions
├── types/                 # TypeScript type definitions
└── public/               # Static assets
```

## 🔧 Development Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Type check
npm run type-check
```

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_ONCHAINKIT_API_KEY` | OnchainKit API key for Base integration | Yes |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect project ID | Yes |
| `BASE_RPC_URL` | Custom Base RPC URL | No |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | Enable analytics tracking | No |
| `NEXT_PUBLIC_DEBUG` | Enable debug mode | No |

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Configure environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs on [GitHub Issues](https://github.com/Edcode-bot/MiniSente/issues)
- **Discussions**: Join our [GitHub Discussions](https://github.com/Edcode-bot/MiniSente/discussions)

## 🙏 Acknowledgments

- [Base](https://base.org/) - The blockchain platform
- [OnchainKit](https://onchainkit.coinbase.com/) - Coinbase's Web3 toolkit
- [Wagmi](https://wagmi.sh/) - React hooks for Ethereum
- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 📊 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-currency support
- [ ] Peer-to-peer payments
- [ ] Merchant integration
- [ ] Savings and investment features

---

**MiniSente** - Making digital money accessible for everyone in Uganda 🇺🇬
