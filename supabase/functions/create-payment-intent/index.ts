
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'
import { stripe } from '../_shared/stripe.ts'
import { corsHeaders } from '../_shared/cors.ts'

// Create a Supabase client with the auth context of the logged in user
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { plan, userId } = await req.json()
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    if (!plan) {
      throw new Error('Plan is required')
    }

    // Determine price based on the selected plan
    const priceId = plan === 'Individual' 
      ? Deno.env.get('STRIPE_INDIVIDUAL_PRICE_ID')
      : Deno.env.get('STRIPE_FAMILY_PRICE_ID')

    if (!priceId) {
      throw new Error('Price ID not configured')
    }

    // Check if user already has a customer ID
    let customerId
    const { data: subscription, error: subscriptionError } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', userId)
      .maybeSingle()

    if (subscriptionError) {
      console.error('Error checking existing customer:', subscriptionError)
    }

    if (subscription?.stripe_customer_id) {
      customerId = subscription.stripe_customer_id
      console.log('Using existing Stripe customer:', customerId)
    } else {
      // Create a new customer
      const customer = await stripe.customers.create({
        metadata: {
          userId: userId,
        },
      })
      customerId = customer.id
      console.log('Created new Stripe customer:', customerId)
    }

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: plan === 'Individual' ? 5900 : 49900, // Amount in smallest currency unit (59.00 or 499.00)
      currency: 'inr',
      customer: customerId,
      payment_method_types: ['card'],
      metadata: {
        userId: userId,
        plan: plan,
      },
    })

    // Save customer ID if it's new
    if (!subscription?.stripe_customer_id) {
      const { error: insertError } = await supabase
        .from('subscriptions')
        .insert({
          user_id: userId,
          stripe_customer_id: customerId,
          plan_type: plan,
          status: 'incomplete',
        })

      if (insertError) {
        console.error('Error saving customer ID:', insertError)
      }
    }

    return new Response(
      JSON.stringify({ 
        clientSecret: paymentIntent.client_secret,
        customerId: customerId,
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 400 
      }
    )
  }
})
