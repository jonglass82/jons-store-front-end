import React from 'react'
import axios from 'axios';
import CheckoutForm from './CheckoutForm';

class Info extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      products: [],
      myCart: []
    }
  }

  getProducts() {
      axios.get(`${process.env.REACT_APP_API_STR}/api/products`).then(res => {

      const products = res.data;
      const newArray = [...this.state.myCart]

      products.forEach((product) => {
        if( localStorage.getItem(JSON.stringify(product._id))){
            let itemExpiration = new Date(JSON.parse(localStorage.getItem(JSON.stringify(product._id)))["timestamp"] + 300000).toLocaleString();
            let currentTime = new Date().toLocaleString();
            
            if(currentTime > itemExpiration){
              localStorage.removeItem(JSON.stringify(product._id));
            }
            else{
              newArray.push(product);
            }
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
     window.scrollTo(0, 0);
   }

   getTotal = (cart) => {
    if(cart.length === 0){
      return "0.00"
    }
    else{
      let total = 0; 
      let shipping = 0;
      this.state.myCart.forEach((item)=>{
        total += parseFloat(item.price);
        shipping += parseFloat(item.shipping);
      })
      total = total + shipping;
      return total.toFixed(2);
    }
   }


  render(){
    return <div className="container">

        <CheckoutForm 
              myCart={this.state.myCart} 
              updateCartCount={this.props.updateCartCount}
              products={this.products}
              total={this.getTotal(this.state.myCart)}/>

    </div>
 }

}

export default Info;