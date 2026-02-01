const AfricasTalking = require('africastalking');

// Check if Africa's Talking credentials are available
const apiKey = process.env.AFRICASTALKING_API_KEY;
const username = process.env.AFRICASTALKING_USERNAME || 'sandbox';

if (!apiKey) {
  console.warn('Africa\'s Talking API key not configured. Airtime features will be disabled.');
}

const africastalking = apiKey ? AfricasTalking({
  apiKey,
  username,
}) : null;

const airtime = africastalking?.AIRTIME;

export interface AirtimePayment {
  phoneNumber: string;
  amount: number; // UGX
  currencyCode: string;
}

export async function sendAirtime(data: AirtimePayment) {
  if (!airtime) {
    throw new Error('Africa\'s Talking not configured. Please set AFRICASTALKING_API_KEY');
  }

  try {
    const options = {
      recipients: [
        {
          phoneNumber: data.phoneNumber,
          currencyCode: data.currencyCode || 'UGX',
          amount: data.amount.toString(),
        },
      ],
    };

    const result = await airtime.send(options);
    return result;
  } catch (error) {
    console.error('Airtime send error:', error);
    throw error;
  }
}
