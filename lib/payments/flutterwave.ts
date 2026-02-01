const Flutterwave = require('flutterwave-node-v3');

// Check if Flutterwave credentials are available
const publicKey = process.env.FLUTTERWAVE_PUBLIC_KEY;
const secretKey = process.env.FLUTTERWAVE_SECRET_KEY;

if (!publicKey || !secretKey) {
  console.warn('Flutterwave API keys not configured. Payment features will be disabled.');
}

const flw = publicKey && secretKey ? new Flutterwave(publicKey, secretKey) : null;

export interface MobileMoneyPayment {
  amount: number; // UGX
  currency: string;
  phone_number: string;
  network: 'MTN' | 'AIRTEL';
  email: string;
  tx_ref: string;
}

// Collect money from user (Deposit UGX → Get USDC)
export async function chargeMobileMoney(data: MobileMoneyPayment) {
  if (!flw) {
    throw new Error('Flutterwave not configured. Please set FLUTTERWAVE_PUBLIC_KEY and FLUTTERWAVE_SECRET_KEY');
  }

  try {
    const payload = {
      tx_ref: data.tx_ref,
      amount: data.amount,
      currency: 'UGX',
      network: data.network === 'MTN' ? 'MTN' : 'AIRTEL',
      email: data.email,
      phone_number: data.phone_number,
      fullname: 'MiniSente User',
    };

    const response = await flw.MobileMoney.uganda(payload);
    return response;
  } catch (error) {
    console.error('Flutterwave charge error:', error);
    throw error;
  }
}

// Send money to user (Withdraw USDC → Get UGX)
export async function transferToMobileMoney(data: {
  amount: number; // UGX
  phone_number: string;
  network: 'MTN' | 'AIRTEL';
  reference: string;
}) {
  if (!flw) {
    throw new Error('Flutterwave not configured. Please set FLUTTERWAVE_PUBLIC_KEY and FLUTTERWAVE_SECRET_KEY');
  }

  try {
    const payload = {
      account_bank: data.network === 'MTN' ? 'MPS' : 'AIRTEL',
      account_number: data.phone_number,
      amount: data.amount,
      currency: 'UGX',
      narration: 'MiniSente Withdrawal',
      reference: data.reference,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhook/flutterwave`,
      debit_currency: 'UGX'
    };

    const response = await flw.Transfer.initiate(payload);
    return response;
  } catch (error) {
    console.error('Flutterwave transfer error:', error);
    throw error;
  }
}

// Verify payment status
export async function verifyTransaction(transactionId: string) {
  if (!flw) {
    throw new Error('Flutterwave not configured. Please set FLUTTERWAVE_PUBLIC_KEY and FLUTTERWAVE_SECRET_KEY');
  }

  try {
    const response = await flw.Transaction.verify({ id: transactionId });
    return response;
  } catch (error) {
    console.error('Verification error:', error);
    throw error;
  }
}
