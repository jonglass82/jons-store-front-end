import React from 'react';
import axios from 'axios';


class Products extends React.Component {

  state = {
    products: []
  }

  getProducts() {
      axios.get('http://localhost:3001/api/products').then(res=>{
      const products = res.data;
      this.setState((state, props) => ({
        products: products
      }));
    })
  }

  componentDidMount() {
      this.getProducts();
  };

  render() {

    return (
          <div> 

          <h2> Here are all my products: </h2>

              <ul>{this.state.products}</ul>

          </div>
    )
  }
}

export default Products;