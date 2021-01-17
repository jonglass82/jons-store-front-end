import React from 'react';
import CardForm from './CardForm';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from 'axios'
import { Container, Col, Row, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import { Link } from "react-router-dom";


class CheckoutForm extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        message: '',
        step: 3
      }
      this.promise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_TEST_KEY}`);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  nextStep = () => {
    const nextStep = this.state.step + 1;
    this.setState({step: nextStep});
  }

  prevStep = () => {
    const prevStep = this.state.step - 1;
    this.setState({step: prevStep});
  }

  setStep = (step) => {
    const newStep = step;
    this.setState({
        step: newStep,
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        message: '',
        amount: ''
    });
    this.props.clearCart();
    this.props.updateCartCount(0);
  }


  render() {

    const {step} = this.state;

    switch(step){
      case 1:
          return <div className="checkoutStep">

                  <div className="total">Order Total: <strong>{"$" + this.props.total}</strong></div>

                  <h5>Buyer Info</h5>

                    <Label for="name">Name</Label>
                    <Input type="text" name="name" value={this.state.name} onChange={this.onChange} id="name" placeholder="Name" />

                    <Label for="email">Email</Label>
                    <Input type="text" name="email" value={this.state.email} onChange={this.onChange} id="email" placeholder="Email" />

                    <Label for="phone">Phone Number</Label>
                    <Input type="text" name="phone" value={this.state.phone} onChange={this.onChange} id="phone" placeholder="Phone Number (optional)" />

                  <div className="checkoutFooter">
                    <button onClick={()=>{this.nextStep()}}>nextStep</button>
                  </div>
          </div>

      case 2: 
      return <div className="checkoutStep">

            <div className="total">Order Total: <strong>{"$" + this.props.total}</strong></div>

              <h5>Shipping Address:</h5>
              
                <Label for="address">Address</Label>
                <Input type="text" name="address" value={this.state.address} onChange={this.onChange} id="address" placeholder="Address" />

                  <Row>
                          <Col sm={6}>
                            <FormGroup>
                              <Label for="exampleCity">City</Label>
                              <Input type="text" name="city" value={this.state.city} onChange={this.onChange} id="exampleCity"/>
                            </FormGroup>
                          </Col>
                          <Col sm={4}>
                            <FormGroup>
                              <Label for="exampleState">State</Label>
                              <Input type="text" name="state" value={this.state.state} onChange={this.onChange} id="exampleState"/>
                            </FormGroup>
                          </Col>
                          <Col sm={2}>
                            <FormGroup>
                              <Label for="exampleZip">Zip</Label>
                              <Input type="text" name="zip" value={this.state.zip} onChange={this.onChange} id="exampleZip"/>
                            </FormGroup>  
                          </Col>
                  </Row>

                <Label for="address">Special Message (optional): </Label>
                <Input type="textbox" name="message" value={this.state.message} onChange={this.onChange} id="address" placeholder="Address" />
                  
                  <div className="checkoutFooter">
                    <button onClick={()=>{this.prevStep()}}>prevStep</button>
                    <button onClick={()=>{this.nextStep()}}>nextStep</button>
                  </div>

              </div>
        case 3:
          return <div>

              <div className="itemReviewLastStep">
                    {this.props.myCart.map((product) => {
                        return <ul>

                      <Container>
                        <Row xs="3" className="checkoutItem">
                          <Col style={{padding:'5px'}}><img src={product.images[0]} width={80}/></Col>
                          <Col>{product.title}</Col>
                          <Col>${product.price}</Col>
                        </Row>
                      </Container>

                        </ul>
                      })}
              </div>


              <div className="total">Order Total: <strong>{"$" + this.props.total}</strong></div>

              <Container>

                <Elements stripe={this.promise} >
                    <CardForm customerInfo={this.state} 
                              total={this.props.total} 
                              setStep={this.setStep}
                              myCart={this.props.myCart} />
                </ Elements>

                </Container>

                <button onClick={()=>{this.prevStep()}}>prevStep</button>
          </div>
        case 4:
          return <div>

            <h1>Your purchase has been completed!</h1>

            <p>An email receipt has been sent to {this.state.email}</p>

                <Link to="/">
                Back Home
                </Link>
          </div>
    }

  }
}

export default CheckoutForm;