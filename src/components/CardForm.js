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

  checkout = (ev) => {

    ev.preventDefault();

    let cartedItemsCheck; 

    //this.setState({processing: true});

    const cartedItems = {'cartedItems': this.props.myCart};

    axios.post("/check-carted-items", cartedItems).then((res)=>{
      console.log('res from server: ', res.data);
      cartedItemsCheck = res.data;
      console.log('cartedItemsCheck value: ', cartedItemsCheck);
        if(cartedItemsCheck.status){
          this.handleSubmit(ev);
        }
        else{
          console.log('items are unavailable', cartedItemsCheck.itemsNotFound);
          this.setState({
            error: 'some of the items in your cart have already been sold or are unavailable.'
          });
        }
    })

  }

  handleSubmit = async (ev) => {

    const {elements, stripe, customerInfo} = this.props;

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

      const order = {
        auth: `${process.env.REACT_APP_EXHIBITA}`,
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
        address: customerInfo.address,
        city: customerInfo.city,
        state: customerInfo.state,
        zip: customerInfo.zip,
        message: customerInfo.message,
        items: this.props.myCart,
        total: this.props.total
      };

      axios.post("/create-order", order)
      .then(res => {
       console.log('response from create-order route:', res.data);
      });

      this.props.setStep(4);
    }

  };

  getPaymentIntent = () => {
      const total = {'total': parseFloat(this.props.total)}
      console.log('total sent:', total);
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

     return   <form id="payment-form" onSubmit={this.checkout}>


                  {this.state.error && (
                    <div className="card-error" role="alert">
                      {this.state.error}
                    </div>
                  )}


                  <p className={this.state.succeeded ? "result-message" : "result-message-hidden"}>
                    Payment succeeded, see the result in your <a href={`https://dashboard.stripe.com/test/payments`}>{" "}Stripe dashboard.</a> 
                    Refresh the page to pay again.
                  </p>   

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
                  setStep={props.setStep}
                  total={props.total} />
      )}
    </ElementsConsumer>
  );
};

export default InjectedCardForm;
