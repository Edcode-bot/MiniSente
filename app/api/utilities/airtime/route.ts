import { NextRequest, NextResponse } from 'next/server';
import { sendAirtime } from '@/lib/payments/africastalking';
import { supabaseAdmin } from '@/lib/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, transactionId, phone, amount, carrier } = body;

    if (!phone || !amount || !carrier) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = supabaseAdmin;
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    const reference = `AIR-${uuidv4()}`;
    const amountUsdc = parseFloat(amount) / 3800;

    // Send airtime via Africa's Talking
    const result = await sendAirtime({
      phoneNumber: phone,
      amount: parseFloat(amount),
      currencyCode: 'UGX',
    });

    // Save to database
    const { data: payment, error: dbError } = await supabase
      .from('utility_payments')
      .insert({
        transaction_id: transactionId,
        user_id: userId,
        service_provider: carrier,
        service_type: 'airtime',
        recipient_number: phone,
        amount_ugx: parseFloat(amount),
        amount_usdc: amountUsdc,
        reference_number: reference,
        status: result.responses[0]?.status === 'Sent' ? 'completed' : 'failed',
        completed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbError) throw dbError;

    return NextResponse.json({
      success: true,
      message: 'Airtime sent successfully!',
      reference: reference,
      details: result,
    });
  } catch (error: any) {
    console.error('Airtime purchase error:', error);
    return NextResponse.json(
      { error: error.message || 'Airtime purchase failed' },
      { status: 500 }
    );
  }
}
