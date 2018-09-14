import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    // User clicked submit
  }

  render() {
    return (
      <div className="checkout">
        <h1>Billing</h1>
        <CardElement />
        <button onClick={this.submit}>Buy Now</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);