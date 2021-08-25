import React from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import { Spinner } from 'reactstrap';
import { Elements, CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import { Alert } from 'reactstrap';

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

    this.setState({processing: true});

    const cartedItems = {'cartedItems': this.props.myCart};

    axios.post("/check-carted-items", cartedItems).then((res)=>{
      cartedItemsCheck = res.data;
        if(cartedItemsCheck.status){
          this.handleSubmit(ev);
        }
        else{
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

    if (payload.error) {

      //if payment error, set the error message and dont proceed with creating an order. 
        this.setState({
          error: `Payment failed ${payload.error.message}`,
          processing: false
        })
    } 
    else {

      //if payment success, proceed with creating the order. 
      this.createOrder(customerInfo);

      this.setState({
        error: null,
        processing: false,
        succeeded: true
      })

      this.props.setStep(4);

    }

  };

  getPaymentIntent = () => {
      const total = {'total': parseFloat(this.props.total)}
      axios.post("/create-payment-intent", total)
            .then(res => {
             console.log('got the payment intent:', res);
             const clientSecret = res.data.clientSecret;
             this.setState({clientSecret: clientSecret})
      });
  }

  createOrder = (orderInfo) => {
      const order = {
        auth: `${process.env.REACT_APP_EXHIBITA}`,
        name: orderInfo.name,
        email: orderInfo.email,
        phone: orderInfo.phone,
        address: orderInfo.address,
        city: orderInfo.city,
        state: orderInfo.state,
        zip: orderInfo.zip,
        message: orderInfo.message,
        items: this.props.myCart,
        total: this.props.total
      };

      axios.post("/create-order", order)
      .then(res => {
       console.log('response from create-order route:', res.data);
      });
  }

  componentDidMount(){
    this.getPaymentIntent();
  };


  render(){

     return   <form id="payment-form" onSubmit={this.checkout}>

                  {this.state.error && (
                    <Alert color="danger">
                      {this.state.error}
                    </Alert>
                  )}  

                  <CardElement id="card-element" options={this.cardStyle} onChange={this.handleChange} />

                      <Button
                        disabled={this.state.processing || this.state.disabled || this.state.succeeded}
                        id="submit"
                        className="btn-block"
                      >
                              <span id="button-text">
                                {this.state.processing ? (
                                  <Spinner size="sm" color="primary" />
                                ) : ("Pay" + " " + "$" + this.props.total)
                              }
                              </span>

                      </Button>

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
