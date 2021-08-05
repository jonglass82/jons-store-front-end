import React from 'react'
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Elements} from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm';

class Info extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      products: [],
      myCart: []
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

   getTotal = (cart) => {
    if(cart.length === 0){
      return "0.00"
    }
    else{
      let total = 0; 
      this.state.myCart.forEach((item)=>{
        total += parseFloat(item.price);
      })
      const tax = total * 0.0725;
      total = total + tax;
      return total.toFixed(2);
    }
   }


  render(){
    return <div className="container">

      <Elements>
        <InjectedCheckoutForm 
              myCart={this.state.myCart} 
              updateCartCount={this.props.updateCartCount}
              products={this.products}
              total={this.getTotal(this.state.myCart)}/>
      </Elements>

    </div>
 }

}

export default Info;