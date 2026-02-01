import { NextRequest, NextResponse } from 'next/server';
import { chargeMobileMoney } from '@/lib/payments/flutterwave';
import { supabaseAdmin } from '@/lib/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, phone, amount, network, email } = body;

    // Validate input
    if (!phone || !amount || !network) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const txRef = `MM-DEP-${uuidv4()}`;

    // Initiate Flutterwave charge
    const result = await chargeMobileMoney({
      amount: parseFloat(amount),
      currency: 'UGX',
      phone_number: phone,
      network: network,
      email: email || 'user@minisente.com',
      tx_ref: txRef,
    });

    // Save to database
    const supabase = supabaseAdmin;
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    const { data: mmTx, error: dbError } = await supabase
      .from('mobile_money_transactions')
      .insert({
        user_id: userId,
        type: 'deposit',
        phone_number: phone,
        network: network,
        amount_ugx: parseFloat(amount),
        amount_usdc: parseFloat(amount) / 3800, // Convert to USDC
        exchange_rate: 3800,
        provider_reference: txRef,
        status: 'pending',
      })
      .select()
      .single();

    if (dbError) throw dbError;

    return NextResponse.json({
      success: true,
      message: 'Please complete payment on your phone',
      reference: txRef,
      data: result,
    });
  } catch (error: any) {
    console.error('Deposit error:', error);
    return NextResponse.json(
      { error: error.message || 'Deposit failed' },
      { status: 500 }
    );
  }
}
