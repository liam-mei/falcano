import React from 'react';
import CheckoutForm from './CheckoutForm';

// Stripe Stuff
import { Elements, StripeProvider } from 'react-stripe-elements';

const BillingForm = () => {
  return (
    <StripeProvider apiKey="pk_test_tYvByOjo3u4ZLzcoJYTe4NHT">
      <div className="Billing-Card">
        <Elements>
          <CheckoutForm/>
        </Elements>
      </div>
    </StripeProvider>
  );
};

export default BillingForm;


// import React, { Component } from 'react';

// import { StripeProvider } from 'react-stripe-elements';


// import { Elements } from 'react-stripe-elements';
// import CheckoutForm from './CheckoutForm';

// //StripeProvider gives us access to the Stripe Object
// //i.e Stripe.createToken, stripe.elements() etc
// //App loads the stripe script asynchronously in CDM

// class BillingForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { stripe: '' };
//   }
//   componentDidMount() {
//     if (window.Stripe) {
//       this.setState({
//         stripe: window.Stripe(process.env.REACT_APP_publishable)
//       });
//     } else {
//       document.querySelector('#stripe-js').addEventListener('load', () => {
//         //Create Stripe instance once Stripe.js loads
//         this.setState({
//           stripe: window.Stripe(process.env.REACT_APP_publishable)
//         });
//       });
//     }
//   }

//   render() {
//     return (
//       this.state.stripe && (
//         <StripeProvider stripe={this.state.stripe}>
//           {/* <BillingForm /> */}
//           <Elements>
//             <CheckoutForm />
//           </Elements>
//         </StripeProvider>
//       )
//     );
//   }
// }

// export default BillingForm;
