
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "@/components/ui/use-toast";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@clerk/clerk-react";

// Initialize Stripe with the publishable key
const stripePromise = loadStripe("pk_test_51Qy4DgDFD1rogxAAMnXB7lStl6DxRZOuz49mUGUJW0HkZp8NgSVhCDKso4FYtYmxDDMI11x8iLRETX1xrfgybEML00KronVIOf");

interface CheckoutFormProps {
  plan: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ plan, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const { user } = useUser();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !user) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    setProcessing(true);

    try {
      // Create payment intent
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke("create-payment-intent", {
        body: { plan, userId: user.id }
      });

      if (paymentError) {
        throw new Error(paymentError.message);
      }

      // Confirm card payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        paymentData.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              email: user.primaryEmailAddress?.emailAddress,
            },
          },
        }
      );

      if (stripeError) {
        throw new Error(stripeError.message);
      } else if (paymentIntent?.status === "succeeded") {
        // Payment succeeded, complete subscription
        const { data: subscriptionData, error: subscriptionError } = await supabase.functions.invoke("complete-subscription", {
          body: { paymentIntentId: paymentIntent.id, userId: user.id }
        });

        if (subscriptionError) {
          throw new Error("Payment processed but subscription setup failed");
        }

        toast({
          title: "Payment Successful",
          description: `You're now subscribed to the ${plan} plan.`,
        });
        
        onSuccess();
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast({
        title: "Payment Failed",
        description: err.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <label className="block text-sm font-medium">Card Details</label>
        <div className="p-3 border rounded-md bg-background/50">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#EF4444',
                },
              },
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Test card: 4242 4242 4242 4242 | Exp: Any future date | CVC: Any 3 digits
        </p>
      </div>
      
      <div className="flex space-x-4">
        <AnimatedButton
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </AnimatedButton>
        
        <AnimatedButton
          type="submit"
          disabled={!stripe || processing}
          className="flex-1 bg-[#FF10F0] text-white hover:bg-[#FF10F0]/80"
        >
          {processing ? 'Processing...' : `Pay ₹${plan === 'Individual' ? '59' : '499'}`}
        </AnimatedButton>
      </div>
    </form>
  );
};

interface StripePaymentFormProps {
  plan: string;
  onSuccess: () => void;
  onClose: () => void;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({ plan, onSuccess, onClose }) => {
  return (
    <div className="p-6 max-w-md w-full bg-white dark:bg-[#1A1F2C] rounded-lg shadow-xl">
      <h2 className="text-xl font-bold mb-1 purple-gradient-text">Subscribe to {plan}</h2>
      <p className="text-sm text-muted-foreground mb-6">
        You're subscribing to our {plan} plan. Enter your payment details below.
      </p>
      
      <Elements stripe={stripePromise}>
        <CheckoutForm plan={plan} onSuccess={onSuccess} onCancel={onClose} />
      </Elements>
      
      <div className="mt-6 text-center text-xs text-muted-foreground">
        <p>Your payment is processed securely through Stripe.</p>
        <p>You can cancel your subscription at any time.</p>
      </div>
    </div>
  );
};

export default StripePaymentForm;
