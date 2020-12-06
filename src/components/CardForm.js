
import React from 'react';
import axios from 'axios';
import { CardElement, ElementsConsumer } from "@stripe/react-stripe-js";


class CardForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      succeeded: '',
      error: '',
      processing: '',
      disabled: false,
      clientSecret: ''
    }
    this.cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a"
        }
      }
    };
  }


  handleChange = async (event) => {
    this.setState({
      disabled: event.empty,
      error: event.error ? event.error.message : ""
    });
  };

  handleSubmit = async (ev) => {

    const {elements, stripe} = this.props;

    ev.preventDefault();

    this.setState({processing: true});

    const payload = await stripe.confirmCardPayment(this.state.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    console.log('here is the payload: ', payload);
    if (payload.error) {
      this.setState({
        error: `Payment failed ${payload.error.message}`,
        processing: false
      })
    } else {
      this.setState({
        error: null,
        processing: false,
        succeeded: true
      })
    }
  };

  getPaymentIntent = () => {
      axios.post("/create-payment-intent")
            .then(res => {
             console.log('got the payment intent:', res);
             const clientSecret = res.data.clientSecret;
             this.setState({clientSecret: clientSecret})
      });
  }

  componentDidMount(){
    this.getPaymentIntent();
  };


  render(){

     return   <form id="payment-form" onSubmit={this.handleSubmit}>


                  <CardElement id="card-element" options={this.cardStyle} onChange={this.handleChange} />

                      <button
                        disabled={this.state.processing || this.state.disabled || this.state.succeeded}
                        id="submit"
                      >
                        <span id="button-text">
                          {this.state.processing ? (
                            <div className="spinner" id="spinner"></div>
                          ) : (
                            "Pay"
                          )}
                        </span>
                      </button>

                  {/* Show any error that happens when processing the payment */}

                          {this.state.error && (
                            <div className="card-error" role="alert">
                              {this.state.error}
                            </div>
                          )}

                  {/* Show a success message upon completion */}

                          <p className={this.state.succeeded ? "result-message" : "result-message hidden"}>
                            Payment succeeded, see the result in your
                            <a
                              href={`https://dashboard.stripe.com/test/payments`}
                            >
                              {" "}
                              Stripe dashboard.
                            </a> Refresh the page to pay again.
                          </p>   
            </form>
  }
}

const InjectedCardForm = () => {
  return (
    <ElementsConsumer>
      {({elements, stripe}) => (
        <CardForm elements={elements} stripe={stripe} />
      )}
    </ElementsConsumer>
  );
};

export default InjectedCardForm;
