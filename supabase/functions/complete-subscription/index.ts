
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'
import { stripe } from '../_shared/stripe.ts'
import { corsHeaders } from '../_shared/cors.ts'

// Create a Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { paymentIntentId, userId } = await req.json()
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    if (!paymentIntentId || !userId) {
      throw new Error('Payment intent ID and user ID are required')
    }

    // Retrieve payment intent to verify status
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    
    if (paymentIntent.status !== 'succeeded') {
      throw new Error(`Payment not successful. Status: ${paymentIntent.status}`)
    }

    // Get customer ID
    const customerId = paymentIntent.customer as string
    const plan = paymentIntent.metadata.plan

    // Create a subscription in Stripe
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: plan === 'Individual' 
            ? Deno.env.get('STRIPE_INDIVIDUAL_PRICE_ID')
            : Deno.env.get('STRIPE_FAMILY_PRICE_ID'),
        },
      ],
      metadata: {
        userId: userId,
      },
    })

    // Update the subscription in our database
    const { error: updateError } = await supabase
      .from('subscriptions')
      .update({
        stripe_subscription_id: subscription.id,
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      })
      .eq('user_id', userId)

    if (updateError) {
      console.error('Error updating subscription:', updateError)
      throw new Error('Failed to update subscription')
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        subscription: {
          id: subscription.id,
          status: subscription.status,
          current_period_end: subscription.current_period_end,
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error completing subscription:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 400 
      }
    )
  }
})
