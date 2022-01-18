import React from 'react';
import PurchaseConfirmation from './PurchaseConfirmation';
import axios from 'axios'
import { Container, Col, Row, Label, Spinner} from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Alert } from 'reactstrap';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { BrowserRouter as Redirect } from "react-router-dom";

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
        paypalOrderID: '',
        step: 3,
        nameError: false,
        emailError: false,
        phoneError: false,
        phoneErrorMessage: '',
        addressError: false,
        cityError: false,
        stateError: false,
        zipError: false,
        messageError: false,
        amountError: false, 
        paymentOptionsReceived: false
      }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  nextStep = () => {
    if(this.state.step === 1){
      if(this.validateName() && this.validateEmail() && this.validatePhone()){
        const nextStep = this.state.step + 1;
        this.setState({step: nextStep});
      }
      window.scrollTo(0, 0);
    }
    else if(this.state.step === 2){
      if(this.validateStep2()){
        const nextStep = this.state.step + 1;
        this.setState({step: nextStep});   
      }
      window.scrollTo(0, 0);
    }
    else{
      const nextStep = this.state.step + 1;
      this.setState({step: nextStep});
      window.scrollTo(0, 0);
    }
  }

  prevStep = () => {
    const prevStep = this.state.step - 1;
    this.setState({step: prevStep});
    window.scrollTo(0, 0);
  }

  setFinalStep = () => {
    this.setState({
        step: 4,
        name: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        message: '',
        paymentDetails: ''
    });
    window.scrollTo(0, 0);
  }

  validateName = () => {
     if(this.state.name === ""){
        this.setState({nameError: true});
        return false;
      }
      else{
        this.setState({nameError: false});
        return true;
      }
  }

  validateEmail = () => {
    if(this.state.email === ""){
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

    if(this.state.phone === ""){
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
    if(this.state.address === ""){
        this.setState({addressError: true});
        return false;
    }
    else{
      this.setState({addressError: false});
    }

    if(this.state.city === ""){
        this.setState({cityError: true});
        return false;
    }
    else{
      this.setState({cityError: false});
    }

    if(this.state.state === ""){
        this.setState({stateError: true});
        return false;
    }
    else{
      this.setState({stateError: false});
    }

    if(this.state.zip === ""){
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

  createOrder = (paymentDetails) => {

      const order = {
        auth: `${process.env.REACT_APP_EXHIBITA}`,
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
        paymentDetails: paymentDetails,
        message: this.state.message,
        items: this.props.myCart,
        total: this.props.total
      };

      axios.post(`${process.env.REACT_APP_API_STR}/api/create-order`, order)
      .then(res => {
        this.setFinalStep();
      });
  }


  render() {

    if(this.props.myCart.length === 0){
      return <Redirect to="/" />
    }

    const {step, paymentOptionsReceived} = this.state;

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

                <Label for="address">Message (optional)</Label>
                <textarea  style={{'height': '150px', 'width': '100%', 'resize': 'none'}} type="textbox" name="message" value={this.state.message} onChange={this.onChange} />
                  
                  <div className="checkoutFooter">

                    <Button variant="contained" color="secondary" className="rightButton" onClick={()=>{this.nextStep()}}>Continue to Payment</Button>

                    <Button className="leftButton" onClick={()=>{this.prevStep()}}>Go Back</Button>
                  
                  </div>



              </div>
              
        case 3:

          return <div className="checkoutStep">

          <h4 style={{padding: '5px'}}>Payment</h4>

          <h6 style={{'text-align':'center'}}>{this.props.myCart.length} item(s)</h6>

              <div className="itemReviewLastStep">

                    {this.props.myCart.map((product) => {
                        return <Container>
                                  <Row xs="3" className="checkoutItem">
                                    <Col style={{padding:'5px'}}><img src={product.images[0]} width={80} alt=""/></Col>
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

                  <Container className='paymentButtons'>

                      <div className='paymentSpinnerDiv' style={{display: paymentOptionsReceived ? 'none' : ''}}>
                          <h6>Retreiving payment options...</h6>
                          <Spinner animation="border"/>
                      </div>

                      <div className="paymentOptionsDiv" style={{display: paymentOptionsReceived ? '' : 'none'}}>

                          <PayPalScriptProvider 
                              options={{ "client-id": `${process.env.REACT_APP_PAYPAL_CLIENTID}`, components: "buttons,funding-eligibility",
                              "enable-funding": "venmo", "disable-funding": "credit"}}>

                                <PayPalButtons 
                                  style={{ layout: "vertical" }}
                                  onInit={(data, actions) => {
                                      if(data){
                                        this.setState({paymentOptionsReceived: true});
                                      };
                                  }}
                                  createOrder={(data, actions) => {
                                    return actions.order
                                          .create({
                                              purchase_units: [
                                                  {
                                                      amount: {
                                                          currency_code: "USD",
                                                          value: this.props.total,
                                                      },
                                                  },
                                              ],
                                          })
                                          .then((orderId) => {
                                            this.setState({paymentOptionsReceived: true});
                                            return orderId;
                                          });
                                  }} 
                                  onApprove={(data, actions) => {
                                    return actions.order.capture().then((details) => {
                                     this.createOrder(details);                                 
                                    });
                                  }}
                                />

                          </PayPalScriptProvider> 

                      </div>

                  </Container>

                  <div style={{padding: '20px'}}>
                    <Button variant="contained" color="primary" className="leftButton" onClick={()=>{this.prevStep()}}>Go Back</Button>
                   </div> 

                  </div>
              
              </div>

        case 4:
          return <PurchaseConfirmation customerEmail={this.state.email} updateCartCount={this.props.updateCartCount}/>
          default:
            window.location = '/';

    }

  }
}

export default CheckoutForm;