

   import { NextResponse } from 'next/server'
   import Stripe from 'stripe'

   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
     apiVersion: '2022-11-15',
   })

  

   
   const formatAmountForStripe = (amount, currency) => {
    return Math.round(amount * 100)
   }
   
   
   export async function POST(req) {
     try {
    const params = {
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Pro subscription',
          },
          unit_amount: 1000, // $10.00 in cents
          recurring: {
            interval: 'month',
            interval_count: 1,
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${req.headers.get(
      'origin',
    )}result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.get(
      'origin',
    )}result?session_id={CHECKOUT_SESSION_ID}`,
  }
  
  const checkoutSession = await stripe.checkout.sessions.create(params)
  
  return NextResponse.json(checkoutSession, {
    status: 200,
  })

} catch (error) {
    console.error('Error creating checkout session:', error)
    return new NextResponse(JSON.stringify({ error: { message: error.message } }), {
      status: 500,
    })
  }
}