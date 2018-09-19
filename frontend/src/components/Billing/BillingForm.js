import React from 'react';
import CheckoutForm from './CheckoutForm';
import { Elements } from 'react-stripe-elements';

const BillingForm = () => {
  return (
    <div>
      <Elements>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default BillingForm;
