import { parseUnits } from 'viem';

export const PAYMENT_ROUTER_ADDRESS = process.env.NEXT_PUBLIC_PAYMENT_ROUTER_ADDRESS as `0x${string}`;

export const PAYMENT_ROUTER_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "serviceType", "type": "string" },
      { "internalType": "string", "name": "recipient", "type": "string" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "string", "name": "reference", "type": "string" }
    ],
    "name": "payUtility",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "string", "name": "phoneNumber", "type": "string" },
      { "internalType": "string", "name": "reference", "type": "string" }
    ],
    "name": "requestWithdrawal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

export function encodeUtilityPayment(
  serviceType: string,
  recipient: string,
  amountUsdc: number,
  reference: string
) {
  return {
    address: PAYMENT_ROUTER_ADDRESS,
    abi: PAYMENT_ROUTER_ABI,
    functionName: 'payUtility',
    args: [
      serviceType,
      recipient,
      parseUnits(amountUsdc.toString(), 6), // USDC has 6 decimals
      reference
    ],
  };
}
