import { NextRequest, NextResponse } from 'next/server';
import { transferToMobileMoney } from '@/lib/payments/flutterwave';
import { supabaseAdmin } from '@/lib/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, phone, amountUsdc, network } = body;

    if (!phone || !amountUsdc || !network) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const amountUgx = parseFloat(amountUsdc) * 3800;
    const reference = `MM-WITH-${uuidv4()}`;

    // Initiate transfer
    const result = await transferToMobileMoney({
      amount: amountUgx,
      phone_number: phone,
      network: network,
      reference: reference,
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
        type: 'withdraw',
        phone_number: phone,
        network: network,
        amount_ugx: amountUgx,
        amount_usdc: parseFloat(amountUsdc),
        exchange_rate: 3800,
        provider_reference: reference,
        status: 'processing',
      })
      .select()
      .single();

    if (dbError) throw dbError;

    return NextResponse.json({
      success: true,
      message: 'Withdrawal initiated. You will receive money shortly.',
      reference: reference,
      amount_ugx: amountUgx,
    });
  } catch (error: any) {
    console.error('Withdrawal error:', error);
    return NextResponse.json(
      { error: error.message || 'Withdrawal failed' },
      { status: 500 }
    );
  }
}
