import React from 'react';

import { injectStripe, CardElement } from 'react-stripe-elements';

//CheckoutForm renders the input field and a button and injects
//this.props.stripe.createToken  via props
//The token with the encrypted credit card info is sent to my backend
// So I can send it to stripe

// const dev = process.env.REACT_APP_DEV === "true" ? true : false;
// let URL;
// dev
//   ? (URL = "http://127.0.0.1:8000/api/")
//   : (URL = "https://flightloggercs10.herokuapp.com/api/");

let URL = process.env.REACT_APP_URL;

class CheckoutForm extends React.Component {
  state = {
    resp_message: '',
    card_errors: '',
    amount: '',
    message: 'test'
  };
  handleCardErrors = (card_dets) => {
    console.log('Card Section dets', card_dets);
    if (card_dets.error) {
      this.setState({ card_errors: card_dets.error.message });
    } else {
      this.setState({ card_errors: '' });
    }
  };

  handleChange = (event) => {
    this.setState({
      amount: event.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.amount === '') {
      alert('Please make selection');
      return;
    }
    this.setState({ card_errors: '', resp_message: '' });
    /*
    Within the context of Elements, this call to createToken knows which
    Element to tokenize, since there's only one in this group.
    */
    return (
      this.props.stripe
        // Name needs to be dynamic as well depending on user
        .createToken({ type: 'card', name: 'Derrick Mei' })
        .then((result) => {
          if (result.error) {
            console.log('THERE IS AN ERROR IN YOUR FORM', result.error);
            return this.setState({ card_errors: result.error.message });
          } else {
            console.log(
              'Received Stripe token ---> SENDING TO SERVER: ',
              result.token
            );
            let formData = new FormData();
            formData.append('description', this.state.description);
            formData.append('currency', 'usd');
            formData.append('amount', this.state.amount);
            formData.append('source', result.token.id);
            // need to create endpoint on django
            return fetch(`${URL}create-charge/`, {
              method: 'POST',
              headers: {
                accept: 'application/json'
              },
              body: formData
            })
              .then((resp) => resp.json())
              .then((json) => this.setState({ resp_message: json.message }));
          }
        })
    );
  };

  render() {
    console.log('state message: ', this.state.message);
    return (
      <div className="CheckoutForm">
        {this.state.resp_message && (
          <h1>
            {this.state.resp_message} <br /> Thank you for purchasing our{' '}
            {this.state.amount === '99' ? (
              <div>Monthly Subscription</div>
            ) : (
              <div>Annual Subscription</div>
            )}
          </h1>
        )}
        <form onSubmit={this.handleSubmit}>
          <label>
            <h2 className="Card-Details">Card Details</h2>
            <CardElement onChange={this.handleCardErrors} />
            <div role="alert">
              <h2>{this.state.card_errors}</h2>
            </div>
          </label>

          <div className="radio" onClick={this.handleMonthly}>
            <label>
              <input
                type="radio" className="radio-selection"
                value="99"
                checked={this.state.amount === '99'}
                onChange={this.handleChange}
              />
              1-Month: $.99
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio" className="radio-selection"
                value="1999"
                checked={this.state.amount === '1999'}
                onChange={this.handleChange}
              />
              1-Year: $19.99
            </label>
          </div>

          <button className="form-btn">Confirm order</button>
        </form>
      </div>
    );
  }
}

//The injectStripe HOC provides the this.props.stripe property
//You can call this.props.stripe.createToken within a component that has been
// injected in order to submit payment data to Stripe.
export default injectStripe(CheckoutForm);
