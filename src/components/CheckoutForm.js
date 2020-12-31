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
      this.state = {
        name: 'Jon',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        message: '',
        amount: '',
        step: 1
      }
      this.promise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_TEST_KEY}`);
  }

  nextStep = () => {
    const nextStep = this.state.step + 1;
    this.setState({step: nextStep});
  }

  prevStep = () => {
    const prevStep = this.state.step - 1;
    this.setState({step: prevStep});
  }

  render() {

    const {step} = this.state;

    switch(step){
      case 1:
          return <div>

                  <h5>Buyer Info</h5>

                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" placeholder="Name" />

                    <Label for="email">Email</Label>
                    <Input type="text" name="email" id="email" placeholder="Email" />

                    <Label for="phone">Phone Number</Label>
                    <Input type="text" name="phone" id="phone" placeholder="Phone Number (optional)" />

                    <button onClick={()=>{this.nextStep()}}>nextStep</button>

          </div>

      case 2: 
      return <div>

              <h5>Shipping Address:</h5>
              
                <Label for="address">Address</Label>
                <Input type="text" name="address" id="address" placeholder="Address" />

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

                <Label for="address">Message: </Label>
                <Input type="textbox" name="address" id="address" placeholder="Address" />
                  
                  <button onClick={()=>{this.prevStep()}}>prevStep</button>
                  <button onClick={()=>{this.nextStep()}}>nextStep</button>

              </div>
        case 3:
          return <div>

                <Elements stripe={this.promise} >
                    <CardForm customerInfo={this.state} 
                              total={this.props.total} 
                              myCart={this.props.myCart} />
                </ Elements>

                <button onClick={()=>{this.prevStep()}}>prevStep</button>
          </div>
    }

  }
}

export default CheckoutForm;