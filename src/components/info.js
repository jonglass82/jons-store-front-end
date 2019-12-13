import React from 'react'
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Elements} from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm';

class Info extends React.Component {

  constructor(props){
    super(props);
    this.modalToggle = this.modalToggle.bind(this);
    this.state = {
      products: [],
      myCart: [],
      modal: false
    }
}

  getProducts() {
      axios.get('http://localhost:3001/api/products').then(res => {

      const products = res.data;
      const newArray = [...this.state.myCart]

      products.map((product) => {
        if( localStorage.getItem(JSON.stringify(product._id))){
          newArray.push(product);
        }
      })

      this.setState((state, props) => ({
        products: products,
        myCart: newArray
      }));
    })
  };

   componentDidMount(){
     this.getProducts();
   }

  modalToggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render(){
    return <div className="container">

      <Elements>
        <InjectedCheckoutForm/>
      </Elements>

    </div>
 }

}

export default Info;