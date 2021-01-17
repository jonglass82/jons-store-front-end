import React from 'react'
import axios from 'axios';
import { Button } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class Checkout extends React.Component {

  constructor(props) {
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
      this.props.updateCartCount(newArray.length);
    })
  };

   componentDidMount(){
    this.getProducts();
   }

   removeProduct = (item) => {
      localStorage.removeItem(JSON.stringify(item));
      this.getProducts();
      window.location.href="/purchase"
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


render (){

  return  (<div className="checkout">

               <h2> My Shopping Cart:</h2>

                  <div className="shopping-cart">

                  {this.state.myCart.length > 0 ? this.state.myCart.map((product) => {
                    return <ul>

                    <li><b>{product.title}<button onClick={()=>this.removeProduct(product._id)}> X </button></b></li>

                    </ul>
                  }) : <div> There are no items in your cart </div>}

                  <h3>Total: $ {this.getTotal(this.state.myCart)}</h3>
                  
                      <Link to={this.state.myCart.length > 0 ? "/purchase-info" : "#"}>
                        <Button disabled={this.state.myCart.length > 0 ? false : true} outline color="primary" block>Checkout</Button>
                      </Link>

                  </div>
          </div>
    )
  }

}

export default Checkout;