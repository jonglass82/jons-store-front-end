import React from 'react'
import { Button } from 'reactstrap';


class Payment extends React.Component {

constructor(props){
  super(props);
  this.state = {

  }
}
  render(){
    return <div>

    <h1>List out order info here</h1>

    <h1>Stripe payment info here</h1>

    <Button>Make Payment</Button>

    </div>
  }
}


export default Payment;