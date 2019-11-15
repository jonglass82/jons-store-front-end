import React from 'react'
import axios from 'axios';

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


render (){

  return  (<div>

    <h1> My Shopping Cart:</h1>

    {this.state.myCart.map((product) => {
      return <ul>

      <li><h3>{product.title}<button onClick={()=>this.removeProduct(product._id)}> X </button></h3></li>

      </ul>
    })}

    </div>

    )
  }

}

export default Checkout;