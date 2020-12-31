import React from 'react';
import axios from 'axios';
import { Elements, CardElement, ElementsConsumer } from "@stripe/react-stripe-js";


class CardForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      succeeded: false,
      error: '',
      processing: false,
      disabled: '',
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

    //check if all cart items are still available
    //if yes....
    //run payment
    //if payment suceeds....
    //mark all items as sold
    //render payment confirmation screen

    const {elements, stripe, myCart} = this.props;

    ev.preventDefault();

    const cartedItems = {'cartedItems': myCart};

    axios.post('/check-carted-items', cartedItems).then((res)=>{
      console.log('res from server: ', res.data);
    })

    // this.setState({processing: true});

    // const payload = await stripe.confirmCardPayment(this.state.clientSecret, {
    //   payment_method: {
    //     card: elements.getElement(CardElement)
    //   }
    // });

    // console.log('here is the payload: ', payload);

    // if (payload.error) {
    //   this.setState({
    //     error: `Payment failed ${payload.error.message}`,
    //     processing: false
    //   })
    // } else {
    //   this.setState({
    //     error: null,
    //     processing: false,
    //     succeeded: true
    //   })
    // }

  };

  getPaymentIntent = () => {
      const total = {'total': parseInt(this.props.total)}
      axios.post("/create-payment-intent", total)
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
                            ) : ("Pay" + " " + "$" + this.props.total)
                          }
                          </span>
                      </button>

                  {/* Show any error that happens when processing the payment */}

                          {this.state.error && (
                            <div className="card-error" role="alert">
                              {this.state.error}
                            </div>
                          )}

                  {/* Show a success message upon completion */}

                          <p className={this.state.succeeded ? "result-message" : "result-message-hidden"}>
                            Payment succeeded, see the result in your <a href={`https://dashboard.stripe.com/test/payments`}>{" "}Stripe dashboard.</a> 
                            Refresh the page to pay again.
                          </p>   
            </form>
  }
}

const InjectedCardForm = (props) => {
  return (
    <ElementsConsumer>
      {({elements, stripe}) => (
        <CardForm elements={elements} 
                  stripe={stripe}  
                  myCart={props.myCart}
                  customerInfo={props.customerInfo} 
                  total={props.total} />
      )}
    </ElementsConsumer>
  );
};

export default InjectedCardForm;
