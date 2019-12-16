import React from 'react';
import {injectStripe} from 'react-stripe-elements';
import CardSection from './CardSection';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText,
Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class CheckoutForm extends React.Component {

  constructor(props){
      super(props);
      this.modalToggle = this.modalToggle.bind(this);
      this.state = {
        modal: false
      }
  }

  handleSubmit = (ev) => {

    console.log("your order has been placed!!!")
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    this.modalToggle();

    // Use Elements to get a reference to the Card Element mounted somewhere
    // in your <Elements> tree. Elements will know how to find your Card Element
    // becase only one is allowed.
    // See our getElement documentation for more:
    // https://stripe.com/docs/stripe-js/reference#elements-get-element
    const cardElement = this.props.elements.getElement('card');

    // From here we cal call createPaymentMethod to create a PaymentMethod
    // See our createPaymentMethod documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-payment-method
    this.props.stripe
      .createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {name: 'Jenny Rosen'},
      })
      .then(({paymentMethod}) => {
        console.log('Received Stripe PaymentMethod:', paymentMethod);
      });

    // You can also use confirmCardPayment with the PaymentIntents API automatic confirmation flow.
    // See our confirmCardPayment documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-payment
    this.props.stripe.confirmCardPayment('{PAYMENT_INTENT_CLIENT_SECRET}', {
      payment_method: {
        card: cardElement,
      },
    });

    // You can also use confirmCardSetup with the SetupIntents API.
    // See our confirmCardSetup documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-setup
    this.props.stripe.confirmCardSetup('{PAYMENT_INTENT_CLIENT_SECRET}', {
      payment_method: {
        card: cardElement,
      },
    });

    // You can also use createToken to create tokens.
    // See our tokens documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-token
    // With createToken, you will not need to pass in the reference to
    // the Element. It will be inferred automatically.
    this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
    // token type can optionally be inferred if there is only one Element
    // with which to create tokens
    // this.props.stripe.createToken({name: 'Jenny Rosen'});

    // You can also use createSource to create Sources.
    // See our Sources documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-source
    // With createSource, you will not need to pass in the reference to
    // the Element. It will be inferred automatically.
    this.props.stripe.createSource({
      type: 'card',
      owner: {
        name: 'Jenny Rosen',
      },
    });
    
  };

  modalToggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (<div className="payment-form">

      <Form>

      <FormGroup>

        <Label for="name">Name</Label>
        <Input type="text" name="name" id="name" placeholder="Name" />

        <Label for="email">Email</Label>
        <Input type="text" name="email" id="email" placeholder="Email" />

        <Label for="phone">Phone Number</Label>
        <Input type="text" name="phone" id="phone" placeholder="Phone Number (optional)" />

      </FormGroup>

      <h1>Shipping Address:</h1>

        <FormGroup>
      
        <Label for="address">Address</Label>
        <Input size="lg" type="text" name="address" id="address" placeholder="Address" />
         </FormGroup>

         <FormGroup>

<Row form>
        <Col sm={6}>
          <FormGroup>
            <Label for="exampleCity">City</Label>
            <Input type="text" name="city" id="exampleCity"/>
          </FormGroup>
        </Col>
        <Col sm={4}>
          <FormGroup>
            <Label for="exampleState">State</Label>
            <Input type="text" name="state" id="exampleState"/>
          </FormGroup>
        </Col>
        <Col sm={2}>
          <FormGroup>
            <Label for="exampleZip">Zip</Label>
            <Input type="text" name="zip" id="exampleZip"/>
          </FormGroup>  
        </Col>
      </Row>

      </FormGroup>

         <Button outline color="primary" onClick={this.modalToggle} block>Enter Payment information
        </Button>


        <Modal isOpen={this.state.modal} toggle={this.modalToggle}>
          <ModalHeader toggle={this.modalToggle}>
           Payment Information
          </ModalHeader>

          <ModalBody>

          {this.props.myCart.map((product) => {
            return <ul>

              <li><b>{product.title}</b></li>

            </ul>
          })}

          <FormGroup>
            <Label for="cardholder-name">Carholder Name</Label>
            <Input type="text" name="cardholder-name" id="cardholder-name"/>
          </FormGroup>

            <CardSection />

          </ModalBody>

          <ModalFooter>


            <Button outline color="secondary" onClick={this.handleSubmit} block>
                Make Payment
            </Button>

        </ModalFooter>
      </Modal>

      </Form>
    </div>
    );
  }
}

export default injectStripe(CheckoutForm);