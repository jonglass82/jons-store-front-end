import React from 'react';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import CardForm from './CardForm';
import PurchaseConfirmation from './PurchaseConfirmation';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from 'axios'
import { Container, Col, Row, Form, FormGroup, Input, Label, FormText} from 'reactstrap';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Alert } from 'reactstrap';


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
        step: 1,
        nameError: false,
        emailError: false,
        phoneError: false,
        phoneErrorMessage: '',
        addressError: false,
        cityError: false,
        stateError: false,
        zipError: false,
        messageError: false,
        amountError: false
      }
      this.promise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_TEST_KEY}`);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  nextStep = () => {
    if(this.state.step == 1){
      if(this.validateName() && this.validateEmail() && this.validatePhone()){
        const nextStep = this.state.step + 1;
        this.setState({step: nextStep});
      }
    }
    else if(this.state.step == 2){
      if(this.validateStep2()){
        const nextStep = this.state.step + 1;
        this.setState({step: nextStep});   
      }
    }
    else{
      const nextStep = this.state.step + 1;
      this.setState({step: nextStep});
    }

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
  }

  validateName = () => {
     if(this.state.name == ""){
        this.setState({nameError: true});
        return false;
      }
      else{
        this.setState({nameError: false});
        return true;
      }
  }

  validateEmail = () => {
    if(this.state.email == ""){
        this.setState({emailError: true});
        return false; 
    }
    else{
        this.setState({emailError: false});
        return true;
    }
  }

  validatePhone = () => {
    const regex = new RegExp(/^[0-9]*$/);
    const onlyNumbers = regex.test(this.state.phone);  

    if(this.state.phone == ""){
      this.setState({phoneError: true, phoneErrorMessage: 'Required'});
      return false;
    }

    if(!onlyNumbers){
      this.setState({phoneError: true, phoneErrorMessage: 'Only numbers allowed'});
      return false;
    }

    this.setState({
      phoneError: false,
      phoneErrorMessage: ''
    });
    return true;
  }

  validateStep2 = () => {
    if(this.state.address == ""){
        this.setState({addressError: true});
        return false;
    }
    else{
      this.setState({addressError: false});
    }

    if(this.state.city == ""){
        this.setState({cityError: true});
        return false;
    }
    else{
      this.setState({cityError: false});
    }

    if(this.state.state == ""){
        this.setState({stateError: true});
        return false;
    }
    else{
      this.setState({stateError: false});
    }

    if(this.state.zip == ""){
        this.setState({zipError: true});
        return false;
    }
    else{
      this.setState({zipError: false});
    }

    this.setState({
      addressError: false,
      cityError: false, 
      stateError: false,
      zipError: false
    });
    return true;

  }


  render() {

    const {step} = this.state;

    switch(step){
      case 1:
          return <div className="checkoutStep">

                  <div className="total">Order Total: <strong>{"$" + this.props.total}</strong></div>

                  <h4 style={{padding: '5px'}}>Buyer Info</h4>

                    <TextField 
                      error = {this.state.nameError ? "true" : ""} 
                      type="text" 
                      label="Name" 
                      name="name" 
                      value={this.state.name} 
                      onChange={this.onChange} 
                      helperText={this.state.nameError ? "Required." : ""}
                      id="name" />


                    <TextField 
                      error = {this.state.emailError ? "true" : ""}
                      type="text" 
                      label="Email" 
                      name="email" 
                      value={this.state.email} 
                      onChange={this.onChange} 
                      helperText={this.state.emailError ? "Required." : ""}
                      id="email" />

                    <TextField 
                      error = {this.state.phoneError ? "true" : ""}
                      type="text" 
                      label="Phone" 
                      name="phone" 
                      value={this.state.phone} 
                      onChange={this.onChange}
                      helperText={this.state.phoneErrorMessage}
                      id="phone" />

                  <div className="checkoutFooter">
                    <Button variant="contained" color="secondary" onClick={()=>{this.nextStep()}}>Continue to Shipping</Button>
                  </div>
          </div>

      case 2: 
      return <div className="checkoutStep">

            <div className="total">Order Total: <strong>{"$" + this.props.total}</strong></div>

              <h4 style={{padding: '5px'}}>Shipping Address:</h4>

              <Alert color="info">
                  <strong>Please Note:</strong> All orders are shipped via USPS or Fedex depending on size and weight. Tracking information will be sent to the email provided. Combined shipping discounts are available for orders with multiple items to the same address. Only domestic US shipping offered at this time. 
              </Alert>
              

                    <TextField 
                      error = {this.state.addressError ? "true" : ""}
                      type="text" 
                      label="Address" 
                      name="address" 
                      value={this.state.address} 
                      onChange={this.onChange}
                      helperText={this.state.addressError ? "Required." : ""}
                      id="address" />             
            
                  <Row>
                      <Col sm={6}>

                        <TextField
                          error = {this.state.cityError ? "true" : ""}
                          type = "text"
                          label = "City" 
                          name = "city"
                          value = {this.state.city}
                          onChange={this.onChange}
                          helperText={this.state.cityError ? "Required." : ""}
                          id = "city"
                          />

                      </Col>

                      <Col sm={3}>

                        <TextField
                          error = {this.state.stateError ? "true" : ""}
                          type = "text"
                          label = "State" 
                          name = "state"
                          value = {this.state.state}
                          onChange={this.onChange}
                          helperText={this.state.stateError ? "Required." : ""}
                          id = "state"
                          />

                      </Col>

                      <Col sm={3}>

                        <TextField
                          error = {this.state.zipError ? "true" : ""}
                          type = "text"
                          label = "Zip Code" 
                          name = "zip"
                          value = {this.state.zip}
                          onChange={this.onChange}
                          helperText={this.state.zipError ? "Required." : ""}
                          id = "zip"
                          /> 

                      </Col>
                  </Row>

                  <div style={{'height': '30px'}}></div>

                <Label for="address">Special Message (optional)</Label>
                <textarea  style={{'height': '150px', 'width': '100%', 'resize': 'none'}} type="textbox" name="message" value={this.state.message} onChange={this.onChange} />
                  
                  <div className="checkoutFooter">
                    <Button className="leftButton" onClick={()=>{this.prevStep()}}>Go Back</Button>
                    <Button variant="contained" color="secondary" className="rightButton" onClick={()=>{this.nextStep()}}>Continue to Payment</Button>
                  </div>

              </div>
              
        case 3:
          return <div className="paymentStep">

          <h4 style={{padding: '5px'}}>Payment</h4>

          <h5 style={{'text-align':'center'}}>{this.props.myCart.length} item(s)</h5>

              <div className="itemReviewLastStep">

                    {this.props.myCart.map((product) => {
                        return <Container>
                                  <Row xs="3" className="checkoutItem">
                                    <Col style={{padding:'5px'}}><img src={product.images[0]} width={80}/></Col>
                                    <Col style={{'textAlign':'left'}}>{product.title}</Col>
                                    <Col style={{'textAlign':'left'}}>
                                      <ul>
                                       <li>${product.price}</li>
                                       <li style={{'fontSize':'12px'}}><em>+ Shipping ${product.shipping}</em></li>
                                      </ul>
                                    </Col>
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

                  <div style={{'padding': '50px 10px 70px 20px'}}>
                    <Button className="leftButton" onClick={()=>{this.prevStep()}}>Go Back</Button>
                   </div> 

                  </div>
              
              </div>

        case 4:
          return <PurchaseConfirmation customerEmail={this.state.email} updateCartCount={this.props.updateCartCount}/>

    }

  }
}

export default CheckoutForm;