import { NextRequest, NextResponse } from 'next/server';
import { verifyTransaction } from '@/lib/payments/flutterwave';
import { supabaseAdmin } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { txRef, status, transaction_id } = body;

    // Verify with Flutterwave
    const verification = await verifyTransaction(transaction_id);

    const supabase = supabaseAdmin;
    if (!supabase) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }

    if (verification.status === 'successful') {
      // Update database
      await supabase
        .from('mobile_money_transactions')
        .update({ status: 'completed', completed_at: new Date().toISOString() })
        .eq('provider_reference', txRef);

      // TODO: Credit user's wallet with USDC if deposit
      // This requires smart contract interaction
    } else {
      await supabase
        .from('mobile_money_transactions')
        .update({ status: 'failed', error_message: 'Payment verification failed' })
        .eq('provider_reference', txRef);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
