
import { Stripe } from 'https://esm.sh/stripe@11.18.0'

export const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2022-11-15',
})
