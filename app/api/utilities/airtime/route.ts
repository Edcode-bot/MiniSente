import { NextRequest, NextResponse } from 'next/server';
import { sendAirtime } from '@/lib/payments/africastalking';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { userId, phone, amount, carrier } = await request.json();

    if (!userId || !phone || !amount || !carrier) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate amount
    if (amount < 1000 || amount > 500000) {
      return NextResponse.json(
        { error: 'Amount must be between UGX 1,000 and 500,000' },
        { status: 400 }
      );
    }

    // Validate phone number (Uganda format)
    const phoneRegex = /^(256|0)[7][0-9]{8}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Save transaction to database
    const supabase = createClient();
    const { data: transaction, error: dbError } = await supabase
      .from('utility_transactions')
      .insert({
        user_id: userId,
        service_type: 'airtime',
        provider: carrier,
        recipient: phone,
        amount,
        currency: 'UGX',
        status: 'pending',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbError || !transaction) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save transaction' },
        { status: 500 }
      );
    }

    try {
      // Send airtime via Africa's Talking
      const result = await sendAirtime({
        phoneNumber: phone,
        amount,
        currencyCode: 'UGX',
      });

      // Update transaction status
      await supabase
        .from('utility_transactions')
        .update({ 
          status: 'completed',
          provider_reference: result.data?.transactionId || 'success',
          completed_at: new Date().toISOString()
        })
        .eq('id', transaction.id);

      return NextResponse.json({
        success: true,
        transactionId: transaction.id,
        message: 'Airtime sent successfully',
        providerResponse: result
      });

    } catch (airtimeError) {
      console.error('Airtime API error:', airtimeError);
      
      // Update transaction status to failed
      await supabase
        .from('utility_transactions')
        .update({ 
          status: 'failed',
          error_message: airtimeError instanceof Error ? airtimeError.message : 'Airtime delivery failed'
        })
        .eq('id', transaction.id);

      return NextResponse.json(
        { error: 'Failed to send airtime' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Airtime purchase error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
