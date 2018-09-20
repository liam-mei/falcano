import React from 'react';
import CheckoutForm from './CheckoutForm';

// Stripe Stuff
import { Elements, StripeProvider } from 'react-stripe-elements';

const BillingForm = () => {
  return (
    <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
      <div>
        <Elements>
          <CheckoutForm />
        </Elements>
      </div>
    </StripeProvider>
  );
};

export default BillingForm;
