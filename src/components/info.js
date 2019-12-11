import React from 'react'
import { Button } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class Info extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
}
  render(){
    return <div>

    <h1>Enter your info here</h1>

    <ul>
    <li>first name</li>
    <li>last name</li>
    <li>email</li>
    <li>phone number</li>
    </ul>

    <ul>
      <li>address</li>
      <li>apt number suite optional</li>
      <li>city</li>
      <li>state</li>
      <li>zip</li>
      <li>country</li>
    </ul>

    <h3>Order Summary</h3>

    <h4>Notes or instructions (optional)</h4>

        <Link to="/payment-info">
          <Button color="primary">Checkout</Button>
        </Link>

    </div>
 }

}

export default Info;