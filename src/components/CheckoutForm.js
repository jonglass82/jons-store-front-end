import React from 'react';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import CardForm from './CardForm';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from 'axios'
import { Container, Col, Row, Button, Form, FormGroup, Input, Label, FormText} from 'reactstrap';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';


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
        step: 1
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

                    <TextField type="text" label="Name" name="name" value={this.state.name} onChange={this.onChange} id="name" />

                    <TextField type="text" label="Email" name="email" value={this.state.email} onChange={this.onChange} id="email" />

                    <TextField type="text" label="Phone" name="Phone" value={this.state.phone} onChange={this.onChange} id="phone" />

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
                          <Col sm={3}>
                            <FormGroup>
                              <Label for="exampleState">State</Label>
                              <Input type="text" name="state" value={this.state.state} onChange={this.onChange} id="exampleState"/>
                            </FormGroup>
                          </Col>
                          <Col sm={3}>
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
          return <div className="paymentStep">

              <div className="itemReviewLastStep">

                    {this.props.myCart.map((product) => {
                        return <Container>
                                  <Row xs="3" className="checkoutItem">
                                    <Col style={{padding:'5px'}}><img src={product.images[0]} width={80}/></Col>
                                    <Col>{product.title}</Col>
                                    <Col>${product.price}</Col>
                                  </Row>
                              </Container>

                      })}

              </div>

              <div className="orderDetails">

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
              
              </div>

        case 4:
          return <div>

                <div id="checkoutConfirmation">

                  <h2>Your purchase is complete!</h2>

                  <div style={{padding: "20px 0px 20px 0px"}}>
                    <CheckCircleOutlinedIcon style={{fontSize:'150px', color:'green'}}></CheckCircleOutlinedIcon>
                  </div>

                  <p>An email receipt has been sent to "customer email" {this.state.email}</p>

                  <Link to="/">
                  Back Home
                  </Link>

                </div>

          </div>
    }

  }
}

export default CheckoutForm;