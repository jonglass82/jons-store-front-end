import React from 'react';
import CardForm from './CardForm';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from 'axios'
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText,
Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class CheckoutForm extends React.Component {

  constructor(props){
      super(props);
      this.modalToggle = this.modalToggle.bind(this);
      this.state = {
        modal: false
      }
      this.promise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_TEST_KEY}`);
  }

  modalToggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }


  render() {
    return (<div className="payment-form">

        <Label for="name">Name</Label>
        <Input type="text" name="name" id="name" placeholder="Name" />

        <Label for="email">Email</Label>
        <Input type="text" name="email" id="email" placeholder="Email" />

        <Label for="phone">Phone Number</Label>
        <Input type="text" name="phone" id="phone" placeholder="Phone Number (optional)" />


      <h1>Shipping Address:</h1>
      
        <Label for="address">Address</Label>
        <Input size="lg" type="text" name="address" id="address" placeholder="Address" />

          <Row>
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

              <Elements stripe={this.promise}>
                  <CardForm />
              </ Elements>

    </div>
    );
  }
}

export default CheckoutForm;